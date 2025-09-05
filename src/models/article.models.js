import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import user from "./user.models.js";

const article = sequelize.define("article",{
    title:{
        type: DataTypes.STRING(200),
        unique: true,
        validate:{
            len: [3, 200],
        }
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            len: [50],
        }
    },
    excerpt:{
        type: DataTypes.STRING(500),
        allowNull: true,
        validate:{
            len: [0, 300],
        }
    },
    status:{
        type: DataTypes.ENUM("published", "archived"),
        defaultValue: "published",
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: "id"
        },
        onDelete: "CASCADE",
    }
}, {
    tableName: "articles",
    timestamps: true,
});

export default article;