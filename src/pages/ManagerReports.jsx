import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import './Reports.css';

const ManagerReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Mock data for manager's reports
  const mockReports = [
    {
      id: 1,
      title: 'Team Performance Report',
      type: 'Performance',
      department: 'HR',
      generatedBy: 'John Manager',
      generatedDate: '2024-03-15',
      status: 'Completed',
      description: 'Comprehensive analysis of team performance metrics and KPIs',
      data: {
        totalEmployees: 8,
        averagePerformance: 85,
        topPerformers: 3,
        improvementAreas: 2
      },
      avatar: 'TP',
      avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Project Progress Report',
      type: 'Project',
      department: 'HR',
      generatedBy: 'John Manager',
      generatedDate: '2024-03-14',
      status: 'Completed',
      description: 'Detailed progress tracking for all active projects in the department',
      data: {
        totalProjects: 3,
        completedProjects: 1,
        inProgressProjects: 1,
        plannedProjects: 1
      },
      avatar: 'PP',
      avatarColor: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Resource Utilization Report',
      type: 'Resource',
      department: 'HR',
      generatedBy: 'John Manager',
      generatedDate: '2024-03-13',
      status: 'In Progress',
      description: 'Analysis of resource allocation and utilization across projects',
      data: {
        totalResources: 15,
        allocatedResources: 12,
        utilizationRate: 80,
        efficiencyScore: 85
      },
      avatar: 'RU',
      avatarColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Budget Analysis Report',
      type: 'Financial',
      department: 'HR',
      generatedBy: 'John Manager',
      generatedDate: '2024-03-12',
      status: 'Completed',
      description: 'Financial analysis and budget tracking for department projects',
      data: {
        totalBudget: 125000,
        spentAmount: 85000,
        remainingBudget: 40000,
        budgetUtilization: 68
      },
      avatar: 'BA',
      avatarColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
    }
  ];

  useEffect(() => {
    // Load data immediately without delay
    const filteredReports = mockReports.filter(report => report.department === user?.department);
    setReports(filteredReports);
    setLoading(false);
  }, [user?.department]);

  const handleGenerateReport = (reportType) => {
    Swal.fire({
      title: 'Generate Report',
      text: `Generate a new ${reportType} report?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Generate',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Report Generated',
          text: `${reportType} report has been generated successfully`,
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleExportReport = (reportId) => {
    Swal.fire({
      title: 'Export Report',
      text: 'Export this report to PDF?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Export',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Report Exported',
          text: 'Report has been exported to PDF successfully',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleShareReport = (reportId) => {
    Swal.fire({
      title: 'Share Report',
      text: 'Share this report with stakeholders?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Share',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Report Shared',
          text: 'Report has been shared with stakeholders',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const filteredReports = reports.filter(report => 
    filterType === 'all' || report.type.toLowerCase() === filterType.toLowerCase()
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'In Progress': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Failed': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Performance': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Project': return 'text-green-600 bg-green-100 border-green-200';
      case 'Resource': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'Financial': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="reports-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-container" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      {/* Header */}
      <div className="reports-header" style={{
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
            Reports & Analytics
          </h1>
          <p className="page-subtitle" style={{
            fontSize: '1.125rem',
            opacity: '0.9',
            marginBottom: '1.5rem'
          }}>
            Generate and manage department reports and analytics
          </p>
        </div>
        <div className="header-actions" style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button onClick={() => handleGenerateReport('Performance')} className="action-btn primary" style={{
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
            gap: '0.5rem'
          }} onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(-2px)';
          }} onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '20px', height: '20px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Performance Report
          </button>
          <button onClick={() => handleGenerateReport('Project')} className="action-btn primary" style={{
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
            gap: '0.5rem'
          }} onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(-2px)';
          }} onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '20px', height: '20px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Project Report
          </button>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3 style={{fontSize: '0.875rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem'}}>Total Reports</h3>
            <p className="stat-value" style={{fontSize: '2rem', fontWeight: '800', color: '#1e293b'}}>{reports.length}</p>
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
              {reports.filter(r => r.status === 'Completed').length}
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
              {reports.filter(r => r.status === 'In Progress').length}
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
            <h3 style={{fontSize: '0.875rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem'}}>This Month</h3>
            <p className="stat-value" style={{fontSize: '2rem', fontWeight: '800', color: '#1e293b'}}>
              {reports.filter(r => new Date(r.generatedDate).getMonth() === new Date().getMonth()).length}
            </p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="filters-section" style={{
        marginBottom: '2rem'
      }}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="type-filter"
          style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.95rem',
            color: '#1e293b',
            cursor: 'pointer',
            minWidth: '200px'
          }}
        >
          <option value="all">All Report Types</option>
          <option value="performance">Performance</option>
          <option value="project">Project</option>
          <option value="resource">Resource</option>
          <option value="financial">Financial</option>
        </select>
      </div>

      {/* Reports Grid */}
      <div className="reports-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredReports.map((report) => (
          <div key={report.id} className="report-card" style={{
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
            <div className="report-header" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div className={`report-avatar ${report.avatarColor}`} style={{
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
                {report.avatar}
              </div>
              <div className="report-info">
                <h3 className="report-title" style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '0.25rem'
                }}>{report.title}</h3>
                <p className="report-description" style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  lineHeight: '1.4'
                }}>{report.description}</p>
              </div>
            </div>

            <div className="report-badges" style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <span className={`type-badge ${getTypeColor(report.type)}`} style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: '1px solid'
              }}>
                {report.type}
              </span>
              <span className={`status-badge ${getStatusColor(report.status)}`} style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: '1px solid'
              }}>
                {report.status}
              </span>
            </div>

            <div className="report-data" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              {Object.entries(report.data).map(([key, value]) => (
                <div key={key} className="data-item">
                  <span className="data-label" style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="data-value" style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#1e293b',
                    display: 'block'
                  }}>
                    {typeof value === 'number' && key.includes('Rate') || key.includes('Score') || key.includes('Performance') 
                      ? `${value}%` 
                      : typeof value === 'number' && key.includes('Budget') || key.includes('Amount')
                      ? `$${value.toLocaleString()}`
                      : value}
                  </span>
                </div>
              ))}
            </div>

            <div className="report-details" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}>
              <div>
                <span style={{color: '#64748b'}}>Generated By:</span>
                <span style={{color: '#1e293b', fontWeight: '500', marginLeft: '0.5rem'}}>
                  {report.generatedBy}
                </span>
              </div>
              <div>
                <span style={{color: '#64748b'}}>Date:</span>
                <span style={{color: '#1e293b', fontWeight: '500', marginLeft: '0.5rem'}}>
                  {new Date(report.generatedDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="report-actions" style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => handleExportReport(report.id)}
                className="action-btn small"
                title="Export Report"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button
                onClick={() => handleShareReport(report.id)}
                className="action-btn small"
                title="Share Report"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedReport(report)}
                className="action-btn small"
                title="View Details"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>No reports found</h3>
          <p style={{
            color: '#64748b'
          }}>Try adjusting your filter criteria or generate a new report</p>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setSelectedReport(null)}>
          <div className="modal-content" style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b'
              }}>{selectedReport.title}</h2>
              <button onClick={() => setSelectedReport(null)} style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#64748b'
              }}>×</button>
            </div>
            <div className="modal-body">
              <p style={{
                color: '#64748b',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>{selectedReport.description}</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {Object.entries(selectedReport.data).map(([key, value]) => (
                  <div key={key} style={{
                    background: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '8px'
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span style={{
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      color: '#1e293b',
                      display: 'block',
                      marginTop: '0.25rem'
                    }}>
                      {typeof value === 'number' && key.includes('Rate') || key.includes('Score') || key.includes('Performance') 
                        ? `${value}%` 
                        : typeof value === 'number' && key.includes('Budget') || key.includes('Amount')
                        ? `$${value.toLocaleString()}`
                        : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerReports; 