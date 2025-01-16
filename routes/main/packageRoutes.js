import express from "express";
import {
  createPackage,
  deletePackage,
  getPackage,
  getPackageById,
  updatePackage,
} from "../../controller/main/packageController.js";
import { adminMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", adminMiddleware, createPackage);
router.get("/", getPackage);
router.put("/update/:id", adminMiddleware, updatePackage);
router.delete("/delete/:id", adminMiddleware, deletePackage);
router.get("/find/:id", getPackageById);

export default router;
