import { authAPI, handleApiError } from './api';

// Mock users for development
const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@company.com',
    password: 'admin123',
    role: 'admin',
    department: 'Administration',
    position: 'System Administrator',
    avatar: null,
    phone: '+1-555-0001',
    hireDate: '2020-01-01',
    status: 'active'
  },
  {
    id: 2,
    name: 'Manager User',
    email: 'manager@company.com',
    password: 'manager123',
    role: 'manager',
    department: 'IT',
    position: 'IT Manager',
    avatar: null,
    phone: '+1-555-0002',
    hireDate: '2021-06-10',
    status: 'active',
    managerDepartment: 'IT'
  },
  {
    id: 3,
    name: 'Employee User',
    email: 'employee@company.com',
    password: 'employee123',
    role: 'employee',
    department: 'IT',
    position: 'Software Developer',
    avatar: null,
    phone: '+1-555-0003',
    hireDate: '2022-03-15',
    status: 'active'
  }
];

class AuthService {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    
    if (this.token && this.user) {
      this.isAuthenticated = true;
      this.currentUser = this.user;
    }
  }

  // تسجيل الدخول
  async login(email, password) {
    try {
      // في التطبيق الحقيقي، سيتم استخدام API
      // const response = await authAPI.login(email, password);
      
      // للآن نستخدم Mock data
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // إنشاء token وهمي
      const token = `mock_token_${user.id}_${Date.now()}`;
      
      // حفظ البيانات في localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // تحديث الحالة
      this.token = token;
      this.user = user;
      this.currentUser = user;
      this.isAuthenticated = true;

      // إرسال إشعار تسجيل الدخول
      this.sendLoginNotification(user);

      return { user, token };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // تسجيل الخروج
  async logout() {
    try {
      // في التطبيق الحقيقي، سيتم استخدام API
      // await authAPI.logout();
      
      // مسح البيانات من localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // تحديث الحالة
      this.token = null;
      this.user = null;
      this.currentUser = null;
      this.isAuthenticated = false;

      return { success: true };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // إعادة تعيين كلمة المرور
  async forgotPassword(email) {
    try {
      // في التطبيق الحقيقي، سيتم استخدام API
      // const response = await authAPI.forgotPassword(email);
      
      // للآن نتحقق من وجود المستخدم
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        throw new Error('User not found with this email address');
      }

      // محاكاة إرسال email
      console.log(`Password reset email sent to ${email}`);
      
      return { 
        success: true, 
        message: 'Password reset email sent successfully' 
      };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // تغيير كلمة المرور
  async changePassword(oldPassword, newPassword) {
    try {
      if (!this.isAuthenticated) {
        throw new Error('User not authenticated');
      }

      // التحقق من كلمة المرور الحالية
      if (this.currentUser.password !== oldPassword) {
        throw new Error('Current password is incorrect');
      }

      // في التطبيق الحقيقي، سيتم استخدام API
      // const response = await authAPI.changePassword(oldPassword, newPassword);
      
      // تحديث كلمة المرور في Mock data
      const userIndex = mockUsers.findIndex(u => u.id === this.currentUser.id);
      if (userIndex !== -1) {
        mockUsers[userIndex].password = newPassword;
      }

      // تحديث المستخدم الحالي
      this.currentUser.password = newPassword;
      this.user.password = newPassword;
      
      // تحديث localStorage
      localStorage.setItem('user', JSON.stringify(this.currentUser));

      return { 
        success: true, 
        message: 'Password changed successfully' 
      };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // تحديث الملف الشخصي
  async updateProfile(profileData) {
    try {
      if (!this.isAuthenticated) {
        throw new Error('User not authenticated');
      }

      // في التطبيق الحقيقي، سيتم استخدام API
      // const response = await authAPI.updateProfile(profileData);
      
      // تحديث البيانات في Mock data
      const userIndex = mockUsers.findIndex(u => u.id === this.currentUser.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...profileData };
      }

      // تحديث المستخدم الحالي
      this.currentUser = { ...this.currentUser, ...profileData };
      this.user = { ...this.user, ...profileData };
      
      // تحديث localStorage
      localStorage.setItem('user', JSON.stringify(this.currentUser));

      return { 
        success: true, 
        user: this.currentUser,
        message: 'Profile updated successfully' 
      };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // التحقق من حالة المصادقة
  async checkAuth() {
    try {
      if (!this.token || !this.user) {
        return { isAuthenticated: false };
      }

      // في التطبيق الحقيقي، سيتم استخدام API
      // const response = await authAPI.checkAuth();
      
      // للآن نتحقق من وجود المستخدم في Mock data
      const user = mockUsers.find(u => u.id === this.user.id);
      
      if (!user) {
        this.logout();
        return { isAuthenticated: false };
      }

      return { 
        isAuthenticated: true, 
        user: this.currentUser 
      };
    } catch (error) {
      this.logout();
      return { isAuthenticated: false };
    }
  }

  // إرسال إشعار تسجيل الدخول
  sendLoginNotification(user) {
    const notification = {
      id: Date.now(),
      userId: user.id,
      title: 'Login Successful',
      message: `Welcome back, ${user.name}! You have successfully logged in.`,
      type: 'success',
      timestamp: new Date().toISOString(),
      read: false
    };

    // حفظ الإشعار في localStorage (في التطبيق الحقيقي سيتم حفظه في قاعدة البيانات)
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  // الحصول على المستخدم الحالي
  getCurrentUser() {
    return this.currentUser;
  }

  // التحقق من وجود صلاحيات
  hasPermission(permission) {
    if (!this.isAuthenticated || !this.currentUser) {
      return false;
    }

    const permissions = {
      admin: ['all'],
      manager: ['manage_employees', 'manage_projects', 'view_reports', 'approve_leaves'],
      employee: ['view_profile', 'submit_leaves', 'view_tasks']
    };

    const userPermissions = permissions[this.currentUser.role] || [];
    return userPermissions.includes('all') || userPermissions.includes(permission);
  }

  // التحقق من الدور
  hasRole(role) {
    return this.currentUser?.role === role;
  }

  // الحصول على جميع المستخدمين (للمطورين)
  getAllUsers() {
    return mockUsers.map(user => ({
      ...user,
      password: undefined // لا نرسل كلمة المرور
    }));
  }

  // إنشاء مستخدم جديد (للمطورين)
  createUser(userData) {
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      status: 'active',
      hireDate: new Date().toISOString().split('T')[0]
    };

    mockUsers.push(newUser);
    return { ...newUser, password: undefined };
  }

  // تحديث مستخدم (للمطورين)
  updateUser(id, userData) {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
    return { ...mockUsers[userIndex], password: undefined };
  }

  // حذف مستخدم (للمطورين)
  deleteUser(id) {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers.splice(userIndex, 1);
    return { success: true };
  }

  // إعادة تعيين كلمة المرور (للمطورين)
  resetUserPassword(id, newPassword) {
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword;
    return { success: true };
  }

  // الحصول على إحصائيات المستخدمين
  getUserStats() {
    const stats = {
      total: mockUsers.length,
      active: mockUsers.filter(u => u.status === 'active').length,
      inactive: mockUsers.filter(u => u.status === 'inactive').length,
      byRole: {
        admin: mockUsers.filter(u => u.role === 'admin').length,
        manager: mockUsers.filter(u => u.role === 'manager').length,
        employee: mockUsers.filter(u => u.role === 'employee').length
      },
      byDepartment: {}
    };

    // إحصائيات حسب القسم
    mockUsers.forEach(user => {
      if (user.department) {
        stats.byDepartment[user.department] = (stats.byDepartment[user.department] || 0) + 1;
      }
    });

    return stats;
  }
}

// إنشاء instance واحد من AuthService
const authService = new AuthService();

export default authService; 