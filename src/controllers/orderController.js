import Order from "../models/Order.js";
// Get logged-in user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id })
      .sort({ createdAt: -1 })
      .populate("user_id", "name email");
    res.json(orders);
  } catch (err) {
    console.error("Error getting user orders:", err);
    res.status(500).json({ message: "Failed to get user orders" });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user_id", "name email");
    res.json(orders);
  } catch (err) {
    console.error("Error getting all orders:", err);
    res.status(500).json({ message: "Failed to get all orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Match the enum exactly (case-sensitive)
  const validStatuses = ["Pending", "Confirmed", "Packed", "Out_for_delivery", "Delivered", "Canceled", "Refunded"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: `Order status updated to ${status}`, order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
