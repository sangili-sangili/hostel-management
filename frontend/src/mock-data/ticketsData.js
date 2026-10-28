export const mockTickets = [
  {
    id: 'TCK-1042',
    subject: 'Cannot add third branch under Growth plan',
    tenantId: 'tnt_1',
    tenantName: 'Greenwood Student Living',
    priority: 'High',
    status: 'Open',
    category: 'Billing / Limits',
    assignedTo: 'Marcus Brody',
    createdAt: '2026-10-28T09:12:00Z',
    messages: [
      {
        id: 'msg_1',
        sender: 'David Miller (Tenant Admin)',
        isAgent: false,
        text: 'Hello, we are attempting to add our new Berkeley branch, but the interface says branch limit exceeded even though Growth allows 5 branches.',
        timestamp: '2026-10-28T09:12:00Z',
      },
    ],
    internalNotes: [
      { id: 'note_1', author: 'Marcus Brody', text: 'Checked tenant config; branch quota was synced at 2 during onboarding. Will adjust.', timestamp: '2026-10-28T10:00:00Z' },
    ],
  },
  {
    id: 'TCK-1041',
    subject: 'Request invoice receipt copy with VAT number',
    tenantId: 'tnt_4',
    tenantName: 'Metropolis Dorms',
    priority: 'Normal',
    status: 'In Progress',
    category: 'Billing',
    assignedTo: 'Jessica Reynolds',
    createdAt: '2026-10-27T14:40:00Z',
    messages: [],
    internalNotes: [],
  },
];
