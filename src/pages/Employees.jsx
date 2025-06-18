import React, { useState } from 'react';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ahmed Mohamed',
      email: 'ahmed.mohamed@company.com',
      department: 'IT',
      position: 'Software Developer',
      salary: 45000,
      status: 'active',
      hireDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Fatima Ali',
      email: 'fatima.ali@company.com',
      department: 'HR',
      position: 'HR Manager',
      salary: 55000,
      status: 'active',
      hireDate: '2022-08-20'
    },
    {
      id: 3,
      name: 'Mohamed Ahmed',
      email: 'mohamed.ahmed@company.com',
      department: 'Marketing',
      position: 'Marketing Specialist',
      salary: 40000,
      status: 'on-leave',
      hireDate: '2023-03-10'
    },
    {
      id: 4,
      name: 'Aisha Hassan',
      email: 'aisha.hassan@company.com',
      department: 'Finance',
      position: 'Financial Analyst',
      salary: 48000,
      status: 'active',
      hireDate: '2022-11-05'
    },
    {
      id: 5,
      name: 'Omar Khalil',
      email: 'omar.khalil@company.com',
      department: 'IT',
      position: 'System Administrator',
      salary: 52000,
      status: 'inactive',
      hireDate: '2021-06-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    salary: '',
    status: 'active'
  });

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const onLeaveEmployees = employees.filter(emp => emp.status === 'on-leave').length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      department: '',
      position: '',
      salary: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      salary: employee.salary.toString(),
      status: employee.status
    });
    setShowModal(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id
          ? { ...emp, ...formData, salary: parseInt(formData.salary) }
          : emp
      ));
    } else {
      // Add new employee
      const newEmployee = {
        id: Date.now(),
        ...formData,
        salary: parseInt(formData.salary),
        hireDate: new Date().toISOString().split('T')[0]
      };
      setEmployees([...employees, newEmployee]);
    }
    
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="employees-container">
      {/* Header */}
      <div className="employees-header">
        <h1 className="employees-title">Employees Management</h1>
        <button className="add-employee-btn" onClick={handleAddEmployee}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Employee
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
          placeholder="Search employees by name, email, department, or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Statistics */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">{totalEmployees}</div>
          <div className="stat-label">Total Employees</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{activeEmployees}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{onLeaveEmployees}</div>
          <div className="stat-label">On Leave</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totalSalary.toLocaleString()}</div>
          <div className="stat-label">Total Salary</div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Employee List</h2>
        </div>
        <div className="table-wrapper">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Salary</th>
                <th>Hire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-info">
                      <div className="employee-avatar">
                        {getInitials(employee.name)}
                      </div>
                      <div className="employee-details">
                        <h4>{employee.name}</h4>
                        <p>{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <span className={`status-badge ${employee.status}`}>
                      {employee.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="salary-amount">${employee.salary.toLocaleString()}</td>
                  <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                  <td>
                    <div className="actions-buttons">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditEmployee(employee)}
                        title="Edit Employee"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteEmployee(employee.id)}
                        title="Delete Employee"
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
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
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
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  name="position"
                  className="form-input"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  name="salary"
                  className="form-input"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
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
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees; 