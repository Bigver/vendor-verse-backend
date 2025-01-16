import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Payment = sequelize.define('payments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trans_ref: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("กำลังตรวจสอบ", "ตรวจสอบแล้ว"),
    allowNull: false,
    defaultValue: "กำลังตรวจสอบ", // กำหนดค่าเริ่มต้นเป็น 'pending'
  },
});

export default Payment;