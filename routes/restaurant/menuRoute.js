import express from "express";
import {
  createMenu,
  findById,
  deleteMenu,
  editMenu,
  getMenu,
  searchMenus,
} from "../../controller/restaurant/menuController.js";
 
const router = express.Router();

router.post("/create", createMenu);
router.get("/find/:id", findById);
router.delete("/delete/:id", deleteMenu);
router.put("/edit/:id", editMenu);
router.get("/find/menu/:store_id/:category", getMenu);
router.get("/search/:store_id",  searchMenus);

export default router;
