'use strict';

export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shippings", "name_bank", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "กสิกรไทย", // กำหนดค่าเริ่มต้น
    });

    // อัปเดตค่าของข้อมูลเก่าเป็นค่า default
    await queryInterface.sequelize.query(
      `UPDATE orders SET name_bank = 'กสิกรไทย' WHERE name_bank IS NULL;`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("shippings", "name_bank");
  },
};

