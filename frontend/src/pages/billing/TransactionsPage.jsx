import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockTransactions } from '../../mock-data/billingData';

export const TransactionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/billing" className="p-1 text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Transactions</h1>
          <p className="text-sm text-slate-500 mt-0.5">Gateway payment audit and simulated refund handling</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-500">Transaction logs ({mockTransactions.length} recorded)</p>
      </div>
    </div>
  );
};
