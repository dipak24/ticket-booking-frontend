import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingItem } from '@/types/booking.types';

interface BookingState {
  // Current user (mock - in production would come from auth)
  userId: string;
  
  // Selected concert for booking
  selectedConcertId: string | null;
  
  // Cart items
  items: BookingItem[];
  
  // Actions
  setUserId: (userId: string) => void;
  setSelectedConcert: (concertId: string) => void;
  addItem: (item: BookingItem) => void;
  updateItemQuantity: (ticketTierId: string, quantity: number) => void;
  removeItem: (ticketTierId: string) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      // Initial state - generate random user ID
      userId: crypto.randomUUID(),
      selectedConcertId: null,
      items: [],

      // Set user ID
      setUserId: (userId) => set({ userId }),

      // Set selected concert and clear cart
      setSelectedConcert: (concertId) =>
        set({ selectedConcertId: concertId, items: [] }),

      // Add item to cart
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.ticketTierId === item.ticketTierId
          );

          if (existingItem) {
            // Update quantity of existing item
            return {
              items: state.items.map((i) =>
                i.ticketTierId === item.ticketTierId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          } else {
            // Add new item
            return {
              items: [...state.items, item],
            };
          }
        }),

      // Update item quantity
      updateItemQuantity: (ticketTierId, quantity) =>
        set((state) => ({
          items:
            quantity > 0
              ? state.items.map((i) =>
                  i.ticketTierId === ticketTierId ? { ...i, quantity } : i
                )
              : state.items.filter((i) => i.ticketTierId !== ticketTierId),
        })),

      // Remove item from cart
      removeItem: (ticketTierId) =>
        set((state) => ({
          items: state.items.filter((i) => i.ticketTierId !== ticketTierId),
        })),

      // Clear entire cart
      clearCart: () => set({ items: [], selectedConcertId: null }),

      // Get total quantity of all items
      getTotalQuantity: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({
        userId: state.userId,
        // Don't persist cart items (they expire anyway)
      }),
    }
  )
);