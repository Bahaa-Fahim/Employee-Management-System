import { useState } from 'react';
import Swal from 'sweetalert2';
import './Departments.css';
import { Link } from 'react-router-dom';

const Departments = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Information Technology',
      code: 'IT',
      manager: 'John Smith',
      employeeCount: 45,
      budget: 1200000,
      status: 'active',
      description: 'Handles all technology infrastructure and software development',
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      name: 'Human Resources',
      code: 'HR',
      manager: 'Sarah Johnson',
      employeeCount: 25,
      budget: 800000,
      status: 'active',
      description: 'Manages employee relations, recruitment, and organizational development',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      id: 3,
      name: 'Marketing',
      code: 'MKT',
      manager: 'Mike Wilson',
      employeeCount: 30,
      budget: 950000,
      status: 'active',
      description: 'Handles brand management, advertising, and market research',
      color: 'bg-gradient-to-br from-purple-500 to-pink-600'
    },
    {
      id: 4,
      name: 'Finance',
      code: 'FIN',
      manager: 'Emily Brown',
      employeeCount: 20,
      budget: 700000,
      status: 'active',
      description: 'Manages financial planning, accounting, and budget control',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600'
    },
    {
      id: 5,
      name: 'Sales',
      code: 'SLS',
      manager: 'David Lee',
      employeeCount: 35,
      budget: 1100000,
      status: 'active',
      description: 'Handles customer acquisition, sales operations, and revenue generation',
      color: 'bg-gradient-to-br from-red-500 to-rose-600'
    },
    {
      id: 6,
      name: 'Operations',
      code: 'OPS',
      manager: 'Lisa Davis',
      employeeCount: 1,
      budget: 500000,
      status: 'inactive',
      description: 'Manages day-to-day operations and process optimization',
      color: 'bg-gradient-to-br from-gray-500 to-slate-600'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    manager: '',
    budget: '',
    description: ''
  });

  // Calculate statistics
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter(dept => dept.status === 'active').length;
  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);

  const handleAddDepartment = () => {
    if (!formData.name || !formData.code || !formData.manager) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    const newDepartment = {
      id: Date.now(),
      ...formData,
      employeeCount: 0,
      status: 'active',
      budget: parseInt(formData.budget) || 0,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    };

    setDepartments([...departments, newDepartment]);
    setFormData({ name: '', code: '', manager: '', budget: '', description: '' });
    setShowModal(false);
    
    Swal.fire('Success', 'Department added successfully', 'success');
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      code: department.code,
      manager: department.manager,
      budget: department.budget.toString(),
      description: department.description
    });
    setShowModal(true);
  };

  const handleUpdateDepartment = () => {
    const updatedDepartments = departments.map(dept => 
      dept.id === editingDepartment.id 
        ? { ...dept, ...formData, budget: parseInt(formData.budget) || 0 }
        : dept
    );
    
    setDepartments(updatedDepartments);
    setEditingDepartment(null);
    setFormData({ name: '', code: '', manager: '', budget: '', description: '' });
    setShowModal(false);
    
    Swal.fire('Success', 'Department updated successfully', 'success');
  };

  const handleDeleteDepartment = (id) => {
    const department = departments.find(dept => dept.id === id);
    if (department.employeeCount > 0) {
      Swal.fire('Error', 'Cannot delete department with active employees', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setDepartments(departments.filter(dept => dept.id !== id));
        Swal.fire('Deleted!', 'Department has been deleted.', 'success');
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDepartment) {
      handleUpdateDepartment();
    } else {
      handleAddDepartment();
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="departments-container">
      {/* Header */}
      <div className="departments-header">
        <div>
          <h1 className="departments-title">Departments Management</h1>
          <p className="departments-subtitle">Manage your organization's departments and their resources</p>
        </div>
        <button className="add-department-btn" onClick={() => {
          setEditingDepartment(null);
          setFormData({ name: '', code: '', manager: '', budget: '', description: '' });
          setShowModal(true);
        }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Department
        </button>
      </div>

      {/* Search */}
      <div className="search-section">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search departments by name, code, or manager..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Statistics */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="stat-value">{totalDepartments}</div>
          <div className="stat-label">Total Departments</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-value">{activeDepartments}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="stat-value">{totalEmployees}</div>
          <div className="stat-label">Total Employees</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div className="stat-value">${totalBudget.toLocaleString()}</div>
          <div className="stat-label">Total Budget</div>
        </div>
      </div>

      {/* Departments Table */}
      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Department List</h2>
        </div>
        <div className="table-wrapper">
          <table className="departments-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Manager</th>
                <th>Employees</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map(department => (
                <tr key={department.id} className="department-row">
                  <td>
                    <div className="department-info">
                      <div className={`department-icon ${department.color}`}>
                        {getInitials(department.name)}
                      </div>
                      <div className="department-details">
                        <h4>{department.name}</h4>
                        <p>{department.code} • {department.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="manager-info">
                      <span className="manager-name">{department.manager}</span>
                    </div>
                  </td>
                  <td className="employee-count">
                    <div className="employee-badge">
                      <span className="employee-number">{department.employeeCount}</span>
                      <span className="employee-label">employees</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${department.status}`}>
                      {department.status}
                    </span>
                  </td>
                  <td className="budget-amount">
                    <div className="budget-info">
                      <span className="budget-value">${department.budget.toLocaleString()}</span>
                    </div>
                  </td>
                  <td>
                    <div className="actions-buttons">
                      <Link
                        to={`/departments/${department.id}`}
                        className="action-btn view-btn"
                        title="View Department Details"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditDepartment(department)}
                        title="Edit Department"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteDepartment(department.id)}
                        title="Delete Department"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingDepartment ? 'Edit Department' : 'Add New Department'}
              </h2>
              <button 
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Department Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter department name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Department Code *</label>
                <input
                  type="text"
                  name="code"
                  className="form-input"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="e.g., IT, HR, FIN"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Manager *</label>
                <input
                  type="text"
                  name="manager"
                  className="form-input"
                  value={formData.manager}
                  onChange={handleInputChange}
                  placeholder="Enter manager name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Budget</label>
                <input
                  type="number"
                  name="budget"
                  className="form-input"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Enter budget amount"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-input"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter department description"
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingDepartment ? 'Update Department' : 'Add Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments; 