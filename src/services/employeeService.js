import { employeesAPI } from './api';

// Employee Service
export const employeeService = {
  // Get all employees with pagination and filtering
  getAllEmployees: async (params = {}) => {
    try {
      const { page = 1, limit = 10, search = '', department = '', status = '' } = params;
      let url = `/employees?_page=${page}&_limit=${limit}`;
      
      if (search) url += `&q=${search}`;
      if (department) url += `&department=${department}`;
      if (status) url += `&status=${status}`;
      
      const response = await employeesAPI.getAll();
      return {
        success: true,
        data: response.data,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: response.data.length
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch employees');
    }
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await employeesAPI.getById(id);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Employee not found');
    }
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'department', 'position'];
      for (const field of requiredFields) {
        if (!employeeData[field]) {
          throw new Error(`${field} is required`);
        }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(employeeData.email)) {
        throw new Error('Invalid email format');
      }

      const response = await employeesAPI.create(employeeData);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to create employee');
    }
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await employeesAPI.update(id, employeeData);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to update employee');
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      await employeesAPI.delete(id);
      return { success: true, message: 'Employee deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete employee');
    }
  },

  // Search employees
  searchEmployees: async (query) => {
    try {
      const response = await employeesAPI.search(query);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Search failed');
    }
  },

  // Get employees by department
  getEmployeesByDepartment: async (department) => {
    try {
      const response = await employeesAPI.getByDepartment(department);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to fetch employees by department');
    }
  },

  // Get employees by status
  getEmployeesByStatus: async (status) => {
    try {
      const response = await employeesAPI.getByStatus(status);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to fetch employees by status');
    }
  },

  // Get employee statistics
  getEmployeeStats: async () => {
    try {
      const response = await employeesAPI.getAll();
      const employees = response.data;
      
      const stats = {
        total: employees.length,
        active: employees.filter(emp => emp.status === 'active').length,
        inactive: employees.filter(emp => emp.status === 'inactive').length,
        departments: {},
        positions: {}
      };

      // Count by department
      employees.forEach(emp => {
        stats.departments[emp.department] = (stats.departments[emp.department] || 0) + 1;
      });

      // Count by position
      employees.forEach(emp => {
        stats.positions[emp.position] = (stats.positions[emp.position] || 0) + 1;
      });

      return { success: true, data: stats };
    } catch (error) {
      throw new Error('Failed to fetch employee statistics');
    }
  },

  // Get employee performance data
  getEmployeePerformance: async (employeeId) => {
    try {
      const response = await employeesAPI.getById(employeeId);
      const employee = response.data;
      
      return {
        success: true,
        data: {
          rating: employee.performance?.rating || 0,
          lastReview: employee.performance?.lastReview || null,
          nextReview: employee.performance?.nextReview || null,
          attendance: employee.attendance || {}
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch employee performance');
    }
  },

  // Update employee performance
  updateEmployeePerformance: async (employeeId, performanceData) => {
    try {
      const currentEmployee = await employeesAPI.getById(employeeId);
      const updatedEmployee = {
        ...currentEmployee.data,
        performance: {
          ...currentEmployee.data.performance,
          ...performanceData
        }
      };
      
      const response = await employeesAPI.update(employeeId, updatedEmployee);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to update employee performance');
    }
  },

  // Get employee attendance
  getEmployeeAttendance: async (employeeId) => {
    try {
      const response = await employeesAPI.getById(employeeId);
      const employee = response.data;
      
      return {
        success: true,
        data: employee.attendance || {
          presentDays: 0,
          absentDays: 0,
          lateDays: 0
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch employee attendance');
    }
  },

  // Update employee attendance
  updateEmployeeAttendance: async (employeeId, attendanceData) => {
    try {
      const currentEmployee = await employeesAPI.getById(employeeId);
      const updatedEmployee = {
        ...currentEmployee.data,
        attendance: {
          ...currentEmployee.data.attendance,
          ...attendanceData
        }
      };
      
      const response = await employeesAPI.update(employeeId, updatedEmployee);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to update employee attendance');
    }
  },

  // Export employee data
  exportEmployeeData: async (filters = {}) => {
    try {
      const response = await employeesAPI.getAll();
      let employees = response.data;

      // Apply filters
      if (filters.department) {
        employees = employees.filter(emp => emp.department === filters.department);
      }
      if (filters.status) {
        employees = employees.filter(emp => emp.status === filters.status);
      }

      // Format data for export
      const exportData = employees.map(emp => ({
        ID: emp.id,
        'First Name': emp.firstName,
        'Last Name': emp.lastName,
        Email: emp.email,
        Phone: emp.phone,
        Department: emp.department,
        Position: emp.position,
        Salary: emp.salary,
        'Hire Date': emp.hireDate,
        Status: emp.status,
        Manager: emp.manager,
        'Performance Rating': emp.performance?.rating || 'N/A',
        'Present Days': emp.attendance?.presentDays || 0,
        'Absent Days': emp.attendance?.absentDays || 0
      }));

      return { success: true, data: exportData };
    } catch (error) {
      throw new Error('Failed to export employee data');
    }
  }
};

export default employeeService; 