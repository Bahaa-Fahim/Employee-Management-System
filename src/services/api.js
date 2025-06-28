import axios from 'axios';

// API Base URL - JSON Server
const API_BASE_URL = 'http://localhost:3001';

// إنشاء axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor لإضافة headers مخصصة
api.interceptors.request.use(
  (config) => {
    // يمكن إضافة token هنا لاحقاً
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor للتعامل مع الأخطاء
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== AUTH API =====
export const authAPI = {
  // تسجيل الدخول
  login: (email, password) => api.post('/auth/login', { email, password }),
  
  // تسجيل الخروج
  logout: () => api.post('/auth/logout'),
  
  // إعادة تعيين كلمة المرور
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  // تغيير كلمة المرور
  changePassword: (oldPassword, newPassword) => 
    api.post('/auth/change-password', { oldPassword, newPassword }),
  
  // تحديث الملف الشخصي
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  
  // التحقق من حالة المصادقة
  checkAuth: () => api.get('/auth/me'),
};

// ===== EMPLOYEES API =====
export const employeesAPI = {
  // الحصول على جميع الموظفين
  getAll: () => api.get('/employees'),
  
  // الحصول على موظف واحد
  getById: (id) => api.get(`/employees/${id}`),
  
  // إنشاء موظف جديد
  create: (employeeData) => api.post('/employees', employeeData),
  
  // تحديث موظف
  update: (id, employeeData) => api.put(`/employees/${id}`, employeeData),
  
  // حذف موظف
  delete: (id) => api.delete(`/employees/${id}`),
  
  // البحث في الموظفين
  search: (query) => api.get(`/employees?q=${query}`),
  
  // الحصول على موظفين حسب القسم
  getByDepartment: (department) => api.get(`/employees?department=${department}`),
  
  // الحصول على موظفين حسب الحالة
  getByStatus: (status) => api.get(`/employees?status=${status}`),
  
  // ترقية موظف إلى مدير
  promoteToManager: (id, department) => 
    api.patch(`/employees/${id}`, { role: 'manager', managerDepartment: department }),
  
  // إلغاء ترقية مدير
  demoteManager: (id) => 
    api.patch(`/employees/${id}`, { role: 'employee', managerDepartment: null }),
  
  // نقل مدير إلى قسم آخر
  transferManager: (id, newDepartment) => 
    api.patch(`/employees/${id}`, { managerDepartment: newDepartment }),
  
  // تحديث حالة الموظف
  updateStatus: (id, status) => api.patch(`/employees/${id}`, { status }),
  
  // تحديث الراتب
  updateSalary: (id, salary) => api.patch(`/employees/${id}`, { salary }),
};

// ===== DEPARTMENTS API =====
export const departmentsAPI = {
  // الحصول على جميع الأقسام
  getAll: () => api.get('/departments'),
  
  // الحصول على قسم واحد
  getById: (id) => api.get(`/departments/${id}`),
  
  // إنشاء قسم جديد
  create: (departmentData) => api.post('/departments', departmentData),
  
  // تحديث قسم
  update: (id, departmentData) => api.put(`/departments/${id}`, departmentData),
  
  // حذف قسم
  delete: (id) => api.delete(`/departments/${id}`),
  
  // الحصول على أقسام نشطة
  getActive: () => api.get('/departments?status=active'),
  
  // تحديث عدد الموظفين في القسم
  updateEmployeeCount: (id, count) => 
    api.patch(`/departments/${id}`, { employeeCount: count }),
  
  // تحديث ميزانية القسم
  updateBudget: (id, budget) => 
    api.patch(`/departments/${id}`, { budget }),
};

// ===== PROJECTS API =====
export const projectsAPI = {
  // الحصول على جميع المشاريع
  getAll: () => api.get('/projects'),
  
  // الحصول على مشروع واحد
  getById: (id) => api.get(`/projects/${id}`),
  
  // إنشاء مشروع جديد
  create: (projectData) => api.post('/projects', projectData),
  
  // تحديث مشروع
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  
  // حذف مشروع
  delete: (id) => api.delete(`/projects/${id}`),
  
  // الحصول على مشاريع حسب الحالة
  getByStatus: (status) => api.get(`/projects?status=${status}`),
  
  // الحصول على مشاريع حسب القسم
  getByDepartment: (department) => api.get(`/projects?department=${department}`),
  
  // تحديث حالة المشروع
  updateStatus: (id, status) => api.patch(`/projects/${id}`, { status }),
  
  // إضافة عضو إلى المشروع
  addMember: (id, memberId) => 
    api.patch(`/projects/${id}`, { members: memberId }),
  
  // إزالة عضو من المشروع
  removeMember: (id, memberId) => 
    api.patch(`/projects/${id}`, { members: memberId }),
};

// ===== REPORTS API =====
export const reportsAPI = {
  // الحصول على جميع التقارير
  getAll: () => api.get('/reports'),
  
  // الحصول على تقرير واحد
  getById: (id) => api.get(`/reports/${id}`),
  
  // إنشاء تقرير جديد
  create: (reportData) => api.post('/reports', reportData),
  
  // تحديث تقرير
  update: (id, reportData) => api.put(`/reports/${id}`, reportData),
  
  // حذف تقرير
  delete: (id) => api.delete(`/reports/${id}`),
  
  // الحصول على تقارير حسب النوع
  getByType: (type) => api.get(`/reports?type=${type}`),
  
  // الحصول على تقارير حسب الحالة
  getByStatus: (status) => api.get(`/reports?status=${status}`),
  
  // تحديث حالة التقرير
  updateStatus: (id, status) => api.patch(`/reports/${id}`, { status }),
  
  // إضافة تعليق على التقرير
  addComment: (id, comment) => 
    api.patch(`/reports/${id}`, { comments: comment }),
};

// ===== ATTENDANCE API =====
export const attendanceAPI = {
  // الحصول على جميع سجلات الحضور
  getAll: () => api.get('/attendance'),
  
  // الحصول على سجل حضور واحد
  getById: (id) => api.get(`/attendance/${id}`),
  
  // إنشاء سجل حضور جديد
  create: (attendanceData) => api.post('/attendance', attendanceData),
  
  // تحديث سجل حضور
  update: (id, attendanceData) => api.put(`/attendance/${id}`, attendanceData),
  
  // حذف سجل حضور
  delete: (id) => api.delete(`/attendance/${id}`),
  
  // الحصول على حضور موظف معين
  getByEmployee: (employeeId) => api.get(`/attendance?employeeId=${employeeId}`),
  
  // الحصول على حضور في تاريخ معين
  getByDate: (date) => api.get(`/attendance?date=${date}`),
  
  // تسجيل دخول
  checkIn: (employeeId) => 
    api.post('/attendance', { 
      employeeId, 
      checkIn: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    }),
  
  // تسجيل خروج
  checkOut: (employeeId) => 
    api.patch(`/attendance/${employeeId}`, { 
      checkOut: new Date().toISOString() 
    }),
};

// ===== LEAVES API =====
export const leavesAPI = {
  // الحصول على جميع الإجازات
  getAll: () => api.get('/leaves'),
  
  // الحصول على إجازة واحدة
  getById: (id) => api.get(`/leaves/${id}`),
  
  // إنشاء إجازة جديدة
  create: (leaveData) => api.post('/leaves', leaveData),
  
  // تحديث إجازة
  update: (id, leaveData) => api.put(`/leaves/${id}`, leaveData),
  
  // حذف إجازة
  delete: (id) => api.delete(`/leaves/${id}`),
  
  // الحصول على إجازات موظف معين
  getByEmployee: (employeeId) => api.get(`/leaves?employeeId=${employeeId}`),
  
  // الحصول على إجازات حسب الحالة
  getByStatus: (status) => api.get(`/leaves?status=${status}`),
  
  // الموافقة على إجازة
  approve: (id) => api.patch(`/leaves/${id}`, { status: 'approved' }),
  
  // رفض إجازة
  reject: (id, reason) => api.patch(`/leaves/${id}`, { status: 'rejected', rejectionReason: reason }),
  
  // إلغاء إجازة
  cancel: (id) => api.patch(`/leaves/${id}`, { status: 'cancelled' }),
};

// ===== PERFORMANCE API =====
export const performanceAPI = {
  // الحصول على جميع تقييمات الأداء
  getAll: () => api.get('/performance'),
  
  // الحصول على تقييم أداء واحد
  getById: (id) => api.get(`/performance/${id}`),
  
  // إنشاء تقييم أداء جديد
  create: (performanceData) => api.post('/performance', performanceData),
  
  // تحديث تقييم أداء
  update: (id, performanceData) => api.put(`/performance/${id}`, performanceData),
  
  // حذف تقييم أداء
  delete: (id) => api.delete(`/performance/${id}`),
  
  // الحصول على تقييمات موظف معين
  getByEmployee: (employeeId) => api.get(`/performance?employeeId=${employeeId}`),
  
  // تحديث تقييم الأداء
  updateRating: (id, rating, comments) => 
    api.patch(`/performance/${id}`, { rating, comments, lastReview: new Date().toISOString() }),
};

// ===== NOTIFICATIONS API =====
export const notificationsAPI = {
  // الحصول على جميع الإشعارات
  getAll: () => api.get('/notifications'),
  
  // الحصول على إشعار واحد
  getById: (id) => api.get(`/notifications/${id}`),
  
  // إنشاء إشعار جديد
  create: (notificationData) => api.post('/notifications', notificationData),
  
  // تحديث إشعار
  update: (id, notificationData) => api.put(`/notifications/${id}`, notificationData),
  
  // حذف إشعار
  delete: (id) => api.delete(`/notifications/${id}`),
  
  // الحصول على إشعارات مستخدم معين
  getByUser: (userId) => api.get(`/notifications?userId=${userId}`),
  
  // تحديث حالة القراءة
  markAsRead: (id) => api.patch(`/notifications/${id}`, { read: true }),
  
  // تحديث جميع الإشعارات كمقروءة
  markAllAsRead: (userId) => api.patch(`/notifications`, { userId, read: true }),
  
  // إرسال إشعار
  sendNotification: (userId, title, message, type) => 
    api.post('/notifications', {
      userId,
      title,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    }),
};

// ===== DASHBOARD API =====
export const dashboardAPI = {
  // الحصول على بيانات Dashboard
  getDashboardData: () => api.get('/dashboard'),
  
  // الحصول على بيانات التحليلات
  getAnalyticsData: () => api.get('/analytics'),
  
  // الحصول على الإجراءات السريعة
  getQuickActions: (role) => api.get(`/quick-actions?role=${role}`),
  
  // الحصول على الإشعارات
  getNotifications: (userId) => api.get(`/notifications?userId=${userId}&read=false`),
  
  // الحصول على الإحصائيات
  getStats: () => api.get('/stats'),
  
  // الحصول على النشاط الأخير
  getRecentActivity: () => api.get('/recent-activity'),
};

// ===== UTILITY FUNCTIONS =====

// تحويل البيانات
export const transformData = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      id: item.id || Math.random().toString(36).substr(2, 9),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }
  return {
    ...data,
    id: data.id || Math.random().toString(36).substr(2, 9),
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// التعامل مع أخطاء API
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data.message || 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'Forbidden. You don\'t have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 409:
        return 'Conflict. This resource already exists.';
      case 422:
        return data.message || 'Validation error. Please check your input.';
      case 500:
        return 'Internal server error. Please try again later.';
      default:
        return data.message || 'An error occurred. Please try again.';
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred.';
  }
};

// التحقق من اتصال API
export const checkApiConnection = async () => {
  try {
    const response = await api.get('/');
    return { connected: true, data: response.data };
  } catch (error) {
    return { connected: false, error: handleApiError(error) };
  }
};

// إنشاء بيانات تجريبية
export const seedData = async () => {
  try {
    // إنشاء موظفين تجريبيين
    const employees = [
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@company.com',
        phone: '+1-555-0123',
        department: 'IT',
        position: 'Senior Developer',
        salary: 85000,
        hireDate: '2022-03-15',
        status: 'active',
        role: 'employee',
        emergencyContact: {
          name: 'Jane Smith',
          relationship: 'Spouse',
          phone: '+1-555-0124'
        }
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@company.com',
        phone: '+1-555-0125',
        department: 'IT',
        position: 'IT Manager',
        salary: 95000,
        hireDate: '2021-06-10',
        status: 'active',
        role: 'manager',
        managerDepartment: 'IT',
        emergencyContact: {
          name: 'Tom Johnson',
          relationship: 'Spouse',
          phone: '+1-555-0126'
        }
      }
    ];

    for (const employee of employees) {
      await employeesAPI.create(employee);
    }

    return { success: true, message: 'Data seeded successfully' };
  } catch (error) {
    return { success: false, error: handleApiError(error) };
  }
};

export default api; 