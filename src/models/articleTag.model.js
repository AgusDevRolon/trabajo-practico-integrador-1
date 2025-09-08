import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const ArticleTag = sequelize.define("ArticleTag", {
    article_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoincrement: true,
        primaryKey: true,
    },
}, {
    tableName: "articleTags", 
    timestamps: true,
});

export default ArticleTag;