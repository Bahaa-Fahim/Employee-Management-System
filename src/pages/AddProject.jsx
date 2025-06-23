import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import ProjectForm from '../components/ProjectForm';
import Swal from 'sweetalert2';
import { FaPlusCircle } from 'react-icons/fa';
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
    <div className="add-project-bg" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div className="add-project-page" style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
        <div className="page-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FaPlusCircle style={{ color: '#667eea', fontSize: '2.2rem' }} />
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', margin: 0 }}>Add New Project</h1>
          </div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', marginTop: '0.5rem', textAlign: 'center' }}>
            Fill in the details below to create a new project.
          </p>
        </div>
        <div className="form-card" style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(102,126,234,0.10)', padding: '2.5rem 2rem', margin: '0 auto' }}>
          <ProjectForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleTeamChange={handleTeamChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProject; 