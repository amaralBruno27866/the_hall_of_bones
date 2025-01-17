import express from 'express';
import { createWork, getWorkExperiences, updateWorkExperience, deleteWorkExperience } from '../controllers/workController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/work_experiences', authMiddleware, createWork);
router.get('/work_experiences', getWorkExperiences);
router.put('/work_experiences/:id', authMiddleware, updateWorkExperience);
router.delete('/work_experiences/:id', authMiddleware, deleteWorkExperience);

export default router;