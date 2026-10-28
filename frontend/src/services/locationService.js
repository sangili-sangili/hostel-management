export const locationService = {
  getCountries: async () => Promise.resolve([]),
  getStates: async (_countryId) => Promise.resolve([]),
  getDistricts: async (_stateId) => Promise.resolve([]),
  getCities: async (_districtId) => Promise.resolve([]),
  createLocation: async (level, data) => Promise.resolve({ level, ...data }),
  updateLocation: async (level, id, data) => Promise.resolve({ level, id, ...data }),
  toggleLocationStatus: async (level, id, isActive) => Promise.resolve({ level, id, isActive }),
};
