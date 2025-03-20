import express from 'express';
import { getTransactions, getTransactionById } from '../controllers/transactionController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

// Route to get all transactions
router.get('/transactions', authMiddleware, getTransactions);

// Route to get a transaction by ID
router.get('/transactions/:id', authMiddleware, getTransactionById);

export default router;