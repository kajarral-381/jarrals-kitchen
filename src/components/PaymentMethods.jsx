import { useState } from 'react';
import { 
  FaCreditCard, 
  FaPaypal, 
  FaApplePay, 
  FaGooglePay, 
  FaMoneyBillWave,
  FaLock,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import './PaymentMethods.css';

const PaymentMethods = ({ onPaymentMethodSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [showCvv, setShowCvv] = useState(false);
  
  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    onPaymentMethodSelect(method);
  };
  
  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      
      setCardDetails({
        ...cardDetails,
        [name]: formattedValue
      });
      return;
    }
    
    // Format expiry date with slash
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\//g, '')
        .replace(/(\d{2})(\d{2})/, '$1/$2')
        .slice(0, 5);
      
      setCardDetails({
        ...cardDetails,
        [name]: formattedValue
      });
      return;
    }
    
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };
  
  return (
    <div className="payment-methods">
      <h3>Select Payment Method</h3>
      
      <div className="payment-options">
        <div 
          className={`payment-option ${selectedMethod === 'creditCard' ? 'selected' : ''}`}
          onClick={() => handleMethodChange('creditCard')}
        >
          <FaCreditCard className="payment-icon" />
          <span>Credit/Debit Card</span>
        </div>
        
        <div 
          className={`payment-option ${selectedMethod === 'paypal' ? 'selected' : ''}`}
          onClick={() => handleMethodChange('paypal')}
        >
          <FaPaypal className="payment-icon" />
          <span>PayPal</span>
        </div>
        
        <div 
          className={`payment-option ${selectedMethod === 'applePay' ? 'selected' : ''}`}
          onClick={() => handleMethodChange('applePay')}
        >
          <FaApplePay className="payment-icon" />
          <span>Apple Pay</span>
        </div>
        
        <div 
          className={`payment-option ${selectedMethod === 'googlePay' ? 'selected' : ''}`}
          onClick={() => handleMethodChange('googlePay')}
        >
          <FaGooglePay className="payment-icon" />
          <span>Google Pay</span>
        </div>
        
        <div 
          className={`payment-option ${selectedMethod === 'cashOnDelivery' ? 'selected' : ''}`}
          onClick={() => handleMethodChange('cashOnDelivery')}
        >
          <FaMoneyBillWave className="payment-icon" />
          <span>Cash on Delivery</span>
        </div>
      </div>
      
      {selectedMethod === 'creditCard' && (
        <div className="card-details">
          <div className="secure-badge">
            <FaLock /> Secure Payment
          </div>
          
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <div className="input-with-icon">
              <FaCreditCard className="input-icon" />
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                maxLength="19"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="cardName">Cardholder Name</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              placeholder="John Doe"
              value={cardDetails.cardName}
              onChange={handleCardDetailsChange}
            />
          </div>
          
          <div className="card-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                maxLength="5"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <div className="input-with-icon">
                <input
                  type={showCvv ? 'text' : 'password'}
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  maxLength="4"
                />
                <button
                  type="button"
                  className="cvv-toggle"
                  onClick={() => setShowCvv(!showCvv)}
                  aria-label={showCvv ? 'Hide CVV' : 'Show CVV'}
                >
                  {showCvv ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedMethod === 'paypal' && (
        <div className="payment-info">
          <p>You will be redirected to PayPal to complete your payment securely.</p>
        </div>
      )}
      
      {selectedMethod === 'applePay' && (
        <div className="payment-info">
          <p>You will be prompted to confirm payment with Apple Pay.</p>
        </div>
      )}
      
      {selectedMethod === 'googlePay' && (
        <div className="payment-info">
          <p>You will be prompted to confirm payment with Google Pay.</p>
        </div>
      )}
      
      {selectedMethod === 'cashOnDelivery' && (
        <div className="payment-info">
          <p>Pay with cash when your order is delivered.</p>
          <p className="note">Note: A small cash handling fee may apply.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
