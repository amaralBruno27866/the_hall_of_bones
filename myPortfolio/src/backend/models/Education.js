import mongoose from "mongoose";
import Location from "../models/Location.js";
import Term from "../models/Term.js";

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  field: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  period: {
    type: Term.schema,
    required: true,
  },
  address: {
    type: Location.schema,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  }
}, { timestamps: true });

const Education = mongoose.model("Education", educationSchema);

export default Education;