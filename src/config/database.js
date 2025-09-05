import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,  {
    host: process.env.DB_HOST,
    dialect:"mysql"
});

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("La conexion con la base de datos fue establecida correctamente.");
        return sequelize;
    } catch (error){
        console.error("No se pudo conectar a la Base de Datos:", error);
    }
};

export {sequelize, testConnection};