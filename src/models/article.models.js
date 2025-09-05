import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import user from "./user.models.js";

const Article = sequelize.define("Article",{
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
            len: [50, 5000],
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