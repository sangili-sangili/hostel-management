import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const TicketDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/support" className="p-1 text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Support Ticket {id}</h1>
          <p className="text-sm text-slate-500 mt-0.5">Thread view, agent assignment, and internal notes</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Ticket conversation thread and reply simulation</p>
      </div>
    </div>
  );
};
