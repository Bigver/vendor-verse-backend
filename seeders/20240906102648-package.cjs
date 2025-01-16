'use strict';

const Sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    // เพิ่มข้อมูล seed เข้าไปในตาราง
    await queryInterface.bulkInsert('Packages', [
      {
        id: 1,
        name: 'STARTER',
        detail: 'เหมาะสำหรับเริ่มต้น',
        price: 0,
        order: 50,
        product: 20,
        duration: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'GROWTH',
        detail: 'เหมาะสำหรับการค้าขายบนโลกออนไลน์',
        price: 400,
        order: 300,
        product: 50,
        duration: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'ADVANCE',
        detail: 'เหมาะสำหรับร้านคาเฟ่ ร้านอาหารที่มีจำนวน order เยอะ',
        price: 1000,
        order: 3000,
        product: 200,
        duration: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // ลบข้อมูล seed
    await queryInterface.bulkDelete('Packages', null, {});
  }
};
