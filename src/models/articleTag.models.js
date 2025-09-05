import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import article from "./article.models.js";
import tag from "./tag.models.js";

const ArticleTag = sequelize.define("ArticleTag", {
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
    tableName: "articleTags", 
    timestamps: true,
});

Article.associate = (models)=>{
    models.Article.belongsToMany(models.Tag, {through: models.ArticleTag, as: "tags", foreignKey: "article_id"});
};

export default ArticleTag;