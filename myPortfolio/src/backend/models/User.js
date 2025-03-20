/* eslint-disable no-useless-escape */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for the User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email must be unique
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Email must match the specified pattern
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Role must be either 'user' or 'admin'
    default: 'user', // Default role is 'user'
  },
  token: {
    type: String,
    required: false, // Token is optional
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8); // Hash the password with bcrypt
  }
  next();
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

export default User;