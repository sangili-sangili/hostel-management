import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/forms/Input';
import { Select } from '../../../components/forms/Select';
import { DataTable } from '../../../components/tables/DataTable';
import { TableFilterToolbar } from '../../../components/tables/TableFilterToolbar';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { Plus, CreditCard, DollarSign, Receipt, AlertCircle, CheckCircle2, History } from 'lucide-react';
import { mockTenantInvoices, mockFeeCategories } from '../../../mock-data/tenant/tenantFeesData';
import { mockTenantResidents } from '../../../mock-data/tenant/tenantResidentsData';
import { Link } from 'react-router-dom';

export const FeesPage = () => {
  const [invoices, setInvoices] = useState(mockTenantInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);

  // New Invoice Form
  const [newInvoice, setNewInvoice] = useState({
    residentId: mockTenantResidents[0]?.id || '',
    billingMonth: 'November 2026',
    category: 'Monthly Room Rent',
    totalAmount: 500,
    dueDate: '2026-11-10',
  });

  // Payment Form
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    method: 'Credit Card (Online)',
    reference: '',
  });

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || inv.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalBilled = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalOutstanding = invoices.reduce((acc, inv) => acc + inv.balance, 0);

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const resObj = mockTenantResidents.find((r) => r.id === newInvoice.residentId);
    const created = {
      id: `INV-TNT-${Math.floor(1000 + Math.random() * 9000)}`,
      residentId: newInvoice.residentId,
      residentName: resObj?.name || 'Resident',
      branchId: resObj?.branchId || 'br_1',
      branchName: resObj?.branchName || 'Downtown Berkeley Branch',
      roomNumber: resObj?.roomNumber || '101',
      billingMonth: newInvoice.billingMonth,
      category: newInvoice.category,
      totalAmount: parseFloat(newInvoice.totalAmount) || 500,
      paidAmount: 0,
      balance: parseFloat(newInvoice.totalAmount) || 500,
      status: 'Unpaid',
      dueDate: newInvoice.dueDate,
      paidDate: null,
      invoiceDate: new Date().toISOString().split('T')[0],
    };
    setInvoices([created, ...invoices]);
    setIsInvoiceModalOpen(false);
  };

  const openPaymentModal = (invoice) => {
    setActiveInvoice(invoice);
    setPaymentForm({
      amount: invoice.balance,
      method: 'Credit Card (Online)',
      reference: `TXN-${Date.now().toString().slice(-6)}`,
    });
    setIsPaymentModalOpen(true);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    const paidVal = parseFloat(paymentForm.amount) || 0;
    setInvoices(
      invoices.map((inv) => {
        if (inv.id === activeInvoice.id) {
          const newPaid = inv.paidAmount + paidVal;
          const newBal = Math.max(0, inv.totalAmount - newPaid);
          const newStatus = newBal === 0 ? 'Paid' : 'Partial';
          return {
            ...inv,
            paidAmount: newPaid,
            balance: newBal,
            status: newStatus,
            paidDate: new Date().toISOString().split('T')[0],
          };
        }
        return inv;
      })
    );
    setIsPaymentModalOpen(false);
  };

  const columns = [
    {
      header: 'Invoice #',
      render: (row) => (
        <div>
          <span className="font-mono text-xs font-bold text-slate-900 block">{row.id}</span>
          <span className="text-[10px] text-slate-400">{row.billingMonth}</span>
        </div>
      ),
    },
    {
      header: 'Resident & Room',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.residentName}</span>
          <span className="text-xs text-slate-500">Room {row.roomNumber} • {row.branchName}</span>
        </div>
      ),
    },
    {
      header: 'Fee Category',
      render: (row) => <span className="text-xs text-slate-700 font-medium">{row.category}</span>,
    },
    {
      header: 'Amount / Balance',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{formatCurrency(row.totalAmount)}</span>
          {row.balance > 0 ? (
            <span className="text-xs text-red-600 font-semibold">{formatCurrency(row.balance)} due</span>
          ) : (
            <span className="text-xs text-emerald-600 font-medium">Fully Paid</span>
          )}
        </div>
      ),
    },
    {
      header: 'Due Date',
      render: (row) => <span className="text-xs text-slate-600">{formatDate(row.dueDate)}</span>,
    },
    {
      header: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'Paid'
              ? 'success'
              : row.status === 'Partial'
              ? 'warning'
              : 'danger'
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
        <div className="flex items-center justify-end gap-2">
          {row.balance > 0 ? (
            <button
              onClick={() => openPaymentModal(row)}
              className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
            >
              Collect
            </button>
          ) : (
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Settled
            </span>
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fees & Invoices</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Generate monthly rental invoices, record payments, and track overdue resident balances
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/tenant/payments">
            <Button variant="secondary" icon={History}>
              Payment History
            </Button>
          </Link>
          <Button
            icon={Plus}
            onClick={() => setIsInvoiceModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover:border-slate-300">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Invoiced</span>
          <span className="text-2xl font-bold text-slate-900 block mt-2">{formatCurrency(totalBilled)}</span>
          <span className="text-xs text-slate-400 mt-1 block">October billing cycle</span>
        </Card>
        <Card className="hover:border-slate-300">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Collected</span>
          <span className="text-2xl font-bold text-emerald-600 block mt-2">{formatCurrency(totalCollected)}</span>
          <span className="text-xs text-emerald-600 mt-1 block font-medium">Successfully settled</span>
        </Card>
        <Card className="hover:border-slate-300">
          <span className="text-xs font-semibold text-slate-500 uppercase">Pending Outstanding Dues</span>
          <span className="text-2xl font-bold text-red-600 block mt-2">{formatCurrency(totalOutstanding)}</span>
          <span className="text-xs text-red-500 mt-1 block font-medium">Actionable arrears</span>
        </Card>
      </div>

      {/* Filters Toolbar */}
      <TableFilterToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search invoice # or resident..."
        filters={
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden"
          >
            <option value="all">All Invoices</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Overdue">Overdue</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        }
      />

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <DataTable columns={columns} data={filteredInvoices} emptyMessage="No invoices found." />
      </div>

      {/* Generate Invoice Modal */}
      <Modal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        title="Generate New Invoice"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateInvoice} className="space-y-4">
          <Select
            label="Resident"
            value={newInvoice.residentId}
            onChange={(e) => setNewInvoice({ ...newInvoice, residentId: e.target.value })}
            options={mockTenantResidents.map((r) => ({ label: `${r.name} (Room ${r.roomNumber})`, value: r.id }))}
            required
          />

          <Select
            label="Fee Category"
            value={newInvoice.category}
            onChange={(e) => setNewInvoice({ ...newInvoice, category: e.target.value })}
            options={mockFeeCategories.map((c) => ({ label: c.name, value: c.name }))}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Billing Cycle / Month"
              value={newInvoice.billingMonth}
              onChange={(e) => setNewInvoice({ ...newInvoice, billingMonth: e.target.value })}
              placeholder="e.g. November 2026"
              required
            />
            <Input
              label="Amount ($)"
              type="number"
              value={newInvoice.totalAmount}
              onChange={(e) => setNewInvoice({ ...newInvoice, totalAmount: e.target.value })}
              required
            />
          </div>

          <Input
            label="Due Date"
            type="date"
            value={newInvoice.dueDate}
            onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
            required
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsInvoiceModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Create Invoice
            </Button>
          </div>
        </form>
      </Modal>

      {/* Record Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title={`Record Payment: ${activeInvoice?.id || ''}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleRecordPayment} className="space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>Resident:</span>
              <strong className="text-slate-900">{activeInvoice?.residentName}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Outstanding Balance:</span>
              <strong className="text-red-600">{formatCurrency(activeInvoice?.balance || 0)}</strong>
            </div>
          </div>

          <Input
            label="Collection Amount ($)"
            type="number"
            value={paymentForm.amount}
            onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
            required
          />

          <Select
            label="Payment Mode"
            value={paymentForm.method}
            onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
            options={[
              { label: 'Credit / Debit Card (Online)', value: 'Credit Card (Online)' },
              { label: 'Bank Wire / ACH', value: 'Bank Transfer (ACH)' },
              { label: 'Cash Collection', value: 'Cash' },
              { label: 'UPI / Mobile Money', value: 'UPI / Mobile' },
            ]}
            required
          />

          <Input
            label="Transaction Reference / Receipt #"
            value={paymentForm.reference}
            onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
            required
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Confirm Receipt
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
