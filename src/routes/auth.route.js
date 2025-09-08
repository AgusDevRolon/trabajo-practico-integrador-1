import { Router } from "express";
import {
  register,
  login,
  profile,
  updateProfile,
  logout,
  deleteUser
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.get("/profile", authMiddleware, profile);
authRoutes.put("/profile", authMiddleware, updateProfile);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.delete("/delete", authMiddleware, deleteUser)
authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
