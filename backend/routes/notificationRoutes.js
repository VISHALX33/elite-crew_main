import express from 'express';
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification
} from '../controllers/notificationController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create notification manually (if needed)
router.post('/', protect, createNotification);

// Get all notifications for logged-in user
router.get('/', protect, getUserNotifications);

// Mark as read
router.put('/:id/read', protect, markAsRead);

// Delete notification
router.delete('/:id', protect, deleteNotification);

export default router;
