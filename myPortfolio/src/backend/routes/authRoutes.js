// Importing the express library to create a router
import express from 'express';
// Importing the login and logout controller functions
import { login, logout } from '../controllers/authController.js';
// Importing the authMiddleware to protect routes
import authMiddleware from '../../../middlewares/authMiddleware.js';

// Creating a new router instance
const router = express.Router();

// Route to handle user login
router.post('/login', login); // Public route, no authentication required

// Route to handle user logout
router.post('/logout', authMiddleware, logout); // Protected route, requires authentication

// Exporting the router for use in other parts of the application
export default router;