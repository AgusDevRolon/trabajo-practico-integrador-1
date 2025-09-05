import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const user = sequelize.define("user",{
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate:{
            len: [3, 20], 
        }
    },
    email:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate:{
            isEmail:true, 
        }
    },
    password:{
        type: DataTypes.STRING(225), 
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user" 
    }
    

}, {
    tableName: "users", 
    timestamps: true, 
    paranoid: true, 
});

export default user;