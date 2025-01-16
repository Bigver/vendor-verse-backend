import { DataTypes } from "sequelize";
import sequelize from "../../database.js";
import StoreOwner from '../main/storeOwnerModel.js'

const PageRestaurantEdit = sequelize.define('page_restaurant_edits', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: StoreOwner, // เชื่อมกับตาราง Store
      key: 'id',    // เชื่อมกับคอลัมน์ id ของตาราง Store
    },
  },
  name_store: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  template: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "theme-light",
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Hi Welcome...",
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Find your food",
  },
  image: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: ["https://res.cloudinary.com/daiu8h0ep/image/upload/v1728485615/file_20241009T145333109Z.jpg.jpg" ,"https://res.cloudinary.com/daiu8h0ep/image/upload/v1728485649/file_20241009T145407291Z.jpg.jpg" , "https://res.cloudinary.com/daiu8h0ep/image/upload/v1728485679/file_20241009T145438244Z.webp.webp"],
  },
  category_template: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
  category_image: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: ["https://cdn-icons-png.freepik.com/256/2144/2144687.png?ga=GA1.1.753019484.1708109519&semt=ais_hybrid" ,"https://cdn-icons-png.freepik.com/256/790/790771.png?ga=GA1.1.753019484.1708109519&semt=ais_hybrid" , "https://cdn-icons-png.freepik.com/256/2390/2390972.png?ga=GA1.1.753019484.1708109519&semt=ais_hybrid"],
  },
  category: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: ['อาหารจานเดียว' , 'ของกินเล่น' , 'เครื่องดื่ม'],
  },
});

StoreOwner.hasOne(PageRestaurantEdit, { foreignKey: 'store_id' });  // ร้านค้าหนึ่งมีหนึ่งเพจ
PageRestaurantEdit.belongsTo(StoreOwner, { foreignKey: 'store_id' , as: 'storeOwner' }); // หน้าเพจเชื่อมกับร้านค้า

export default PageRestaurantEdit;