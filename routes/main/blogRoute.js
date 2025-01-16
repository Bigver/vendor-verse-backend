import express from 'express';
import { 
  createBlog, 
  getAllBlogs, 
  getBlogById, 
  updateBlog, 
  deleteBlog 
} from '../../controller/main/blogController.js';
import { adminMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post('/create', adminMiddleware,  createBlog);
router.get('/find', getAllBlogs);
router.get('/findId/:id', getBlogById);
router.put('/update/:id', adminMiddleware, updateBlog);
router.delete('/delete/:id', adminMiddleware, deleteBlog);

export default router;