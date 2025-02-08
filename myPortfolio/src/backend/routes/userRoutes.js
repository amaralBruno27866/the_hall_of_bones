import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/usersController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/users', authMiddleware, createUser);
router.get('/users', authMiddleware, getUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;