import api from './api';

// Employee Service
export const employeeService = {
  // Get all employees with pagination and filters
  async getEmployees(params = {}) {
    try {
      const response = await api.get('/employees', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch employees');
    }
  },

  // Get single employee by ID
  async getEmployee(id) {
    try {
      const response = await api.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch employee');
    }
  },

  // Create new employee
  async createEmployee(employeeData) {
    try {
      const response = await api.post('/employees', employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create employee');
    }
  },

  // Update employee
  async updateEmployee(id, employeeData) {
    try {
      const response = await api.put(`/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update employee');
    }
  },

  // Delete employee
  async deleteEmployee(id) {
    try {
      const response = await api.delete(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete employee');
    }
  },

  // Search employees
  async searchEmployees(query, filters = {}) {
    try {
      const response = await api.get('/employees/search', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search employees');
    }
  },

  // Get employee statistics
  async getEmployeeStats() {
    try {
      const response = await api.get('/employees/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch employee statistics');
    }
  },

  // Upload employee photo
  async uploadPhoto(id, file) {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await api.post(`/employees/${id}/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload photo');
    }
  },

  // Bulk operations
  async bulkDelete(ids) {
    try {
      const response = await api.post('/employees/bulk-delete', { ids });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete employees');
    }
  },

  async bulkUpdate(updates) {
    try {
      const response = await api.put('/employees/bulk-update', updates);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update employees');
    }
  },

  // Export employees data
  async exportEmployees(format = 'csv', filters = {}) {
    try {
      const response = await api.get('/employees/export', {
        params: { format, ...filters },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export employees');
    }
  }
}; 