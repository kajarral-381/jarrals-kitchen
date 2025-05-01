import { useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

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
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  // Get unique roles
  const roles = ['all', ...new Set(users.map(user => user.role))];
  
  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  
  const openAddUserModal = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user',
      password: ''
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
      password: ''
    });
    setErrors({});
    setShowEditUserModal(true);
  };
  
  const closeModal = () => {
    setShowAddUserModal(false);
    setShowEditUserModal(false);
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
    if (showAddUserModal && !formData.password) {
      newErrors.password = 'Password is required';
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
          registeredDate: new Date().toISOString().split('T')[0],
          lastLogin: '-',
          orders: 0
        };
        
        setUsers([...users, newUser]);
      } else if (showEditUserModal && currentUser) {
        // Update existing user
        setUsers(users.map(user => 
          user.id === currentUser.id ? { ...user, name: formData.name, email: formData.email, role: formData.role } : user
        ));
      }
      
      closeModal();
    }
  };
  
  return (
    <div className="admin-users">
      <div className="admin-toolbar">
        <h2>Users</h2>
        <button className="add-btn" onClick={openAddUserModal}>
          <FaUserPlus /> Add User
        </button>
      </div>
      
      <div className="admin-filters">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
      </div>
      
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registered</th>
              <th>Last Login</th>
              <th>Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
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
                    className="edit-btn"
                    onClick={() => openEditUserModal(user)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                    disabled={user.role === 'admin'} // Prevent deleting admin users
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredUsers.length === 0 && (
        <div className="no-results">
          <p>No users found matching your criteria.</p>
        </div>
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
              <div className="form-group">
                <label htmlFor="name">Name</label>
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
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select 
                  id="role" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
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
              <div className="form-group">
                <label htmlFor="name">Name</label>
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
                <label htmlFor="password">Password (leave blank to keep current)</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="••••••••"
                />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select 
                  id="role" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-btn">Update User</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
