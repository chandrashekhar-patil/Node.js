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
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [lowerEmail],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        console.log("No user found for email:", lowerEmail);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.error("Bcrypt error:", err);
          return res.status(500).json({ message: "Error checking password" });
        }

        if (!match) {
          console.log("Password mismatch for email:", lowerEmail);
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