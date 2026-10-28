import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-xs border border-blue-200">
          {user?.name?.[0] || 'A'}
        </div>
        <div className="hidden lg:block text-left">
          <div className="text-xs font-semibold text-slate-800 leading-tight">{user?.name || 'Admin'}</div>
          <div className="text-[10px] text-slate-500 leading-tight">{user?.role || 'Super Admin'}</div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-800">{user?.name}</p>
            <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
