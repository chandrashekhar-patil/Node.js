import Joi from 'joi';
import bcrypt from 'bcrypt';
import db from './db.js';

const Validation = Joi.object({
  token: Joi.string().required().messages({
    'string.empty': 'Token is required',
  }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
});

const resetPassword = (req, res) => {
  const { token, password } = req.body;

  const { error } = Validation.validate({ token, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  db.query(
    'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?',
    [token, Date.now()],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      const user = results[0];

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error hashing password' });
        }

        db.query(
          'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
          [hashedPassword, user.id],
          (err) => {
            if (err) {
              return res.status(500).json({ message: 'Database error' });
            }

            res.status(200).json({
              message: 'Password has been reset successfully',
            });
          }
        );
      });
    }
  );
};

export default resetPassword;