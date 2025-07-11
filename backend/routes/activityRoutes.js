import express from 'express';
import { getAllLogs } from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getAllLogs);

export default router;
