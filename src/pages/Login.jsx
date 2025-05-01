import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, error } = useAuth();
  const { showSuccessToast, showErrorToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Attempt login
    const success = login(email, password);

    if (success) {
      showSuccessToast('Login successful');
      // Redirect to the page they were trying to access or home
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } else {
      setIsLoading(false);
      showErrorToast('Login failed. Please check your credentials.');
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);

    // In a real app, this would redirect to the OAuth provider
    // For demo purposes, we'll simulate a successful login after a delay
    setTimeout(() => {
      showSuccessToast(`Login with ${provider} successful`);
      login('social@example.com', 'social123', true);
      navigate(from, { replace: true });
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {(formError || error) && (
          <div className="auth-error">
            {formError || error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="social-login">
          <div className="social-login-divider">
            <span>Or sign in with</span>
          </div>

          <div className="social-buttons">
            <button
              type="button"
              className="social-button google"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
            >
              <FaGoogle /> Google
            </button>
            <button
              type="button"
              className="social-button facebook"
              onClick={() => handleSocialLogin('Facebook')}
              disabled={isLoading}
            >
              <FaFacebook /> Facebook
            </button>
            <button
              type="button"
              className="social-button apple"
              onClick={() => handleSocialLogin('Apple')}
              disabled={isLoading}
            >
              <FaApple /> Apple
            </button>
          </div>
        </div>

        <div className="auth-links">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>

        <div className="auth-demo">
          <h3>Demo Accounts:</h3>
          <p><strong>Regular User:</strong> john@example.com / password123</p>
          <p><strong>Admin User:</strong> admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
