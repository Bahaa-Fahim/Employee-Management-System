import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import ProjectForm from '../components/ProjectForm';
import Swal from 'sweetalert2';
import './Projects.css';

const AddProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning',
    priority: 'medium',
    startDate: '',
    endDate: '',
    budget: '',
    manager: '',
    team: []
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTeamChange = (e) => {
    const teamMembers = e.target.value.split(',').map(member => member.trim()).filter(member => member);
    setFormData({
      ...formData,
      team: teamMembers
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newProject = {
      ...formData,
      id: Date.now(),
      budget: parseInt(formData.budget),
      progress: 0
    };
    
    await addProject(newProject);
    
    Swal.fire({
      title: 'Project Added Successfully!',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>Project:</strong> ${formData.name}</p>
          <p><strong>Manager:</strong> ${formData.manager}</p>
          <p><strong>Status:</strong> ${formData.status.replace('-', ' ')}</p>
          <p><strong>Priority:</strong> ${formData.priority}</p>
          <p><strong>Budget:</strong> $${parseInt(formData.budget).toLocaleString()}</p>
          <p><strong>Team Size:</strong> ${formData.team.length} members</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#059669'
    }).then(() => {
      navigate('/projects');
    });
  };

  return (
    <div className="add-project-container">
      <div className="page-header">
        <h1>Add New Project</h1>
      </div>
      
      <ProjectForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleTeamChange={handleTeamChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProject; 