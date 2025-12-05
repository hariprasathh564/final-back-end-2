// import express from "express";
// import { createProduct, getAllProducts,   getProductById,
// updateProduct, deleteProduct } from "../controllers/productController.js";
// import { protect, authorize } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/", protect, authorize("admin"), createProduct);
// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.put("/:id", protect, authorize("admin"), updateProduct);
// router.delete("/:id", protect, authorize("admin"), deleteProduct);

// export default router;



import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User/Admin - get all products
router.get("/", getAllProducts);

// User/Admin - get product by ID
router.get("/:id", getProductById);

// Admin - create product
router.post("/", protect, adminOnly, createProduct);

// Admin - update product
router.put("/:id", protect, adminOnly, updateProduct);

// Admin - delete product
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
