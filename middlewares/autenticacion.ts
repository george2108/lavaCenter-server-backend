import { Response, Request, NextFunction } from 'express';
import Token from '../clases/token';


export const verificarToken = (req: any, res: Response, next: NextFunction) => {
    const usuarioToken = req.get('x-token') || '';
    Token.compararToken(usuarioToken).then((decoded: any) => {
        req.usuario = decoded.usuario;
        next();
    })
    .catch(err => {
        res.json({
            ok: false,
            mensaje: 'token incorrecto'
        });
    });
}