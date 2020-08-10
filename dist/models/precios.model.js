"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const precioSchema = new mongoose_1.Schema({
    categoria: {
        type: String
    },
    expandido: {
        type: Boolean
    },
    precios: [{
            descripcion: {
                type: String
            },
            precio: {
                type: Number
            }
        }]
});
exports.Precio = mongoose_1.model('Precio', precioSchema);
