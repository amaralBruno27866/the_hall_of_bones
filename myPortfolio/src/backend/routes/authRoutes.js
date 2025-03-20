import express from 'express';
import { login, logout } from '../controllers/authController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

// Route to handle user login
router.post('/login', login);

// Route to handle user logout
router.post('/logout', authMiddleware, logout);

export default router;