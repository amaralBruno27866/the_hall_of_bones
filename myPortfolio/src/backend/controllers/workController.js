import Work from '../models/Work.js';
import { recordTransaction } from '../utils.js';

// This function will create a new work experience entry in the database
export const createWork = async (req, res) => {
  const { company, url, image, address, period, type, position, responsibilities, achievements } = req.body;

  try {
    // Create a new Work instance with the provided data
    const work = new Work({ company, url, image, address, period, type, position, responsibilities, achievements });
    // Save the work experience entry to the database
    await work.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'create', 'work_experience', { company, url, image, address, period, type, position, responsibilities, achievements });

    console.log('Work experience created successfully', work);
    res.status(201).json({ message: 'Work experience created successfully' });
  } catch (error) {
    console.error('Error creating work experience', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will get all work experiences
export const getWorkExperiences = async (req, res) => {
  try {
    // Retrieve all work experiences from the database
    const workExperiences = await Work.find({});
    console.log('Work experiences retrieved successfully', workExperiences);
    res.status(200).json(workExperiences);
  } catch (error) {
    console.error('Error retrieving work experiences', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will update a work experience
export const updateWorkExperience = async (req, res) => {
  const { id } = req.params;
  const { company, url, image, address, period, type, position, responsibilities, achievements } = req.body;

  try {
    // Find the work experience by ID
    const workExperience = await Work.findById(id);
    if (!workExperience) {
      return res.status(404).json({ message: 'Work experience not found' });
    }

    // Store the old details for transaction recording
    const oldDetails = { 
      company: workExperience.company, 
      url: workExperience.url, 
      image: workExperience.image, 
      address: workExperience.address, 
      period: workExperience.period, 
      type: workExperience.type, 
      position: workExperience.position, 
      responsibilities: workExperience.responsibilities, 
      achievements: workExperience.achievements 
    };
    // Update the work experience with the new data
    workExperience.company = company || workExperience.company;
    workExperience.url = url || workExperience.url;
    workExperience.image = image || workExperience.image;
    workExperience.address = address || workExperience.address;
    workExperience.period = period || workExperience.period;
    workExperience.type = type || workExperience.type;
    workExperience.position = position || workExperience.position;
    workExperience.responsibilities = responsibilities || workExperience.responsibilities;
    workExperience.achievements = achievements || workExperience.achievements;

    // Save the updated work experience to the database
    await workExperience.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'update', 'work_experience', { old: oldDetails, new: { company, url, image, address, period, type, position, responsibilities, achievements } });

    console.log('Work experience updated successfully:', workExperience);
    res.status(200).json({ message: 'Work experience updated successfully' });
  } catch (error) {
    console.error('Error updating work experience', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will delete a work experience
export const deleteWorkExperience = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the work experience by ID
    const workExperience = await Work.findByIdAndDelete(id);
    if (!workExperience) {
      return res.status(404).json({ message: 'Work experience not found' });
    }

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'delete', 'work_experience', { company: workExperience.company, url: workExperience.url, image: workExperience.image, address: workExperience.address, period: workExperience.period, type: workExperience.type, position: workExperience.position, responsibilities: workExperience.responsibilities, achievements: workExperience.achievements });

    console.log('Work experience deleted successfully:', workExperience);
    res.status(200).json({ message: 'Work experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting work experience', error);
    res.status(500).json({ error: error.message });
  }
};