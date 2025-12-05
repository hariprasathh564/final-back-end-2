// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     phone: String,
//     passwordHash: { type: String, required: true },
//     role: { type: String, enum: ["admin", "manager", "customer"], default: "customer" },
//   otpCode: { type:String},
// otpExpire: {type:Date},

//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);




// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     phone: String,
//     passwordHash: { type: String, required: true },
//     role: { type: String, enum: ["admin", "manager", "customer"], default: "customer" },
//     profileImage: { type: String },
//     otpCode: { type: String },
//     otpExpire: { type: Date },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);






// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ✅ Basic user info
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },

    // ✅ Password hash
    passwordHash: { type: String, required: true },

    // ✅ User role: admin, manager, or customer
    role: { type: String, enum: ["admin", "manager", "customer"], default: "customer" },

    // ✅ Profile image filename
    profileImage: { type: String },

    // ✅ OTP fields for password reset
    otpCode: { type: String },
    otpExpire: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
