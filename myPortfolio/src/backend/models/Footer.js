import mongoose from "mongoose";
import Social from "./Social.js";

const footerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  social_media: {
    type: [Social.schema],
    required: true,
  },
  privacy_policy: {
    type: String,
    required: false,
  },
  terms_and_conditions: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Footer = mongoose.model("Footer", footerSchema);

export default Footer;