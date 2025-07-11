import express from 'express';
import { getActivityOverview ,registerUser, loginUser, getProfile, updateProfile, deleteAccount } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Profile Routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteAccount);

router.get('/activity', protect, getActivityOverview);
export default router;
