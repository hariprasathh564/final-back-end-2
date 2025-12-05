import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const userCount = await User.countDocuments();

    res.json({
      products: productCount,
      orders: orderCount,
      users: userCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load stats" });
  }
});

export default router;
