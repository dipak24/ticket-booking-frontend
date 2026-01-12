import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ShoppingCart, User } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { Button } from '../ui/Button';
import { ROUTES } from '@/constants/config';

export const Header: React.FC = () => {
  const { getTotalQuantity } = useBookingStore();
  const cartCount = getTotalQuantity();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <Ticket size={28} />
            <span className="text-xl font-bold hidden sm:block">
              Ticket Booking
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {/* Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                icon={<ShoppingCart size={20} />}
                onClick={() => {
                  /* Todo: Cart logic */
                }}
              >
                <span className="hidden sm:inline">Cart</span>
              </Button>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {/* My Bookings */}
            <Button
              variant="ghost"
              size="sm"
              icon={<User size={20} />}
              onClick={() => {
                // TODO:  My booking page
              }}
            >
              <span className="hidden sm:inline">My Bookings</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
