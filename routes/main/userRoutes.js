import express from 'express';
import { registerUser , loginUser , updateProfile , forgotPassword , resetPassword, searchUsers } from '../../controller/main/userController.js';
import { adminMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile/:userId', updateProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/search', adminMiddleware , searchUsers);

export default router;
