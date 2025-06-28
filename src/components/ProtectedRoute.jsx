import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null, requiredRoles = [] }) => {
  const { isAuthenticated, user, hasPermission, hasRole } = useAuth();

  // If user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check permissions
  let hasAccess = true;

  if (requiredRole) {
    hasAccess = hasRole(requiredRole);
  } else if (requiredRoles.length > 0) {
    hasAccess = requiredRoles.some(role => hasRole(role));
  }

  // If user doesn't have permission
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            Sorry, you don't have permission to access this page
          </p>
          <p className="text-sm text-gray-500">
            Current user role: {user?.role}
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 