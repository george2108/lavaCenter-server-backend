import { Schema, Document, model } from 'mongoose';


const precioSchema = new Schema({
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

interface InterfazPrecio extends Document {
    categoria: string;
    expandido: boolean;
    precios: [{
        descripcion: string;
        precio: number
    }]
}

export const Precio = model<InterfazPrecio>('Precio', precioSchema);