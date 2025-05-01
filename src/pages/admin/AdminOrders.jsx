import { useState } from 'react';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaArrowLeft } from 'react-icons/fa';

// Mock order data
const initialOrders = [
  {
    id: 'ORD-1234',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, CA 12345'
    },
    date: '2023-06-28',
    items: [
      { id: 1, name: 'Chocolate Croissant', price: 3.99, quantity: 2 },
      { id: 3, name: 'Sourdough Bread', price: 6.99, quantity: 1 }
    ],
    subtotal: 14.97,
    deliveryFee: 2.99,
    tax: 1.20,
    total: 19.16,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    deliveryMethod: 'Standard Delivery'
  },
  {
    id: 'ORD-1235',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Somewhere, NY 67890'
    },
    date: '2023-06-28',
    items: [
      { id: 2, name: 'Strawberry Cheesecake', price: 5.99, quantity: 1 },
      { id: 4, name: 'Blueberry Muffin', price: 2.99, quantity: 4 },
      { id: 5, name: 'Cinnamon Roll', price: 3.49, quantity: 2 }
    ],
    subtotal: 23.93,
    deliveryFee: 5.99,
    tax: 1.91,
    total: 31.83,
    status: 'Processing',
    paymentMethod: 'PayPal',
    deliveryMethod: 'Express Delivery'
  },
  {
    id: 'ORD-1236',
    customer: {
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '(555) 456-7890',
      address: '789 Pine St, Elsewhere, TX 54321'
    },
    date: '2023-06-27',
    items: [
      { id: 3, name: 'Sourdough Bread', price: 6.99, quantity: 2 },
      { id: 5, name: 'Cinnamon Roll', price: 3.49, quantity: 3 }
    ],
    subtotal: 24.45,
    deliveryFee: 0,
    tax: 1.96,
    total: 26.41,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    deliveryMethod: 'Store Pickup'
  },
  {
    id: 'ORD-1237',
    customer: {
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '(555) 789-0123',
      address: '321 Maple Rd, Nowhere, WA 13579'
    },
    date: '2023-06-27',
    items: [
      { id: 2, name: 'Strawberry Cheesecake', price: 5.99, quantity: 2 },
      { id: 7, name: 'Chocolate Cake', price: 6.99, quantity: 1 },
      { id: 9, name: 'Chocolate Chip Cookie', price: 1.99, quantity: 6 }
    ],
    subtotal: 30.91,
    deliveryFee: 2.99,
    tax: 2.47,
    total: 36.37,
    status: 'Shipped',
    paymentMethod: 'Credit Card',
    deliveryMethod: 'Standard Delivery'
  },
  {
    id: 'ORD-1238',
    customer: {
      name: 'Michael Wilson',
      email: 'michael@example.com',
      phone: '(555) 321-6547',
      address: '654 Birch Blvd, Somewhere, FL 97531'
    },
    date: '2023-06-26',
    items: [
      { id: 8, name: 'Apple Pie', price: 5.49, quantity: 1 },
      { id: 4, name: 'Blueberry Muffin', price: 2.99, quantity: 3 }
    ],
    subtotal: 14.46,
    deliveryFee: 2.99,
    tax: 1.16,
    total: 18.61,
    status: 'Delivered',
    paymentMethod: 'PayPal',
    deliveryMethod: 'Standard Delivery'
  }
];

const AdminOrders = () => {
  return (
    <Routes>
      <Route path="/" element={<OrderList />} />
      <Route path="/:id" element={<OrderDetail />} />
    </Routes>
  );
};

// Order List Component
const OrderList = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Get unique statuses
  const statuses = ['all', ...new Set(orders.map(order => order.status))];
  
  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'total') {
      comparison = a.total - b.total;
    } else if (sortBy === 'id') {
      comparison = a.id.localeCompare(b.id);
    } else if (sortBy === 'customer') {
      comparison = a.customer.name.localeCompare(b.customer.name);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };
  
  return (
    <div className="admin-orders">
      <div className="admin-toolbar">
        <h2>Orders</h2>
      </div>
      
      <div className="admin-filters">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="status-filter">
          <label htmlFor="status">Status:</label>
          <select 
            id="status" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status === 'all' ? 'All' : status}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="sortable">
                Order ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('customer')} className="sortable">
                Customer {sortBy === 'customer' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('date')} className="sortable">
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('total')} className="sortable">
                Total {sortBy === 'total' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer.name}</td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`status-select ${order.status.toLowerCase()}`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="actions">
                  <Link to={`/admin/orders/${order.id}`} className="view-btn">
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredOrders.length === 0 && (
        <div className="no-results">
          <p>No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

// Order Detail Component
const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find order by ID
  const order = initialOrders.find(order => order.id === id);
  
  if (!order) {
    return (
      <div className="admin-order-detail">
        <div className="admin-toolbar">
          <button 
            className="back-btn"
            onClick={() => navigate('/admin/orders')}
          >
            <FaArrowLeft /> Back to Orders
          </button>
        </div>
        <div className="not-found">
          <p>Order not found.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="admin-order-detail">
      <div className="admin-toolbar">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/orders')}
        >
          <FaArrowLeft /> Back to Orders
        </button>
        <h2>Order {order.id}</h2>
      </div>
      
      <div className="order-info-grid">
        <div className="order-info-card">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> {order.customer.name}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
        </div>
        
        <div className="order-info-card">
          <h3>Order Details</h3>
          <p><strong>Order Date:</strong> {order.date}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        </div>
        
        <div className="order-info-card">
          <h3>Shipping Information</h3>
          <p><strong>Delivery Method:</strong> {order.deliveryMethod}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
        </div>
        
        <div className="order-info-card">
          <h3>Order Summary</h3>
          <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}</p>
          <p><strong>Delivery Fee:</strong> ${order.deliveryFee.toFixed(2)}</p>
          <p><strong>Tax:</strong> ${order.tax.toFixed(2)}</p>
          <p className="order-total"><strong>Total:</strong> ${order.total.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="order-items-section">
        <h3>Order Items</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="order-actions">
        <button className="print-btn" onClick={() => window.print()}>
          Print Order
        </button>
        <select 
          className={`status-select ${order.status.toLowerCase()}`}
          defaultValue={order.status}
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className="update-btn">
          Update Status
        </button>
      </div>
    </div>
  );
};

export default AdminOrders;
