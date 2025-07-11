import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { userDashboard, adminDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/user', protect, userDashboard);
router.get('/admin', protect, admin, adminDashboard);

export default router;
