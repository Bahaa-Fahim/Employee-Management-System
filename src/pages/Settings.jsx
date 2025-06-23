import { useState } from 'react';
import Swal from 'sweetalert2';
import { FaCog, FaSlidersH, FaShieldAlt, FaPalette, FaBell } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      companyName: 'TechCorp Solutions',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
      language: 'English',
      notifications: {
        email: true,
        push: false,
        sms: false,
        reports: true,
        updates: true
      }
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
      autoLogout: true,
      passwordHistory: 5
    },
    appearance: {
      theme: 'light',
      sidebarCollapsed: false,
      compactMode: false,
      primaryColor: '#667eea',
      fontSize: 'medium'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      reportNotifications: true,
      updateNotifications: true,
      securityAlerts: true
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    Swal.fire('Success', 'Settings saved successfully', 'success');
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
      }
    });
  };

  const handleResetSettings = () => {
    Swal.fire({
      title: 'Reset Settings?',
      text: "All settings will be restored to default values",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reset!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Reset!', 'Settings have been reset to default.', 'success');
      }
    });
  };

  const tabs = [
    { 
      id: 'general', 
      name: 'General', 
      icon: <FaSlidersH />,
      description: 'Basic system settings'
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: <FaShieldAlt />,
      description: 'Security and privacy settings'
    },
    { 
      id: 'appearance', 
      name: 'Appearance', 
      icon: <FaPalette />,
      description: 'UI and theme settings'
    },
    { 
      id: 'notifications', 
      name: 'Notifications', 
      icon: <FaBell />,
      description: 'Notification preferences'
    }
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'general':
  return (
          <div className="settings-section">
            <div className="section-header">
              <h3 className="section-title">Company Information</h3>
              <p className="section-description">Manage your company details and basic preferences</p>
      </div>
            <div className="settings-grid">
              <div className="form-group">
                <label className="form-label">Company Name</label>
                    <input
                      type="text"
                  className="form-input"
                      value={settings.general.companyName}
                      onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
                    />
                  </div>

              <div className="form-group">
                <label className="form-label">Timezone</label>
                    <select
                  className="form-select"
                      value={settings.general.timezone}
                      onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                    >
                      <option value="UTC-5">UTC-5 (Eastern Time)</option>
                      <option value="UTC-6">UTC-6 (Central Time)</option>
                      <option value="UTC-7">UTC-7 (Mountain Time)</option>
                      <option value="UTC-8">UTC-8 (Pacific Time)</option>
                      <option value="UTC+0">UTC+0 (GMT)</option>
                  <option value="UTC+1">UTC+1 (Central European Time)</option>
                  <option value="UTC+2">UTC+2 (Eastern European Time)</option>
                    </select>
                  </div>

              <div className="form-group">
                <label className="form-label">Date Format</label>
                    <select
                  className="form-select"
                      value={settings.general.dateFormat}
                      onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

              <div className="form-group">
                <label className="form-label">Language</label>
                    <select
                  className="form-select"
                      value={settings.general.language}
                      onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                  <option value="Arabic">Arabic</option>
                    </select>
                  </div>
                    </div>
                  </div>
        );

      case 'security':
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3 className="section-title">Security Settings</h3>
              <p className="section-description">Configure security preferences and authentication</p>
            </div>
            <div className="settings-grid">
              <div className="toggle-container">
                <div className="toggle-info">
                  <div className="toggle-label">Two-Factor Authentication</div>
                  <div className="toggle-description">Add an extra layer of security to your account</div>
                </div>
                <div 
                  className={`toggle-switch ${settings.security.twoFactorAuth ? 'active' : ''}`}
                  onClick={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                />
              </div>
              
              <div className="toggle-container">
                <div className="toggle-info">
                  <div className="toggle-label">Auto Logout</div>
                  <div className="toggle-description">Automatically log out after inactivity</div>
                </div>
                <div 
                  className={`toggle-switch ${settings.security.autoLogout ? 'active' : ''}`}
                  onClick={() => handleSettingChange('security', 'autoLogout', !settings.security.autoLogout)}
                />
                  </div>

              <div className="form-group">
                <label className="form-label">Session Timeout (minutes)</label>
                <select
                  className="form-select"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                  <option value={240}>4 hours</option>
                </select>
                  </div>

              <div className="form-group">
                <label className="form-label">Password Expiry (days)</label>
                <select
                  className="form-select"
                      value={settings.security.passwordExpiry}
                      onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                >
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                  <option value={180}>180 days</option>
                  <option value={365}>1 year</option>
                </select>
                  </div>

              <div className="form-group">
                <label className="form-label">Maximum Login Attempts</label>
                <select
                  className="form-select"
                      value={settings.security.loginAttempts}
                      onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                >
                  <option value={3}>3 attempts</option>
                  <option value={5}>5 attempts</option>
                  <option value={10}>10 attempts</option>
                  <option value={15}>15 attempts</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3 className="section-title">Appearance Settings</h3>
              <p className="section-description">Customize the look and feel of the application</p>
            </div>
            <div className="settings-grid">
              <div className="form-group">
                <label className="form-label">Theme</label>
                    <select
                  className="form-select"
                      value={settings.appearance.theme}
                      onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Font Size</label>
                <select
                  className="form-select"
                  value={settings.appearance.fontSize}
                  onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                    </select>
                  </div>

              <div className="toggle-container">
                <div className="toggle-info">
                  <div className="toggle-label">Compact Mode</div>
                  <div className="toggle-description">Reduce spacing for more content</div>
                </div>
                <div 
                  className={`toggle-switch ${settings.appearance.compactMode ? 'active' : ''}`}
                  onClick={() => handleSettingChange('appearance', 'compactMode', !settings.appearance.compactMode)}
                />
              </div>
              
              <div className="toggle-container">
                <div className="toggle-info">
                  <div className="toggle-label">Collapsed Sidebar</div>
                  <div className="toggle-description">Start with sidebar collapsed</div>
                </div>
                <div 
                  className={`toggle-switch ${settings.appearance.sidebarCollapsed ? 'active' : ''}`}
                  onClick={() => handleSettingChange('appearance', 'sidebarCollapsed', !settings.appearance.sidebarCollapsed)}
                />
              </div>
              
              <div className="color-picker-container">
                <div className="color-info">
                  <div className="color-label">Primary Color</div>
                  <div className="color-description">Choose your preferred accent color</div>
                </div>
                <input
                  type="color"
                  className="color-picker"
                  value={settings.appearance.primaryColor}
                  onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3 className="section-title">Notification Preferences</h3>
              <p className="section-description">Manage how and when you receive notifications</p>
            </div>
            <div className="settings-grid">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                />
                <div className="checkbox-info">
                  <div className="checkbox-label">Email Notifications</div>
                  <div className="checkbox-description">Receive notifications via email</div>
                </div>
              </div>
              
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={settings.notifications.pushNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                />
                <div className="checkbox-info">
                  <div className="checkbox-label">Push Notifications</div>
                  <div className="checkbox-description">Receive browser push notifications</div>
                </div>
              </div>
              
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={settings.notifications.smsNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
                />
                <div className="checkbox-info">
                  <div className="checkbox-label">SMS Notifications</div>
                  <div className="checkbox-description">Receive notifications via SMS</div>
                </div>
              </div>
              
              <div className="checkbox-container">
                      <input
                        type="checkbox"
                  className="checkbox-input"
                  checked={settings.notifications.reportNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'reportNotifications', e.target.checked)}
                />
                <div className="checkbox-info">
                  <div className="checkbox-label">Report Notifications</div>
                  <div className="checkbox-description">Get notified when reports are ready</div>
                </div>
                  </div>

              <div className="checkbox-container">
                      <input
                        type="checkbox"
                  className="checkbox-input"
                  checked={settings.notifications.updateNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'updateNotifications', e.target.checked)}
                />
                <div className="checkbox-info">
                  <div className="checkbox-label">Update Notifications</div>
                  <div className="checkbox-description">Get notified about system updates</div>
                </div>
                  </div>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={settings.notifications.securityAlerts}
                  onChange={(e) => handleSettingChange('notifications', 'securityAlerts', e.target.checked)}
                />
                <div className="checkbox-info">
                  <div className="checkbox-label">Security Alerts</div>
                  <div className="checkbox-description">Get notified about security events</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div className="settings-container" style={{ width: '100%', maxWidth: 1100, margin: '0 auto', background: 'transparent', boxShadow: 'none', border: 'none' }}>
        {/* Header */}
        <div className="settings-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', borderRadius: 20, boxShadow: '0 4px 16px rgba(102,126,234,0.10)', border: '1px solid #e2e8f0', marginBottom: '2.5rem', padding: '2.5rem 2rem 2rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <FaCog style={{ color: '#667eea', fontSize: '2.2rem' }} />
            <h1 className="settings-title" style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', margin: 0, background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: 'unset' }}>Settings</h1>
          </div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0, textAlign: 'center' }}>
            Manage your system preferences, security, appearance, and notifications all in one place.
          </p>
        </div>
        {/* Settings Content */}
        <div className="settings-content">
          {/* Settings Navigation */}
          <div className="settings-nav">
            <div className="nav-header">
              <h2 className="nav-title">Settings</h2>
            </div>
            <div className="nav-list">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  <span className="nav-text">{tab.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Panel */}
          <div className="settings-panel">
            <div className="panel-header">
              <h2 className="panel-title">{tabs.find(tab => tab.id === activeTab)?.name} Settings</h2>
              <p className="panel-subtitle">{tabs.find(tab => tab.id === activeTab)?.description}</p>
            </div>
            <div className="panel-content">
              {getTabContent()}
              {/* Danger Zone */}
              {activeTab === 'general' && (
                <div className="danger-zone">
                  <div className="danger-zone-header">
                    <h3 className="danger-zone-title">Danger Zone</h3>
                    <p className="danger-zone-description">Irreversible and destructive actions</p>
                  </div>
                  <div className="danger-actions">
                    <button className="danger-btn reset-settings-btn" onClick={handleResetSettings}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset Settings
                    </button>
                    <button className="danger-btn delete-account-btn" onClick={handleDeleteAccount}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 