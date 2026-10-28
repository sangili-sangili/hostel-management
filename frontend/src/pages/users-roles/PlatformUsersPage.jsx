import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { UserPlus, Shield } from 'lucide-react';
import { mockUsers } from '../../mock-data/usersData';

export const PlatformUsersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Users</h1>
          <p className="text-sm text-slate-500 mt-1">Manage staff users, team members, and role assignments</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/users/roles"
            className="inline-flex items-center px-3 py-2 text-sm font-medium border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Shield className="w-4 h-4 mr-2 text-slate-500" />
            Roles & Permissions
          </Link>
          <Button icon={UserPlus} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2">
            Invite User
          </Button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Platform users list ({mockUsers.length} staff users)</p>
      </div>
    </div>
  );
};
