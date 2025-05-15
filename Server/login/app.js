import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import register from "./register.js";
import login from "./login.js";
import resetPassword from "./resetPassword.js";
import forgotPassword from "./forgetpassword.js";
import validateToken from "./validateToken.js";
import db from "./db.js";
import dotenv from "dotenv";

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Get Current User endpoint
const getCurrentUser = (req, res) => {
  const email = req.cookies.user;

  if (!email) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user cookie found" });
  }

  db.query(
    "SELECT id, name, email FROM users WHERE email = ?",
    [email.toLowerCase()],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      const user = results[0];
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  );
};

// Logout endpoint
app.post("/logout", (req, res) => {
  res.clearCookie("user");
  res.json({ message: "Logout successful" });
});

// Routes
app.post("/signup", register);
app.post("/login", login);
app.post("/forgot-password", forgotPassword(transporter)); // Updated route name
app.post("/reset-password", resetPassword);
app.post("/validate-token", validateToken);
app.get("/user", getCurrentUser);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
