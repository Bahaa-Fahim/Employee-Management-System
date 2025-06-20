import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './employeeprofile.css';

const getEmployees = () => {
  // Try to get from localStorage (mock system)
  const saved = localStorage.getItem('mockUsers');
  if (saved) return JSON.parse(saved);
  // Fallback to initial mock data
  return [
    {
      id: 1,
      name: 'Ahmed Mohamed',
      email: 'ahmed.mohamed@company.com',
      department: 'IT',
      position: 'Software Developer',
      salary: 45000,
      status: 'active',
      hireDate: '2023-01-15',
      role: 'employee'
    },
    {
      id: 2,
      name: 'Fatima Ali',
      email: 'fatima.ali@company.com',
      department: 'HR',
      position: 'HR Manager',
      salary: 55000,
      status: 'active',
      hireDate: '2022-08-20',
      role: 'manager'
    },
    {
      id: 3,
      name: 'Mohamed Ahmed',
      email: 'mohamed.ahmed@company.com',
      department: 'Marketing',
      position: 'Marketing Specialist',
      salary: 40000,
      status: 'on-leave',
      hireDate: '2023-03-10',
      role: 'employee'
    },
    {
      id: 4,
      name: 'Aisha Hassan',
      email: 'aisha.hassan@company.com',
      department: 'Finance',
      position: 'Financial Analyst',
      salary: 48000,
      status: 'active',
      hireDate: '2022-11-05',
      role: 'employee'
    },
    {
      id: 5,
      name: 'Omar Khalil',
      email: 'omar.khalil@company.com',
      department: 'IT',
      position: 'System Administrator',
      salary: 52000,
      status: 'inactive',
      hireDate: '2021-06-15',
      role: 'employee'
    }
  ];
};

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about'); // 'about' or 'skills'

  // Mock data to complement employee object for the new design
  const mockDetails = {
    phone: '264-625-2583',
    address: '456, Estern evenue, Courtrage area, New York',
    bio: "A dedicated and results-oriented professional with extensive experience in their field. Known for strong analytical skills and a collaborative mindset.",
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'HTML', 'CSS'],
    education: 'Bachelor of Science in Computer Science, Cairo University (2018-2022)',
    location: 'India', // This is from the design, can be dynamic later
    stats: {
      following: 564,
      followers: '18k',
      posts: 565
    },
    avatar: 'https://i.pravatar.cc/150?u='
  };
  
  useEffect(() => {
    const employees = getEmployees();
    const found = employees.find(emp => String(emp.id) === String(id));
    setEmployee(found);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="profile-page-container">Loading...</div>;
  }

  if (!employee) {
    return (
      <div className="profile-page-container">
        <div className="profile-details-card" style={{padding: '2rem', textAlign: 'center'}}>
          <h2>Employee Not Found</h2>
          <p>The employee you are looking for does not exist.</p>
          <button className="form-btn btn-primary" style={{marginTop: '1rem'}} onClick={() => navigate('/employees')}>Back to Employees</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="profile-page-header">
        <h1 className="profile-page-title">Profile</h1>
        <div className="breadcrumbs">
          <span onClick={() => navigate('/employees')} style={{cursor: 'pointer'}}>Employees</span> &gt; <span>Profile</span>
        </div>
      </div>

      <div className="profile-page-content">
        {/* Left Column */}
        <div className="profile-left-column">
          <div className="profile-card-dark">
            <div className="profile-avatar-container">
              <img src={`${mockDetails.avatar}${employee.email}`} alt="Profile" className="profile-avatar-img" />
            </div>
            <h2 className="profile-card-name">{employee.name}</h2>
            <p className="profile-card-role">{employee.position}</p>
            <div className="profile-contact-info">
              <p><i className="fas fa-map-marker-alt"></i> {mockDetails.address}</p>
              <p><i className="fas fa-phone-alt"></i> {mockDetails.phone}</p>
            </div>
            <div className="profile-card-stats">
              <div className="stat-item">
                <span className="stat-value">{mockDetails.stats.following}</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{mockDetails.stats.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{mockDetails.stats.posts}</span>
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
                <p>{mockDetails.bio}</p>
              )}
              {activeTab === 'skills' && (
                <div className="skills-grid">
                  {mockDetails.skills.map(skill => (
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
              <button className="details-tab-btn active"><i className="fas fa-user"></i> About Me</button>
              {/* <button className="details-tab-btn"><i className="fas fa-cog"></i> Settings</button> */}
            </div>
            <div className="details-card-body">
              <h3 className="section-heading">About</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{employee.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Mobile</span>
                  <span className="info-value">{mockDetails.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{employee.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{mockDetails.location}</span>
                </div>
                 <div className="info-item">
                  <span className="info-label">Department</span>
                  <span className="info-value">{employee.department}</span>
                </div>
                 <div className="info-item">
                  <span className="info-label">Salary</span>
                  <span className="info-value">${employee.salary.toLocaleString()}</span>
                </div>
              </div>
              <p className="bio-text">{mockDetails.bio}</p>
              
              <h3 className="section-heading">Education</h3>
              <p className="bio-text">{mockDetails.education}</p>
              
              <h3 className="section-heading">Work Experience</h3>
              <p className="bio-text">Hired on {new Date(employee.hireDate).toLocaleDateString()} as a {employee.position}.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile; 