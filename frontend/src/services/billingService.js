export const billingService = {
  getSubscriptions: async () => {
    return Promise.resolve([]);
  },
  getInvoices: async (_params) => {
    return Promise.resolve([]);
  },
  getInvoiceById: async (_id) => {
    return Promise.resolve(null);
  },
  getTransactions: async (_params) => {
    return Promise.resolve([]);
  },
  simulateRefund: async (transactionId, reason) => {
    return Promise.resolve({
      success: true,
      transactionId,
      status: 'refunded_simulated',
      reason,
      timestamp: new Date().toISOString(),
    });
  },
};
