import React from 'react';
import { Search, Download, Filter } from 'lucide-react';

export const TableFilterToolbar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search records...',
  filters,
  onExport,
  actions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
      <div className="flex flex-1 items-center gap-3">
        {onSearchChange && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchValue || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 transition-colors"
            />
          </div>
        )}
        {filters}
      </div>
      <div className="flex items-center gap-2">
        {onExport && (
          <button
            onClick={onExport}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2 text-slate-500" />
            Export CSV
          </button>
        )}
        {actions}
      </div>
    </div>
  );
};
