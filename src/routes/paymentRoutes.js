// import express from "express";
// import {
//   createPayment,
//   getPayments,
// } from "../controllers/paymentController.js";
// import { protect, authorize } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // ✅ Create a payment record
// router.post("/", protect, createPayment);

// // ✅ Admin/Manager view all payments
// router.get("/", protect, authorize("admin", "manager"), getPayments);

// export default router;




// import express from "express";
// import {
//   createPayment,getPayments,stripeWebhook } from "../controllers/paymentController.js";
// import { protect, authorize } from "../middlewares/authMiddleware.js";
// import bodyParser from "body-parser"; // needed for webhook raw body

// const router = express.Router();

// // ✅ Create payment (Stripe + MongoDB)
// router.post("/", protect, createPayment);

// // ✅ Admin/Manager can view all payments
// router.get("/", protect, authorize("admin", "manager"), getPayments);

// // ✅ Stripe Webhook endpoint (no auth middleware)
// router.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }), // Stripe requires raw body
//   stripeWebhook
// );

// export default router;



// // src/routes/paymentRoutes.js
// import express from "express";
// import {
//   createPayment,
//   getPayments,
//   stripeWebhook,
// } from "../controllers/paymentController.js";
// import { protect, authorize } from "../middlewares/authMiddleware.js";
// import bodyParser from "body-parser";

// const router = express.Router();

// // ✅ Stripe Webhook
// router.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   stripeWebhook
// );

// // ✅ Create a payment
// router.post("/", protect, createPayment);

// // ✅ Admin/Manager get all payments
// router.get("/", protect, authorize("admin", "manager"), getPayments);

// export default router;


// import express from "express";
// import { createPayment, confirmPayment, getAllPayments } from "../controllers/paymentController.js";
// import { protect, adminOnly } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/", protect, createPayment);
// router.post("/confirm", protect, confirmPayment);
// router.get("/all", protect, adminOnly, getAllPayments);

// export default router;


import express from "express";
import { createPayment, confirmPayment, getAllPayments } from "../controllers/paymentController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPayment);

// ❗ remove protect — Stripe redirect has no token
router.post("/confirm", confirmPayment);

router.get("/all", protect, adminOnly, getAllPayments);

export default router;






// import express from "express";
// import {
//   createPayment,
//   confirmPayment,
//   getAllPayments
// } from "../controllers/paymentController.js";
// import { protect } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // -------------------------
// // Create Payment (Checkout Session)
// router.post("/create", protect, createPayment);

// // Confirm Payment after successful Stripe checkout
// router.post("/confirm", protect, confirmPayment);

// // Admin: Get All Payments
// router.get("/", protect, getAllPayments);

// export default router;
