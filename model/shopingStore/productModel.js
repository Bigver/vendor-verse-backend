import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Product = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detail: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  product_img: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue:"",
  },
  product_more1: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue:"",
  },
  product_more2: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue:"",
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  sale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;