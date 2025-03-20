import mongoose from 'mongoose';

// Define the schema for the Location
const locationSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true, // Street number is required
  },
  street: {
    type: String,
    required: true, // Street name is required
  },
  city: {
    type: String,
    required: true, // City is required
  },
  state: {
    type: String,
    required: true, // State is required
  },
  zip: {
    type: String,
    required: true, // ZIP code is required
  },
  country: {
    type: String,
    required: true, // Country is required
  },
  session: {
    type: String,
    default: 'location', // Default session is 'location'
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the Location model using the schema
const Location = mongoose.model('Location', locationSchema);

export default Location;