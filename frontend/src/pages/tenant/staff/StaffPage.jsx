import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/forms/Input';
import { Select } from '../../../components/forms/Select';
import { DataTable } from '../../../components/tables/DataTable';
import { TableFilterToolbar } from '../../../components/tables/TableFilterToolbar';
import { UserPlus, Shield, UserCheck, ShieldCheck } from 'lucide-react';
import { mockTenantStaff } from '../../../mock-data/tenant/tenantStaffData';
import { mockTenantBranches } from '../../../mock-data/tenant/tenantBranchesData';
import { formatDate } from '../../../utils/formatters';

export const StaffPage = () => {
  const [staffList, setStaffList] = useState(mockTenantStaff);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Branch Manager',
    branchId: 'br_1',
  });

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || s.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleInviteStaff = (e) => {
    e.preventDefault();
    const branchObj = mockTenantBranches.find((b) => b.id === newStaff.branchId);
    const created = {
      id: `stf_${Date.now()}`,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role,
      assignedBranch: newStaff.branchId === 'all' ? 'All Branches' : branchObj?.name || 'Assigned Branch',
      branchId: newStaff.branchId,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setStaffList([...staffList, created]);
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Staff Member',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
            {row.name[0]}
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{row.name}</span>
            <span className="text-xs text-slate-500">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Role & Scope',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-800 text-xs block">{row.role}</span>
          <span className="text-[11px] text-slate-500">{row.assignedBranch}</span>
        </div>
      ),
    },
    {
      header: 'Phone',
      render: (row) => <span className="text-xs text-slate-700">{row.phone}</span>,
    },
    {
      header: 'Joined Date',
      render: (row) => <span className="text-xs text-slate-500">{formatDate(row.joinedDate)}</span>,
    },
    {
      header: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Staff & Permissions</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage operational team members, branch manager assignments, and role-based access
          </p>
        </div>
        <Button
          icon={UserPlus}
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Invite Staff Member
        </Button>
      </div>

      {/* Role Definitions Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <span className="font-bold text-slate-900 block">Tenant Administrator</span>
          <p className="text-slate-500 mt-1">Full control across all branches, fees, staff, and hostel settings.</p>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <span className="font-bold text-slate-900 block">Branch Manager</span>
          <p className="text-slate-500 mt-1">Manages rooms, beds, check-ins, and maintenance for assigned branch.</p>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <span className="font-bold text-slate-900 block">Accountant</span>
          <p className="text-slate-500 mt-1">Generates invoices, collects dues, issues receipts, and views reports.</p>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-xl">
          <span className="font-bold text-slate-900 block">Receptionist</span>
          <p className="text-slate-500 mt-1">Handles visitor logs, resident daily check-ins, and basic inquiries.</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <TableFilterToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search staff by name or email..."
        filters={
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden"
          >
            <option value="all">All Roles</option>
            <option value="Tenant Administrator">Tenant Administrator</option>
            <option value="Branch Manager">Branch Manager</option>
            <option value="Accountant">Accountant</option>
            <option value="Receptionist">Receptionist</option>
          </select>
        }
      />

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <DataTable columns={columns} data={filteredStaff} emptyMessage="No staff members found." />
      </div>

      {/* Invite Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invite Staff Member"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleInviteStaff} className="space-y-4">
          <Input
            label="Full Name"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            placeholder="Staff name"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Email"
              type="email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              placeholder="staff@hostel.com"
              required
            />
            <Input
              label="Phone"
              value={newStaff.phone}
              onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
              placeholder="+1 555-0100"
              required
            />
          </div>

          <Select
            label="Operational Role"
            value={newStaff.role}
            onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
            options={[
              { label: 'Branch Manager', value: 'Branch Manager' },
              { label: 'Accountant', value: 'Accountant' },
              { label: 'Receptionist', value: 'Receptionist' },
              { label: 'General Staff', value: 'Staff' },
            ]}
            required
          />

          <Select
            label="Branch Assignment"
            value={newStaff.branchId}
            onChange={(e) => setNewStaff({ ...newStaff, branchId: e.target.value })}
            options={[
              { label: 'All Branches (Enterprise / HQ)', value: 'all' },
              ...mockTenantBranches.map((b) => ({ label: b.name, value: b.id })),
            ]}
            required
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Send Invite
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
