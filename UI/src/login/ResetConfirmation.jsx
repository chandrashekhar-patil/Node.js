import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/login'), 3000);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Password Reset Successful
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your password has been reset. Redirecting to login...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmation;