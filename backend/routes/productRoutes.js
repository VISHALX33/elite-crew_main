import express from 'express';
import { extractUserFromBody } from '../middleware/authMiddleware.js';
import {
  createProduct,
  getCategories,
  getProductsByCategory,
  getProductById
} from '../controllers/productController.js';

const router = express.Router();

router.post('/', extractUserFromBody, createProduct); // Add admin-only check if needed
router.get('/categories', getCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

export default router;
