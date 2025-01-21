import express from 'express';
import { createEducation, getEducations, updateEducation, deleteEducation } from '../controllers/educationController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/educations', authMiddleware, createEducation);
router.get('/educations', getEducations);
router.put('/educations/:id', authMiddleware, updateEducation);
router.delete('/educations/:id', authMiddleware, deleteEducation);

export default router;