import { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('employee');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Mock data for reports
  const employeeData = [
    { department: 'IT', count: 45, percentage: 28.8 },
    { department: 'HR', count: 25, percentage: 16.0 },
    { department: 'Marketing', count: 30, percentage: 19.2 },
    { department: 'Finance', count: 20, percentage: 12.8 },
    { department: 'Sales', count: 35, percentage: 22.4 },
    { department: 'Operations', count: 1, percentage: 0.8 }
  ];

  const salaryData = [
    { range: '$30k - $50k', count: 25, percentage: 16.0 },
    { range: '$50k - $70k', count: 45, percentage: 28.8 },
    { range: '$70k - $90k', count: 35, percentage: 22.4 },
    { range: '$90k - $110k', count: 30, percentage: 19.2 },
    { range: '$110k+', count: 21, percentage: 13.6 }
  ];

  const performanceData = [
    { rating: 'Excellent', count: 30, percentage: 19.2 },
    { rating: 'Good', count: 65, percentage: 41.7 },
    { rating: 'Average', count: 45, percentage: 28.8 },
    { rating: 'Below Average', count: 12, percentage: 7.7 },
    { rating: 'Poor', count: 4, percentage: 2.6 }
  ];

  // Mock recent reports
  const recentReports = [
    {
      id: 1,
      name: 'Employee Distribution Report',
      type: 'employee',
      status: 'completed',
      generatedAt: '2024-01-15',
      generatedBy: 'Admin User',
      fileSize: '2.3 MB'
    },
    {
      id: 2,
      name: 'Salary Analysis Q4 2023',
      type: 'financial',
      status: 'completed',
      generatedAt: '2024-01-10',
      generatedBy: 'HR Manager',
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      name: 'Performance Metrics Report',
      type: 'performance',
      status: 'pending',
      generatedAt: '2024-01-12',
      generatedBy: 'Admin User',
      fileSize: '3.1 MB'
    },
    {
      id: 4,
      name: 'Department Budget Report',
      type: 'department',
      status: 'failed',
      generatedAt: '2024-01-08',
      generatedBy: 'Finance Manager',
      fileSize: '1.5 MB'
    }
  ];

  const getReportData = () => {
    switch (selectedReport) {
      case 'employee':
        return employeeData;
      case 'salary':
        return salaryData;
      case 'performance':
        return performanceData;
      default:
        return employeeData;
    }
  };

  const getReportTitle = () => {
    switch (selectedReport) {
      case 'employee':
        return 'Employees by Department';
      case 'salary':
        return 'Salary Distribution';
      case 'performance':
        return 'Performance Ratings';
      default:
        return 'Employees by Department';
    }
  };

  const getReportDescription = () => {
    switch (selectedReport) {
      case 'employee':
        return 'Distribution of employees across different departments';
      case 'salary':
        return 'Salary ranges and distribution across the organization';
      case 'performance':
        return 'Employee performance ratings and distribution';
      default:
        return 'Distribution of employees across different departments';
    }
  };

  const getBarColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500'
    ];
    return colors[index % colors.length];
  };

  // Calculate statistics
  const totalReports = recentReports.length;
  const completedReports = recentReports.filter(report => report.status === 'completed').length;
  const pendingReports = recentReports.filter(report => report.status === 'pending').length;
  const totalFileSize = recentReports.reduce((sum, report) => sum + parseFloat(report.fileSize), 0);

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <h1 className="reports-title">Reports & Analytics</h1>
        <button className="generate-report-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Generate Report
        </button>
      </div>

      {/* Filters */}
      <div className="filter-section">
        <div className="filter-group">
          <label className="filter-label">Report Type</label>
          <select 
            className="filter-select"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
          >
            <option value="employee">Employee Distribution</option>
            <option value="salary">Salary Analysis</option>
            <option value="performance">Performance Metrics</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Department</label>
          <select 
            className="filter-select"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="it">IT</option>
            <option value="hr">HR</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Date From</label>
          <input 
            type="date" 
            className="date-input"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Date To</label>
          <input 
            type="date" 
            className="date-input"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
        
        <button className="apply-filters-btn">
          Apply Filters
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">{totalReports}</div>
          <div className="stat-label">Total Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{completedReports}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{pendingReports}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalFileSize.toFixed(1)} MB</div>
          <div className="stat-label">Total Size</div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="reports-grid">
        <div className="report-card">
          <div className="report-header">
            <h3 className="report-title">Employee Distribution</h3>
            <p className="report-subtitle">Current employee count by department</p>
          </div>
          <div className="report-content">
            <div className="report-metric">
              <span className="metric-label">Total Employees</span>
              <span className="metric-value">156</span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Departments</span>
              <span className="metric-value">6</span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Avg per Dept</span>
              <span className="metric-value">26</span>
            </div>
          </div>
          <div className="report-actions">
            <button className="report-btn view-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </button>
            <button className="report-btn download-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          </div>
        </div>

        <div className="report-card">
          <div className="report-header">
            <h3 className="report-title">Salary Analysis</h3>
            <p className="report-subtitle">Salary distribution and trends</p>
          </div>
          <div className="report-content">
            <div className="report-metric">
              <span className="metric-label">Avg Salary</span>
              <span className="metric-value">$72,500</span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Highest</span>
              <span className="metric-value">$125,000</span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Lowest</span>
              <span className="metric-value">$35,000</span>
            </div>
          </div>
          <div className="report-actions">
            <button className="report-btn view-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </button>
            <button className="report-btn download-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          </div>
        </div>

        <div className="report-card">
          <div className="report-header">
            <h3 className="report-title">Performance Metrics</h3>
            <p className="report-subtitle">Employee performance overview</p>
          </div>
          <div className="report-content">
            <div className="report-metric">
              <span className="metric-label">Avg Rating</span>
              <span className="metric-value">3.8/5</span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Top Performers</span>
              <span className="metric-value">30</span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Needs Improvement</span>
              <span className="metric-value">16</span>
            </div>
          </div>
          <div className="report-actions">
            <button className="report-btn view-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </button>
            <button className="report-btn download-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="chart-container">
        <div className="chart-header">
          <h2 className="chart-title">{getReportTitle()}</h2>
        </div>
        <div className="chart-content">
          <div className="chart-placeholder">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3>Chart Visualization</h3>
            <p>Interactive chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Recent Reports</h2>
        </div>
        <div className="table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Generated At</th>
                <th>Generated By</th>
                <th>File Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map(report => (
                <tr key={report.id}>
                  <td>{report.name}</td>
                  <td>
                    <span className={`report-type-badge ${report.type}`}>
                      {report.type}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${report.status}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>{new Date(report.generatedAt).toLocaleDateString()}</td>
                  <td>{report.generatedBy}</td>
                  <td>{report.fileSize}</td>
                  <td>
                    <div className="actions-buttons">
                      <button className="action-btn edit-btn" title="View Report">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="action-btn delete-btn" title="Download Report">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports; 