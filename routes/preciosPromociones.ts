import { Router, Response, response } from 'express';
import { Promocion } from '../models/promociones.model';
import { Precio } from '../models/precios.model';

const preciosPromocionesRouter = Router();

preciosPromocionesRouter.get('/precios', async (req: any, res: Response) => {
    const precios = await Precio.find().exec();
    res.json( {
        ok: true,
        precios
    });
});

preciosPromocionesRouter.post('/nuevoPrecio', async(req: any, res: Response) => {
    const body = req.body;
    Precio.create(body).then(precioDB => {
        res.json({
            ok: true,
            precio: precioDB
        });
    });
});


preciosPromocionesRouter.get('/promociones', async (req: any, res: Response) => {
    const promociones = await Promocion.find().exec();
    res.json({
        ok: 'awebo',
        promociones
    });
});

preciosPromocionesRouter.post('/nuevaPromocion', async(req: any, res: Response) => {
    const body = req.body;
    Promocion.create(body).then( promoDB => {
        res.json({
            ok: true,
            pedido: promoDB
        });
    }).catch(err => {
        res.json(err);
    });
});


export default preciosPromocionesRouter;