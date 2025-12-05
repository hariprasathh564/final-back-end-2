import express from "express";
import {
  createShipment,
  updateShipmentStatus,
} from "../controllers/shipmentController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Create a shipment (Admin or Manager)
router.post("/", protect, authorize("admin", "manager"), createShipment);

// ✅ Update shipment status
router.patch("/:id", protect, authorize("admin", "manager"), updateShipmentStatus);

export default router;
