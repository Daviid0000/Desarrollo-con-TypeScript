import sequelize from "../config/databaseConection.js";
import { DataTypes } from "sequelize";

export const modelProduct = sequelize.define("modelProduct", {

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
        allowNull: false
    }
})

modelProduct.sync()