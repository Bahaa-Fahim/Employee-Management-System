import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectForm = ({ 
  formData, 
  handleInputChange, 
  handleTeamChange, 
  handleSubmit, 
  isEdit = false 
}) => {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Project Manager</label>
          <input
            type="text"
            name="manager"
            className="form-input"
            value={formData.manager}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            className="form-select"
            value={formData.priority}
            onChange={handleInputChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="form-input"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="date"
              name="endDate"
              className="form-input"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Budget ($)</label>
          <input
            type="number"
            name="budget"
            className="form-input"
            value={formData.budget}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Team Members</label>
          <input
            type="text"
            name="team"
            className="form-input"
            value={formData.team.join(', ')}
            onChange={handleTeamChange}
            placeholder="e.g., John Doe, Jane Smith, Mike Johnson"
          />
          <small className="form-help">Enter team member names separated by commas</small>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/projects')}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {isEdit ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm; 