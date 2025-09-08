import { Router } from "express";
import {
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfileById,
    deleteProfileById
} from "../controllers/profile.controller.js"
import { authMiddleware } from "../middlewares/auth.Middleware.js";
import { adminMiddleware } from "../middlewares/admin.Middleware.js";

const profileRoute = Router();

profileRoute.post("/", authMiddleware, createProfile);
profileRoute.get("/", authMiddleware, getAllProfiles);
profileRoute.get("/:id", adminMiddleware, getProfileById);
profileRoute.put("/:id", adminMiddleware, updateProfileById);
profileRoute.delete("/:id", adminMiddleware, deleteProfileById);

export default profileRoute;