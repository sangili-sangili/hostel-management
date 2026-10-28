import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { TenantLayout } from '../layouts/TenantLayout';
import { ROUTES, TENANT_ROUTES } from '../constants/routes';

// Super Admin Auth pages
import { LoginPage, ForgotPasswordPage } from '../pages/auth';

// Super Admin Feature pages
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

// Tenant Operations pages
import {
  TenantLoginPage,
  TenantDashboardPage,
  BranchesPage,
  RoomsPage,
  ResidentsPage,
  ResidentDetailPage,
  AllocationsPage,
  FeesPage,
  PaymentsPage,
  StaffPage,
  TenantNotificationsPage,
  TenantReportsPage,
  TenantSettingsPage,
  TenantSubscriptionPage,
} from '../pages/tenant';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Super Admin Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      {/* Tenant Public Auth Route */}
      <Route path={TENANT_ROUTES.LOGIN} element={<TenantLoginPage />} />

      {/* Protected Super Admin Console Routes */}
      <Route
        element={
          <ProtectedRoute portalType="super_admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.TENANTS} element={<TenantsPage />} />
        <Route path={ROUTES.TENANT_CREATE} element={<CreateTenantWizardPage />} />
        <Route path={ROUTES.TENANT_DETAIL} element={<TenantDetailPage />} />
        <Route path={ROUTES.SUBSCRIPTION_PLANS} element={<SubscriptionPlansPage />} />
        <Route path={ROUTES.TRIALS} element={<TrialManagementPage />} />
        <Route path={ROUTES.BILLING} element={<BillingPage />} />
        <Route path={ROUTES.INVOICES} element={<InvoicesPage />} />
        <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
        <Route path={ROUTES.USERS} element={<PlatformUsersPage />} />
        <Route path={ROUTES.ROLES} element={<RolesPermissionsPage />} />
        <Route path={ROUTES.LOCATIONS} element={<LocationMasterPage />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
        <Route path={ROUTES.SUPPORT} element={<SupportTicketsPage />} />
        <Route path={ROUTES.TICKET_DETAIL} element={<TicketDetailPage />} />
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
        <Route path={ROUTES.AUDIT_LOGS} element={<AuditLogsPage />} />
        <Route path={ROUTES.SETTINGS} element={<PlatformSettingsPage />} />
      </Route>

      {/* Protected Tenant Operations Routes */}
      <Route
        element={
          <ProtectedRoute portalType="tenant">
            <TenantLayout />
          </ProtectedRoute>
        }
      >
        <Route path={TENANT_ROUTES.DASHBOARD} element={<TenantDashboardPage />} />
        <Route path={TENANT_ROUTES.BRANCHES} element={<BranchesPage />} />
        <Route path={TENANT_ROUTES.ROOMS} element={<RoomsPage />} />
        <Route path={TENANT_ROUTES.RESIDENTS} element={<ResidentsPage />} />
        <Route path={TENANT_ROUTES.RESIDENT_DETAIL} element={<ResidentDetailPage />} />
        <Route path={TENANT_ROUTES.ALLOCATIONS} element={<AllocationsPage />} />
        <Route path={TENANT_ROUTES.FEES} element={<FeesPage />} />
        <Route path={TENANT_ROUTES.PAYMENTS} element={<PaymentsPage />} />
        <Route path={TENANT_ROUTES.STAFF} element={<StaffPage />} />
        <Route path={TENANT_ROUTES.NOTIFICATIONS} element={<TenantNotificationsPage />} />
        <Route path={TENANT_ROUTES.REPORTS} element={<TenantReportsPage />} />
        <Route path={TENANT_ROUTES.SETTINGS} element={<TenantSettingsPage />} />
        <Route path={TENANT_ROUTES.SUBSCRIPTION} element={<TenantSubscriptionPage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};
