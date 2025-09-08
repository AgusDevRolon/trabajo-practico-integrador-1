import { body } from "express-validator";
import { body } from "express-validator";
import User from "../../models/user.model.js";

export const authValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username debe ser alfanumérico")
    .custom(async (username) => {
      const existingUser = await User.findOne({ where: { username: username.toLowerCase() } });
      if (existingUser) throw new Error("El username ya existe");
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("No tiene un formato válido")
    .custom(async (email) => {
      const existingEmail = await User.findOne({ where: { email: email.toLowerCase() } });
      if (existingEmail) throw new Error("El email ya existe");
      return true;
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 8 })
    .withMessage("El password debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage("La contraseña debe tener al menos una minúscula, una mayúscula y un número"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El campo role solo puede ser 'user' o 'admin'"),
];
