import { Navigate, useLocation } from "react-router-dom";
export default function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();
  if (!isAuthenticated) {
    // redirect to login, and remember where user tried to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
