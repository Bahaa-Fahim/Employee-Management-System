import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './Employees.css';

const Employees = () => {
  const { addMockUser } = useAuth();
  
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ahmed Mohamed',
      email: 'ahmed.mohamed@company.com',
      department: 'IT',
      position: 'Software Developer',
      salary: 45000,
      status: 'active',
      hireDate: '2023-01-15',
      role: 'employee'
    },
    {
      id: 2,
      name: 'Fatima Ali',
      email: 'fatima.ali@company.com',
      department: 'HR',
      position: 'HR Manager',
      salary: 55000,
      status: 'active',
      hireDate: '2022-08-20',
      role: 'manager'
    },
    {
      id: 3,
      name: 'Mohamed Ahmed',
      email: 'mohamed.ahmed@company.com',
      department: 'Marketing',
      position: 'Marketing Specialist',
      salary: 40000,
      status: 'on-leave',
      hireDate: '2023-03-10',
      role: 'employee'
    },
    {
      id: 4,
      name: 'Aisha Hassan',
      email: 'aisha.hassan@company.com',
      department: 'Finance',
      position: 'Financial Analyst',
      salary: 48000,
      status: 'active',
      hireDate: '2022-11-05',
      role: 'employee'
    },
    {
      id: 5,
      name: 'Omar Khalil',
      email: 'omar.khalil@company.com',
      department: 'IT',
      position: 'System Administrator',
      salary: 52000,
      status: 'inactive',
      hireDate: '2021-06-15',
      role: 'employee'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    salary: '',
    status: 'active',
    password: '123456', // Default password for new employees
    role: 'employee', // Default role
    managerDepartment: '' // Department for managers
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
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      position: '',
      salary: '',
      status: 'active',
      password: '123456',
      role: 'employee',
      managerDepartment: ''
    });
    setShowModal(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    const [firstName, ...lastNameParts] = employee.name.split(' ');
    const lastName = lastNameParts.join(' ');
    
    setFormData({
      firstName: firstName || '',
      lastName: lastName || '',
      email: employee.email,
      department: employee.department,
      position: employee.position,
      salary: employee.salary.toString(),
      status: employee.status,
      password: '123456', // Keep default for editing
      role: employee.role,
      managerDepartment: employee.managerDepartment
    });
    setShowModal(true);
  };

  const handleDeleteEmployee = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#fff',
      backdrop: 'rgba(0,0,0,0.4)',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setEmployees(employees.filter(emp => emp.id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Employee has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#fff',
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            content: 'swal-custom-content'
          }
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id
          ? { 
              ...emp, 
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              department: formData.department,
              position: formData.position,
              salary: parseInt(formData.salary),
              status: formData.status,
              role: formData.role,
              managerDepartment: formData.managerDepartment
            }
          : emp
      ));
      
      Swal.fire({
        title: 'Updated!',
        text: 'Employee has been updated successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#fff',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          content: 'swal-custom-content'
        }
      });
    } else {
      // Add new employee
      const newEmployee = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        department: formData.department,
        position: formData.position,
        salary: parseInt(formData.salary),
        status: formData.status,
        hireDate: new Date().toISOString().split('T')[0],
        role: formData.role,
        managerDepartment: formData.managerDepartment
      };
      
      // Add to employees list
      setEmployees([...employees, newEmployee]);
      
      // Create login account for the new employee
      try {
        addMockUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          department: formData.department,
          position: formData.position,
          role: formData.role,
          managerDepartment: formData.managerDepartment
        });
        
        // Show success message with login credentials
        Swal.fire({
          title: 'Employee Added Successfully!',
          html: `
            <div style="text-align: left; margin: 20px 0;">
              <p><strong>Employee:</strong> ${formData.firstName} ${formData.lastName}</p>
              <p><strong>Department:</strong> ${formData.department}</p>
              <p><strong>Position:</strong> ${formData.position}</p>
              <hr style="margin: 15px 0; border-color: #e5e7eb;">
              <p style="color: #059669; font-weight: bold;">Login Credentials:</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Password:</strong> ${formData.password}</p>
              <p style="font-size: 0.9em; color: #6b7280; margin-top: 10px;">
                The employee can now login using these credentials.
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#059669',
          background: '#fff',
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            content: 'swal-custom-content',
            confirmButton: 'swal-custom-confirm'
          }
        });
      } catch (error) {
        Swal.fire({
          title: 'Warning!',
          text: 'Employee added but there was an issue creating login account.',
          icon: 'warning',
          confirmButtonColor: '#f59e0b',
          background: '#fff',
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            content: 'swal-custom-content'
          }
        });
      }
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

  const handlePromoteEmployee = (employee) => {
    Swal.fire({
      title: 'Promote Employee',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>Employee:</strong> ${employee.name}</p>
          <p><strong>Current Role:</strong> ${employee.role}</p>
          <p><strong>Current Department:</strong> ${employee.department}</p>
          <hr style="margin: 15px 0; border-color: #e5e7eb;">
          <p style="color: #059669; font-weight: bold;">Promote to Manager</p>
          <p>This will give the employee manager privileges and access to manager features.</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Promote to Manager',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#059669',
      background: '#fff',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content',
        confirmButton: 'swal-custom-confirm'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Show department selection
        Swal.fire({
          title: 'Select Department to Manage',
          html: `
            <div style="text-align: left; margin: 20px 0;">
              <p>Which department should ${employee.name} manage?</p>
              <select id="managerDepartment" class="swal2-select" style="width: 100%; margin-top: 10px; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                <option value="">Select Department</option>
                <option value="IT">IT Department</option>
                <option value="HR">HR Department</option>
                <option value="Marketing">Marketing Department</option>
                <option value="Finance">Finance Department</option>
                <option value="Sales">Sales Department</option>
                <option value="Operations">Operations Department</option>
              </select>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Promote',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#059669',
          preConfirm: () => {
            const department = document.getElementById('managerDepartment').value;
            if (!department) {
              Swal.showValidationMessage('Please select a department');
              return false;
            }
            return department;
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const newDepartment = result.value;
            
            // Update employee
            setEmployees(employees.map(emp =>
              emp.id === employee.id
                ? { 
                    ...emp, 
                    role: 'manager',
                    managerDepartment: newDepartment,
                    position: `${newDepartment} Manager`
                  }
                : emp
            ));
            
            // Update login account
            try {
              // Remove old user and add new manager
              const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
              const updatedUsers = users.map(user => 
                user.email === employee.email 
                  ? { ...user, role: 'manager', department: newDepartment }
                  : user
              );
              localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
              
              Swal.fire({
                title: 'Promoted Successfully!',
                html: `
                  <div style="text-align: left; margin: 20px 0;">
                    <p><strong>Employee:</strong> ${employee.name}</p>
                    <p><strong>New Role:</strong> Manager</p>
                    <p><strong>Managing Department:</strong> ${newDepartment}</p>
                    <p><strong>New Position:</strong> ${newDepartment} Manager</p>
                    <hr style="margin: 15px 0; border-color: #e5e7eb;">
                    <p style="color: #059669; font-weight: bold;">Login Updated</p>
                    <p>The employee can now login with manager privileges.</p>
                  </div>
                `,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#059669'
              });
            } catch (error) {
              Swal.fire({
                title: 'Warning!',
                text: 'Employee promoted but there was an issue updating login account.',
                icon: 'warning',
                confirmButtonColor: '#f59e0b'
              });
            }
          }
        });
      }
    });
  };

  const handleTransferManager = (employee) => {
    Swal.fire({
      title: 'Transfer Manager',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>Manager:</strong> ${employee.name}</p>
          <p><strong>Current Department:</strong> ${employee.managerDepartment || employee.department}</p>
          <hr style="margin: 15px 0; border-color: #e5e7eb;">
          <p>Select the new department to transfer this manager to:</p>
          <select id="transferDepartment" class="swal2-select" style="width: 100%; margin-top: 10px; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            <option value="">Select New Department</option>
            <option value="IT">IT Department</option>
            <option value="HR">HR Department</option>
            <option value="Marketing">Marketing Department</option>
            <option value="Finance">Finance Department</option>
            <option value="Sales">Sales Department</option>
            <option value="Operations">Operations Department</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Transfer',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3b82f6',
      preConfirm: () => {
        const department = document.getElementById('transferDepartment').value;
        if (!department) {
          Swal.showValidationMessage('Please select a department');
          return false;
        }
        if (department === (employee.managerDepartment || employee.department)) {
          Swal.showValidationMessage('Please select a different department');
          return false;
        }
        return department;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newDepartment = result.value;
        
        // Update employee
        setEmployees(employees.map(emp =>
          emp.id === employee.id
            ? { 
                ...emp, 
                managerDepartment: newDepartment,
                department: newDepartment,
                position: `${newDepartment} Manager`
              }
            : emp
        ));
        
        // Update login account
        try {
          const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
          const updatedUsers = users.map(user => 
            user.email === employee.email 
              ? { ...user, department: newDepartment }
              : user
          );
          localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
          
          Swal.fire({
            title: 'Transferred Successfully!',
            html: `
              <div style="text-align: left; margin: 20px 0;">
                <p><strong>Manager:</strong> ${employee.name}</p>
                <p><strong>New Department:</strong> ${newDepartment}</p>
                <p><strong>New Position:</strong> ${newDepartment} Manager</p>
                <hr style="margin: 15px 0; border-color: #e5e7eb;">
                <p style="color: #059669; font-weight: bold;">Transfer Complete</p>
                <p>The manager has been transferred to the new department.</p>
              </div>
            `,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3b82f6'
          });
        } catch (error) {
          Swal.fire({
            title: 'Warning!',
            text: 'Manager transferred but there was an issue updating login account.',
            icon: 'warning',
            confirmButtonColor: '#f59e0b'
          });
        }
      }
    });
  };

  const handleDemoteManager = (employee) => {
    Swal.fire({
      title: 'Demote Manager',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>Manager:</strong> ${employee.name}</p>
          <p><strong>Current Department:</strong> ${employee.managerDepartment || employee.department}</p>
          <p><strong>Current Position:</strong> ${employee.position}</p>
          <hr style="margin: 15px 0; border-color: #e5e7eb;">
          <p style="color: #ef4444; font-weight: bold;">⚠️ Warning</p>
          <p>This will convert the manager back to a regular employee. They will lose manager privileges.</p>
          <p><strong>New Position:</strong> <input id="newPosition" class="swal2-input" placeholder="e.g., Senior Developer" style="width: 100%; margin-top: 10px;"></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Demote to Employee',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
      preConfirm: () => {
        const newPosition = document.getElementById('newPosition').value;
        if (!newPosition) {
          Swal.showValidationMessage('Please enter a new position');
          return false;
        }
        return newPosition;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newPosition = result.value;
        
        // Update employee
        setEmployees(employees.map(emp =>
          emp.id === employee.id
            ? { 
                ...emp, 
                role: 'employee',
                position: newPosition,
                managerDepartment: '' // Remove manager department
              }
            : emp
        ));
        
        // Update login account
        try {
          const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
          const updatedUsers = users.map(user => 
            user.email === employee.email 
              ? { ...user, role: 'employee' }
              : user
          );
          localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
          
          Swal.fire({
            title: 'Demoted Successfully!',
            html: `
              <div style="text-align: left; margin: 20px 0;">
                <p><strong>Employee:</strong> ${employee.name}</p>
                <p><strong>New Role:</strong> Employee</p>
                <p><strong>New Position:</strong> ${newPosition}</p>
                <hr style="margin: 15px 0; border-color: #e5e7eb;">
                <p style="color: #059669; font-weight: bold;">Demotion Complete</p>
                <p>The employee has been demoted and will have regular employee privileges.</p>
              </div>
            `,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ef4444'
          });
        } catch (error) {
          Swal.fire({
            title: 'Warning!',
            text: 'Employee demoted but there was an issue updating login account.',
            icon: 'warning',
            confirmButtonColor: '#f59e0b'
          });
        }
      }
    });
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
                <th>Role</th>
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
                        <h4>
                          <Link to={`/employees/${employee.id}`} className="employee-link">
                            {employee.name}
                          </Link>
                        </h4>
                        <p>{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <span className={`role-badge ${employee.role || 'employee'}`}>
                      {employee.role ? employee.role.charAt(0).toUpperCase() + employee.role.slice(1) : 'Employee'}
                    </span>
                  </td>
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
                      {employee.role === 'employee' && (
                        <button
                          className="action-btn promote-btn"
                          onClick={() => handlePromoteEmployee(employee)}
                          title="Promote to Manager"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </button>
                      )}
                      {employee.role === 'manager' && (
                        <button
                          className="action-btn transfer-btn"
                          onClick={() => handleTransferManager(employee)}
                          title="Transfer Manager"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </button>
                      )}
                      {employee.role === 'manager' && (
                        <button
                          className="action-btn demote-btn"
                          onClick={() => handleDemoteManager(employee)}
                          title="Demote to Employee"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                          </svg>
                    </button>
                      )}
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
                <div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                  <input
                    type="text"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
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
                <div className="form-row">
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
                </div>
                <div className="form-row">
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
                </div>
                
                {/* Role Selection */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <select
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  {formData.role === 'manager' && (
                    <div className="form-group">
                      <label className="form-label">Manager Department</label>
                      <select
                        name="managerDepartment"
                        className="form-select"
                        value={formData.managerDepartment}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Department to Manage</option>
                        <option value="IT">IT Department</option>
                        <option value="HR">HR Department</option>
                        <option value="Marketing">Marketing Department</option>
                        <option value="Finance">Finance Department</option>
                        <option value="Sales">Sales Department</option>
                        <option value="Operations">Operations Department</option>
                  </select>
                    </div>
                  )}
                </div>
                
                {!editingEmployee && (
                  <div className="form-group">
                    <label className="form-label">Default Password</label>
                    <input
                      type="text"
                      name="password"
                      className="form-input"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Default password for login"
                    />
                    <small className="form-help">This will be the employee's initial login password</small>
                  </div>
                )}
                
                {/* Additional Fields for Testing Scroll */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Emergency Contact</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      className="form-input"
                      placeholder="Emergency contact name"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-input"
                    placeholder="Full address"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      className="form-input"
                      placeholder="Nationality"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    className="form-input"
                    placeholder="e.g., JavaScript, React, Project Management"
                  />
                  <small className="form-help">Enter skills separated by commas</small>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Work Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      className="form-input"
                      placeholder="5"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Education Level</label>
                    <select
                      name="education"
                      className="form-select"
                    >
                      <option value="">Select Education</option>
                      <option value="high-school">High School</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
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