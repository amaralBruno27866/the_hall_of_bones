import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/usersController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new user
router.post('/users', authMiddleware, createUser);

// Route to get all users
router.get('/users', authMiddleware, getUsers);

// Route to get a user by ID
router.get('/users/:id', authMiddleware, getUserById);

// Route to update a user by ID
router.put('/users/:id', authMiddleware, updateUser);

// Route to delete a user by ID
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;