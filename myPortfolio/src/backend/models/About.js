import mongoose from 'mongoose';

const aboutCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    default: 'about',
  }
}, { timestamps: true });

const About = mongoose.model('About', aboutCardSchema);

export default About;