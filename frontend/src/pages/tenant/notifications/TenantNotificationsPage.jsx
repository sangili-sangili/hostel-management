import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Bell, AlertTriangle, CalendarCheck, DollarSign, Wrench, Check } from 'lucide-react';

const mockTenantNotifs = [
  {
    id: 'tnotif_1',
    title: 'Arrears Overdue Alert',
    message: 'Lucas Kim (Room 102) has an outstanding fee of $420 overdue by 18 days.',
    category: 'Billing',
    time: '2 hours ago',
    read: false,
    priority: 'high',
  },
  {
    id: 'tnotif_2',
    title: 'Upcoming Resident Check-in',
    message: 'Emma Watson scheduled to check in to Northside Campus Residency (Room N-108) at 02:30 PM.',
    category: 'Arrivals',
    time: '4 hours ago',
    read: false,
    priority: 'normal',
  },
  {
    id: 'tnotif_3',
    title: 'Room Maintenance Ticket',
    message: 'AC electrical submeter repair reported in Room 305 by Downtown Berkeley Branch Manager.',
    category: 'Maintenance',
    time: 'Yesterday',
    read: true,
    priority: 'normal',
  },
  {
    id: 'tnotif_4',
    title: 'Rent Receipt Issued',
    message: 'Payment of $580 confirmed for Liam Chen (Receipt #REC-2026-903).',
    category: 'Billing',
    time: 'Yesterday',
    read: true,
    priority: 'low',
  },
];

export const TenantNotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockTenantNotifs);
  const [filter, setFilter] = useState('all');

  const filtered = notifications.filter((n) =>
    filter === 'all' ? true : n.category.toLowerCase() === filter.toLowerCase()
  );

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (category) => {
    switch (category) {
      case 'Billing':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'Arrivals':
        return <CalendarCheck className="w-4 h-4 text-blue-600" />;
      case 'Maintenance':
        return <Wrench className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hostel Alerts & Notifications</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Operational reminders, check-in alerts, payment confirmations, and maintenance updates
          </p>
        </div>
        <Button variant="secondary" onClick={markAllRead} icon={Check}>
          Mark All as Read
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 text-xs">
        {['All', 'Billing', 'Arrivals', 'Maintenance'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter.toLowerCase() === cat.toLowerCase()
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border transition-colors flex items-start gap-3 ${
              item.read ? 'bg-white border-slate-200' : 'bg-emerald-50/40 border-emerald-200'
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
              {getIcon(item.category)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                <span className="text-xs text-slate-400">{item.time}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{item.message}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant={item.priority === 'high' ? 'danger' : 'neutral'}>
                  {item.category}
                </Badge>
                {!item.read && (
                  <span className="text-[10px] text-emerald-700 font-semibold uppercase">New</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
