import { Router, Response } from 'express';
import { verificarToken } from '../middlewares/autenticacion';
import { Pedido } from '../models/pedidos.model';
import { Historial } from '../models/historial.model';

const pedidosRoutes = Router();

/*************************************************** */
// nuevo pedido
pedidosRoutes.post('/nuevo', [verificarToken], (req: any, res: Response) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    Pedido.create(body).then( async pedidoDB => {
        await pedidoDB.populate('usuario', '-contra').execPopulate();
        res.json({
            ok: true,
            pedido: pedidoDB
        });
    }).catch(err => {
        res.json(err);
    });
});



/*************************************************** */
// actualizar pedido
pedidosRoutes.post('/actualizar', (req: any, res: Response) => {
    const idPedido = req.body._id;
    // req.body.estadoPedido.enCamino = true;
    Pedido.findOneAndUpdate(idPedido, req.body, {new: true}, (err, pedidoBD) => {
        if(err) {
            throw err;
        }
        if(!pedidoBD) {
            return res.json({
                ok: false,
                mensaje: 'No se pudo actualizar'
            });
        }
        res.json({
            ok: true,
            pedido: pedidoBD
        });
    });
});



/*************************************************** */
// enviar pedido a historial
pedidosRoutes.post('/aHistorial', async(req: any, res: Response) => {
    const body = req.body;
    const idPedido = body._id;
    body.idPedido = idPedido;
    delete body._id;
    Historial.create(body).then(pedidoDB => {
        Pedido.findOneAndDelete(body._id).then(() => {
            res.json({
                ok: true,
                aHistorial: true,
                pedidoEliminado: true,
                pedido: pedidoDB
            });
        }).catch(err => {
            res.json({
                err,
                ok: false,
                mensaje: 'falló al eliminar el pedido'
            });
        });
    }).catch(err => {
        res.json({
            err,
            ok: false,
            mensaje: 'falló al crear el historial'
        });
    });
});



/*************************************************** */
// obtener los pedidos
pedidosRoutes.get('/obtenerTodos', async (req: any, res: Response) => {
    const pedidos = await Pedido.find().populate('usuario', '-contra').exec();
    res.json( {
        ok: true,
        pedidos
    });
});


/*************************************************** */
// comprobar si el usuario tiene pedidos
pedidosRoutes.get('/comprobar', [verificarToken], async (req: any, res: Response) => {
    const id = req.usuario._id;
    Pedido.find({usuario: id}).populate('usuarios').then(resp => {
        if(resp.length > 0) {
            res.json({
                ok: true,
                pedido: resp
            });
        }
        else {
            res.json({
                ok: false
            });
        }
    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    });
});



/*************************************************** */
// mostrar historial de usuarios
pedidosRoutes.get('/historial', [verificarToken], async (req: any, res: Response) => {
    const id = req.usuario._id;
    Historial.find({usuario:id}).populate('usuarios').then(resp => {
        res.json(resp);
    });
});


export default pedidosRoutes;