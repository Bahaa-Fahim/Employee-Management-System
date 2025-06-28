import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUsers, FiUser, FiShield, FiAlertCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    switch(role) {
      case 'admin':
        setFormData({ email: 'admin@company.com', password: 'admin123' });
        break;
      case 'manager':
        setFormData({ email: 'manager@company.com', password: 'manager123' });
        break;
      case 'employee':
        setFormData({ email: 'employee@company.com', password: 'employee123' });
        break;
      default:
        setFormData({ email: '', password: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
        customClass: { popup: 'rounded-xl' }
      });
      return;
    }

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success || result.user) {
        Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: `Welcome, ${result.user.name}!`,
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: 'rounded-xl' }
        });

        // حفظ تفضيل "تذكرني"
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('rememberedEmail');
        }

        // التوجيه حسب الدور
        setTimeout(() => {
          switch(result.user.role) {
            case 'admin':
              navigate('/dashboard');
              break;
            case 'manager':
              navigate('/manager-dashboard');
              break;
            case 'employee':
              navigate('/employee-dashboard');
              break;
            default:
              navigate('/dashboard');
          }
        }, 1000);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid email or password. Please try again.',
        customClass: { popup: 'rounded-xl' }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Forgot Password',
      text: 'Enter your email address to reset your password:',
      input: 'email',
      inputPlaceholder: 'Enter your email',
      showCancelButton: true,
      confirmButtonText: 'Send Reset Link',
      cancelButtonText: 'Cancel',
      customClass: { popup: 'rounded-xl' },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter your email address!';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // هنا سيتم إرسال رابط إعادة تعيين كلمة المرور
        Swal.fire({
          icon: 'success',
          title: 'Reset Link Sent!',
          text: 'If an account with that email exists, you will receive a password reset link.',
          customClass: { popup: 'rounded-xl' }
        });
      }
    });
  };

  return (
    <div className="min-h-screen animated-bg particles-bg flex items-center justify-center p-4 relative">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full opacity-25 animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full opacity-35 animate-pulse delay-1500"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 glass rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <FiUsers className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Welcome Back</h2>
          <p className="text-white/80 text-lg">Sign in to your account to continue</p>
        </div>

        {/* Quick Role Selection */}
        <div className="glass-card rounded-2xl shadow-2xl p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">Quick Login (Demo)</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleRoleSelect('admin')}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedRole === 'admin'
                  ? 'border-red-500 bg-red-50 text-red-700 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiShield className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium">Admin</span>
            </button>
            <button
              onClick={() => handleRoleSelect('manager')}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedRole === 'manager'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiUsers className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium">Manager</span>
            </button>
            <button
              onClick={() => handleRoleSelect('employee')}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedRole === 'employee'
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiUser className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium">Employee</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="glass-card rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        {/* Demo Info */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <div className="flex items-start">
            <FiAlertCircle className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <ul className="space-y-1 text-xs">
                <li><strong>Admin:</strong> admin@company.com / admin123</li>
                <li><strong>Manager:</strong> manager@company.com / manager123</li>
                <li><strong>Employee:</strong> employee@company.com / employee123</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-white/70">
          <p>&copy; 2024 Employee Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login; 