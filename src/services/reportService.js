import { reportsAPI } from './api';
import { employeesAPI } from './api';
import { projectsAPI } from './api';

// Report Service
export const reportService = {
  // Get all reports with pagination and filtering
  getAllReports: async (params = {}) => {
    try {
      const { page = 1, limit = 10, type = '', status = '', dateRange = '' } = params;
      const response = await reportsAPI.getAll();
      let reports = response.data;

      // Apply filters
      if (type) {
        reports = reports.filter(report => report.type === type);
      }
      if (status) {
        reports = reports.filter(report => report.status === status);
      }
      if (dateRange) {
        const [startDate, endDate] = dateRange.split(' to ');
        reports = reports.filter(report => {
          const reportDate = new Date(report.createdAt);
          return reportDate >= new Date(startDate) && reportDate <= new Date(endDate);
        });
      }

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedReports = reports.slice(startIndex, endIndex);

      return {
        success: true,
        data: paginatedReports,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: reports.length,
          totalPages: Math.ceil(reports.length / limit)
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch reports');
    }
  },

  // Get report by ID
  getReportById: async (id) => {
    try {
      const response = await reportsAPI.getById(id);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Report not found');
    }
  },

  // Create new report
  createReport: async (reportData) => {
    try {
      // Validate required fields
      const requiredFields = ['title', 'type', 'content'];
      for (const field of requiredFields) {
        if (!reportData[field]) {
          throw new Error(`${field} is required`);
        }
      }

      const newReport = {
        ...reportData,
        id: Date.now(), // Generate temporary ID
        createdAt: new Date().toISOString(),
        status: 'pending',
        author: reportData.author || 'System'
      };

      const response = await reportsAPI.create(newReport);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to create report');
    }
  },

  // Update report
  updateReport: async (id, reportData) => {
    try {
      const response = await reportsAPI.update(id, reportData);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to update report');
    }
  },

  // Delete report
  deleteReport: async (id) => {
    try {
      await reportsAPI.delete(id);
      return { success: true, message: 'Report deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete report');
    }
  },

  // Get reports by type
  getReportsByType: async (type) => {
    try {
      const response = await reportsAPI.getByType(type);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to fetch reports by type');
    }
  },

  // Get reports by status
  getReportsByStatus: async (status) => {
    try {
      const response = await reportsAPI.getByStatus(status);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to fetch reports by status');
    }
  },

  // Generate employee performance report
  generateEmployeePerformanceReport: async (filters = {}) => {
    try {
      const employeesResponse = await employeesAPI.getAll();
      let employees = employeesResponse.data;

      // Apply filters
      if (filters.department) {
        employees = employees.filter(emp => emp.department === filters.department);
      }
      if (filters.status) {
        employees = employees.filter(emp => emp.status === filters.status);
      }

      const reportData = {
        title: 'Employee Performance Report',
        type: 'performance',
        content: {
          summary: {
            totalEmployees: employees.length,
            averageRating: employees.reduce((sum, emp) => sum + (emp.performance?.rating || 0), 0) / employees.length,
            topPerformers: employees
              .filter(emp => emp.performance?.rating >= 4.5)
              .slice(0, 5)
              .map(emp => ({
                name: `${emp.firstName} ${emp.lastName}`,
                rating: emp.performance?.rating,
                department: emp.department
              })),
            needsImprovement: employees
              .filter(emp => emp.performance?.rating < 3.0)
              .slice(0, 5)
              .map(emp => ({
                name: `${emp.firstName} ${emp.lastName}`,
                rating: emp.performance?.rating,
                department: emp.department
              }))
          },
          byDepartment: {},
          byPosition: {},
          attendance: {
            averagePresentDays: employees.reduce((sum, emp) => sum + (emp.attendance?.presentDays || 0), 0) / employees.length,
            averageAbsentDays: employees.reduce((sum, emp) => sum + (emp.attendance?.absentDays || 0), 0) / employees.length
          }
        },
        createdAt: new Date().toISOString(),
        status: 'completed'
      };

      // Group by department
      employees.forEach(emp => {
        if (!reportData.content.byDepartment[emp.department]) {
          reportData.content.byDepartment[emp.department] = {
            count: 0,
            averageRating: 0,
            totalRating: 0
          };
        }
        reportData.content.byDepartment[emp.department].count++;
        reportData.content.byDepartment[emp.department].totalRating += emp.performance?.rating || 0;
      });

      // Calculate averages
      Object.keys(reportData.content.byDepartment).forEach(dept => {
        const deptData = reportData.content.byDepartment[dept];
        deptData.averageRating = deptData.totalRating / deptData.count;
      });

      return { success: true, data: reportData };
    } catch (error) {
      throw new Error('Failed to generate employee performance report');
    }
  },

  // Generate project status report
  generateProjectStatusReport: async (filters = {}) => {
    try {
      const projectsResponse = await projectsAPI.getAll();
      let projects = projectsResponse.data;

      // Apply filters
      if (filters.department) {
        projects = projects.filter(project => project.department === filters.department);
      }
      if (filters.status) {
        projects = projects.filter(project => project.status === filters.status);
      }

      const reportData = {
        title: 'Project Status Report',
        type: 'project',
        content: {
          summary: {
            totalProjects: projects.length,
            activeProjects: projects.filter(p => p.status === 'active').length,
            completedProjects: projects.filter(p => p.status === 'completed').length,
            onHoldProjects: projects.filter(p => p.status === 'on-hold').length,
            cancelledProjects: projects.filter(p => p.status === 'cancelled').length
          },
          byDepartment: {},
          byPriority: {},
          timeline: {
            overdue: projects.filter(p => new Date(p.endDate) < new Date() && p.status !== 'completed').length,
            dueThisWeek: projects.filter(p => {
              const endDate = new Date(p.endDate);
              const now = new Date();
              const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
              return endDate >= now && endDate <= weekFromNow && p.status !== 'completed';
            }).length
          }
        },
        createdAt: new Date().toISOString(),
        status: 'completed'
      };

      // Group by department
      projects.forEach(project => {
        if (!reportData.content.byDepartment[project.department]) {
          reportData.content.byDepartment[project.department] = {
            total: 0,
            active: 0,
            completed: 0,
            onHold: 0,
            cancelled: 0
          };
        }
        reportData.content.byDepartment[project.department].total++;
        reportData.content.byDepartment[project.department][project.status]++;
      });

      // Group by priority
      projects.forEach(project => {
        if (!reportData.content.byPriority[project.priority]) {
          reportData.content.byPriority[project.priority] = 0;
        }
        reportData.content.byPriority[project.priority]++;
      });

      return { success: true, data: reportData };
    } catch (error) {
      throw new Error('Failed to generate project status report');
    }
  },

  // Generate attendance report
  generateAttendanceReport: async (filters = {}) => {
    try {
      const employeesResponse = await employeesAPI.getAll();
      let employees = employeesResponse.data;

      // Apply filters
      if (filters.department) {
        employees = employees.filter(emp => emp.department === filters.department);
      }

      const reportData = {
        title: 'Attendance Report',
        type: 'attendance',
        content: {
          summary: {
            totalEmployees: employees.length,
            averagePresentDays: employees.reduce((sum, emp) => sum + (emp.attendance?.presentDays || 0), 0) / employees.length,
            averageAbsentDays: employees.reduce((sum, emp) => sum + (emp.attendance?.absentDays || 0), 0) / employees.length,
            averageLateDays: employees.reduce((sum, emp) => sum + (emp.attendance?.lateDays || 0), 0) / employees.length
          },
          byDepartment: {},
          topAttendees: employees
            .sort((a, b) => (b.attendance?.presentDays || 0) - (a.attendance?.presentDays || 0))
            .slice(0, 10)
            .map(emp => ({
              name: `${emp.firstName} ${emp.lastName}`,
              presentDays: emp.attendance?.presentDays || 0,
              absentDays: emp.attendance?.absentDays || 0,
              lateDays: emp.attendance?.lateDays || 0,
              department: emp.department
            })),
          attendanceIssues: employees
            .filter(emp => (emp.attendance?.absentDays || 0) > 5)
            .map(emp => ({
              name: `${emp.firstName} ${emp.lastName}`,
              absentDays: emp.attendance?.absentDays || 0,
              department: emp.department
            }))
        },
        createdAt: new Date().toISOString(),
        status: 'completed'
      };

      // Group by department
      employees.forEach(emp => {
        if (!reportData.content.byDepartment[emp.department]) {
          reportData.content.byDepartment[emp.department] = {
            count: 0,
            totalPresentDays: 0,
            totalAbsentDays: 0,
            totalLateDays: 0
          };
        }
        reportData.content.byDepartment[emp.department].count++;
        reportData.content.byDepartment[emp.department].totalPresentDays += emp.attendance?.presentDays || 0;
        reportData.content.byDepartment[emp.department].totalAbsentDays += emp.attendance?.absentDays || 0;
        reportData.content.byDepartment[emp.department].totalLateDays += emp.attendance?.lateDays || 0;
      });

      return { success: true, data: reportData };
    } catch (error) {
      throw new Error('Failed to generate attendance report');
    }
  },

  // Get report statistics
  getReportStats: async () => {
    try {
      const response = await reportsAPI.getAll();
      const reports = response.data;
      
      const stats = {
        total: reports.length,
        pending: reports.filter(report => report.status === 'pending').length,
        completed: reports.filter(report => report.status === 'completed').length,
        types: {},
        monthly: {}
      };

      // Count by type
      reports.forEach(report => {
        stats.types[report.type] = (stats.types[report.type] || 0) + 1;
      });

      // Count by month
      reports.forEach(report => {
        const month = new Date(report.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        stats.monthly[month] = (stats.monthly[month] || 0) + 1;
      });

      return { success: true, data: stats };
    } catch (error) {
      throw new Error('Failed to fetch report statistics');
    }
  },

  // Export report data
  exportReportData: async (reportId) => {
    try {
      const response = await reportsAPI.getById(reportId);
      const report = response.data;
      
      const exportData = {
        'Report ID': report.id,
        'Title': report.title,
        'Type': report.type,
        'Status': report.status,
        'Created At': report.createdAt,
        'Author': report.author,
        'Content': JSON.stringify(report.content, null, 2)
      };

      return { success: true, data: exportData };
    } catch (error) {
      throw new Error('Failed to export report data');
    }
  }
};

export default reportService; 