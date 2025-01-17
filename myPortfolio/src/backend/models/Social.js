import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Social = mongoose.model("Social", socialSchema);

export default Social;