import { Router } from "express";
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/articleTag.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const articleTagsRouter = Router();

articleTagsRouter.post(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  adminMiddleware,
  addTagToArticle
);

articleTagsRouter.delete(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  adminMiddleware,
  removeTagFromArticle
);

export default articleTagsRouter;