import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    courier: String,
    tracking_number: String,
    status: {
      type: String,
      enum: ["Pending", "Picked_up", "In_transit", "Delivered"],
      default: "Pending"
    },
    assigned_driver_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Shipment", shipmentSchema);
