import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './MyTasks.css';

const MyTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  // Mock data for employee tasks
  const mockTasks = [
    {
      id: 1,
      title: 'Complete Project Documentation',
      description: 'Finish the technical documentation for the new feature',
      priority: 'High',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-01-15',
      assignedBy: 'Manager',
      department: 'IT'
    },
    {
      id: 2,
      title: 'Code Review for Team Project',
      description: 'Review pull requests from the development team',
      priority: 'Medium',
      status: 'Pending',
      progress: 0,
      dueDate: '2024-01-20',
      assignedBy: 'Team Lead',
      department: 'IT'
    },
    {
      id: 3,
      title: 'Bug Fix in Login Module',
      description: 'Fix authentication issues in the login system',
      priority: 'Urgent',
      status: 'Completed',
      progress: 100,
      dueDate: '2024-01-10',
      assignedBy: 'Manager',
      department: 'IT'
    },
    {
      id: 4,
      title: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      priority: 'Low',
      status: 'Not Started',
      progress: 0,
      dueDate: '2024-01-25',
      assignedBy: 'Tech Lead',
      department: 'IT'
    }
  ];

  useEffect(() => {
    setTasks(mockTasks);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'urgent';
      case 'High': return 'high';
      case 'Medium': return 'medium';
      case 'Low': return 'low';
      default: return 'medium';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'completed';
      case 'In Progress': return 'in-progress';
      case 'Pending': return 'pending';
      case 'Not Started': return 'not-started';
      default: return 'pending';
    }
  };

  return (
    <div className="my-tasks-container">
      <div className="tasks-header">
        <h1>My Tasks</h1>
        <p>Manage and track your assigned tasks</p>
      </div>

      <div className="tasks-stats">
        <div className="stat-card">
          <div className="stat-number">{tasks.length}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasks.filter(t => t.status === 'Completed').length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasks.filter(t => t.status === 'In Progress').length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasks.filter(t => t.status === 'Pending').length}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>

      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <div className="task-badges">
                <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`status-badge ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>
            
            <p className="task-description">{task.description}</p>
            
            <div className="task-details">
              <div className="task-info">
                <span><strong>Assigned by:</strong> {task.assignedBy}</span>
                <span><strong>Department:</strong> {task.department}</span>
                <span><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              
              <div className="task-progress">
                <div className="progress-label">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks; 