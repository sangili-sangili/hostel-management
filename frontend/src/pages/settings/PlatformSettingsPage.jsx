import React from 'react';
import { mockPlatformSettings } from '../../mock-data/settingsData';

export const PlatformSettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Global branding, default trial duration, invoice formats, payment gateways, and security policies
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">
          Settings panels: Branding ({mockPlatformSettings.platformName}), Default Trial ({mockPlatformSettings.defaultTrialDays} days), Security, and Gateways.
        </p>
      </div>
    </div>
  );
};
