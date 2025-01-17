/* eslint-disable no-undef */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

import userRoutes from './src/backend/routes/userRoutes.js';
import authRoutes from './src/backend/routes/authRoutes.js';
import aboutCardRoutes from './src/backend/routes/aboutRoutes.js';
import transactionRoutes from './src/backend/routes/transactionRoutes.js';
import workRoutes from './src/backend/routes/workRoutes.js';
import educationRoutes from './src/backend/routes/educationRoutes.js';
import projectRoutes from './src/backend/routes/projectRoutes.js';
import footerRoutes from './src/backend/routes/footerRoutes.js';
import contactRoutes from './src/backend/routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Use routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', aboutCardRoutes);
app.use('/api', transactionRoutes);
app.use('/api', workRoutes);
app.use('/api', educationRoutes);
app.use('/api', projectRoutes);
app.use('/api', footerRoutes);
app.use('/api', contactRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});