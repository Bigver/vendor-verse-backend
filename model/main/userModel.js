import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true, // อนุญาตให้ค่านี้ว่างได้
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true, // อนุญาตให้ค่านี้ว่างได้
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue : "user"
  },
});

export default User;