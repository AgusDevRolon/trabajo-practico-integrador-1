import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const User = sequelize.define("User",{
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    email:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING(225), 
        allowNull: false,
    },
    role:{
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
    }
}, {
    tableName: "users", 
    timestamps: true, 

    
    hooks:{
        beforeCreate: async (user)=>{
            if (user.password){
                const salt = await bcrypt.genSalt(10); 
                user.password = await bcrypt.hash(user.password, salt); 
            }
        },
        beforeUpdate: async (user)=>{
            if (user.changed("password")){
                const salt = await bcrypt.genSalt(10);  
                user.password = await bcrypt.hash(user.password, salt); 
            }
        }
    }
});


User.associate = (models)=>{
    models.User.hasOne(models.Profile, {foreignKey: "user_id", as: "profile", onDelete: "CASCADE"}); 
    models.Profile.belongsTo(models.User, {foreignKey: "user_id", as: "user"});

    models.User.hasMany(models.Article, {foreignKey: "user_id", as: "articles", onDelete: "CASCADE"}); 
    models.Article.belongsTo(models.User, {foreignKey: "user_id", as: "author"});
};

export default User;