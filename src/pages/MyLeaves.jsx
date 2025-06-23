import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './MyLeaves.css';

const MyLeaves = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    reason: '',
    type: 'Vacation'
  });

  // Mock data for employee leaves
  const mockLeaves = [
    {
      id: 1,
      applicationDate: '2024-01-05',
      fromDate: '2024-01-15',
      toDate: '2024-01-17',
      reason: 'Family vacation',
      type: 'Vacation',
      status: 'Approved',
      days: 3
    },
    {
      id: 2,
      applicationDate: '2024-01-10',
      fromDate: '2024-01-20',
      toDate: '2024-01-20',
      reason: 'Medical appointment',
      type: 'Medical',
      status: 'Pending',
      days: 1
    },
    {
      id: 3,
      applicationDate: '2024-01-12',
      fromDate: '2024-01-25',
      toDate: '2024-01-26',
      reason: 'Personal emergency',
      type: 'Personal',
      status: 'Rejected',
      days: 2
    }
  ];

  useEffect(() => {
    setLeaves(mockLeaves);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'approved';
      case 'Pending': return 'pending';
      case 'Rejected': return 'rejected';
      default: return 'pending';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Vacation': return 'vacation';
      case 'Medical': return 'medical';
      case 'Personal': return 'personal';
      case 'Sick': return 'sick';
      default: return 'vacation';
    }
  };

  const calculateDays = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      id: Date.now(),
      applicationDate: new Date().toISOString().split('T')[0],
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      reason: formData.reason,
      type: formData.type,
      status: 'Pending',
      days: calculateDays(formData.fromDate, formData.toDate)
    };
    setLeaves([newLeave, ...leaves]);
    setFormData({ fromDate: '', toDate: '', reason: '', type: 'Vacation' });
    setShowForm(false);
  };

  return (
    <div className="my-leaves-container">
      <div className="leaves-header">
        <h1>My Leave Requests</h1>
        <p>Manage and track your leave applications</p>
        <button className="new-leave-btn" onClick={() => setShowForm(true)}>
          + Request Leave
        </button>
      </div>

      {showForm && (
        <div className="leave-form-overlay">
          <div className="leave-form-modal">
            <div className="form-header">
              <h2>Request Leave from Manager</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleFormSubmit} className="leave-form">
              <div className="form-group">
                <label>Leave Type</label>
                <select name="type" value={formData.type} onChange={handleFormChange} required>
                  <option value="Vacation">Vacation</option>
                  <option value="Medical">Medical</option>
                  <option value="Personal">Personal</option>
                  <option value="Sick">Sick Leave</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>From Date</label>
                  <input type="date" name="fromDate" value={formData.fromDate} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input type="date" name="toDate" value={formData.toDate} onChange={handleFormChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Reason</label>
                <textarea name="reason" value={formData.reason} onChange={handleFormChange} required rows="3" placeholder="Please provide a reason for your leave request..." />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="leaves-stats">
        <div className="stat-card">
          <div className="stat-number">{leaves.length}</div>
          <div className="stat-label">Total Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{leaves.filter(l => l.status === 'Approved').length}</div>
          <div className="stat-label">Approved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{leaves.filter(l => l.status === 'Pending').length}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{leaves.filter(l => l.status === 'Rejected').length}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      <div className="leaves-list">
        {leaves.map(leave => (
          <div key={leave.id} className="leave-card">
            <div className="leave-header">
              <div className="leave-info">
                <h3 className="leave-type">{leave.type}</h3>
                <p className="leave-reason">{leave.reason}</p>
              </div>
              <div className="leave-badges">
                <span className={`type-badge ${getTypeColor(leave.type)}`}>
                  {leave.type}
                </span>
                <span className={`status-badge ${getStatusColor(leave.status)}`}>
                  {leave.status}
                </span>
              </div>
            </div>
            <div className="leave-details">
              <div className="detail-item">
                <span className="detail-label">Application Date:</span>
                <span className="detail-value">{new Date(leave.applicationDate).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">From:</span>
                <span className="detail-value">{new Date(leave.fromDate).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">To:</span>
                <span className="detail-value">{new Date(leave.toDate).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Days:</span>
                <span className="detail-value">{leave.days} day(s)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLeaves; 