import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import MyTasks from './pages/MyTasks';
import MyLeaves from './pages/MyLeaves';
import Employees from './pages/Employees';
import ManagerEmployees from './pages/ManagerEmployees';
import Projects from './pages/Projects';
import ManagerProjects from './pages/ManagerProjects';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import Departments from './pages/Departments';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EmployeeProfile from './pages/EmployeeProfile';
import EmployeeDetails from './pages/EmployeeDetails';
import DepartmentDetails from './pages/DepartmentDetails';
import ProjectDetails from './pages/ProjectDetails';
import ManagerReports from './pages/ManagerReports';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router >
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/manager-dashboard" element={
              <ProtectedRoute requiredRole="manager">
                <Layout>
                  <ManagerDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/employee-dashboard" element={
              <ProtectedRoute requiredRole="employee">
                <Layout>
                  <EmployeeDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/tasks" element={
              <ProtectedRoute requiredRole="employee">
                <Layout>
                  <MyTasks />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/leaves" element={
              <ProtectedRoute requiredRole="employee">
                <Layout>
                  <MyLeaves />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/employees" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <Layout>
                  <Employees />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/manager-employees" element={
              <ProtectedRoute requiredRole="manager">
                <Layout>
                  <ManagerEmployees />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/employees/:id" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <Layout>
                  <EmployeeDetails />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/departments" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Departments />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/departments/:id" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <DepartmentDetails />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/projects" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <Layout>
                  <Projects />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/projects/:id" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <Layout>
                  <ProjectDetails />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/add-project" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <Layout>
                  <AddProject />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/edit-project/:id" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <Layout>
                  <EditProject />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute requiredRoles={['admin', 'manager', 'employee']}>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/manager-projects" element={
              <ProtectedRoute requiredRole="manager">
                <Layout>
                  <ManagerProjects />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/manager-reports" element={
              <ProtectedRoute requiredRole="manager">
                <Layout>
                  <ManagerReports />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
