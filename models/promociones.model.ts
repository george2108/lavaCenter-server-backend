import { Schema, Document, model } from 'mongoose';


const promocionSchema = new Schema({
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

interface InterfazPromocion extends Document {
    titulo: string;
    descripcion: string;
    activado: boolean;
    fechaCreacion: string;
    urlImagen: string;
}

export const Promocion = model<InterfazPromocion>('Promociones', promocionSchema);