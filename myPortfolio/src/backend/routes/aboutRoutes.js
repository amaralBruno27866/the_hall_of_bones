import express from 'express';
import { createAboutCard, getAboutCards, updateAboutCard, deleteAboutCard } from '../controllers/aboutController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new about card
router.post('/about/cards', authMiddleware, createAboutCard);

// Route to get all about cards
router.get('/about/cards', getAboutCards);

// Route to update an about card by ID
router.put('/about/cards/:id', authMiddleware, updateAboutCard);

// Route to delete an about card by ID
router.delete('/about/cards/:id', authMiddleware, deleteAboutCard);

export default router;