import mongoose from 'mongoose';
import Location from './Location.js';
import Term from './Term.js';

// Define the schema for the Work Experience
const workExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true, // Company name is required
  },
  url: {
    type: String,
    required: false, // URL is optional
  },
  image: {
    type: String,
    required: false, // Image URL is optional
  },
  address: {
    type: Location.schema,
    required: true, // Address is required
  },
  period: {
    type: Term.schema,
    required: true, // Period (start and end dates) is required
  },
  type: {
    type: String,
    required: true, // Type of work (e.g., full-time, part-time) is required
  },
  position: {
    type: String,
    required: true, // Position is required
  },
  responsibilities: {
    type: [String],
    required: true, // Responsibilities are required
  },
  achievements: {
    type: [String],
    required: true, // Achievements are required
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the WorkExperience model using the schema
const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

export default WorkExperience;