# 🏢 Employee Management System

A comprehensive employee management system built with React, featuring detailed views, JSON Server API, and modern UI design.

## ✨ Features

### 🔐 Authentication & Authorization
- **Multi-role system**: Admin, Manager, Employee
- **Secure login/logout**
- **Role-based access control**
- **Protected routes**

### 👥 Employee Management
- **Complete CRUD operations**
- **Detailed employee profiles**
- **Performance tracking**
- **Attendance monitoring**
- **Salary management**
- **Role promotion/demotion**

### 🏢 Department Management
- **Department overview**
- **Employee distribution**
- **Budget tracking**
- **Manager assignment**

### 📊 Project Management
- **Project creation and tracking**
- **Team assignment**
- **Progress monitoring**
- **Timeline management**

### 📈 Reports & Analytics
- **Dashboard statistics**
- **Performance reports**
- **Department analytics**
- **Export functionality**

### 🎨 Modern UI/UX
- **Responsive design**
- **Dark/Light themes**
- **Interactive charts**
- **Real-time updates**

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Employee-Management
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env
```

4. **Start the development servers**
```bash
# Start both JSON Server and React app
npm run dev:full

# Or start them separately:
npm run server    # JSON Server on port 3001
npm run dev       # React app on port 5173
```

5. **Access the application**
- Frontend: http://localhost:5173
- API: http://localhost:3001

## 🔧 Configuration

### Environment Variables
```bash
# Backend API Configuration
VITE_API_URL=http://localhost:3001

# App Configuration
VITE_APP_TITLE=Employee Management System
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_MOCK_DATA=false
VITE_ENABLE_ANALYTICS=false

# Development Settings
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=info
```

### Default Login Credentials
```
Admin:
- Email: admin@company.com
- Password: admin123

Manager:
- Email: manager@company.com
- Password: manager123

Employee:
- Email: employee@company.com
- Password: employee123
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── pages/              # Page components
│   ├── EmployeeDetails.jsx    # Detailed employee view
│   ├── DepartmentDetails.jsx  # Detailed department view
│   ├── ProjectDetails.jsx     # Detailed project view
│   └── ...
├── services/           # API services
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🔗 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### Employees
- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee details
- `POST /employees` - Create employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Departments
- `GET /departments` - Get all departments
- `GET /departments/:id` - Get department details
- `POST /departments` - Create department
- `PUT /departments/:id` - Update department
- `DELETE /departments/:id` - Delete department

### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project details
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

## 🎯 Key Features

### 📋 Detailed Views
- **Employee Details**: Complete profile with performance, attendance, and personal info
- **Department Details**: Overview with employee list and budget information
- **Project Details**: Timeline, team members, and progress tracking

### 🔄 Real-time Updates
- **JSON Server**: Provides real-time API with automatic data persistence
- **Live Updates**: Changes reflect immediately across the application
- **Data Persistence**: All data is saved to `db.json` file

### 📱 Responsive Design
- **Mobile-friendly**: Works perfectly on all device sizes
- **Modern UI**: Clean, professional interface
- **Accessibility**: WCAG compliant design

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start React development server
npm run server       # Start JSON Server
npm run dev:full     # Start both servers concurrently
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update API services in `src/services/`
4. Add routes in `src/App.jsx`
5. Update navigation in `src/components/Sidebar.jsx`

## 📊 Data Structure

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
  status: 'active' | 'inactive' | 'on-leave',
  role: 'admin' | 'manager' | 'employee',
  performance: {
    rating: number,
    lastReview: Date,
    nextReview: Date,
    comments: string
  },
  attendance: {
    presentDays: number,
    absentDays: number,
    lateDays: number
  }
}
```

### Department Model
```javascript
{
  id: number,
  name: string,
  code: string,
  manager: string,
  employeeCount: number,
  budget: number,
  status: 'active' | 'inactive',
  description: string,
  color: string
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

### Environment Variables for Production
```bash
VITE_API_URL=https://your-api-domain.com
VITE_ENABLE_MOCK_DATA=false
VITE_DEBUG_MODE=false
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section in the documentation
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ using React, Vite, and JSON Server**
