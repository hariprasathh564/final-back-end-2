// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: String,
//     category: { type: String, enum: ["Milk", "Soda", "Pack", "Accessory"] },
//     price: { type: Number, required: true },
//     unit: { type: String, enum: ["ml", "litre", "pack"] },
//     images: [String],
//     stock_level: { type: Number, default: 0 }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);



import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Product name
    description: String,
    category: { type: String, enum: ["Milk", "Soda", "Pack", "Accessory"] },
    price: { type: Number, required: true },
    unit: { type: String, enum: ["ml", "litre", "pack"] },
    images: [String], // array of image filenames/URLs
    stock_level: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
