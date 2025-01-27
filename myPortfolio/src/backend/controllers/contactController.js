import Contact from "../models/Contact.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { verifyPassword, recordTransaction } from '../utils.js';

// Carregar variáveis de ambiente
dotenv.config();

// Configurar o nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // ou outro serviço de e-mail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const createContact = async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  try {
    const contact = new Contact({ name, phone, email, subject, message });
    await contact.save();

    // Enviar e-mail de notificação para você
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

    // Enviar e-mail de agradecimento para o cliente
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