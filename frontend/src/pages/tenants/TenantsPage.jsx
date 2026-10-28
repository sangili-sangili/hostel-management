import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Plus } from 'lucide-react';
import { mockTenants } from '../../mock-data/tenantsData';

export const TenantsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tenants</h1>
          <p className="text-sm text-slate-500 mt-1">Manage all subscribed hostel businesses and chains</p>
        </div>
        <Link to="/tenants/create">
          <Button icon={Plus} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2">
            Add New Tenant
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Tenant list table placeholder ({mockTenants.length} tenants loaded)</p>
      </div>
    </div>
  );
};
