




// import express from "express";
// import {
//   getUserOrders,
//   getAllOrders,
//   updateOrderStatus
// } from "../controllers/orderController.js";
// import { protect, adminOnly } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Get logged-in user's orders
// router.get("/myorders", protect, getUserOrders);

// // Admin - all orders
// router.get("/all", protect, adminOnly, getAllOrders);

// // Admin - update order status
// router.put("/:id/status", protect, adminOnly, updateOrderStatus);

// export default router;


import express from "express";
import { getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/myorders", protect, getUserOrders);
router.get("/all", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
