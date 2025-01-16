import { DataTypes } from "sequelize";
import sequelize from "../../database.js";
import Package from './packageModel.js'

const StoreOwner = sequelize.define('store_owner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name_store: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,

  },
  select_store: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  package_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Package,
      key: 'id',    
    },
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  permission: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
});

Package.hasOne(StoreOwner, { foreignKey: 'package_id' });  // ร้านค้าหนึ่งมีหนึ่งเพจ
StoreOwner.belongsTo(Package, { foreignKey: 'package_id' , as: 'packageId' }); // หน้าเพจเชื่อมกับร้านค้า

export default StoreOwner;