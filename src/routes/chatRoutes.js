import express from "express";
import {
  sendMessage,
  getChatHistory,
  getAllChats,
  deleteChatAdmin
} from "../controllers/chatController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User chat
router.post("/", protect, sendMessage);
router.get("/", protect, getChatHistory);

// Admin chat list
router.get("/admin/all", protect, adminOnly, getAllChats);


// Delete a chat (Admin only)
router.delete("/admin/:id", protect, adminOnly, deleteChatAdmin);


export default router;

