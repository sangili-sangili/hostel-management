import React from 'react';
import { mockLocations } from '../../mock-data/locationsData';

export const LocationMasterPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Location Master</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure hierarchical administrative divisions: Countries, States, Districts, and Cities
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">
          Location hierarchy configured: {mockLocations.countries.length} countries,{' '}
          {mockLocations.states.length} states, {mockLocations.cities.length} cities.
        </p>
      </div>
    </div>
  );
};
