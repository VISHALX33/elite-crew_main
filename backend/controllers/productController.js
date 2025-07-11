import Product from '../models/product.js';

// 🔹 Create Product (Admin)



export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, image, gstPercent, tdsPercent } = req.body;

    const newProduct = await Product.create({
      name,
      category,
      description,
      price,
      image,
      gstPercent,
      tdsPercent,
      createdBy: req.user._id
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

// 🔹 Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// 🔹 Get Products by Category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// 🔹 Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};
