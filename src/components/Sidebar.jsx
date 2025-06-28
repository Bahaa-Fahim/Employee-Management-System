import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';
import { FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, hasPermission } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: user?.role === 'manager' ? '/manager-dashboard' : 
            user?.role === 'employee' ? '/employee-dashboard' : '/dashboard',
      icon: (
        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
        </svg>
      ),
      roles: ['admin', 'manager', 'employee']
    },
    {
      name: 'My Tasks',
      href: '/tasks',
      icon: (
        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      roles: ['employee']
    },
    {
      name: 'My Leaves',
      href: '/leaves',
      icon: (
        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      roles: ['employee']
    },
    {
      name: 'Employees',
      href: user?.role === 'manager' ? '/manager-employees' : '/employees',
      icon: (
        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      roles: ['admin', 'manager']
    },
    {
      name: 'Projects',
      href: user?.role === 'manager' ? '/manager-projects' : '/projects',
      icon: (
        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      roles: ['admin', 'manager']
    },
    {
      name: 'Departments',
      href: '/departments',
      icon: (
        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      roles: ['admin']
    },
    {
      name: 'Reports',
      href: user?.role === 'manager' ? '/manager-reports' : '/reports',
      icon: (
        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      roles: ['admin', 'manager']
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: (
        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      roles: ['admin', 'manager', 'employee']
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: (
        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      roles: ['admin']
    }
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-[9998] bg-black bg-opacity-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      ></div>
      {/* Sidebar */}
      <div
        className={`sidebar-container
          fixed top-0 left-0 h-full w-64 z-[9999] transition-transform duration-300
          ${isOpen ? 'block translate-x-0' : 'hidden -translate-x-full'}
          md:static md:w-[280px] md:block md:translate-x-0
        `}
        style={{ background: 'white' }}
      >
        {/* Close button for mobile */}
        <div className="flex md:hidden justify-end p-3">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none" aria-label="Close sidebar">
            <FiX className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="sidebar-content">
          {/* Navigation */}
          <nav className="navigation-section">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
              >
                {item.icon}
                <span className="nav-text">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Info */}
          <div className="user-section">
            <div className="user-card">
              <div className="user-avatar">
                <span className="user-avatar-text">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="user-info">
                <p className="user-name">{user?.name}</p>
                <p className="user-role">
                  {user?.role}
                  <span className={`role-indicator ${user?.role}`}></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 