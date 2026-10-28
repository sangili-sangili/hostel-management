import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 sm:px-6">
      <div className="text-sm text-slate-500">
        Page <span className="font-medium text-slate-700">{currentPage}</span> of{' '}
        <span className="font-medium text-slate-700">{totalPages}</span>
        {totalItems !== undefined && (
          <span className="ml-2 text-xs text-slate-400">({totalItems} total records)</span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
