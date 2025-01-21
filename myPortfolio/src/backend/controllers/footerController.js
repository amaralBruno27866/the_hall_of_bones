import Footer from '../models/Footer.js';
import { verifyPassword, recordTransaction } from '../utils.js';

export const createFooter = async (req, res) => {
  const { image, paragraph, social_media, privacy_policy, terms_and_conditions } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can create new footers.' });
    }

    const footer = new Footer({ image, paragraph, social_media, privacy_policy, terms_and_conditions });
    await footer.save();

    await recordTransaction(req.user, 'create', 'footer', { image, paragraph, social_media, privacy_policy, terms_and_conditions });

    console.log('Footer created successfully:', footer);
    res.status(201).json({ message: 'Footer created successfully.' });
  } catch (error) {
    console.error('Error creating footer:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne({});
    console.log('Footer retrieved successfully:', footer);
    res.status(200).json(footer);
  } catch (error) {
    console.error('Error retrieving footer:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateFooter = async (req, res) => {
  const { id } = req.params;
  const { image, paragraph, social_media, privacy_policy, terms_and_conditions, password } = req.body;

  try {
    const footer = await Footer.findById(id);
    if (!footer) {
      return res.status(404).json({ message: 'Footer not found' });
    }

    await verifyPassword(password, req.user.password);

    const oldDetails = { image: footer.image, paragraph: footer.paragraph, social_media: footer.social_media, privacy_policy: footer.privacy_policy, terms_and_conditions: footer.terms_and_conditions };
    footer.image = image || footer.image;
    footer.paragraph = paragraph || footer.paragraph;
    footer.social_media = social_media || footer.social_media;
    footer.privacy_policy = privacy_policy || footer.privacy_policy;
    footer.terms_and_conditions = terms_and_conditions || footer.terms_and_conditions;

    await footer.save();

    await recordTransaction(req.user, 'update', 'footer', { old: oldDetails, new: { image, paragraph, social_media, privacy_policy, terms_and_conditions } });

    console.log('Footer updated successfully:', footer);
    res.status(200).json({ message: 'Footer updated successfully.' });
  } catch (error) {
    console.error('Error updating footer:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteFooter = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can delete footers.' });
    }

    const footer = await Footer.findByIdAndDelete(id);
    if (!footer) {
      return res.status(404).json({ message: 'Footer not found' });
    }

    await recordTransaction(req.user, 'delete', 'footer', { image: footer.image, paragraph: footer.paragraph, social_media: footer.social_media, privacy_policy: footer.privacy_policy, terms_and_conditions: footer.terms_and_conditions });
    console.log('Footer deleted successfully:', footer);
    res.status(200).json({ message: 'Footer deleted successfully.' });
  } catch (error) {
    console.error('Error deleting footer:', error);
    res.status(500).json({ error: error.message });
  }
};