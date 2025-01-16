import express from "express";
import {
  createProduct,
  filterProduct,
  findById,
  deleteProduct,
  editProduct,
  getProduct,
  getProductList,
  searchProducts
} from "../../controller/shopingStore/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/find/:id", findById);
router.get("/filter/:keyword", filterProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/edit/:id", editProduct);
router.get("/find/product/:store_id/:category", getProduct);
router.get("/findAll/:store_id",  getProductList);
router.get("/search/:store_id",  searchProducts);

export default router;
