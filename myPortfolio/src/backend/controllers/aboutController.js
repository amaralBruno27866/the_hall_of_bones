import AboutCard from '../models/About.js';
import { verifyPassword, recordTransaction } from '../utils.js';

// This function will create a new about card
export const createAboutCard = async (req, res) => {
  const { icon, title, paragraph, session } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can create new cards.' });
    }

    const aboutCard = new AboutCard({ icon, title, paragraph, session });
    await aboutCard.save();

    await recordTransaction(req.user, 'create', session, { icon, title, paragraph });

    console.log('About card created successfully:', aboutCard);
    res.status(201).json({ message: 'About card created successfully!' });
  } catch (error) {
    console.error('Error creating about card:', error);
    res.status(400).json({ error: error.message });
  }
};

// This function will get all about cards
export const getAboutCards = async (req, res) => {
  try {
    const aboutCards = await AboutCard.find({});
    console.log('About cards retrieved successfully:', aboutCards);
    res.status(200).json(aboutCards);
  } catch (error) {
    console.error('Error retrieving about cards:', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will update an about card
export const updateAboutCard = async (req, res) => {
  const { id } = req.params;
  const { icon, title, paragraph, session, password } = req.body;

  try {
    const aboutCard = await AboutCard.findById(id);
    if (!aboutCard) {
      return res.status(404).json({ message: 'About card not found' });
    }

    await verifyPassword(password, req.user.password);

    const oldDetails = { icon: aboutCard.icon, title: aboutCard.title, paragraph: aboutCard.paragraph, session: aboutCard.session };
    aboutCard.icon = icon || aboutCard.icon;
    aboutCard.title = title || aboutCard.title;
    aboutCard.paragraph = paragraph || aboutCard.paragraph;
    aboutCard.session = session || aboutCard.session;

    await aboutCard.save();

    await recordTransaction(req.user, 'update', session, { old: oldDetails, new: { icon, title, paragraph, session } });

    console.log('About card updated successfully:', aboutCard);
    res.status(200).json({ message: 'About card updated successfully!' });
  } catch (error) {
    console.error('Error updating about card:', error);
    res.status(500).json({ error: error.message });
  }
};

// This function will delete an about card
export const deleteAboutCard = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can delete cards.' });
    }

    const aboutCard = await AboutCard.findByIdAndDelete(id);
    if (!aboutCard) {
      return res.status(404).json({ message: 'About card not found' });
    }

    await recordTransaction(req.user, 'delete', aboutCard.session, { icon: aboutCard.icon, title: aboutCard.title, paragraph: aboutCard.paragraph });

    console.log('About card deleted successfully:', aboutCard);
    res.status(200).json({ message: 'About card deleted successfully!' });
  } catch (error) {
    console.error('Error deleting about card:', error);
    res.status(500).json({ error: error.message });
  }
};