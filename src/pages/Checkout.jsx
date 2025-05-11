import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../components/Toast';
import { FaShoppingCart, FaLock, FaMapMarkerAlt, FaCheck, FaArrowLeft } from 'react-icons/fa';
import AddressAutocomplete from '../components/AddressAutocomplete';
import SelectPaymentMethod from '../components/SelectPaymentMethod';
import OrderTracking from '../components/OrderTracking';
import { sendOrderNotifications } from '../services/NotificationService';
import { chocolateCroissant, strawberryCheesecake, sourdoughBread, blueberryMuffin,
         cinnamonRoll, baguette, chocolateCake, applePie, chocolateChipCookie } from '../assets';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { convertPrice, formatPrice } = useCurrency();
  const { showSuccessToast, showErrorToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
    deliveryOption: 'standard',
    paymentMethod: 'nayaPay',
    orderNotes: ''
  });
  const [errors, setErrors] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  // If cart is empty, redirect to menu
  if (cart.items.length === 0 && !orderComplete) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to your cart before checking out.</p>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate('/menu')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';

      // Log validation results for debugging
      console.log('Step 1 validation errors:', newErrors);
      console.log('Form data:', formData);
    }

    // Payment validation is now handled by the PaymentMethods component
    // We just need to make sure a payment method is selected
    if (stepNumber === 2) {
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = 'Please select a payment method';
      }

      // Log validation results for debugging
      console.log('Step 2 validation errors:', newErrors);
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('Validation result:', isValid);
    return isValid;
  };

  const handleAddressSelect = (addressData) => {
    setFormData(prevData => ({
      ...prevData,
      address: addressData.street,
      city: addressData.city,
      state: addressData.state,
      zipCode: addressData.postalCode,
      country: addressData.country
    }));

    // Clear address-related errors
    setErrors(prevErrors => ({
      ...prevErrors,
      address: '',
      city: '',
      state: '',
      zipCode: ''
    }));
  };

  const handlePaymentMethodSelect = (method, paymentData = null) => {
    setFormData(prevData => ({
      ...prevData,
      paymentMethod: method,
      paymentData: paymentData
    }));
  };

  const nextStep = () => {
    console.log('nextStep called, current step:', step);
    const isValid = validateStep(step);
    console.log('Validation result in nextStep:', isValid);

    if (isValid) {
      console.log('Moving to next step');
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      console.log('Validation failed, staying on current step');
      // Show a toast message to help the user understand what's happening
      showErrorToast('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateStep(step)) {
      // In a real app, this would send the order to a backend
      // For demo purposes, we'll just simulate a successful order
      setIsProcessing(true);

      // Generate a random order ID
      const randomOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

      // Prepare order data for notifications
      const orderData = {
        orderId: randomOrderId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        items: cart.items,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        tax: tax,
        total: total,
        paymentMethod: 'NayaPay', // Only NayaPay is supported
        transactionId: formData.paymentData?.transactionId || null,
        deliveryMethod: formData.deliveryOption === 'standard' ? 'Standard Delivery' :
                        formData.deliveryOption === 'express' ? 'Express Delivery' : 'Store Pickup',
        notes: formData.orderNotes || ''
      };

      // Simulate API call delay
      setTimeout(async () => {
        setOrderId(randomOrderId);

        // Send notifications
        try {
          const notificationResult = await sendOrderNotifications(orderData);
          console.log('Notification results:', notificationResult);

          if (notificationResult.success) {
            console.log('All notifications sent successfully');
          } else {
            console.warn('Some notifications failed to send:', notificationResult);
          }
        } catch (error) {
          console.error('Error sending notifications:', error);
        }

        // Clear the cart
        clearCart();

        // Show success toast
        showSuccessToast('Your order has been placed successfully!');

        // Show order confirmation
        setOrderComplete(true);
        setIsProcessing(false);

        // Scroll to top
        window.scrollTo(0, 0);
      }, 2000);
    }
  };

  const toggleOrderTracking = () => {
    setShowTracking(!showTracking);
  };

  // Calculate subtotal
  const subtotal = cart.totalPrice;

  // Calculate delivery fee
  const deliveryFee = formData.deliveryOption === 'express' ? 5.99 : 2.99;

  // Calculate tax (assuming 8%)
  const tax = subtotal * 0.08;

  // Calculate total
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="checkout-page">
      <div className="container">
        {orderComplete ? (
          <div className="order-confirmation">
            <div className="confirmation-icon">
              <FaCheck />
            </div>
            <h2>Thank You for Your Order!</h2>
            <p className="order-id">Order #{orderId}</p>
            <p>Your order has been placed successfully. We've sent a confirmation email to {formData.email}.</p>
            <p className="notification-info">Our team has been notified about your order via WhatsApp and email.</p>

            <div className="order-details">
              <h3>Order Details</h3>
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(convertPrice(subtotal))}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery:</span>
                  <span>{formatPrice(convertPrice(deliveryFee))}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>{formatPrice(convertPrice(tax))}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatPrice(convertPrice(total))}</span>
                </div>
              </div>

              <div className="payment-method-info">
                <h4>Payment Method</h4>
                <p>NayaPay</p>

                {formData.paymentData?.transactionId && (
                  <p className="transaction-id">
                    <strong>Transaction ID:</strong> {formData.paymentData.transactionId}
                  </p>
                )}


              </div>
            </div>

            <div className="delivery-info">
              <div className="delivery-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="delivery-details">
                <h3>Delivery Information</h3>
                <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                <p><strong>Method:</strong> {formData.deliveryOption === 'pickup' ? 'Store Pickup' : formData.deliveryOption === 'express' ? 'Express Delivery' : 'Standard Delivery'}</p>
                <p><strong>Estimated Time:</strong> {formData.deliveryOption === 'pickup' ? '20 minutes' : formData.deliveryOption === 'express' ? '30 minutes' : '60 minutes'}</p>
              </div>
            </div>

            <div className="order-actions">
              <button
                className="track-order-btn"
                onClick={toggleOrderTracking}
              >
                {showTracking ? 'Hide Tracking' : 'Track Your Order'}
              </button>

              <Link to="/" className="continue-shopping-btn">
                Return to Home
              </Link>
            </div>

            {showTracking && (
              <div className="order-tracking-section">
                <OrderTracking />
              </div>
            )}
          </div>
        ) : (
          <>
            <h1>Checkout</h1>

            <div className="checkout-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-text">Shipping</div>
              </div>
              <div className="step-connector"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-text">Payment</div>
              </div>
              <div className="step-connector"></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-text">Review</div>
              </div>
            </div>

            <div className="checkout-content">
              <div className="checkout-form-container">
                <form className="checkout-form" onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="checkout-step">
                      <h2>Shipping Information</h2>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                          {errors.firstName && <div className="error">{errors.firstName}</div>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="lastName">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                          {errors.lastName && <div className="error">{errors.lastName}</div>}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && <div className="error">{errors.email}</div>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="phone">Phone</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && <div className="error">{errors.phone}</div>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Address</label>
                        <AddressAutocomplete onAddressSelect={handleAddressSelect} />
                        {errors.address && <div className="error">{errors.address}</div>}
                      </div>

                      <div className="address-preview">
                        {formData.address && (
                          <div className="address-details">
                            <h4>Selected Address</h4>
                            <p>{formData.address}</p>
                            <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                            <p>{formData.country}</p>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label>Or enter address manually:</label>
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Street Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Street address, apartment, suite, etc."
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                          />
                          {errors.city && <div className="error">{errors.city}</div>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="state">State/Province</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                          />
                          {errors.state && <div className="error">{errors.state}</div>}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="zipCode">Postal Code</label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                          />
                          {errors.zipCode && <div className="error">{errors.zipCode}</div>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="country">Country</label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Delivery Options</label>
                        <div className="delivery-options">
                          <div className="delivery-option">
                            <input
                              type="radio"
                              id="standard"
                              name="deliveryOption"
                              value="standard"
                              checked={formData.deliveryOption === 'standard'}
                              onChange={handleChange}
                            />
                            <label htmlFor="standard">
                              <div className="option-title">Standard Delivery</div>
                              <div className="option-description">Delivery within 60 minutes</div>
                              <div className="option-price">{formatPrice(convertPrice(2.99))}</div>
                            </label>
                          </div>

                          <div className="delivery-option">
                            <input
                              type="radio"
                              id="express"
                              name="deliveryOption"
                              value="express"
                              checked={formData.deliveryOption === 'express'}
                              onChange={handleChange}
                            />
                            <label htmlFor="express">
                              <div className="option-title">Express Delivery</div>
                              <div className="option-description">Delivery within 30 minutes</div>
                              <div className="option-price">{formatPrice(convertPrice(5.99))}</div>
                            </label>
                          </div>

                          <div className="delivery-option">
                            <input
                              type="radio"
                              id="pickup"
                              name="deliveryOption"
                              value="pickup"
                              checked={formData.deliveryOption === 'pickup'}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickup">
                              <div className="option-title">Store Pickup</div>
                              <div className="option-description">Ready in 20 minutes</div>
                              <div className="option-price">Free</div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-actions">
                        <button
                          type="button"
                          className="next-btn"
                          onClick={nextStep}
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="checkout-step">
                      <h2>Payment Information</h2>

                      <SelectPaymentMethod
                        onPaymentMethodSelect={handlePaymentMethodSelect}
                        totalAmount={total}
                      />

                      {errors.paymentMethod && <div className="error payment-error">{errors.paymentMethod}</div>}

                      <div className="form-group">
                        <label htmlFor="orderNotes">Order Notes (Optional)</label>
                        <textarea
                          id="orderNotes"
                          name="orderNotes"
                          value={formData.orderNotes}
                          onChange={handleChange}
                          rows="3"
                          placeholder="Special instructions for your order"
                        ></textarea>
                      </div>

                      <div className="form-actions">
                        <button
                          type="button"
                          className="back-btn"
                          onClick={prevStep}
                        >
                          <FaArrowLeft /> Back to Shipping
                        </button>
                        <button
                          type="button"
                          className="next-btn"
                          onClick={nextStep}
                        >
                          Review Order
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="checkout-step">
                      <h2>Review Your Order</h2>

                      <div className="review-section">
                        <h3>Shipping Information</h3>
                        <div className="review-info">
                          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                          <p><strong>Email:</strong> {formData.email}</p>
                          <p><strong>Phone:</strong> {formData.phone}</p>
                          <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                          <p><strong>Delivery Method:</strong> {
                            formData.deliveryOption === 'standard' ? 'Standard Delivery' :
                            formData.deliveryOption === 'express' ? 'Express Delivery' : 'Store Pickup'
                          }</p>
                        </div>
                      </div>

                      <div className="review-section">
                        <h3>Payment Information</h3>
                        <div className="review-info">
                          <p><strong>Payment Method:</strong> NayaPay</p>
                          {formData.paymentData?.transactionId && (
                            <p><strong>Transaction ID:</strong> {formData.paymentData.transactionId}</p>
                          )}
                          <p><strong>Status:</strong> <span className="payment-status success">Payment Verified</span></p>
                        </div>
                      </div>

                      {formData.orderNotes && (
                        <div className="review-section">
                          <h3>Order Notes</h3>
                          <div className="review-info">
                            <p>{formData.orderNotes}</p>
                          </div>
                        </div>
                      )}

                      <div className="form-actions">
                        <button
                          type="button"
                          className="back-btn"
                          onClick={prevStep}
                          disabled={isProcessing}
                        >
                          <FaArrowLeft /> Back to Payment
                        </button>
                        <button
                          type="submit"
                          className="place-order-btn"
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Place Order'}
                          {isProcessing && <span className="spinner"></span>}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              <div className="order-summary-container">
                <div className="order-summary">
                  <h2>Order Summary</h2>

                  <div className="cart-items">
                    {cart.items.map(item => {
                      // Get the correct image based on product name
                      let productImage = item.image;
                      if (!productImage || productImage.includes('/src/assets/')) {
                        // Fallback to imported images if the path is incorrect
                        switch(item.name) {
                          case 'Chocolate Croissant':
                            productImage = chocolateCroissant;
                            break;
                          case 'Strawberry Cheesecake':
                            productImage = strawberryCheesecake;
                            break;
                          case 'Sourdough Bread':
                            productImage = sourdoughBread;
                            break;
                          case 'Blueberry Muffin':
                            productImage = blueberryMuffin;
                            break;
                          case 'Cinnamon Roll':
                            productImage = cinnamonRoll;
                            break;
                          case 'Baguette':
                            productImage = baguette;
                            break;
                          case 'Chocolate Cake':
                            productImage = chocolateCake;
                            break;
                          case 'Apple Pie':
                            productImage = applePie;
                            break;
                          case 'Chocolate Chip Cookie':
                            productImage = chocolateChipCookie;
                            break;
                          default:
                            // Default fallback image
                            productImage = chocolateCroissant;
                        }
                      }

                      return (
                        <div key={item.id} className="cart-item">
                          <div className="item-image">
                            <img src={productImage} alt={item.name} />
                          </div>
                          <div className="item-details">
                            <h3>{item.name}</h3>
                            <div className="item-price-qty">
                              <span>{formatPrice(convertPrice(item.price))}</span>
                              <span>×</span>
                              <span>{item.quantity}</span>
                            </div>
                          </div>
                          <div className="item-total">
                            {formatPrice(convertPrice(item.price * item.quantity))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="summary-totals">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>{formatPrice(convertPrice(subtotal))}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery</span>
                      <span>{formatPrice(convertPrice(deliveryFee))}</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax</span>
                      <span>{formatPrice(convertPrice(tax))}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>{formatPrice(convertPrice(total))}</span>
                    </div>
                  </div>

                  <div className="secure-checkout">
                    <FaLock /> Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
