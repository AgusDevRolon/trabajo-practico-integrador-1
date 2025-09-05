import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const tag = sequelize.define("tag", {
    name:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate:{
            len: [2, 30],
            notEmpty: true, 
        }
    }
}, {
    tableName: "tags",
    timestamps: true,
});

export default tag;