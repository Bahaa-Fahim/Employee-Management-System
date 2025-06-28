import { employeesAPI } from './api';
import { projectsAPI } from './api';
import { reportsAPI } from './api';
import { departmentsAPI } from './api';

export const dashboardService = {
  // Get comprehensive dashboard data
  getDashboardData: async () => {
    try {
      const [employees, projects, reports, departments] = await Promise.all([
        employeesAPI.getAll(),
        projectsAPI.getAll(),
        reportsAPI.getAll(),
        departmentsAPI.getAll()
      ]);

      const dashboardData = {
        overview: {
          totalEmployees: employees.data.length,
          totalProjects: projects.data.length,
          totalDepartments: departments.data.length,
          totalReports: reports.data.length
        },
        employeeStats: {
          active: employees.data.filter(emp => emp.status === 'active').length,
          inactive: employees.data.filter(emp => emp.status === 'inactive').length,
          averageSalary: employees.data.reduce((sum, emp) => sum + (emp.salary || 0), 0) / employees.data.length,
          averageRating: employees.data.reduce((sum, emp) => sum + (emp.performance?.rating || 0), 0) / employees.data.length
        },
        projectStats: {
          active: projects.data.filter(proj => proj.status === 'active').length,
          completed: projects.data.filter(proj => proj.status === 'completed').length,
          onHold: projects.data.filter(proj => proj.status === 'on-hold').length,
          cancelled: projects.data.filter(proj => proj.status === 'cancelled').length
        },
        departmentStats: departments.data.map(dept => ({
          name: dept.name,
          employeeCount: dept.employeeCount,
          budget: dept.budget,
          status: dept.status
        })),
        recentActivity: {
          recentEmployees: employees.data
            .sort((a, b) => new Date(b.hireDate) - new Date(a.hireDate))
            .slice(0, 5)
            .map(emp => ({
              id: emp.id,
              name: `${emp.firstName} ${emp.lastName}`,
              department: emp.department,
              position: emp.position,
              hireDate: emp.hireDate
            })),
          recentProjects: projects.data
            .sort((a, b) => new Date(b.createdAt || b.startDate) - new Date(a.createdAt || a.startDate))
            .slice(0, 5)
            .map(proj => ({
              id: proj.id,
              name: proj.name,
              status: proj.status,
              department: proj.department,
              startDate: proj.startDate
            })),
          recentReports: reports.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
            .map(report => ({
              id: report.id,
              title: report.title,
              type: report.type,
              status: report.status,
              createdAt: report.createdAt
            }))
        }
      };

      return { success: true, data: dashboardData };
    } catch (error) {
      throw new Error('Failed to fetch dashboard data');
    }
  },

  // Get manager dashboard data
  getManagerDashboardData: async (managerId) => {
    try {
      const [employees, projects] = await Promise.all([
        employeesAPI.getAll(),
        projectsAPI.getAll()
      ]);

      // Filter data for specific manager
      const teamEmployees = employees.data.filter(emp => emp.manager === managerId);
      const teamProjects = projects.data.filter(proj => proj.manager === managerId);

      const managerData = {
        teamOverview: {
          teamSize: teamEmployees.length,
          activeProjects: teamProjects.filter(proj => proj.status === 'active').length,
          completedProjects: teamProjects.filter(proj => proj.status === 'completed').length
        },
        teamPerformance: {
          averageRating: teamEmployees.reduce((sum, emp) => sum + (emp.performance?.rating || 0), 0) / teamEmployees.length,
          topPerformers: teamEmployees
            .filter(emp => emp.performance?.rating >= 4.5)
            .slice(0, 3)
            .map(emp => ({
              name: `${emp.firstName} ${emp.lastName}`,
              rating: emp.performance?.rating,
              position: emp.position
            })),
          attendanceIssues: teamEmployees
            .filter(emp => (emp.attendance?.absentDays || 0) > 3)
            .map(emp => ({
              name: `${emp.firstName} ${emp.lastName}`,
              absentDays: emp.attendance?.absentDays || 0
            }))
        },
        projectStatus: {
          active: teamProjects.filter(proj => proj.status === 'active'),
          completed: teamProjects.filter(proj => proj.status === 'completed'),
          onHold: teamProjects.filter(proj => proj.status === 'on-hold')
        },
        upcomingReviews: teamEmployees
          .filter(emp => {
            const nextReview = new Date(emp.performance?.nextReview);
            const now = new Date();
            const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            return nextReview <= thirtyDaysFromNow;
          })
          .map(emp => ({
            name: `${emp.firstName} ${emp.lastName}`,
            nextReview: emp.performance?.nextReview,
            currentRating: emp.performance?.rating
          }))
      };

      return { success: true, data: managerData };
    } catch (error) {
      throw new Error('Failed to fetch manager dashboard data');
    }
  },

  // Get employee dashboard data
  getEmployeeDashboardData: async (employeeId) => {
    try {
      const [employee, projects, reports] = await Promise.all([
        employeesAPI.getById(employeeId),
        projectsAPI.getAll(),
        reportsAPI.getAll()
      ]);

      const emp = employee.data;
      const assignedProjects = projects.data.filter(proj => 
        proj.teamMembers?.includes(employeeId) || proj.manager === employeeId
      );

      const employeeData = {
        profile: {
          name: `${emp.firstName} ${emp.lastName}`,
          position: emp.position,
          department: emp.department,
          manager: emp.manager,
          hireDate: emp.hireDate,
          salary: emp.salary
        },
        performance: {
          rating: emp.performance?.rating || 0,
          lastReview: emp.performance?.lastReview,
          nextReview: emp.performance?.nextReview
        },
        attendance: {
          presentDays: emp.attendance?.presentDays || 0,
          absentDays: emp.attendance?.absentDays || 0,
          lateDays: emp.attendance?.lateDays || 0
        },
        projects: {
          assigned: assignedProjects.length,
          active: assignedProjects.filter(proj => proj.status === 'active').length,
          completed: assignedProjects.filter(proj => proj.status === 'completed').length,
          projectList: assignedProjects.map(proj => ({
            id: proj.id,
            name: proj.name,
            status: proj.status,
            startDate: proj.startDate,
            endDate: proj.endDate
          }))
        },
        recentActivity: {
          recentReports: reports.data
            .filter(report => report.author === employeeId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
            .map(report => ({
              id: report.id,
              title: report.title,
              type: report.type,
              createdAt: report.createdAt
            }))
        }
      };

      return { success: true, data: employeeData };
    } catch (error) {
      throw new Error('Failed to fetch employee dashboard data');
    }
  },

  // Get analytics data for charts
  getAnalyticsData: async () => {
    try {
      const [employees, projects, departments] = await Promise.all([
        employeesAPI.getAll(),
        projectsAPI.getAll(),
        departmentsAPI.getAll()
      ]);

      const analyticsData = {
        employeeGrowth: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [45, 52, 58, 65, 72, 78] // Mock data - in real app would be calculated
        },
        departmentDistribution: departments.data.map(dept => ({
          name: dept.name,
          count: dept.employeeCount,
          budget: dept.budget
        })),
        projectStatus: {
          labels: ['Active', 'Completed', 'On Hold', 'Cancelled'],
          data: [
            projects.data.filter(p => p.status === 'active').length,
            projects.data.filter(p => p.status === 'completed').length,
            projects.data.filter(p => p.status === 'on-hold').length,
            projects.data.filter(p => p.status === 'cancelled').length
          ]
        },
        performanceDistribution: {
          excellent: employees.data.filter(emp => emp.performance?.rating >= 4.5).length,
          good: employees.data.filter(emp => emp.performance?.rating >= 3.5 && emp.performance?.rating < 4.5).length,
          average: employees.data.filter(emp => emp.performance?.rating >= 2.5 && emp.performance?.rating < 3.5).length,
          needsImprovement: employees.data.filter(emp => emp.performance?.rating < 2.5).length
        },
        salaryDistribution: {
          ranges: ['<50k', '50k-75k', '75k-100k', '100k-125k', '>125k'],
          data: [
            employees.data.filter(emp => emp.salary < 50000).length,
            employees.data.filter(emp => emp.salary >= 50000 && emp.salary < 75000).length,
            employees.data.filter(emp => emp.salary >= 75000 && emp.salary < 100000).length,
            employees.data.filter(emp => emp.salary >= 100000 && emp.salary < 125000).length,
            employees.data.filter(emp => emp.salary >= 125000).length
          ]
        }
      };

      return { success: true, data: analyticsData };
    } catch (error) {
      throw new Error('Failed to fetch analytics data');
    }
  },

  // Get quick actions data
  getQuickActions: async (userRole) => {
    try {
      const quickActions = {
        admin: [
          { 
            id: 1, 
            title: 'Add Employee', 
            icon: 'user-plus', 
            link: '/employees', 
            color: 'blue',
            name: 'Add Employee'
          },
          { 
            id: 2, 
            title: 'Create Project', 
            icon: 'folder-plus', 
            link: '/projects', 
            color: 'green',
            name: 'Create Project'
          },
          { 
            id: 3, 
            title: 'Generate Report', 
            icon: 'file-text', 
            link: '/reports', 
            color: 'purple',
            name: 'Generate Report'
          },
          { 
            id: 4, 
            title: 'Manage Departments', 
            icon: 'building', 
            link: '/departments', 
            color: 'orange',
            name: 'Manage Departments'
          }
        ],
        manager: [
          { 
            id: 1, 
            title: 'Review Performance', 
            icon: 'star', 
            link: '/employees', 
            color: 'yellow',
            name: 'Review Performance'
          },
          { 
            id: 2, 
            title: 'Schedule Meeting', 
            icon: 'calendar', 
            link: '/employees', 
            color: 'blue',
            name: 'Schedule Meeting'
          },
          { 
            id: 3, 
            title: 'Approve Leave', 
            icon: 'check-circle', 
            link: '/employees', 
            color: 'green',
            name: 'Approve Leave'
          },
          { 
            id: 4, 
            title: 'Team Overview', 
            icon: 'users', 
            link: '/employees', 
            color: 'purple',
            name: 'Team Overview'
          }
        ],
        employee: [
          { 
            id: 1, 
            title: 'Request Leave', 
            icon: 'calendar-plus', 
            link: '/employees', 
            color: 'blue',
            name: 'Request Leave'
          },
          { 
            id: 2, 
            title: 'View Tasks', 
            icon: 'list', 
            link: '/tasks', 
            color: 'green',
            name: 'View Tasks'
          },
          { 
            id: 3, 
            title: 'Update Profile', 
            icon: 'user-edit', 
            link: '/profile', 
            color: 'purple',
            name: 'Update Profile'
          },
          { 
            id: 4, 
            title: 'View Reports', 
            icon: 'file-text', 
            link: '/reports', 
            color: 'orange',
            name: 'View Reports'
          }
        ]
      };

      return { success: true, data: quickActions[userRole] || quickActions.employee };
    } catch (error) {
      throw new Error('Failed to fetch quick actions');
    }
  },

  // Get notifications data
  getNotifications: async (userId) => {
    try {
      // Mock notifications - in real app would come from API
      const notifications = [
        {
          id: 1,
          title: 'Performance Review Due',
          message: 'Your annual performance review is scheduled for next week',
          type: 'warning',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false
        },
        {
          id: 2,
          title: 'Project Update',
          message: 'Project "Website Redesign" has been updated',
          type: 'info',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          read: true
        },
        {
          id: 3,
          title: 'Leave Approved',
          message: 'Your leave request for next month has been approved',
          type: 'success',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          read: false
        }
      ];

      return { success: true, data: notifications };
    } catch (error) {
      throw new Error('Failed to fetch notifications');
    }
  }
};

export default dashboardService; 