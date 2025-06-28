import { useState } from 'react';
import Swal from 'sweetalert2';
import './Reports.css';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('employee');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showChart, setShowChart] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  // Form data for report generation
  const [reportForm, setReportForm] = useState({
    name: '',
    type: 'employee',
    department: 'all',
    dateFrom: '',
    dateTo: '',
    format: 'pdf',
    includeCharts: true,
    includeTables: true
  });

  // Mock data for reports
  const employeeData = [
    { department: 'IT', count: 45, percentage: 28.8, color: 'bg-blue-500' },
    { department: 'HR', count: 25, percentage: 16.0, color: 'bg-green-500' },
    { department: 'Marketing', count: 30, percentage: 19.2, color: 'bg-purple-500' },
    { department: 'Finance', count: 20, percentage: 12.8, color: 'bg-yellow-500' },
    { department: 'Sales', count: 35, percentage: 22.4, color: 'bg-red-500' },
    { department: 'Operations', count: 1, percentage: 0.8, color: 'bg-gray-500' }
  ];

  const salaryData = [
    { range: '$30k - $50k', count: 25, percentage: 16.0, color: 'bg-blue-500' },
    { range: '$50k - $70k', count: 45, percentage: 28.8, color: 'bg-green-500' },
    { range: '$70k - $90k', count: 35, percentage: 22.4, color: 'bg-yellow-500' },
    { range: '$90k - $110k', count: 30, percentage: 19.2, color: 'bg-orange-500' },
    { range: '$110k+', count: 21, percentage: 13.6, color: 'bg-red-500' }
  ];

  const performanceData = [
    { rating: 'Excellent', count: 30, percentage: 19.2, color: 'bg-green-500' },
    { rating: 'Good', count: 65, percentage: 41.7, color: 'bg-blue-500' },
    { rating: 'Average', count: 45, percentage: 28.8, color: 'bg-yellow-500' },
    { rating: 'Below Average', count: 12, percentage: 7.7, color: 'bg-orange-500' },
    { rating: 'Poor', count: 4, percentage: 2.6, color: 'bg-red-500' }
  ];

  const attendanceData = [
    { month: 'Jan', present: 95, absent: 5, late: 3 },
    { month: 'Feb', present: 92, absent: 8, late: 4 },
    { month: 'Mar', present: 88, absent: 12, late: 6 },
    { month: 'Apr', present: 94, absent: 6, late: 2 },
    { month: 'May', present: 91, absent: 9, late: 5 },
    { month: 'Jun', present: 96, absent: 4, late: 1 }
  ];

  // Mock recent reports
  const [recentReports, setRecentReports] = useState([
    {
      id: 1,
      name: 'Employee Distribution Report',
      type: 'employee',
      status: 'completed',
      generatedAt: '2024-01-15',
      generatedBy: 'Admin User',
      fileSize: '2.3 MB',
      downloads: 45
    },
    {
      id: 2,
      name: 'Salary Analysis Q4 2023',
      type: 'financial',
      status: 'completed',
      generatedAt: '2024-01-10',
      generatedBy: 'HR Manager',
      fileSize: '1.8 MB',
      downloads: 32
    },
    {
      id: 3,
      name: 'Performance Metrics Report',
      type: 'performance',
      status: 'pending',
      generatedAt: '2024-01-12',
      generatedBy: 'Admin User',
      fileSize: '3.1 MB',
      downloads: 0
    },
    {
      id: 4,
      name: 'Department Budget Report',
      type: 'department',
      status: 'failed',
      generatedAt: '2024-01-08',
      generatedBy: 'Finance Manager',
      fileSize: '1.5 MB',
      downloads: 18
    },
    {
      id: 5,
      name: 'Attendance Analysis Report',
      type: 'attendance',
      status: 'completed',
      generatedAt: '2024-01-05',
      generatedBy: 'HR Manager',
      fileSize: '2.1 MB',
      downloads: 28
    }
  ]);

  const getReportData = () => {
    switch (selectedReport) {
      case 'employee':
        return employeeData;
      case 'salary':
        return salaryData;
      case 'performance':
        return performanceData;
      case 'attendance':
        return attendanceData;
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
      case 'attendance':
        return 'Attendance Trends';
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
      case 'attendance':
        return 'Monthly attendance trends and patterns';
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
  const totalDownloads = recentReports.reduce((sum, report) => sum + report.downloads, 0);

  const handleGenerateReport = () => {
    setShowGenerateModal(true);
  };

  const handleReportFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReportForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitReport = async () => {
    if (!reportForm.name.trim()) {
      Swal.fire('Error', 'Please enter a report name', 'error');
      return;
    }

    setGeneratingReport(true);

    // Simulate report generation
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        name: reportForm.name,
        type: reportForm.type,
        status: 'completed',
        generatedAt: new Date().toISOString().split('T')[0],
        generatedBy: 'Admin User',
        fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        downloads: 0
      };

      setRecentReports(prev => [newReport, ...prev]);
      setShowGenerateModal(false);
      setGeneratingReport(false);
      setReportForm({
        name: '',
        type: 'employee',
        department: 'all',
        dateFrom: '',
        dateTo: '',
        format: 'pdf',
        includeCharts: true,
        includeTables: true
      });

      Swal.fire({
        title: 'Report Generated!',
        text: `${reportForm.name} has been successfully generated.`,
        icon: 'success',
        confirmButtonText: 'Download',
        showCancelButton: true,
        cancelButtonText: 'Close'
      }).then((result) => {
        if (result.isConfirmed) {
          // Simulate download
          Swal.fire('Download Started', 'Your report is being downloaded...', 'info');
        }
      });
    }, 2000);
  };

  const renderChart = () => {
    const data = getReportData();
    
    if (selectedReport === 'attendance') {
      return (
        <div className="attendance-chart">
          <div className="chart-bars">
            {data.map((item, index) => (
              <div key={index} className="chart-bar-group">
                <div className="bar-label">{item.month}</div>
                <div className="bar-container">
                  <div 
                    className="bar present-bar" 
                    style={{ height: `${item.present}%` }}
                    title={`Present: ${item.present}%`}
                  ></div>
                  <div 
                    className="bar absent-bar" 
                    style={{ height: `${item.absent}%` }}
                    title={`Absent: ${item.absent}%`}
                  ></div>
                  <div 
                    className="bar late-bar" 
                    style={{ height: `${item.late}%` }}
                    title={`Late: ${item.late}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color present-color"></div>
              <span>Present</span>
            </div>
            <div className="legend-item">
              <div className="legend-color absent-color"></div>
              <span>Absent</span>
            </div>
            <div className="legend-item">
              <div className="legend-color late-color"></div>
              <span>Late</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="chart-bar-group">
            <div className="bar-label">{item.department || item.range || item.rating}</div>
            <div className="bar-container">
              <div 
                className={`bar ${item.color || getBarColor(index)}`}
                style={{ height: `${item.percentage * 2}%` }}
                title={`${item.count} (${item.percentage}%)`}
              ></div>
            </div>
            <div className="bar-value">{item.count}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <div>
          <h1 className="reports-title">Reports & Analytics</h1>
          <p className="reports-subtitle">Comprehensive insights and data analysis for your organization</p>
        </div>
        <button className="generate-report-btn" onClick={handleGenerateReport}>
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
            <option value="attendance">Attendance Trends</option>
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
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          Apply Filters
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="stat-value">{totalReports}</div>
          <div className="stat-label">Total Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-value">{completedReports}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-value">{pendingReports}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div className="stat-value">{totalDownloads}</div>
          <div className="stat-label">Downloads</div>
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

        <div className="report-card">
          <div className="report-header">
            <h3 className="report-title">Attendance Trends</h3>
            <p className="report-subtitle">Monthly attendance patterns</p>
          </div>
          <div className="report-content">
            <div className="report-metric">
              <span className="metric-label">Avg Attendance</span>
              <span className="metric-value">93.2%</span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Best Month</span>
              <span className="metric-value">June (96%)</span>
            </div>
            <div className="report-metric">
              <span className="metric-label">Late Arrivals</span>
              <span className="metric-value">3.5%</span>
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
          <div>
            <h2 className="chart-title">{getReportTitle()}</h2>
            <p className="chart-subtitle">{getReportDescription()}</p>
          </div>
          <div className="chart-controls">
            <button 
              className={`chart-toggle-btn ${showChart ? 'active' : ''}`}
              onClick={() => setShowChart(true)}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Chart
            </button>
            <button 
              className={`chart-toggle-btn ${!showChart ? 'active' : ''}`}
              onClick={() => setShowChart(false)}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Table
            </button>
          </div>
        </div>
        <div className="chart-content">
          {showChart ? (
            <div className="chart-visualization">
              {renderChart()}
            </div>
          ) : (
            <div className="chart-table">
              <table className="data-table">
                <thead>
                  <tr>
                    {selectedReport === 'attendance' ? (
                      <>
                        <th>Month</th>
                        <th>Present (%)</th>
                        <th>Absent (%)</th>
                        <th>Late (%)</th>
                      </>
                    ) : (
                      <>
                        <th>{selectedReport === 'employee' ? 'Department' : selectedReport === 'salary' ? 'Salary Range' : 'Rating'}</th>
                        <th>Count</th>
                        <th>Percentage</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {getReportData().map((item, index) => (
                    <tr key={index}>
                      {selectedReport === 'attendance' ? (
                        <>
                          <td>{item.month}</td>
                          <td>{item.present}%</td>
                          <td>{item.absent}%</td>
                          <td>{item.late}%</td>
                        </>
                      ) : (
                        <>
                          <td>{item.department || item.range || item.rating}</td>
                          <td>{item.count}</td>
                          <td>{item.percentage}%</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
                <th>Downloads</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map(report => (
                <tr key={report.id} className="report-row">
                  <td>
                    <div className="report-name">
                      <span className="report-title-text">{report.name}</span>
                    </div>
                  </td>
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
                    <div className="downloads-info">
                      <span className="downloads-count">{report.downloads}</span>
                      <span className="downloads-label">downloads</span>
                    </div>
                  </td>
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

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="modal-overlay" onClick={() => setShowGenerateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Generate New Report</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setShowGenerateModal(false)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitReport(); }}>
              <div className="form-group">
                <label className="form-label">Report Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={reportForm.name}
                  onChange={handleReportFormChange}
                  placeholder="Enter report name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Report Type *</label>
                <select
                  name="type"
                  className="form-select"
                  value={reportForm.type}
                  onChange={handleReportFormChange}
                  required
                >
                  <option value="employee">Employee Distribution</option>
                  <option value="salary">Salary Analysis</option>
                  <option value="performance">Performance Metrics</option>
                  <option value="attendance">Attendance Trends</option>
                  <option value="financial">Financial Report</option>
                  <option value="department">Department Report</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  name="department"
                  className="form-select"
                  value={reportForm.department}
                  onChange={handleReportFormChange}
                >
                  <option value="all">All Departments</option>
                  <option value="it">IT</option>
                  <option value="hr">HR</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date From</label>
                  <input
                    type="date"
                    name="dateFrom"
                    className="form-input"
                    value={reportForm.dateFrom}
                    onChange={handleReportFormChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Date To</label>
                  <input
                    type="date"
                    name="dateTo"
                    className="form-input"
                    value={reportForm.dateTo}
                    onChange={handleReportFormChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Output Format</label>
                <select
                  name="format"
                  className="form-select"
                  value={reportForm.format}
                  onChange={handleReportFormChange}
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              
              <div className="form-group">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="includeCharts"
                      checked={reportForm.includeCharts}
                      onChange={handleReportFormChange}
                    />
                    {/* <span className="checkmark"></span> */}
                    Include Charts
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="includeTables"
                      checked={reportForm.includeTables}
                      onChange={handleReportFormChange}
                    />
                    Include Tables
                  </label>
                </div>
              </div>
              
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowGenerateModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={generatingReport}
                >
                  {generatingReport ? (
                    <>
                      <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    'Generate Report'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports; 