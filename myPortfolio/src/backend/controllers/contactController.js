import Contact from "../models/Contact.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { verifyPassword, recordTransaction } from '../utils.js';

// Load environment variables
dotenv.config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// This function handles creating a new contact
export const createContact = async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  try {
    // Create a new Contact instance with the provided data
    const contact = new Contact({ name, phone, email, subject, message });
    // Save the contact to the database
    await contact.save();

    // Send notification email to yourself
    const notificationMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: 'New Contact Message',
      text: `You have received a new contact message from ${name}.\n\nContact Details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}\n\nPlease check the dashboard for more details.`
    };

    transporter.sendMail(notificationMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending notification email:', error);
      } else {
        console.log('Notification email sent:', info.response);
      }
    });

    // Send thank you email to the client
    const thankYouMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Us',
      text: `Hello ${name},\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nBest regards,\nBruno Alencar Amaral`
    };

    transporter.sendMail(thankYouMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending thank you email:', error);
      } else {
        console.log('Thank you email sent:', info.response);
      }
    });

    console.log('Contact created successfully', contact);
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error('Error creating contact', error);
    res.status(500).json({ error: error.message });
  }
};

// This function handles retrieving all contacts
export const getContacts = async (req, res) => {
  try {
    // Retrieve all contacts from the database
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error getting contacts', error);
    res.status(500).json({ error: error.message });
  }
};

// This function handles deleting a contact
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    // Check if the user has admin privileges
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Only admins can delete contacts" });
    }

    // Verify the provided password with the stored password
    await verifyPassword(password, req.user.password);

    // Find and delete the contact by ID
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'delete', null, contact);

    console.log('Contact deleted successfully', contact);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error('Error deleting contact', error);
    res.status(500).json({ error: error.message });
  }
};