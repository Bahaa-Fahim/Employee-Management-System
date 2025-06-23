import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './EmployeeReports.css';

const EmployeeReports = () => {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState('performance');

  // Mock data for employee reports
  const performanceData = [
    { month: 'Jan', rating: 85, tasks: 12, completed: 10 },
    { month: 'Feb', rating: 88, tasks: 15, completed: 13 },
    { month: 'Mar', rating: 92, tasks: 18, completed: 17 },
    { month: 'Apr', rating: 87, tasks: 14, completed: 12 },
    { month: 'May', rating: 90, tasks: 16, completed: 15 },
    { month: 'Jun', rating: 94, tasks: 20, completed: 19 }
  ];

  const attendanceData = [
    { month: 'Jan', present: 22, absent: 1, late: 2 },
    { month: 'Feb', present: 20, absent: 2, late: 1 },
    { month: 'Mar', present: 23, absent: 0, late: 1 },
    { month: 'Apr', present: 21, absent: 1, late: 3 },
    { month: 'May', present: 22, absent: 1, late: 1 },
    { month: 'Jun', present: 24, absent: 0, late: 0 }
  ];

  const leaveData = [
    { type: 'Vacation', used: 5, remaining: 15 },
    { type: 'Sick Leave', used: 2, remaining: 8 },
    { type: 'Personal', used: 1, remaining: 3 },
    { type: 'Medical', used: 0, remaining: 5 }
  ];

  const getReportData = () => {
    switch (selectedReport) {
      case 'performance':
        return performanceData;
      case 'attendance':
        return attendanceData;
      case 'leaves':
        return leaveData;
      default:
        return performanceData;
    }
  };

  const getReportTitle = () => {
    switch (selectedReport) {
      case 'performance':
        return 'My Performance Overview';
      case 'attendance':
        return 'My Attendance Record';
      case 'leaves':
        return 'My Leave Balance';
      default:
        return 'My Performance Overview';
    }
  };

  const getReportDescription = () => {
    switch (selectedReport) {
      case 'performance':
        return 'Your performance metrics and task completion rates';
      case 'attendance':
        return 'Your attendance and punctuality records';
      case 'leaves':
        return 'Your leave balance and usage summary';
      default:
        return 'Your performance metrics and task completion rates';
    }
  };

  const calculateAveragePerformance = () => {
    const total = performanceData.reduce((sum, item) => sum + item.rating, 0);
    return Math.round(total / performanceData.length);
  };

  const calculateAttendanceRate = () => {
    const total = attendanceData.reduce((sum, item) => sum + item.present + item.absent + item.late, 0);
    const present = attendanceData.reduce((sum, item) => sum + item.present, 0);
    return Math.round((present / total) * 100);
  };

  return (
    <div className="employee-reports-container">
      {/* Header */}
      <div className="reports-header">
        <h1 className="reports-title">My Reports</h1>
        <p className="reports-subtitle">Personal analytics and insights</p>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{calculateAveragePerformance()}%</div>
            <div className="stat-label">Average Performance</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-value">{calculateAttendanceRate()}%</div>
            <div className="stat-label">Attendance Rate</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">95%</div>
            <div className="stat-label">Task Completion</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">8</div>
            <div className="stat-label">Days Remaining</div>
          </div>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="report-selector">
        <button 
          className={`report-tab ${selectedReport === 'performance' ? 'active' : ''}`}
          onClick={() => setSelectedReport('performance')}
        >
          Performance
        </button>
        <button 
          className={`report-tab ${selectedReport === 'attendance' ? 'active' : ''}`}
          onClick={() => setSelectedReport('attendance')}
        >
          Attendance
        </button>
        <button 
          className={`report-tab ${selectedReport === 'leaves' ? 'active' : ''}`}
          onClick={() => setSelectedReport('leaves')}
        >
          Leave Balance
        </button>
      </div>

      {/* Report Content */}
      <div className="report-content">
        <div className="report-header">
          <h2>{getReportTitle()}</h2>
          <p>{getReportDescription()}</p>
        </div>

        {selectedReport === 'performance' && (
          <div className="performance-chart">
            <div className="chart-container">
              {performanceData.map((item, index) => (
                <div key={index} className="chart-bar">
                  <div className="bar-label">{item.month}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ height: `${item.rating}%` }}
                    ></div>
                  </div>
                  <div className="bar-value">{item.rating}%</div>
                  <div className="bar-details">
                    {item.completed}/{item.tasks} tasks
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedReport === 'attendance' && (
          <div className="attendance-table">
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item, index) => {
                  const total = item.present + item.absent + item.late;
                  const rate = Math.round((item.present / total) * 100);
                  return (
                    <tr key={index}>
                      <td>{item.month}</td>
                      <td className="present">{item.present}</td>
                      <td className="absent">{item.absent}</td>
                      <td className="late">{item.late}</td>
                      <td className="rate">{rate}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {selectedReport === 'leaves' && (
          <div className="leave-balance">
            {leaveData.map((item, index) => (
              <div key={index} className="leave-item">
                <div className="leave-type">{item.type}</div>
                <div className="leave-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(item.used / (item.used + item.remaining)) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="leave-stats">
                    <span className="used">{item.used} used</span>
                    <span className="remaining">{item.remaining} remaining</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeReports; 