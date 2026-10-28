import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Clock,
  Receipt,
  ShieldCheck,
  MapPin,
  Bell,
  LifeBuoy,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from 'lucide-react';
import { NAVIGATION_GROUPS } from '../../constants/navigation';

const iconMap = {
  LayoutDashboard,
  Building2,
  CreditCard,
  Clock,
  Receipt,
  ShieldCheck,
  MapPin,
  Bell,
  LifeBuoy,
  BarChart3,
  FileText,
  Settings,
};

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800 ${
        isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
      } ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
    >
      {/* Brand Logo & Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shrink-0 shadow-xs">
            H
          </div>
          {!isCollapsed && (
            <div className="leading-tight truncate">
              <span className="font-semibold text-white tracking-tight">HostelFlow</span>
              <span className="block text-[10px] text-blue-400 font-medium uppercase tracking-wider">Super Admin</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAVIGATION_GROUPS.map((group) => (
          <div key={group.group}>
            {!isCollapsed && (
              <h4 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {group.group}
              </h4>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        } ${isCollapsed ? 'justify-center' : ''}`
                      }
                      title={isCollapsed ? item.name : undefined}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Portal Switcher Link to Tenant Portal */}
        <div className="pt-4 border-t border-slate-800">
          <NavLink
            to="/tenant/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Switch to Hostel Portal</span>}
          </NavLink>
        </div>
      </div>

      {/* Footer Collapse Toggle */}
      <div className="hidden md:flex p-3 border-t border-slate-800 justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
};
