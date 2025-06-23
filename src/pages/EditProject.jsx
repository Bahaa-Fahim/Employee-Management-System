import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import ProjectForm from '../components/ProjectForm';
import Swal from 'sweetalert2';
import './Projects.css';
import { FaEdit } from 'react-icons/fa';

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
    <div className="edit-project-bg" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div className="edit-project-page" style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
        <div className="page-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FaEdit style={{ color: '#f59e0b', fontSize: '2.2rem' }} />
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', margin: 0 }}>Edit Project</h1>
          </div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', marginTop: '0.5rem', textAlign: 'center' }}>
            Update the details below to edit this project.
          </p>
        </div>
        <div className="form-card" style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(102,126,234,0.10)', padding: '2.5rem 2rem', margin: '0 auto' }}>
          <ProjectForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleTeamChange={handleTeamChange}
            handleSubmit={handleSubmit}
            isEdit={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProject; 