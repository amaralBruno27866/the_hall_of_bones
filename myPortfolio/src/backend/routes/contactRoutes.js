import express from 'express';
import { createContact, getContacts, deleteContact } from '../controllers/contactController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new contact
router.post('/contacts', createContact);

// Route to get all contacts
router.get('/contacts', getContacts);

// Route to delete a contact by ID
router.delete('/contacts/:id', authMiddleware, deleteContact);

export default router;