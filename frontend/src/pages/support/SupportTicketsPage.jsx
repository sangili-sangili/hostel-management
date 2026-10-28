import React from 'react';
import { mockTickets } from '../../mock-data/ticketsData';

export const SupportTicketsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Support Tickets</h1>
        <p className="text-sm text-slate-500 mt-1">Tenant customer support desk, inquiries, and agent dispatch</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Tickets list ({mockTickets.length} active tickets loaded)</p>
      </div>
    </div>
  );
};
