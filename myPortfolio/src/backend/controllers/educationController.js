// Importing the Education model to interact with the database
import Education from "../models/Education.js";
// Importing the recordTransaction utility for auditing purposes
import { recordTransaction } from '../utils.js';

// This function will create a new education entry in the database
export const createEducation = async (req, res) => {
  const { institution, image, url, field, degree, period, address, skills } = req.body; // Extracting data from the request body

  try {
    // Create a new Education instance with the provided data
    const education = new Education({ institution, image, url, field, degree, period, address, skills });
    // Save the education entry to the database
    await education.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'create', 'education', { institution, image, url, field, degree, period, address, skills });

    console.log('Education entry created successfully', education);
    res.status(201).json({ message: 'Education entry created successfully' }); // Respond with success
  } catch (error) {
    console.error('Error creating education entry', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function will get all education entries
export const getEducations = async (req, res) => {
  try {
    // Retrieve all education entries from the database
    const education = await Education.find({});
    console.log('Education entries retrieved successfully', education);
    res.status(200).json(education); // Respond with the retrieved data
  } catch (error) {
    console.error('Error retrieving education entries', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function will update an education entry
export const updateEducation = async (req, res) => {
  const { id } = req.params; // Extracting the ID from the request parameters
  const { institution, image, url, field, degree, period, address, skills } = req.body; // Extracting data from the request body

  try {
    // Find the education entry by ID
    const education = await Education.findById(id);
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' }); // Respond if not found
    }

    // Store the old details for transaction recording
    const oldDetails = { institution: education.institution, image: education.image, url: education.url, field: education.field, degree: education.degree, period: education.period, address: education.address, skills: education.skills };
    // Update the education entry with the new data
    education.institution = institution || education.institution;
    education.image = image || education.image;
    education.url = url || education.url;
    education.field = field || education.field;
    education.degree = degree || education.degree;
    education.period = period || education.period;
    education.address = address || education.address;
    education.skills = skills || education.skills;

    // Save the updated education entry to the database
    await education.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'update', 'education', { old: oldDetails, new: { institution, image, url, field, degree, period, address, skills } });

    console.log('Education entry updated successfully', education);
    res.status(200).json({ message: 'Education entry updated successfully' }); // Respond with success
  } catch (error) {
    console.error('Error updating education entry', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function will delete an education entry
export const deleteEducation = async (req, res) => {
  const { id } = req.params; // Extracting the ID from the request parameters

  try {
    // Find and delete the education entry by ID
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' }); // Respond if not found
    }

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'delete', 'education', { institution: education.institution, image: education.image, url: education.url, field: education.field, degree: education.degree, period: education.period, address: education.address, skills: education.skills });

    console.log('Education entry deleted successfully', education);
    res.status(200).json({ message: 'Education entry deleted successfully' }); // Respond with success
  } catch (error) {
    console.error('Error deleting education entry', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};