export const authService = {
  login: async (credentials) => {
    return Promise.resolve({
      user: {
        id: 'usr_super_1',
        name: 'Alex Vance',
        email: credentials.email || 'admin@hostelsaas.com',
        role: 'Platform Administrator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      },
      token: 'mock_jwt_token_super_admin',
    });
  },

  logout: async () => {
    localStorage.removeItem('saas_auth_token');
    return Promise.resolve(true);
  },

  forgotPassword: async (email) => {
    return Promise.resolve({ success: true, message: `Password reset link sent to ${email}` });
  },

  getCurrentUser: async () => {
    return Promise.resolve({
      id: 'usr_super_1',
      name: 'Alex Vance',
      email: 'admin@hostelsaas.com',
      role: 'Platform Administrator',
    });
  },
};
