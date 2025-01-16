import express from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
  updateMessage,
} from "../../controller/shopingStore/MessageController.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:store_id", getMessages);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;