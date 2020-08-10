import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({

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

usuarioSchema.method('compararContras', function(contra: string = ''): boolean {
    if(bcrypt.compareSync(contra, this.contra)) {
        return true;
    }
    else {
        return false;
    }
});

interface usuarioInterfaz extends Document {
    nombre: string;
    apellidos: string;
    telefono: string;
    correo: string;
    contra: string;
    avatar: string;
    fechaRegistro: string;
    tipoRegistro: string;
    compararContras(contra: string): boolean;
}

export const Usuario= model<usuarioInterfaz>('Usuario', usuarioSchema);