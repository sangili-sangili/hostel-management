/**
 * Format currency with integer-safe or decimal representations
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date in standard enterprise display format
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(date);
};

/**
 * Format date with time
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  return formatDate(dateString, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format compact numbers (e.g., 1.2k, 5M)
 */
export const formatCompactNumber = (number) => {
  if (number === undefined || number === null) return '0';
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(number);
};
