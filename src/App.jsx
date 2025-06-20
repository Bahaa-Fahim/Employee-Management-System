import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Projects from './pages/Projects';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import Departments from './pages/Departments';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EmployeeProfile from './pages/EmployeeProfile';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router basename="/Employee-Management-System">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
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
            
            <Route path="/employees/:id" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <Layout>
                  <EmployeeProfile />
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
            
            <Route path="/departments" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Departments />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
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
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
