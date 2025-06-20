import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      status: 'in-progress',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      budget: 25000,
      manager: 'Ahmed Mohamed',
      team: ['Fatima Ali', 'Mohamed Ahmed', 'Aisha Hassan'],
      progress: 65
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'iOS and Android mobile application for customer service',
      status: 'completed',
      priority: 'high',
      startDate: '2023-10-01',
      endDate: '2024-02-28',
      budget: 50000,
      manager: 'Fatima Ali',
      team: ['Omar Khalil', 'Mohamed Ahmed'],
      progress: 100
    },
    {
      id: 3,
      name: 'Database Migration',
      description: 'Migrate legacy database to cloud-based solution',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      budget: 15000,
      manager: 'Omar Khalil',
      team: ['Ahmed Mohamed', 'Aisha Hassan'],
      progress: 15
    }
  ]);

  const addProject = (newProject) => {
    setProjects(prevProjects => [...prevProjects, { ...newProject, id: Date.now() }]);
  };

  const updateProject = (updatedProject) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
  };

  const getProjectById = (projectId) => {
    return projects.find(project => project.id === parseInt(projectId));
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      getProjectById
    }}>
      {children}
    </ProjectContext.Provider>
  );
}; 