import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Menu = sequelize.define("menus", {
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
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status : {
    type: DataTypes.ENUM("in_stock", "out_stock"),
    allowNull: false,
    defaultValue: "in_stock", // กำหนดค่าเริ่มต้นเป็น 'pending'
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
  product_more: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue:[],
  },
  product_special: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue:[],
  },
});

export default Menu;