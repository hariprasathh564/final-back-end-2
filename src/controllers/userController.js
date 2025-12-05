// src/controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Get all users (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-passwordHash");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user (Admin)
export const createUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password || "123456", 10); // default password
    const user = await User.create({ name, email, role, passwordHash });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user (Admin)
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user (Admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single user by ID (Admin)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
