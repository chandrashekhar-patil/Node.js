import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import api from "../../lib/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/signup", formData);
      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign up to get started
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative group">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <User
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-200"
                size={20}
              />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="relative group">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Lock
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-200"
                size={20}
              />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                value={formData.password}
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
                "Sign Up"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
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

export default Register;