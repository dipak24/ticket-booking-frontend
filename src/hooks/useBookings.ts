import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingsApi } from '@/api/bookings.api';
import { QUERY_KEYS } from '@/constants/config';
import {
  CreateBookingRequest,
  ConfirmBookingRequest,
} from '@/types/booking.types';
import { generateIdempotencyKey } from './useIdempotencyKey';
import { toast } from 'sonner';

/**
 * Create a new booking mutation
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBookingRequest) => {
      const idempotencyKey = generateIdempotencyKey();
      return bookingsApi.create(data, idempotencyKey);
    },
    onSuccess: (data) => {
      // Invalidate concerts to refresh availability
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CONCERTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CONCERT, data.concertId],
      });

      toast.success('Booking created successfully!', {
        description: `Booking reference: ${data.bookingReference}`,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to create booking', {
        description: error.message,
      });
    },
  });
};

/**
 * Confirm a booking (process payment) mutation
 */
export const useConfirmBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      data,
    }: {
      bookingId: string;
      data: ConfirmBookingRequest;
    }) => {
      return bookingsApi.confirm(bookingId, data);
    },
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKING, data.id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_BOOKINGS] });

      if (data.status === 'CONFIRMED') {
        toast.success('Payment successful!', {
          description: 'Your booking has been confirmed.',
        });
      } else if (data.status === 'CANCELLED') {
        toast.error('Payment failed', {
          description: 'Your booking has been cancelled.',
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to process payment', {
        description: error.message,
      });
    },
  });
};

/**
 * Fetch booking by ID query
 */
export const useBooking = (bookingId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOKING, bookingId],
    queryFn: () => bookingsApi.getById(bookingId),
    enabled: !!bookingId,
    refetchInterval: (data) => {
      // Auto-refresh pending bookings every 10 seconds
      return data?.status === 'PENDING' ? 10000 : false;
    },
  });
};

/**
 * Fetch user's bookings query
 */
export const useUserBookings = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_BOOKINGS, userId],
    queryFn: () => bookingsApi.getByUser(userId),
    enabled: !!userId,
  });
};