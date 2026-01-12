import apiClient from './client';
import {
  CreateBookingRequest,
  BookingResponse,
  ConfirmBookingRequest,
} from '@/types/booking.types';

export const bookingsApi = {
  /**
   * Create a new booking with idempotency key
   */
  create: async (
    data: CreateBookingRequest,
    idempotencyKey: string
  ): Promise<BookingResponse> => {
    const response = await apiClient.post<BookingResponse>('/bookings', data, {
      headers: {
        'X-Idempotency-Key': idempotencyKey,
      },
    });
    return response.data;
  },

  /**
   * Confirm booking after payment
   */
  confirm: async (
    bookingId: string,
    data: ConfirmBookingRequest
  ): Promise<BookingResponse> => {
    const response = await apiClient.post<BookingResponse>(
      `/bookings/${bookingId}/confirm`,
      data
    );
    return response.data;
  },

  /**
   * Get booking by ID
   */
  getById: async (bookingId: string): Promise<BookingResponse> => {
    const { data } = await apiClient.get<BookingResponse>(`/bookings/${bookingId}`);
    return data;
  },

  /**
   * Get user's bookings
   */
  getByUser: async (userId: string): Promise<BookingResponse[]> => {
    const { data } = await apiClient.get<BookingResponse[]>('/bookings', {
      params: { userId },
    });
    return data;
  },
};