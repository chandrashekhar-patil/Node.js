# User Management and Authentication App

A full-stack application for user management and authentication, featuring a React (Vite) frontend with Bootstrap for a clean UI and an Express.js backend with MySQL for data storage. The app supports CRUD operations for user management and secure authentication with login, registration, and password reset functionality.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project provides a robust user management system with authentication capabilities. The frontend is built with React (Vite) and styled using Bootstrap and Tailwind CSS for a modern, responsive UI. The backend uses Express.js with MySQL to handle data storage and API requests. The application includes four CRUD endpoints for user management and additional endpoints for authentication, all designed with simple, maintainable logic.

- **Frontend**: React (Vite) with Bootstrap and Tailwind CSS for a clean, attractive UI.
- **Backend**: Express.js with MySQL for efficient data storage.
- **APIs**: CRUD operations (Create, Read, Update, Delete) and authentication endpoints (login, register, forgot password).
- **Components**: Simple React components for user management and authentication.
- **Logic**: Easy-to-understand code with minimal complexity.

## Features

- **User Management**:
  - View a list of all users in a table.
  - Add new users via a form.
  - Edit existing user details.
  - Delete users from the system.
- **Authentication**:
  - Secure user login with email and password.
  - User registration with name, email, and password.
  - Forgot password functionality to send reset instructions.
  - Protected dashboard displaying user information.
- **UI Enhancements**:
  - Responsive design with Bootstrap and Tailwind CSS.
  - Gradient buttons, animations, and hover effects.
  - Toast notifications for success and error messages.
- **Security**: Backend validation with Joi, password hashing with bcrypt, and cookie-based authentication.

## Prerequisites

Before setting up the project, ensure the following are installed:

- **Node.js** (v16 or higher)
- **MySQL** (v8 or higher, with a running server)
- **MySQL Database**: A database named `crud_app` with a `users` table:
  ```sql
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );


Git (optional, for cloning the repository)

Backend Setup
The backend is an Express.js server connected to a MySQL database, handling CRUD and authentication APIs.

Clone the Repository (if applicable):
git clone <repository-url>
cd <repository-directory>


Install Dependencies:
npm install express cors cookie-parser joi bcrypt mysql2


Configure Database:

Update db.js with your MySQL connection details:const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'crud_app'
});
module.exports = connection;




Run the Server:
node server.js

The server will run on http://localhost:5000.


Frontend Setup
The frontend is a React application created with Vite, styled with Bootstrap and Tailwind CSS.

Navigate to Frontend Directory (if separate):
cd frontend


Install Dependencies:
npm install axios react-router-dom react-hot-toast react-icons bootstrap tailwindcss postcss autoprefixer


Configure Tailwind CSS:

Ensure tailwind.config.js includes:module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#6B7280',
        background: '#F9FAFB',
        accent: '#10B981'
      }
    }
  },
  plugins: []
};




Run the Development Server:
npm run dev

The app will be available at http://localhost:5173.


API Endpoints
The backend provides the following API endpoints:



Method
Endpoint
Description



GET
/api/users
Fetch all users


POST
/api/users
Add a new user


PUT
/api/users/:id
Update a user by ID


DELETE
/api/users/:id
Delete a user by ID


POST
/api/login
Authenticate a user


POST
/api/register
Register a new user


POST
/api/forgot-password
Send password reset instructions


Example Request (POST /api/register):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Frontend Components
The frontend includes the following React components:

UserList: Displays all users in a responsive Bootstrap table.
AddUser: Form to add a new user with name, email, and password fields.
EditUser: Form to update an existing user's details.
Login: Form for user authentication with email and password, including a "Forgot Password" link.
Register: Form for user registration with a "What is this?" link explaining the app.
ForgotPassword: Form to submit an email for password reset.
Dashboard: Protected page displaying the logged-in user's email and a welcome message.
Navbar: Responsive navigation bar with links to Login, Register, Dashboard, and Logout.

Usage

Start the Backend:
node server.js


Start the Frontend:
npm run dev


Access the App:

Open http://localhost:5173 in your browser.
Register: Navigate to /register, enter details, and click "What is this?" for app info.
Login: Go to /login, enter credentials, or use "Reset it" for password recovery.
Forgot Password: At /forgot-password, submit your email to receive reset instructions.
Dashboard: View your profile after logging in.
User Management: Use the user list to add, edit, or delete users (requires authentication).
Logout: Clear session via the navbar.



Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.```
