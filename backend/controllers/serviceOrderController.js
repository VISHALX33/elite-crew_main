// controllers/serviceOrderController.js
import ServiceOrder from '../models/serviceOrder.js';
import Service from '../models/service.js';
import User from '../models/user.js';

// 👉 Create a new service order (free or paid)
export const createServiceOrder = async (req, res) => {
  try {
    const { serviceId, date, time, useWallet } = req.body;

    // Get service and user
    const service = await Service.findById(serviceId);
    const user = await User.findById(req.user._id);

    if (!service || !user) {
      return res.status(404).json({ message: 'User or service not found' });
    }

    // Calculate GST, TDS and total
    const gst = (service.price * (service.gstPercent / 100));
    const tds = (service.price * (service.tdsPercent / 100));
    const total = service.price + gst + tds;

    // Check wallet
    if (useWallet && user.wallet < total) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    if (useWallet) {
      user.wallet -= total;
      await user.save();
    }

    // Create service order
    const order = await ServiceOrder.create({
      user: user._id,
      service: service._id,
      date,
      time,
      totalAmount: total,
      paidViaWallet: useWallet,
    });

    res.status(201).json({
      message: 'Service booked successfully',
      order,
    });

  } catch (err) {
    console.error('❌ createServiceOrder Error:', err);
    res.status(500).json({ message: 'Failed to book service' });
  }
};

// 👉 Get all service orders of current user
export const getMyServiceOrders = async (req, res) => {
  try {
    const orders = await ServiceOrder.find({ user: req.user._id })
      .populate('service', 'title description image price');
      
    res.json(orders);
  } catch (err) {
    console.error('❌ getMyServiceOrders Error:', err);
    res.status(500).json({ message: 'Failed to fetch service orders' });
  }
};
