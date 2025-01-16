import Product from "../../model/shopingStore/productModel.js";
import { Op } from "sequelize";

export const createProduct = async (req, res) => {
  const {
    store_id,
    name,
    detail,
    product_img,
    product_more1,
    product_more2,
    price,
    stock,
    category,
    limit_product
  } = req.body;
  try {
    const productCount = await Product.count({
      where: { store_id : store_id }, 
    });
    
    if (productCount >= limit_product) { 
      return res.status(404).json({ message: "เพิ่มไม่สำเร็จ: เกินจำนวนที่กำหนด" });
    }
    const createProduct = await Product.create({
      store_id,
      name,
      detail,
      product_img,
      product_more1,
      product_more2,
      price,
      stock,
      category,
    });
    res.status(201).json(createProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { store_id, category } = req.params;
  try {
    let productData;
    if (category === "all") {
      productData = await Product.findAll({
        where: { store_id: store_id },
      });
    } else {
      productData = await Product.findAll({
        where: { store_id: store_id , category: category },
      });
    }

    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductList = async (req, res) => {
  const { store_id } = req.params;
  try {
    const productData = await Product.findAll({
      where: { store_id: store_id },
    });
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    detail,
    product_img,
    product_more1,
    product_more2,
    price,
    stock,
    category,
  } = req.body;

  try {
    const editProduct = await Product.findByPk(id);
    if (!editProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await editProduct.update({
      name,
      detail,
      product_img,
      product_more1,
      product_more2,
      price,
      stock,
      category,
    });

    res.status(200).json(editProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterProduct = async (req, res) => {
  const { keyword } = req.params;
  try {
    let products;
    if (!keyword || keyword === "") {
      products = await Product.findAll();
    } else {
      console.log(keyword);
      products = await Product.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${keyword}%` } },
            { id: { [Op.like]: `%${keyword}%` } },
          ],
        },
      });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const searchProducts = async (req, res) => {
  const { store_id } = req.params;
  const { searchQuery = '', page = 1, perPage = 10 } = req.query;
  const offset = (page - 1) * perPage;

  try {
    const { rows, count } = await Product.findAndCountAll({
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

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(count / perPage);

    res.status(200).json({
      products: rows,  // ข้อมูลสินค้า
      totalItems: count,  // จำนวนสินค้าทั้งหมด
      totalPages: totalPages,  // จำนวนหน้าทั้งหมด
      currentPage: parseInt(page),  // หน้าปัจจุบัน
      perPage: parseInt(perPage),  // จำนวนสินค้าต่อหน้า
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
