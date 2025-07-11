// routes/orderDashboardRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getAllMyOrders } from '../controllers/orderDashboardController.js';

const router = express.Router();

router.get('/', protect, getAllMyOrders);

export default router;
