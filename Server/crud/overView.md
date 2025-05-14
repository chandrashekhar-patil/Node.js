# Node.js Express MySQL CRUD API

A simple RESTful API built with Node.js, Express, and MySQL that provides CRUD (Create, Read, Update, Delete) operations for managing users.

## Project Overview

This project implements a basic user management system with the following components:

- Express.js backend server
- MySQL database integration
- RESTful API endpoints for user operations
- CORS support for cross-origin requests

## Project Structure

```
├── app.js          # Main application entry point
├── db.js           # Database connection configuration
└── routes.js       # API route definitions
```

## Setup Instructions

### Prerequisites

- Node.js installed
- MySQL server running

### Database Setup

Create a MySQL database named `user_crud` and a table named `users`:

```sql
CREATE DATABASE user_crud;
USE user_crud;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install express mysql2 cors
   ```
3. Update database connection details in `db.js` if necessary

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /users   | Get all users |
| POST   | /users   | Create a new user |
| PUT    | /users/:id | Update a user by ID |
| DELETE | /users/:id | Delete a user by ID |

## Request & Response Examples

### Get all users

```
GET /users
```

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]
```

### Create user

```
POST /users
```

Request body:
```json
{
  "name": "New User",
  "email": "newuser@example.com"
}
```

Response:
```json
{
  "id": 3,
  "name": "New User",
  "email": "newuser@example.com"
}
```

### Update user

```
PUT /users/3
```

Request body:
```json
{
  "name": "Updated User",
  "email": "updated@example.com"
}
```

Response:
```json
{
  "message": "User updated"
}
```

### Delete user

```
DELETE /users/3
```

Response:
```json
{
  "message": "User deleted"
}
```

## Running the Application

Start the server:

```
node app.js
```

The server will run at `http://localhost:PORT` (where PORT is defined in your environment or defaults to a specified value).

## Implementation Details

### app.js
```javascript
import express from "express";
import cors from "cors";
import userRoutes from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT}`);
});
```

### db.js
```javascript
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chandu@1234567",
  database: "user_crud",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

export default db;
```

### routes.js
```javascript
import express from "express";
import db from "./db.js";

const router = express.Router();

// all users
router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Create user
router.post("/users", (req, res) => {
  const { name, email } = req.body;
  const q = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(q, [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, email });
  });
});

// Update user
router.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const q = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(q, [name, email, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User updated" });
  });
});

// Delete user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM users WHERE id = ?";
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User deleted" });
  });
});

export default router;
```

## Notes

- Make sure to secure your database credentials in a production environment
- Consider implementing input validation and error handling for a production application
- Add authentication and authorization for secure user management