import Package from "../../model/main/packageModel.js";
import OrderStore from "../../model/shopingStore/orderModel.js";
import Product from "../../model/shopingStore/productModel.js";
import { Op, fn, col, Sequelize } from "sequelize";

export const createOrder = async (req, res) => {
  const { store_id, user_detail, item_detail, price, payment_img, package_id } = req.body;
  try {
    const packageData = await Package.findByPk(package_id);
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    const orderCount = await OrderStore.count({
      where: {
        store_id: store_id,
        [Op.and]: [
          Sequelize.where(fn("DATE", col("createdAt")), {
            [Op.eq]: fn("CURDATE"),
          }),
        ],
      },
    });

    if (orderCount >= packageData.order) {
      return res
        .status(404)
        .json({ message: "สั่งซื้อไม่สำเร็จ: เกินจำนวนคำสั่งซื้อที่กำหนด" });
    }

    for (const product of item_detail) {
      try {
        const existingProduct = await Product.findOne({ where: { id: product.id } });
        if (existingProduct) {
          const newStock = existingProduct.stock - product.quantity;
          const newSale = existingProduct.sale + product.quantity;
          await existingProduct.update({ stock: newStock, sale: newSale });
        } else {
          return res.status(404).json({ message: "Product not found for ID: " + product.id });
        }
      } catch (error) {
        return res.status(500).json({ message: "Error updating product: " + error.message });
      }
    }

    const createOrder = await OrderStore.create({
      store_id,
      user_detail,
      item_detail,
      price,
      payment_img,
    });
    res.status(201).json(createOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderStore.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findAll = async (req, res) => {
  const { store_id } = req.params;
  try {
    const order = await OrderStore.findAll({
      where: { store_id: store_id },
      order: [["createdAt", "DESC"]],
    });
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterOrder = async (req, res) => {
  const { keyword } = req.params;
  try {
    let orders;
    if (!keyword || keyword === "") {
      orders = await OrderStore.findAll();
    } else {
      orders = await OrderStore.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${keyword}%` } },
            { id: { [Op.like]: `%${keyword}%` } },
          ],
        },
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editOrder = async (req, res) => {
  const { id } = req.params;
  const { store_id, user_detail, payment } = req.body;

  try {
    const editOrder = await OrderStore.findByPk(id);

    if (!editOrder) {
      return res.status(404).json({ message: "Product not found" });
    }

    await editOrder.update({
      store_id,
      user_detail,
      payment,
    });

    res.status(200).json(editOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderStore.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();

    res.status(200).json({ message: "Oder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { payment_status, shipping_status } = req.body;
  try {
    const editOrder = await OrderStore.findByPk(id);
    if (!editOrder) {
      return res.status(404).json({ message: "Product not found" });
    }

    await editOrder.update({
      payment_status,
      shipping_status,
    });

    res.status(200).json(editOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchOrders = async (req, res) => {
  const { store_id } = req.params;
  const { searchQuery = "", page = 1, perPage = 10 } = req.query;

  const offset = (page - 1) * perPage;
  try {
    const { rows, count } = await OrderStore.findAndCountAll({
      where: {
        store_id: store_id,
        [Op.or]: [
          { id: { [Op.like]: `%${searchQuery}%` } },
          { shipping_status: { [Op.like]: `%${searchQuery}%` } },
          { payment_status: { [Op.like]: `%${searchQuery}%` } },
        ],
      },
      limit: parseInt(perPage),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
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
