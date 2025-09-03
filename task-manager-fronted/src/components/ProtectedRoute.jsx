import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children; // If token exists, render the child component (e.g., DashboardPage)
};

export default ProtectedRoute;