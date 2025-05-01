import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useToast } from '../components/Toast';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showErrorToast('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to send a password reset email
      setIsLoading(false);
      setIsSubmitted(true);
      showSuccessToast('Password reset instructions sent to your email');
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Reset Your Password</h1>
          <p>Enter your email address and we'll send you instructions to reset your password.</p>
        </div>
        
        {isSubmitted ? (
          <div className="auth-success">
            <div className="success-icon">✓</div>
            <h2>Check Your Email</h2>
            <p>We've sent password reset instructions to:</p>
            <p className="email-sent">{email}</p>
            <p className="instructions">
              If you don't see the email in your inbox, please check your spam folder.
            </p>
            <div className="auth-links">
              <Link to="/login" className="back-to-login">
                <FaArrowLeft /> Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Reset Password'}
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

export default ForgotPassword;
