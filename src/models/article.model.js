import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Article = sequelize.define("Article",{
    title:{
        type: DataTypes.STRING(200),
        unique: true,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    excerpt:{
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    status:{
        type: DataTypes.ENUM("published", "archived"),
        defaultValue: "published",
    },
}, {
    tableName: "articles",
    timestamps: true,
});

export default Article;