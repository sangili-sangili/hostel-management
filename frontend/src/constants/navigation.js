import { ROUTES } from './routes';

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
