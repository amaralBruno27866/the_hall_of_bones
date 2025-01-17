import Contact from "../models/Contact.js";
import { verifyPassword, recordTransaction } from '../utils.js';

export const createContact = async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  try {
    const contact = new Contact({ name, phone, email, subject, message });
    await contact.save();

    console.log('Constac created sucessfully', contact);
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error('Error creating contact', error);
    res.status(500).json({ error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error getting contacts', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Only admins can delete contacts" });
    }

    await verifyPassword(password, req.user.password);

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await recordTransaction(req.user, 'delete', null, contact);

    console.log('Contact deleted successfully', contact);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error('Error deleting contact', error);
    res.status(500).json({ error: error.message });
  }
};