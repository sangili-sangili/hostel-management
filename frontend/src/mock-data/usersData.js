export const mockUsers = [
  {
    id: 'usr_1',
    name: 'Alex Vance',
    email: 'admin@hostelsaas.com',
    role: 'Platform Administrator',
    status: 'Active',
    lastLogin: '2026-10-28T22:15:00Z',
    createdAt: '2025-01-01',
  },
  {
    id: 'usr_2',
    name: 'Jessica Reynolds',
    email: 'billing@hostelsaas.com',
    role: 'Billing Administrator',
    status: 'Active',
    lastLogin: '2026-10-28T19:40:00Z',
    createdAt: '2025-03-12',
  },
  {
    id: 'usr_3',
    name: 'Marcus Brody',
    email: 'support@hostelsaas.com',
    role: 'Support Agent',
    status: 'Active',
    lastLogin: '2026-10-27T14:10:00Z',
    createdAt: '2025-06-20',
  },
  {
    id: 'usr_4',
    name: 'Elena Rostova',
    email: 'auditor@hostelsaas.com',
    role: 'Read-Only Auditor',
    status: 'Inactive',
    lastLogin: '2026-09-14T11:00:00Z',
    createdAt: '2025-08-05',
  },
];

export const mockRoles = [
  {
    id: 'role_platform_admin',
    name: 'Platform Administrator',
    description: 'Full access to all platform administrative modules, settings, and billing.',
    usersCount: 2,
    permissions: ['view', 'create', 'edit', 'delete', 'approve', 'export', 'manage_settings'],
  },
  {
    id: 'role_billing_admin',
    name: 'Billing Administrator',
    description: 'Manage plans, invoices, transactions, subscriptions, and financial reports.',
    usersCount: 3,
    permissions: ['view', 'create', 'edit', 'export'],
  },
  {
    id: 'role_support_agent',
    name: 'Support Agent',
    description: 'Handle tenant support tickets, view tenant profile details, and add notes.',
    usersCount: 5,
    permissions: ['view', 'edit'],
  },
  {
    id: 'role_auditor',
    name: 'Read-Only Auditor',
    description: 'Read-only visibility across platform logs, reports, and tenant summaries.',
    usersCount: 1,
    permissions: ['view', 'export'],
  },
];
