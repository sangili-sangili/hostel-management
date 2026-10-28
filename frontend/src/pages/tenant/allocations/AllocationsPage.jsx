import React, { useState } from 'react';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/forms/Input';
import { Select } from '../../../components/forms/Select';
import { DataTable } from '../../../components/tables/DataTable';
import { TableFilterToolbar } from '../../../components/tables/TableFilterToolbar';
import { formatDate } from '../../../utils/formatters';
import { Plus, KeyRound, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';
import { mockTenantAllocations } from '../../../mock-data/tenant/tenantAllocationsData';
import { mockTenantBranches } from '../../../mock-data/tenant/tenantBranchesData';
import { mockTenantRooms } from '../../../mock-data/tenant/tenantRoomsData';
import { mockTenantResidents } from '../../../mock-data/tenant/tenantResidentsData';

export const AllocationsPage = () => {
  const [allocations, setAllocations] = useState(mockTenantAllocations);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New allocation form
  const [newAlloc, setNewAlloc] = useState({
    residentId: mockTenantResidents[0]?.id || '',
    branchId: 'br_1',
    roomId: 'rm_201',
    bedNumber: 'Bed A',
    checkInDate: new Date().toISOString().split('T')[0],
    expectedCheckOutDate: '2027-05-30',
    securityDeposit: 500,
  });

  const filteredAllocations = allocations.filter((a) => {
    const matchesSearch =
      a.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.roomNumber.includes(searchQuery);
    const matchesBranch = selectedBranch === 'all' || a.branchId === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  // Calculate available beds for the selected room
  const selectedRoomObj = mockTenantRooms.find((r) => r.id === newAlloc.roomId);
  const availableBeds = selectedRoomObj ? selectedRoomObj.beds.filter((b) => b.status === 'available') : [];

  const handleCreateAllocation = (e) => {
    e.preventDefault();
    const resObj = mockTenantResidents.find((r) => r.id === newAlloc.residentId);
    const branchObj = mockTenantBranches.find((b) => b.id === newAlloc.branchId);

    const nextId = `alc_${allocations.length + 101}`;
    const today = '2026-10-29';

    const created = {
      id: nextId,
      residentId: newAlloc.residentId,
      residentName: resObj?.name || 'Assigned Resident',
      branchId: newAlloc.branchId,
      branchName: branchObj?.name || 'Downtown Berkeley Branch',
      roomNumber: selectedRoomObj?.roomNumber || '101',
      bedNumber: newAlloc.bedNumber,
      allocationDate: today,
      checkInDate: newAlloc.checkInDate,
      checkOutDate: null,
      expectedCheckOutDate: newAlloc.expectedCheckOutDate,
      securityDeposit: parseFloat(newAlloc.securityDeposit) || 500,
      status: 'Allocated',
      notes: 'New bed reservation confirmed.',
    };

    setAllocations([created, ...allocations]);
    setIsModalOpen(false);
  };

  const handleMarkCheckIn = (id) => {
    setAllocations(
      allocations.map((a) => (a.id === id ? { ...a, status: 'Checked In' } : a))
    );
  };

  const handleMarkCheckOut = (id) => {
    setAllocations(
      allocations.map((a) => (a.id === id ? { ...a, status: 'Checked Out', checkOutDate: '2026-10-29' } : a))
    );
  };

  const columns = [
    {
      header: 'Resident',
      render: (row) => (
        <span className="font-semibold text-slate-900 block">{row.residentName}</span>
      ),
    },
    {
      header: 'Branch & Room / Bed',
      render: (row) => (
        <div>
          <span className="font-medium text-slate-800 block">{row.branchName}</span>
          <span className="text-xs text-slate-500">
            Room {row.roomNumber} • <strong className="text-emerald-700">{row.bedNumber}</strong>
          </span>
        </div>
      ),
    },
    {
      header: 'Check-in Date',
      render: (row) => <span className="text-xs text-slate-600">{formatDate(row.checkInDate)}</span>,
    },
    {
      header: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'Checked In'
              ? 'success'
              : row.status === 'Allocated'
              ? 'info'
              : 'neutral'
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Operational Actions',
      className: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          {row.status === 'Allocated' && (
            <button
              onClick={() => handleMarkCheckIn(row.id)}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Check In
            </button>
          )}
          {row.status === 'Checked In' && (
            <button
              onClick={() => handleMarkCheckOut(row.id)}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md border border-red-200 transition-colors"
            >
              Check Out
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Allocations & Check-ins</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Assign beds, confirm arrival check-ins, validate capacity, and maintain allocation logs
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          New Bed Allocation
        </Button>
      </div>

      {/* Filter Toolbar */}
      <TableFilterToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search resident name or room..."
        filters={
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
        }
      />

      {/* Allocations Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <DataTable columns={columns} data={filteredAllocations} emptyMessage="No allocation records found." />
      </div>

      {/* Allocation Wizard Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Allocate Bed to Resident"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateAllocation} className="space-y-4">
          <Select
            label="Select Resident"
            value={newAlloc.residentId}
            onChange={(e) => setNewAlloc({ ...newAlloc, residentId: e.target.value })}
            options={mockTenantResidents.map((r) => ({ label: `${r.name} (${r.email})`, value: r.id }))}
            required
          />

          <Select
            label="Branch"
            value={newAlloc.branchId}
            onChange={(e) => setNewAlloc({ ...newAlloc, branchId: e.target.value })}
            options={mockTenantBranches.map((b) => ({ label: b.name, value: b.id }))}
            required
          />

          <Select
            label="Select Room"
            value={newAlloc.roomId}
            onChange={(e) => setNewAlloc({ ...newAlloc, roomId: e.target.value })}
            options={mockTenantRooms.map((r) => ({
              label: `Room ${r.roomNumber} (${r.type} - ${r.floor})`,
              value: r.id,
            }))}
            required
          />

          {availableBeds.length > 0 ? (
            <Select
              label="Select Available Bed"
              value={newAlloc.bedNumber}
              onChange={(e) => setNewAlloc({ ...newAlloc, bedNumber: e.target.value })}
              options={availableBeds.map((b) => ({ label: `${b.bedNumber} (Vacant)`, value: b.bedNumber }))}
              required
            />
          ) : (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>No vacant beds in this room. Please select another room.</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Check-in Date"
              type="date"
              value={newAlloc.checkInDate}
              onChange={(e) => setNewAlloc({ ...newAlloc, checkInDate: e.target.value })}
              required
            />
            <Input
              label="Security Deposit"
              type="number"
              value={newAlloc.securityDeposit}
              onChange={(e) => setNewAlloc({ ...newAlloc, securityDeposit: e.target.value })}
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={availableBeds.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
            >
              Confirm Allocation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
