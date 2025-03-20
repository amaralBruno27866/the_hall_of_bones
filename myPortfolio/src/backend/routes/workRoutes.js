import express from 'express';
import { createWork, getWorkExperiences, updateWorkExperience, deleteWorkExperience } from '../controllers/workController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new work experience
router.post('/work_experiences', authMiddleware, createWork);

// Route to get all work experiences
router.get('/work_experiences', getWorkExperiences);

// Route to update a work experience by ID
router.put('/work_experiences/:id', authMiddleware, updateWorkExperience);

// Route to delete a work experience by ID
router.delete('/work_experiences/:id', authMiddleware, deleteWorkExperience);

export default router;