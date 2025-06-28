import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiUsers, FiFolder, FiGrid, FiFileText, FiArrowUp, FiArrowDown, FiClock, FiCheckCircle, FiAlertCircle, FiPlus, FiEye, FiEdit, FiBarChart2, FiSettings, FiUserPlus, FiCalendar, FiStar, FiCheckSquare, FiList, FiUser } from 'react-icons/fi';
import { dashboardService } from '../services/dashboardService';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [quickActions, setQuickActions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [dashboard, analytics, actions, notifs] = await Promise.all([
          dashboardService.getDashboardData(),
          dashboardService.getAnalyticsData(),
          dashboardService.getQuickActions(user?.role || 'employee'),
          dashboardService.getNotifications(user?.id)
        ]);

        console.log('Dashboard Data:', dashboard.data);
        console.log('Analytics Data:', analytics.data);
        console.log('Quick Actions:', actions.data);
        console.log('User Role:', user?.role);
        console.log('Notifications:', notifs.data);

        setDashboardData(dashboard.data);
        setAnalyticsData(analytics.data);
        setQuickActions(actions.data);
        setNotifications(notifs.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Employees',
      value: dashboardData?.overview?.totalEmployees || 0,
      change: '+12%',
      changeType: 'increase',
      icon: <FiUsers className="w-6 h-6" />,
      color: 'bg-blue-500',
      iconColor: 'text-blue-600'
    },
    {
      name: 'Active Projects',
      value: dashboardData?.projectStats?.active || 0,
      change: '+5%',
      changeType: 'increase',
      icon: <FiFolder className="w-6 h-6" />,
      color: 'bg-green-500',
      iconColor: 'text-green-600'
    },
    {
      name: 'Departments',
      value: dashboardData?.overview?.totalDepartments || 0,
      change: '0%',
      changeType: 'neutral',
      icon: <FiGrid className="w-6 h-6" />,
      color: 'bg-purple-500',
      iconColor: 'text-purple-600'
    },
    {
      name: 'Reports',
      value: dashboardData?.overview?.totalReports || 0,
      change: '+8%',
      changeType: 'increase',
      icon: <FiFileText className="w-6 h-6" />,
      color: 'bg-orange-500',
      iconColor: 'text-orange-600'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-green-600 bg-green-100',
      completed: 'text-blue-600 bg-blue-100',
      pending: 'text-yellow-600 bg-yellow-100',
      cancelled: 'text-red-600 bg-red-100',
      'on-hold': 'text-gray-600 bg-gray-100'
    };
    return colors[status] || colors.pending;
  };

  const getNotificationIcon = (type) => {
    const icons = {
      success: <FiCheckCircle className="text-green-500" />,
      warning: <FiAlertCircle className="text-yellow-500" />,
      info: <FiClock className="text-blue-500" />,
      error: <FiAlertCircle className="text-red-500" />
    };
    return icons[type] || icons.info;
  };

  // Helper to get the correct icon
  const getActionIcon = (icon) => {
    switch (icon) {
      case 'user-plus': return <FiUserPlus className="w-5 h-5 text-white" />;
      case 'folder-plus': return <FiPlus className="w-5 h-5 text-white" />;
      case 'file-text': return <FiFileText className="w-5 h-5 text-white" />;
      case 'building': return <FiGrid className="w-5 h-5 text-white" />;
      case 'star': return <FiStar className="w-5 h-5 text-white" />;
      case 'calendar': return <FiCalendar className="w-5 h-5 text-white" />;
      case 'check-circle': return <FiCheckSquare className="w-5 h-5 text-white" />;
      case 'users': return <FiUsers className="w-5 h-5 text-white" />;
      case 'calendar-plus': return <FiCalendar className="w-5 h-5 text-white" />;
      case 'list': return <FiList className="w-5 h-5 text-white" />;
      case 'user-edit': return <FiUser className="w-5 h-5 text-white" />;
      default: return <FiGrid className="w-5 h-5 text-white" />;
    }
  };

  // Helper to get color code
  const getColor = (color) => {
    const colors = {
      blue: '#3b82f6',
      green: '#22c55e',
      purple: '#a855f7',
      orange: '#f97316',
      yellow: '#eab308',
      red: '#ef4444',
      gray: '#6b7280'
    };
    return colors[color] || '#e5e7eb';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 text-lg">
              Here's what's happening in your organization today
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Total Employees */}
            <div className="bg-white rounded-xl p-5 shadow-md flex items-center w-full min-w-0">
              <div className="p-4 bg-blue-500 rounded-lg flex-shrink-0">
                <FiUsers className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-base font-semibold text-gray-700 mb-1">Total Employees</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1">{dashboardData?.overview?.totalEmployees || 0}</p>
                <div className="flex items-center text-sm text-green-600">
                  <FiArrowUp className="w-5 h-5 mr-1" />
                  <span className="font-bold">+12%</span>
                </div>
              </div>
            </div>
            {/* Active Projects */}
            <div className="bg-white rounded-xl p-5 shadow-md flex items-center w-full min-w-0">
              <div className="p-4 bg-green-500 rounded-lg flex-shrink-0">
                <FiFolder className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-base font-semibold text-gray-700 mb-1">Active Projects</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1">{dashboardData?.projectStats?.active || 0}</p>
                <div className="flex items-center text-sm text-green-600">
                  <FiArrowUp className="w-5 h-5 mr-1" />
                  <span className="font-bold">+8%</span>
                </div>
              </div>
            </div>
            {/* Departments */}
            <div className="bg-white rounded-xl p-5 shadow-md flex items-center w-full min-w-0">
              <div className="p-4 bg-purple-500 rounded-lg flex-shrink-0">
                <FiGrid className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-base font-semibold text-gray-700 mb-1">Departments</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1">{dashboardData?.overview?.totalDepartments || 0}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-bold">0%</span>
                </div>
              </div>
            </div>
            {/* Reports */}
            <div className="bg-white rounded-xl p-5 shadow-md flex items-center w-full min-w-0">
              <div className="p-4 bg-orange-500 rounded-lg flex-shrink-0">
                <FiFileText className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-base font-semibold text-gray-700 mb-1">Reports</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1">{dashboardData?.overview?.totalReports || 0}</p>
                <div className="flex items-center text-sm text-orange-500">
                  <FiArrowUp className="w-5 h-5 mr-1" />
                  <span className="font-bold">+8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            {quickActions && quickActions.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={action.id || index}
                    to={action.link || action.href || '#'}
                    className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-100"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center mx-auto mb-3 rounded-lg"
                      style={{ background: getColor(action.color) }}
                    >
                      {getActionIcon(action.icon)}
                    </div>
                    <span className="text-xs font-medium text-gray-700 block">
                      {action.title || action.name}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <p className="text-gray-500">No quick actions available for your role.</p>
                <p className="text-sm text-gray-400 mt-2">Current role: {user?.role || 'Unknown'}</p>
              </div>
            )}
          </div>

          {/* Recent Activity & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                <Link to="/activity" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Analytics Overview</h3>
                <Link to="/analytics" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <FiUsers className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Employee Growth</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">+12%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <FiFolder className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Project Success</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">+8%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <FiCheckCircle className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">Task Completion</span>
                  </div>
                  <span className="text-sm font-bold text-purple-600">+15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 