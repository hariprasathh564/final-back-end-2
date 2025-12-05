import Review from "../models/Review.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;
    const review = await Review.create({
      user_id: req.user.id,
      product_id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product_id: req.params.productId }).populate("user_id", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a review (user or admin)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user_id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
