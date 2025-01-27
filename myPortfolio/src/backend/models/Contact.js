import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10,15}$/
  },
  subject: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000
  }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;