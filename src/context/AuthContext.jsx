import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Mock users data (fallback for development)
const initialMockUsers = [
  {
    id: 1,
    email: 'admin@company.com',
    password: 'admin123',
    name: 'Ahmed Mohamed',
    role: 'admin',
    department: 'IT',
    position: 'System Administrator'
  },
  {
    id: 2,
    email: 'manager@company.com',
    password: 'manager123',
    name: 'Fatima Ali',
    role: 'manager',
    department: 'HR',
    position: 'HR Manager'
  },
  {
    id: 3,
    email: 'employee@company.com',
    password: 'employee123',
    name: 'Mohamed Ahmed',
    role: 'employee',
    department: 'IT',
    position: 'Software Developer'
  }
];

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(true); // Toggle between mock and real API
  
  // Get mock users from localStorage or use initial data
  const getMockUsers = () => {
    const savedUsers = localStorage.getItem('mockUsers');
    return savedUsers ? JSON.parse(savedUsers) : initialMockUsers;
  };

  // Save mock users to localStorage
  const saveMockUsers = (users) => {
    localStorage.setItem('mockUsers', JSON.stringify(users));
  };

  // Add new user to mock system
  const addMockUser = (userData) => {
    const users = getMockUsers();
    const newUser = {
      id: Date.now(), // Simple ID generation
      email: userData.email,
      password: userData.password || '123456', // Default password
      name: `${userData.firstName} ${userData.lastName}`,
      role: 'employee', // Default role for new employees
      department: userData.department,
      position: userData.position
    };
    
    users.push(newUser);
    saveMockUsers(users);
    return newUser;
  };

  // التحقق من حالة المصادقة عند تحميل التطبيق
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const authResult = await authService.checkAuth();
        
        if (authResult.isAuthenticated) {
          setUser(authResult.user);
          setIsAuthenticated(true);
        } else {
          // مسح البيانات إذا لم تكن المصادقة صحيحة
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // تسجيل الدخول
  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await authService.login(email, password);
      
      setUser(result.user);
      setIsAuthenticated(true);
      
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الخروج
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  // تحديث الملف الشخصي
  const updateUser = async (userData) => {
    try {
      setLoading(true);
      const result = await authService.updateProfile(userData);
      
      setUser(result.user);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // تغيير كلمة المرور
  const changePassword = async (oldPassword, newPassword) => {
    try {
      setLoading(true);
      const result = await authService.changePassword(oldPassword, newPassword);
      
      // تحديث المستخدم إذا تم تغيير كلمة المرور بنجاح
      if (result.success) {
        const updatedUser = { ...user, password: newPassword };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // إعادة تعيين كلمة المرور
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const result = await authService.forgotPassword(email);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // التحقق من الصلاحيات
  const hasPermission = (permission) => {
    return authService.hasPermission(permission);
  };

  // التحقق من الدور
  const hasRole = (role) => {
    return authService.hasRole(role);
  };

  // الحصول على المستخدم الحالي
  const getCurrentUser = () => {
    return authService.getCurrentUser();
  };

  // إضافة مستخدم جديد (للمطورين)
  const addUser = (userData) => {
    try {
      const newUser = authService.createUser(userData);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  // تحديث مستخدم (للمطورين)
  const updateUserById = (id, userData) => {
    try {
      const updatedUser = authService.updateUser(id, userData);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  // حذف مستخدم (للمطورين)
  const deleteUser = (id) => {
    try {
      const result = authService.deleteUser(id);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // إعادة تعيين كلمة مرور مستخدم (للمطورين)
  const resetUserPassword = (id, newPassword) => {
    try {
      const result = authService.resetUserPassword(id, newPassword);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // الحصول على إحصائيات المستخدمين
  const getUserStats = () => {
    return authService.getUserStats();
  };

  // الحصول على جميع المستخدمين
  const getAllUsers = () => {
    return authService.getAllUsers();
  };

  // إرسال إشعار
  const sendNotification = (userId, title, message, type) => {
    try {
      // في التطبيق الحقيقي، سيتم استخدام notificationsAPI
      const notification = {
        id: Date.now(),
        userId,
        title,
        message,
        type,
        timestamp: new Date().toISOString(),
        read: false
      };

      // حفظ الإشعار في localStorage (في التطبيق الحقيقي سيتم حفظه في قاعدة البيانات)
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push(notification);
      localStorage.setItem('notifications', JSON.stringify(notifications));

      return notification;
    } catch (error) {
      throw error;
    }
  };

  // الحصول على إشعارات المستخدم
  const getUserNotifications = (userId) => {
    try {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      return notifications.filter(n => n.userId === userId);
    } catch (error) {
      return [];
    }
  };

  // تحديث حالة قراءة الإشعار
  const markNotificationAsRead = (notificationId) => {
    try {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const updatedNotifications = notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      );
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // تحديث جميع إشعارات المستخدم كمقروءة
  const markAllNotificationsAsRead = (userId) => {
    try {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const updatedNotifications = notifications.map(n => 
        n.userId === userId ? { ...n, read: true } : n
      );
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Toggle between mock and real API
  const toggleMockData = (useMock) => {
    setUseMockData(useMock);
    // Clear current session when switching
    if (isAuthenticated) {
      logout();
    }
  };

  // Get all mock users (for admin purposes)
  const getMockUsersList = () => {
    return getMockUsers();
  };

  // Reset mock users to initial state
  const resetMockUsers = () => {
    saveMockUsers(initialMockUsers);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    useMockData,
    login,
    logout,
    updateUser,
    changePassword,
    forgotPassword,
    hasPermission,
    hasRole,
    getCurrentUser,
    addUser,
    updateUserById,
    deleteUser,
    resetUserPassword,
    getUserStats,
    getAllUsers,
    sendNotification,
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    toggleMockData,
    addMockUser,
    getMockUsersList,
    resetMockUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 