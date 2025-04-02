// Importing the Contact model to interact with the database
import Contact from "../models/Contact.js";
// Importing nodemailer for sending emails
import nodemailer from 'nodemailer';
// Importing dotenv to load environment variables
import dotenv from 'dotenv';
// Importing utility functions for password verification and transaction recording
import { verifyPassword, recordTransaction } from '../utils.js';

// Load environment variables from the .env file
dotenv.config();

// Configure nodemailer with email service and authentication details
const transporter = nodemailer.createTransport({
  service: 'gmail', // Email service provider
  auth: {
    user: process.env.EMAIL_USER, // Email address for authentication
    pass: process.env.EMAIL_PASS // Password for authentication
  }
});

// This function handles creating a new contact
export const createContact = async (req, res) => {
  const { name, phone, email, subject, message } = req.body; // Extracting contact details from the request body

  try {
    // Create a new Contact instance with the provided data
    const contact = new Contact({ name, phone, email, subject, message });
    // Save the contact to the database
    await contact.save();

    // Send a notification email to the admin
    const notificationMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL, // Admin email address
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

    // Send a thank-you email to the client
    const thankYouMailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Client's email address
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
    res.status(201).json({ message: "Contact created successfully" }); // Respond with success
  } catch (error) {
    console.error('Error creating contact', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function handles retrieving all contacts
export const getContacts = async (req, res) => {
  try {
    // Retrieve all contacts from the database
    const contacts = await Contact.find({});
    res.status(200).json(contacts); // Respond with the retrieved contacts
  } catch (error) {
    console.error('Error getting contacts', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};

// This function handles deleting a contact
export const deleteContact = async (req, res) => {
  const { id } = req.params; // Extracting the contact ID from the request parameters
  const { password } = req.body; // Extracting the password from the request body

  try {
    // Check if the user has admin privileges
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Only admins can delete contacts" }); // Respond with access denied
    }

    // Verify the provided password with the stored hashed password
    await verifyPassword(password, req.user.password);

    // Find and delete the contact by ID
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" }); // Respond if contact is not found
    }

    // Record the transaction for auditing purposes
    await recordTransaction(req.user, 'delete', null, contact);

    console.log('Contact deleted successfully', contact);
    res.status(200).json({ message: "Contact deleted successfully" }); // Respond with success
  } catch (error) {
    console.error('Error deleting contact', error);
    res.status(500).json({ error: error.message }); // Respond with error
  }
};