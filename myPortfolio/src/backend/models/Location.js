import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    default: 'location',
  }
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);

export default Location;