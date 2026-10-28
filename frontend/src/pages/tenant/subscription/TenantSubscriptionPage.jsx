import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { ShieldCheck, Building2, BedDouble, Users, Check, Sparkles, CreditCard } from 'lucide-react';
import { mockTenantSettings } from '../../../mock-data/tenant/tenantSettingsData';

export const TenantSubscriptionPage = () => {
  const { subscription } = mockTenantSettings;
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeSubmitted, setUpgradeSubmitted] = useState(false);

  const handleUpgradeSubmit = (e) => {
    e.preventDefault();
    setUpgradeSubmitted(true);
    setTimeout(() => {
      setUpgradeSubmitted(false);
      setIsUpgradeModalOpen(false);
    }, 2500);
  };

  const branchPercent = Math.round((subscription.limits.branches.used / subscription.limits.branches.max) * 100);
  const bedPercent = Math.round((subscription.limits.beds.used / subscription.limits.beds.max) * 100);
  const staffPercent = Math.round((subscription.limits.staffUsers.used / subscription.limits.staffUsers.max) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subscription & Quota Limits</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor plan tier, resource limits, renewal dates, and available capacity
          </p>
        </div>
        <Button
          icon={Sparkles}
          onClick={() => setIsUpgradeModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Upgrade Plan Tier
        </Button>
      </div>

      {/* Current Plan Overview Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white border border-slate-700 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Active Subscription
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">{subscription.planName}</h2>
            <p className="text-sm text-slate-300 mt-1">{subscription.billingCycle}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-xs text-slate-300">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-slate-400 block font-medium">Next Renewal Date</span>
              <span className="text-white font-semibold text-sm mt-0.5 block">{subscription.renewalDate}</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-slate-400 block font-medium">Payment Method</span>
              <span className="text-white font-semibold text-sm mt-0.5 block">{subscription.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quota Limits Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-800 text-sm">Branches Quota</span>
            </div>
            <span className="text-xs font-bold text-slate-700">
              {subscription.limits.branches.used} / {subscription.limits.branches.max}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${branchPercent}%` }} />
          </div>
          <p className="text-[11px] text-slate-500">
            {subscription.limits.branches.max - subscription.limits.branches.used} additional branches can be opened.
          </p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-800 text-sm">Bed Capacity</span>
            </div>
            <span className="text-xs font-bold text-slate-700">
              {subscription.limits.beds.used} / {subscription.limits.beds.max}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${bedPercent}%` }} />
          </div>
          <p className="text-[11px] text-slate-500">
            {subscription.limits.beds.max - subscription.limits.beds.used} beds remaining under plan quota.
          </p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-800 text-sm">Staff Team Seats</span>
            </div>
            <span className="text-xs font-bold text-slate-700">
              {subscription.limits.staffUsers.used} / {subscription.limits.staffUsers.max}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${staffPercent}%` }} />
          </div>
          <p className="text-[11px] text-slate-500">
            {subscription.limits.staffUsers.max - subscription.limits.staffUsers.used} staff seats available.
          </p>
        </Card>
      </div>

      {/* Plan Features Checklist */}
      <Card title="Features Included in Your Current Tier">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          {subscription.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Upgrade Tier Modal */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        title="Upgrade to Enterprise Plan"
        maxWidth="max-w-md"
      >
        {upgradeSubmitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Upgrade Request Received</h3>
            <p className="text-xs text-slate-500 mt-1">Our platform account manager will contact you within 2 business hours.</p>
          </div>
        ) : (
          <form onSubmit={handleUpgradeSubmit} className="space-y-4 text-xs text-slate-600">
            <p>
              Upgrading to <strong>Enterprise Plan ($599/mo)</strong> unlocks up to 25 branches, 5,000 beds, 150 staff seats, custom domains, and 24/7 dedicated account support.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div className="flex justify-between">
                <span>Current Plan:</span>
                <span className="font-semibold text-slate-900">Growth Plan ($249/mo)</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>New Tier:</span>
                <span className="text-emerald-700">Enterprise Plan ($599/mo)</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsUpgradeModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Submit Upgrade Request
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
