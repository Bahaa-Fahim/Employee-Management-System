import api from './api';

// Department Service
export const departmentService = {
  // Get all departments
  async getDepartments() {
    try {
      const response = await api.get('/departments');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch departments');
    }
  },

  // Get single department by ID
  async getDepartment(id) {
    try {
      const response = await api.get(`/departments/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch department');
    }
  },

  // Create new department
  async createDepartment(departmentData) {
    try {
      const response = await api.post('/departments', departmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create department');
    }
  },

  // Update department
  async updateDepartment(id, departmentData) {
    try {
      const response = await api.put(`/departments/${id}`, departmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update department');
    }
  },

  // Delete department
  async deleteDepartment(id) {
    try {
      const response = await api.delete(`/departments/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete department');
    }
  },

  // Get department statistics
  async getDepartmentStats() {
    try {
      const response = await api.get('/departments/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch department statistics');
    }
  },

  // Get employees in department
  async getDepartmentEmployees(id) {
    try {
      const response = await api.get(`/departments/${id}/employees`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch department employees');
    }
  }
}; 