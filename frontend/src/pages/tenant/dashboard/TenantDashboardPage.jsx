import React from 'react';
import { Card } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Link } from 'react-router-dom';
import {
  BedDouble,
  Users,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  UserPlus,
  KeyRound,
  Receipt,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { mockTenantDashboardData } from '../../../mock-data/tenant/tenantDashboardData';
import { formatCurrency } from '../../../utils/formatters';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const TenantDashboardPage = () => {
  const { kpis, branchOccupancy, occupancyTrends, bedDistribution, recentActivities, todayArrivals } =
    mockTenantDashboardData;

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hostel Operations Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time branch occupancy, daily arrivals, fee collections, and room statuses
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/tenant/residents">
            <Button icon={UserPlus} variant="secondary" size="sm">
              New Resident
            </Button>
          </Link>
          <Link to="/tenant/allocations">
            <Button icon={KeyRound} variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Allocate Bed
            </Button>
          </Link>
          <Link to="/tenant/fees">
            <Button icon={Receipt} variant="secondary" size="sm">
              Record Fee
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Capacity</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BedDouble className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{kpis.totalBeds} Beds</span>
            <span className="text-xs text-slate-500 font-medium">({kpis.totalRooms} Rooms)</span>
          </div>
          <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{kpis.availableBeds} beds available right now</span>
          </div>
        </Card>

        <Card className="hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Occupancy Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{kpis.occupancyRate}%</span>
            <span className="text-xs text-slate-500 font-medium">({kpis.occupiedBeds} Occupied)</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all"
              style={{ width: `${kpis.occupancyRate}%` }}
            />
          </div>
        </Card>

        <Card className="hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Movement</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Check-ins</span>
              <span className="text-xl font-bold text-emerald-600">+{kpis.todayCheckIns}</span>
            </div>
            <div className="h-8 border-r border-slate-200" />
            <div>
              <span className="text-xs text-slate-400 block font-medium">Check-outs</span>
              <span className="text-xl font-bold text-slate-700">-{kpis.todayCheckOuts}</span>
            </div>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">2 pending arrival clearances</div>
        </Card>

        <Card className="hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Month Collections</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{formatCurrency(kpis.monthCollections)}</span>
          </div>
          <div className="mt-2 text-xs text-amber-600 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatCurrency(kpis.outstandingDues)} outstanding dues</span>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Occupancy & Revenue Trend</h3>
              <p className="text-xs text-slate-500 mt-0.5">Last 5 months operational performance</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Occupancy %
              </span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={occupancyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[50, 100]} />
                <Tooltip
                  formatter={(val) => [`${val}%`, 'Occupancy Rate']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="occupancy" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorOcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bed Status Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Bed Status Distribution</h3>
            <p className="text-xs text-slate-500 mt-0.5">Inventory across all active branches</p>
          </div>
          <div className="h-44 w-full my-auto flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bedDistribution} innerRadius={48} outerRadius={68} paddingAngle={4} dataKey="value">
                  {bedDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
            {bedDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}:</span>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branch Summary & Daily Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Occupancy Comparison Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Branch-Wise Occupancy</h3>
              <p className="text-xs text-slate-500 mt-0.5">Capacity breakdown per operational branch</p>
            </div>
            <Link to="/tenant/branches" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              Manage Branches <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2.5">Branch Name</th>
                  <th className="px-3 py-2.5 text-center">Total Beds</th>
                  <th className="px-3 py-2.5 text-center">Occupied</th>
                  <th className="px-3 py-2.5">Occupancy Bar</th>
                  <th className="px-3 py-2.5 text-right">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {branchOccupancy.map((br) => (
                  <tr key={br.branchId} className="hover:bg-slate-50/75 transition-colors">
                    <td className="px-3 py-3 font-medium text-slate-900">{br.branchName}</td>
                    <td className="px-3 py-3 text-center text-slate-600">{br.totalBeds}</td>
                    <td className="px-3 py-3 text-center text-slate-600 font-medium">{br.occupiedBeds}</td>
                    <td className="px-3 py-3">
                      <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${br.rate}%` }} />
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-emerald-700">{br.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Movement & Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Today's Check-ins</h3>
            <p className="text-xs text-slate-500 mt-0.5">Arrival clearances scheduled today</p>

            <div className="mt-4 space-y-3">
              {todayArrivals.map((arrival) => (
                <div key={arrival.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{arrival.residentName}</p>
                    <p className="text-[11px] text-slate-500">{arrival.room} • {arrival.time}</p>
                  </div>
                  <Badge variant={arrival.status === 'Checked In' ? 'success' : 'warning'}>
                    {arrival.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3">Recent Operational Alerts</h4>
              <div className="space-y-2.5">
                {recentActivities.slice(0, 3).map((act) => (
                  <div key={act.id} className="text-xs">
                    <p className="text-slate-800 font-medium leading-snug">{act.text}</p>
                    <span className="text-[10px] text-slate-400">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
