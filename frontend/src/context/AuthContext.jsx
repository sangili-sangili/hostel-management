import React, { useState } from 'react';
import { AuthContext } from './authContextInstance';
import { authService } from '../services/authService';

export const AuthProvider = ({ children }) => {
  // Portal mode: 'super_admin' | 'tenant'
  const [portal, setPortal] = useState(() => localStorage.getItem('saas_portal') || 'super_admin');

  // Super Admin user state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('saas_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_super_1',
      name: 'Alex Vance',
      email: 'admin@hostelsaas.com',
      role: 'Platform Administrator',
      portal: 'super_admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    };
  });

  // Tenant Admin / Staff state
  const [tenantUser, setTenantUser] = useState(() => {
    const saved = localStorage.getItem('saas_tenant_user');
    return saved ? JSON.parse(saved) : {
      id: 'tusr_1',
      name: 'David Miller',
      email: 'david@greenwoodliving.com',
      role: 'Tenant Administrator',
      portal: 'tenant',
      tenantId: 'tnt_1',
      tenantName: 'Greenwood Student Living',
      plan: 'Growth',
      activeBranchId: 'br_1',
      branches: [
        { id: 'all', name: 'All Branches (Overview)' },
        { id: 'br_1', name: 'Downtown Berkeley Branch' },
        { id: 'br_2', name: 'Northside Campus Residency' },
        { id: 'br_3', name: 'South Bay Scholar House' },
      ],
    };
  });

  const [activeBranchId, setActiveBranchId] = useState(() => {
    return localStorage.getItem('saas_active_branch_id') || 'all';
  });

  const [token, setToken] = useState(() => localStorage.getItem('saas_auth_token') || 'mock_token');
  const [isLoading, setIsLoading] = useState(false);

  // Super Admin login
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setToken(response.token);
      setPortal('super_admin');
      localStorage.setItem('saas_portal', 'super_admin');
      localStorage.setItem('saas_user', JSON.stringify(response.user));
      localStorage.setItem('saas_auth_token', response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  // Tenant user login
  const tenantLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const tenantUserObj = {
        id: 'tusr_1',
        name: credentials.email?.split('@')[0] || 'David Miller',
        email: credentials.email || 'david@greenwoodliving.com',
        role: 'Tenant Administrator',
        portal: 'tenant',
        tenantId: 'tnt_1',
        tenantName: 'Greenwood Student Living',
        plan: 'Growth',
        activeBranchId: 'all',
        branches: [
          { id: 'all', name: 'All Branches (Overview)' },
          { id: 'br_1', name: 'Downtown Berkeley Branch' },
          { id: 'br_2', name: 'Northside Campus Residency' },
          { id: 'br_3', name: 'South Bay Scholar House' },
        ],
      };
      setTenantUser(tenantUserObj);
      setPortal('tenant');
      setToken('mock_tenant_jwt_token');
      localStorage.setItem('saas_portal', 'tenant');
      localStorage.setItem('saas_tenant_user', JSON.stringify(tenantUserObj));
      localStorage.setItem('saas_auth_token', 'mock_tenant_jwt_token');
      return { user: tenantUserObj, token: 'mock_tenant_jwt_token' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleBranchChange = (branchId) => {
    setActiveBranchId(branchId);
    localStorage.setItem('saas_active_branch_id', branchId);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('saas_user');
    localStorage.removeItem('saas_auth_token');
  };

  const tenantLogout = async () => {
    setTenantUser(null);
    localStorage.removeItem('saas_tenant_user');
  };

  const hasPermission = (permission) => {
    if (portal === 'super_admin') {
      if (!user) return false;
      if (user.role === 'Platform Administrator') return true;
      return Boolean(permission);
    } else {
      if (!tenantUser) return false;
      if (tenantUser.role === 'Tenant Administrator') return true;
      return Boolean(permission);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        portal,
        setPortal,
        user,
        tenantUser,
        activeBranchId,
        setActiveBranchId: handleBranchChange,
        token,
        isAuthenticated: !!token && (portal === 'super_admin' ? !!user : !!tenantUser),
        isLoading,
        login,
        tenantLogin,
        logout,
        tenantLogout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
