import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const OrderRestaurant = sequelize.define("order_restaurants", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  table_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  item_detail: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.ENUM("กำลังตรวจสอบ", "ชำระเงินแล้ว"),
    allowNull: false,
    defaultValue: "กำลังตรวจสอบ", // กำหนดค่าเริ่มต้นเป็น 'pending'
  },
});

export default OrderRestaurant;
