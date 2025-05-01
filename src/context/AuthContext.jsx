import { createContext, useContext, useState, useEffect } from 'react';

// Create auth context
const AuthContext = createContext();

// Mock user data (in a real app, this would come from a backend)
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // In a real app, passwords would be hashed
    role: 'user'
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('bakeryUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    setError('');
    
    // Find user with matching email and password
    const user = mockUsers.find(
      user => user.email === email && user.password === password
    );

    if (user) {
      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('bakeryUser', JSON.stringify(userWithoutPassword));
      return true;
    } else {
      setError('Invalid email or password');
      return false;
    }
  };

  // Register function (in a real app, this would create a new user in the database)
  const register = (name, email, password) => {
    setError('');
    
    // Check if email already exists
    if (mockUsers.some(user => user.email === email)) {
      setError('Email already in use');
      return false;
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      role: 'user'
    };

    // Add to mock users (in a real app, this would be saved to a database)
    mockUsers.push(newUser);

    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('bakeryUser', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bakeryUser');
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAdmin,
    loading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
