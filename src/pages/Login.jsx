import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
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
        break;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Reset Password',
      text: 'Please enter your email address',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Send Reset Link',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Reset Link Sent!',
          text: 'Please check your email for password reset instructions',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome to Employee Management System',
        timer: 2000,
        showConfirmButton: false
      });

      navigate('/dashboard');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'An error occurred, please try again'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1 className="login-title">Welcome to EMS</h1>
            <p className="login-subtitle">Employee Management System</p>
          </div>

          {/* Role Selection */}
          <div className="role-buttons">
            <button
              onClick={() => handleRoleSelect('admin')}
              className={`role-button ${selectedRole === 'admin' ? 'admin' : 'inactive'}`}
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleSelect('manager')}
              className={`role-button ${selectedRole === 'manager' ? 'manager' : 'inactive'}`}
            >
              Manager
            </button>
            <button
              onClick={() => handleRoleSelect('employee')}
              className={`role-button ${selectedRole === 'employee' ? 'employee' : 'inactive'}`}
            >
              Employee
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            <div className="form-footer">
              <div className="remember-me">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="remember-checkbox"
                />
                <label htmlFor="remember_me" className="form-label">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="forgot-password"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>

            {/* Demo Accounts */}
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 