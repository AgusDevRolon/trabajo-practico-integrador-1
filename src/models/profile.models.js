import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import user from "./user.models.js";

const Profile = sequelize.define("Profile",{
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: user,
            key: "id"
        },
        onDelete: "CASCADE",
    },
    first_name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    biography:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    avatar_url:{
        type: DataTypes.STRING(255),
        allowNull: true
    },
    birth_date:{
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    tableName: "profiles",
    timestamps: true
});

Profile.associate = (models)=>{
    models.Profile.belongsTo(models.User, {foreignKey: "user_id", as: "user"});
};

export default Profile;