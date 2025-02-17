import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: "root",
    password: null,
    database: "vendorverse",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_TEST_HOST,
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
};