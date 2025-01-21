import express from 'express';
import { getTransactions, getTransactionById } from '../controllers/transactionController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/transactions', authMiddleware, getTransactions);
router.get('/transactions/:id', authMiddleware, getTransactionById);

export default router;