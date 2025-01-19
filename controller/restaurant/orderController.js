import OrderRestaurant from "../../model/restaurant/orderModel.js";
import Menu from "../../model/restaurant/menuModel.js";
import Package from "../../model/main/packageModel.js";
import { Op, fn, col , Sequelize } from 'sequelize';

export const createOrder = async (req, res) => {
  const { store_id, item_detail, price, table_id , package_id} = req.body;
 
  try {
    const packageData = await Package.findByPk(package_id);
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    const orderCount = await OrderRestaurant.count({
      where: {
        store_id: store_id,
        [Op.and]: [
          Sequelize.where(fn('DATE', col('createdAt')), { [Op.eq]: fn('CURDATE') })
        ]
      }
    });
    if (orderCount >= packageData.order) { 
      return res.status(404).json({ message: "สั่งซื้อไม่สำเร็จ: เกินจำนวนคำสั่งซื้อที่กำหนด" });
    }

    item_detail.forEach(async (menu) => {
      const existingMenu = await Menu.findOne({ where: { id: menu.id } });
      if (existingMenu) {
        const newSale = existingMenu.sale + menu.quantity;
        // อัปเดตในฐานข้อมูล
        await existingMenu.update({ sale: newSale });
      } else {
        return res.status(500).json({ error: error.message });
      }
    });

    const order = await OrderRestaurant.findOne({
      where: {
        store_id: store_id,
        table_id: table_id,
        payment_status: "กำลังตรวจสอบ", 
      },
      order: [["createdAt", "DESC"]], 
      limit: 1, 
    });

    let createOrder;

    if (!order) {
      createOrder = await OrderRestaurant.create({
        store_id,
        item_detail,
        price,
        table_id,
      });
    } else {
      const newPrice = order.price + price;
      const itemDetail = order.item_detail.map(item => item);

      // แล้วทำการ push ข้อมูลเข้าไปใน itemDetail
      item_detail.forEach((item) => {
          itemDetail.push(item);
      });
      
      await order.update({
          item_detail: itemDetail,
          price: newPrice,
      });
    }

    res.status(201).json(createOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  const { store_id } = req.params;
  try {
    const orderData = await OrderRestaurant.findAll({
      where: { store_id: store_id },
      order: [["createdAt", "DESC"]],
    });
    if (!orderData) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderRestaurant.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findOrderLast = async (req, res) => {
  const { table_id , store_id } = req.params; // สมมติว่าใช้ table_id เป็นพารามิเตอร์
  try {
    const order = await OrderRestaurant.findOne({
      where: {
        table_id: table_id,
        store_id: store_id,
        payment_status: "กำลังตรวจสอบ", // สมมติว่าคุณมีฟิลด์นี้
      },
      order: [["createdAt", "DESC"]], // ดึงข้อมูลตามลำดับเวลาล่าสุด
      limit: 1, // ดึงข้อมูลล่าสุดเพียงรายการเดียว
    });

    if (!order) {
      return res.status(404).json({ message: "ไม่มีรายการสั่งอาหาร" });
    }

    res.status(200).json(order); // คืนข้อมูลออเดอร์ล่าสุดที่ยังไม่ได้ชำระ
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderRestaurant.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();

    res.status(200).json({ message: "Oder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateStatusOrder = async (req, res) => {
  const { id } = req.params;
  const { payment_status } = req.body;
  try {
    const editOrder = await OrderRestaurant.findByPk(id);
    if (!editOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    await editOrder.update({
      payment_status
    });
    res.status(200).json(editOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchOrders = async (req, res) => {
  const { store_id } = req.params;
  const { searchQuery = '', page = 1, perPage = 10 } = req.query;

  const offset = (page - 1) * perPage;

  try {
    const { rows, count } = await OrderRestaurant.findAndCountAll({
      where: {
        store_id: store_id,
        [Op.or]: [
          { id: { [Op.like]: `%${searchQuery}%` } },
          { table_id: { [Op.like]: `%${searchQuery}%` } },
          { payment_status: { [Op.like]: `%${searchQuery}%` } },
        ],
      },
      limit: parseInt(perPage),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    const totalPages = Math.ceil(count / perPage);

    res.status(200).json({
      orders: rows,
      totalItems: count,
      totalPages,
      currentPage: parseInt(page),
      perPage: parseInt(perPage),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getOrderRealtime = async (req, res) => {
  const { store_id } = req.params;
  try {
    const orderData = await OrderRestaurant.findAll({
      where: { store_id: store_id ,  payment_status : "กำลังตรวจสอบ"},
    });
    if (!orderData) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};