import { useState, useEffect } from 'react';
import {
  FaMobile,
  FaQrcode
} from 'react-icons/fa';
import './PaymentMethods.css';

const PaymentMethods = ({ onPaymentMethodSelect, totalAmount = 0 }) => {
  // Always use NayaPay as the selected method
  const [selectedMethod] = useState('nayaPay');

  // Set NayaPay as the payment method when component mounts
  useEffect(() => {
    onPaymentMethodSelect('nayaPay');
  }, [onPaymentMethodSelect]);

  return (
    <div className="payment-methods">
      <h3>Payment Method</h3>

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
    </div>
  );
};

export default PaymentMethods;
