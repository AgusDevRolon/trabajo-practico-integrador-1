import { validationResult } from "express-validator";

 export const applyValidations = (req, res, next) => {
  const result = validationResult(req);
  console.log(result.array());
  console.log(result.mapped());
  const custom = result.formatWith((err) => {
    return `${err.param}: ${err.msg}`;
  });
  console.log(custom.array());
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  next();
};

export default applyValidations;