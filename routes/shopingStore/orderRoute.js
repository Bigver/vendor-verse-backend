import express from "express";
import { createOrder,findById,filterOrder,deleteOrder,editOrder , findAll , updateStatus , searchOrders} from "../../controller/shopingStore/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/find/:id", findById);
router.get("/filter/:keyword", filterOrder);
router.get("/find/all/:store_id", findAll);
router.delete("/delete/:id", deleteOrder);
router.put("/edit/:id", editOrder);
router.put("/update/status/:id", updateStatus);
router.get("/search/:store_id", searchOrders);

export default router;
