import express from 'express';
import { createBooking, getMyBookings, cancelBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/mine', protect, getMyBookings);
router.put('/cancel/:id', protect, cancelBooking);

export default router;
