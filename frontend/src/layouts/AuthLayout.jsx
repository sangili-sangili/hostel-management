import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-blue-600 items-center justify-center text-white font-bold text-xl mb-3 shadow-lg shadow-blue-500/20">
            H
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">HostelFlow SaaS</h1>
          <p className="text-sm text-slate-400 mt-1">Super Admin Control Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
