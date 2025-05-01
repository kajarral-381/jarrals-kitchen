import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaShoppingBag, FaSignOutAlt, FaLock, FaCog } from 'react-icons/fa';
import './Account.css';

const Account = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock order history data
  const orderHistory = [
    {
      id: 'ORD-1234',
      date: '2023-05-15',
      total: 24.99,
      status: 'Delivered',
      items: [
        { name: 'Chocolate Croissant', quantity: 2, price: 3.99 },
        { name: 'Sourdough Bread', quantity: 1, price: 6.99 },
        { name: 'Strawberry Cheesecake', quantity: 1, price: 5.99 }
      ]
    },
    {
      id: 'ORD-5678',
      date: '2023-04-28',
      total: 18.47,
      status: 'Delivered',
      items: [
        { name: 'Blueberry Muffin', quantity: 3, price: 2.99 },
        { name: 'Cinnamon Roll', quantity: 2, price: 3.49 }
      ]
    }
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // If not logged in, redirect to login
  if (!currentUser) {
    return (
      <div className="account-page">
        <div className="container">
          <div className="not-logged-in">
            <h2>Please log in to view your account</h2>
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="account-page">
      <div className="container">
        <h1>My Account</h1>
        
        <div className="account-content">
          <div className="account-sidebar">
            <div className="user-info">
              <div className="user-avatar">
                <FaUser />
              </div>
              <div className="user-details">
                <h3>{currentUser.name}</h3>
                <p>{currentUser.email}</p>
              </div>
            </div>
            
            <ul className="account-nav">
              <li 
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser /> Profile
              </li>
              <li 
                className={activeTab === 'orders' ? 'active' : ''}
                onClick={() => setActiveTab('orders')}
              >
                <FaShoppingBag /> Order History
              </li>
              <li 
                className={activeTab === 'password' ? 'active' : ''}
                onClick={() => setActiveTab('password')}
              >
                <FaLock /> Change Password
              </li>
              {isAdmin() && (
                <li 
                  className={activeTab === 'admin' ? 'active' : ''}
                  onClick={() => setActiveTab('admin')}
                >
                  <FaCog /> Admin Dashboard
                </li>
              )}
              <li onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </li>
            </ul>
          </div>
          
          <div className="account-main">
            {activeTab === 'profile' && (
              <div className="profile-tab">
                <h2>Profile Information</h2>
                <form className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      defaultValue={currentUser.name} 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      defaultValue={currentUser.email} 
                      disabled 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address">Address (optional)</label>
                    <textarea 
                      id="address" 
                      name="address" 
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="update-btn">Update Profile</button>
                </form>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="orders-tab">
                <h2>Order History</h2>
                
                {orderHistory.length === 0 ? (
                  <p className="no-orders">You haven't placed any orders yet.</p>
                ) : (
                  <div className="order-list">
                    {orderHistory.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div>
                            <h3>Order #{order.id}</h3>
                            <p className="order-date">Placed on {order.date}</p>
                          </div>
                          <div className="order-status">{order.status}</div>
                        </div>
                        
                        <div className="order-items">
                          {order.items.map((item, index) => (
                            <div key={index} className="order-item">
                              <div className="item-name">
                                {item.quantity} x {item.name}
                              </div>
                              <div className="item-price">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="order-footer">
                          <div className="order-total">
                            <span>Total:</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                          <button className="reorder-btn">Reorder</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'password' && (
              <div className="password-tab">
                <h2>Change Password</h2>
                <form className="password-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input 
                      type="password" 
                      id="currentPassword" 
                      name="currentPassword" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                      type="password" 
                      id="newPassword" 
                      name="newPassword" 
                      required 
                      minLength="6" 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      required 
                    />
                  </div>
                  
                  <button type="submit" className="update-btn">Update Password</button>
                </form>
              </div>
            )}
            
            {activeTab === 'admin' && isAdmin() && (
              <div className="admin-tab">
                <h2>Admin Dashboard</h2>
                <div className="admin-links">
                  <Link to="/admin/products" className="admin-link">
                    Manage Products
                  </Link>
                  <Link to="/admin/orders" className="admin-link">
                    Manage Orders
                  </Link>
                  <Link to="/admin/users" className="admin-link">
                    Manage Users
                  </Link>
                  <Link to="/admin/blog" className="admin-link">
                    Manage Blog
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
