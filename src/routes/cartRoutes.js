import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove/:productId", protect, removeFromCart);

export default router;
