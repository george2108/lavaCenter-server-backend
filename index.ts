import Server from './clases/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors'

import userRoutes from './routes/usuarios';
import pedidosRoutes from './routes/pedidos';
import preciosPromocionesRoutes from './routes/preciosPromociones'

const server = new Server;

/******************************************************** */
// bodyparser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());


/******************************************************** */
// fileUpload
server.app.use(fileUpload({useTempFiles: true}));


/******************************************************** */
// configurar cors
server.app.use(cors({origin: true, credentials: true}));


/******************************************************** */
// rutas de la app
server.app.use('/usuario', userRoutes);
server.app.use('/pedidos', pedidosRoutes);
server.app.use('/preciosPromociones', preciosPromocionesRoutes);


/******************************************************** */
// conectar base de datos
mongoose.connect('mongodb://localhost:27017/lavaCenter', 
                {
                    useNewUrlParser: true,
                    useCreateIndex: true
                },
                (err) => {
                    if(err) {
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