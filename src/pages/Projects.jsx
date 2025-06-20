import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Projects.css';

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjects();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Calculate statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const averageProgress = projects.reduce((sum, p) => sum + p.progress, 0) / projects.length;

  const handleAddProject = () => {
    navigate('/add-project');
  };

  const handleEditProject = (project) => {
    navigate(`/edit-project/${project.id}`);
  };

  const handleDeleteProject = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Project has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#059669';
      case 'in-progress': return '#3b82f6';
      case 'planning': return '#f59e0b';
      case 'on-hold': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#059669';
      default: return '#6b7280';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#059669';
    if (progress >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="projects-container">
      {/* Header */}
      <div className="projects-header">
        <h1 className="projects-title">Projects Management</h1>
        <button className="add-project-btn" onClick={handleAddProject}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-section">
          <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search projects by name, description, or manager..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-buttons">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
          
          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">{totalProjects}</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{completedProjects}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{inProgressProjects}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totalBudget.toLocaleString()}</div>
          <div className="stat-label">Total Budget</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Math.round(averageProgress)}%</div>
          <div className="stat-label">Avg Progress</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="project-title-section">
                <h3 className="project-title">{project.name}</h3>
                <div className="project-badges">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: `${getStatusColor(project.status)}20`, color: getStatusColor(project.status) }}
                  >
                    {project.status.replace('-', ' ')}
                  </span>
                  <span 
                    className="priority-badge" 
                    style={{ backgroundColor: `${getPriorityColor(project.priority)}20`, color: getPriorityColor(project.priority) }}
                  >
                    {project.priority}
                  </span>
                </div>
              </div>
              <div className="project-actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEditProject(project)}
                  title="Edit Project"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteProject(project.id)}
                  title="Delete Project"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-progress">
              <div className="progress-header">
                <span>Progress</span>
                <span style={{ color: getProgressColor(project.progress) }}>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${project.progress}%`, 
                    backgroundColor: getProgressColor(project.progress) 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="project-details">
              <div className="detail-item">
                <span className="detail-label">Manager:</span>
                <span className="detail-value">{project.manager}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Budget:</span>
                <span className="detail-value">${project.budget.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Team:</span>
                <span className="detail-value">{project.team.length} members</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Timeline:</span>
                <span className="detail-value">
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="project-team">
              <span className="team-label">Team Members:</span>
              <div className="team-avatars">
                {project.team.slice(0, 3).map((member, index) => (
                  <div key={index} className="team-avatar" title={member}>
                    {member.charAt(0).toUpperCase()}
                  </div>
                ))}
                {project.team.length > 3 && (
                  <div className="team-avatar more-members">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 