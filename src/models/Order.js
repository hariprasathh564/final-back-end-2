// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     order_number: String,
//     items: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         qty: Number,
//         unitPrice: Number
//       }
//     ],
//     subtotal: Number,
//     tax: Number,
//     shipping_fee: Number,
//     total: Number,
//     status: {
//       type: String,
//       enum: ["Pending", "Confirmed", "Packed", "Out_for_delivery", "Delivered", "Canceled", "Refunded"],
//       default: "Pending"
//     },
//     payment_status: {
//       type: String,
//       enum: ["Pending", "Paid", "Refunded"],
//       default: "Pending"
//     },
//     delivery_address: Object
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);




import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order_number: String,
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: Number,
        unitPrice: Number
      }
    ],
    subtotal: Number,
    tax: Number,
    shipping_fee: Number,
    total: Number,
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Packed", "Out_for_delivery", "Delivered", "Canceled", "Refunded"],
      default: "Pending"
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Paid", "Refunded"],
      default: "Pending"
    },
    delivery_address: Object
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
