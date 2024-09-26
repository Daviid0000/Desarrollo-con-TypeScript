import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConection.js";
import { rols } from "../types/types.js";

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
        type: DataTypes.ENUM(rols.ADMIN, rols.COMPANY_EMISOR, rols.ORGANIZATION_RECEPTOR),
        defaultValue: rols.COMPANY_EMISOR,
        allowNull: false
    }
})

companyModel.sync();