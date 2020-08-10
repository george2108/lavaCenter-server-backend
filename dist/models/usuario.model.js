"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    apellidos: {
        type: String
    },
    telefono: {
        type: Number
    },
    correo: {
        type: String,
        required: [true, 'Correo requerido'],
        unique: true
    },
    contra: {
        type: String,
        required: [true, 'Contraseña requerida']
    },
    avatar: {
        type: String,
        default: 'usuario.png'
    },
    fechaRegistro: {
        type: String
    },
    tipoRegistro: {
        type: String
    }
});
usuarioSchema.method('compararContras', function (contra = '') {
    if (bcrypt_1.default.compareSync(contra, this.contra)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
