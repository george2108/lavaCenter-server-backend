"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../clases/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const file_system_1 = __importDefault(require("../clases/file-system"));
const userRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
/* ****************************************************************** */
// Registrar usuario
userRoutes.post('/registrar', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        correo: req.body.correo,
        contra: bcrypt_1.default.hashSync(req.body.contra, 10),
        avatar: req.body.avatar,
        fechaRegistro: req.body.fechaRegistro,
        tipoRegistro: req.body.tipoRegistro
    };
    usuario_model_1.Usuario.create(usuario).then(userDB => {
        const tokenUsario = token_1.default.getJWToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellidos: userDB.apellidos,
            telefono: userDB.telefono,
            correo: userDB.correo,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUsario
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
/* ****************************************************************** */
// Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ correo: body.correo }, (err, userDB) => {
        if (err) {
            throw err;
        }
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }
        if (userDB.compararContras(body.contra)) {
            const tokenUsario = token_1.default.getJWToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                apellidos: userDB.apellidos,
                telefono: userDB.telefono,
                correo: userDB.correo,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUsario
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }
    });
});
/* ****************************************************************** */
// actualizar usuario
userRoutes.post('/actualizar', autenticacion_1.verificarToken, (req, res) => {
    const datosUsuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellidos: req.body.apellidos || req.usuario.apellidos,
        correo: req.body.correo || req.usuario.correo,
        telefono: req.body.telefono || req.usuario.telefono,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, datosUsuario, { new: true }, (err, userDB) => {
        if (err) {
            throw err;
        }
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe ese usuario'
            });
        }
        const tokenUsario = token_1.default.getJWToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellidos: userDB.apellidos,
            telefono: userDB.telefono,
            correo: userDB.correo,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUsario
        });
    });
});
/* ****************************************************************** */
// Obtener informacion del usuarios
userRoutes.get('/', [autenticacion_1.verificarToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
}));
/* ****************************************************************** */
// subir imagenes
userRoutes.post('/upload', [autenticacion_1.verificarToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        });
    }
    yield fileSystem.guardarImagenTemporal(file, req.usuario._id);
    res.json({
        ok: true,
        file: file.mimetype
    });
}));
exports.default = userRoutes;
