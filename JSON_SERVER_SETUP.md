# JSON Server Setup Guide

## نظرة عامة
هذا الدليل يوضح كيفية إعداد واستخدام JSON Server كـ mock API للتطوير حتى يتم الانتهاء من الـ backend الحقيقي.

## الملفات المطلوبة

### 1. db.json
يحتوي على البيانات الوهمية للنظام:
- الموظفين (employees)
- الأقسام (departments)
- المشاريع (projects)
- التقارير (reports)
- الحضور (attendance)
- الإجازات (leaves)
- تقييمات الأداء (performance)

### 2. package.json Scripts
```json
{
  "scripts": {
    "server": "json-server --watch db.json --port 3001",
    "dev:full": "concurrently \"npm run dev\" \"npm run server\""
  }
}
```

## كيفية التشغيل

### الطريقة الأولى: تشغيل JSON Server فقط
```bash
npm run server
```
سيتم تشغيل JSON Server على المنفذ 3001

### الطريقة الثانية: تشغيل التطبيق والـ server معاً
```bash
npm run dev:full
```
سيتم تشغيل React app على المنفذ 5173 و JSON Server على المنفذ 3001

## API Endpoints المتاحة

### الموظفين (Employees)
- `GET /employees` - الحصول على جميع الموظفين
- `GET /employees/:id` - الحصول على موظف واحد
- `POST /employees` - إنشاء موظف جديد
- `PUT /employees/:id` - تحديث موظف
- `DELETE /employees/:id` - حذف موظف
- `GET /employees?department=IT` - البحث حسب القسم
- `GET /employees?status=active` - البحث حسب الحالة
- `GET /employees?q=john` - البحث النصي

### الأقسام (Departments)
- `GET /departments` - الحصول على جميع الأقسام
- `GET /departments/:id` - الحصول على قسم واحد
- `POST /departments` - إنشاء قسم جديد
- `PUT /departments/:id` - تحديث قسم
- `DELETE /departments/:id` - حذف قسم
- `GET /departments?status=active` - الأقسام النشطة

### المشاريع (Projects)
- `GET /projects` - الحصول على جميع المشاريع
- `GET /projects/:id` - الحصول على مشروع واحد
- `POST /projects` - إنشاء مشروع جديد
- `PUT /projects/:id` - تحديث مشروع
- `DELETE /projects/:id` - حذف مشروع
- `GET /projects?status=in-progress` - المشاريع قيد التنفيذ

### التقارير (Reports)
- `GET /reports` - الحصول على جميع التقارير
- `GET /reports/:id` - الحصول على تقرير واحد
- `POST /reports` - إنشاء تقرير جديد
- `PUT /reports/:id` - تحديث تقرير
- `DELETE /reports/:id` - حذف تقرير
- `GET /reports?type=employee` - التقارير حسب النوع

### الحضور (Attendance)
- `GET /attendance` - الحصول على جميع سجلات الحضور
- `GET /attendance/:id` - الحصول على سجل حضور واحد
- `POST /attendance` - إنشاء سجل حضور جديد
- `PUT /attendance/:id` - تحديث سجل حضور
- `DELETE /attendance/:id` - حذف سجل حضور
- `GET /attendance?employeeId=1` - حضور موظف معين

### الإجازات (Leaves)
- `GET /leaves` - الحصول على جميع الإجازات
- `GET /leaves/:id` - الحصول على إجازة واحدة
- `POST /leaves` - إنشاء إجازة جديدة
- `PUT /leaves/:id` - تحديث إجازة
- `DELETE /leaves/:id` - حذف إجازة
- `GET /leaves?employeeId=1` - إجازات موظف معين

### تقييمات الأداء (Performance)
- `GET /performance` - الحصول على جميع التقييمات
- `GET /performance/:id` - الحصول على تقييم واحد
- `POST /performance` - إنشاء تقييم جديد
- `PUT /performance/:id` - تحديث تقييم
- `DELETE /performance/:id` - حذف تقييم
- `GET /performance?employeeId=1` - تقييمات موظف معين

## ميزات JSON Server

### البحث النصي
```bash
GET /employees?q=john
GET /departments?q=IT
```

### التصفية (Filtering)
```bash
GET /employees?department=IT&status=active
GET /projects?status=in-progress&priority=high
```

### الترتيب (Sorting)
```bash
GET /employees?_sort=firstName&_order=asc
GET /projects?_sort=startDate&_order=desc
```

### الصفحات (Pagination)
```bash
GET /employees?_page=1&_limit=10
GET /projects?_page=2&_limit=5
```

### العلاقات (Relations)
```bash
GET /employees?_embed=attendance
GET /departments?_embed=employees
```

## كيفية الانتقال للـ Backend الحقيقي

### 1. تغيير Base URL
في ملف `src/services/api.js`:
```javascript
// تغيير من
const API_BASE_URL = 'http://localhost:3001';

// إلى
const API_BASE_URL = 'https://your-backend-url.com/api';
```

### 2. تحديث Authentication
```javascript
// إضافة token handling
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3. تحديث Error Handling
```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## نصائح للتطوير

### 1. إضافة بيانات جديدة
```bash
# إضافة موظف جديد
curl -X POST http://localhost:3001/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ahmed",
    "lastName": "Ali",
    "email": "ahmed.ali@company.com",
    "department": "IT",
    "position": "Developer"
  }'
```

### 2. تحديث البيانات
```bash
# تحديث موظف
curl -X PUT http://localhost:3001/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John Updated",
    "lastName": "Smith Updated"
  }'
```

### 3. حذف البيانات
```bash
# حذف موظف
curl -X DELETE http://localhost:3001/employees/1
```

## استكشاف الأخطاء

### 1. مشكلة في الاتصال
```bash
# التحقق من حالة الخادم
curl http://localhost:3001/employees
```

### 2. مشكلة في البيانات
```bash
# عرض البيانات الحالية
cat db.json
```

### 3. إعادة تشغيل الخادم
```bash
# إيقاف الخادم (Ctrl+C) ثم إعادة التشغيل
npm run server
```

## ملاحظات مهمة

1. **البيانات مؤقتة**: البيانات في `db.json` ستختفي عند إعادة تشغيل الخادم
2. **لا يوجد authentication**: JSON Server لا يدعم authentication حقيقي
3. **لا يوجد validation**: يجب إضافة validation في الـ frontend
4. **CORS**: تأكد من إعداد CORS في الـ backend الحقيقي

## الانتقال النهائي

عند الانتهاء من الـ backend:
1. استبدل `API_BASE_URL` بالـ URL الحقيقي
2. أضف authentication headers
3. اختبر جميع الـ endpoints
4. أزل JSON Server من dependencies
5. حدث الـ documentation 