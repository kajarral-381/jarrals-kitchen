import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading, isAdmin } = useAuth();
  const location = useLocation();
  
  if (loading) {
    // Show loading state while checking authentication
    return <div className="loading">Loading...</div>;
  }
  
  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (adminOnly && !isAdmin()) {
    // Redirect to home if not an admin
    return <Navigate to="/" replace />;
  }
  
  // Render children if authenticated and has required permissions
  return children;
};

export default ProtectedRoute;
