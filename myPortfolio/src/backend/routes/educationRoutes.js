import express from 'express';
import { createEducation, getEducations, updateEducation, deleteEducation } from '../controllers/educationController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new education entry
router.post('/educations', authMiddleware, createEducation);

// Route to get all education entries
router.get('/educations', getEducations);

// Route to update an education entry by ID
router.put('/educations/:id', authMiddleware, updateEducation);

// Route to delete an education entry by ID
router.delete('/educations/:id', authMiddleware, deleteEducation);

export default router;