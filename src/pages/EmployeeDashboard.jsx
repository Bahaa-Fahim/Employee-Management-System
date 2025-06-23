import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  // Mock data for employee dashboard
  const mockTasks = [
    {
      id: 1,
      title: 'Complete Project Documentation',
      description: 'Finish the technical documentation for the new feature',
      priority: 'High',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-01-15',
      assignedBy: 'Manager'
    },
    {
      id: 2,
      title: 'Code Review for Team Project',
      description: 'Review pull requests from the development team',
      priority: 'Medium',
      status: 'Pending',
      progress: 0,
      dueDate: '2024-01-20',
      assignedBy: 'Team Lead'
    },
    {
      id: 3,
      title: 'Bug Fix in Login Module',
      description: 'Fix authentication issues in the login system',
      priority: 'Urgent',
      status: 'Completed',
      progress: 100,
      dueDate: '2024-01-10',
      assignedBy: 'Manager'
    },
    {
      id: 4,
      title: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      priority: 'Low',
      status: 'Not Started',
      progress: 0,
      dueDate: '2024-01-25',
      assignedBy: 'Tech Lead'
    }
  ];

  const mockStats = {
    totalTasks: 12,
    completedTasks: 8,
    pendingTasks: 3,
    overdueTasks: 1,
    performance: 85,
    attendance: 95,
    projects: 4
  };

  useEffect(() => {
    setTasks(mockTasks);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Not Started': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="employee-dashboard">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1 className="welcome-title">Welcome back, {user?.name || 'Employee'}!</h1>
        <p className="welcome-subtitle">Here's an overview of your tasks, performance, and recent activities.</p>
      </section>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/tasks" className="quick-action-btn">
          <svg className="quick-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          My Tasks
        </Link>
        <Link to="/profile" className="quick-action-btn">
          <svg className="quick-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile
        </Link>
        <Link to="/leaves" className="quick-action-btn">
          <svg className="quick-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          My Leaves
        </Link>
        <Link to="/reports" className="quick-action-btn">
          <svg className="quick-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Reports
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div className="stat-name">Total Tasks</div>
          <div className="stat-value">{mockStats.totalTasks}</div>
          <div className="stat-change increase">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +{mockStats.completedTasks} Completed
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-name">Performance</div>
          <div className="stat-value">{mockStats.performance}%</div>
          <div className="stat-change increase">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Excellent
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="stat-name">Attendance</div>
          <div className="stat-value">{mockStats.attendance}%</div>
          <div className="stat-change increase">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            On Track
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="stat-name">Active Projects</div>
          <div className="stat-value">{mockStats.projects}</div>
          <div className="stat-change neutral">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            In Progress
          </div>
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="activities-section">
        <div className="activities-header">
          <h2 className="activities-title">Recent Tasks</h2>
          <Link to="/tasks" className="view-all-link">View All Tasks</Link>
        </div>
        <ul className="activities-list">
          {tasks.slice(0, 4).map(task => (
            <li className="activity-item" key={task.id}>
              <div className="activity-content">
                <div className="activity-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="activity-details">
                  <div className="activity-message">
                    <span className="activity-user">{task.assignedBy}</span> assigned you <b>{task.title}</b>
                  </div>
                  <div className="activity-meta">
                    <span className="activity-time">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span>Progress: {task.progress}%</span>
                    <div className="task-status-badges">
                      <span className={`priority-badge ${getPriorityColor(task.priority).replace('bg-', '')}`}>
                        {task.priority}
                      </span>
                      <span className={`status-badge ${getStatusColor(task.status).replace('bg-', '')}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDashboard; 