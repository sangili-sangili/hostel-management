import React from 'react';
import { mockAuditLogs } from '../../mock-data/auditLogsData';

export const AuditLogsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Audit Logs</h1>
        <p className="text-sm text-slate-500 mt-1">
          Immutable platform security timeline: user actions, tenant status changes, refunds, and permission edits
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Audit logs list ({mockAuditLogs.length} audit records available)</p>
      </div>
    </div>
  );
};
