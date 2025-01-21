import express from 'express';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/projectController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/projects', authMiddleware, createProject);
router.get('/projects', getProjects);
router.put('/projects/:id', authMiddleware, updateProject);
router.delete('/projects/:id', authMiddleware, deleteProject);

export default router;