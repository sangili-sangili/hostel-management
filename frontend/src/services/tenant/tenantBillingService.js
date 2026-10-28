import { mockTenantInvoices, mockTenantPayments, mockFeeCategories } from '../../mock-data/tenant/tenantFeesData';

export const tenantBillingService = {
  getFeeCategories: async () => Promise.resolve([...mockFeeCategories]),
  getInvoices: async (branchId = 'all') => {
    if (branchId === 'all') {
      return Promise.resolve([...mockTenantInvoices]);
    }
    return Promise.resolve(mockTenantInvoices.filter((inv) => inv.branchId === branchId));
  },
  createInvoice: async (invoiceData) => {
    const newInvoice = {
      id: `INV-TNT-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      paidAmount: 0,
      balance: invoiceData.totalAmount,
      status: 'Unpaid',
      ...invoiceData,
    };
    return Promise.resolve(newInvoice);
  },
  getPayments: async () => {
    return Promise.resolve([...mockTenantPayments]);
  },
  recordPayment: async (paymentData) => {
    const newPayment = {
      id: `REC-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      ...paymentData,
    };
    return Promise.resolve(newPayment);
  },
};
