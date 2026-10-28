export const mockAuditLogs = [
  {
    id: 'aud_1091',
    actor: 'Alex Vance (Platform Admin)',
    action: 'Extended Trial Duration',
    target: 'Apex Youth Residences (tnt_3)',
    timestamp: '2026-10-27T18:45:12Z',
    details: 'Extended by 7 days. Reason: Migration delays from legacy spreadsheet system.',
    ipAddress: '192.168.1.101',
  },
  {
    id: 'aud_1090',
    actor: 'Jessica Reynolds (Billing Admin)',
    action: 'Simulated Refund Issued',
    target: 'Transaction #txn_98230',
    timestamp: '2026-10-27T15:20:05Z',
    details: 'Triggered simulated refund of $99.00 for failed recurring charge duplicate.',
    ipAddress: '192.168.1.104',
  },
  {
    id: 'aud_1089',
    actor: 'Alex Vance (Platform Admin)',
    action: 'Tenant Status Changed',
    target: 'Metropolis Dorms (tnt_4)',
    timestamp: '2026-10-26T11:02:45Z',
    details: 'Changed status from Active to Suspended. Reason: Overdue invoice > 60 days.',
    ipAddress: '192.168.1.101',
  },
];
