// controllers/adminController.js
import User from '../models/User.js';
import Product from '../models/product.js';
import Service from '../models/service.js';
import Blog from '../models/blog.js';
import Order from '../models/Order.js';

// @desc    Get dashboard stats
export const getAdminDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const services = await Service.countDocuments();
    const blogs = await Blog.countDocuments();
    const orders = await Order.countDocuments();

    res.json({
      totalUsers: users,
      totalProducts: products,
      totalServices: services,
      totalBlogs: blogs,
      totalOrders: orders,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load admin stats' });
  }
};

export const getOverviewStats = getAdminDashboard;

// @desc    Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load users' });
  }
};

// @desc    Update a user
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// @desc    Delete a user
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// @desc    Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load services' });
  }
};

// @desc    Delete a service
export const deleteServiceById = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
};

// @desc    Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load products' });
  }
};

// @desc    Delete a product
export const deleteProductById = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

// @desc    Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load orders' });
  }
};

// @desc    Delete an order
export const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
