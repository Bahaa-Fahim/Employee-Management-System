import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

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
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
        Swal.fire(
          'Logged out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    });
  };

  const getRoleBadgeClass = (role) => {
    const badgeClasses = {
      admin: 'role-badge admin',
      manager: 'role-badge manager',
      employee: 'role-badge employee'
    };
    return badgeClasses[role] || 'role-badge';
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
    <header className="header-container">
      <div className="header-content">
        {/* Logo and Title */}
        <div className="logo-section">
          <div className="logo-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="logo-title">Employee Management</h1>
        </div>

        {/* User Info and Actions */}
        <div className="user-section">
          {/* Current Time */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '0.5rem 1rem',
            borderRadius: '0.75rem',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '600',
            textAlign: 'center',
            minWidth: '100px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: '0.125rem' }}>
              Current Time
            </div>
            <div style={{ fontFamily: 'monospace' }}>{getCurrentTimeString()}</div>
          </div>

          {/* User Info */}
          <div className="user-info">
            <div className="user-details">
              <p className="user-name">{user?.name}</p>
              <p className="user-position">{user?.department} • {user?.position}</p>
            </div>
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Role Badge */}
          <div className={getRoleBadgeClass(user?.role)}>
            {user?.role?.toUpperCase()}
          </div>

          {/* Logout Button */}
          <button onClick={handleLogout} className="logout-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;