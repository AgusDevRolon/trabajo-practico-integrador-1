import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.Middleware.js";
import { adminMiddleware } from "../middlewares/admin.Middleware.js";

const userRoutes = Router();

userRoutes.post("/", authMiddleware, adminMiddleware, createUser);
userRoutes.get("/", authMiddleware, adminMiddleware, getAllUsers);
userRoutes.get("/:id", authMiddleware, adminMiddleware, getUserById);
userRoutes.put("/:id", authMiddleware, adminMiddleware, updateUser);
userRoutes.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default userRoutes;