import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ROUTES } from '../constants/routes';

// Auth pages
import { LoginPage, ForgotPasswordPage } from '../pages/auth';

// Feature pages
import { DashboardPage } from '../pages/dashboard';
import { TenantsPage, TenantDetailPage, CreateTenantWizardPage } from '../pages/tenants';
import { SubscriptionPlansPage } from '../pages/subscription-plans';
import { TrialManagementPage } from '../pages/trials';
import { BillingPage, InvoicesPage, TransactionsPage } from '../pages/billing';
import { PlatformUsersPage, RolesPermissionsPage } from '../pages/users-roles';
import { LocationMasterPage } from '../pages/locations';
import { NotificationsPage } from '../pages/notifications';
import { SupportTicketsPage, TicketDetailPage } from '../pages/support';
import { ReportsPage } from '../pages/reports';
import { AuditLogsPage } from '../pages/audit-logs';
import { PlatformSettingsPage } from '../pages/settings';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        
        {/* Tenants */}
        <Route path={ROUTES.TENANTS} element={<TenantsPage />} />
        <Route path={ROUTES.TENANT_CREATE} element={<CreateTenantWizardPage />} />
        <Route path={ROUTES.TENANT_DETAIL} element={<TenantDetailPage />} />

        {/* Subscription Plans */}
        <Route path={ROUTES.SUBSCRIPTION_PLANS} element={<SubscriptionPlansPage />} />

        {/* Trial Management */}
        <Route path={ROUTES.TRIALS} element={<TrialManagementPage />} />

        {/* Billing & Subscriptions */}
        <Route path={ROUTES.BILLING} element={<BillingPage />} />
        <Route path={ROUTES.INVOICES} element={<InvoicesPage />} />
        <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage />} />

        {/* Users & RBAC */}
        <Route path={ROUTES.USERS} element={<PlatformUsersPage />} />
        <Route path={ROUTES.ROLES} element={<RolesPermissionsPage />} />

        {/* Location Master */}
        <Route path={ROUTES.LOCATIONS} element={<LocationMasterPage />} />

        {/* Notifications */}
        <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />

        {/* Support Tickets */}
        <Route path={ROUTES.SUPPORT} element={<SupportTicketsPage />} />
        <Route path={ROUTES.TICKET_DETAIL} element={<TicketDetailPage />} />

        {/* Reports & Analytics */}
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />

        {/* Audit Logs */}
        <Route path={ROUTES.AUDIT_LOGS} element={<AuditLogsPage />} />

        {/* Platform Settings */}
        <Route path={ROUTES.SETTINGS} element={<PlatformSettingsPage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};
