"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const pedidos_1 = __importDefault(require("./routes/pedidos"));
const preciosPromociones_1 = __importDefault(require("./routes/preciosPromociones"));
const server = new server_1.default;
/******************************************************** */
// bodyparser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
/******************************************************** */
// fileUpload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
/******************************************************** */
// configurar cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
/******************************************************** */
// rutas de la app
server.app.use('/usuario', usuarios_1.default);
server.app.use('/pedidos', pedidos_1.default);
server.app.use('/preciosPromociones', preciosPromociones_1.default);
/******************************************************** */
// conectar base de datos
mongoose_1.default.connect('mongodb://localhost:27017/lavaCenter', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        throw err;
        console.log('error: ' + err);
    }
    console.log('base de datos ejecutando...');
});
/******************************************************** */
//iniciar
server.start(() => {
    console.log('servidor corriendo en el puerto ' + server.port);
});
