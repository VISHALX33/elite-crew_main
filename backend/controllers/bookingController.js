import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const { serviceId, date, time, amount, gst, tds, total } = req.body;

    const newBooking = new Booking({
      user: req.user._id,
      service: serviceId,
      date,
      time,
      amount,
      gst,
      tds,
      total,
    });

    const saved = await newBooking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('service');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || String(booking.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized or booking not found' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
