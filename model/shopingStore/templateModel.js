// models/Template.js
import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

const TemplateStore = sequelize.define('template_stores', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false, // รูปภาพต้องมีเสมอ
  },
});

export default TemplateStore;
