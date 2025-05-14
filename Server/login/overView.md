# Node.js Express MySQL Authentication API

A RESTful authentication API built with Node.js, Express, and MySQL that provides user registration and login functionality.

## Project Overview

This project implements a basic authentication system with the following components:

- Express.js backend server
- MySQL database integration
- User registration with password hashing
- User login with cookie-based authentication
- Input validation using Joi
- CORS support for cross-origin requests

## Project Structure

```
├── app.js          # Main application entry point
├── db.js           # Database connection configuration
├── login.js        # Login route handler
└── register.js     # Registration route handler
```

## Setup Instructions

### Prerequisites

- Node.js installed
- MySQL server running

### Database Setup

Create a MySQL database named `users` and a table named `users`:

```sql
CREATE DATABASE users;
USE users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install express mysql bcrypt joi cookie-parser cors
   ```
3. Update database connection details in `db.js` if necessary

## API Endpoints

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| POST   | /signup  | Register a new user |
| POST   | /login   | Authenticate a user |

## Request & Response Examples

### Register a new user

```
POST /signup
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "message": "Registration successful",
  "id": 1
}
```

### Login

```
POST /login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Implementation Details

### db.js

```javascript
import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chandu@1234567",
  database: "users",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

export default db;
```

### app.js

```javascript
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import register from "./register.js";
import login from "./login.js";
import "./db.js";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.post("/signup", register);
app.post("/login", login);

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT}`);
});

export default app;
```

### register.js

```javascript
import bcrypt from "bcrypt";
import Joi from "joi";
import db from "./db.js";

const Validation = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z ]+$/)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.pattern.base": "Name must contain only letters",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

const register = (req, res) => {
  const { name, email, password } = req.body;
  let lowerEmail = "";
  if (email) {
    lowerEmail = email.toLowerCase();
  }

  const { error } = Validation.validate({ name, email: lowerEmail, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  bcrypt.hash(password, 5, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const values = [name, lowerEmail, hashedPassword];

    db.query(sql, values, (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already registered" });
        }
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({
        message: "Registration successful",
        id: result.insertId,
      });
    });
  });
};

export default register;
```

### login.js

```javascript
import bcrypt from "bcrypt";
import Joi from "joi";
import db from "./db.js";

const Validation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

const login = (req, res) => {
  const { email, password } = req.body;
  let lowerEmail = "";
  if (email) {
    lowerEmail = email.toLowerCase();
  }

  const { error } = Validation.validate({ email: lowerEmail, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [lowerEmail],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          return res.status(500).json({ message: "Error checking password" });
        }

        if (!match) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        res.cookie("user", user.email, { httpOnly: true, maxAge: 3600000 });
        res.json({
          message: "Login successful",
          user: { id: user.id, name: user.name, email: user.email },
        });
      });
    }
  );
};

export default login;
```

## Database Schema

```
mysql> desc users;
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment    |
| name       | varchar(100) | NO   |     | NULL              |                   |
| email      | varchar(255) | NO   | UNI | NULL              |                   |
| password   | varchar(255) | NO   |     | NULL              |                   |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------+------+-----+-------------------+-------------------+
```

## Security Features

- Password hashing using bcrypt
- Input validation using Joi
- Email normalization (converting to lowercase)
- HTTP-only cookies for authentication
- CORS configuration for frontend access

## Notes

- The cookie expiration is set to 1 hour (3600000 ms)
- Frontend origin is configured to `http://localhost:5173`
- Make sure to secure your database credentials in a production environment
- Consider implementing additional security measures such as:
  - Rate limiting
  - CSRF protection
  - Environment variable configuration
  - Refresh tokens
  
