import { useState, useEffect } from 'react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('No token found, redirecting to login');
          setTimeout(() => onNavigate('login'), 100);
          return;
        }

        console.log('Fetching profile with token:', token);

        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Profile response status:', response.status);
        const data = await response.json();
        console.log('Profile data:', data);

        if (response.ok) {
          setUser(data.user);
          setLoading(false);
        } else {
          console.error('Profile fetch failed:', data.message);
          // Token invalid, redirect to login
          localStorage.removeItem('token');
          setLoading(false);
          setTimeout(() => onNavigate('login'), 100);
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        localStorage.removeItem('token');
        setLoading(false);
        setTimeout(() => onNavigate('login'), 100);
      }
    };

    fetchUserProfile();
  }, [onNavigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Dispatch custom event to notify navbar
    window.dispatchEvent(new Event('loginStatusChanged'));
    onNavigate('home');
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#D4A855] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If no user, should not reach here as useEffect redirects
  if (!user) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div
            className="h-32 flex items-center justify-between px-8 py-6"
            style={{ backgroundColor: '#D4A855' }}
          >
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Welcome!</h1>
              <p className="text-white/90 text-lg">
                {user?.username || user?.email}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-[#D4A855]">
                  {user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
                <p className="text-sm text-gray-500">Your account info</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              <strong>Email:</strong> {user?.email}
            </p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              View Profile
            </button>
          </div>

          {/* Activity Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
                <p className="text-sm text-gray-500">Your recent actions</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Member since today</p>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
              View Activity
            </button>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.62l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.48.12.62l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.62l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.47.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.48-.12-.62l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
                <p className="text-sm text-gray-500">Manage preferences</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Customize your experience</p>
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300">
              Open Settings
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Projects', value: '0', icon: '📊' },
              { label: 'Active Tasks', value: '0', icon: '✅' },
              { label: 'Team Members', value: '1', icon: '👥' },
              { label: 'Storage Used', value: '0%', icon: '💾' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-[#D4A855] mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Logout
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="bg-gray-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
