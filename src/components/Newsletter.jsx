import { useState } from 'react';
import { FaPaperPlane, FaCheck } from 'react-icons/fa';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      // In a real app, this would be an API call to subscribe the user
      console.log('Subscribing email:', email);
      
      setLoading(false);
      setSubscribed(true);
      setEmail('');
      
      // Reset subscription status after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay updated with our latest products, promotions, and baking tips!</p>
        
        {subscribed ? (
          <div className="subscription-success">
            <FaCheck className="success-icon" />
            <p>Thank you for subscribing!</p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={loading}
              />
              <button 
                type="submit" 
                className={loading ? 'loading' : ''}
                disabled={loading}
              >
                {loading ? 'Subscribing...' : <FaPaperPlane />}
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        )}
        
        <div className="newsletter-benefits">
          <div className="benefit">
            <span>🎁</span>
            <p>Exclusive offers</p>
          </div>
          <div className="benefit">
            <span>🍰</span>
            <p>New recipes</p>
          </div>
          <div className="benefit">
            <span>🎂</span>
            <p>Birthday surprise</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
