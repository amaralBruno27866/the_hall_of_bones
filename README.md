# The Hall of Bones

## Project Description

The Hall of Bones is a personal portfolio project that allows the creation, editing, and deletion of content cards through a graphical interface. The project is divided into two main parts: the administration dashboard and the public page that displays the cards to users.

## Technologies Used

- **Frontend:**
  - React
  - Axios
  - Bootstrap
  - CSS Modules

- **Backend:**
  - Node.js
  - Express
  - Mongoose
  - MongoDB

## How to Set Up and Run the Project Locally

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Setup Steps

1. Clone the repository:

```sh
git clone https://github.com/amaralBruno27866/the_hall_of_bones.git
```

2. Navigate to the project directory:

```
cd the_hall_of_bones/myPortfolio
```

3. Install backend dependencies:

```
cd src/backend
npm install
```

4. Install frontend dependencies:

```
cd ../frontend
npm install
```

5. Configure environment variables:

Create a .env file in the backend folder with the following variables:
```
MONGO_URI=mongodb://localhost:27017/the_hall_of_bones
JWT_SECRET=your_jwt_secret
```

6. Start the backend server:

```
cd src/backend
npm start
```

7. Start the frontend server:

```
cd ../frontend
npm start
```

8. Access the project in the browser:

```
- Administration dashboard: http://localhost:3000/admin
- Public page: http://localhost:3000
```

# Main Features
## Administration Dashboard:
- Create new content cards
- Edit existing cards
- Delete cards
## Public Page:
- Display content cards with image, title, and paragraph
- Responsive layout using Bootstrap

## Business Rules
- Only admin users can create new users.
- Users must be logged in to edit or delete content cards through the dashboard.
- Content cards can only be created, edited, or deleted by authenticated users.

## Security Practices
- Authentication: JWT (JSON Web Token) is used for user authentication.
- Authorization: Role-based access control ensures that only admin users can create new users.
- Data Validation: Input data is validated on both the client and server sides to prevent invalid data from being processed.
- Error Handling: Proper error handling is implemented to provide meaningful error messages and prevent application crashes.
- Environment Variables: Sensitive information such as database connection strings and JWT secrets are stored in environment variables.

# Folder Structure
```
the_hall_of_bones/
├── myPortfolio/
│   ├── src/
│   │   ├── backend/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── utils/
│   │   │   ├── config/
│   │   │   ├── server.js
│   │   │   └── ...
│   │   ├── frontend/
│   │   │   ├── components/
│   │   │   │   ├── elements/
│   │   │   │   ├── about.jsx
│   │   │   │   ├── aboutForm.jsx
│   │   │   │   ├── aboutEditModal.jsx
│   │   │   │   ├── aboutDeleteModal.jsx
│   │   │   │   └── ...
│   │   │   ├── hooks/
│   │   │   ├── styles/
│   │   │   ├── assets/
│   │   │   ├── App.js
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── ...
```

# Contribution
If you want to contribute to this project, please fork the repository, create a branch for your changes, and submit a pull request.

# License
This project is licensed under the MIT License. See the LICENSE file for more details.

# Made with❤️ by Bruno Amaral
This README includes a project description, technologies used, setup and run instructions, main features, folder structure, and information about contribution and license. Feel free to adjust any specific information as needed.
