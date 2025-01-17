import express from 'express';
import { createAboutCard, getAboutCards, updateAboutCard, deleteAboutCard } from '../controllers/aboutController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/about/cards', authMiddleware, createAboutCard);
router.get('/about/cards', getAboutCards);
router.put('/about/cards/:id', authMiddleware, updateAboutCard);
router.delete('/about/cards/:id', authMiddleware, deleteAboutCard);

export default router;