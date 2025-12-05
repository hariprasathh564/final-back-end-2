// src/routes/userRoutes.js
import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin - get all users
router.get("/", protect, adminOnly, getAllUsers);

// Admin - create new user
router.post("/", protect, adminOnly, createUser);

// Admin - update user
router.put("/:id", protect, adminOnly, updateUser);

// Admin - delete user
router.delete("/:id", protect, adminOnly, deleteUser);

// Get single user (optional)
router.get("/:id", protect, adminOnly, getUserById);

export default router;
