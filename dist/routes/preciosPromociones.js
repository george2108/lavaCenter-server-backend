"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promociones_model_1 = require("../models/promociones.model");
const precios_model_1 = require("../models/precios.model");
const preciosPromocionesRouter = express_1.Router();
preciosPromocionesRouter.get('/precios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const precios = yield precios_model_1.Precio.find().exec();
    res.json({
        ok: true,
        precios
    });
}));
preciosPromocionesRouter.post('/nuevoPrecio', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    precios_model_1.Precio.create(body).then(precioDB => {
        res.json({
            ok: true,
            precio: precioDB
        });
    });
}));
preciosPromocionesRouter.get('/promociones', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promociones = yield promociones_model_1.Promocion.find().exec();
    res.json({
        ok: 'awebo',
        promociones
    });
}));
preciosPromocionesRouter.post('/nuevaPromocion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    promociones_model_1.Promocion.create(body).then(promoDB => {
        res.json({
            ok: true,
            pedido: promoDB
        });
    }).catch(err => {
        res.json(err);
    });
}));
exports.default = preciosPromocionesRouter;
