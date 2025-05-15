import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import api from "../../lib/axios";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenChecking, setTokenChecking] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    // Validate token on component mount
    if (!token) {
      setError("Missing password reset token");
      setTokenChecking(false);
      return;
    }

    const validateToken = async () => {
      try {
        await api.post("/validate-token", { token });
        setTokenValid(true);
      } catch (error) {
        setError("Invalid or expired token. Please request a new password reset link.");
      } finally {
        setTokenChecking(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/reset-password", {
        token,
        password: formData.password,
      });
      
      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Password reset failed:", error);
      setError(
        error.response?.data?.message || 
        "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden p-8 text-center">
          <Loader2 className="animate-spin mx-auto h-8 w-8 text-blue-600 dark:text-blue-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Validating your reset token...</p>
        </div>
      </div>
    );
  }

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
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reset Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Enter your new password
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400">
              <p className="font-medium">{success}</p>
              <p className="text-sm mt-3">
                Redirecting to login page shortly...
              </p>
            </div>
          ) : tokenValid ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="relative group">
                <label htmlFor="password" className="sr-only">
                  New Password
                </label>
                <Lock
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-200"
                  size={20}
                />
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your new password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>

              <div className="relative group">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm New Password
                </label>
                <Lock
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-200"
                  size={20}
                />
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  value={formData.confirmPassword}
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
                  "Reset Password"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">
                {error || "Invalid reset link"}
              </p>
              <a
                href="/forget-password"
                className="inline-block bg-blue-600 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200"
              >
                Request New Reset Link
              </a>
            </div>
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

export default ResetPassword;       