import { body, param } from "express-validator";
import Profile from "../../models/profile.model.js";

export const idParamsProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      if (Number(id) < 1) throw new Error("El id debe ser positivo");
      return true;
    })
    .custom(async (id) => {
      const profile = await Profile.findByPk(id);
      if (!profile) throw new Error("El perfil no existe");
      return true;
    }),
];

export const updateProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      if (Number(id) < 1) throw new Error("El id debe ser positivo");
      return true;
    })
    .custom(async (id) => {
      const profile = await Profile.findByPk(id);
      if (!profile) throw new Error("El perfil no existe");
      return true;
    }),

  body("first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("last_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("biography")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),

  body("avatar_url")
    .optional()
    .trim()
    .isURL()
    .withMessage("El avatar debe tener un formato de URL válido"),
];
