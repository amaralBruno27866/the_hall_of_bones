import mongoose from "mongoose";

// Define the schema for the Project
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  technologies: {
    type: [String],
    required: true, // Technologies are required
  },
  github: {
    type: String,
    required: false, // GitHub URL is optional
  },
  image: {
    type: String,
    required: false, // Image URL is optional
  },
  category: {
    type: String,
    required: true, // Category is required
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the Project model using the schema
const Project = mongoose.model("Project", projectSchema);

export default Project;