import { DataTypes } from "sequelize";
import sequelize from "../config/database";

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

Article.associate = (models)=>{
    models.Article.belongsTo(models.User, {foreignKey: "user_id", as: "author"});

    models.Article.belongsToMany(models.Tag, {
        through: models.ArticleTag,
        as: "tags",
        foreignKey: "article_id",
        onDelete: "CASCADE"
    });
}

export default Article;