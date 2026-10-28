import React from 'react';
import { EmptyState } from '../common/EmptyState';
import { LoadingSkeleton } from '../common/LoadingSkeleton';

export const DataTable = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = 'No records available.',
  keyField = 'id',
}) => {
  if (isLoading) {
    return <LoadingSkeleton count={5} className="h-10 my-2" />;
  }

  if (!data || data.length === 0) {
    return <EmptyState description={emptyMessage} />;
  }

  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded-lg">
      <table className="w-full text-left border-collapse text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={col.key || idx} className={`px-4 py-3 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row, rowIdx) => (
            <tr key={row[keyField] || rowIdx} className="hover:bg-slate-50/75 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={col.key || colIdx} className={`px-4 py-3.5 ${col.className || ''}`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
