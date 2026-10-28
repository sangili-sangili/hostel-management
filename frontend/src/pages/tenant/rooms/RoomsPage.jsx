import React, { useState } from 'react';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/forms/Input';
import { Select } from '../../../components/forms/Select';
import { TableFilterToolbar } from '../../../components/tables/TableFilterToolbar';
import { BedDouble, Plus, CheckCircle, Wrench, Clock, Ban } from 'lucide-react';
import { mockTenantRooms } from '../../../mock-data/tenant/tenantRoomsData';
import { mockTenantBranches } from '../../../mock-data/tenant/tenantBranchesData';
import { formatCurrency } from '../../../utils/formatters';

export const RoomsPage = () => {
  const [rooms, setRooms] = useState(mockTenantRooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    branchId: 'br_1',
    floor: '1st Floor',
    type: 'Double',
    capacity: 2,
    monthlyRent: 500,
    amenities: 'Attached Bath, AC, Wi-Fi',
  });

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch = r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || r.branchId === selectedBranch;
    const matchesType = selectedType === 'all' || r.type === selectedType;
    return matchesSearch && matchesBranch && matchesType;
  });

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const branchObj = mockTenantBranches.find((b) => b.id === newRoom.branchId);
    const capacityNum = parseInt(newRoom.capacity, 10) || 1;
    const created = {
      id: `rm_${Date.now()}`,
      roomNumber: newRoom.roomNumber,
      branchId: newRoom.branchId,
      branchName: branchObj?.name || 'Downtown Berkeley Branch',
      floor: newRoom.floor,
      type: newRoom.type,
      capacity: capacityNum,
      monthlyRent: parseFloat(newRoom.monthlyRent) || 500,
      status: 'Available',
      amenities: newRoom.amenities.split(',').map((s) => s.trim()),
      beds: Array.from({ length: capacityNum }).map((_, i) => ({
        id: `b_${Date.now()}_${i}`,
        bedNumber: `Bed ${String.fromCharCode(65 + i)}`,
        status: 'available',
        residentName: null,
      })),
    };
    setRooms([...rooms, created]);
    setIsModalOpen(false);
    setNewRoom({ roomNumber: '', branchId: 'br_1', floor: '1st Floor', type: 'Double', capacity: 2, monthlyRent: 500, amenities: 'Attached Bath, AC, Wi-Fi' });
  };

  const getBedStatusBadge = (bed) => {
    switch (bed.status) {
      case 'occupied':
        return (
          <span
            key={bed.id}
            title={`${bed.bedNumber}: Occupied by ${bed.residentName}`}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {bed.bedNumber} ({bed.residentName || 'Occupied'})
          </span>
        );
      case 'available':
        return (
          <span
            key={bed.id}
            title={`${bed.bedNumber}: Available for booking`}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
          >
            <CheckCircle className="w-3 h-3 text-blue-500" />
            {bed.bedNumber} (Vacant)
          </span>
        );
      case 'reserved':
        return (
          <span
            key={bed.id}
            title={`${bed.bedNumber}: Reserved pending check-in`}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"
          >
            <Clock className="w-3 h-3 text-amber-500" />
            {bed.bedNumber} (Reserved)
          </span>
        );
      case 'maintenance':
        return (
          <span
            key={bed.id}
            title={`${bed.bedNumber}: Under maintenance`}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200"
          >
            <Wrench className="w-3 h-3 text-red-500" />
            {bed.bedNumber} (Maintenance)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Room & Bed Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure room capacities, floors, sharing types, and visual bed availability
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Add New Room
        </Button>
      </div>

      {/* Bed Legend Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
        <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">Bed Legend:</span>
        <span className="flex items-center gap-1.5 text-emerald-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Occupied
        </span>
        <span className="flex items-center gap-1.5 text-blue-700">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Available
        </span>
        <span className="flex items-center gap-1.5 text-amber-700">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Reserved
        </span>
        <span className="flex items-center gap-1.5 text-red-700">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Maintenance
        </span>
      </div>

      {/* Filters Toolbar */}
      <TableFilterToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search room number..."
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden"
            >
              <option value="all">All Room Types</option>
              <option value="Single">Single Room</option>
              <option value="Double">Double Room</option>
              <option value="Triple">Triple Room</option>
              <option value="4-Share Dorm">4-Share Dorm</option>
            </select>
          </div>
        }
      />

      {/* Rooms Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRooms.map((room) => {
          const availableCount = room.beds.filter((b) => b.status === 'available').length;
          return (
            <div
              key={room.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">Room {room.roomNumber}</span>
                    <Badge variant={availableCount > 0 ? 'success' : 'neutral'}>
                      {availableCount > 0 ? `${availableCount} Available` : 'Full'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {room.branchName} • {room.floor}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-slate-900">
                    {formatCurrency(room.monthlyRent)}
                    <span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{room.type} ({room.capacity} Beds)</span>
                </div>
              </div>

              {/* Visual Bed Matrix for this room */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Bed Allocation Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {room.beds.map((bed) => getBedStatusBadge(bed))}
                </div>
              </div>

              {/* Amenities */}
              {room.amenities && (
                <div className="mt-3 pt-2 border-t border-slate-50 flex flex-wrap gap-1">
                  {room.amenities.map((am) => (
                    <span key={am} className="px-2 py-0.5 rounded-xs bg-slate-50 text-[10px] text-slate-500">
                      {am}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Room Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Room"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <Select
            label="Hostel Branch"
            value={newRoom.branchId}
            onChange={(e) => setNewRoom({ ...newRoom, branchId: e.target.value })}
            options={mockTenantBranches.map((b) => ({ label: b.name, value: b.id }))}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Room Number"
              value={newRoom.roomNumber}
              onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
              placeholder="e.g. 205"
              required
            />
            <Select
              label="Floor Level"
              value={newRoom.floor}
              onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
              options={[
                { label: 'Ground Floor', value: 'Ground Floor' },
                { label: '1st Floor', value: '1st Floor' },
                { label: '2nd Floor', value: '2nd Floor' },
                { label: '3rd Floor', value: '3rd Floor' },
              ]}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Room Type"
              value={newRoom.type}
              onChange={(e) => {
                const type = e.target.value;
                let cap = 2;
                if (type === 'Single') cap = 1;
                if (type === 'Triple') cap = 3;
                if (type === '4-Share Dorm') cap = 4;
                setNewRoom({ ...newRoom, type, capacity: cap });
              }}
              options={[
                { label: 'Single Room', value: 'Single' },
                { label: 'Double Sharing', value: 'Double' },
                { label: 'Triple Sharing', value: 'Triple' },
                { label: '4-Share Dormitory', value: '4-Share Dorm' },
              ]}
              required
            />
            <Input
              label="Monthly Rent per Bed"
              type="number"
              value={newRoom.monthlyRent}
              onChange={(e) => setNewRoom({ ...newRoom, monthlyRent: e.target.value })}
              required
            />
          </div>

          <Input
            label="Amenities (comma separated)"
            value={newRoom.amenities}
            onChange={(e) => setNewRoom({ ...newRoom, amenities: e.target.value })}
            placeholder="Attached Bath, AC, Balcony"
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Create Room & Beds
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
