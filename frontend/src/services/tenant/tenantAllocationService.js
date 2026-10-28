import { mockTenantAllocations } from '../../mock-data/tenant/tenantAllocationsData';

export const tenantAllocationService = {
  getAllocations: async (branchId = 'all') => {
    if (branchId === 'all') {
      return Promise.resolve([...mockTenantAllocations]);
    }
    return Promise.resolve(mockTenantAllocations.filter((a) => a.branchId === branchId));
  },
  allocateBed: async (allocationData) => {
    const newAllocation = {
      id: `alc_${Date.now()}`,
      allocationDate: new Date().toISOString().split('T')[0],
      status: 'Allocated',
      ...allocationData,
    };
    return Promise.resolve(newAllocation);
  },
  processCheckIn: async (allocationId, checkInDate = new Date().toISOString().split('T')[0]) => {
    return Promise.resolve({ allocationId, status: 'Checked In', checkInDate, success: true });
  },
  processCheckOut: async (allocationId, checkOutData) => {
    return Promise.resolve({
      allocationId,
      status: 'Checked Out',
      checkOutDate: checkOutData.checkOutDate || new Date().toISOString().split('T')[0],
      depositRefunded: checkOutData.depositRefunded,
      clearanceNotes: checkOutData.clearanceNotes,
      success: true,
    });
  },
};
