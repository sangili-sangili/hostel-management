import React, { useState } from 'react';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { DataTable } from '../../../components/tables/DataTable';
import { TableFilterToolbar } from '../../../components/tables/TableFilterToolbar';
import { ArrowLeft, Download, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockTenantPayments } from '../../../mock-data/tenant/tenantFeesData';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { exportToCSV } from '../../../utils/exportHelpers';

export const PaymentsPage = () => {
  const [payments] = useState(mockTenantPayments);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayments = payments.filter((p) =>
    p.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    exportToCSV(
      filteredPayments.map((p) => ({
        ReceiptID: p.id,
        InvoiceID: p.invoiceId,
        Resident: p.residentName,
        Branch: p.branchName,
        Amount: p.amount,
        Method: p.method,
        Reference: p.reference,
        Date: p.date,
        CollectedBy: p.collectedBy,
      })),
      'payment_collections_receipts.csv'
    );
  };

  const columns = [
    {
      header: 'Receipt #',
      render: (row) => (
        <div>
          <span className="font-mono text-xs font-bold text-slate-900 block">{row.id}</span>
          <span className="text-[10px] text-slate-400">Ref: {row.reference}</span>
        </div>
      ),
    },
    {
      header: 'Resident & Branch',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.residentName}</span>
          <span className="text-xs text-slate-500">{row.branchName}</span>
        </div>
      ),
    },
    {
      header: 'Amount Collected',
      render: (row) => (
        <span className="font-bold text-emerald-700 text-sm">{formatCurrency(row.amount)}</span>
      ),
    },
    {
      header: 'Payment Mode',
      render: (row) => <span className="text-xs text-slate-700 font-medium">{row.method}</span>,
    },
    {
      header: 'Date & Collected By',
      render: (row) => (
        <div>
          <span className="text-xs text-slate-800 block">{formatDate(row.date)}</span>
          <span className="text-[10px] text-slate-400">Staff: {row.collectedBy}</span>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => <Badge variant="success">{row.status}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/tenant/fees" className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Collections History</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Immutable receipt logs for all rent, mess, and deposit transactions
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Export Toolbar */}
      <TableFilterToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search receipt #, resident, or reference..."
        onExport={handleExport}
      />

      {/* Payments Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <DataTable columns={columns} data={filteredPayments} emptyMessage="No payment records found." />
      </div>
    </div>
  );
};
