import { useState, useEffect } from 'react';
import { FaGoogle, FaSpinner } from 'react-icons/fa';
import { useToast } from './Toast';
import './GooglePayButton.css';

const GooglePayButton = ({ amount, onPaymentComplete }) => {
  const [isGooglePayAvailable, setIsGooglePayAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  // Google Pay client configuration
  const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
  };

  const allowedCardNetworks = [
    "AMEX",
    "DISCOVER",
    "INTERAC",
    "JCB",
    "MASTERCARD",
    "VISA"
  ];

  const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

  const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      'gateway': 'example',
      'gatewayMerchantId': 'exampleGatewayMerchantId'
    }
  };

  const baseCardPaymentMethod = {
    type: 'CARD',
    parameters: {
      allowedAuthMethods: allowedCardAuthMethods,
      allowedCardNetworks: allowedCardNetworks
    }
  };

  const cardPaymentMethod = {
    ...baseCardPaymentMethod,
    tokenizationSpecification: tokenizationSpecification
  };

  const googlePayConfiguration = {
    ...baseRequest,
    allowedPaymentMethods: [cardPaymentMethod],
    merchantInfo: {
      // This ID is for testing only - replace with your actual merchant ID in production
      merchantId: '12345678901234567890',
      merchantName: 'Sweet Delights Bakery'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: amount.toString(),
      currencyCode: 'PKR',
      countryCode: 'PK'
    }
  };

  useEffect(() => {
    // Check if Google Pay is available
    const checkGooglePayAvailability = async () => {
      setIsLoading(true);
      
      try {
        // Check if Google Pay API is available in the browser
        if (!window.google || !window.google.payments || !window.google.payments.api) {
          // Load Google Pay script dynamically
          const script = document.createElement('script');
          script.src = 'https://pay.google.com/gp/p/js/pay.js';
          script.async = true;
          script.onload = () => initGooglePay();
          script.onerror = () => {
            setIsLoading(false);
            setIsGooglePayAvailable(false);
          };
          document.body.appendChild(script);
        } else {
          initGooglePay();
        }
      } catch (error) {
        console.error('Error checking Google Pay availability:', error);
        setIsLoading(false);
        setIsGooglePayAvailable(false);
      }
    };

    const initGooglePay = async () => {
      try {
        if (window.google && window.google.payments && window.google.payments.api) {
          const client = new window.google.payments.api.PaymentsClient({
            environment: 'TEST' // Use 'PRODUCTION' for live environment
          });

          const isReadyToPay = await client.isReadyToPay({
            ...baseRequest,
            allowedPaymentMethods: [baseCardPaymentMethod]
          });

          setIsGooglePayAvailable(isReadyToPay.result);
        } else {
          setIsGooglePayAvailable(false);
        }
      } catch (error) {
        console.error('Error initializing Google Pay:', error);
        setIsGooglePayAvailable(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkGooglePayAvailability();
  }, []);

  const handleGooglePayClick = async () => {
    if (!isGooglePayAvailable || isProcessing) return;

    setIsProcessing(true);

    try {
      const client = new window.google.payments.api.PaymentsClient({
        environment: 'TEST' // Use 'PRODUCTION' for live environment
      });

      const paymentDataRequest = {
        ...googlePayConfiguration,
        callbackIntents: ['PAYMENT_AUTHORIZATION']
      };

      // In a real implementation, this would process the payment with your payment processor
      // For demo purposes, we'll simulate a successful payment after a delay
      setTimeout(() => {
        showSuccessToast('Google Pay payment successful!');
        setIsProcessing(false);
        if (onPaymentComplete) {
          onPaymentComplete({
            paymentMethod: 'google_pay',
            transactionId: `GP-${Date.now()}`,
            amount: amount
          });
        }
      }, 2000);

      // In a real implementation, you would use the following to get payment data
      // const paymentData = await client.loadPaymentData(paymentDataRequest);
      // Process the paymentData with your payment processor
      
    } catch (error) {
      console.error('Error processing Google Pay payment:', error);
      showErrorToast('Google Pay payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="google-pay-button loading">
        <FaSpinner className="spinner" />
        <span>Loading Google Pay...</span>
      </div>
    );
  }

  if (!isGooglePayAvailable) {
    return (
      <div className="google-pay-button unavailable">
        <FaGoogle />
        <span>Google Pay is not available</span>
      </div>
    );
  }

  return (
    <button
      className={`google-pay-button ${isProcessing ? 'processing' : ''}`}
      onClick={handleGooglePayClick}
      disabled={isProcessing}
    >
      <div className="google-pay-button-content">
        <FaGoogle className="google-icon" />
        <span>{isProcessing ? 'Processing...' : 'Pay with Google Pay'}</span>
        {isProcessing && <FaSpinner className="spinner" />}
      </div>
    </button>
  );
};

export default GooglePayButton;
