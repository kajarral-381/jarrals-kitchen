import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTachometerAlt, FaBox, FaShoppingBag, FaUsers, FaNewspaper, FaSignOutAlt } from 'react-icons/fa';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';
import AdminBlog from './AdminBlog';
import './Admin.css';

const AdminDashboard = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Redirect if not admin
  if (!isAdmin()) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`admin-dashboard ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button className="toggle-sidebar" onClick={toggleSidebar}>
            ☰
          </button>
        </div>

        <div className="admin-user">
          <div className="admin-avatar">
            {currentUser.name.charAt(0)}
          </div>
          <div className="admin-user-info">
            <h3>{currentUser.name}</h3>
            <p>{currentUser.email}</p>
          </div>
        </div>

        <nav className="admin-nav">
          <ul>
            <li>
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                <FaTachometerAlt /> <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className={location.pathname.includes('/admin/products') ? 'active' : ''}>
                <FaBox /> <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className={location.pathname.includes('/admin/orders') ? 'active' : ''}>
                <FaShoppingBag /> <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className={location.pathname.includes('/admin/users') ? 'active' : ''}>
                <FaUsers /> <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/blog" className={location.pathname.includes('/admin/blog') ? 'active' : ''}>
                <FaNewspaper /> <span>Blog</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <button className="mobile-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <h1>Admin Dashboard</h1>
        </div>

        <div className="admin-main">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/products/*" element={<AdminProducts />} />
            <Route path="/orders/*" element={<AdminOrders />} />
            <Route path="/users/*" element={<AdminUsers />} />
            <Route path="/blog/*" element={<AdminBlog />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Admin Overview Component
const AdminOverview = () => {
  // Mock data for dashboard
  const stats = [
    { title: 'Total Products', value: 48, icon: <FaBox />, color: '#4e73df' },
    { title: 'Total Orders', value: 124, icon: <FaShoppingBag />, color: '#1cc88a' },
    { title: 'Total Users', value: 256, icon: <FaUsers />, color: '#36b9cc' },
    { title: 'Blog Posts', value: 12, icon: <FaNewspaper />, color: '#f6c23e' }
  ];

  // Revenue statistics
  const revenueStats = {
    daily: 2450,
    weekly: 14280,
    monthly: 58900,
    yearly: 685000
  };

  // Mock recent orders
  const recentOrders = [
    { id: 'ORD-1234', customer: 'John Doe', date: '2023-06-28', total: 42.99, status: 'Delivered' },
    { id: 'ORD-1235', customer: 'Jane Smith', date: '2023-06-28', total: 36.50, status: 'Processing' },
    { id: 'ORD-1236', customer: 'Robert Johnson', date: '2023-06-27', total: 27.80, status: 'Delivered' },
    { id: 'ORD-1237', customer: 'Emily Davis', date: '2023-06-27', total: 52.25, status: 'Shipped' },
    { id: 'ORD-1238', customer: 'Michael Wilson', date: '2023-06-26', total: 18.99, status: 'Delivered' }
  ];

  return (
    <div className="admin-overview">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-sections">
        <div className="admin-section">
          <h2>Revenue Summary</h2>
          <div className="revenue-summary">
            <div className="revenue-card">
              <h3>Today</h3>
              <p className="revenue-value">₨ {revenueStats.daily.toLocaleString()}</p>
            </div>
            <div className="revenue-card">
              <h3>This Week</h3>
              <p className="revenue-value">₨ {revenueStats.weekly.toLocaleString()}</p>
            </div>
            <div className="revenue-card">
              <h3>This Month</h3>
              <p className="revenue-value">₨ {revenueStats.monthly.toLocaleString()}</p>
            </div>
            <div className="revenue-card">
              <h3>This Year</h3>
              <p className="revenue-value">₨ {revenueStats.yearly.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h2>Recent Orders</h2>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>₨ {order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="actions">
                      <Link to={`/admin/orders/${order.id}`} className="view-btn">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="section-footer">
            <Link to="/admin/orders" className="view-all-btn">
              View All Orders
            </Link>
          </div>
        </div>

        <div className="admin-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/admin/products/add" className="quick-action-btn">
              Add New Product
            </Link>
            <Link to="/admin/blog/add" className="quick-action-btn">
              Create Blog Post
            </Link>
            <Link to="/admin/orders" className="quick-action-btn">
              Manage Orders
            </Link>
            <Link to="/admin/users" className="quick-action-btn">
              Manage Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
