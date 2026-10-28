import React from 'react';
import { Link } from 'react-router-dom';
import { mockInvoices, mockTransactions } from '../../mock-data/billingData';

export const BillingPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Billing & Subscriptions</h1>
          <p className="text-sm text-slate-500 mt-1">Manage renewals, invoices, transactions, and refunds</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/billing/invoices"
            className="px-3 py-2 text-sm font-medium border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            View Invoices
          </Link>
          <Link
            to="/billing/transactions"
            className="px-3 py-2 text-sm font-medium border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            View Transactions
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">
          Billing overview summary: {mockInvoices.length} invoices, {mockTransactions.length} transactions recorded.
        </p>
      </div>
    </div>
  );
};
