import { TierType } from './concert.types';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED'
}

export interface BookingItem {
  ticketTierId: string;
  quantity: number;
}

export interface CreateBookingRequest {
  userId: string;
  concertId: string;
  items: BookingItem[];
}

export interface BookingItemResponse {
  id: string;
  tierType: TierType;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface BookingResponse {
  id: string;
  bookingReference: string;
  status: BookingStatus;
  totalAmount: number;
  expiresAt: string | null;
  createdAt: string;
  items: BookingItemResponse[];
  concertName: string;
  concertVenue: string;
  eventDate: string;
}

export interface ConfirmBookingRequest {
  paymentSuccess: boolean;
}
