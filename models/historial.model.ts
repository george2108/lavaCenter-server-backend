import { Schema, Document, model } from 'mongoose';

const historialSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
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
    fechaRecoleccion:{
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

interface InterfazHistorial extends Document {
    usuario: string;
    idPedido: string;
    fechaDeRealizacion: string;
    horaDeRealizacion: string;
    ubicacion: string;
    tipoPedido: string;
    referencias: string;
    tipoServicio: string[];
    fechaRecoleccion: string,
    horaRecoleccion: string;
    fechaEntrega: string,
    horaEntrega: string;
    fechaEntregada: string,
    horaEntregada: string;
    totalAPagar: string,
    estadoPedido: {
        atendido: boolean,
        recogerPedido: boolean,
        confirmarRecoleccionRepartidor: boolean,
        confirmarRecoleccionUsuario: boolean,
        proceso: boolean,
        ropaLista: boolean,
        enCamino: boolean,
        confirmarEntregaRepartidor: boolean,
        confirmarEntregaUsuario: boolean,
        finalizada: boolean
    };
    mensajes: [{
        de: string,
        mensaje: string,
        hora: string,
        fecha: string
    }];
}


export const Historial = model<InterfazHistorial>('Historial', historialSchema);