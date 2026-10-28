export const auditService = {
  getLogs: async (_params) => Promise.resolve({ data: [], total: 0 }),
  logAction: async (actionData) => Promise.resolve({ success: true, ...actionData }),
};
