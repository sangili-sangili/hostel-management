import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { ArrowLeft, Phone, Mail, MapPin, Shield, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';
import { mockTenantResidents } from '../../../mock-data/tenant/tenantResidentsData';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const ResidentDetailPage = () => {
  const { id } = useParams();
  const resident = mockTenantResidents.find((r) => r.id === id) || mockTenantResidents[0];

  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [isVacated, setIsVacated] = useState(resident.status === 'Checked Out');

  const handleConfirmCheckout = () => {
    setIsVacated(true);
    setIsCheckOutModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/tenant/residents" className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{resident.name}</h1>
              <Badge variant={isVacated ? 'neutral' : resident.status === 'Active' ? 'success' : 'warning'}>
                {isVacated ? 'Checked Out' : resident.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Resident ID: {resident.id} • {resident.branchName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isVacated && (
            <Button
              variant="secondary"
              onClick={() => setIsCheckOutModalOpen(true)}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Process Check-out
            </Button>
          )}
          <Link to="/tenant/fees">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              View Invoices & Billing
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Contact & KYC Information */}
        <div className="space-y-6">
          <Card title="Personal Information">
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Full Name</span>
                <span className="font-semibold text-slate-900 text-sm">{resident.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700">{resident.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700">{resident.phone}</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 block font-medium">Government ID Proof</span>
                <span className="text-slate-700 font-medium">{resident.idProofType} ({resident.idProofNumber})</span>
              </div>
            </div>
          </Card>

          <Card title="Emergency Contact">
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Contact Person</span>
                <span className="font-semibold text-slate-900">{resident.emergencyContact.name} ({resident.emergencyContact.relation})</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700">{resident.emergencyContact.phone}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Center & Right Column: Room Details & Financial Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Hostel Allocation Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block font-medium">Allocated Property</span>
                <span className="font-semibold text-slate-900 text-sm">{resident.branchName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block font-medium">Room & Bed</span>
                <span className="font-semibold text-slate-900 text-sm">Room {resident.roomNumber} • {resident.bedNumber}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block font-medium">Check-in Date</span>
                <span className="font-semibold text-slate-900 text-sm">{formatDate(resident.checkInDate)}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block font-medium">Contract End Date</span>
                <span className="font-semibold text-slate-900 text-sm">{formatDate(resident.expectedCheckOutDate)}</span>
              </div>
            </div>
          </Card>

          <Card title="Financial & Fee Account">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="p-3 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-400 block">Monthly Rent</span>
                <span className="text-lg font-bold text-slate-900">{formatCurrency(resident.monthlyRent)}</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-400 block">Security Deposit</span>
                <span className="text-lg font-bold text-emerald-600">{formatCurrency(resident.securityDeposit)}</span>
                <span className="text-[10px] text-slate-400 block">Paid & Held in Escrow</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-400 block">Current Outstanding</span>
                <span className={`text-lg font-bold ${resident.duesAmount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {formatCurrency(resident.duesAmount)}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {resident.duesAmount > 0 ? 'Pending Collection' : 'Zero Balance'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Process Check-out Modal */}
      <Modal
        isOpen={isCheckOutModalOpen}
        onClose={() => setIsCheckOutModalOpen(false)}
        title={`Check-out Clearance: ${resident.name}`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs text-slate-600">
          <p>
            Confirming check-out will vacate <strong>Room {resident.roomNumber} ({resident.bedNumber})</strong> and mark this bed as available for new allocations.
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Security Deposit Held:</span>
              <span className="font-semibold text-slate-900">{formatCurrency(resident.securityDeposit)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Outstanding Dues Deducted:</span>
              <span className="font-semibold">-{formatCurrency(resident.duesAmount)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
              <span>Refund Amount to Resident:</span>
              <span className="text-emerald-600">{formatCurrency(resident.securityDeposit - resident.duesAmount)}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsCheckOutModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmCheckout} className="bg-red-600 hover:bg-red-700 text-white">
              Confirm Check-out & Vacate Bed
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
