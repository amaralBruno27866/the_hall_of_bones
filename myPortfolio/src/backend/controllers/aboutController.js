// Importing the AboutCard model to interact with the database
import AboutCard from '../models/About.js';
// Importing the recordTransaction utility for auditing purposes
import { recordTransaction } from '../utils.js';

// This function will create a new about card
export const createAboutCard = async (req, res) => {
  const { image, title, paragraph, session } = req.body; // Extracting data from the request body

  try {
    // Create a new AboutCard instance with the provided data
    const aboutCard = new AboutCard({ image, title, paragraph, session });
    // Save the about card to the database
    await aboutCard.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'create', session, { image, title, paragraph });

    console.log('About card created successfully:', aboutCard);
    res.status(201).json({ message: 'About card created successfully!' }); // Respond with success
  } catch (error) {
    console.error('Error creating about card:', error);
    res.status(400).json({ error: error.message }); // Respond with error
  }
};

// This function will get all about cards
export const getAboutCards = async (req, res) => {
  try {
    // Retrieve all about cards from the database
    const aboutCards = await AboutCard.find({});
    console.log('About cards retrieved successfully:', aboutCards);
    res.status(200).json(aboutCards); // Respond with the retrieved data
  } catch (error) {
    console.error('Error retrieving about cards:', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function will update an about card
export const updateAboutCard = async (req, res) => {
  const { id } = req.params; // Extracting the ID from the request parameters
  const { image, title, paragraph, session } = req.body; // Extracting data from the request body

  try {
    // Find the about card by ID
    const aboutCard = await AboutCard.findById(id);
    if (!aboutCard) {
      return res.status(404).json({ message: 'About card not found' }); // Respond if not found
    }

    // Store the old details for transaction recording
    const oldDetails = { image: aboutCard.image, title: aboutCard.title, paragraph: aboutCard.paragraph, session: aboutCard.session };
    // Update the about card with the new data
    aboutCard.image = image || aboutCard.image;
    aboutCard.title = title || aboutCard.title;
    aboutCard.paragraph = paragraph || aboutCard.paragraph;
    aboutCard.session = session || aboutCard.session;

    // Save the updated about card to the database
    await aboutCard.save();

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'update', session, { old: oldDetails, new: { image, title, paragraph, session } });

    console.log('About card updated successfully:', aboutCard);
    res.status(200).json({ message: 'About card updated successfully!' }); // Respond with success
  } catch (error) {
    console.error('Error updating about card:', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function will delete an about card
export const deleteAboutCard = async (req, res) => {
  const { id } = req.params; // Extracting the ID from the request parameters

  try {
    // Find and delete the about card by ID
    const aboutCard = await AboutCard.findByIdAndDelete(id);
    if (!aboutCard) {
      return res.status(404).json({ message: 'About card not found' }); // Respond if not found
    }

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'delete', aboutCard.session, { image: aboutCard.image, title: aboutCard.title, paragraph: aboutCard.paragraph });

    console.log('About card deleted successfully:', aboutCard);
    res.status(200).json({ message: 'About card deleted successfully!' }); // Respond with success
  } catch (error) {
    console.error('Error deleting about card:', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};