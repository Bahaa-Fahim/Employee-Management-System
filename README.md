# Employee Management System

A comprehensive employee management system built with React, featuring role-based access control and a modern UI.

## Features

### 🔐 Authentication & Authorization
- **Three User Roles**: Admin, Manager, Employee
- **Protected Routes**: Role-based page access
- **Session Management**: Persistent login state
- **Mock Authentication**: Ready for backend integration

### 👥 Employee Management
- **Employee CRUD**: Add, edit, delete employees
- **Department Management**: Organize employees by departments
- **Search & Filter**: Find employees quickly
- **Role-based Access**: Different permissions per role

### 📊 Dashboard & Reports
- **Analytics Dashboard**: Key metrics and statistics
- **Interactive Reports**: Employee distribution, salary analysis, performance metrics
- **Real-time Data**: Mock data with realistic scenarios

### 🎨 Modern UI/UX
- **Responsive Design**: Works on all devices
- **Tailwind CSS**: Modern styling framework
- **Bootstrap Integration**: Additional UI components
- **SweetAlert2**: Beautiful notifications and confirmations

## User Roles & Permissions

### 👑 Admin
- Full system access
- Manage all employees
- Department management
- System settings
- All reports and analytics

### 👔 Manager
- View and manage team employees
- Access team reports
- Employee performance tracking
- Limited department access

### 👤 Employee
- View own profile
- Update personal information
- Access personal dashboard
- Limited system access

## Demo Accounts

Use these accounts to test different roles:

```
👑 Admin:
Email: admin@company.com
Password: admin123

👔 Manager:
Email: manager@company.com
Password: manager123

👤 Employee:
Email: employee@company.com
Password: employee123
```

## Technology Stack

- **Frontend**: React 19
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS + Bootstrap
- **State Management**: React Context API
- **Notifications**: SweetAlert2
- **Build Tool**: Vite

## Getting Started

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

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Layout.jsx      # Main layout wrapper
│   └── ProtectedRoute.jsx # Route protection
├── pages/              # Application pages
│   ├── Login.jsx       # Authentication page
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Employees.jsx   # Employee management
│   ├── Departments.jsx # Department management
│   ├── Reports.jsx     # Analytics and reports
│   ├── Profile.jsx     # User profile
│   └── Settings.jsx    # System settings
├── context/            # React Context
│   └── AuthContext.jsx # Authentication state
└── App.jsx            # Main application component
```

## Backend Integration

This frontend is designed to be easily integrated with a backend API. Key integration points:

### Authentication
- Replace mock authentication in `AuthContext.jsx`
- Integrate with JWT or session-based auth
- Update API endpoints in service files

### Data Management
- Replace mock data with API calls
- Implement proper error handling
- Add loading states for async operations

### API Endpoints Structure
```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
GET    /api/departments
GET    /api/reports
```

## Customization

### Adding New Roles
1. Update `AuthContext.jsx` mock users
2. Modify `ProtectedRoute.jsx` permissions
3. Update `Sidebar.jsx` navigation items
4. Add role-specific components

### Styling
- Modify Tailwind classes for custom styling
- Update color schemes in `tailwind.config.js`
- Add custom CSS in `index.css`

### Features
- Add new pages in `pages/` directory
- Create reusable components in `components/`
- Update routing in `App.jsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
