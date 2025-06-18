import { useState } from 'react';
import Swal from 'sweetalert2';
import './Departments.css';

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
      description: 'Handles all technology infrastructure and software development'
    },
    {
      id: 2,
      name: 'Human Resources',
      code: 'HR',
      manager: 'Sarah Johnson',
      employeeCount: 25,
      budget: 800000,
      status: 'active',
      description: 'Manages employee relations, recruitment, and organizational development'
    },
    {
      id: 3,
      name: 'Marketing',
      code: 'MKT',
      manager: 'Mike Wilson',
      employeeCount: 30,
      budget: 950000,
      status: 'active',
      description: 'Handles brand management, advertising, and market research'
    },
    {
      id: 4,
      name: 'Finance',
      code: 'FIN',
      manager: 'Emily Brown',
      employeeCount: 20,
      budget: 700000,
      status: 'active',
      description: 'Manages financial planning, accounting, and budget control'
    },
    {
      id: 5,
      name: 'Sales',
      code: 'SLS',
      manager: 'David Lee',
      employeeCount: 35,
      budget: 1100000,
      status: 'active',
      description: 'Handles customer acquisition, sales operations, and revenue generation'
    },
    {
      id: 6,
      name: 'Operations',
      code: 'OPS',
      manager: 'Lisa Davis',
      employeeCount: 1,
      budget: 500000,
      status: 'inactive',
      description: 'Manages day-to-day operations and process optimization'
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
      budget: parseInt(formData.budget) || 0
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
        <h1 className="departments-title">Departments Management</h1>
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
          <div className="stat-value">{totalDepartments}</div>
          <div className="stat-label">Total Departments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{activeDepartments}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalEmployees}</div>
          <div className="stat-label">Total Employees</div>
        </div>
        <div className="stat-card">
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
                <tr key={department.id}>
                  <td>
                    <div className="department-info">
                      <div className="department-icon">
                        {getInitials(department.name)}
                      </div>
                      <div className="department-details">
                        <h4>{department.name}</h4>
                        <p>{department.code} • {department.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>{department.manager}</td>
                  <td className="employee-count">{department.employeeCount}</td>
                  <td>
                    <span className={`status-badge ${department.status}`}>
                      {department.status}
                    </span>
                  </td>
                  <td className="budget-amount">${department.budget.toLocaleString()}</td>
                  <td>
                    <div className="actions-buttons">
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
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Department Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Department Code</label>
                <input
                  type="text"
                  name="code"
                  className="form-input"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Manager</label>
                <input
                  type="text"
                  name="manager"
                  className="form-input"
                  value={formData.manager}
                  onChange={handleInputChange}
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