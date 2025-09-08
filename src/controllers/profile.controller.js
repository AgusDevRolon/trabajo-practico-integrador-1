import Profile from "../models/profile.model.js";

export const createProfile = async (req, res) => {
  try {
    const newProfile = await Profile.create(req.body);
    return res.status(201).json(newProfile);
  } catch (error) {
    console.error("createProfile :: error:", error);
    return res.status(500).json({ error: "Error interno al crear perfil", msg: error.message });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const allProfiles = await Profile.findAll();
    if (!allProfiles.length) return res.status(404).json({ msg: "No existen perfiles" });
    return res.status(200).json(allProfiles);
  } catch (error) {
    console.error("getAllProfiles :: error:", error);
    return res.status(500).json({ error: "Error interno al listar perfiles", msg: error.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });
    return res.status(200).json(profile);
  } catch (error) {
    console.error("getProfileById :: error:", error);
    return res.status(500).json({ error: "Error interno al obtener perfil", msg: error.message });
  }
};

export const updateProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });

    await profile.update(req.body);
    return res.status(200).json(profile);
  } catch (error) {
    console.error("updateProfileById :: error:", error);
    return res.status(500).json({ error: "Error interno al actualizar perfil", msg: error.message });
  }
};

export const deleteProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });

    await profile.destroy();
    return res.status(200).json({ msg: "Perfil eliminado correctamente" });
  } catch (error) {
    console.error("deleteProfileById :: error:", error);
    return res.status(500).json({ error: "Error interno al eliminar perfil", msg: error.message });
  }
};
