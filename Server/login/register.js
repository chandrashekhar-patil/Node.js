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
