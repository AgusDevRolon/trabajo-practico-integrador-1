import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import article from "./article.models.js";
import tag from "./tag.models.js";

const articleTag = sequelize.define("articleTag", {
    article_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: article,
            key: "id"
        },
        onDelete: "CASCADE",
    },
    tag_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tag,
            key: "id"
        },
        onDelete: "CASCADE",
    },
}, {
    tableName: "article_Tags", 
    timestamps: true,
});

export default articleTag;