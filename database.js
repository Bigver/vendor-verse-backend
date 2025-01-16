import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, 
    dialect: "mysql", 
    dialectOptions: {
      charset: "utf8mb4",
    },
    port: Number(process.env.DB_PORT) || 3306,        
    logging: false,
    define: {
      timestamps: true
    },
    timezone: "+07:00", 
});


export default sequelize;
