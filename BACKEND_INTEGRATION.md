# 🔗 Backend Integration Guide

## 📋 نظرة عامة

هذا الدليل يشرح كيفية ربط تطبيق React مع backend API. النظام مصمم للعمل مع أي backend يدعم RESTful API.

## 🏗️ البنية المقترحة للـ Backend

### 1. التقنيات المقترحة
- **Node.js + Express.js** (JavaScript/TypeScript)
- **Python + Django/FastAPI** (Python)
- **PHP + Laravel** (PHP)
- **Java + Spring Boot** (Java)
- **C# + ASP.NET Core** (C#)

### 2. قاعدة البيانات
- **PostgreSQL** (موصى به)
- **MySQL/MariaDB**
- **MongoDB** (NoSQL)
- **SQLite** (للتنمية)

## 🔧 إعداد البيئة

### 1. إنشاء ملف Environment
```bash
# انسخ الملف المثال
cp env.example .env

# عدل القيم حسب إعداداتك
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_MOCK_DATA=false
```

### 2. تبديل بين Mock Data و Real API
```javascript
// في AuthContext
const { toggleMockData } = useAuth();

// لتفعيل API الحقيقي
toggleMockData(false);

// للعودة للبيانات الوهمية
toggleMockData(true);
```

## 📡 API Endpoints المطلوبة

### Authentication Endpoints
```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
PUT    /api/auth/profile
PUT    /api/auth/change-password
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/verify
```

### Employee Endpoints
```
GET    /api/employees
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
GET    /api/employees/search
GET    /api/employees/stats
POST   /api/employees/:id/photo
POST   /api/employees/bulk-delete
PUT    /api/employees/bulk-update
GET    /api/employees/export
```

### Department Endpoints
```
GET    /api/departments
GET    /api/departments/:id
POST   /api/departments
PUT    /api/departments/:id
DELETE /api/departments/:id
GET    /api/departments/stats
GET    /api/departments/:id/employees
```

### Report Endpoints
```
GET    /api/reports/dashboard
GET    /api/reports/employees
GET    /api/reports/departments
GET    /api/reports/salary
GET    /api/reports/performance
GET    /api/reports/:type/export
GET    /api/reports/templates
POST   /api/reports/schedule
```

## 🔐 Authentication & Authorization

### 1. JWT Token Structure
```javascript
// Request Header
Authorization: Bearer <token>

// Token Payload Example
{
  "id": 1,
  "email": "admin@company.com",
  "role": "admin",
  "iat": 1640995200,
  "exp": 1641081600
}
```

### 2. Response Format
```javascript
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 📊 Data Models

### User Model
```javascript
{
  id: number,
  name: string,
  email: string,
  role: "admin" | "manager" | "employee",
  department: string,
  position: string,
  avatar?: string,
  phone?: string,
  address?: string,
  hireDate: Date,
  salary?: number,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Employee Model
```javascript
{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  department: string,
  position: string,
  salary: number,
  hireDate: Date,
  managerId?: number,
  photo?: string,
  address?: string,
  emergencyContact?: {
    name: string,
    phone: string,
    relationship: string
  },
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Department Model
```javascript
{
  id: number,
  name: string,
  description?: string,
  managerId?: number,
  budget?: number,
  location?: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ مثال Backend بسيط (Node.js + Express)

### 1. إعداد المشروع
```bash
mkdir employee-management-backend
cd employee-management-backend
npm init -y
npm install express cors helmet morgan bcryptjs jsonwebtoken dotenv
npm install --save-dev nodemon
```

### 2. ملف package.json
```json
{
  "name": "employee-management-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "dotenv": "^16.0.3"
  }
}
```

### 3. ملف server.js الأساسي
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/reports', require('./routes/reports'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 4. مثال Route للـ Authentication
```javascript
// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock users database
const users = [
  {
    id: 1,
    email: 'admin@company.com',
    password: '$2a$10$...', // hashed password
    name: 'Ahmed Mohamed',
    role: 'admin',
    department: 'IT',
    position: 'System Administrator'
  }
];

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

module.exports = router;
```

## 🔄 تحديث Frontend Components

### 1. تحديث Login Component
```javascript
import { authService } from '../services/authService';

const handleLogin = async (email, password) => {
  try {
    setLoading(true);
    const result = await authService.login(email, password);
    // Handle successful login
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};
```

### 2. تحديث Employees Component
```javascript
import { employeeService } from '../services/employeeService';

const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadEmployees();
}, []);

const loadEmployees = async () => {
  try {
    setLoading(true);
    const data = await employeeService.getEmployees();
    setEmployees(data.employees);
  } catch (error) {
    console.error('Failed to load employees:', error);
  } finally {
    setLoading(false);
  }
};
```

## 🧪 Testing

### 1. Test API Endpoints
```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"admin123"}'

# Test protected endpoint
curl -X GET http://localhost:3000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Frontend Testing
```javascript
// Test service functions
import { authService } from '../services/authService';

// Test login
const testLogin = async () => {
  try {
    const result = await authService.login('admin@company.com', 'admin123');
    console.log('Login successful:', result);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## 🚀 Deployment

### 1. Backend Deployment
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repository
- **DigitalOcean**: Deploy using App Platform
- **AWS**: Use Elastic Beanstalk or EC2

### 2. Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### 3. Environment Variables in Production
```bash
# Set production API URL
VITE_API_URL=https://your-backend-api.com/api
VITE_ENABLE_MOCK_DATA=false
```

## 🔒 Security Best Practices

### 1. Backend Security
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs
- Use environment variables for secrets
- Implement proper CORS settings
- Use helmet.js for security headers

### 2. Frontend Security
- Never store sensitive data in localStorage
- Validate forms on frontend and backend
- Use HTTPS in production
- Implement proper error handling
- Sanitize user inputs

## 📝 Checklist للـ Integration

- [ ] إعداد ملف .env
- [ ] إنشاء backend API
- [ ] اختبار جميع endpoints
- [ ] تحديث frontend services
- [ ] اختبار authentication
- [ ] اختبار CRUD operations
- [ ] إعداد error handling
- [ ] اختبار في production
- [ ] إعداد monitoring
- [ ] توثيق API

## 🆘 Troubleshooting

### Common Issues
1. **CORS Errors**: تأكد من إعداد CORS في backend
2. **Authentication Errors**: تحقق من JWT token
3. **Network Errors**: تأكد من صحة API URL
4. **Data Format Errors**: تحقق من format البيانات

### Debug Tips
```javascript
// Enable debug mode
localStorage.setItem('debug', 'true');

// Check API responses
console.log('API Response:', response.data);

// Check authentication
console.log('Token:', localStorage.getItem('token'));
```

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub. 