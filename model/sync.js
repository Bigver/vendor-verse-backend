import sequelize from  "../database.js";
import User from './main/userModel.js';
import Package from './main/packageModel.js';
import StoreOwner from './main/storeOwnerModel.js';
import {PageEdit} from './shopingStore/pageModel.js';
import Product from "./shopingStore/productModel.js";
import Message from "./shopingStore/MessageModel.js";
import Payment from "./main/paymentModel.js";
import OrderResturant from "./restaurant/orderModel.js";
import OrderStore from "./shopingStore/orderModel.js";
import Menu from "./restaurant/menuModel.js";
import PageResturantEdit from "./restaurant/pageModel.js";
import Blog from './main/BlogModel.js';
import TemplateStore from "./shopingStore/templateModel.js";
import TemplateRestaurant from "./restaurant/templateModel.js";


sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create table : ', err);
  });
  