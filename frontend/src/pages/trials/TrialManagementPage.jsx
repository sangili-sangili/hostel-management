import React from 'react';
import { mockTrials } from '../../mock-data/trialsData';

export const TrialManagementPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Trial Management</h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor 10-day default trials, track remaining days, extend trials, and convert to paid
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Trial management interface ({mockTrials.length} active trials monitored)</p>
      </div>
    </div>
  );
};
