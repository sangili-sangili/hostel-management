import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({
  children,
  portalType = 'super_admin',
  requiredRole,
  requiredPermission,
}) => {
  const { isAuthenticated, user, tenantUser, hasPermission } = useAuth();
  const location = useLocation();

  if (portalType === 'tenant') {
    if (!tenantUser) {
      return <Navigate to="/tenant/login" state={{ from: location }} replace />;
    }
    if (requiredRole && tenantUser.role !== requiredRole && tenantUser.role !== 'Tenant Administrator') {
      return <Navigate to="/tenant/dashboard" replace />;
    }
  } else {
    // Super Admin
    if (!user || !isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (requiredRole && user.role !== requiredRole && user.role !== 'Platform Administrator') {
      return <Navigate to="/" replace />;
    }
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to={portalType === 'tenant' ? '/tenant/dashboard' : '/'} replace />;
  }

  return children;
};
