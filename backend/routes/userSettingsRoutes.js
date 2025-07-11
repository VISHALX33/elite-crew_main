import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { changePassword, deactivateAccount } from '../controllers/userSettingsController.js';

const router = express.Router();

router.put('/change-password', protect, changePassword);
router.put('/deactivate', protect, deactivateAccount);

export default router;
