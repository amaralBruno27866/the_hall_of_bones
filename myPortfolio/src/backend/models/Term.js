import mongoose from "mongoose";

// Define the schema for the Term
const termSchema = new mongoose.Schema({
  start_month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  start_year: {
    type: Number,
    required: true,
  },
  end_month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  end_year: {
    type: Number,
    required: true,
  },
  total_time: {
    type: String,
    default: 0,
    required: true,
  },
  session: {
    type: String,
    default: 'term',
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Pre-save hook to calculate the total time
termSchema.pre('save', function (next) {
  const startDate = new Date(this.start_year, this.start_month - 1);
  const endDate = new Date(this.end_year, this.end_month - 1);
  const diffTime = Math.abs(endDate - startDate);
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  this.total_time = `${years} years and ${months} months`;
  next();
});

// Create the Term model using the schema
const Term = mongoose.model('Term', termSchema);

export default Term;