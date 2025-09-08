import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User",{
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    email:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING(225), 
        allowNull: false,
    },
    role:{
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
    }
}, {
    tableName: "users", 
    timestamps: true, 
});

export default User;