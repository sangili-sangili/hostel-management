import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { TenantSidebar } from '../components/tenant/TenantSidebar';
import { TenantHeader } from '../components/tenant/TenantHeader';
import { useAuth } from '../hooks/useAuth';
import { AlertCircle, Clock } from 'lucide-react';

export const TenantLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { tenantUser } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Tenant Sidebar */}
      <TenantSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <TenantHeader onOpenMobileSidebar={() => setIsMobileOpen(true)} />

        {/* Optional Operational Trial / Limits notice banner */}
        {tenantUser?.isTrial && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>You are on a 10-day trial of <strong>Growth Plan</strong> (4 days remaining).</span>
            </div>
            <Link to="/tenant/subscription" className="font-semibold underline hover:text-amber-900">
              Upgrade Subscription
            </Link>
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
