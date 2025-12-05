// import Product from "../models/Product.js";

// export const createProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getAllProducts = async (req, res) => {
//   const { category, q } = req.query;
//   const filter = {};
//   if (category) filter.category = category;
//   if (q) filter.name = new RegExp(q, "i");

//   const products = await Product.find(filter);
//   res.json(products);
// };

// export const updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(product);
// };

// export const deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// };
// // Get single product by ID
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product)
//       return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



















// // import Product from "../models/Product.js";

// // // ✅ Create new product
// // export const createProduct = async (req, res) => {
// //   try {
// //     const product = await Product.create(req.body);

// //     // Build full image URLs
// //     const host = req.protocol + "://" + req.get("host");
// //     const productWithFullImage = {
// //       ...product._doc,
// //       image: product.image ? `${host}/uploads/${product.image}` : null,
// //       images: product.images?.map(img => `${host}/uploads/${img}`) || [],
// //     };

// //     res.status(201).json(productWithFullImage);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ✅ Get all products with optional filtering
// // export const getAllProducts = async (req, res) => {
// //   try {
// //     const { category, q } = req.query;
// //     const filter = {};
// //     if (category) filter.category = category;
// //     if (q) filter.name = new RegExp(q, "i");

// //     const products = await Product.find(filter);

// //     const host = req.protocol + "://" + req.get("host");
// //     const productsWithFullImage = products.map(p => ({
// //       ...p._doc,
// //       image: p.image ? `${host}/uploads/${p.image}` : null,
// //       images: p.images?.map(img => `${host}/uploads/${img}`) || [],
// //     }));

// //     res.json(productsWithFullImage);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ✅ Get single product by ID
// // export const getProductById = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product)
// //       return res.status(404).json({ message: "Product not found" });

// //     const host = req.protocol + "://" + req.get("host");
// //     const productWithFullImage = {
// //       ...product._doc,
// //       image: product.image ? `${host}/uploads/${product.image}` : null,
// //       images: product.images?.map(img => `${host}/uploads/${img}`) || [],
// //     };

// //     res.json(productWithFullImage);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ✅ Update product
// // export const updateProduct = async (req, res) => {
// //   try {
// //     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

// //     const host = req.protocol + "://" + req.get("host");
// //     const productWithFullImage = {
// //       ...product._doc,
// //       image: product.image ? `${host}/uploads/${product.image}` : null,
// //       images: product.images?.map(img => `${host}/uploads/${img}`) || [],
// //     };

// //     res.json(productWithFullImage);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ✅ Delete product
// // export const deleteProduct = async (req, res) => {
// //   try {
// //     await Product.findByIdAndDelete(req.params.id);
// //     res.json({ message: "Product deleted" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


import Product from "../models/Product.js";

// Create new product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products with optional filtering
export const getAllProducts = async (req, res) => {
  try {
    const { category, q } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (q) filter.name = new RegExp(q, "i");

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
