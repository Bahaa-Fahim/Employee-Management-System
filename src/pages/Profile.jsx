import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiSettings, FiCamera, FiSave, FiX, FiEdit3, FiMapPin, FiPhone, FiMail, FiCalendar, FiShield, FiUsers } from 'react-icons/fi';
import Swal from 'sweetalert2';
import authService from '../services/authService';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profileImage, setProfileImage] = useState(user?.avatar || 'https://i.pravatar.cc/150?u=a042581f4e29026704d');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    position: user?.position || '',
    bio: user?.bio || '',
    address: user?.address || '',
    skills: user?.skills || ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'HTML', 'CSS'],
    education: user?.education || '',
    experience: user?.experience || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [initialFormData] = useState(formData);
  const [initialProfileImage] = useState(profileImage);

  // إحصائيات المستخدم
  const stats = {
    projects: user?.projects?.length || 0,
    tasks: user?.tasks?.length || 0,
    leaves: user?.leaves?.length || 0
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        department: user.department || '',
        position: user.position || '',
        bio: user.bio || '',
        address: user.address || '',
        skills: user.skills || ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'HTML', 'CSS'],
        education: user.education || '',
        experience: user.experience || '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setProfileImage(user.avatar || 'https://i.pravatar.cc/150?u=a042581f4e29026704d');
    }
  }, [user]);

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

  const handleSave = async () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New passwords do not match!',
        customClass: { popup: 'rounded-xl' }
      });
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        position: formData.position,
        bio: formData.bio,
        address: formData.address,
        skills: formData.skills,
        education: formData.education,
        experience: formData.experience,
        avatar: profileImage
      };

      // تحديث الملف الشخصي
      const result = await authService.updateProfile(updateData);
      
      // تحديث كلمة المرور إذا تم تغييرها
      if (formData.newPassword) {
        await authService.changePassword(formData.oldPassword, formData.newPassword);
      }

      // تحديث المستخدم في Context
      if (updateUser) {
        updateUser(result.user);
      }

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully.',
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-xl' }
      });

      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.message,
        customClass: { popup: 'rounded-xl' }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setProfileImage(initialProfileImage);
    setIsEditing(false);
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <FiShield className="w-5 h-5" />;
      case 'manager':
        return <FiUsers className="w-5 h-5" />;
      case 'employee':
        return <FiUser className="w-5 h-5" />;
      default:
        return <FiUser className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'manager':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'employee':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span>Profile</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                  />
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <FiCamera className="w-4 h-4" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{formData.name}</h2>
                <p className="text-gray-600 mb-3">{formData.position}</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getRoleColor(user?.role)}`}>
                  {getRoleIcon(user?.role)}
                  <span className="ml-1 capitalize">{user?.role}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <FiMail className="w-4 h-4 mr-3" />
                  <span className="text-sm">{formData.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiPhone className="w-4 h-4 mr-3" />
                  <span className="text-sm">{formData.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiMapPin className="w-4 h-4 mr-3" />
                  <span className="text-sm">{formData.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="w-4 h-4 mr-3" />
                  <span className="text-sm">Joined {user?.hireDate}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{stats.projects}</div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{stats.tasks}</div>
                  <div className="text-xs text-gray-600">Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{stats.leaves}</div>
                  <div className="text-xs text-gray-600">Leaves</div>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button 
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'about' 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('about')}
                  >
                    <FiUser className="w-4 h-4 mr-2" />
                    About
                  </button>
                  <button 
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'settings' 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <FiSettings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">About Me</h3>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <FiEdit3 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isEditing 
                              ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isEditing 
                              ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isEditing 
                              ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            isEditing 
                              ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-lg ${
                          isEditing 
                            ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={2}
                        className={`w-full px-3 py-2 border rounded-lg ${
                          isEditing 
                            ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          name="oldPassword"
                          value={formData.oldPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-200">
                      <button
                        onClick={handleSave}
                        disabled={loading || !formData.newPassword}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
