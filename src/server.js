


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import ReviewRoutes from "./routes/reviewRoutes.js";
import ChatRoutes from "./routes/chatRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adRoutes from "./routes/adRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminChatRoutes from "./routes/adminRoutes.js";




dotenv.config();
connectDB();

const app = express();

// Fix dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------
// 🔥 1. Ensure Upload Folders Exist
// ---------------------------------------
const profilePath = path.join(__dirname, "uploads/profile");
if (!fs.existsSync(profilePath)) {
  fs.mkdirSync(profilePath, { recursive: true });
  console.log("📁 Created: /uploads/profile");
}

const adPath = path.join(__dirname, "uploads/ads");
if (!fs.existsSync(adPath)) {
  fs.mkdirSync(adPath, { recursive: true });
  console.log("📁 Created: /uploads/ads");
}

// ---------------------------------------
// 🔥 2. Serve uploads statically
// ---------------------------------------
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// ---------------------------------------
// 🔥 3. Stripe Webhook (raw body required)
// ---------------------------------------
app.post(
  "/api/payments/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res, next) => next()
);

// ---------------------------------------
// 🔥 4. Middlewares
// ---------------------------------------
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ---------------------------------------
// 🔥 5. Routes
// ---------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/chats", ChatRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes); // Admin routes for users
app.use("/api/admin/chats", adminChatRoutes);




app.get("/", (req, res) => res.send("🚀 B2C E-Commerce Backend Running"));

// ---------------------------------------
// 🔥 6. Start Server
// ---------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
