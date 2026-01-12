export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const APP_NAME =
  import.meta.env.VITE_APP_NAME || 'Ticket Booking System';

export const QUERY_KEYS = {
  CONCERTS: 'concerts',
  CONCERT: 'concert',
  BOOKINGS: 'bookings',
  BOOKING: 'booking',
  USER_BOOKINGS: 'user-bookings'
} as const;

export const QUERY_STALE_TIME = {
  CONCERTS: 5000, // 5 seconds (matches backend cache)
  BOOKINGS: 30000 // 30 seconds
} as const;

export const ROUTES = {
  HOME: '/',
  CONCERT_DETAILS: '/concerts/:id',
  BOOKING: '/booking/:id',
  BOOKING_SUCCESS: '/booking-success/:bookingId',
  MY_BOOKINGS: '/my-bookings'
} as const;

export const BOOKING_EXPIRY_MINUTES = 10;

export const TICKET_TIERS = {
  VIP: { name: 'VIP', color: 'purple' },
  FRONT_ROW: { name: 'Front Row', color: 'blue' },
  GA: { name: 'General Admission', color: 'green' }
} as const;

export const BOOKING_STATUS = {
  PENDING: { label: 'Pending', color: 'warning' },
  CONFIRMED: { label: 'Confirmed', color: 'success' },
  CANCELLED: { label: 'Cancelled', color: 'error' },
  EXPIRED: { label: 'Expired', color: 'error' }
} as const;
