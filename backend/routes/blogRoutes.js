import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  likeBlog,
  commentBlog,
  deleteBlog
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.put('/:id/like', protect, likeBlog);
router.post('/:id/comment', protect, commentBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
