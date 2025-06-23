import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Projects.css';

const ManagerProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for manager's projects
  const mockProjects = [
    {
      id: 1,
      name: 'HR System Upgrade',
      description: 'Upgrade the HR management system with new features',
      department: 'HR',
      manager: 'John Manager',
      status: 'In Progress',
      priority: 'High',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      progress: 65,
      teamSize: 8,
      budget: 50000,
      avatar: 'HR',
      avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Employee Training Portal',
      description: 'Develop an online training platform for employees',
      department: 'HR',
      manager: 'John Manager',
      status: 'Planning',
      priority: 'Medium',
      startDate: '2024-03-01',
      endDate: '2024-08-15',
      progress: 25,
      teamSize: 5,
      budget: 35000,
      avatar: 'ET',
      avatarColor: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      id: 3,
      name: 'Performance Review System',
      description: 'Implement automated performance review system',
      department: 'HR',
      manager: 'John Manager',
      status: 'Completed',
      priority: 'High',
      startDate: '2023-10-01',
      endDate: '2024-02-28',
      progress: 100,
      teamSize: 6,
      budget: 40000,
      avatar: 'PR',
      avatarColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    }
  ];

  useEffect(() => {
    // Load data immediately without delay
    const filteredProjects = mockProjects.filter(project => project.department === user?.department);
    setProjects(filteredProjects);
    setLoading(false);
  }, [user?.department]);

  const handleProjectStatusUpdate = (projectId, newStatus) => {
    Swal.fire({
      title: 'Update Project Status',
      text: `Change status to ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        setProjects(prev => prev.map(project => 
          project.id === projectId 
            ? { ...project, status: newStatus }
            : project
        ));
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: 'Project status has been updated successfully',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleTeamMeeting = (projectId) => {
    Swal.fire({
      title: 'Schedule Team Meeting',
      text: 'Schedule a meeting for this project?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Schedule',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Meeting Scheduled',
          text: 'Team meeting has been scheduled for tomorrow at 2:00 PM',
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleResourceAllocation = (projectId) => {
    Swal.fire({
      title: 'Resource Allocation',
      text: 'Review and adjust resource allocation?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Review',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Resources Updated',
          text: 'Resource allocation has been reviewed and updated',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'In Progress': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Planning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'On Hold': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="projects-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      {/* Header */}
      <div className="projects-header" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        color: 'white',
        boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
      }}>
        <div className="header-content">
          <h1 className="page-title" style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            My Projects
          </h1>
          <p className="page-subtitle" style={{
            fontSize: '1.125rem',
            opacity: '0.9',
            marginBottom: '1.5rem'
          }}>
            Manage and track your department projects
          </p>
        </div>
        <div className="header-actions">
          <Link to="/add-project" className="action-btn primary" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            fontWeight: '600',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }} onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(-2px)';
          }} onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '20px', height: '20px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Project
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="stat-card" style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px)';
          e.target.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }}>
          <div className="stat-icon" style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '24px', height: '24px', color: 'white'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="stat-info">
            <h3 style={{fontSize: '0.875rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem'}}>Total Projects</h3>
            <p className="stat-value" style={{fontSize: '2rem', fontWeight: '800', color: '#1e293b'}}>{projects.length}</p>
          </div>
        </div>
        <div className="stat-card" style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px)';
          e.target.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }}>
          <div className="stat-icon" style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '24px', height: '24px', color: 'white'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3 style={{fontSize: '0.875rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem'}}>Completed</h3>
            <p className="stat-value" style={{fontSize: '2rem', fontWeight: '800', color: '#1e293b'}}>
              {projects.filter(p => p.status === 'Completed').length}
            </p>
          </div>
        </div>
        <div className="stat-card" style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px)';
          e.target.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }}>
          <div className="stat-icon" style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '24px', height: '24px', color: 'white'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="stat-info">
            <h3 style={{fontSize: '0.875rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem'}}>In Progress</h3>
            <p className="stat-value" style={{fontSize: '2rem', fontWeight: '800', color: '#1e293b'}}>
              {projects.filter(p => p.status === 'In Progress').length}
            </p>
          </div>
        </div>
        <div className="stat-card" style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px)';
          e.target.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }}>
          <div className="stat-icon" style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '24px', height: '24px', color: 'white'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div className="stat-info">
            <h3 style={{fontSize: '0.875rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem'}}>Total Budget</h3>
            <p className="stat-value" style={{fontSize: '2rem', fontWeight: '800', color: '#1e293b'}}>
              ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section" style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div className="search-box" style={{
          background: 'white',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          minWidth: '300px'
        }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '20px', height: '20px', color: '#64748b'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{
              border: 'none',
              outline: 'none',
              flex: '1',
              fontSize: '0.95rem',
              color: '#1e293b'
            }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="status-filter"
          style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.95rem',
            color: '#1e293b',
            cursor: 'pointer',
            minWidth: '150px'
          }}
        >
          <option value="all">All Status</option>
          <option value="planning">Planning</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on hold">On Hold</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card" style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
          }}>
            <div className="project-header" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div className={`project-avatar ${project.avatarColor}`} style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                {project.avatar}
              </div>
              <div className="project-info">
                <h3 className="project-name" style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '0.25rem'
                }}>{project.name}</h3>
                <p className="project-description" style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  lineHeight: '1.4'
                }}>{project.description}</p>
              </div>
            </div>

            <div className="project-stats" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div className="stat-item">
                <span className="stat-label" style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  fontWeight: '500'
                }}>Progress</span>
                <div className="progress-bar" style={{
                  width: '100%',
                  height: '8px',
                  background: '#e2e8f0',
                  borderRadius: '4px',
                  marginTop: '0.25rem',
                  overflow: 'hidden'
                }}>
                  <div className="progress-fill" style={{
                    width: `${project.progress}%`,
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
                <span className="progress-text" style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>{project.progress}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label" style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  fontWeight: '500'
                }}>Team Size</span>
                <span className="stat-value" style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#1e293b'
                }}>{project.teamSize}</span>
              </div>
            </div>

            <div className="project-badges" style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <span className={`status-badge ${getStatusColor(project.status)}`} style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: '1px solid'
              }}>
                {project.status}
              </span>
              <span className={`priority-badge ${getPriorityColor(project.priority)}`} style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: '1px solid'
              }}>
                {project.priority}
              </span>
            </div>

            <div className="project-details" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}>
              <div>
                <span style={{color: '#64748b'}}>Start Date:</span>
                <span style={{color: '#1e293b', fontWeight: '500', marginLeft: '0.5rem'}}>
                  {new Date(project.startDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span style={{color: '#64748b'}}>End Date:</span>
                <span style={{color: '#1e293b', fontWeight: '500', marginLeft: '0.5rem'}}>
                  {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span style={{color: '#64748b'}}>Budget:</span>
                <span style={{color: '#1e293b', fontWeight: '500', marginLeft: '0.5rem'}}>
                  ${project.budget.toLocaleString()}
                </span>
              </div>
              <div>
                <span style={{color: '#64748b'}}>Manager:</span>
                <span style={{color: '#1e293b', fontWeight: '500', marginLeft: '0.5rem'}}>
                  {project.manager}
                </span>
              </div>
            </div>

            <div className="project-actions" style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => handleProjectStatusUpdate(project.id, 'In Progress')}
                className="action-btn small"
                title="Update Status"
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }} onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '16px', height: '16px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => handleTeamMeeting(project.id)}
                className="action-btn small"
                title="Team Meeting"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
                }} onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '16px', height: '16px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </button>
              <button
                onClick={() => handleResourceAllocation(project.id)}
                className="action-btn small"
                title="Resource Allocation"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)';
                }} onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '16px', height: '16px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              <Link
                to={`/project/${project.id}`}
                className="action-btn small"
                title="View Details"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)';
                }} onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '16px', height: '16px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-results" style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{
            width: '64px',
            height: '64px',
            color: '#64748b',
            marginBottom: '1rem'
          }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>No projects found</h3>
          <p style={{
            color: '#64748b'
          }}>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ManagerProjects; 