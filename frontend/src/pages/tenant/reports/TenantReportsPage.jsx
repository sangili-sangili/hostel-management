import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { DataTable } from '../../../components/tables/DataTable';
import { Download, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { mockTenantReportsData } from '../../../mock-data/tenant/tenantReportsData';
import { exportToCSV } from '../../../utils/exportHelpers';
import { formatCurrency } from '../../../utils/formatters';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const TenantReportsPage = () => {
  const [activeTab, setActiveTab] = useState('occupancy');
  const { monthlyOccupancy, revenueCollections, branchSummaries } = mockTenantReportsData;

  const handleExport = () => {
    if (activeTab === 'occupancy') {
      exportToCSV(monthlyOccupancy, 'occupancy_report.csv');
    } else if (activeTab === 'revenue') {
      exportToCSV(revenueCollections, 'revenue_collections_report.csv');
    } else {
      exportToCSV(branchSummaries, 'branch_performance_summary.csv');
    }
  };

  const occupancyColumns = [
    { header: 'Billing Month', render: (row) => <span className="font-semibold text-slate-900">{row.month}</span> },
    { header: 'Total Bed Capacity', render: (row) => <span className="text-slate-600">{row.totalBeds} Beds</span> },
    { header: 'Occupied Beds', render: (row) => <span className="font-medium text-slate-800">{row.occupied} Beds</span> },
    { header: 'Occupancy Rate', render: (row) => <span className="font-bold text-emerald-700">{row.rate}</span> },
  ];

  const revenueColumns = [
    { header: 'Month', render: (row) => <span className="font-semibold text-slate-900">{row.month}</span> },
    { header: 'Target Revenue', render: (row) => <span className="text-slate-600">{formatCurrency(row.target)}</span> },
    { header: 'Actual Collections', render: (row) => <span className="font-bold text-emerald-700">{formatCurrency(row.collected)}</span> },
    { header: 'Outstanding Arrears', render: (row) => <span className="font-semibold text-red-600">{formatCurrency(row.outstanding)}</span> },
  ];

  const branchColumns = [
    { header: 'Branch Name', render: (row) => <span className="font-semibold text-slate-900">{row.branchName}</span> },
    { header: 'Total Rooms', render: (row) => <span className="text-slate-600">{row.totalRooms}</span> },
    { header: 'Beds (Occupied / Total)', render: (row) => <span className="text-slate-700 font-medium">{row.occupied} / {row.totalBeds}</span> },
    { header: 'Occupancy Rate', render: (row) => <span className="font-bold text-emerald-700">{row.occupancyRate}</span> },
    { header: 'Monthly Revenue', render: (row) => <span className="font-bold text-slate-900">{formatCurrency(row.monthlyRevenue)}</span> },
    { header: 'Unpaid Dues', render: (row) => <span className="font-semibold text-red-600">{formatCurrency(row.pendingDues)}</span> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hostel Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Historical occupancy metrics, monthly fee collections, arrears tracking, and branch comparisons
          </p>
        </div>
        <Button icon={Download} onClick={handleExport} variant="secondary">
          Export Report CSV
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('occupancy')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'occupancy'
              ? 'border-b-2 border-emerald-600 text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Occupancy Trends
        </button>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'revenue'
              ? 'border-b-2 border-emerald-600 text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Revenue & Collections
        </button>
        <button
          onClick={() => setActiveTab('branches')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'branches'
              ? 'border-b-2 border-emerald-600 text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Branch Performance Summary
        </button>
      </div>

      {/* Chart Visualization */}
      {activeTab === 'revenue' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Target vs Collected Revenue ($)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueCollections} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  formatter={(val) => [formatCurrency(val), '']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend />
                <Bar dataKey="target" name="Target Billing" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="collected" name="Collected Amount" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Report Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        {activeTab === 'occupancy' && <DataTable columns={occupancyColumns} data={monthlyOccupancy} />}
        {activeTab === 'revenue' && <DataTable columns={revenueColumns} data={revenueCollections} />}
        {activeTab === 'branches' && <DataTable columns={branchColumns} data={branchSummaries} />}
      </div>
    </div>
  );
};
