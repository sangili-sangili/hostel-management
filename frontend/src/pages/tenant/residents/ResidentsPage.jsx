import React, { useState } from 'react';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/forms/Input';
import { Select } from '../../../components/forms/Select';
import { DataTable } from '../../../components/tables/DataTable';
import { Pagination } from '../../../components/tables/Pagination';
import { TableFilterToolbar } from '../../../components/tables/TableFilterToolbar';
import { usePagination } from '../../../hooks/usePagination';
import { exportToCSV } from '../../../utils/exportHelpers';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { Plus, Eye, AlertCircle } from 'lucide-react';
import { mockTenantResidents } from '../../../mock-data/tenant/tenantResidentsData';
import { mockTenantBranches } from '../../../mock-data/tenant/tenantBranchesData';
import { Link } from 'react-router-dom';

export const ResidentsPage = () => {
  const [residents, setResidents] = useState(mockTenantResidents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newResident, setNewResident] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    branchId: 'br_1',
    roomNumber: '102',
    bedNumber: 'Bed B',
    checkInDate: new Date().toISOString().split('T')[0],
    monthlyRent: 450,
    securityDeposit: 450,
    emergencyName: '',
    emergencyPhone: '',
  });

  const filteredResidents = residents.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);
    const matchesBranch = selectedBranch === 'all' || r.branchId === selectedBranch;
    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const { currentPage, totalPages, currentItems, goToPage, totalItems } = usePagination(filteredResidents, 8);

  const handleRegister = (e) => {
    e.preventDefault();
    const branchObj = mockTenantBranches.find((b) => b.id === newResident.branchId);
    const created = {
      id: `res_${Date.now()}`,
      name: newResident.name,
      email: newResident.email,
      phone: newResident.phone,
      gender: newResident.gender,
      branchId: newResident.branchId,
      branchName: branchObj?.name || 'Downtown Berkeley Branch',
      roomNumber: newResident.roomNumber,
      bedNumber: newResident.bedNumber,
      checkInDate: newResident.checkInDate,
      monthlyRent: parseFloat(newResident.monthlyRent) || 450,
      securityDeposit: parseFloat(newResident.securityDeposit) || 450,
      duesAmount: 0,
      status: 'Active',
      emergencyContact: { name: newResident.emergencyName, phone: newResident.emergencyPhone, relation: 'Guardian' },
      idProofType: 'National ID',
      idProofNumber: 'ID-NEW',
    };
    setResidents([created, ...residents]);
    setIsModalOpen(false);
  };

  const handleExport = () => {
    exportToCSV(
      filteredResidents.map((r) => ({
        Name: r.name,
        Email: r.email,
        Phone: r.phone,
        Branch: r.branchName,
        Room: r.roomNumber,
        Bed: r.bedNumber,
        CheckInDate: r.checkInDate,
        MonthlyRent: r.monthlyRent,
        Dues: r.duesAmount,
        Status: r.status,
      })),
      'hostel_residents.csv'
    );
  };

  const columns = [
    {
      header: 'Resident',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
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
      header: 'Branch & Room',
      render: (row) => (
        <div>
          <span className="font-medium text-slate-800 block">{row.branchName}</span>
          <span className="text-xs text-slate-500">
            Room {row.roomNumber} • {row.bedNumber}
          </span>
        </div>
      ),
    },
    {
      header: 'Check-in Date',
      render: (row) => <span className="text-slate-600 text-xs">{formatDate(row.checkInDate)}</span>,
    },
    {
      header: 'Rent & Dues',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{formatCurrency(row.monthlyRent)}/mo</span>
          {row.duesAmount > 0 ? (
            <span className="text-xs text-red-600 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {formatCurrency(row.duesAmount)} due
            </span>
          ) : (
            <span className="text-xs text-emerald-600 font-medium">Cleared</span>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'Active' ? 'success' : row.status === 'Notice Period' ? 'warning' : 'neutral'
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (row) => (
        <Link
          to={`/tenant/residents/${row.id}`}
          className="inline-flex items-center p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
          title="View profile details"
        >
          <Eye className="w-4 h-4" />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resident Directory</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage student & working professional tenant profiles, room assignments, and KYC records
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Register New Resident
        </Button>
      </div>

      {/* Filters Toolbar */}
      <TableFilterToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name, email, phone..."
        onExport={handleExport}
        filters={
          <div className="flex items-center gap-2">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden"
            >
              <option value="all">All Branches</option>
              {mockTenantBranches.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Notice Period">Notice Period</option>
              <option value="Checked Out">Checked Out</option>
            </select>
          </div>
        }
      />

      {/* Residents Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <DataTable columns={columns} data={currentItems} emptyMessage="No residents match your filter." />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          totalItems={totalItems}
        />
      </div>

      {/* Register Resident Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Resident"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Full Name"
            value={newResident.name}
            onChange={(e) => setNewResident({ ...newResident, name: e.target.value })}
            placeholder="John Doe"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Email"
              type="email"
              value={newResident.email}
              onChange={(e) => setNewResident({ ...newResident, email: e.target.value })}
              placeholder="john@example.com"
              required
            />
            <Input
              label="Phone"
              value={newResident.phone}
              onChange={(e) => setNewResident({ ...newResident, phone: e.target.value })}
              placeholder="+1 555-0199"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Select
              label="Branch"
              value={newResident.branchId}
              onChange={(e) => setNewResident({ ...newResident, branchId: e.target.value })}
              options={mockTenantBranches.map((b) => ({ label: b.name, value: b.id }))}
              required
            />
            <Input
              label="Room #"
              value={newResident.roomNumber}
              onChange={(e) => setNewResident({ ...newResident, roomNumber: e.target.value })}
              required
            />
            <Input
              label="Bed #"
              value={newResident.bedNumber}
              onChange={(e) => setNewResident({ ...newResident, bedNumber: e.target.value })}
              placeholder="Bed A"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Monthly Rent"
              type="number"
              value={newResident.monthlyRent}
              onChange={(e) => setNewResident({ ...newResident, monthlyRent: e.target.value })}
              required
            />
            <Input
              label="Security Deposit"
              type="number"
              value={newResident.securityDeposit}
              onChange={(e) => setNewResident({ ...newResident, securityDeposit: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Emergency Contact Name"
              value={newResident.emergencyName}
              onChange={(e) => setNewResident({ ...newResident, emergencyName: e.target.value })}
              placeholder="Parent or Guardian"
              required
            />
            <Input
              label="Emergency Phone"
              value={newResident.emergencyPhone}
              onChange={(e) => setNewResident({ ...newResident, emergencyPhone: e.target.value })}
              placeholder="+1 555-0101"
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Complete Registration
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
