export const mockDashboardMetrics = {
  totalTenants: 142,
  activeTenants: 128,
  activeSubscriptions: 114,
  trialTenants: 14,
  monthlyRecurringRevenue: 38450,
  annualRecurringRevenue: 461400,
  expiringSubscriptions: 6,
  failedPayments: 3,
};

export const mockRevenueTrends = [
  { month: 'Jan', revenue: 28000, mrr: 27500 },
  { month: 'Feb', revenue: 31200, mrr: 30000 },
  { month: 'Mar', revenue: 32500, mrr: 31800 },
  { month: 'Apr', revenue: 34100, mrr: 33500 },
  { month: 'May', revenue: 36800, mrr: 35900 },
  { month: 'Jun', revenue: 38450, mrr: 38450 },
];

export const mockTenantGrowth = [
  { month: 'Jan', newTenants: 8, churned: 1 },
  { month: 'Feb', newTenants: 12, churned: 2 },
  { month: 'Mar', newTenants: 15, churned: 1 },
  { month: 'Apr', newTenants: 11, churned: 0 },
  { month: 'May', newTenants: 18, churned: 3 },
  { month: 'Jun', newTenants: 22, churned: 2 },
];

export const mockPlanDistribution = [
  { name: 'Starter', value: 45, color: '#3b82f6' },
  { name: 'Growth', value: 52, color: '#10b981' },
  { name: 'Enterprise', value: 17, color: '#8b5cf6' },
];

export const mockRecentActivity = [
  { id: 'act_1', action: 'New tenant onboarded', tenant: 'Greenwood Student Living', timestamp: '2026-10-28T14:32:00Z', type: 'tenant' },
  { id: 'act_2', action: 'Subscription upgraded to Enterprise', tenant: 'Starlight Luxury Hostels', timestamp: '2026-10-28T11:15:00Z', type: 'billing' },
  { id: 'act_3', action: 'Trial extended by 7 days', tenant: 'Metropolis Dorms', timestamp: '2026-10-27T18:45:00Z', type: 'trial' },
  { id: 'act_4', action: 'Failed payment alert', tenant: 'Sunrise Student Co.', timestamp: '2026-10-27T09:20:00Z', type: 'alert' },
];

export const mockExpiringTrials = [
  { id: 'tr_1', tenantName: 'Apex Youth Residences', daysLeft: 2, expiresAt: '2026-10-31', contactEmail: 'ops@apexhomes.com' },
  { id: 'tr_2', tenantName: 'BlueSky Hostels', daysLeft: 3, expiresAt: '2026-11-01', contactEmail: 'admin@bluesky.com' },
  { id: 'tr_3', tenantName: 'Central City Dormitory', daysLeft: 5, expiresAt: '2026-11-03', contactEmail: 'hello@centralcity.in' },
];

export const mockRecentPayments = [
  { id: 'pay_1', invoiceId: 'INV-2026-089', tenant: 'SilverOak Living', amount: 499, status: 'Paid', date: '2026-10-28' },
  { id: 'pay_2', invoiceId: 'INV-2026-088', tenant: 'Sunrise Student Co.', amount: 299, status: 'Failed', date: '2026-10-27' },
  { id: 'pay_3', invoiceId: 'INV-2026-087', tenant: 'Starlight Luxury Hostels', amount: 1299, status: 'Paid', date: '2026-10-27' },
];
