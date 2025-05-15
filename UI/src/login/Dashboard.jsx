import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Loader2, LogOut } from 'lucide-react';
import api from '../../lib/axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch user data.');
        if (error.response?.status === 401) {
          setTimeout(() => navigate('/login'), 2000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to log out. Please try again.');
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              User Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Your account details
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={40} />
            </div>
          ) : user ? (
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <User className="text-gray-400 dark:text-gray-500 mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Mail className="text-gray-400 dark:text-gray-500 mr-3" size={24} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 flex items-center justify-center"
              >
                <LogOut className="mr-2" size={20} />
                Log Out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;