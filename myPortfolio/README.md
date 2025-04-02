# MyPortfolio - API Integrations

This document provides a detailed explanation of the API integrations used in the **MyPortfolio** project. It includes both external APIs and custom APIs created for the project.

---

## Table of Contents

1. [Introduction](#introduction)
2. [External APIs](#external-apis)
   - [Email Notification API](#email-notification-api)
3. [Custom APIs](#custom-apis)
   - [Authentication API](#authentication-api)
   - [About Section API](#about-section-api)
   - [Education Section API](#education-section-api)
   - [Project Section API](#project-section-api)
   - [Work Experience API](#work-experience-api)
   - [Contact Form API](#contact-form-api)
   - [Transaction Logging API](#transaction-logging-api)
4. [Configuration](#configuration)
5. [Examples](#examples)

---

## Introduction

The **MyPortfolio** project integrates several APIs to manage its backend and frontend functionalities. These APIs are used for user authentication, managing portfolio sections (e.g., About, Education, Projects), handling contact form submissions, and more. This document explains the purpose, functionality, and usage of each API.

---

## External APIs

### Email Notification API

- **Objective**: Send email notifications for contact form submissions.
- **Functionality**: Uses an SMTP server to send emails to the configured recipient.
- **Configuration**:
  - `EMAIL_USER`: The email address used to send notifications.
  - `EMAIL_PASS`: The password for the email account.
  - `NOTIFICATION_EMAIL`: The recipient email address for notifications.
- **Usage**:
  - Located in `src/backend/controllers/contactController.js`.
  - Triggered when a user submits the contact form.
- **Example**:
  ```javascript
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL,
    subject: 'New Contact Form Submission',
    text: 'You have received a new message.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  ```

---

## Custom APIs

### Authentication API

- **Objective**: Handle user login and logout.
- **Functionality**:
  - Login: Validates user credentials and generates a JWT token.
  - Logout: Invalidates the user's session.
- **Location**: `src/backend/routes/authRoutes.js`
- **Endpoints**:
  - `POST /api/login`: Authenticate a user.
  - `POST /api/logout`: Logout a user.
- **Example**:
  ```javascript
  // Login endpoint
  router.post('/login', login);

  // Logout endpoint
  router.post('/logout', authMiddleware, logout);
  ```

---

### About Section API

- **Objective**: Manage the "About" section of the portfolio.
- **Functionality**:
  - Create, update, delete, and fetch "About" cards.
- **Location**: `src/backend/routes/aboutRoutes.js`
- **Endpoints**:
  - `GET /api/about/cards`: Fetch all "About" cards.
  - `POST /api/about/cards`: Create a new "About" card.
  - `PUT /api/about/cards/:id`: Update an existing "About" card.
  - `DELETE /api/about/cards/:id`: Delete an "About" card.
- **Example**:
  ```javascript
  // Fetch all cards
  const response = await axios.get('/about/cards');
  ```

---

### Education Section API

- **Objective**: Manage the "Education" section of the portfolio.
- **Functionality**:
  - Create, update, delete, and fetch education entries.
- **Location**: `src/backend/routes/educationRoutes.js`
- **Endpoints**:
  - `GET /api/educations`: Fetch all education entries.
  - `POST /api/educations`: Create a new education entry.
  - `PUT /api/educations/:id`: Update an existing education entry.
  - `DELETE /api/educations/:id`: Delete an education entry.
- **Example**:
  ```javascript
  // Fetch all education entries
  const response = await axios.get('/educations');
  ```

---

### Project Section API

- **Objective**: Manage the "Projects" section of the portfolio.
- **Functionality**:
  - Create, update, delete, and fetch project entries.
- **Location**: `src/backend/routes/projectRoutes.js`
- **Endpoints**:
  - `GET /api/projects`: Fetch all project entries.
  - `POST /api/projects`: Create a new project entry.
  - `PUT /api/projects/:id`: Update an existing project entry.
  - `DELETE /api/projects/:id`: Delete a project entry.
- **Example**:
  ```javascript
  // Fetch all projects
  const response = await axios.get('/projects');
  ```

---

### Work Experience API

- **Objective**: Manage the "Work Experience" section of the portfolio.
- **Functionality**:
  - Create, update, delete, and fetch work experience entries.
- **Location**: `src/backend/routes/workRoutes.js`
- **Endpoints**:
  - `GET /api/work-experiences`: Fetch all work experience entries.
  - `POST /api/work-experiences`: Create a new work experience entry.
  - `PUT /api/work-experiences/:id`: Update an existing work experience entry.
  - `DELETE /api/work-experiences/:id`: Delete a work experience entry.
- **Example**:
  ```javascript
  // Fetch all work experiences
  const response = await axios.get('/work-experiences');
  ```

---

### Contact Form API

- **Objective**: Handle contact form submissions.
- **Functionality**:
  - Save contact form data to the database.
  - Send email notifications for new submissions.
- **Location**: `src/backend/routes/contactRoutes.js`
- **Endpoints**:
  - `POST /api/contacts`: Submit a contact form.
- **Example**:
  ```javascript
  // Submit contact form
  const response = await axios.post('/contacts', formData);
  ```

---

### Transaction Logging API

- **Objective**: Log user actions for auditing purposes.
- **Functionality**:
  - Record actions like create, update, and delete.
- **Location**: `src/backend/utils.js`
- **Example**:
  ```javascript
  await recordTransaction(user, 'create', 'project', projectDetails);
  ```

---

## Configuration

The APIs rely on environment variables defined in the `.env` file. Below are the key configurations:

- **Backend**:
  - `PORT`: The port for the backend server.
  - `MONGO_URI`: MongoDB connection string.
  - `JWT_SECRET`: Secret key for JWT tokens.
  - `CRYPTO_SECRET`: Secret key for data encryption.
- **Frontend**:
  - `REACT_APP_API_URL`: Base URL for API requests.
  - `REACT_APP_API_TOKEN`: Authentication token for API requests.
- **Email**:
  - `EMAIL_USER`: Email address for sending notifications.
  - `EMAIL_PASS`: Password for the email account.
  - `NOTIFICATION_EMAIL`: Recipient email address for notifications.

---

## Examples

### Fetching About Cards
```javascript
const response = await axios.get('/about/cards');
console.log(response.data);
```

### Submitting a Contact Form
```javascript
const formData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  message: 'Hello, I am interested in your services!',
};
const response = await axios.post('/contacts', formData);
console.log(response.data);
```

### Logging a Transaction
```javascript
await recordTransaction(user, 'update', 'education', updatedEducationDetails);
```

---

This README serves as a comprehensive guide to understanding and using the APIs integrated into the **MyPortfolio** project.