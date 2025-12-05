// import Cart from "../models/Cart.js";
// import Product from "../models/Product.js";

// // ✅ Add item to cart
// export const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, quantity } = req.body;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [], totalPrice: 0 });
//     }

//     // Check if item already in cart
//     const existingItem = cart.items.find((item) => item.productId.toString() === productId);

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }

//     // Update total
//     cart.totalPrice = await calculateTotal(cart.items);
//     await cart.save();

//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Get user cart
// export const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.findOne({ userId }).populate("items.productId", "name price image");

//     if (!cart) return res.status(404).json({ message: "Cart is empty" });
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Update item quantity
// export const updateCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, quantity } = req.body;

//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const item = cart.items.find((item) => item.productId.toString() === productId);
//     if (!item) return res.status(404).json({ message: "Item not in cart" });

//     item.quantity = quantity;
//     cart.totalPrice = await calculateTotal(cart.items);
//     await cart.save();

//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Remove item
// export const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId } = req.params;

//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
//     cart.totalPrice = await calculateTotal(cart.items);
//     await cart.save();

//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Helper function
// const calculateTotal = async (items) => {
//   let total = 0;
//   for (const item of items) {
//     const product = await Product.findById(item.productId);
//     if (product) total += product.price * item.quantity;
//   }
//   return total;
// };




















import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ✅ Helper function to calculate total price
const calculateTotal = async (items) => {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (product) total += product.price * item.quantity;
  }
  return total;
};

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    // Check if item exists
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Update total
    cart.totalPrice = await calculateTotal(cart.items);
    await cart.save();

    const populated = await cart.populate(
      "items.productId",
      "name price images"
    );

    res.status(200).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price images"
    );

    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update item quantity
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;

    cart.totalPrice = await calculateTotal(cart.items);
    await cart.save();

    const populated = await cart.populate(
      "items.productId",
      "name price images"
    );

    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalPrice = await calculateTotal(cart.items);
    await cart.save();

    const populated = await cart.populate(
      "items.productId",
      "name price images"
    );

    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
