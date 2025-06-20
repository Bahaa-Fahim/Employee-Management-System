import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import ProjectForm from '../components/ProjectForm';
import Swal from 'sweetalert2';
import './Projects.css';

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, updateProject } = useProjects();
  
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

  useEffect(() => {
    const project = projects.find(p => p.id === parseInt(id));
    if (!project) {
      Swal.fire({
        title: 'Error',
        text: 'Project not found',
        icon: 'error'
      }).then(() => {
        navigate('/projects');
      });
      return;
    }
    
    setFormData({
      ...project,
      budget: project.budget.toString()
    });
  }, [id, projects, navigate]);

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
    
    const updatedProject = {
      ...formData,
      budget: parseInt(formData.budget)
    };
    
    await updateProject(updatedProject);
    
    Swal.fire({
      title: 'Project Updated Successfully!',
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
    <div className="edit-project-container">
      <div className="page-header">
        <h1>Edit Project</h1>
      </div>
      
      <ProjectForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleTeamChange={handleTeamChange}
        handleSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
};

export default EditProject; 