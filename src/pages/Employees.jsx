import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiPlus, FiSearch, FiEdit3, FiTrash2, FiEye, FiUsers, FiUserCheck, FiUserX, FiDollarSign, FiCalendar, FiMail, FiPhone, FiMapPin, FiShield, FiUsers as FiManager } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './Employees.css';

const Employees = () => {
  const { getAllUsers, addUser, updateUserById, deleteUser, resetUserPassword, getUserStats, sendNotification } = useAuth();
  
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    onLeave: 0,
    totalSalary: 0
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    status: 'active',
    password: '123456',
    role: 'employee',
    managerDepartment: '',
    address: '',
    hireDate: new Date().toISOString().split('T')[0],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    }
  });

  // تحميل البيانات عند تحميل الصفحة
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    try {
      setLoading(true);
      const users = getAllUsers();
      setEmployees(users);
      
      // حساب الإحصائيات
      const totalSalary = users.reduce((sum, emp) => sum + (emp.salary || 0), 0);
      setStats({
        total: users.length,
        active: users.filter(emp => emp.status === 'active').length,
        inactive: users.filter(emp => emp.status === 'inactive').length,
        onLeave: users.filter(emp => emp.status === 'on-leave').length,
        totalSalary
      });
    } catch (error) {
      console.error('Error loading employees:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load employees data.',
        customClass: { popup: 'rounded-xl' }
      });
    } finally {
      setLoading(false);
    }
  };

  // تصفية الموظفين
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      salary: '',
      status: 'active',
      password: '123456',
      role: 'employee',
      managerDepartment: '',
      address: '',
      hireDate: new Date().toISOString().split('T')[0],
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    });
    setShowModal(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    const [firstName, ...lastNameParts] = (employee.name || '').split(' ');
    const lastName = lastNameParts.join(' ');
    
    setFormData({
      firstName: firstName || '',
      lastName: lastName || '',
      email: employee.email || '',
      phone: employee.phone || '',
      department: employee.department || '',
      position: employee.position || '',
      salary: (employee.salary || '').toString(),
      status: employee.status || 'active',
      password: '123456',
      role: employee.role || 'employee',
      managerDepartment: employee.managerDepartment || '',
      address: employee.address || '',
      hireDate: employee.hireDate || new Date().toISOString().split('T')[0],
      emergencyContact: employee.emergencyContact || {
        name: '',
        relationship: '',
        phone: ''
      }
    });
    setShowModal(true);
  };

  const handleDeleteEmployee = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: { popup: 'rounded-xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteUser(id);
          loadEmployees(); // إعادة تحميل البيانات
          
        Swal.fire({
          title: 'Deleted!',
            text: 'Employee has been deleted successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
            customClass: { popup: 'rounded-xl' }
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete employee.',
            customClass: { popup: 'rounded-xl' }
        });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
        customClass: { popup: 'rounded-xl' }
      });
      return;
    }

    try {
      const employeeData = {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
        phone: formData.phone,
              department: formData.department,
              position: formData.position,
        salary: parseInt(formData.salary) || 0,
              status: formData.status,
              role: formData.role,
        managerDepartment: formData.managerDepartment,
        address: formData.address,
        hireDate: formData.hireDate,
        emergencyContact: formData.emergencyContact,
        password: formData.password
      };

      if (editingEmployee) {
        // تحديث موظف موجود
        updateUserById(editingEmployee.id, employeeData);
        
        // إرسال إشعار للموظف
        sendNotification(
          editingEmployee.id,
          'Profile Updated',
          'Your profile information has been updated by the administrator.',
          'info'
        );
      
      Swal.fire({
        title: 'Updated!',
        text: 'Employee has been updated successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
          customClass: { popup: 'rounded-xl' }
      });
    } else {
        // إضافة موظف جديد
        const newEmployee = addUser(employeeData);
      
        // إرسال إشعار للموظف الجديد
        sendNotification(
          newEmployee.id,
          'Welcome!',
          'Welcome to the company! Your account has been created successfully.',
          'success'
        );

        Swal.fire({
          title: 'Added!',
          text: 'Employee has been added successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: 'rounded-xl' }
        });
      }

      setShowModal(false);
      loadEmployees(); // إعادة تحميل البيانات
      } catch (error) {
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to save employee.',
        customClass: { popup: 'rounded-xl' }
        });
      }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePromoteEmployee = (employee) => {
    Swal.fire({
      title: 'Promote Employee',
      text: 'Select department for the new manager:',
      input: 'select',
      inputOptions: {
        'IT': 'IT',
        'HR': 'HR',
        'Finance': 'Finance',
        'Marketing': 'Marketing',
        'Sales': 'Sales',
        'Operations': 'Operations'
      },
          showCancelButton: true,
          confirmButtonText: 'Promote',
          cancelButtonText: 'Cancel',
      customClass: { popup: 'rounded-xl' }
        }).then((result) => {
          if (result.isConfirmed) {
        try {
          updateUserById(employee.id, {
                    role: 'manager',
            managerDepartment: result.value
          });
            
          // إرسال إشعار للموظف
          sendNotification(
            employee.id,
            'Congratulations!',
            `You have been promoted to Manager of ${result.value} department.`,
            'success'
          );

          loadEmployees();
              
              Swal.fire({
            title: 'Promoted!',
            text: `${employee.name} has been promoted to Manager.`,
                icon: 'success',
            customClass: { popup: 'rounded-xl' }
              });
            } catch (error) {
              Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to promote employee.',
            customClass: { popup: 'rounded-xl' }
              });
            }
      }
    });
  };

  const handleDemoteManager = (employee) => {
    Swal.fire({
      title: 'Demote Manager',
      text: `Are you sure you want to demote ${employee.name} from Manager to Employee?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, demote',
      cancelButtonText: 'Cancel',
      customClass: { popup: 'rounded-xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          updateUserById(employee.id, {
            role: 'employee',
            managerDepartment: null
          });
          
          // إرسال إشعار للموظف
          sendNotification(
            employee.id,
            'Role Change',
            'Your role has been changed from Manager to Employee.',
            'info'
          );

          loadEmployees();
          
          Swal.fire({
            title: 'Demoted!',
            text: `${employee.name} has been demoted to Employee.`,
            icon: 'success',
            customClass: { popup: 'rounded-xl' }
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to demote manager.',
            customClass: { popup: 'rounded-xl' }
          });
        }
      }
    });
  };

  const handleResetPassword = (employee) => {
    Swal.fire({
      title: 'Reset Password',
      text: `Enter new password for ${employee.name}:`,
      input: 'password',
      inputPlaceholder: 'Enter new password',
      showCancelButton: true,
      confirmButtonText: 'Reset',
      cancelButtonText: 'Cancel',
      customClass: { popup: 'rounded-xl' },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter a password!';
        }
        if (value.length < 6) {
          return 'Password must be at least 6 characters!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          resetUserPassword(employee.id, result.value);
        
          // إرسال إشعار للموظف
          sendNotification(
            employee.id,
            'Password Reset',
            'Your password has been reset by the administrator.',
            'warning'
          );
          
          Swal.fire({
            title: 'Password Reset!',
            text: 'Password has been reset successfully.',
            icon: 'success',
            customClass: { popup: 'rounded-xl' }
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to reset password.',
            customClass: { popup: 'rounded-xl' }
          });
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <FiShield className="w-4 h-4" />;
      case 'manager':
        return <FiManager className="w-4 h-4" />;
      case 'employee':
        return <FiUsers className="w-4 h-4" />;
      default:
        return <FiUsers className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'employee':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
      {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employees Management</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span>Employees</span>
          </div>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiUserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiCalendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">On Leave</p>
                <p className="text-2xl font-bold text-gray-900">{stats.onLeave}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <FiUserX className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiDollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Salary</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalSalary.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
                  placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
              </select>
              
              {/* Department Filter */}
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
              </select>
        </div>
            
            <button
              onClick={handleAddEmployee}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Employee
            </button>
        </div>
      </div>

      {/* Employees Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
              </tr>
            </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {employee.name?.charAt(0) || 'U'}
                            </span>
                      </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.position}</div>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(employee.role)}`}>
                              {getRoleIcon(employee.role)}
                              <span className="ml-1 capitalize">{employee.role}</span>
                            </span>
                          </div>
                      </div>
                    </div>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.email}</div>
                      <div className="text-sm text-gray-500">{employee.phone}</div>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.department}</div>
                      {employee.managerDepartment && (
                        <div className="text-xs text-blue-600">Manages: {employee.managerDepartment}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                        {employee.status}
                    </span>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${employee.salary?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/employees/${employee.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleEditEmployee(employee)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleResetPassword(employee)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <FiShield className="w-4 h-4" />
                        </button>
                        {employee.role === 'employee' && (
                          <button
                            onClick={() => handlePromoteEmployee(employee)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <FiManager className="w-4 h-4" />
                          </button>
                        )}
                        {employee.role === 'manager' && (
                          <button
                            onClick={() => handleDemoteManager(employee)}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            <FiUsers className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        {/* Add/Edit Employee Modal */}
      {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h2>
            </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                      name="department"
                    value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="on-leave">On Leave</option>
                    </select>
                </div>
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  
                  {formData.role === 'manager' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager Department</label>
                      <select
                        name="managerDepartment"
                        value={formData.managerDepartment}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Operations">Operations</option>
                  </select>
                    </div>
                  )}
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date</label>
                    <input
                      type="date"
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* Emergency Contact */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                        name="emergencyContact.name"
                        value={formData.emergencyContact.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <input
                    type="text"
                        name="emergencyContact.relationship"
                        value={formData.emergencyContact.relationship}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                </div>
                
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                        type="tel"
                        name="emergencyContact.phone"
                        value={formData.emergencyContact.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                  onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                  </button>
                </div>
              </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Employees; 







<p> 
  <mark>html</mark> is <i>fun</i> to <b>learn</b>
  </p>