import React from 'react';

export const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">
          Tenant growth, monthly recurring revenue, subscription retention, and trial conversion analytics
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Reports and analytics overview with CSV export and date filters</p>
      </div>
    </div>
  );
};
