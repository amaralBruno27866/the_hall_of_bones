import Education from "../models/Education.js";
import { verifyPassword, recordTransaction } from '../utils.js';

// This function will create a new education entry in the database
export const createEducation = async (req, res) => {
  const { institution, image, url, field, degree, period, address, skill } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can create new education entries.' });
    }

    const education = new Education({ institution, image, url, field, degree, period, address, skill });
    await education.save();

    await recordTransaction(req.user, 'create', 'education', { institution, image, url, field, degree, period, address, skill });

    console.log('Education entry created successfully', education);
    res.status(201).json({ message: 'Education entry created successfully' });
  } catch (error) {
    console.error('Error creating education entry', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will get all education entries
export const getEducations = async (req, res) => {
  try {
    const education = await Education.find({});
    console.log('Education entries retrieved successfully', education);
    res.status(200).json(education);
  } catch (error) {
    console.error('Error retrieving education entries', error);
    res.status(500).json({ error: error.message });
  }
}

// This function will update an education entry
export const updateEducation = async (req, res) => {
  const { id } = req.params;
  const { institution, image, url, field, degree, period, address, skill, password } = req.body;

  try {
    const education = await Education.findById(id);
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    await verifyPassword(password, req.user.password);

    const oldDetails = { institution: education.institution, image: education.image, url: education.url, field: education.field, degree: education.degree, period: education.period, address: education.localization, skill: education.skill };
    education.institution = institution || education.institution;
    education.image = image || education.image;
    education.url = url || education.url;
    education.field = field || education.field;
    education.degree = degree || education.degree;
    education.period = period || education.period;
    education.address = address || education.address;
    education.skill = skill || education.skill;

    await education.save();

    await recordTransaction(req.user, 'update', 'education', { old: oldDetails, new: { institution, image, url, field, degree, period, address, skill } });

    console.log('Education entry updated successfully', education);
    res.status(200).json({ message: 'Education entry updated successfully' });
  } catch (error) {
    console.error('Error updating education entry', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will delete an education entry
export const deleteEducation = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can delete education entries.' });
    }

    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    await recordTransaction(req.user, 'delete', 'education', { institution: education.institution, image: education.image, url: education.url, field: education.field, degree: education.degree, period: education.period, localization: education.localization, skill: education.skill });

    console.log('Education entry deleted successfully', education);
    res.status(200).json({ message: 'Education entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting education entry', error);
    res.status(500).json({ error: error.message });
  }
};