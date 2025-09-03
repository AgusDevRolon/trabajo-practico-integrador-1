import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize, testConnection } from './src/config/database.js';


const app = express();

//middlewares basicos
app.use(express.json()); //permite recibir JSON en el body de las solicitudes
app.use(cookieParser()); //permite manejar cookies
//config de CORS
app.use(cors({
    origin:"*", //permite cualquier origen
    credentials:true //permite enviar cookies
}));


//ruta de prueba
app.get('/', (req, res) => {
    res.send('servidor funcionando!...');
});

//levantar server
const PORT = process.env.PORT || 3000;
sequelize.sync({alter: true})
.then(() => {
    console.log("Base de Datos y Tablas fueron sincronizadas.");
    testConnection();
    app.listen(PORT, () => {
        console.log(`Server escuchando en http://localhost:${PORT}`);
    });
})
.catch(error => {
    console.error("Error en la sincronizacion de la Base de Datos.", error);
    process.exit(1);
})
