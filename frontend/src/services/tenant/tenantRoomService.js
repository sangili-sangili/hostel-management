import { mockTenantRooms } from '../../mock-data/tenant/tenantRoomsData';

export const tenantRoomService = {
  getRooms: async (branchId = 'all') => {
    if (branchId === 'all') {
      return Promise.resolve([...mockTenantRooms]);
    }
    return Promise.resolve(mockTenantRooms.filter((r) => r.branchId === branchId));
  },
  getRoomById: async (id) => {
    const room = mockTenantRooms.find((r) => r.id === id);
    return Promise.resolve(room || null);
  },
  createRoom: async (roomData) => {
    const newRoom = {
      id: `rm_${Date.now()}`,
      status: 'Available',
      beds: Array.from({ length: roomData.capacity || 1 }).map((_, i) => ({
        id: `b_${Date.now()}_${i}`,
        bedNumber: `Bed ${String.fromCharCode(65 + i)}`,
        status: 'available',
        residentName: null,
      })),
      ...roomData,
    };
    return Promise.resolve(newRoom);
  },
  updateRoom: async (id, roomData) => {
    return Promise.resolve({ id, ...roomData });
  },
  updateBedStatus: async (roomId, bedId, status, residentData = null) => {
    return Promise.resolve({ roomId, bedId, status, residentData, success: true });
  },
};
