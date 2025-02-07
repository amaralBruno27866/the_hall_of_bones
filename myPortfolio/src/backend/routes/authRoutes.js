import express from 'express';
import { login, logout } from '../controllers/authController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login); // Certifique-se de que a rota está correta
router.post('/logout', authMiddleware, logout);

export default router;