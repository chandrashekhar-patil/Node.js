import Joi from 'joi';
import crypto from 'crypto';
import db from './db.js';

const Validation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
});

const forgotPassword = (transporter) => (req, res) => {
  const { email } = req.body;
  const lowerEmail = email.toLowerCase();

  const { error } = Validation.validate({ email: lowerEmail });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [lowerEmail],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(200).json({
          message: 'If the email exists, a reset link has been sent.',
        });
      }

      const user = results[0];
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour

      db.query(
        'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
        [resetToken, resetTokenExpiry, user.id],
        async (err) => {
          if (err) {
            console.error('Database update error:', err);
            return res.status(500).json({ message: 'Database error' });
          }

          const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

          try {
            await transporter.sendMail({
              from: process.env.EMAIL_FROM,
              to: lowerEmail,
              subject: 'Password Reset Link',
              html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
            });
            res.status(200).json({
              message: 'If the email exists, a reset link has been sent.',
            });
          } catch (error) {
            console.error('Error sending reset email:', error);
            res.status(500).json({ message: 'Failed to send reset email' });
          }
        }
      );
    }
  );
};

export default forgotPassword;