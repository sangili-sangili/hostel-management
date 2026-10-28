import { mockTenantReportsData } from '../../mock-data/tenant/tenantReportsData';

export const tenantReportService = {
  getReportsData: async () => {
    return Promise.resolve(mockTenantReportsData);
  },
};
