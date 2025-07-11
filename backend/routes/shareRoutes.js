import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateShareLink } from '../controllers/shareController.js';

const router = express.Router();

router.get('/link', protect, generateShareLink);

export default router;
