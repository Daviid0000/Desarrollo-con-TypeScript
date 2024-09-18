import sequelize from "../config/databaseConection.js";
import { DataTypes } from "sequelize";

export const ModelShipments = sequelize.define("ModelShipments", {

    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    organizationRecep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyDist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statusProduct: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateSend: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

ModelShipments.sync()