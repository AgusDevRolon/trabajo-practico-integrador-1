import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Tag = sequelize.define("Tag", {
    name:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    }
}, {
    tableName: "tags",
    timestamps: true,
});

Tag.associate = (models)=>{
    models.Tag.belongToMany(models.Article, {through: models.ArticleTag, as: "articles", foreignKey: "tag_id"});
};

export default Tag;