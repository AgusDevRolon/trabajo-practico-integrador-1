import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Tag = sequelize.define("Tag", {
    name:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    }
}, {
    tableName: "tags",
    timestamps: true,
});

export default Tag;