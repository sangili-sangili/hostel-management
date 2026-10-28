import React, { useState } from 'react';
import { AuthContext } from './authContextInstance';
import { authService } from '../services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('saas_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_super_1',
      name: 'Alex Vance',
      email: 'admin@hostelsaas.com',
      role: 'Platform Administrator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('saas_auth_token') || 'mock_token');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('saas_user', JSON.stringify(response.user));
      localStorage.setItem('saas_auth_token', response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('saas_user');
    localStorage.removeItem('saas_auth_token');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'Platform Administrator') return true;
    return Boolean(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
