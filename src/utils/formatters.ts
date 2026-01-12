import { format, formatDistanceToNow, isPast, differenceInMinutes } from 'date-fns';

/**
 * Format currency in USD
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'PPP p'); // Jan 1, 2024 at 7:00 PM
};

/**
 * Format date only
 */
export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'PPP'); // Jan 1, 2024
};

/**
 * Format time only
 */
export const formatTime = (date: string | Date): string => {
  return format(new Date(date), 'p'); // 7:00 PM
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Check if date has passed
 */
export const isDatePast = (date: string | Date): boolean => {
  return isPast(new Date(date));
};

/**
 * Get remaining minutes until expiry
 */
export const getRemainingMinutes = (expiryDate: string | Date): number => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return Math.max(0, differenceInMinutes(expiry, now));
};

/**
 * Format remaining time for countdown
 */
export const formatRemainingTime = (expiryDate: string | Date): string => {
  const minutes = getRemainingMinutes(expiryDate);
  
  if (minutes <= 0) {
    return 'Expired';
  }
  
  const mins = minutes % 60;
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  
  return `${mins}m`;
};

/**
 * Format ticket tier name
 */
export const formatTierName = (tierType: string): string => {
  const tierNames: Record<string, string> = {
    VIP: 'VIP',
    FRONT_ROW: 'Front Row',
    GA: 'General Admission',
  };
  
  return tierNames[tierType] || tierType;
};

/**
 * Get tier color class
 */
export const getTierColorClass = (tierType: string): string => {
  const colors: Record<string, string> = {
    VIP: 'bg-purple-100 text-purple-800 border-purple-300',
    FRONT_ROW: 'bg-blue-100 text-blue-800 border-blue-300',
    GA: 'bg-green-100 text-green-800 border-green-300',
  };
  
  return colors[tierType] || 'bg-gray-100 text-gray-800 border-gray-300';
};

/**
 * Get booking status color class
 */
export const getStatusColorClass = (status: string): string => {
  const colors: Record<string, string> = {
    PENDING: 'warning',
    CONFIRMED: 'success',
    CANCELLED: 'error',
    EXPIRED: 'error',
  };
  
  return colors[status] || 'info';
};

/**
 * Pluralize word based on count
 */
export const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) {
    return singular;
  }
  return plural || `${singular}s`;
};

/**
 * Format ticket count
 */
export const formatTicketCount = (count: number): string => {
  return `${count} ${pluralize(count, 'ticket')}`;
};

/**
 * Format price range
 */
export const formatPriceRange = (min: number, max: number): string => {
  if (min === max) {
    return formatCurrency(min);
  }
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

/**
 * Truncate text to specified length
 */
export const truncate = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Format large numbers (e.g., 1000 -> 1K)
 */
export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
};