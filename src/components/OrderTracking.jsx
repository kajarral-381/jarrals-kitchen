import { useState } from 'react';
import { FaSearch, FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './OrderTracking.css';

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Mock order data
  const mockOrders = [
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      status: 'delivered',
      items: [
        { name: 'Chocolate Cake', quantity: 1, price: 1200 },
        { name: 'Cinnamon Rolls', quantity: 2, price: 400 }
      ],
      total: 2000,
      customer: {
        name: 'Ahmed Khan',
        address: '123 Main Street, Islamabad, Pakistan'
      },
      tracking: {
        steps: [
          { 
            status: 'Order Placed', 
            date: '2023-05-15 10:30 AM', 
            completed: true 
          },
          { 
            status: 'Order Confirmed', 
            date: '2023-05-15 11:15 AM', 
            completed: true 
          },
          { 
            status: 'Preparing Order', 
            date: '2023-05-15 01:45 PM', 
            completed: true 
          },
          { 
            status: 'Out for Delivery', 
            date: '2023-05-15 03:30 PM', 
            completed: true 
          },
          { 
            status: 'Delivered', 
            date: '2023-05-15 05:15 PM', 
            completed: true 
          }
        ]
      }
    },
    {
      id: 'ORD-67890',
      date: '2023-05-20',
      status: 'in-transit',
      items: [
        { name: 'Sourdough Bread', quantity: 1, price: 350 },
        { name: 'Blueberry Muffins', quantity: 4, price: 200 }
      ],
      total: 1150,
      customer: {
        name: 'Fatima Ali',
        address: '456 Park Avenue, Lahore, Pakistan'
      },
      tracking: {
        steps: [
          { 
            status: 'Order Placed', 
            date: '2023-05-20 09:45 AM', 
            completed: true 
          },
          { 
            status: 'Order Confirmed', 
            date: '2023-05-20 10:30 AM', 
            completed: true 
          },
          { 
            status: 'Preparing Order', 
            date: '2023-05-20 01:15 PM', 
            completed: true 
          },
          { 
            status: 'Out for Delivery', 
            date: '2023-05-20 03:00 PM', 
            completed: true 
          },
          { 
            status: 'Delivered', 
            date: 'Estimated: 2023-05-20 05:30 PM', 
            completed: false 
          }
        ]
      }
    },
    {
      id: 'ORD-54321',
      date: '2023-05-18',
      status: 'processing',
      items: [
        { name: 'Birthday Cake', quantity: 1, price: 2500 }
      ],
      total: 2500,
      customer: {
        name: 'Mohammad Raza',
        address: '789 Ocean Boulevard, Karachi, Pakistan'
      },
      tracking: {
        steps: [
          { 
            status: 'Order Placed', 
            date: '2023-05-18 02:15 PM', 
            completed: true 
          },
          { 
            status: 'Order Confirmed', 
            date: '2023-05-18 03:00 PM', 
            completed: true 
          },
          { 
            status: 'Preparing Order', 
            date: 'Estimated: 2023-05-21 10:00 AM', 
            completed: false 
          },
          { 
            status: 'Out for Delivery', 
            date: 'Estimated: 2023-05-21 02:00 PM', 
            completed: false 
          },
          { 
            status: 'Delivered', 
            date: 'Estimated: 2023-05-21 04:30 PM', 
            completed: false 
          }
        ]
      }
    }
  ];
  
  const handleTrackOrder = (e) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const order = mockOrders.find(order => order.id === trackingNumber);
      
      if (order) {
        setOrderDetails(order);
        setError('');
      } else {
        setOrderDetails(null);
        setError('No order found with this tracking number');
      }
      
      setLoading(false);
    }, 1000);
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'in-transit':
        return <FaTruck className="status-icon in-transit" />;
      case 'processing':
        return <FaBox className="status-icon processing" />;
      default:
        return <FaTimesCircle className="status-icon" />;
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in-transit':
        return 'In Transit';
      case 'processing':
        return 'Processing';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <div className="order-tracking">
      <h2>Track Your Order</h2>
      <p className="tracking-info">Enter your order number to track your delivery</p>
      
      <form className="tracking-form" onSubmit={handleTrackOrder}>
        <div className="tracking-input-wrapper">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g., ORD-12345"
            className="tracking-input"
          />
          <button 
            type="submit" 
            className="track-button"
            disabled={loading}
          >
            {loading ? 'Tracking...' : 'Track Order'}
            <FaSearch />
          </button>
        </div>
        
        {error && <div className="tracking-error">{error}</div>}
      </form>
      
      {orderDetails && (
        <div className="order-details">
          <div className="order-header">
            <div className="order-info">
              <h3>Order {orderDetails.id}</h3>
              <p className="order-date">Placed on {new Date(orderDetails.date).toLocaleDateString()}</p>
            </div>
            <div className="order-status">
              {getStatusIcon(orderDetails.status)}
              <span>{getStatusText(orderDetails.status)}</span>
            </div>
          </div>
          
          <div className="tracking-timeline">
            {orderDetails.tracking.steps.map((step, index) => (
              <div 
                key={index} 
                className={`timeline-step ${step.completed ? 'completed' : ''}`}
              >
                <div className="timeline-indicator">
                  <div className="timeline-dot"></div>
                  {index < orderDetails.tracking.steps.length - 1 && (
                    <div className="timeline-line"></div>
                  )}
                </div>
                <div className="timeline-content">
                  <h4>{step.status}</h4>
                  <p>{step.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="item-price">₨ {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total</span>
              <span>₨ {orderDetails.total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="delivery-address">
            <h3>Delivery Address</h3>
            <p>{orderDetails.customer.name}</p>
            <p>{orderDetails.customer.address}</p>
          </div>
        </div>
      )}
      
      <div className="tracking-examples">
        <p>Try these example tracking numbers:</p>
        <ul>
          <li>ORD-12345 (Delivered)</li>
          <li>ORD-67890 (In Transit)</li>
          <li>ORD-54321 (Processing)</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderTracking;
