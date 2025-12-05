// import express from "express";
// import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
// import { protect } from "../middlewares/authMiddleware.js";
// import { forgotPassword, resetPassword } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", protect, getProfile);

// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// export default router;

// import express from "express";
// import { registerUser, loginUser, getProfile, uploadProfileImage } from "../controllers/authController.js";
// import { protect } from "../middlewares/authMiddleware.js";
// import upload from "../middlewares/multerConfig.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", protect, getProfile);

// // ✅ Upload profile image
// router.post("/upload-profile-image", protect, upload.single("profileImage"), uploadProfileImage);

// export default router;










// src/routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  uploadProfileImage,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

// ✅ Upload profile image
router.post(
  "/upload-profile-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

export default router;
