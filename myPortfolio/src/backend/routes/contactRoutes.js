import express from 'express';
import { createContact, getContacts, deleteContact } from '../controllers/contactController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/contacts', createContact);
router.get('/contacts', getContacts);
router.delete('/contacts/:id', authMiddleware,deleteContact);

export default router;