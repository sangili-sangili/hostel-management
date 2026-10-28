export const tenantService = {
  getTenants: async (_params) => {
    return Promise.resolve({ data: [], total: 0 });
  },

  getTenantById: async (_id) => {
    return Promise.resolve(null);
  },

  createTenant: async (data) => {
    return Promise.resolve({ success: true, tenant: data });
  },

  updateTenant: async (id, data) => {
    return Promise.resolve({ success: true, tenant: { id, ...data } });
  },

  updateTenantStatus: async (id, status, reason = '') => {
    return Promise.resolve({ success: true, id, status, reason });
  },
};
