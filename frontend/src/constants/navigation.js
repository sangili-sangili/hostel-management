import { ROUTES, TENANT_ROUTES } from './routes';

export const NAVIGATION_GROUPS = [
  {
    group: 'Overview',
    items: [
      { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    ],
  },
  {
    group: 'Tenant & Subscriptions',
    items: [
      { name: 'Tenants', path: ROUTES.TENANTS, icon: 'Building2' },
      { name: 'Subscription Plans', path: ROUTES.SUBSCRIPTION_PLANS, icon: 'CreditCard' },
      { name: 'Trial Management', path: ROUTES.TRIALS, icon: 'Clock' },
      { name: 'Billing & Invoices', path: ROUTES.BILLING, icon: 'Receipt' },
    ],
  },
  {
    group: 'Platform Administration',
    items: [
      { name: 'Users & Roles', path: ROUTES.USERS, icon: 'ShieldCheck' },
      { name: 'Location Master', path: ROUTES.LOCATIONS, icon: 'MapPin' },
      { name: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: 'Bell' },
      { name: 'Support Tickets', path: ROUTES.SUPPORT, icon: 'LifeBuoy' },
    ],
  },
  {
    group: 'Analytics & Compliance',
    items: [
      { name: 'Reports & Analytics', path: ROUTES.REPORTS, icon: 'BarChart3' },
      { name: 'Audit Logs', path: ROUTES.AUDIT_LOGS, icon: 'FileText' },
      { name: 'Platform Settings', path: ROUTES.SETTINGS, icon: 'Settings' },
    ],
  },
];

export const TENANT_NAVIGATION_GROUPS = [
  {
    group: 'Hostel Operations',
    items: [
      { name: 'Dashboard', path: TENANT_ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
      { name: 'Branches', path: TENANT_ROUTES.BRANCHES, icon: 'Building2' },
      { name: 'Rooms & Beds', path: TENANT_ROUTES.ROOMS, icon: 'BedDouble' },
    ],
  },
  {
    group: 'Residents & Occupancy',
    items: [
      { name: 'Residents', path: TENANT_ROUTES.RESIDENTS, icon: 'Users' },
      { name: 'Allocations & Check-ins', path: TENANT_ROUTES.ALLOCATIONS, icon: 'CalendarCheck' },
    ],
  },
  {
    group: 'Billing & Collections',
    items: [
      { name: 'Fees & Invoices', path: TENANT_ROUTES.FEES, icon: 'Receipt' },
      { name: 'Payments History', path: TENANT_ROUTES.PAYMENTS, icon: 'CreditCard' },
    ],
  },
  {
    group: 'Management & Reports',
    items: [
      { name: 'Staff & Roles', path: TENANT_ROUTES.STAFF, icon: 'UserCheck' },
      { name: 'Reports & Analytics', path: TENANT_ROUTES.REPORTS, icon: 'BarChart3' },
      { name: 'Notifications', path: TENANT_ROUTES.NOTIFICATIONS, icon: 'Bell' },
      { name: 'Subscription & Limits', path: TENANT_ROUTES.SUBSCRIPTION, icon: 'ShieldCheck' },
      { name: 'Hostel Settings', path: TENANT_ROUTES.SETTINGS, icon: 'Settings' },
    ],
  },
];
