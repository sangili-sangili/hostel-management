import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Building2, ChevronDown } from 'lucide-react';

export const BranchSelector = ({ className = '' }) => {
  const { tenantUser, activeBranchId, setActiveBranchId } = useAuth();
  const branches = tenantUser?.branches || [];

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg border border-slate-700 text-xs font-medium">
        <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <select
          value={activeBranchId}
          onChange={(e) => setActiveBranchId(e.target.value)}
          className="bg-transparent text-slate-100 text-xs focus:outline-hidden cursor-pointer pr-4 appearance-none"
        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id} className="bg-slate-900 text-slate-200">
              {branch.name}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none -ml-4" />
      </div>
    </div>
  );
};
