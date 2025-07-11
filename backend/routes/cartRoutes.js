import express from 'express';
import {
  addToCart,
  getCart,
  placeOrder,
  getOrderHistory
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addToCart);
router.get('/', protect, getCart);
router.post('/checkout', protect, placeOrder);
router.get('/orders', protect, getOrderHistory);

export default router;
