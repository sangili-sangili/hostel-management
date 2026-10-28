export const userService = {
  getUsers: async () => {
    return Promise.resolve([]);
  },
  createUser: async (userData) => {
    return Promise.resolve(userData);
  },
  updateUser: async (id, userData) => {
    return Promise.resolve({ id, ...userData });
  },
  toggleUserStatus: async (id, isActive) => {
    return Promise.resolve({ id, isActive });
  },
  getRoles: async () => {
    return Promise.resolve([]);
  },
  updateRolePermissions: async (roleId, permissions) => {
    return Promise.resolve({ roleId, permissions });
  },
};
