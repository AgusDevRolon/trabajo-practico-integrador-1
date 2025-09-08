import { testConnection } from "./src/config/database.js"; // ojo que necesitamos sequelize
import sequelize  from "./src/config/database.js";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import articleRoutes from "./src/routes/article.route.js";
import articleTagRoutes from "./src/routes/articletag.route.js";
import tagRoutes from "./src/routes/tag.route.js";
import profileRoute from "./src/routes/profile.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/tags", tagRoutes);
app.use("/articles", articleRoutes);
app.use("/", articleTagRoutes);
app.use("/", profileRoute)

const PORT = process.env.PORT || 3000;

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