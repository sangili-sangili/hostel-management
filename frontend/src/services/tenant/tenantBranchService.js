import { mockTenantBranches } from '../../mock-data/tenant/tenantBranchesData';

export const tenantBranchService = {
  getBranches: async () => {
    return Promise.resolve([...mockTenantBranches]);
  },
  getBranchById: async (id) => {
    const branch = mockTenantBranches.find((b) => b.id === id);
    return Promise.resolve(branch || null);
  },
  createBranch: async (branchData) => {
    const newBranch = {
      id: `br_${Date.now()}`,
      status: 'Active',
      totalRooms: 0,
      totalBeds: 0,
      occupiedBeds: 0,
      ...branchData,
    };
    return Promise.resolve(newBranch);
  },
  updateBranch: async (id, branchData) => {
    return Promise.resolve({ id, ...branchData });
  },
  toggleBranchStatus: async (id, status) => {
    return Promise.resolve({ id, status });
  },
};
