import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash2, FiMail, FiPhone, FiMapPin, FiCalendar, FiDollarSign, FiUsers, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';
import { employeesAPI } from '../services/api';
import Swal from 'sweetalert2';
import './EmployeeDetails.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      setLoading(true);
      const response = await employeesAPI.getById(id);
      setEmployee(response.data);
    } catch (error) {
      console.error('Failed to load employee:', error);
      Swal.fire('Error', 'Failed to load employee details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await employeesAPI.delete(id);
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
        navigate('/employees');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete employee', 'error');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'on-leave': return 'status-on-leave';
      default: return 'status-inactive';
    }
  };

  const getPerformanceColor = (rating) => {
    if (rating >= 4.5) return 'performance-excellent';
    if (rating >= 3.5) return 'performance-good';
    return 'performance-average';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Not Found</h2>
          <Link to="/employees" className="text-blue-600 hover:text-blue-800">
            Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-details-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/employees')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span>Back to Employees</span>
              </button>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/employees/edit/${id}`}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiEdit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Employee Header */}
        <div className="employee-header">
          <div className="employee-info">
            <div className="employee-avatar">
              {employee.firstName?.charAt(0)}{employee.lastName?.charAt(0)}
            </div>
            <div className="employee-details">
              <div className="flex items-center">
                <h1 className="employee-name">
                  {employee.firstName} {employee.lastName}
                </h1>
                <span className={`employee-status ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
              </div>
              <div className="employee-contact">
                <div className="contact-item">
                  <FiMail />
                  <span>{employee.email}</span>
                </div>
                <div className="contact-item">
                  <FiPhone />
                  <span>{employee.phone}</span>
                </div>
                <div className="contact-item">
                  <FiUsers />
                  <span>{employee.department}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-header">
            <nav className="tabs-nav">
              {[
                { id: 'overview', label: 'Overview', icon: FiUsers },
                { id: 'performance', label: 'Performance', icon: FiTrendingUp },
                { id: 'attendance', label: 'Attendance', icon: FiClock },
                { id: 'projects', label: 'Projects', icon: FiAward },
                { id: 'personal', label: 'Personal Info', icon: FiMapPin }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <tab.icon />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="tabs-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon bg-blue-100">
                      <FiDollarSign className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="stat-card-label">Salary</p>
                      <p className="stat-card-value">
                        ${employee.salary?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon bg-green-100">
                      <FiCalendar className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="stat-card-label">Hire Date</p>
                      <p className="stat-card-value">
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon bg-purple-100">
                      <FiTrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="stat-card-label">Performance Rating</p>
                      <p className={`stat-card-value ${getPerformanceColor(employee.performance?.rating)}`}>
                        {employee.performance?.rating || 'N/A'} / 5.0
                      </p>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon bg-yellow-100">
                      <FiUsers className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="stat-card-label">Position</p>
                      <p className="stat-card-value">{employee.position}</p>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon bg-red-100">
                      <FiClock className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="stat-card-label">Present Days</p>
                      <p className="stat-card-value">
                        {employee.attendance?.presentDays || 0} days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon bg-indigo-100">
                      <FiAward className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="stat-card-label">Manager</p>
                      <p className="stat-card-value">{employee.manager || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="performance-section">
                <h3 className="performance-header">Performance Overview</h3>
                <div className="performance-grid">
                  <div className="performance-item">
                    <span className="performance-label">Current Rating</span>
                    <span className={`performance-value ${getPerformanceColor(employee.performance?.rating)}`}>
                      {employee.performance?.rating || 'N/A'} / 5.0
                    </span>
                  </div>
                  <div className="performance-item">
                    <span className="performance-label">Last Review</span>
                    <span className="performance-value">
                      {employee.performance?.lastReview ? new Date(employee.performance.lastReview).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="performance-item">
                    <span className="performance-label">Next Review</span>
                    <span className="performance-value">
                      {employee.performance?.nextReview ? new Date(employee.performance.nextReview).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
                {employee.performance?.comments && (
                  <div className="mt-4">
                    <p className="performance-label">Comments</p>
                    <p className="text-gray-900 mt-1">{employee.performance.comments}</p>
                  </div>
                )}
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div className="attendance-section">
                <h3 className="attendance-header">Attendance Summary</h3>
                <div className="attendance-grid">
                  <div className="attendance-item">
                    <p className="attendance-value text-green-600">{employee.attendance?.presentDays || 0}</p>
                    <p className="attendance-label">Present Days</p>
                  </div>
                  <div className="attendance-item">
                    <p className="attendance-value text-red-600">{employee.attendance?.absentDays || 0}</p>
                    <p className="attendance-label">Absent Days</p>
                  </div>
                  <div className="attendance-item">
                    <p className="attendance-value text-yellow-600">{employee.attendance?.lateDays || 0}</p>
                    <p className="attendance-label">Late Days</p>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="performance-section">
                <h3 className="performance-header">Assigned Projects</h3>
                <p className="text-gray-600">No projects assigned yet.</p>
              </div>
            )}

            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="performance-section">
                <h3 className="performance-header">Personal Information</h3>
                <div className="performance-grid">
                  <div className="performance-item">
                    <span className="performance-label">Address</span>
                    <span className="performance-value">{employee.address || 'Not provided'}</span>
                  </div>
                  <div className="performance-item">
                    <span className="performance-label">Emergency Contact</span>
                    <span className="performance-value">
                      {employee.emergencyContact?.name ? 
                        `${employee.emergencyContact.name} (${employee.emergencyContact.relationship})` : 
                        'Not provided'
                      }
                    </span>
                  </div>
                  {employee.emergencyContact?.phone && (
                    <div className="performance-item">
                      <span className="performance-label">Emergency Phone</span>
                      <span className="performance-value">{employee.emergencyContact.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails; 