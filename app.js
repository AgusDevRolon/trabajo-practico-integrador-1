import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize, testConnection } from './src/config/database.js';


const app = express();

app.use(express.json()); 
app.use(cookieParser()); 

app.use(cors({
    origin:"*", 
    credentials:true 
}));


app.get('/', (req, res) => {
    res.send('servidor funcionando!...');
});

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
