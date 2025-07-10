import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../api/useAuth";
import { canAccessRoute } from "../../routes/pagePermissions";
import { routeNames } from "../../routes/routes";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/${routeNames.login}`} replace />;
  }

  const canAccess = canAccessRoute(user, location.pathname);

  if (!canAccess) {
    return <Navigate to={`/${routeNames.forbidden}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
