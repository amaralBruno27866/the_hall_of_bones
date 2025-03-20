import mongoose from "mongoose";
import Location from "../models/Location.js";
import Term from "../models/Term.js";

// Define the schema for the Education entry
const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true, // Institution name is required
  },
  image: {
    type: String,
    required: false, // Image URL is optional
  },
  url: {
    type: String,
    required: false, // URL is optional
  },
  field: {
    type: String,
    required: true, // Field of study is required
  },
  degree: {
    type: String,
    required: true, // Degree is required
  },
  period: {
    type: Term.schema,
    required: true, // Period (start and end dates) is required
  },
  address: {
    type: Location.schema,
    required: true, // Address is required
  },
  skills: {
    type: [String],
    required: true, // Skills are required
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the Education model using the schema
const Education = mongoose.model("Education", educationSchema);

export default Education;