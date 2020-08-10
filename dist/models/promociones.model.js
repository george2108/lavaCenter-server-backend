"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const promocionSchema = new mongoose_1.Schema({
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    activado: {
        type: Boolean
    },
    fechaCreacion: {
        type: String
    },
    urlImagen: {
        type: String
    }
});
exports.Promocion = mongoose_1.model('Promociones', promocionSchema);
