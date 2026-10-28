# Hostel Management SaaS — Tenant Operations Implementation Plan

## 1. Overview
This document specifies the integration of the **Hostel/Tenant Admin Operations Portal** into the existing frontend application within `frontend/`.
The Tenant Portal is designed for hostel owners, branch managers, accountants, and staff to run day-to-day operations:
room and bed allocation, resident onboarding, fees collection, staff permissions, and reports.

## 2. Architecture & Design Principles
- **No Project Duplication**: Directly extends `frontend/` utilizing Vite, React Router DOM, Tailwind CSS v4, Lucide React, and Recharts.
- **Strict Portal Separation**:
  - Super Admin routes: `/`, `/tenants`, `/subscription-plans`, `/billing`, `/users`, etc. (using `AdminLayout` with dark navy sidebar).
  - Tenant Admin routes: `/tenant/login`, `/tenant/dashboard`, `/tenant/branches`, `/tenant/rooms`, `/tenant/residents`, `/tenant/allocations`, `/tenant/fees`, etc. (using dedicated `TenantLayout` with operational branch switcher).
- **Reusable Component Sharing**: Reuses `DataTable`, `TableFilterToolbar`, `Pagination`, `Card`, `Button`, `Badge`, `Modal`, `Input`, `Select`, and `Toast`.
- **Role-Based & Branch-Aware Access**:
  - Roles: `Tenant Administrator`, `Branch Manager`, `Accountant`, `Receptionist`, `Staff`.
  - Context tracks: `currentTenant`, `activeBranch`, `userRole`.

## 3. Tenant Modules & Implementation Roadmap
1. **Tenant Routes & Navigation**:
   - `frontend/src/constants/routes.js` and `navigation.js`
   - Dedicated `TenantLayout` with branch dropdown selector, user profile, and operational navigation.
2. **Tenant Authentication**:
   - `/tenant/login`: Tenant portal login with sample tenant credentials and demo switchers.
3. **Tenant Dashboard**:
   - Operational KPIs (Rooms, Beds, Occupancy %, Today's Check-ins/outs, Collections, Overdue Dues).
   - Visual bed occupancy breakdown and branch comparison.
4. **Branch Management**:
   - Multi-branch administration, branch manager assignment, and subscription limit enforcement.
5. **Room & Bed Management**:
   - Room configuration (room type, sharing type, floor, amenities, monthly rent).
   - Visual bed status tracker: Available, Occupied, Reserved, Maintenance.
6. **Resident Management**:
   - Resident profile records, emergency contacts, KYC docs, branch/room assignment history.
7. **Allocations & Check-in / Check-out**:
   - Allocation wizard preventing duplicate bookings and capacity conflicts.
   - Check-in confirmation and checkout settlements.
8. **Fees, Invoices, and Payments**:
   - Fee category config (Rent, Security Deposit, Maintenance, Mess).
   - Invoice generation, payment receipts, partial payments, and overdue tracking.
9. **Staff & Permissions**:
   - Tenant staff directory, role assignments, and branch assignment.
10. **Tenant Notifications & Reports**:
    - Overdue alerts, check-in reminders, occupancy and collection reports with CSV export.
11. **Tenant Settings & Subscription**:
    - Hostel profile, rules, check-in policies, currency, and subscription tier/limits view.
