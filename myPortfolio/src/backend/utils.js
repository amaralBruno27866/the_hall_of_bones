// Importing the User model to interact with the database
import User from './models/User.js';
// Importing bcrypt for hashing and comparing passwords
import bcrypt from 'bcryptjs';
// Importing jwt for generating and verifying JSON Web Tokens
import jwt from 'jsonwebtoken';
// Importing the Transaction model to log user actions
import Transaction from './models/Transaction.js';

// Function to validate the user ID
// This function checks if a user with the given ID exists in the database
export const validateUserId = async (id) => {
  const user = await User.findById(id); // Find the user by ID
  if (!user) {
    // If no user is found, throw an error
    throw new Error('User not found');
  }
  return user; // Return the user object if found
};

// Function to check if the email already exists
// This function ensures that no duplicate email addresses are used during user creation
export const checkEmailExists = async (email) => {
  const existingUser = await User.findOne({ email }); // Check if a user with the given email exists
  if (existingUser) {
    // If a user with the email exists, throw an error
    throw new Error('Email already exists');
  }
};

// Function to generate a JWT token
// This function creates a token containing the user's ID and role, signed with a secret key
export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role }, // Payload containing user ID and role
    process.env.JWT_SECRET, // Secret key for signing the token
    { expiresIn: '12h' } // Token expiration time
  );
};

// Function to verify the password
// This function compares the provided password with the hashed password stored in the database
export const verifyPassword = async (inputPassword, userPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, userPassword); // Compare the passwords
  if (!isMatch) {
    // If the passwords do not match, throw an error
    throw new Error('Invalid password');
  }
};

// Function to record a transaction
// This function logs user actions (e.g., create, update, delete) for auditing purposes
export const recordTransaction = async (user, action, entity, details) => {
  try {
    // Create a new Transaction instance with the provided details
    const transaction = new Transaction({
      user: user._id, // ID of the user performing the action
      userName: user.name, // Name of the user
      userRole: user.role, // Role of the user (e.g., admin, user)
      action, // Action performed (e.g., create, update, delete)
      entity, // Entity affected by the action (e.g., user, project)
      details // Additional details about the action
    });
    // Save the transaction to the database
    await transaction.save();
    console.log('Transaction recorded successfully:', transaction); // Log success
  } catch (error) {
    // Log any errors that occur during transaction recording
    console.error('Error recording transaction:', error);
  }
};