# Hostel Management SaaS Platform

## Full Project Requirements Document (PRD)

**Document version:** 1.0\
**Status:** Draft for planning and implementation\
**Product type:** Multi-tenant SaaS web application\
**Initial focus:** Super Admin platform management, with tenant hostel
operations planned as a separate application area

------------------------------------------------------------------------

## 1. Project Overview

The Hostel Management SaaS Platform is a subscription-based,
multi-tenant system for managing hostel businesses. The platform owner
uses a **Super Admin Console** to create and manage tenant
organizations, subscriptions, trials, billing, platform users, location
data, support, reports, audit history, and global settings.

Each tenant organization will later use a separate **Tenant Admin /
Hostel Operations Portal** to manage its own hostel business, such as
branches, rooms, residents, staff, fees, payments, and daily operations.
Tenant operational features are included here as planned scope, but the
first frontend milestone focuses on the Super Admin Console.

The system must keep each tenant's data isolated. Super Admin
permissions and tenant-side permissions must be modeled separately.

## 2. Product Goals

-   Provide one central console to manage the entire SaaS platform.
-   Support tenant onboarding, trial configuration, subscriptions,
    renewals, and account lifecycle management.
-   Make subscription status and payment issues visible and actionable.
-   Provide configurable roles and permissions for platform users.
-   Support country-specific location hierarchies.
-   Provide reliable reporting, audit history, notifications, and
    support workflows.
-   Deliver a responsive, accessible, maintainable interface.
-   Keep the frontend ready for backend API integration without coupling
    UI components to mock data.

## 3. Scope and Phases

### Phase 1 --- Super Admin Frontend

-   Authentication screens and route protection UI
-   Super Admin dashboard
-   Tenant management
-   Subscription plans
-   Trial management
-   Subscription and billing screens
-   Platform users and RBAC
-   Location master
-   Notifications
-   Support tickets
-   Reports and analytics
-   Audit logs
-   Platform settings
-   Responsive layouts and reusable UI components
-   Mock data/service layer, clearly separated from real API services

### Phase 2 --- Backend and Database

-   Authentication and authorization
-   Tenant-aware API design
-   PostgreSQL schema and migrations
-   Tenant isolation and access enforcement
-   Subscription and trial lifecycle services
-   Background jobs for reminders, expiry, renewals, and other scheduled
    tasks
-   Audit logging
-   File storage integration where required
-   API documentation and automated tests

### Phase 3 --- Tenant Operations Portal

Planned tenant-side modules include: - Tenant dashboard - Branch
management - Room and bed management - Resident/hosteller records -
Staff and tenant-side roles - Fees, invoices, collections, and dues -
Check-in/check-out and occupancy - Food/mess or other hostel services,
if required - Tenant-level reports and notifications - Tenant profile
and operational settings

### Phase 4 --- Production Readiness

-   Payment gateway integration
-   Email/SMS provider integration
-   Monitoring, logging, backups, and alerting
-   Security review and penetration testing
-   Performance testing
-   Deployment pipeline and release process
-   Data retention, recovery, and operational runbooks

## 4. User Types and Roles

### 4.1 Platform-level roles

Initial role templates:

1.  **Platform Administrator**
    -   Broad platform administration access.
    -   Can manage tenants, plans, trials, platform users, settings, and
        operational workflows according to explicit permissions.
2.  **Billing Administrator**
    -   Can view and manage plans, subscriptions, invoices, payments,
        renewals, and permitted refunds.
    -   Cannot change unrelated security or platform settings unless
        separately granted.
3.  **Support Agent**
    -   Can view assigned tenants and support tickets.
    -   Can respond to tickets and update support status.
    -   Access to sensitive billing or tenant data must be limited to
        what is necessary.
4.  **Read-Only Auditor**
    -   Can view permitted platform records, reports, and audit logs.
    -   Cannot create, edit, delete, approve, or execute transactions.

Roles must be configurable. A user may receive a role template and,
where supported, explicit permissions.

### 4.2 Tenant-level roles

Tenant-side roles are separate from platform roles. Examples may include
Tenant Owner, Branch Manager, Accountant, Receptionist, and Staff. Their
detailed permissions will be defined during the Tenant Operations phase.

**Security rule:** Hiding a button or route in the frontend is not
sufficient authorization. The backend must validate every protected
action.

## 5. Functional Requirements --- Super Admin

### 5.1 Authentication and Access

-   Provide a login screen with email/username and password fields.
-   Include field validation, password visibility toggle, and
    user-friendly error messages.
-   Provide a forgot-password flow UI.
-   Support logout.
-   Protect authenticated routes.
-   Handle expired sessions and unauthorized API responses.
-   Load current user profile and permissions from the backend when
    connected.
-   Do not treat hardcoded frontend credentials as production
    authentication.
-   Do not store secrets or privileged credentials in frontend code.

### 5.2 Super Admin Dashboard

Display summary metrics such as: - Total tenants - Active tenants -
Suspended tenants - Tenants on trial - Active subscriptions - Trials
expiring soon - Subscriptions expiring soon - Monthly recurring revenue
(MRR) - Annual recurring revenue (ARR) - Failed or overdue payments

Dashboard visualizations: - Revenue over time - Tenant growth over
time - Subscription plan distribution - Trial-to-paid conversion -
Payment status distribution

Dashboard lists: - Recent platform activity - Recently created tenants -
Upcoming trial expirations - Upcoming renewals - Recent payments and
failures - Open/high-priority support tickets

Provide quick actions for creating a tenant, creating a plan, viewing
expiring trials, and reviewing failed payments.

Metrics must be calculated from service/API data. In the frontend
prototype, use a centralized mock-data module rather than embedding
sample values inside individual components. Revenue calculations and
definitions must be documented and consistent.

### 5.3 Tenant Management

The Super Admin must be able to: - View tenants in a paginated table. -
Search by tenant name, tenant code, contact, email, or other permitted
fields. - Filter by status, plan, trial/subscription state, and creation
date. - Sort supported columns. - Create a tenant using a multi-step
form. - View tenant details. - Edit permitted tenant information. -
Activate, deactivate, suspend, and reactivate a tenant. - View tenant
subscription and billing status. - Review tenant activity and lifecycle
history. - Navigate between tenant detail tabs.

Suggested tenant fields: - Tenant ID (system-generated) - Tenant
code/slug (unique) - Organization/hostel business name - Primary contact
name - Contact email - Contact phone - Country and address details -
Selected subscription plan - Trial start/end dates, if applicable -
Subscription status - Tenant account status - Created date - Created
by - Notes or internal metadata where appropriate

Suggested tenant detail tabs: - Overview - Profile - Subscription -
Billing and invoices - Activity/audit history - Configuration

Tenant lifecycle status and subscription status must be separate fields.
For example, an organization may be active as a record but have an
expired subscription.

Suspension/deactivation actions must show a confirmation dialog and
explain the effect on tenant access. Important changes must be audited.

### 5.4 Tenant Onboarding

The create-tenant wizard should: 1. Collect organization and contact
information. 2. Collect location and address details. 3. Select a plan
or trial. 4. Configure trial duration where permitted. 5. Review the
entered data. 6. Submit and show the resulting status.

Validation: - Required fields must be identified. - Email and phone
formats must be validated appropriately. - Tenant code/slug must be
unique. - Start/end dates must be valid. - Selected plan must be active
and available. - Duplicate submissions must be prevented while a request
is in progress.

If tenant creation succeeds, show the tenant summary and next actions.
Do not show success until the service confirms success.

### 5.5 Subscription Plan Management

The Super Admin must be able to create, view, edit, activate, and
deactivate subscription plans.

Plan fields: - Plan name and unique plan code - Description - Price -
Currency - Billing interval - Feature list - Tenant/user limits, if
applicable - Branch limits, if applicable - Trial eligibility - Plan
status - Created/updated timestamps

Supported billing cycles: - Monthly - Six months - Yearly - Lifetime

Requirements: - Display prices consistently with currency. - Prevent
invalid or negative prices. - Clarify whether taxes are included or
calculated separately. - Preserve historical subscription price/plan
details for existing subscriptions when plan configuration changes. - Do
not allow deletion of a plan that is referenced by existing records
without a defined migration or archival policy. - Clearly indicate
inactive plans and whether they can be selected for new subscriptions.

### 5.6 Trial Management

Default trial duration: **10 days**, configurable by authorized platform
users.

Requirements: - Set a platform default trial duration. - Allow custom
trial duration for an individual tenant when authorized. - Allow trial
start/end dates according to business rules. - Display remaining days
and expiry date. - Filter active, expiring, expired, extended, and
converted trials. - Configure reminder schedules. - Configure a grace
period after expiry, if enabled. - Extend a trial with a required
reason. - Record who extended the trial, when, the previous end date,
the new end date, and the reason. - Convert an eligible trial to a paid
subscription. - Show trial conversion history. - Prevent invalid date
ranges and unauthorized extensions.

Trial expiry behavior: - On expiry, the backend should automatically
restrict tenant operational access according to the configured policy. -
The system should preserve tenant data. - Notify relevant tenant
contacts and platform users according to notification settings. - Permit
renewal or subscription activation through the defined flow. - If
read-only access is supported, specify exactly which data and actions
remain accessible. - A grace period, if configured, must have an
explicit start/end and policy.

The frontend may simulate these states for demonstration, but actual
expiry and access restriction must be implemented by the backend and
scheduled jobs. Frontend timers alone must never enforce subscription
access.

### 5.7 Subscription Lifecycle

Subscription states should be explicitly defined. Suggested states: -
Trialing - Active - Past due - Grace period - Expired - Suspended -
Cancelled - Lifetime active

Requirements: - Show plan, billing cycle, amount, currency, start date,
next renewal date, and status. - Show subscription history. - Support
renewals and plan changes through authorized workflows. - Define how
upgrades, downgrades, prorations, and plan changes affect billing before
implementation. - Preserve historical records for reporting and audit. -
Handle failed payments and retries through backend/provider events. -
Clearly separate tenant account status from subscription status.

### 5.8 Billing, Invoices, Payments, and Refunds

The Super Admin must be able to: - View invoices and invoice details. -
Search and filter invoices. - View payment transactions and statuses. -
View failed payments and related subscription/tenant records. - Review
renewal history. - Initiate an authorized refund workflow when
supported. - Download or print invoices. - Export permitted billing
records.

Suggested invoice fields: - Invoice number - Tenant - Subscription -
Issue date - Due date - Currency - Subtotal - Tax - Discount - Total -
Amount paid - Balance due - Invoice status

Suggested payment fields: - Transaction ID - Tenant -
Invoice/subscription reference - Amount and currency - Payment
method/provider - Provider reference - Status - Created/processed
timestamps - Failure reason where available

Payment/refund rules: - Real payment status must be verified through
trusted backend/provider events. - Do not trust a client-side success
redirect as proof of payment. - Refunds require authorization,
confirmation, and audit logging. - Use idempotency controls in backend
payment workflows. - Do not expose payment secrets or sensitive payment
data in the frontend. - Mock payments must be clearly marked as
simulated.

### 5.9 Platform Users and RBAC

Requirements: - List, search, filter, and paginate platform users. -
Invite/create users. - Edit permitted profile information. - Assign and
change roles. - Activate/deactivate users. - View user activity where
authorized. - Manage role permissions by module and action.

Example permission actions: - View - Create - Edit - Delete - Approve -
Export - Manage settings

Requirements: - Use least-privilege defaults. - Prevent accidental
lockout of the last active platform administrator. - Require
confirmation for role changes and deactivation. - Audit role and
permission changes. - Ensure backend authorization is authoritative. -
Do not conflate platform users with tenant users.

### 5.10 Location Master

Provide configurable geographic data management: - Country -
State/province/region - District/county/administrative area -
City/locality

Requirements: - Support parent-child relationships. - Search, filter,
sort, and paginate records. - Activate/deactivate records. - Prevent
duplicate records according to defined uniqueness rules. - Validate
parent selection. - Do not assume every country has the same
hierarchy. - Define whether locations can be archived when referenced by
tenants. - Use a consistent internal ID and display label for each
record.

### 5.11 Notifications

Notification categories: - Trial expiry and extension - Subscription
renewal - Payment failure - Tenant activation/suspension - Support
ticket updates - Platform/system alerts

Requirements: - Display read/unread states. - Filter by category and
status. - Mark notifications as read. - Provide notification preferences
where applicable. - Support pagination or incremental loading for long
histories. - When connected to the backend, show only notifications the
current user is authorized to see.

Email, SMS, and other delivery channels require backend/provider
integration. The frontend must not claim that an external notification
was sent unless the service confirms it.

### 5.12 Support Tickets

Requirements: - List and search support tickets. - Filter by status,
priority, category, assigned agent, and tenant. - View ticket
conversation and history. - Assign/reassign tickets. - Add replies and
internal notes. - Update priority and status. - Track creation and
resolution times. - Display ticket details and related tenant
information according to permissions.

Suggested statuses: - Open - In progress - Waiting for tenant -
Resolved - Closed

Suggested priorities: - Low - Normal - High - Urgent

Clearly distinguish internal notes from messages visible to the tenant.
Mock replies must not be presented as actual email or external
communication.

### 5.13 Reports and Analytics

Initial reports: - Tenant growth - Tenant status - Subscription
distribution - Trial conversion - Revenue - Renewals - Failed payments -
Outstanding invoices - Support ticket volume and resolution

Requirements: - Date range filters. - Relevant grouping and summary
metrics. - Charts and detailed tables. - Pagination for large result
sets. - CSV export where authorized. - Exported data must match current
filters and sort rules. - Display loading, empty, and error states. -
Define metric calculations and timezone handling consistently. - Avoid
presenting mock metrics as live business data.

### 5.14 Audit Logs

Record important events, including: - Login/logout and security events
where appropriate - Tenant creation and updates - Tenant
activation/suspension - Trial extension and conversion - Plan changes -
Subscription changes - Billing/refund actions - Role and permission
changes - Platform setting changes

Suggested audit fields: - Event ID - Timestamp - Actor - Action - Target
entity/type and ID - Summary/details - Result/status -
Request/correlation ID where available - Source metadata where
appropriate and privacy-compliant

Requirements: - Search and filter by date, actor, action, target, and
result. - Paginate large datasets. - Export only when authorized. -
Audit records should be read-only in the interface. - Backend audit
storage and access controls must prevent unauthorized alteration. -
Avoid logging passwords, secrets, full payment credentials, or
unnecessary sensitive personal data.

### 5.15 Platform Settings

Settings categories: - Platform name, logo, and branding - Default trial
duration - Trial reminders and grace period - Default currency and
timezone - Invoice numbering and invoice details - Email template
configuration - Security preferences - File upload limits - Payment
gateway configuration status - Maintenance mode - Backup status and
retention information

Requirements: - Validate settings before saving. - Show unsaved-change
warnings where appropriate. - Confirm impactful changes. - Audit changes
to important settings. - Restrict sensitive settings to authorized
roles. - Never expose gateway secrets or credentials in the browser. -
Actual backup, maintenance, and gateway operations require backend
infrastructure.

## 6. Planned Tenant Operations Scope

This is the planned second application area and is not part of the
initial Super Admin-only frontend milestone.

### 6.1 Tenant Dashboard

-   Tenant-specific summary
-   Occupancy and vacancies
-   Residents and upcoming check-ins/check-outs
-   Fee collection and outstanding dues
-   Recent tenant activity

### 6.2 Branches

-   Create and manage branches/hostels
-   Assign branch managers
-   Maintain branch contact and address information
-   Enforce subscription branch limits

### 6.3 Rooms and Beds

-   Room and bed inventory
-   Capacity and availability
-   Occupancy status
-   Allocation and release history
-   Prevent overlapping allocations

### 6.4 Residents/Hostellers

-   Resident profiles and contact details
-   Emergency contacts
-   Check-in/check-out records
-   Room/bed assignment
-   Relevant document handling with access controls

### 6.5 Fees and Collections

-   Fee plans and charges
-   Invoices and receipts
-   Payments and outstanding balances
-   Due reminders
-   Reports and reconciliation

### 6.6 Tenant Users and Permissions

-   Tenant-side user management
-   Branch-scoped access
-   Tenant roles distinct from platform roles
-   Server-side authorization for all tenant records

Other tenant modules, such as mess/food management, visitor management,
inventory, complaints, attendance, or mobile applications, must be
confirmed before being included in the committed scope.

## 7. Non-Functional Requirements

### 7.1 Security

-   Enforce authentication and authorization on the backend.
-   Apply tenant isolation to every tenant-owned resource.
-   Validate and normalize all input on the server.
-   Use secure password hashing and secure session/token handling.
-   Protect against common web vulnerabilities, including XSS, CSRF
    where applicable, injection, and broken access control.
-   Apply rate limits to sensitive endpoints.
-   Protect secrets using server-side environment/configuration
    management.
-   Use HTTPS in deployed environments.
-   Restrict file types and sizes; scan uploads where appropriate.
-   Keep dependencies updated and review security advisories.
-   Minimize sensitive data in logs and analytics.

### 7.2 Tenant Data Isolation

-   Every tenant-owned database record must be associated with a tenant
    identifier.
-   Tenant context must be derived from trusted authenticated identity
    and server-side authorization, not blindly accepted from client
    input.
-   All reads, updates, deletes, exports, background jobs, and file
    accesses must enforce tenant scope.
-   Add automated tests that attempt cross-tenant access.
-   Define platform support access and audit it.
-   Backups and exports must preserve tenant boundaries and access
    rules.

### 7.3 Performance

-   Use server-side pagination, filtering, and sorting for large
    datasets.
-   Add appropriate database indexes based on query patterns.
-   Avoid repeated API calls and unnecessary React re-renders.
-   Lazy-load suitable route chunks.
-   Optimize images and other static assets.
-   Define performance targets after expected user counts and data
    volumes are agreed.
-   Measure before adding caching or state-management complexity.

### 7.4 Accessibility and Usability

-   Support keyboard navigation.
-   Use semantic HTML and accessible labels.
-   Provide visible focus indicators.
-   Maintain readable contrast.
-   Use clear validation and error messages.
-   Do not rely on color alone to communicate status.
-   Support responsive desktop, tablet, and mobile layouts.

### 7.5 Reliability and Observability

-   Centralize application logging.
-   Track API errors and background job failures.
-   Monitor uptime and critical integrations.
-   Define backup frequency and recovery objectives.
-   Provide operational alerts for payment processing, trial expiry, and
    scheduled-job failures.
-   Define incident response and recovery procedures before production
    launch.

## 8. Suggested Technology Architecture

### Frontend

-   React.js
-   Vite
-   JavaScript for the initial frontend, unless TypeScript is chosen
    before implementation
-   Tailwind CSS v4
-   React Router DOM
-   Axios
-   Lucide React
-   Recharts

### Backend (planned)

-   Node.js
-   Express.js
-   TypeScript recommended for backend maintainability
-   REST API with documented contracts

### Database (planned)

-   PostgreSQL
-   Schema migrations and version control
-   Foreign keys and constraints
-   Indexes aligned to query patterns

### Optional infrastructure

-   Redis for caching, rate limiting, or job coordination when justified
-   Background worker/queue for reminders, expiry, and email tasks
-   Object storage for uploaded files and generated documents
-   Email/SMS providers
-   Payment gateway
-   Centralized monitoring and error reporting

### Multi-tenancy recommendation

For the initial product, a shared PostgreSQL database with explicit
tenant scoping may be suitable, provided isolation is consistently
enforced and tested. Reassess database/schema-per-tenant approaches if
regulatory, scale, or customer requirements demand them.

## 9. Frontend Structure

Suggested structure:

``` text
src/
  assets/
  components/
    common/
    forms/
    tables/
    charts/
    layout/
  layouts/
  pages/
    auth/
    dashboard/
    tenants/
    subscription-plans/
    trials/
    billing/
    users-roles/
    locations/
    notifications/
    support/
    reports/
    audit-logs/
    settings/
  routes/
  services/
  hooks/
  context/
  mock-data/
  utils/
  constants/
  App.jsx
  main.jsx
  index.css
```

Guidelines: - Organize by feature where it improves discoverability. -
Keep API requests in a service layer. - Keep mock data separate from API
implementations. - Reuse table, form, modal, badge, pagination, and
feedback components. - Avoid giant page components and duplicated
business logic. - Do not add dependencies without a clear need.

## 10. API Design Principles

Exact endpoint contracts will be documented during backend
implementation. Suggested resource groups:

-   `/api/auth`
-   `/api/platform/dashboard`
-   `/api/platform/tenants`
-   `/api/platform/plans`
-   `/api/platform/trials`
-   `/api/platform/subscriptions`
-   `/api/platform/invoices`
-   `/api/platform/payments`
-   `/api/platform/users`
-   `/api/platform/roles`
-   `/api/platform/permissions`
-   `/api/platform/locations`
-   `/api/platform/notifications`
-   `/api/platform/tickets`
-   `/api/platform/reports`
-   `/api/platform/audit-logs`
-   `/api/platform/settings`

API requirements: - Consistent request/response structure. - Consistent
validation and error format. - Correct HTTP status codes. - Pagination
metadata for list endpoints. - Server-side authorization. - Tenant
scoping where applicable. - Idempotency for critical payment-related
operations. - API versioning strategy when needed. - OpenAPI/Swagger
documentation. - Correlation/request IDs for troubleshooting.

These endpoint names are suggestions, not finalized contracts.

## 11. Core Data Entities

The detailed schema must be designed during backend planning. Likely
entities include:

-   PlatformUser
-   PlatformRole
-   Permission
-   RolePermission
-   UserRole
-   Tenant
-   TenantContact
-   TenantConfiguration
-   Plan
-   PlanFeature
-   Subscription
-   TrialHistory
-   Invoice
-   InvoiceLine
-   PaymentTransaction
-   Refund
-   LocationCountry
-   LocationRegion/State
-   LocationDistrict
-   LocationCity
-   Notification
-   SupportTicket
-   SupportTicketMessage
-   AuditLog
-   PlatformSetting

Planned tenant operations may add: - TenantUser - Branch - Room - Bed -
Resident - BedAllocation - FeePlan - ResidentInvoice -
Collection/Payment - CheckInOutRecord

Use stable IDs, constraints, timestamps, appropriate foreign keys, and
indexes. Define deletion/archival and retention policies before
implementing destructive operations.

## 12. Business Rules Requiring Explicit Decisions

Before production backend implementation, confirm:

1.  Does the 10-day trial include the start date as day one, and which
    timezone determines expiry?
2.  Is there a grace period? If so, how long and what access remains
    available?
3.  What exact restrictions apply when a subscription expires?
4.  Can an expired tenant export or retrieve its data?
5.  Are lifetime subscriptions one-time purchases, and what
    features/limits do they include?
6.  Are taxes included in plan prices or calculated at checkout?
7.  Are plan upgrades/downgrades prorated?
8.  What happens to a subscription after repeated payment failures?
9.  Who may approve refunds, and are refunds partial or full?
10. Can tenants have multiple active subscriptions or branches under one
    subscription?
11. How are currency and exchange rates handled for cross-country
    tenants?
12. What data can support agents access, and how is that access audited?
13. Which tenant-side modules are required in the first release?
14. What are the expected number of tenants, platform users, and
    records?
15. Which payment gateway, email provider, hosting provider, and
    file-storage provider will be used?

Do not silently invent policy for unresolved business decisions. Use
documented defaults for prototypes and mark them as assumptions.

## 13. Testing Strategy

### Frontend

-   Route and navigation tests
-   Authentication and protected-route tests
-   Form validation tests
-   Table search/filter/sort/pagination tests
-   Role-based visibility tests
-   Loading/error/empty-state tests
-   Trial and subscription status presentation tests
-   CSV export tests
-   Responsive layout and accessibility checks

### Backend

-   Unit tests for business rules
-   API integration tests
-   Authentication and permission tests
-   Tenant isolation and cross-tenant access tests
-   Trial expiry and scheduled-job tests
-   Payment webhook verification and idempotency tests
-   Audit logging tests
-   Database constraint and migration tests
-   Load and performance tests for critical endpoints

### Acceptance checks

-   No broken routes or dead primary actions.
-   No unexplained runtime or build errors.
-   Mock data is not represented as live production data.
-   Server-side authorization is implemented for every protected action.
-   Trial expiry does not depend on a browser being open.
-   Billing status is based on trusted backend/provider data.
-   Tenant data cannot be accessed by another tenant.
-   Important state changes are auditable.

## 14. Deployment and Environment Management

Separate development, staging, and production environments.

Frontend environment example:

``` env
VITE_API_BASE_URL=http://localhost:5000/api
```

Rules: - Only public configuration belongs in frontend environment
variables. - Any variable exposed to the frontend must be considered
public. - Never put database passwords, signing keys, private API keys,
or payment secrets in frontend variables. - Keep production secrets on
the backend or in a secure secrets manager. - Configure CORS, HTTPS,
domain settings, backups, and monitoring before launch. - Use CI checks
for linting, tests, and production builds. - Define rollback and
migration procedures.

## 15. Delivery Milestones

### Milestone 1 --- Requirements and Design

-   Confirm business rules and unresolved decisions.
-   Finalize information architecture and design system.
-   Create desktop and mobile designs for Super Admin modules.

### Milestone 2 --- Frontend Foundation

-   React/Vite/Tailwind setup.
-   Routing and layout.
-   Shared components.
-   Mock data and service abstractions.

### Milestone 3 --- Super Admin Modules

-   Dashboard and tenants.
-   Plans, trials, subscriptions, and billing.
-   Users, RBAC, and locations.
-   Notifications and support.
-   Reports, audit logs, and settings.

### Milestone 4 --- Backend Foundation

-   Authentication and authorization.
-   Database schema and migrations.
-   Tenant isolation.
-   API documentation and tests.

### Milestone 5 --- Business Workflows

-   Trial lifecycle and scheduled reminders.
-   Subscription renewal and billing.
-   Notifications and support workflows.
-   Audit logging and reports.

### Milestone 6 --- Tenant Operations

-   Branches, rooms, residents, and fees.
-   Tenant users and permissions.
-   Tenant dashboard and reports.

### Milestone 7 --- Production Readiness

-   Integrations.
-   Security and performance testing.
-   Deployment, monitoring, backups, and recovery validation.

## 16. Definition of Done

A module is complete when: - Requirements and permissions are
documented. - UI states include loading, empty, error, and success where
applicable. - Validation is implemented. - All visible actions have
defined behavior. - API integration uses the service layer. - Tests
cover important logic and user interactions. - Accessibility and
responsive behavior are checked. - Audit requirements are implemented
for sensitive changes. - No secrets or privileged business rules are
exposed only in the frontend. - Documentation is updated. - Lint, tests,
and build pass, or known failures are explicitly recorded.

## 17. Implementation Instructions for AI Coding Agents

When using this document with Antigravity or another coding agent:

1.  Inspect the current repository before editing.
2.  Do not overwrite existing working files without reviewing them.
3.  Implement one milestone at a time.
4.  Keep the frontend and backend responsibilities separate.
5.  Do not use static values inside production UI components.
6.  During frontend-only work, place demonstration data in clearly
    labeled mock-data modules.
7.  Do not invent successful API, payment, email, refund, backup, or
    authentication results.
8.  Keep business rules in testable service/domain functions rather than
    duplicating them across components.
9.  Add and run tests as features are implemented.
10. Run lint and production build and fix errors.
11. Report what was implemented, what was tested, and what remains
    incomplete.
12. Ask for clarification when a business decision materially affects
    data, billing, security, or access control.

------------------------------------------------------------------------

**End of document**

This document is a planning baseline. Business rules marked as
unresolved must be confirmed before production implementation. The
initial delivery target is the Super Admin frontend; backend,
integrations, and tenant operations follow in later milestones.
