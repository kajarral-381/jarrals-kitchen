import { useState, useEffect } from 'react';
import {
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
  FaMoneyBillWave,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaStripe,
  FaMobile,
  FaUniversity,
  FaQrcode
} from 'react-icons/fa';
import GooglePayButton from './GooglePayButton';
import StripeCheckout from './checkout/StripeCheckout';
import './PaymentMethods.css';

const PaymentMethods = ({ onPaymentMethodSelect, totalAmount = 0 }) => {
  const [selectedMethod, setSelectedMethod] = useState('stripe');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [showCvv, setShowCvv] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    onPaymentMethodSelect(method);

    // Reset payment completed state when changing payment method
    if (paymentCompleted) {
      setPaymentCompleted(false);
    }
  };

  const handleGooglePayComplete = (paymentData) => {
    setPaymentCompleted(true);
    onPaymentMethodSelect('googlePay', paymentData);
  };

  const handleStripePaymentSuccess = (paymentIntent) => {
    setPaymentCompleted(true);
    onPaymentMethodSelect('stripe', {
      transactionId: paymentIntent.id,
      paymentMethod: 'stripe',
      status: paymentIntent.status
    });
  };

  const handleStripePaymentError = (error) => {
    console.error('Stripe payment error:', error);
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
        <div className="payment-category">
          <h4>International Payment Methods</h4>
          <div className="payment-options-grid">
            <div
              className={`payment-option ${selectedMethod === 'stripe' ? 'selected' : ''}`}
              onClick={() => handleMethodChange('stripe')}
            >
              <FaCreditCard className="payment-icon" />
              <span>Stripe</span>
            </div>

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
          </div>
        </div>

        <div className="payment-category">
          <h4>Local Payment Methods</h4>
          <div className="payment-options-grid">
            <div
              className={`payment-option ${selectedMethod === 'jazzCash' ? 'selected' : ''}`}
              onClick={() => handleMethodChange('jazzCash')}
            >
              <FaMobile className="payment-icon" />
              <span>JazzCash</span>
            </div>

            <div
              className={`payment-option ${selectedMethod === 'easyPaisa' ? 'selected' : ''}`}
              onClick={() => handleMethodChange('easyPaisa')}
            >
              <FaQrcode className="payment-icon" />
              <span>EasyPaisa</span>
            </div>

            <div
              className={`payment-option ${selectedMethod === 'nayaPay' ? 'selected' : ''}`}
              onClick={() => handleMethodChange('nayaPay')}
            >
              <FaMobile className="payment-icon" />
              <span>NayaPay</span>
            </div>

            <div
              className={`payment-option ${selectedMethod === 'bankTransfer' ? 'selected' : ''}`}
              onClick={() => handleMethodChange('bankTransfer')}
            >
              <FaUniversity className="payment-icon" />
              <span>Bank Transfer</span>
            </div>

            <div
              className={`payment-option ${selectedMethod === 'cashOnDelivery' ? 'selected' : ''}`}
              onClick={() => handleMethodChange('cashOnDelivery')}
            >
              <FaMoneyBillWave className="payment-icon" />
              <span>Cash on Delivery</span>
            </div>
          </div>
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
        <div className="payment-info google-pay-container">
          {paymentCompleted ? (
            <div className="payment-success">
              <div className="success-icon">✓</div>
              <h4>Payment Successful!</h4>
              <p>Your Google Pay payment has been processed successfully.</p>
            </div>
          ) : (
            <>
              <p>Complete your payment securely with Google Pay.</p>
              <GooglePayButton
                amount={totalAmount}
                onPaymentComplete={handleGooglePayComplete}
              />
            </>
          )}
        </div>
      )}

      {selectedMethod === 'cashOnDelivery' && (
        <div className="payment-info">
          <p>Pay with cash when your order is delivered.</p>
          <p className="note">Note: A small cash handling fee may apply.</p>
        </div>
      )}

      {selectedMethod === 'stripe' && (
        <div className="payment-info stripe-container">
          {paymentCompleted ? (
            <div className="payment-success">
              <div className="success-icon">✓</div>
              <h4>Payment Successful!</h4>
              <p>Your Stripe payment has been processed successfully.</p>
            </div>
          ) : (
            <>
              <p>Complete your payment securely with Stripe.</p>
              <StripeCheckout
                amount={totalAmount}
                onSuccess={handleStripePaymentSuccess}
                onError={handleStripePaymentError}
                metadata={{
                  customerName: `${cardDetails.cardName || 'Customer'}`,
                  customerEmail: 'customer@example.com'
                }}
              />
            </>
          )}
        </div>
      )}

      {selectedMethod === 'jazzCash' && (
        <div className="payment-info local-payment">
          <div className="local-payment-header">
            <FaMobile className="local-payment-icon" />
            <h4>JazzCash Payment</h4>
          </div>

          <div className="local-payment-instructions">
            <p>Follow these steps to pay with JazzCash:</p>
            <ol>
              <li>Open your JazzCash mobile app</li>
              <li>Select "Send Money" or "Payments"</li>
              <li>Enter our JazzCash account: <strong>0300-1234567</strong></li>
              <li>Enter amount: <strong>₨ {totalAmount.toFixed(2)}</strong></li>
              <li>Include your Order ID in the reference</li>
              <li>Complete the payment in your JazzCash app</li>
              <li>Enter the Transaction ID below</li>
            </ol>
          </div>

          <div className="local-payment-form">
            <div className="form-group">
              <label htmlFor="jazzCashTransactionId">JazzCash Transaction ID</label>
              <input
                type="text"
                id="jazzCashTransactionId"
                placeholder="e.g., JC123456789"
                onChange={(e) => {
                  if (e.target.value.length > 5) {
                    onPaymentMethodSelect('jazzCash', {
                      transactionId: e.target.value,
                      paymentMethod: 'jazzCash'
                    });
                  }
                }}
              />
            </div>
            <div className="qr-code-container">
              <p>Or scan this QR code with your JazzCash app:</p>
              <div className="qr-code-placeholder">
                <FaQrcode size={120} />
                <p>JazzCash QR Code</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'easyPaisa' && (
        <div className="payment-info local-payment">
          <div className="local-payment-header">
            <FaQrcode className="local-payment-icon" />
            <h4>EasyPaisa Payment</h4>
          </div>

          <div className="local-payment-instructions">
            <p>Follow these steps to pay with EasyPaisa:</p>
            <ol>
              <li>Open your EasyPaisa mobile app</li>
              <li>Select "Send Money" or "Payments"</li>
              <li>Enter our EasyPaisa account: <strong>0300-7654321</strong></li>
              <li>Enter amount: <strong>₨ {totalAmount.toFixed(2)}</strong></li>
              <li>Include your Order ID in the reference</li>
              <li>Complete the payment in your EasyPaisa app</li>
              <li>Enter the Transaction ID below</li>
            </ol>
          </div>

          <div className="local-payment-form">
            <div className="form-group">
              <label htmlFor="easyPaisaTransactionId">EasyPaisa Transaction ID</label>
              <input
                type="text"
                id="easyPaisaTransactionId"
                placeholder="e.g., EP123456789"
                onChange={(e) => {
                  if (e.target.value.length > 5) {
                    onPaymentMethodSelect('easyPaisa', {
                      transactionId: e.target.value,
                      paymentMethod: 'easyPaisa'
                    });
                  }
                }}
              />
            </div>
            <div className="qr-code-container">
              <p>Or scan this QR code with your EasyPaisa app:</p>
              <div className="qr-code-placeholder">
                <FaQrcode size={120} />
                <p>EasyPaisa QR Code</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'nayaPay' && (
        <div className="payment-info local-payment">
          <div className="local-payment-header">
            <FaMobile className="local-payment-icon" />
            <h4>NayaPay Payment</h4>
          </div>

          <div className="local-payment-instructions">
            <p>Follow these steps to pay with NayaPay:</p>
            <ol>
              <li>Open your NayaPay mobile app</li>
              <li>Select "Send Money" or "Pay"</li>
              <li>Enter our NayaPay ID: <strong>jarralskitchen@nayapay</strong></li>
              <li>Enter amount: <strong>₨ {totalAmount.toFixed(2)}</strong></li>
              <li>Include your Order ID in the message/note</li>
              <li>Complete the payment in your NayaPay app</li>
              <li>Enter the Transaction ID below</li>
            </ol>
          </div>

          <div className="local-payment-form">
            <div className="form-group">
              <label htmlFor="nayaPayTransactionId">NayaPay Transaction ID</label>
              <input
                type="text"
                id="nayaPayTransactionId"
                placeholder="e.g., NP123456789"
                onChange={(e) => {
                  if (e.target.value.length > 5) {
                    onPaymentMethodSelect('nayaPay', {
                      transactionId: e.target.value,
                      paymentMethod: 'nayaPay'
                    });
                  }
                }}
              />
            </div>
            <div className="qr-code-container">
              <p>Or scan this QR code with your NayaPay app:</p>
              <div className="qr-code-placeholder">
                <FaQrcode size={120} />
                <p>NayaPay QR Code</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'bankTransfer' && (
        <div className="payment-info local-payment">
          <div className="local-payment-header">
            <FaUniversity className="local-payment-icon" />
            <h4>Bank Transfer</h4>
          </div>

          <div className="local-payment-instructions">
            <p>Please transfer the total amount to our bank account:</p>
            <div className="bank-details">
              <p><strong>Bank Name:</strong> HBL (Habib Bank Limited)</p>
              <p><strong>Account Title:</strong> Jarral's Kitchen</p>
              <p><strong>Account Number:</strong> 12345678901234</p>
              <p><strong>IBAN:</strong> PK36HABB0012345678901234</p>
              <p><strong>Branch Code:</strong> 0123</p>
              <p><strong>Amount:</strong> ₨ {totalAmount.toFixed(2)}</p>
              <p><strong>Reference:</strong> Your Order ID</p>
            </div>
            <p className="note">Please include your Order ID as reference so we can match your payment.</p>
          </div>

          <div className="local-payment-form">
            <div className="form-group">
              <label htmlFor="bankTransferReference">Bank Transfer Reference</label>
              <input
                type="text"
                id="bankTransferReference"
                placeholder="e.g., HBL123456789"
                onChange={(e) => {
                  if (e.target.value.length > 5) {
                    onPaymentMethodSelect('bankTransfer', {
                      transactionId: e.target.value,
                      paymentMethod: 'bankTransfer'
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
