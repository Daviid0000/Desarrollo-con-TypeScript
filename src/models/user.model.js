import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConection.js";

export const userModel = sequelize.define("userModel", {

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

userModel.sync();