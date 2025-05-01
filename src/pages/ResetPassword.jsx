import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { useToast } from '../components/Toast';
import './Auth.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToast();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      showErrorToast('Invalid or missing reset token');
      return;
    }
    
    // In a real app, this would be an API call to validate the token
    // For demo purposes, we'll simulate a valid token
    setTimeout(() => {
      setIsTokenValid(true);
    }, 500);
  }, [token, showErrorToast]);
  
  const validatePassword = (password) => {
    // Password must be at least 8 characters with at least one number, one uppercase, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(password)) {
      showErrorToast('Password must be at least 8 characters with at least one number, one uppercase, and one special character');
      return;
    }
    
    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to reset the password
      setIsLoading(false);
      setIsSubmitted(true);
      showSuccessToast('Your password has been reset successfully');
    }, 1500);
  };
  
  const handleLoginRedirect = () => {
    navigate('/login');
  };
  
  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-error">
            <h2>Invalid Request</h2>
            <p>The password reset link is invalid or has expired.</p>
            <Link to="/forgot-password" className="auth-button">
              Request a new password reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!isTokenValid) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-loading">
            <p>Validating your request...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Create New Password</h1>
          <p>Please enter your new password below.</p>
        </div>
        
        {isSubmitted ? (
          <div className="auth-success">
            <div className="success-icon">✓</div>
            <h2>Password Reset Complete</h2>
            <p>Your password has been reset successfully.</p>
            <button 
              className="auth-button"
              onClick={handleLoginRedirect}
            >
              Log in with your new password
            </button>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
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
              <div className="password-requirements">
                <p>Password must contain:</p>
                <ul>
                  <li className={password.length >= 8 ? 'valid' : ''}>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(password) ? 'valid' : ''}>
                    At least one uppercase letter
                  </li>
                  <li className={/\d/.test(password) ? 'valid' : ''}>
                    At least one number
                  </li>
                  <li className={/[@$!%*?&]/.test(password) ? 'valid' : ''}>
                    At least one special character (@$!%*?&)
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <div className="error-message">Passwords do not match</div>
              )}
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
            
            <div className="auth-links">
              <Link to="/login" className="back-to-login">
                <FaArrowLeft /> Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
