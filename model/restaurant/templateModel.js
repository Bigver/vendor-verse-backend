// models/Template.js
import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

const TemplateRestaurant = sequelize.define('template_restaurants', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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

export default TemplateRestaurant;
