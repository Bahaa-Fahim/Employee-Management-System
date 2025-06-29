import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiShare2, FiPrinter, FiEye, FiBarChart3, FiPieChart, FiTrendingUp, FiCalendar, FiUser, FiFileText } from 'react-icons/fi';
import Swal from 'sweetalert2';
import './ReportDetails.css';

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock report data - in real app this would come from API
  const mockReports = [
    {
      id: 1,
      name: 'Employee Distribution Report',
      type: 'employee',
      status: 'completed',
      generatedAt: '2024-01-15',
      generatedBy: 'Admin User',
      fileSize: '2.3 MB',
      downloads: 45,
      description: 'Comprehensive analysis of employee distribution across all departments including demographics, positions, and performance metrics.',
      department: 'All Departments',
      dateRange: 'Jan 1, 2024 - Jan 15, 2024',
      format: 'PDF',
      includeCharts: true,
      includeTables: true,
      summary: {
        totalEmployees: 156,
        departments: 6,
        averageSalary: 75000,
        topDepartment: 'IT',
        growthRate: 12.5
      },
      charts: [
        {
          type: 'pie',
          title: 'Department Distribution',
          data: [
            { department: 'IT', count: 45, percentage: 28.8, color: '#3b82f6' },
            { department: 'HR', count: 25, percentage: 16.0, color: '#10b981' },
            { department: 'Marketing', count: 30, percentage: 19.2, color: '#8b5cf6' },
            { department: 'Finance', count: 20, percentage: 12.8, color: '#f59e0b' },
            { department: 'Sales', count: 35, percentage: 22.4, color: '#ef4444' },
            { department: 'Operations', count: 1, percentage: 0.8, color: '#6b7280' }
          ]
        },
        {
          type: 'bar',
          title: 'Salary Distribution',
          data: [
            { range: '$30k - $50k', count: 25, color: '#3b82f6' },
            { range: '$50k - $70k', count: 45, color: '#10b981' },
            { range: '$70k - $90k', count: 35, color: '#f59e0b' },
            { range: '$90k - $110k', count: 30, color: '#8b5cf6' },
            { range: '$110k+', count: 21, color: '#ef4444' }
          ]
        }
      ],
      insights: [
        'IT department has the highest number of employees (45)',
        'Average salary across all departments is $75,000',
        '12.5% growth in employee count compared to last quarter',
        'Sales department shows highest salary variance',
        'Operations department needs immediate attention for growth'
      ],
      recommendations: [
        'Consider expanding IT department due to high demand',
        'Implement salary standardization across departments',
        'Focus on Operations department recruitment',
        'Review Sales department compensation structure',
        'Plan for HR department expansion'
      ]
    },
    {
      id: 2,
      name: 'Salary Analysis Q4 2023',
      type: 'financial',
      status: 'completed',
      generatedAt: '2024-01-10',
      generatedBy: 'HR Manager',
      fileSize: '1.8 MB',
      downloads: 32,
      description: 'Detailed financial analysis of salary structures, compensation trends, and budget allocation across all departments.',
      department: 'All Departments',
      dateRange: 'Oct 1, 2023 - Dec 31, 2023',
      format: 'Excel',
      includeCharts: true,
      includeTables: true,
      summary: {
        totalBudget: 12000000,
        averageSalary: 78000,
        highestSalary: 150000,
        lowestSalary: 35000,
        budgetUtilization: 94.2
      },
      charts: [
        {
          type: 'bar',
          title: 'Department Budget Allocation',
          data: [
            { department: 'IT', budget: 3200000, color: '#3b82f6' },
            { department: 'Sales', budget: 2800000, color: '#ef4444' },
            { department: 'Marketing', budget: 1800000, color: '#8b5cf6' },
            { department: 'Finance', budget: 1500000, color: '#f59e0b' },
            { department: 'HR', budget: 1200000, color: '#10b981' },
            { department: 'Operations', budget: 500000, color: '#6b7280' }
          ]
        }
      ],
      insights: [
        'IT department has the highest budget allocation ($3.2M)',
        '94.2% of total budget is utilized effectively',
        'Average salary increased by 8% compared to Q3',
        'Sales department shows highest salary variance',
        'Operations department has lowest budget allocation'
      ],
      recommendations: [
        'Increase Operations department budget',
        'Review IT department salary structure',
        'Implement performance-based bonuses',
        'Consider cost-of-living adjustments',
        'Plan for annual salary reviews'
      ]
    }
  ];

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = async () => {
    try {
      setLoading(true);
      // Simulate API call
      const foundReport = mockReports.find(r => r.id === parseInt(id));
      if (foundReport) {
        setReport(foundReport);
      } else {
        Swal.fire('Error', 'Report not found', 'error');
        navigate('/reports');
      }
    } catch (error) {
      console.error('Failed to load report:', error);
      Swal.fire('Error', 'Failed to load report details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    Swal.fire('Success', 'Report download started', 'success');
  };

  const handleShare = () => {
    Swal.fire('Info', 'Share functionality will be implemented soon', 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'employee': return FiUser;
      case 'financial': return FiBarChart3;
      case 'performance': return FiTrendingUp;
      case 'attendance': return FiCalendar;
      default: return FiFileText;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Not Found</h2>
          <Link to="/reports" className="text-blue-600 hover:text-blue-800">
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  const TypeIcon = getTypeIcon(report.type);

  return (
    <div className="report-details-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/reports')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span>Back to Reports</span>
              </button>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FiShare2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <FiPrinter className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report Header */}
        <div className="report-header">
          <div className="report-info">
            <div className="flex items-start space-x-6">
              <div className="report-icon">
                <TypeIcon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h1 className="report-name">{report.name}</h1>
                  <span className={`report-status ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                <p className="report-description">{report.description}</p>
                <div className="report-meta">
                  <div className="meta-item">
                    <FiCalendar className="w-4 h-4" />
                    <span>Generated: {new Date(report.generatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <FiUser className="w-4 h-4" />
                    <span>By: {report.generatedBy}</span>
                  </div>
                  <div className="meta-item">
                    <FiFileText className="w-4 h-4" />
                    <span>Size: {report.fileSize}</span>
                  </div>
                  <div className="meta-item">
                    <FiDownload className="w-4 h-4" />
                    <span>{report.downloads} downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-header">
            <nav className="tabs-nav">
              {[
                { id: 'overview', label: 'Overview', icon: FiEye },
                { id: 'charts', label: 'Charts', icon: FiBarChart3 },
                { id: 'insights', label: 'Insights', icon: FiTrendingUp },
                { id: 'recommendations', label: 'Recommendations', icon: FiFileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <tab.icon />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="tabs-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="overview-section">
                <div className="stats-grid">
                  {Object.entries(report.summary).map(([key, value]) => (
                    <div key={key} className="stat-card">
                      <div className="stat-card-header">
                        <div className="stat-card-icon bg-blue-100">
                          <FiBarChart3 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="stat-card-label">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="stat-card-value">
                            {typeof value === 'number' && value > 1000 
                              ? value.toLocaleString() 
                              : typeof value === 'number' && value < 1
                              ? `${(value * 100).toFixed(1)}%`
                              : value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="report-details-grid">
                  <div className="detail-card">
                    <h3 className="detail-title">Report Information</h3>
                    <div className="detail-list">
                      <div className="detail-item">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value">{report.type}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Department:</span>
                        <span className="detail-value">{report.department}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Date Range:</span>
                        <span className="detail-value">{report.dateRange}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Format:</span>
                        <span className="detail-value">{report.format}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Include Charts:</span>
                        <span className="detail-value">{report.includeCharts ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Include Tables:</span>
                        <span className="detail-value">{report.includeTables ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Charts Tab */}
            {activeTab === 'charts' && (
              <div className="charts-section">
                <h3 className="charts-header">Report Charts</h3>
                <div className="charts-grid">
                  {report.charts.map((chart, index) => (
                    <div key={index} className="chart-card">
                      <h4 className="chart-title">{chart.title}</h4>
                      <div className="chart-placeholder">
                        <div className="chart-icon">
                          {chart.type === 'pie' ? <FiPieChart /> : <FiBarChart3 />}
                        </div>
                        <p className="chart-description">
                          {chart.type === 'pie' ? 'Pie Chart' : 'Bar Chart'} visualization
                        </p>
                        <div className="chart-data">
                          {chart.data.map((item, idx) => (
                            <div key={idx} className="data-item">
                              <div 
                                className="data-color" 
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="data-label">{item.department || item.range}</span>
                              <span className="data-value">
                                {item.count || item.budget?.toLocaleString()}
                                {item.percentage && ` (${item.percentage}%)`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights Tab */}
            {activeTab === 'insights' && (
              <div className="insights-section">
                <h3 className="insights-header">Key Insights</h3>
                <div className="insights-list">
                  {report.insights.map((insight, index) => (
                    <div key={index} className="insight-item">
                      <div className="insight-icon">
                        <FiTrendingUp className="w-5 h-5" />
                      </div>
                      <p className="insight-text">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div className="recommendations-section">
                <h3 className="recommendations-header">Recommendations</h3>
                <div className="recommendations-list">
                  {report.recommendations.map((recommendation, index) => (
                    <div key={index} className="recommendation-item">
                      <div className="recommendation-number">{index + 1}</div>
                      <p className="recommendation-text">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails; 