import Message from "../../model/shopingStore/MessageModel.js";
import { Op } from "sequelize";

// สร้างข้อความใหม่
export const createMessage = async (req, res) => {
  const { store_id, name, phone, email, message } = req.body;
  try {
    const newMessage = await Message.create({
      name,
      phone,
      email,
      message,
      store_id,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// อ่านข้อความทั้งหมด
export const getMessages = async (req, res) => {
  const { store_id } = req.params;
  const { searchQuery = "", page = 1, perPage = 10 } = req.query;
  const offset = (page - 1) * perPage;
  try {
    const { rows, count } = await Message.findAndCountAll({
      where: {
        store_id: store_id,
        ...(searchQuery
          ? {
              [Op.or]: [
                { name: { [Op.like]: `%${searchQuery}%` } }, // ค้นหาใน name
                { email: { [Op.like]: `%${searchQuery}%` } }, // ค้นหาใน name
              ],
            }
          : {}), // ถ้าไม่มี searchQuery ให้แสดงสินค้าทั้งหมด
      },
      limit: parseInt(perPage), // จำนวนสินค้าที่ดึงต่อหน้า
      offset: parseInt(offset), // เริ่มต้นจากรายการที่เท่าไหร่
    });
    if (rows.length === 0) {
      return res.status(404).json({ message: "No message found" });
    }
    const totalPages = Math.ceil(count / perPage);
    res.status(200).json({
      message: rows, // ข้อมูลสินค้า
      totalItems: count, // จำนวนสินค้าทั้งหมด
      totalPages: totalPages, // จำนวนหน้าทั้งหมด
      currentPage: parseInt(page), // หน้าปัจจุบัน
      perPage: parseInt(perPage), // จำนวนสินค้าต่อหน้า
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMessage = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const [updated] = await Message.update(
        { status },
        { where: { id } }
      );
      if (updated) {
        const updatedMessage = await Message.findByPk(id);
        res.status(200).json(updatedMessage);
      } else {
        res.status(404).json({ message: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// ลบข้อความ
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Message.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Message deleted successfully" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
