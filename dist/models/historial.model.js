"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const historialSchema = new mongoose_1.Schema({
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    },
    idPedido: {
        type: String
    },
    fechaDeRealizacion: {
        type: String
    },
    horaDeRealizacion: {
        type: String
    },
    ubicacion: {
        type: String
    },
    tipoPedido: {
        type: String
    },
    referencias: {
        type: String
    },
    tipoServicio: [{
            type: String
        }],
    fechaRecoleccion: {
        type: String
    },
    horaRecoleccion: {
        type: String
    },
    fechaEntrega: {
        type: String
    },
    horaEntrega: {
        type: String
    },
    fechaEntregada: {
        type: String
    },
    horaEntregada: {
        type: String
    },
    totalAPagar: {
        type: String
    },
    estadoPedido: {
        atendido: {
            type: Boolean
        },
        recogerPedido: {
            type: Boolean
        },
        confirmarRecoleccionUsuario: {
            type: Boolean
        },
        confirmarRecoleccionRepartidor: {
            type: Boolean
        },
        proceso: {
            type: Boolean
        },
        ropaLista: {
            type: Boolean
        },
        enCamino: {
            type: Boolean
        },
        confirmarEntregaRepartidor: {
            type: Boolean
        },
        confirmarEntregaUsuario: {
            type: Boolean
        },
        finalizada: {
            type: Boolean
        }
    },
    mensajes: [{
            de: {
                type: String
            },
            mensaje: {
                type: String
            },
            hora: {
                type: String
            },
            fecha: {
                type: String
            }
        }]
});
exports.Historial = mongoose_1.model('Historial', historialSchema);
