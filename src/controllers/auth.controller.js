import User from "../models/user.models.js";
import Profile from "../models/profile.models.js";
import { Op } from "sequelize";
import { hashPassword, comparePasswords } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";

export const register = async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  try {
    const existing = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (existing) {
      return res.status(400).json({ msg: "Email o Username ya están en uso" });
    }

    const hashed = await hashPassword(password);

    const user = await User.create({ username, email, password: hashed });

    await Profile.create({
      user_id: user.id,
      first_name,
      last_name,
    });

    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("register :: error:", error);
    return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: { model: Profile, as: "profile" },
    });

    if (!user) return res.status(404).json({ msg: "Credenciales incorrectas" });

    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) return res.status(401).json({ msg: "Credenciales incorrectas" });

    const token = signToken({ id: user.id, role: user.role });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res.status(200).json({ msg: "Logueado correctamente" });
  } catch (error) {
    console.error("login :: error:", error);
    return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "role"],
      include: { model: Profile, as: "profile" },
    });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    return res.status(200).json(user);
  } catch (error) {
    console.error("profile :: error:", error);
    return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { first_name, last_name, biography, avatar_url, birth_date } = req.body;

  try {
    const profile = await Profile.findOne({ where: { user_id: req.user.id } });

    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });

    await profile.update({ first_name, last_name, biography, avatar_url, birth_date });

    return res.status(200).json({ msg: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("updateProfile :: error:", error);
    return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "Logout exitoso" });
  } catch (error) {
    console.error("logout :: error:", error);
    return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    await Profile.destroy({ where: { user_id: req.user.id } });
    await user.destroy();

    res.clearCookie("token");
    return res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("deleteUser :: error:", error);
    return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};
