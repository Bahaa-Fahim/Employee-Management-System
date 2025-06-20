import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

// Mock users data (fallback for development)
const initialMockUsers = [
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
  const [useMockData, setUseMockData] = useState(true); // Toggle between mock and real API
  
  // Get mock users from localStorage or use initial data
  const getMockUsers = () => {
    const savedUsers = localStorage.getItem('mockUsers');
    return savedUsers ? JSON.parse(savedUsers) : initialMockUsers;
  };

  // Save mock users to localStorage
  const saveMockUsers = (users) => {
    localStorage.setItem('mockUsers', JSON.stringify(users));
  };

  // Add new user to mock system
  const addMockUser = (userData) => {
    const users = getMockUsers();
    const newUser = {
      id: Date.now(), // Simple ID generation
      email: userData.email,
      password: userData.password || '123456', // Default password
      name: `${userData.firstName} ${userData.lastName}`,
      role: 'employee', // Default role for new employees
      department: userData.department,
      position: userData.position
    };
    
    users.push(newUser);
    saveMockUsers(users);
    return newUser;
  };

  // Check for saved user on app load
  useEffect(() => {
    const initializeAuth = async () => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
        if (useMockData) {
          // Use mock data
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
        } else {
          // Verify token with backend
          try {
            const isValid = await authService.verifyToken();
            if (isValid) {
              const currentUser = await authService.getCurrentUser();
              setUser(currentUser);
              setIsAuthenticated(true);
            } else {
              // Token invalid, clear storage
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
          } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
    }
    
    setLoading(false);
    };

    initializeAuth();
  }, [useMockData]);

  // Login function
  const login = async (email, password) => {
    try {
      if (useMockData) {
        // Mock login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
        const users = getMockUsers();
        const foundUser = users.find(
        user => user.email === email && user.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      const token = `mock_token_${foundUser.id}_${Date.now()}`;
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
      } else {
        // Real API login
        const result = await authService.login(email, password);
        setUser(result.user);
        setIsAuthenticated(true);
        return result;
      }
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (!useMockData) {
        await authService.logout();
      } else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
    setUser(null);
    setIsAuthenticated(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      if (useMockData) {
        // Mock update
        const updatedUser = { ...user, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return updatedUser;
      } else {
        // Real API update
        const updatedUser = await authService.updateProfile(userData);
        setUser(updatedUser);
        return updatedUser;
      }
    } catch (error) {
      throw error;
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (useMockData) {
        // Mock password change
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: 'Password changed successfully' };
      } else {
        // Real API password change
        return await authService.changePassword(currentPassword, newPassword);
      }
    } catch (error) {
      throw error;
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      if (useMockData) {
        // Mock forgot password
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: 'Reset email sent successfully' };
      } else {
        // Real API forgot password
        return await authService.forgotPassword(email);
      }
    } catch (error) {
      throw error;
    }
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

  // Toggle between mock and real API
  const toggleMockData = (useMock) => {
    setUseMockData(useMock);
    // Clear current session when switching
    if (isAuthenticated) {
      logout();
    }
  };

  // Get all mock users (for admin purposes)
  const getMockUsersList = () => {
    return getMockUsers();
  };

  // Reset mock users to initial state
  const resetMockUsers = () => {
    saveMockUsers(initialMockUsers);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    useMockData,
    login,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    hasPermission,
    hasAnyPermission,
    toggleMockData,
    addMockUser,
    getMockUsersList,
    resetMockUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 