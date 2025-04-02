// Importing mongoose for database interaction
import mongoose from "mongoose";

// Define the schema for the Term
const termSchema = new mongoose.Schema({
  // Start month of the term (1-12)
  start_month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  // Start year of the term
  start_year: {
    type: Number,
    required: true,
  },
  // End month of the term (1-12)
  end_month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  // End year of the term
  end_year: {
    type: Number,
    required: true,
  },
  // Total time of the term in years and months
  total_time: {
    type: String,
    default: 0,
    required: true,
  },
  // Session type for categorization
  session: {
    type: String,
    default: 'term',
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Pre-save hook to calculate the total time
termSchema.pre('save', function (next) {
  // Calculate the start and end dates
  const startDate = new Date(this.start_year, this.start_month - 1);
  const endDate = new Date(this.end_year, this.end_month - 1);
  // Calculate the difference in time between the dates
  const diffTime = Math.abs(endDate - startDate);
  // Convert the time difference to months
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  // Calculate the years and remaining months
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  // Set the total_time field in the format "X years and Y months"
  this.total_time = `${years} years and ${months} months`;
  next(); // Proceed to save the document
});

// Create the Term model using the schema
const Term = mongoose.model('Term', termSchema);

// Export the Term model for use in other parts of the application
export default Term;