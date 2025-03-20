import mongoose from 'mongoose';

// Define the schema for the Contact form
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
    minlength: 3, // Minimum length of 3 characters
    maxlength: 50 // Maximum length of 50 characters
  },
  email: {
    type: String,
    required: true, // Email is required
    match: /\S+@\S+\.\S+/ // Email must match the specified pattern
  },
  phone: {
    type: String,
    required: true, // Phone number is required
    match: /^\d{10,15}$/ // Phone number must match the specified pattern
  },
  subject: {
    type: String,
    required: true, // Subject is required
    minlength: 3, // Minimum length of 3 characters
    maxlength: 100 // Maximum length of 100 characters
  },
  message: {
    type: String,
    required: true, // Message is required
    maxlength: 2000 // Maximum length of 2000 characters
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the Contact model using the schema
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;