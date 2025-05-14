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
