// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema(
//   {
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
//     amount: Number,
//     currency: { type: String, default: "USD" },
//     payment_type: { type: String, enum: ["Card", "Wallet", "Cash_on_delivery"] },
//     payment_provider_id: String,
//     status: {
//       type: String,
//       enum: ["Pending", "Succeeded", "Failed", "Refunded"],
//       default: "Pending"
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Payment", paymentSchema);
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    status: { type: String, default: "pending" },
    paymentIntentId: { type: String },
    clientSecret: { type: String }, // storing Stripe session id
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
