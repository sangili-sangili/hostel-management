import { mockTenantStaff } from '../../mock-data/tenant/tenantStaffData';

export const tenantStaffService = {
  getStaff: async (branchId = 'all') => {
    if (branchId === 'all') {
      return Promise.resolve([...mockTenantStaff]);
    }
    return Promise.resolve(mockTenantStaff.filter((s) => s.branchId === branchId || s.branchId === 'all'));
  },
  inviteStaff: async (staffData) => {
    const newStaff = {
      id: `stf_${Date.now()}`,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      ...staffData,
    };
    return Promise.resolve(newStaff);
  },
  updateStaff: async (id, staffData) => {
    return Promise.resolve({ id, ...staffData });
  },
  toggleStaffStatus: async (id, status) => {
    return Promise.resolve({ id, status });
  },
};
