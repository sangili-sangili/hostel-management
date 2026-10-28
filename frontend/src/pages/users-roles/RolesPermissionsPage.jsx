import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockRoles } from '../../mock-data/usersData';

export const RolesPermissionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/users" className="p-1 text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Roles & Permissions (RBAC)</h1>
          <p className="text-sm text-slate-500 mt-0.5">Configure module and action permissions per system role</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Roles matrix ({mockRoles.length} predefined roles)</p>
      </div>
    </div>
  );
};
