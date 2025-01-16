import express from "express";
import { createOrder,findById,deleteOrder , findOrderLast , getOrder , updateStatusOrder, searchOrders } from "../../controller/restaurant/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/find/:id", findById);
router.get("/findlast/:store_id/:table_id", findOrderLast);
router.delete("/delete/:id", deleteOrder);
router.get("/find/all/:store_id", getOrder);
router.put("/updateStatus/:id", updateStatusOrder);
router.get("/search/:store_id", searchOrders);

export default router;
