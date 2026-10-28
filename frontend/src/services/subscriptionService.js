export const subscriptionService = {
  getPlans: async () => {
    return Promise.resolve([]);
  },
  createPlan: async (planData) => {
    return Promise.resolve(planData);
  },
  updatePlan: async (id, planData) => {
    return Promise.resolve({ id, ...planData });
  },
  togglePlanStatus: async (id, isActive) => {
    return Promise.resolve({ id, isActive });
  },
  getTrials: async (_params) => {
    return Promise.resolve([]);
  },
  extendTrial: async (tenantId, days, reason) => {
    return Promise.resolve({ tenantId, extendedDays: days, reason, success: true });
  },
  convertTrialToPaid: async (tenantId, planId) => {
    return Promise.resolve({ tenantId, planId, success: true });
  },
};
