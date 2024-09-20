import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConection.js";

export const companyModel = sequelize.define("userModel", {

    company: {
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
    },
    rol: {
        type: DataTypes.ENUM("ADMIN", "COMPANY_EMISOR", "ORGANIZATION_RECEPTOR"),
        defaultValue: "COMPANY_EMISOR",
        allowNull: false
    }
})

companyModel.sync();