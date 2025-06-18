import { createContext, useContext, useState, useEffect } from 'react';

// Mock users data
const mockUsers = [
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

  // Check for saved user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(
        user => user.email === email && user.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      // Create mock token
      const token = `mock_token_${foundUser.id}_${Date.now()}`;
      
      // Save user data
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        department: foundUser.department,
        position: foundUser.position
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check permissions
  const hasPermission = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole || user.role === 'admin';
  };

  // Check multiple permissions
  const hasAnyPermission = (requiredRoles) => {
    if (!user) return false;
    return requiredRoles.includes(user.role) || user.role === 'admin';
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasPermission,
    hasAnyPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 