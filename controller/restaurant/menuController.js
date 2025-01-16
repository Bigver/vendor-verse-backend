import Menu from "../../model/restaurant/menuModel.js";
import { Op } from "sequelize";

export const createMenu = async (req, res) => {
  const {
    store_id,
    name,
    detail,
    product_img,
    product_more,
    product_special,
    price,
    category,
    limit_menu
  } = req.body;
  try {
    const menuCount = await Menu.count({
      where: { store_id : store_id }, 
    });

    if (menuCount >= limit_menu) { 
      return res.status(404).json({ message: "เพิ่มไม่สำเร็จ: เกินจำนวนที่กำหนด" });
    }
    
    const createMenu = await Menu.create({
      store_id,
      name,
      detail,
      product_img,
      product_more,
      price,
      category,
      product_special,
    });
    res.status(201).json(createMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMenu = async (req, res) => {
  const { store_id, category } = req.params;
  try {
    let menuData;
    if (category === "all") {
      menuData = await Menu.findAll({
        where: { store_id: store_id },
      });
    } else {
      menuData = await Menu.findAll({
        where: { store_id: store_id, category: category },
      });
    }

    if (!menuData) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menuData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editMenu = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    detail,
    product_img,
    product_more,
    product_special,
    price,
    status,
    category,
  } = req.body;

  try {
    const editMenu = await Menu.findByPk(id);

    if (!editMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    await editMenu.update({
      name,
      detail,
      product_img,
      product_more,
      product_special,
      price,
      status,
      category,
    });

    res.status(200).json(editMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ message: "menu not found" });
    }
    await menu.destroy();
    res.status(200).json({ message: "menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchMenus = async (req, res) => {
  const { store_id } = req.params;
  const { searchQuery = '', page = 1, perPage = 10 } = req.query;
  // คำนวณค่า offset และ limit สำหรับ pagination
  const offset = (page - 1) * perPage;

  try {
    const { rows, count } = await  Menu.findAndCountAll({
      where: {
        store_id: store_id,
        ...(searchQuery
          ? {
              [Op.or]: [
                { id: { [Op.like]: `%${searchQuery}%` } }, // ค้นหาใน id
                { name: { [Op.like]: `%${searchQuery}%` } }, // ค้นหาใน name
                { category: { [Op.like]: `%${searchQuery}%` } }, // ค้นหาใน name
              ],
            }
          : {}), // ถ้าไม่มี searchQuery ให้แสดงสินค้าทั้งหมด
      },
      limit: parseInt(perPage), // จำนวนสินค้าที่ดึงต่อหน้า
      offset: parseInt(offset), // เริ่มต้นจากรายการที่เท่าไหร่
    });


    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(count / perPage);
    res.status(200).json({
      menus: rows,  // ข้อมูลสินค้า
      totalItems: count,  // จำนวนสินค้าทั้งหมด
      totalPages: totalPages,  // จำนวนหน้าทั้งหมด
      currentPage: parseInt(page),  // หน้าปัจจุบัน
      perPage: parseInt(perPage),  // จำนวนสินค้าต่อหน้า
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
