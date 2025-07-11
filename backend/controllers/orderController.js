import Order from '../models/Order.js';
import Product from '../models/product.js';
import User from '../models/User.js';
import ServiceOrder from '../models/serviceOrder.js';
import Service from '../models/service.js';

// 📦 Place a product order
export const createOrder = async (req, res) => {
  const { productId, useWallet } = req.body;

  const product = await Product.findById(productId);
  const user = await User.findById(req.user._id);

  if (!product || !user) {
    return res.status(404).json({ message: 'Product or user not found' });
  }

  const gst = product.price * (product.gstPercent / 100);
  const tds = product.price * (product.tdsPercent / 100);
  const total = product.price + gst + tds;

  if (useWallet) {
    if (user.wallet < total) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }
    user.wallet -= total;
    await user.save();
  }

  const newOrder = await Order.create({
    user: user._id,
    product: product._id,
    amount: total,
    paidViaWallet: useWallet,
  });

  res.status(201).json({ message: 'Product order placed successfully', order: newOrder });
};

// 📥 Get all orders for a user (product + service)
export const getMyOrders = async (req, res) => {
  try {
    const productOrders = await Order.find({ user: req.user._id }).populate('product');
    const serviceOrders = await ServiceOrder.find({ user: req.user._id }).populate('service');

    res.status(200).json({
      productOrders,
      serviceOrders,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};
