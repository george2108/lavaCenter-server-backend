import { Router, Request, Response, response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../clases/token';
import { verificarToken } from '../middlewares/autenticacion';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../clases/file-system';

const userRoutes = Router();
const fileSystem = new FileSystem();

/* ****************************************************************** */
// Registrar usuario
userRoutes.post('/registrar', (req: Request, res: Response) => {
    const usuario = {
        nombre       : req.body.nombre,
        apellidos    : req.body.apellidos,
        telefono     : req.body.telefono,
        correo       : req.body.correo,
        contra       : bcrypt.hashSync(req.body.contra, 10),  // Encriptar la constraseña
        avatar       : req.body.avatar,
        fechaRegistro: req.body.fechaRegistro,
        tipoRegistro : req.body.tipoRegistro
    }

    Usuario.create(usuario).then(userDB => {
        const tokenUsario = Token.getJWToken({
            _id      : userDB._id,
            nombre   : userDB.nombre,
            apellidos: userDB.apellidos,
            telefono : userDB.telefono,
            correo   : userDB.correo,
            avatar   : userDB.avatar
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
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;

    Usuario.findOne({correo: body.correo}, (err, userDB) => {
        if(err) {
            throw err;
        }
        if(!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }
        if(userDB.compararContras(body.contra)) {
            const tokenUsario = Token.getJWToken({
                _id      : userDB._id,
                nombre   : userDB.nombre,
                apellidos: userDB.apellidos,
                telefono : userDB.telefono,
                correo   : userDB.correo,
                avatar   : userDB.avatar
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
userRoutes.post('/actualizar', verificarToken, (req: any, res: Response) => {
    const datosUsuario = {
        nombre: req.body.nombre       || req.usuario.nombre,
        apellidos: req.body.apellidos || req.usuario.apellidos,
        correo: req.body.correo       || req.usuario.correo,
        telefono: req.body.telefono   || req.usuario.telefono,
        avatar: req.body.avatar       || req.usuario.avatar
    }
    Usuario.findByIdAndUpdate(req.usuario._id, datosUsuario, {new: true}, (err, userDB) => {
        if(err) {
            throw err;
        }
        if(!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe ese usuario'
            });
        }
        const tokenUsario = Token.getJWToken({
            _id      : userDB._id,
            nombre   : userDB.nombre,
            apellidos: userDB.apellidos,
            telefono : userDB.telefono,
            correo   : userDB.correo,
            avatar   : userDB.avatar
        });
        res.json({
            ok: true,
            token: tokenUsario
        });
    });
});


/* ****************************************************************** */
// Obtener informacion del usuarios
userRoutes.get('/', [verificarToken], async (req: any, res: Response) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
});


/* ****************************************************************** */
// subir imagenes
userRoutes.post('/upload', [verificarToken], async (req: any, res: Response) => {
    if ( !req.files ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    if ( !file.mimetype.includes('image') ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        }); 
    }

    await fileSystem.guardarImagenTemporal( file, req.usuario._id );

    res.json({
        ok: true,
        file: file.mimetype
    });
});

export default userRoutes;