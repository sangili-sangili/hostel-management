import React from 'react';
import { mockNotifications } from '../../mock-data/notificationsData';

export const NotificationsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications & Alerts</h1>
        <p className="text-sm text-slate-500 mt-1">Platform alerts, trial expirations, failed payments, and preferences</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Notifications inbox ({mockNotifications.length} alerts loaded)</p>
      </div>
    </div>
  );
};
