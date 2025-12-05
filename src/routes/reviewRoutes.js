import express from "express";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import { createReview, getProductReviews, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

// Create a review (customer only)
router.post("/", protect, authorize("customer"), createReview);

// Get all reviews for a product
router.get("/product/:productId", getProductReviews);

// Delete a review (owner or admin)
router.delete("/:id", protect, deleteReview);

export default router;
