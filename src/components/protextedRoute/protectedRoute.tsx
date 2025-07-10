import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../api/useAuth";
import { canAccessRoute } from "../../routes/pagePermissions";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const canAccess = canAccessRoute(user, location.pathname);

  if (!canAccess) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
