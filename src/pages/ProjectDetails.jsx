import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Projects.css';

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    name: 'Wordpress Website',
    status: 'Active',
    createdBy: 'Jayesh Patel',
    messages: 277,
    commits: 175,
    version: 'v2.5.2',
    progress: 60,
    lastUpdated: '22-08-2021 12:15:57',
    created: '17-05-2020',
    deadline: '22-09-2021',
    team: [
      { name: 'Anna', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { name: 'Lila', avatar: 'https://randomuser.me/api/portraits/women/47.jpg' },
      { name: 'Ella', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
      { name: 'John', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { name: 'Mike', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
      { name: 'Sara', avatar: 'https://randomuser.me/api/portraits/women/50.jpg' },
      { name: 'Tom', avatar: 'https://randomuser.me/api/portraits/men/60.jpg' },
    ],
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n\nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  }
];

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = mockProjects.find(p => String(p.id) === String(id));

  if (!project) {
    return (
      <div className="projects-container" style={{paddingTop: '2rem'}}>
        <div className="project-details-card" style={{padding: '2rem', textAlign: 'center'}}>
          <h2>Project Not Found</h2>
          <button className="form-btn btn-primary" style={{marginTop: '1rem'}} onClick={() => navigate('/projects')}>Back to Projects</button>
        </div>
      </div>
    );
  }

  const teamToShow = project.team.slice(0, 3);
  const extraCount = project.team.length - 3;

  return (
    <div className="projects-container" style={{background: '#f3f6fa', minHeight: '100vh', paddingTop: '2rem'}}>
      <div style={{display: 'flex', gap: '2rem', alignItems: 'flex-start'}}>
        {/* Main Card */}
        <div style={{flex: 2}}>
          <div style={{background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(102,126,234,0.08)', padding: '2.5rem 2rem', marginBottom: '2rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
              <h2 style={{fontWeight: 700, color: '#ff9800', fontSize: 32, margin: 0}}>{project.name}</h2>
              <button className="project-edit-link" style={{color: '#2196f3', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer'}} onClick={() => navigate(`/edit-project/${project.id}`)}>Edit project</button>
            </div>
            <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
              <div style={{flex: 1, minWidth: 220}}>
                <div style={{marginBottom: 12}}><b>Status:</b> <span style={{background: '#22c55e', color: 'white', borderRadius: 6, padding: '2px 12px', fontWeight: 600, fontSize: 15}}>{project.status}</span></div>
                <div style={{marginBottom: 8}}><b>Created by:</b> <span>{project.createdBy}</span></div>
                <div style={{marginBottom: 8}}><b>Messages:</b> <span>{project.messages}</span></div>
                <div style={{marginBottom: 8}}><b>Commits:</b> <span>{project.commits}</span></div>
                <div style={{marginBottom: 8}}><b>Version:</b> <span>{project.version}</span></div>
                <div style={{marginBottom: 8}}><b>Project Status:</b>
                  <div style={{marginTop: 4, marginBottom: 2, background: '#e5e7eb', borderRadius: 8, height: 8, width: '100%', position: 'relative'}}>
                    <div style={{width: `${project.progress}%`, background: '#3b82f6', height: '100%', borderRadius: 8}}></div>
                  </div>
                  <span style={{fontWeight: 600, color: '#059669', fontSize: 15}}>{project.progress}%</span> Project completed.
                </div>
              </div>
              <div style={{flex: 1, minWidth: 220}}>
                <div style={{marginBottom: 8}}><b>Last Updated:</b> <span>{project.lastUpdated}</span></div>
                <div style={{marginBottom: 8}}><b>Created:</b> <span>{project.created}</span></div>
                <div style={{marginBottom: 8}}><b>Deadline:</b> <span>{project.deadline}</span></div>
                <div style={{marginBottom: 8, display: 'flex', alignItems: 'center'}}><b>Team:</b>
                  <div style={{display: 'flex', alignItems: 'center', marginLeft: 8}}>
                    {teamToShow.map((member, idx) => (
                      <img key={member.name} src={member.avatar} alt={member.name} title={member.name} style={{width: 32, height: 32, borderRadius: '50%', border: '2px solid #fff', marginLeft: idx === 0 ? 0 : -12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)'}} />
                    ))}
                    {extraCount > 0 && (
                      <span style={{marginLeft: 4, background: '#a5b4fc', color: 'white', borderRadius: 12, padding: '2px 10px', fontWeight: 600, fontSize: 15}}>+{extraCount}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Description Card */}
        <div style={{flex: 1}}>
          <div style={{background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(102,126,234,0.08)', padding: '2.5rem 2rem'}}>
            <h2 style={{fontWeight: 700, color: '#374151', fontSize: 22, marginBottom: 16}}>Project description</h2>
            <div style={{color: '#374151', fontSize: 16, lineHeight: 1.7, whiteSpace: 'pre-line'}}>{project.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 