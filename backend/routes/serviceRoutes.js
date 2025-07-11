// routes/serviceRoutes.js
import express from 'express';
import { getAllServices, createService, getServiceById, getServiceCategories, getServicesByCategory , getAllFreeServices } from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
const router = express.Router();

router.get('/', getAllServices);
router.get('/', getAllFreeServices);
router.post('/', protect, upload.single('image'), createService);
router.get('/categories', getServiceCategories);
router.get('/category/:cat', getServicesByCategory);
router.get('/:id', getServiceById);

export default router;