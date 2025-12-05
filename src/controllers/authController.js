

// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import nodemailer from "nodemailer";

// // ✅ JWT generator
// const generateToken = (user) =>
//   jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });

// // ✅ Register user
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, phone, password, role } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(400).json({ message: "Email already exists" });

//     const passwordHash = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       phone,
//       passwordHash,
//       role: role || "customer",
//     });

//     res.status(201).json({ user, token: generateToken(user) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Login user
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "Invalid credentials" });

//     const match = await bcrypt.compare(password, user.passwordHash);
//     if (!match)
//       return res.status(401).json({ message: "Invalid credentials" });

//     res.json({ user, token: generateToken(user) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Get user profile
// export const getProfile = async (req, res) => {
//   const user = await User.findById(req.user.id).select("-passwordHash");
//   res.json(user);
// };

// // ✅ Forgot Password using OTP
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpire = Date.now() + 10 * 60 * 1000; // 10 min

//     user.otpCode = otp;
//     user.otpExpire = otpExpire;
//     await user.save();

//     // ✅ Email Transport
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // Gmail App Password
//       },
//     });

//     // ✅ Send Email
//     await transporter.sendMail({
//       from: `"Milk Soda Support" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Code for Password Reset",
//       html: `
//         <h2>Hi ${user.name || "User"},</h2>
//         <p>Your OTP code to reset your password is:</p>
//         <h1 style="color:#007bff;">${otp}</h1>
//         <p>This code will expire in 10 minutes.</p>
//         <p>— Team Milk Soda</p>
//       `,
//     });

//     res.status(200).json({ message: "OTP sent to your email" });
//   } catch (err) {
//     console.error("Error sending OTP:", err);
//     res.status(500).json({ message: "Error sending OTP", error: err.message });
//   }
// };

// // ✅ Reset Password using OTP
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Check OTP validity
//     if (user.otpCode !== otp || user.otpExpire < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     // Hash new password
//     const hashed = await bcrypt.hash(newPassword, 10);
//     user.passwordHash = hashed;

//     // Clear OTP fields
//     user.otpCode = undefined;
//     user.otpExpire = undefined;

//     await user.save();

//     res.status(200).json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error("Password reset error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };




// src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

// ✅ JWT generator
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

// ✅ Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      passwordHash,
      role: role || "customer",
    });

    res.status(201).json({ user, token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ user, token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Upload profile image
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const user = await User.findById(req.user.id);

    // Delete old image if exists
    if (user.profileImage) {
      const oldPath = path.join("uploads", user.profileImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    user.profileImage = req.file.filename;
    await user.save();

    res.status(200).json({
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Failed to upload profile image" });
  }
};

// ✅ Forgot Password using OTP
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.otpCode = otp;
    user.otpExpire = otpExpire;
    await user.save();

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    // Send OTP email
    await transporter.sendMail({
      from: `"Milk Soda Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code for Password Reset",
      html: `
        <h2>Hi ${user.name || "User"},</h2>
        <p>Your OTP code to reset your password is:</p>
        <h1 style="color:#007bff;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p>— Team Milk Soda</p>
      `,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
};

// ✅ Reset Password using OTP
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check OTP validity
    if (user.otpCode !== otp || user.otpExpire < Date.now())
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.otpCode = undefined;
    user.otpExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ message: err.message });
  }
};
