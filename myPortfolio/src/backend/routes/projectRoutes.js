import express from 'express';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/projectController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new project
router.post('/projects', authMiddleware, createProject);

// Route to get all projects
router.get('/projects', getProjects);

// Route to update a project by ID
router.put('/projects/:id', authMiddleware, updateProject);

// Route to delete a project by ID
router.delete('/projects/:id', authMiddleware, deleteProject);

export default router;