import sequelize from "../config/databaseConection.js";
import { DataTypes, fn } from "sequelize";

export const modelProduct = sequelize.define("modelProduct", {

    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubication: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adquisition:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: fn("NOW"),
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    distributed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

modelProduct.sync()