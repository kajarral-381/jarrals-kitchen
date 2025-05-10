import { useState, useEffect, useMemo } from 'react';
import { FaEdit, FaTrash, FaUserPlus, FaSearch, FaFilter, FaUserShield, FaUserCog, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useToast } from '../../components/Toast';
import Pagination from '../../components/Pagination';

// Mock user data
const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    registeredDate: '2023-05-15',
    lastLogin: '2023-06-28',
    orders: 5
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    registeredDate: '2023-01-10',
    lastLogin: '2023-06-28',
    orders: 0
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    registeredDate: '2023-04-22',
    lastLogin: '2023-06-27',
    orders: 3
  },
  {
    id: 4,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'user',
    registeredDate: '2023-03-18',
    lastLogin: '2023-06-25',
    orders: 2
  },
  {
    id: 5,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'user',
    registeredDate: '2023-06-05',
    lastLogin: '2023-06-26',
    orders: 1
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterActivity, setFilterActivity] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showUserDetailModal, setShowUserDetailModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { showSuccessToast, showErrorToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get unique roles
  const roles = ['all', ...new Set(users.map(user => user.role))];

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
  }, [searchTerm, filterRole, filterActivity]);

  // Handle select all users
  useEffect(() => {
    if (isAllSelected) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else if (selectedUsers.length === filteredUsers.length) {
      // If all were selected and one was deselected, update isAllSelected
      setIsAllSelected(false);
    }
  }, [isAllSelected, filteredUsers]);

  // Filter users based on search, role, and activity
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;

    // Activity filtering
    let matchesActivity = true;
    if (filterActivity === 'active') {
      // Consider users who logged in within the last 30 days as active
      const lastLoginDate = new Date(user.lastLogin);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesActivity = lastLoginDate >= thirtyDaysAgo;
    } else if (filterActivity === 'inactive') {
      // Consider users who haven't logged in within the last 30 days as inactive
      const lastLoginDate = new Date(user.lastLogin);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesActivity = lastLoginDate < thirtyDaysAgo;
    }

    return matchesSearch && matchesRole && matchesActivity;
  });

  // Sort users
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'email') {
        comparison = a.email.localeCompare(b.email);
      } else if (sortBy === 'role') {
        comparison = a.role.localeCompare(b.role);
      } else if (sortBy === 'registeredDate') {
        comparison = new Date(a.registeredDate) - new Date(b.registeredDate);
      } else if (sortBy === 'lastLogin') {
        comparison = new Date(a.lastLogin) - new Date(b.lastLogin);
      } else if (sortBy === 'orders') {
        comparison = a.orders - b.orders;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredUsers, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  // Get current page items
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedUsers, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      showSuccessToast('User deleted successfully');
    }
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) {
      showErrorToast('No users selected');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
      // Filter out admin users from deletion
      const adminUsers = selectedUsers.filter(id =>
        users.find(user => user.id === id && user.role === 'admin')
      );

      if (adminUsers.length > 0) {
        showErrorToast('Cannot delete admin users');
        return;
      }

      setUsers(users.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
      setIsAllSelected(false);
      showSuccessToast(`${selectedUsers.length} users deleted successfully`);
    }
  };

  const handleBulkRoleUpdate = (newRole) => {
    if (selectedUsers.length === 0) {
      showErrorToast('No users selected');
      return;
    }

    setUsers(users.map(user =>
      selectedUsers.includes(user.id) ? { ...user, role: newRole } : user
    ));

    showSuccessToast(`${selectedUsers.length} users updated to ${newRole} role`);
  };

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
  };

  const openAddUserModal = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user',
      password: '',
      phone: '',
      address: ''
    });
    setErrors({});
    setShowAddUserModal(true);
  };

  const openEditUserModal = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
      phone: user.phone || '',
      address: user.address || ''
    });
    setErrors({});
    setShowEditUserModal(true);
  };

  const openUserDetailModal = (user) => {
    setCurrentUser(user);
    setShowUserDetailModal(true);
  };

  const closeModal = () => {
    setShowAddUserModal(false);
    setShowEditUserModal(false);
    setShowUserDetailModal(false);
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Check for duplicate email
    const existingUser = users.find(user =>
      user.email === formData.email &&
      (!currentUser || user.id !== currentUser.id)
    );

    if (existingUser) {
      newErrors.email = 'Email is already in use';
    }

    if (showAddUserModal && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.phone && !/^\+?[\d\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (showAddUserModal) {
        // Add new user
        const newUser = {
          id: users.length + 1,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          phone: formData.phone,
          address: formData.address,
          registeredDate: new Date().toISOString().split('T')[0],
          lastLogin: new Date().toISOString().split('T')[0],
          orders: 0
        };

        setUsers([...users, newUser]);
        showSuccessToast('User added successfully');
      } else if (showEditUserModal && currentUser) {
        // Update existing user
        setUsers(users.map(user =>
          user.id === currentUser.id ? {
            ...user,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            phone: formData.phone,
            address: formData.address
          } : user
        ));
        showSuccessToast('User updated successfully');
      }

      closeModal();
    }
  };

  return (
    <div className="admin-users">
      <div className="admin-toolbar">
        <h2>Users</h2>
        <div className="toolbar-actions">
          <button className="add-btn" onClick={openAddUserModal}>
            <FaUserPlus /> Add User
          </button>

          <div className="dropdown">
            <button className="action-btn">Bulk Actions</button>
            <div className="dropdown-content">
              <button onClick={() => handleBulkRoleUpdate('user')}>
                <FaUserCog /> Set as User
              </button>
              <button onClick={() => handleBulkRoleUpdate('admin')}>
                <FaUserShield /> Set as Admin
              </button>
              <button onClick={handleBulkDelete} className="danger">
                <FaTrash /> Delete Selected
              </button>
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
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="role-filter">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="activity-filter">
          <label htmlFor="activity">Activity:</label>
          <select
            id="activity"
            value={filterActivity}
            onChange={(e) => setFilterActivity(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
        </div>
      </div>

      <div className="user-summary">
        <p>Showing {sortedUsers.length} of {users.length} users</p>
        {selectedUsers.length > 0 && (
          <p>{selectedUsers.length} users selected</p>
        )}
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
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
                  <th onClick={() => handleSort('name')} className="sortable">
                    Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('email')} className="sortable">
                    Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('role')} className="sortable">
                    Role {sortBy === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('registeredDate')} className="sortable">
                    Registered {sortBy === 'registeredDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('lastLogin')} className="sortable">
                    Last Login {sortBy === 'lastLogin' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('orders')} className="sortable">
                    Orders {sortBy === 'orders' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(user => (
                  <tr key={user.id} className={selectedUsers.includes(user.id) ? 'selected-row' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        disabled={user.role === 'admin'} // Prevent selecting admin users for bulk actions
                      />
                    </td>
                    <td>
                      <div className="user-name" onClick={() => openUserDetailModal(user)}>
                        {user.name}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>{user.registeredDate}</td>
                    <td>{user.lastLogin}</td>
                    <td>{user.orders}</td>
                    <td className="actions">
                      <button
                        className="view-btn"
                        onClick={() => openUserDetailModal(user)}
                        title="View User Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => openEditUserModal(user)}
                        title="Edit User"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user.id)}
                        disabled={user.role === 'admin'} // Prevent deleting admin users
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedUsers.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={sortedUsers.length}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          ) : (
            <div className="no-results">
              <p>No users found matching your criteria.</p>
            </div>
          )}
        </>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="error">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <div className="error">{errors.password}</div>}
                  <div className="field-hint">Password must be at least 8 characters</div>
                </div>

                <div className="form-group">
                  <label htmlFor="role">User Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="field-hint">Admin users have full access to the admin panel</div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number (optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (123) 456-7890"
                  />
                  {errors.phone && <div className="error">{errors.phone}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address (optional)</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, Country"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">Add User</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && currentUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit User</h3>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="error">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password (leave blank to keep current)</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <div className="error">{errors.password}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="role">User Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={currentUser.role === 'admin' && currentUser.email === 'admin@example.com'} // Prevent changing the main admin role
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number (optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (123) 456-7890"
                  />
                  {errors.phone && <div className="error">{errors.phone}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address (optional)</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, Country"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">Update User</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showUserDetailModal && currentUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>User Details</h3>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>
            <div className="user-detail-content">
              <div className="user-detail-header">
                <div className="user-avatar large">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="user-info">
                  <h2>{currentUser.name}</h2>
                  <p>{currentUser.email}</p>
                  <span className={`role-badge ${currentUser.role}`}>
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </span>
                </div>
              </div>

              <div className="user-detail-section">
                <h4>Account Information</h4>
                <div className="detail-row">
                  <div className="detail-label">User ID:</div>
                  <div className="detail-value">{currentUser.id}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Registered:</div>
                  <div className="detail-value">{currentUser.registeredDate}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Last Login:</div>
                  <div className="detail-value">{currentUser.lastLogin}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Orders:</div>
                  <div className="detail-value">{currentUser.orders}</div>
                </div>
              </div>

              <div className="user-detail-section">
                <h4>Contact Information</h4>
                <div className="detail-row">
                  <div className="detail-label">Email:</div>
                  <div className="detail-value">{currentUser.email}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Phone:</div>
                  <div className="detail-value">{currentUser.phone || 'Not provided'}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Address:</div>
                  <div className="detail-value">{currentUser.address || 'Not provided'}</div>
                </div>
              </div>

              <div className="user-detail-actions">
                <button className="edit-btn" onClick={() => {
                  closeModal();
                  openEditUserModal(currentUser);
                }}>
                  <FaEdit /> Edit User
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    closeModal();
                    handleDelete(currentUser.id);
                  }}
                  disabled={currentUser.role === 'admin'}
                >
                  <FaTrash /> Delete User
                </button>
                <button className="email-btn" onClick={() => {
                  showSuccessToast(`Email sent to ${currentUser.name}`);
                }}>
                  <FaEnvelope /> Send Email
                </button>
                <button className="reset-password-btn" onClick={() => {
                  showSuccessToast(`Password reset link sent to ${currentUser.email}`);
                }}>
                  <FaLock /> Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
