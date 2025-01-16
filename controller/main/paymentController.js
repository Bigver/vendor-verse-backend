import StoreOwner from "../../model/main/storeOwnerModel.js";
import Payment from "../../model/main/paymentModel.js";
import { Op } from "sequelize";

export const createPayment = async (req, res) => {
  const {
    user_id,
    price,
    image,
    status,
  } = req.body;
  try {
    const createPayment = await Payment.create({
        user_id,
        price,
        image,
        status,
    });
    res.status(201).json(createPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};


export const getPaymentId = async (req, res) => {
  const user_id = req.params.user_id
    try {
      const paymentData = await Payment.findAll(
        {
          where : { user_id: user_id }, 
        }
      );
      res.status(201).json(paymentData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  export const getPayment = async (req, res) => {
    const { searchQuery = "", page = 1, perPage = 10 } = req.query; // รับค่าการค้นหาและแบ่งหน้า
    const offset = (page - 1) * perPage; // คำนวณ offset สำหรับการแบ่งหน้า
    try {
      const { rows, count } = await Payment.findAndCountAll({
        where: {
          [Op.or]: [
            { id: { [Op.like]: `%${searchQuery}%` } }, // ค้นหาด้วย id
            { status: { [Op.like]: `%${searchQuery}%` } }, // ค้นหาด้วย status
            { user_id: { [Op.like]: `%${searchQuery}%` } },
          ],
        },
        limit: parseInt(perPage), // จำนวนรายการต่อหน้า
        offset: parseInt(offset), // ข้ามรายการก่อนหน้า
        order: [["createdAt", "DESC"]], // เรียงตามวันที่สร้างล่าสุด
      });
  
      const totalPages = Math.ceil(count / perPage); // คำนวณจำนวนหน้าทั้งหมด
  
      res.status(200).json({
        payments: rows,
        totalItems: count,
        totalPages,
        currentPage: parseInt(page),
        perPage: parseInt(perPage),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status  } = req.body;
    try {
      const updateStatus = await Payment.findByPk(id);
      if (!updateStatus) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      await updateStatus.update({
        status,
      });
  
      res.status(200).json(updateStatus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  