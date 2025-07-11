import Order from '../models/Order.js';
import Service from '../models/service.js';
import Product from '../models/product.js';
import User from '../models/User.js';
import ActivityLog from '../models/activitylog.js';
export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalOrders = await Order.countDocuments({ user: userId });
    const servicesCreated = await Service.countDocuments({ createdBy: userId });

    const lastOrder = await Order.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .limit(1);

    const recentActivities = await ActivityLog.find({ user: userId })
      .sort({ timestamp: -1 })
      .limit(5);

    res.json({
      totalOrders,
      servicesCreated,
      lastOrder,
      recentActivities,
    });
  } catch (error) {
    console.error('User Dashboard Error:', error);
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalProducts = await Product.countDocuments();

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('-password');
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email');
    const recentActivities = await ActivityLog.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: {
        totalUsers,
        totalOrders,
        totalServices,
        totalProducts,
      },
      recentUsers,
      recentOrders,
      recentActivities,
    });
  } catch (error) {
    console.error('Admin Dashboard Error:', error);
    res.status(500).json({ message: 'Failed to fetch admin dashboard data' });
  }
};