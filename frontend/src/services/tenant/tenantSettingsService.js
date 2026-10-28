import { mockTenantSettings } from '../../mock-data/tenant/tenantSettingsData';

export const tenantSettingsService = {
  getSettings: async () => {
    return Promise.resolve(mockTenantSettings);
  },
  updateProfile: async (profileData) => {
    return Promise.resolve({ ...mockTenantSettings.businessProfile, ...profileData });
  },
  updatePolicies: async (policyData) => {
    return Promise.resolve({ ...mockTenantSettings.operationalPolicies, ...policyData });
  },
};
