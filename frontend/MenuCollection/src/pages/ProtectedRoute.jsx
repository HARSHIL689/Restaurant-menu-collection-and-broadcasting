import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Role check (if required)
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
