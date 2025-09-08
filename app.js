import { testConnection } from "./src/config/database.js"; // ojo que necesitamos sequelize
import sequelize  from "./src/config/database.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const  serverStar= async () => {
  try {
    await testConnection();
    await sequelize.sync({ force: false });
    console.log("Todas las tablas sincronizadas correctamente");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

serverStar();