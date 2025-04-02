// Importing the mongoose library to interact with MongoDB
const mongoose = require('mongoose');
// Importing dotenv to load environment variables from a .env file
require('dotenv').config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string from the environment variables
    await mongoose.connect(process.env.MONGO_URI);
    // Log a success message if the connection is established
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log an error message if the connection fails
    console.error('Error connecting to MongoDB:', error.message);
    // Exit the process with a failure code (1) to indicate an error
    process.exit(1);
  }
};

// Exporting the connectDB function so it can be used to initialize the database connection in other parts of the application
module.exports = connectDB;