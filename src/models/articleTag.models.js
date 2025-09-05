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

Article.associate = (models)=>{
    models.Article.belongsToMany(models.Tag, {through: models.ArticleTag, as: "tags", foreignKey: "article_id"});
};

export default ArticleTag;