import sequelize from "../config/databaseConection.js";
import { DataTypes } from "sequelize";

export const modelProduct = sequelize.define("modelProduct", {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

modelProduct.sync()