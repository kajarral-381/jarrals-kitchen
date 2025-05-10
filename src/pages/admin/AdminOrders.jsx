import { useState, useEffect, useMemo } from 'react';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaArrowLeft, FaFileExport, FaSearch, FaFilter, FaCalendarAlt, FaPrint, FaEnvelope } from 'react-icons/fa';
import { useToast } from '../../components/Toast';
import Pagination from '../../components/Pagination';

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
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  // Get unique statuses
  const statuses = ['all', ...new Set(orders.map(order => order.status))];

  // Filter orders based on search, status, and date range
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

    // Date range filtering
    let matchesDateRange = true;
    if (filterDateRange.start && filterDateRange.end) {
      const orderDate = new Date(order.date);
      const startDate = new Date(filterDateRange.start);
      const endDate = new Date(filterDateRange.end);
      endDate.setHours(23, 59, 59); // Include the entire end day

      matchesDateRange = orderDate >= startDate && orderDate <= endDate;
    }

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Sort orders
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
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
  }, [filteredOrders, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  // Get current page items
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedOrders, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterDateRange]);

  // Handle select all orders
  useEffect(() => {
    if (isAllSelected) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else if (selectedOrders.length === filteredOrders.length) {
      // If all were selected and one was deselected, update isAllSelected
      setIsAllSelected(false);
    }
  }, [isAllSelected, filteredOrders]);

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
    showSuccessToast(`Order ${id} status updated to ${newStatus}`);
  };

  const handleBulkStatusUpdate = (newStatus) => {
    if (selectedOrders.length === 0) {
      showErrorToast('No orders selected');
      return;
    }

    setOrders(orders.map(order =>
      selectedOrders.includes(order.id) ? { ...order, status: newStatus } : order
    ));

    showSuccessToast(`${selectedOrders.length} orders updated to ${newStatus}`);
    setSelectedOrders([]);
    setIsAllSelected(false);
  };

  const handleSelectOrder = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const handleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    if (!isAllSelected) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const exportOrders = (format) => {
    const ordersToExport = selectedOrders.length > 0
      ? orders.filter(order => selectedOrders.includes(order.id))
      : filteredOrders;

    if (ordersToExport.length === 0) {
      showErrorToast('No orders to export');
      return;
    }

    // In a real app, this would trigger a download
    showSuccessToast(`${ordersToExport.length} orders exported as ${format}`);
  };

  const sendOrderNotifications = () => {
    if (selectedOrders.length === 0) {
      showErrorToast('No orders selected');
      return;
    }

    // In a real app, this would send emails to customers
    showSuccessToast(`Notifications sent to ${selectedOrders.length} customers`);
  };

  return (
    <div className="admin-orders">
      <div className="admin-toolbar">
        <h2>Orders</h2>
        <div className="toolbar-actions">
          <div className="dropdown">
            <button className="action-btn">Export <FaFileExport /></button>
            <div className="dropdown-content">
              <button onClick={() => exportOrders('CSV')}>Export as CSV</button>
              <button onClick={() => exportOrders('PDF')}>Export as PDF</button>
              <button onClick={() => exportOrders('Excel')}>Export as Excel</button>
            </div>
          </div>

          <div className="dropdown">
            <button className="action-btn">Bulk Actions</button>
            <div className="dropdown-content">
              <button onClick={() => handleBulkStatusUpdate('Processing')}>Mark as Processing</button>
              <button onClick={() => handleBulkStatusUpdate('Shipped')}>Mark as Shipped</button>
              <button onClick={() => handleBulkStatusUpdate('Delivered')}>Mark as Delivered</button>
              <button onClick={() => handleBulkStatusUpdate('Cancelled')}>Mark as Cancelled</button>
              <button onClick={sendOrderNotifications}>Send Notifications <FaEnvelope /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-filters">
        <div className="search-box">
          <div className="input-with-icon">
            <FaSearch className="input-icon" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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

        <button
          className="filter-toggle-btn"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <FaFilter /> {showAdvancedFilters ? 'Hide Filters' : 'Advanced Filters'}
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="advanced-filters">
          <div className="date-range-filter">
            <div className="date-input">
              <label htmlFor="start-date">From:</label>
              <div className="input-with-icon">
                <FaCalendarAlt className="input-icon" />
                <input
                  type="date"
                  id="start-date"
                  value={filterDateRange.start}
                  onChange={(e) => setFilterDateRange({...filterDateRange, start: e.target.value})}
                />
              </div>
            </div>

            <div className="date-input">
              <label htmlFor="end-date">To:</label>
              <div className="input-with-icon">
                <FaCalendarAlt className="input-icon" />
                <input
                  type="date"
                  id="end-date"
                  value={filterDateRange.end}
                  onChange={(e) => setFilterDateRange({...filterDateRange, end: e.target.value})}
                />
              </div>
            </div>

            <button
              className="clear-filter-btn"
              onClick={() => setFilterDateRange({ start: '', end: '' })}
            >
              Clear Dates
            </button>
          </div>
        </div>
      )}

      <div className="order-summary">
        <p>Showing {sortedOrders.length} of {orders.length} orders</p>
        {selectedOrders.length > 0 && (
          <p>{selectedOrders.length} orders selected</p>
        )}
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
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
                {currentItems.map(order => (
                  <tr key={order.id} className={selectedOrders.includes(order.id) ? 'selected-row' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td>{order.id}</td>
                    <td>
                      <div className="customer-info">
                        <span className="customer-name">{order.customer.name}</span>
                        <span className="customer-email">{order.customer.email}</span>
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>₨ {order.total.toFixed(2)}</td>
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
                      <Link to={`/admin/orders/${order.id}`} className="view-btn" title="View Order Details">
                        <FaEye />
                      </Link>
                      <button className="print-btn" title="Print Order" onClick={() => showSuccessToast(`Printing order ${order.id}`)}>
                        <FaPrint />
                      </button>
                      <button className="email-btn" title="Email Customer" onClick={() => showSuccessToast(`Email sent to ${order.customer.name}`)}>
                        <FaEnvelope />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedOrders.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={sortedOrders.length}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          ) : (
            <div className="no-results">
              <p>No orders found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Order Detail Component
const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showStatusHistory, setShowStatusHistory] = useState(false);

  // Mock status history
  const statusHistory = [
    { status: 'Processing', date: '2023-06-28 09:15 AM', user: 'Admin User' },
    { status: 'Shipped', date: '2023-06-29 02:30 PM', user: 'Admin User' },
    { status: 'Delivered', date: '2023-06-30 11:45 AM', user: 'System' }
  ];

  // Fetch order by ID
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundOrder = initialOrders.find(order => order.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
        setSelectedStatus(foundOrder.status);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleStatusUpdate = () => {
    if (selectedStatus === order.status) {
      showErrorToast('Status is already set to ' + selectedStatus);
      return;
    }

    // Update order status
    setOrder({
      ...order,
      status: selectedStatus
    });

    showSuccessToast(`Order status updated to ${selectedStatus}`);
  };

  const handleSendNotification = () => {
    showSuccessToast(`Notification sent to ${order.customer.name}`);
  };

  if (loading) {
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
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

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
        <div className="toolbar-actions">
          <button className="print-btn" onClick={() => window.print()}>
            <FaPrint /> Print Order
          </button>
          <button className="email-btn" onClick={handleSendNotification}>
            <FaEnvelope /> Email Customer
          </button>
        </div>
      </div>

      <div className="order-status-banner" className={`order-status-banner ${order.status.toLowerCase()}`}>
        <h3>Status: {order.status}</h3>
        <button
          className="history-toggle"
          onClick={() => setShowStatusHistory(!showStatusHistory)}
        >
          {showStatusHistory ? 'Hide History' : 'View Status History'}
        </button>

        {showStatusHistory && (
          <div className="status-history">
            <h4>Status History</h4>
            <ul>
              {statusHistory.map((entry, index) => (
                <li key={index}>
                  <span className="status-badge">{entry.status}</span>
                  <span className="status-date">{entry.date}</span>
                  <span className="status-user">by {entry.user}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
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
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        </div>

        <div className="order-info-card">
          <h3>Shipping Information</h3>
          <p><strong>Delivery Method:</strong> {order.deliveryMethod}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
        </div>

        <div className="order-info-card">
          <h3>Order Summary</h3>
          <p><strong>Subtotal:</strong> ₨ {order.subtotal.toFixed(2)}</p>
          <p><strong>Delivery Fee:</strong> ₨ {order.deliveryFee.toFixed(2)}</p>
          <p><strong>Tax:</strong> ₨ {order.tax.toFixed(2)}</p>
          <p className="order-total"><strong>Total:</strong> ₨ {order.total.toFixed(2)}</p>
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
                  <td>₨ {item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>₨ {(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right"><strong>Subtotal</strong></td>
                <td>₨ {order.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-right"><strong>Delivery Fee</strong></td>
                <td>₨ {order.deliveryFee.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-right"><strong>Tax</strong></td>
                <td>₨ {order.tax.toFixed(2)}</td>
              </tr>
              <tr className="total-row">
                <td colSpan="3" className="text-right"><strong>Total</strong></td>
                <td>₨ {order.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="order-notes-section">
        <h3>Order Notes</h3>
        <textarea
          className="order-notes"
          placeholder="Add notes about this order..."
          rows="4"
        ></textarea>
        <button className="save-notes-btn">Save Notes</button>
      </div>

      <div className="order-actions">
        <div className="status-update">
          <select
            className={`status-select ${selectedStatus.toLowerCase()}`}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button className="update-btn" onClick={handleStatusUpdate}>
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
