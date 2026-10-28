import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { UserDropdown } from './UserDropdown';

export const Header = ({ onOpenMobileSidebar }) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between">
      {/* Left section: mobile menu toggle & breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden text-slate-500 hover:text-slate-800 p-1"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Breadcrumbs />
      </div>

      {/* Right section: Global Search, Notifications, User menu */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search platform..."
            className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white w-48 transition-all"
          />
        </div>

        <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
        </button>

        <UserDropdown />
      </div>
    </header>
  );
};
