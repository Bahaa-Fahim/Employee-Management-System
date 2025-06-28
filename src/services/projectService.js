import { projectsAPI } from './api';

export const projectService = {
  // Get all projects with pagination and filtering
  getAllProjects: async (params = {}) => {
    try {
      const { page = 1, limit = 10, status = '', department = '', priority = '' } = params;
      const response = await projectsAPI.getAll();
      let projects = response.data;

      // Apply filters
      if (status) {
        projects = projects.filter(project => project.status === status);
      }
      if (department) {
        projects = projects.filter(project => project.department === department);
      }
      if (priority) {
        projects = projects.filter(project => project.priority === priority);
      }

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProjects = projects.slice(startIndex, endIndex);

      return {
        success: true,
        data: paginatedProjects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: projects.length,
          totalPages: Math.ceil(projects.length / limit)
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch projects');
    }
  },

  // Get project by ID
  getProjectById: async (id) => {
    try {
      const response = await projectsAPI.getById(id);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Project not found');
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      // Validate required fields
      const requiredFields = ['name', 'description', 'department', 'startDate', 'endDate'];
      for (const field of requiredFields) {
        if (!projectData[field]) {
          throw new Error(`${field} is required`);
        }
      }

      // Validate dates
      const startDate = new Date(projectData.startDate);
      const endDate = new Date(projectData.endDate);
      if (startDate >= endDate) {
        throw new Error('End date must be after start date');
      }

      const response = await projectsAPI.create(projectData);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to create project');
    }
  },

  // Update project
  updateProject: async (id, projectData) => {
    try {
      const response = await projectsAPI.update(id, projectData);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to update project');
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      await projectsAPI.delete(id);
      return { success: true, message: 'Project deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete project');
    }
  },

  // Get projects by status
  getProjectsByStatus: async (status) => {
    try {
      const response = await projectsAPI.getByStatus(status);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to fetch projects by status');
    }
  },

  // Get projects by department
  getProjectsByDepartment: async (department) => {
    try {
      const response = await projectsAPI.getByDepartment(department);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to fetch projects by department');
    }
  },

  // Get project statistics
  getProjectStats: async () => {
    try {
      const response = await projectsAPI.getAll();
      const projects = response.data;
      
      const stats = {
        total: projects.length,
        active: projects.filter(project => project.status === 'active').length,
        completed: projects.filter(project => project.status === 'completed').length,
        onHold: projects.filter(project => project.status === 'on-hold').length,
        cancelled: projects.filter(project => project.status === 'cancelled').length,
        departments: {},
        priorities: {}
      };

      // Count by department
      projects.forEach(project => {
        stats.departments[project.department] = (stats.departments[project.department] || 0) + 1;
      });

      // Count by priority
      projects.forEach(project => {
        stats.priorities[project.priority] = (stats.priorities[project.priority] || 0) + 1;
      });

      return { success: true, data: stats };
    } catch (error) {
      throw new Error('Failed to fetch project statistics');
    }
  },

  // Update project status
  updateProjectStatus: async (projectId, status) => {
    try {
      const currentProject = await projectsAPI.getById(projectId);
      const updatedProject = {
        ...currentProject.data,
        status,
        lastUpdated: new Date().toISOString()
      };
      
      const response = await projectsAPI.update(projectId, updatedProject);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to update project status');
    }
  },

  // Add team member to project
  addTeamMember: async (projectId, employeeId) => {
    try {
      const currentProject = await projectsAPI.getById(projectId);
      const teamMembers = currentProject.data.teamMembers || [];
      
      if (teamMembers.includes(employeeId)) {
        throw new Error('Employee is already a team member');
      }

      const updatedProject = {
        ...currentProject.data,
        teamMembers: [...teamMembers, employeeId]
      };
      
      const response = await projectsAPI.update(projectId, updatedProject);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.message || 'Failed to add team member');
    }
  },

  // Remove team member from project
  removeTeamMember: async (projectId, employeeId) => {
    try {
      const currentProject = await projectsAPI.getById(projectId);
      const teamMembers = currentProject.data.teamMembers || [];
      
      const updatedTeamMembers = teamMembers.filter(id => id !== employeeId);
      
      const updatedProject = {
        ...currentProject.data,
        teamMembers: updatedTeamMembers
      };
      
      const response = await projectsAPI.update(projectId, updatedProject);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error('Failed to remove team member');
    }
  },

  // Get project timeline
  getProjectTimeline: async (projectId) => {
    try {
      const response = await projectsAPI.getById(projectId);
      const project = response.data;
      
      const timeline = [
        {
          id: 1,
          title: 'Project Started',
          date: project.startDate,
          status: 'completed',
          description: 'Project initiation phase completed'
        },
        {
          id: 2,
          title: 'Planning Phase',
          date: new Date(project.startDate).getTime() + (7 * 24 * 60 * 60 * 1000), // 1 week after start
          status: project.status === 'active' ? 'completed' : 'pending',
          description: 'Project planning and requirements gathering'
        },
        {
          id: 3,
          title: 'Development Phase',
          date: new Date(project.startDate).getTime() + (21 * 24 * 60 * 60 * 1000), // 3 weeks after start
          status: ['active', 'completed'].includes(project.status) ? 'completed' : 'pending',
          description: 'Core development and implementation'
        },
        {
          id: 4,
          title: 'Testing Phase',
          date: new Date(project.endDate).getTime() - (7 * 24 * 60 * 60 * 1000), // 1 week before end
          status: project.status === 'completed' ? 'completed' : 'pending',
          description: 'Testing and quality assurance'
        },
        {
          id: 5,
          title: 'Project Completed',
          date: project.endDate,
          status: project.status === 'completed' ? 'completed' : 'pending',
          description: 'Project delivery and closure'
        }
      ];

      return { success: true, data: timeline };
    } catch (error) {
      throw new Error('Failed to fetch project timeline');
    }
  },

  // Get project progress
  getProjectProgress: async (projectId) => {
    try {
      const response = await projectsAPI.getById(projectId);
      const project = response.data;
      
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);
      const currentDate = new Date();
      
      const totalDuration = endDate - startDate;
      const elapsedDuration = currentDate - startDate;
      
      let progress = 0;
      if (elapsedDuration > 0) {
        progress = Math.min((elapsedDuration / totalDuration) * 100, 100);
      }
      
      if (project.status === 'completed') {
        progress = 100;
      } else if (project.status === 'cancelled') {
        progress = 0;
      }

      return {
        success: true,
        data: {
          progress: Math.round(progress),
          status: project.status,
          startDate: project.startDate,
          endDate: project.endDate,
          daysRemaining: Math.max(0, Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)))
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch project progress');
    }
  },

  // Export project data
  exportProjectData: async (filters = {}) => {
    try {
      const response = await projectsAPI.getAll();
      let projects = response.data;

      // Apply filters
      if (filters.status) {
        projects = projects.filter(project => project.status === filters.status);
      }
      if (filters.department) {
        projects = projects.filter(project => project.department === filters.department);
      }

      // Format data for export
      const exportData = projects.map(project => ({
        ID: project.id,
        Name: project.name,
        Description: project.description,
        Department: project.department,
        Status: project.status,
        Priority: project.priority,
        'Start Date': project.startDate,
        'End Date': project.endDate,
        Budget: project.budget || 'N/A',
        'Team Size': project.teamMembers?.length || 0,
        Manager: project.manager || 'N/A'
      }));

      return { success: true, data: exportData };
    } catch (error) {
      throw new Error('Failed to export project data');
    }
  }
};

export default projectService; 