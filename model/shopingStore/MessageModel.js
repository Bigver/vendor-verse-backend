import { DataTypes } from "sequelize";
import sequelize from "../../database.js"; // นำเข้าการตั้งค่า database

const Message = sequelize.define("messages", {
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
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("ยังไม่ได้อ่าน", "อ่านแล้ว"),
    allowNull: false,
    defaultValue: "ยังไม่ได้อ่าน", // กำหนดค่าเริ่มต้นเป็น 'pending'
  },
});

export default Message;
