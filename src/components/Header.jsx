import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiLogOut, FiClock, FiUser, FiBell, FiSettings, FiMenu } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Header = ({ onOpenSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notifications

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of the system",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'rounded-lg',
        cancelButton: 'rounded-lg'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          customClass: {
            popup: 'rounded-xl'
          }
        });
      }
    });
  };

  const getRoleBadgeClass = (role) => {
    const badgeClasses = {
      admin: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
      manager: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      employee: 'bg-gradient-to-r from-green-500 to-green-600 text-white'
    };
    return badgeClasses[role] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
  };

  const getCurrentTimeString = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const getCurrentDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            {/* Hamburger Menu for mobile */}
            <button
              className="md:hidden mr-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
              onClick={onOpenSidebar}
              aria-label="Open sidebar"
            >
              <FiMenu className="w-6 h-6 text-gray-700" />
            </button>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Employee Management
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Professional HR System</p>
            </div>
          </div>

          {/* Center - Current Time */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <FiClock className="w-4 h-4 text-blue-600" />
                <div className="text-center">
                  <div className="text-xs text-blue-600 font-medium">Current Time</div>
                  <div className="text-sm font-mono font-semibold text-gray-900">
                    {getCurrentTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - User Info and Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <FiBell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <FiSettings className="w-5 h-5" />
            </button>

            {/* Role Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getRoleBadgeClass(user?.role)}`}>
              {user?.role?.toUpperCase()}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.department} • {user?.position}</div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FiUser className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Time Display */}
      <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-center space-x-2">
          <FiClock className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-mono font-semibold text-gray-900">
            {getCurrentTimeString()}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;