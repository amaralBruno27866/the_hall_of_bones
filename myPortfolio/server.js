import express from 'express'; // Importing Express to create the server and handle routes
import cors from 'cors'; // Importing CORS to handle cross-origin requests
import dotenv from 'dotenv'; // Importing dotenv to load environment variables from the .env file
import mongoose from 'mongoose'; // Importing Mongoose to interact with MongoDB
import morgan from 'morgan'; // Importing Morgan to log HTTP requests

// Importing route handlers for different API endpoints
import userRoutes from './src/backend/routes/userRoutes.js';
import authRoutes from './src/backend/routes/authRoutes.js';
import aboutCardRoutes from './src/backend/routes/aboutRoutes.js';
import transactionRoutes from './src/backend/routes/transactionRoutes.js';
import workRoutes from './src/backend/routes/workRoutes.js';
import educationRoutes from './src/backend/routes/educationRoutes.js';
import projectRoutes from './src/backend/routes/projectRoutes.js';
import contactRoutes from './src/backend/routes/contactRoutes.js';

// Load environment variables from the .env file
dotenv.config();

const app = express(); // Initialize the Express application
const PORT = process.env.PORT || 5000; // Set the server port from the environment variable or default to 5000

// Middleware: CORS configuration
/**
 * Objective: Allow the frontend to communicate with the backend.
 * Functionality: Configures CORS to accept requests from the specified origin.
 * Expected Result: The frontend at http://localhost:3000 can make API requests to the backend.
 */
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the React frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials to be sent
}));

// Middleware: Parse incoming JSON requests
/**
 * Objective: Enable the server to parse JSON payloads in incoming requests.
 * Functionality: Uses Express's built-in JSON parser middleware.
 * Expected Result: The `req.body` object contains parsed JSON data.
 */
app.use(express.json());

// Middleware: HTTP request logging
/**
 * Objective: Log HTTP requests for debugging and monitoring.
 * Functionality: Uses Morgan to log requests in the 'dev' format.
 * Expected Result: Logs appear in the console for each incoming request.
 */
app.use(morgan('dev'));

// MongoDB connection
/**
 * Objective: Connect to the MongoDB database.
 * Functionality: Uses Mongoose to establish a connection to the database specified in the .env file.
 * Expected Result: The server connects to MongoDB, or logs an error and exits if the connection fails.
 */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...')) // Log success message
  .catch(err => {
    console.error('MongoDB connection error:', err); // Log error message
    process.exit(1); // Exit the process with a failure code
  });

// API routes
/**
 * Objective: Define API endpoints for different functionalities.
 * Functionality: Mounts route handlers for each feature (e.g., users, authentication, projects).
 * Expected Result: Requests to `/api/...` are routed to the appropriate handler.
 */
app.use('/api', userRoutes); // User-related routes
app.use('/api', authRoutes); // Authentication routes
app.use('/api', aboutCardRoutes); // About section routes
app.use('/api', transactionRoutes); // Transaction logging routes
app.use('/api', workRoutes); // Work experience routes
app.use('/api', educationRoutes); // Education routes
app.use('/api', projectRoutes); // Project routes
app.use('/api', contactRoutes); // Contact form routes

// Basic route for testing the server
/**
 * Objective: Provide a simple endpoint to verify that the server is running.
 * Functionality: Responds with a plain text message.
 * Expected Result: A GET request to `/` returns "API is running...".
 */
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
/**
 * Objective: Start the Express server and listen for incoming requests.
 * Functionality: Binds the server to the specified port and logs a message when it starts.
 * Expected Result: The server listens on the specified port and logs a success message.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});