import express from 'express';
import {
  initiateProductPayment,
  initiateServicePayment,
  paymentCallback,
  checkPaymentStatus,
  getPaymentHistory,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/product', protect, initiateProductPayment);
router.post('/service', protect, initiateServicePayment);
router.get('/status/:merchantTransactionId', protect, checkPaymentStatus);
router.get('/history', protect, getPaymentHistory);

// Public callback route (PhonePe will call this)
router.post('/callback', paymentCallback);

export default router; 