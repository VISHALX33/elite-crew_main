import express from 'express';
import { addReview, getServiceReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add a review
router.post('/', protect, addReview);

// Get all reviews for a service
router.get('/:serviceId', getServiceReviews);

export default router;
