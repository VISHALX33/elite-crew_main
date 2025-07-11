// controllers/orderDashboardController.js
import Order from '../models/Order.js';
import ServiceOrder from '../models/serviceOrder.js';

export const getAllMyOrders = async (req, res) => {
  try {
    const productOrders = await Order.find({ user: req.user._id }).populate('product');
    const serviceOrders = await ServiceOrder.find({ user: req.user._id }).populate('service');

    res.json({
      products: productOrders,
      services: serviceOrders,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
