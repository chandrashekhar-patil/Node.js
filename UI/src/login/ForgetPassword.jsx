import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import api from "../../lib/axios";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const response = await api.post('/forgot-password', {
      email: formData.email.toLowerCase(),
    });
    setSuccess(true);
    setTimeout(() => navigate('/login'), 3000);
  } catch (error) {
    console.error('Password reset request failed:', error);
    setError(error.response?.data?.message || 'Failed to send reset link. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5zm-1 9H7a4 4 0 01-4-4v-1m5-7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Forgot Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Enter your email to reset your password
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400">
              <p className="font-medium">Reset link sent!</p>
              <p className="text-sm mt-1">
                Please check your email for instructions to reset your password.
              </p>
              <p className="text-sm mt-3">
                Redirecting to login page shortly...
              </p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="relative group">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Mail
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-200"
                  size={20}
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;