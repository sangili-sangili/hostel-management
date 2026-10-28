import React from 'react';
import { Card } from '../../components/common/Card';
import { mockDashboardMetrics } from '../../mock-data/dashboardData';
import { formatCurrency } from '../../utils/formatters';

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          High-level operational metrics and hostel SaaS tenant performance
        </p>
      </div>

      {/* Metric Cards Grid Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Tenants</div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{mockDashboardMetrics.totalTenants}</div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Tenants</div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{mockDashboardMetrics.activeTenants}</div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">MRR</div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {formatCurrency(mockDashboardMetrics.monthlyRecurringRevenue)}
          </div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Trials</div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{mockDashboardMetrics.trialTenants}</div>
        </Card>
      </div>
    </div>
  );
};
