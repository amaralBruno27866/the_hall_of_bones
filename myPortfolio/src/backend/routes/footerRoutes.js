import express from 'express';
import { createFooter, getFooter, updateFooter, deleteFooter } from '../controllers/footerController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/footers', authMiddleware, createFooter);
router.get('/footers', getFooter);
router.put('/footers/:id', authMiddleware, updateFooter);
router.delete('/footers/:id', authMiddleware, deleteFooter);

export default router;