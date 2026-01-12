import { useCallback } from 'react';

/**
 * Generate unique idempotency keys for booking requests
 * Simple implementation without external dependencies
 */
export const useIdempotencyKey = () => {
  const generate = useCallback(() => {
    return `booking-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }, []);

  return { generate };
};

/**
 * Standalone function to generate idempotency key
 */
export const generateIdempotencyKey = (): string => {
  return `booking-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};