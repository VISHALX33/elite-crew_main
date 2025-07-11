// routes/serviceOrderRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createServiceOrder,
  getMyServiceOrders,
} from '../controllers/serviceOrderController.js';

const router = express.Router();

router.post('/', protect, createServiceOrder);
router.get('/', protect, getMyServiceOrders); // This is what your frontend is calling

export default router;
