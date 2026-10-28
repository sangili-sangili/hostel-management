import React, { useState } from 'react';
import { Menu, Search, Bell, LogOut } from 'lucide-react';
import { BranchSelector } from './BranchSelector';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const TenantHeader = ({ onOpenMobileSidebar }) => {
  const { tenantUser, tenantLogout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await tenantLogout();
    navigate('/tenant/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between">
      {/* Left section: mobile hamburger & branch switcher */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden text-slate-500 hover:text-slate-800 p-1"
        >
          <Menu className="w-5 h-5" />
        </button>
        <BranchSelector />
      </div>

      {/* Right section: Search, Notifications, User profile */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search residents, rooms..."
            className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white w-48 transition-all"
          />
        </div>

        <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
        </button>

        {/* Tenant User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-semibold text-xs border border-emerald-200">
              {tenantUser?.name?.[0] || 'D'}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-800 leading-tight">
                {tenantUser?.name || 'David Miller'}
              </div>
              <div className="text-[10px] text-emerald-600 font-medium leading-tight">
                {tenantUser?.role || 'Tenant Administrator'}
              </div>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-800">{tenantUser?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{tenantUser?.email}</p>
                <div className="mt-1 inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-medium bg-emerald-50 text-emerald-700">
                  Plan: {tenantUser?.plan || 'Growth'}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out from Tenant
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
