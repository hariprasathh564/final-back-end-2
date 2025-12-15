// backend/controllers/stripeController.js
import Stripe from "stripe";
import Product from "../models/Product.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    const { items } = req.body; // [{ productId, quantity }] expected
    if (!items || !items.length) return res.status(400).json({ message: "No items provided" });

    // Build line_items
    const line_items = await Promise.all(items.map(async (it) => {
      // Try to fetch product & price from DB
      let product;
      try { product = await Product.findById(it.productId); } catch(e){ /* ignore */ }
      const priceNumber = product?.price ?? it.unitPrice ?? 0;
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product?.name ?? it.name ?? "Milk Soda",
            metadata: { productId: it.productId }
          },
          unit_amount: Math.round(priceNumber * 100)
        },
        quantity: it.quantity || 1
      };
    }));

    const YOUR_DOMAIN = process.env.CLIENT_URL || "https://final-front-end-indol.vercel.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      client_reference_id: user._id.toString(),
      success_url: `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/payment-cancel`,
      metadata: { userId: user._id.toString() }
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("createCheckoutSession error:", err);
    return res.status(500).json({ message: err.message });
  }
};
