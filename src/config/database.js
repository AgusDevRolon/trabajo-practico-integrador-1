import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect:"mysql"
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    //await sequelize.sync({force:true});
    console.log("Base de datos conectada");
    return sequelize;
  } catch (error) {
    console.error("No se pudo establecer conexion con la base de datos:", error);
  }
};

export default sequelize;