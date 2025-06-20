import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('about'); // 'about' or 'skills'
  const [rightTab, setRightTab] = useState('about'); // 'about' or 'settings'
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/150?u=a042581f4e29026704d');

  const [formData, setFormData] = useState({
    name: user?.name || 'Dr. John Smith',
    email: user?.email || 'johndeo@example.com',
    phone: '264-625-2583',
    address: '456, Estern evenue, Courtrage area, New York',
    bio: "Completed my graduation in Arts from the well known and renowned institution of India – SARDAR PATEL ARTS COLLEGE, BARODA in 2000-01, which was affiliated to M.S. University. I ranker in University exams from the same university from 1996-01.",
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'HTML', 'CSS'],
    education: 'Worked as Professor and Head of the department at Sarda Collage, Rajkot, Gujarat from 2003-2015',
    experience: '5+ years in software development',
    department: user?.department || 'Technology',
    position: user?.position || 'Senior Employee',
    location: 'India',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [initialFormData] = useState(formData);
  const [initialProfileImage] = useState(profileImage);

  const stats = {
    following: 564,
    followers: '18k',
    posts: 565
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      Swal.fire('Error', 'New passwords do not match!', 'error');
      return;
    }
    console.log('Saving data:', formData);
    Swal.fire('Success', 'Profile updated successfully', 'success');
    setRightTab('about'); // Switch back to about tab
  };

  const handleCancel = () => {
    setFormData(initialFormData); // Revert changes
    setProfileImage(initialProfileImage);
    setRightTab('about');
  };

  return (
    <div className="profile-page-container">
      <div className="profile-page-header">
        <h1 className="profile-page-title">Profile</h1>
        <div className="breadcrumbs">
          <span>Employees</span> &gt; <span>Profile</span>
        </div>
      </div>

      <div className="profile-page-content">
        {/* Left Column */}
        <div className="profile-left-column">
          <div className="profile-card-dark">
            <div className="profile-avatar-container">
              <img src={profileImage} alt="Profile" className="profile-avatar-img" />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                style={{ display: 'none' }} 
                accept="image/*"
              />
              <button className="change-avatar-btn" onClick={() => fileInputRef.current.click()}>
                <i className="fas fa-camera"></i>
              </button>
            </div>
            <h2 className="profile-card-name">{formData.name}</h2>
            <p className="profile-card-role">{formData.position}</p>
            <div className="profile-contact-info">
              <p><i className="fas fa-map-marker-alt"></i> {formData.address}</p>
              <p><i className="fas fa-phone-alt"></i> {formData.phone}</p>
            </div>
            <div className="profile-card-stats">
              <div className="stat-item">
                <span className="stat-value">{stats.following}</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.posts}</span>
                <span className="stat-label">Post</span>
              </div>
            </div>
          </div>
          <div className="profile-tabs-card">
            <div className="tabs-nav">
              <button className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
                About
              </button>
              <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
                Skills
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'about' && (
                <p>{formData.bio}</p>
              )}
              {activeTab === 'skills' && (
                <div className="skills-grid">
                  {formData.skills.map(skill => (
                    <span key={skill} className="skill-badge">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="profile-right-column">
          <div className="profile-details-card">
            <div className="details-card-header">
              <button 
                className={`details-tab-btn ${rightTab === 'about' ? 'active' : ''}`}
                onClick={() => setRightTab('about')}
              >
                <i className="fas fa-user"></i> About Me
              </button>
              <button 
                className={`details-tab-btn ${rightTab === 'settings' ? 'active' : ''}`}
                onClick={() => setRightTab('settings')}
              >
                <i className="fas fa-cog"></i> Settings
              </button>
            </div>
            <div className="details-card-body">
              {rightTab === 'about' && (
                <>
                  <h3 className="section-heading">About</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Full Name</span>
                      <span className="info-value">{formData.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Mobile</span>
                      <span className="info-value">{formData.phone}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value">{formData.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Location</span>
                      <span className="info-value">{formData.location}</span>
                    </div>
                  </div>
                  <p className="bio-text">{formData.bio}</p>
                  <p className="bio-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  
                  <h3 className="section-heading">Education</h3>
                  <p className="bio-text">{formData.education}</p>
                </>
              )}

              {rightTab === 'settings' && (
                <form className="profile-settings-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <h3 className="section-heading">Edit Profile Information</h3>
                  <div className="settings-form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="form-input" />
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="form-input" />
                    </div>
                     <div className="form-group full-width">
                      <label className="form-label">Bio</label>
                      <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="form-textarea" rows="4"></textarea>
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Education</label>
                      <input type="text" name="education" value={formData.education} onChange={handleInputChange} className="form-input" />
                    </div>
                  </div>

                  <h3 className="section-heading">Change Password</h3>
                  <div className="settings-form-grid">
                    <div className="form-group">
                      <label className="form-label">Old Password</label>
                      <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleInputChange} className="form-input" placeholder="********" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} className="form-input" placeholder="********" />
                    </div>
                     <div className="form-group">
                      <label className="form-label">Confirm New Password</label>
                      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="form-input" placeholder="********" />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="form-btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="form-btn btn-primary">Save Changes</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
