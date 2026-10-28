import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again.',
  onRetry,
}) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3 text-red-500">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-medium text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button onClick={onRetry} variant="secondary">
            Retry
          </Button>
        </div>
      )}
    </div>
  );
};
