import React from 'react';
import { Button } from '../../components/common/Button';
import { Plus } from 'lucide-react';
import { mockPlans } from '../../mock-data/plansData';

export const SubscriptionPlansPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subscription Plans</h1>
          <p className="text-sm text-slate-500 mt-1">Configure pricing tiers, features, bed limits, and billing intervals</p>
        </div>
        <Button icon={Plus} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2">
          Create New Plan
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Subscription plans listing ({mockPlans.length} plans available)</p>
      </div>
    </div>
  );
};
