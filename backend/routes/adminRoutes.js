// routes/adminRoutes.js
import express from 'express';
import {
  getOverviewStats,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getAllServices,
  getAllProducts,
  getAllOrders,
  deleteServiceById,
  deleteProductById,
  deleteOrderById,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(protect, admin);

// Dashboard
router.get('/overview', getOverviewStats);

// User Management
router.get('/users', getAllUsers);
router.patch('/user/:id', updateUserById);
router.delete('/user/:id', deleteUserById);

// Services
router.get('/services', getAllServices);
router.delete('/service/:id', deleteServiceById);

// Products
router.get('/products', getAllProducts);
router.delete('/product/:id', deleteProductById);

// Orders
router.get('/orders', getAllOrders);
router.delete('/order/:id', deleteOrderById);

export default router;
