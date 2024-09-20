import { Dialect, Sequelize } from "sequelize";
import "dotenv/config"

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_DIALECT) {
  throw new Error("Missing required database environment variables");
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect
  });

export default sequelize