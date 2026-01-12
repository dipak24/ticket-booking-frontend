import { useQuery } from '@tanstack/react-query';
import { concertsApi } from '@/api/concerts.api';
import { QUERY_KEYS, QUERY_STALE_TIME } from '@/constants/config';
import { ConcertWithAvailability } from '@/types/concert.types';

/**
 * Fetch all concerts with enhanced data
 */
export const useConcerts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CONCERTS],
    queryFn: concertsApi.getAll,
    staleTime: QUERY_STALE_TIME.CONCERTS,
    select: (concerts): ConcertWithAvailability[] => {
      return concerts.map((concert) => {
        const hasAvailableTickets = concert.ticketTiers.some(
          (tier) => tier.availableQuantity > 0
        );
        const prices = concert.ticketTiers.map((tier) => tier.price);
        const lowestPrice = Math.min(...prices);
        const highestPrice = Math.max(...prices);

        return {
          ...concert,
          hasAvailableTickets,
          lowestPrice,
          highestPrice,
        };
      });
    },
  });
};

/**
 * Fetch single concert by ID
 */
export const useConcert = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CONCERT, id],
    queryFn: () => concertsApi.getById(id),
    staleTime: QUERY_STALE_TIME.CONCERTS,
    enabled: !!id,
  });
};