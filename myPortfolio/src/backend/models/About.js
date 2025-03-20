import mongoose from 'mongoose';

// Define the schema for the About card
const aboutCardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, // Image URL is required
  },
  title: {
    type: String,
    required: true, // Title is required
  },
  paragraph: {
    type: String,
    required: true, // Paragraph text is required
  },
  session: {
    type: String,
    default: 'about', // Default session is 'about'
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the About model using the schema
const About = mongoose.model('About', aboutCardSchema);

export default About;