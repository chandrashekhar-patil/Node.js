import Joi from "joi";
import db from "./db.js";

const Validation = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token is required",
  }),
});

const validateToken = (req, res) => {
  const { token } = req.body;

  const { error } = Validation.validate({ token });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if token exists and is not expired
  db.query(
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?",
    [token, Date.now()],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" }); 
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      res.status(200).json({
        message: "Token is valid",
      });
    }
  );
};

export default validateToken;