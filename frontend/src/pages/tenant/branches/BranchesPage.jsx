import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/forms/Input';
import { TableFilterToolbar } from '../../../components/tables/TableFilterToolbar';
import { Building2, Plus, Phone, Mail, MapPin, Users, BedDouble, Check } from 'lucide-react';
import { mockTenantBranches } from '../../../mock-data/tenant/tenantBranchesData';

export const BranchesPage = () => {
  const [branches, setBranches] = useState(mockTenantBranches);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: '',
    code: '',
    manager: '',
    phone: '',
    email: '',
    address: '',
    city: 'Berkeley',
    state: 'California',
  });

  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateBranch = (e) => {
    e.preventDefault();
    const created = {
      id: `br_${Date.now()}`,
      status: 'Active',
      totalRooms: 0,
      totalBeds: 0,
      occupiedBeds: 0,
      amenities: ['Wi-Fi', 'Security CCTV'],
      ...newBranch,
    };
    setBranches([...branches, created]);
    setIsModalOpen(false);
    setNewBranch({ name: '', code: '', manager: '', phone: '', email: '', address: '', city: 'Berkeley', state: 'California' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Branch Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage multi-property hostel locations, branch managers, and facility limits
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Add New Branch
        </Button>
      </div>

      {/* Subscription Limit Quota Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong>Growth Tier Quota:</strong> {branches.length} of 5 branches currently provisioned.
          </span>
        </div>
        <span className="text-emerald-700 font-medium">2 branches remaining on current subscription</span>
      </div>

      {/* Search Toolbar */}
      <TableFilterToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search branch name, manager, or city..."
      />

      {/* Branches Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBranches.map((branch) => {
          const occupancyRate = branch.totalBeds > 0 ? Math.round((branch.occupiedBeds / branch.totalBeds) * 100) : 0;
          return (
            <Card key={branch.id} className="flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{branch.name}</h3>
                    <span className="text-[11px] font-mono text-slate-400">{branch.code}</span>
                  </div>
                  <Badge variant={branch.status === 'Active' ? 'success' : 'neutral'}>
                    {branch.status}
                  </Badge>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{branch.address}, {branch.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Manager: <strong className="text-slate-800">{branch.manager}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{branch.email}</span>
                  </div>
                </div>

                {/* Capacity & Occupancy Meter */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5" />
                      {branch.occupiedBeds} / {branch.totalBeds} Beds Occupied
                    </span>
                    <span className="font-semibold text-emerald-700">{occupancyRate}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                </div>

                {/* Amenities tags */}
                {branch.amenities && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {branch.amenities.map((am) => (
                      <span key={am} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-slate-100 text-[10px] font-medium text-slate-600">
                        <Check className="w-2.5 h-2.5 text-emerald-500" />
                        {am}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Branch Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Hostel Branch"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateBranch} className="space-y-4">
          <Input
            label="Branch Name"
            value={newBranch.name}
            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
            placeholder="e.g., Southside Scholar House"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Branch Code"
              value={newBranch.code}
              onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
              placeholder="e.g., BR-SOTH-04"
              required
            />
            <Input
              label="City"
              value={newBranch.city}
              onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
              required
            />
          </div>
          <Input
            label="Branch Manager"
            value={newBranch.manager}
            onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
            placeholder="Full name of manager"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone"
              value={newBranch.phone}
              onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
              placeholder="+1 555-0100"
              required
            />
            <Input
              label="Email"
              type="email"
              value={newBranch.email}
              onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
              placeholder="branch@hostel.com"
              required
            />
          </div>
          <Input
            label="Street Address"
            value={newBranch.address}
            onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
            placeholder="e.g., 100 University Ave"
            required
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Branch
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
