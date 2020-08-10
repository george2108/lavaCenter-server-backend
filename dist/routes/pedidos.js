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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const pedidos_model_1 = require("../models/pedidos.model");
const historial_model_1 = require("../models/historial.model");
const pedidosRoutes = express_1.Router();
/*************************************************** */
// nuevo pedido
pedidosRoutes.post('/nuevo', [autenticacion_1.verificarToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    pedidos_model_1.Pedido.create(body).then((pedidoDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield pedidoDB.populate('usuario', '-contra').execPopulate();
        res.json({
            ok: true,
            pedido: pedidoDB
        });
    })).catch(err => {
        res.json(err);
    });
});
/*************************************************** */
// actualizar pedido
pedidosRoutes.post('/actualizar', (req, res) => {
    const idPedido = req.body._id;
    // req.body.estadoPedido.enCamino = true;
    pedidos_model_1.Pedido.findOneAndUpdate(idPedido, req.body, { new: true }, (err, pedidoBD) => {
        if (err) {
            throw err;
        }
        if (!pedidoBD) {
            return res.json({
                ok: false,
                mensaje: 'No se pudo actualizar'
            });
        }
        res.json({
            ok: true,
            pedido: pedidoBD
        });
    });
});
/*************************************************** */
// enviar pedido a historial
pedidosRoutes.post('/aHistorial', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const idPedido = body._id;
    body.idPedido = idPedido;
    delete body._id;
    historial_model_1.Historial.create(body).then(pedidoDB => {
        pedidos_model_1.Pedido.findOneAndDelete(body._id).then(() => {
            res.json({
                ok: true,
                aHistorial: true,
                pedidoEliminado: true,
                pedido: pedidoDB
            });
        }).catch(err => {
            res.json({
                err,
                ok: false,
                mensaje: 'falló al eliminar el pedido'
            });
        });
    }).catch(err => {
        res.json({
            err,
            ok: false,
            mensaje: 'falló al crear el historial'
        });
    });
}));
/*************************************************** */
// obtener los pedidos
pedidosRoutes.get('/obtenerTodos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pedidos = yield pedidos_model_1.Pedido.find().populate('usuario', '-contra').exec();
    res.json({
        ok: true,
        pedidos
    });
}));
/*************************************************** */
// comprobar si el usuario tiene pedidos
pedidosRoutes.get('/comprobar', [autenticacion_1.verificarToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.usuario._id;
    pedidos_model_1.Pedido.find({ usuario: id }).populate('usuarios').then(resp => {
        if (resp.length > 0) {
            res.json({
                ok: true,
                pedido: resp
            });
        }
        else {
            res.json({
                ok: false
            });
        }
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
}));
/*************************************************** */
// mostrar historial de usuarios
pedidosRoutes.get('/historial', [autenticacion_1.verificarToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.usuario._id;
    historial_model_1.Historial.find({ usuario: id }).populate('usuarios').then(resp => {
        res.json(resp);
    });
}));
exports.default = pedidosRoutes;
