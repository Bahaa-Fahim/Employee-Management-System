import api from './api';

// Report Service
export const reportService = {
  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const response = await api.get('/reports/dashboard');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard statistics');
    }
  },

  // Get employee reports
  async getEmployeeReports(filters = {}) {
    try {
      const response = await api.get('/reports/employees', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch employee reports');
    }
  },

  // Get department reports
  async getDepartmentReports(filters = {}) {
    try {
      const response = await api.get('/reports/departments', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch department reports');
    }
  },

  // Get salary reports
  async getSalaryReports(filters = {}) {
    try {
      const response = await api.get('/reports/salary', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch salary reports');
    }
  },

  // Get performance reports
  async getPerformanceReports(filters = {}) {
    try {
      const response = await api.get('/reports/performance', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch performance reports');
    }
  },

  // Export report
  async exportReport(reportType, format = 'pdf', filters = {}) {
    try {
      const response = await api.get(`/reports/${reportType}/export`, {
        params: { format, ...filters },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export report');
    }
  },

  // Get report templates
  async getReportTemplates() {
    try {
      const response = await api.get('/reports/templates');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch report templates');
    }
  },

  // Schedule report
  async scheduleReport(reportData) {
    try {
      const response = await api.post('/reports/schedule', reportData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to schedule report');
    }
  }
}; 