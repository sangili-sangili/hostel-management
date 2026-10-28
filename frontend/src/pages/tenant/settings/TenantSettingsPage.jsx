import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/forms/Input';
import { Select } from '../../../components/forms/Select';
import { Toast } from '../../../components/common/Toast';
import { Building2, Clock, Save, Shield } from 'lucide-react';
import { mockTenantSettings } from '../../../mock-data/tenant/tenantSettingsData';

export const TenantSettingsPage = () => {
  const [profile, setProfile] = useState(mockTenantSettings.businessProfile);
  const [policies, setPolicies] = useState(mockTenantSettings.operationalPolicies);
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hostel Settings & Policies</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Configure business details, tax IDs, check-in rules, gate timings, and security policies
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Profile */}
        <Card title="Business & Legal Identity" subtitle="Official registration information for receipts and invoices">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Hostel Brand Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
            <Input
              label="Legal Entity Name"
              value={profile.legalEntity}
              onChange={(e) => setProfile({ ...profile, legalEntity: e.target.value })}
              required
            />
            <Input
              label="Tax Registration / EIN Number"
              value={profile.taxId}
              onChange={(e) => setProfile({ ...profile, taxId: e.target.value })}
              required
            />
            <Input
              label="Contact Email"
              type="email"
              value={profile.contactEmail}
              onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
              required
            />
            <Input
              label="Phone Number"
              value={profile.contactPhone}
              onChange={(e) => setProfile({ ...profile, contactPhone: e.target.value })}
              required
            />
            <Input
              label="Headquarters Address"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              required
            />
            <Select
              label="Operating Currency"
              value={profile.currency}
              onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
              options={[
                { label: 'USD ($)', value: 'USD' },
                { label: 'INR (₹)', value: 'INR' },
                { label: 'GBP (£)', value: 'GBP' },
                { label: 'EUR (€)', value: 'EUR' },
              ]}
              required
            />
            <Input
              label="Timezone"
              value={profile.timezone}
              onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
              required
            />
          </div>
        </Card>

        {/* Operational Policies */}
        <Card title="Hostel Operational Rules & Timings" subtitle="Resident check-in, notice periods, and security guidelines">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Standard Check-in Time"
              value={policies.checkInTime}
              onChange={(e) => setPolicies({ ...policies, checkInTime: e.target.value })}
              placeholder="12:00 PM"
              required
            />
            <Input
              label="Standard Check-out Time"
              value={policies.checkOutTime}
              onChange={(e) => setPolicies({ ...policies, checkOutTime: e.target.value })}
              placeholder="10:00 AM"
              required
            />
            <Input
              label="Required Vacate Notice Period (Days)"
              type="number"
              value={policies.noticePeriodDays}
              onChange={(e) => setPolicies({ ...policies, noticePeriodDays: parseInt(e.target.value, 10) })}
              required
            />
            <Input
              label="Hostel Main Gate Closing Time"
              value={policies.gateCloseTime}
              onChange={(e) => setPolicies({ ...policies, gateCloseTime: e.target.value })}
              placeholder="11:00 PM"
              required
            />
            <Input
              label="Visitor Visiting Hours Cutoff"
              value={policies.visitorClosingTime}
              onChange={(e) => setPolicies({ ...policies, visitorClosingTime: e.target.value })}
              placeholder="08:00 PM"
              required
            />
            <Input
              label="Designated Quiet Hours"
              value={policies.quietHours}
              onChange={(e) => setPolicies({ ...policies, quietHours: e.target.value })}
              placeholder="10:00 PM - 07:00 AM"
              required
            />
          </div>
        </Card>

        {/* Save Bar */}
        <div className="flex justify-end">
          <Button
            type="submit"
            icon={Save}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 font-semibold shadow-xs"
          >
            Save Configuration Changes
          </Button>
        </div>
      </form>

      {showToast && (
        <Toast
          type="success"
          message="Hostel settings and policies updated successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};
