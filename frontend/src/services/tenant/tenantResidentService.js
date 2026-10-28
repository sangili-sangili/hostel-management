import { mockTenantResidents } from '../../mock-data/tenant/tenantResidentsData';

export const tenantResidentService = {
  getResidents: async (branchId = 'all') => {
    if (branchId === 'all') {
      return Promise.resolve([...mockTenantResidents]);
    }
    return Promise.resolve(mockTenantResidents.filter((res) => res.branchId === branchId));
  },
  getResidentById: async (id) => {
    const resident = mockTenantResidents.find((r) => r.id === id);
    return Promise.resolve(resident || null);
  },
  createResident: async (residentData) => {
    const newResident = {
      id: `res_${Date.now()}`,
      status: 'Active',
      duesAmount: 0,
      ...residentData,
    };
    return Promise.resolve(newResident);
  },
  updateResident: async (id, residentData) => {
    return Promise.resolve({ id, ...residentData });
  },
  updateResidentStatus: async (id, status) => {
    return Promise.resolve({ id, status });
  },
};
