import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    bio: 'Experienced professional with a passion for excellence and continuous learning.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
    education: 'Bachelor of Science in Computer Science',
    experience: '5+ years in software development',
    department: user?.department || '',
    position: user?.position || ''
  });

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'login',
      text: 'Logged into the system',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'update',
      text: 'Updated profile information',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'report',
      text: 'Generated monthly report',
      time: '3 days ago'
    },
    {
      id: 4,
      type: 'meeting',
      text: 'Attended team meeting',
      time: '1 week ago'
    }
  ];

  const handleSave = () => {
    Swal.fire('Success', 'Profile updated successfully', 'success');
    setShowModal(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345',
      bio: 'Experienced professional with a passion for excellence and continuous learning.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
      education: 'Bachelor of Science in Computer Science',
      experience: '5+ years in software development',
      department: user?.department || '',
      position: user?.position || ''
    });
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login':
        return '🔐';
      case 'update':
        return '✏️';
      case 'report':
        return '📊';
      case 'meeting':
        return '👥';
      default:
        return '📝';
    }
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <button className="edit-profile-btn" onClick={() => setShowModal(true)}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Profile
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {getInitials(user?.name)}
            </div>
            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-role">{user?.position}</p>
            <p className="profile-department">{user?.department} Department</p>
          </div>
          
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="stat-number">156</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="profile-stat">
              <div className="stat-number">5.2</div>
              <div className="stat-label">Years</div>
            </div>
            <div className="profile-stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="profile-stat">
              <div className="stat-number">23</div>
              <div className="stat-label">Awards</div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="details-header">
            <h2 className="details-title">Personal Information</h2>
          </div>
          
          <div className="details-content">
            {/* Basic Information */}
            <div className="details-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{formData.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value email">{formData.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-value phone">{formData.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Address</span>
                  <span className="detail-value">{formData.address}</span>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="details-section">
              <h3 className="section-title">Professional Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Department</span>
                  <span className="detail-value">{formData.department}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Position</span>
                  <span className="detail-value">{formData.position}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Education</span>
                  <span className="detail-value">{formData.education}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Experience</span>
                  <span className="detail-value">{formData.experience}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="details-section">
              <h3 className="section-title">Bio</h3>
              <p className="detail-value">{formData.bio}</p>
            </div>

            {/* Skills */}
            <div className="details-section">
              <h3 className="section-title">Skills</h3>
              <div className="skills-section">
                <div className="skills-grid">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="activity-section">
        <div className="activity-header">
          <h2 className="activity-title">Recent Activity</h2>
        </div>
        <div className="activity-content">
          {activities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-content-details">
                <p className="activity-text">{activity.text}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Edit Profile</h2>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
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
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  className="form-textarea"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Education</label>
                <input
                  type="text"
                  name="education"
                  className="form-input"
                  value={formData.education}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Experience</label>
                <input
                  type="text"
                  name="experience"
                  className="form-input"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 