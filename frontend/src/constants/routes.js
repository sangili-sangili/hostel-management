export const ROUTES = {
  // Auth
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',

  // Dashboard
  DASHBOARD: '/',

  // Tenants
  TENANTS: '/tenants',
  TENANT_CREATE: '/tenants/create',
  TENANT_DETAIL: '/tenants/:id',

  // Subscription Plans
  SUBSCRIPTION_PLANS: '/subscription-plans',

  // Trial Management
  TRIALS: '/trials',

  // Billing & Subscriptions
  BILLING: '/billing',
  INVOICES: '/billing/invoices',
  TRANSACTIONS: '/billing/transactions',

  // Users & RBAC
  USERS: '/users',
  ROLES: '/users/roles',

  // Location Master
  LOCATIONS: '/locations',

  // Notifications
  NOTIFICATIONS: '/notifications',

  // Support Tickets
  SUPPORT: '/support',
  TICKET_DETAIL: '/support/:id',

  // Reports & Analytics
  REPORTS: '/reports',

  // Audit Logs
  AUDIT_LOGS: '/audit-logs',

  // Platform Settings
  SETTINGS: '/settings',
};

export const TENANT_ROUTES = {
  LOGIN: '/tenant/login',
  DASHBOARD: '/tenant/dashboard',
  BRANCHES: '/tenant/branches',
  ROOMS: '/tenant/rooms',
  RESIDENTS: '/tenant/residents',
  RESIDENT_DETAIL: '/tenant/residents/:id',
  ALLOCATIONS: '/tenant/allocations',
  FEES: '/tenant/fees',
  INVOICES: '/tenant/invoices',
  PAYMENTS: '/tenant/payments',
  STAFF: '/tenant/staff',
  NOTIFICATIONS: '/tenant/notifications',
  REPORTS: '/tenant/reports',
  SETTINGS: '/tenant/settings',
  SUBSCRIPTION: '/tenant/subscription',
};

