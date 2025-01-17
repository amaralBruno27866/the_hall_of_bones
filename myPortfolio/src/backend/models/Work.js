import mongoose from 'mongoose';
import Location from './Location.js';
import Term from './Term.js';

const workExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  address: {
    type: Location.schema,
    required: true,
  },
  period: {
    type: Term.schema,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: [String],
    required: true,
  },
  achievements: {
    type: [String],
    required: true,
  }
}, { timestamps: true });

const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

export default WorkExperience;