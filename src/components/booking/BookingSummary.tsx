import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { useBookingStore } from '@/store/bookingStore';
import { Concert } from '@/types/concert.types';
import {
  formatCurrency,
  formatTierName,
  formatTicketCount
} from '@/utils/formatters';
import { ShoppingCart } from 'lucide-react';

interface BookingSummaryProps {
  concert: Concert;
  onCheckout: () => void;
  isLoading?: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  concert,
  onCheckout,
  isLoading
}) => {
  const { items } = useBookingStore();

  const selectedItems = items.map((item) => {
    const tier = concert.ticketTiers.find((t) => t.id === item.ticketTierId);
    return {
      ...item,
      tier
    };
  });

  const totalAmount = selectedItems.reduce((sum, item) => {
    return sum + (item.tier?.price || 0) * item.quantity;
  }, 0);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <Card className="sticky top-24">
        <CardBody>
          <div className="text-center py-8">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">No tickets selected</p>
            <p className="text-sm text-gray-500 mt-2">
              Select tickets to continue
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Booking Summary</h3>
      </CardHeader>

      <CardBody>
        {/* Concert Info */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">{concert.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{concert.venue}</p>
        </div>

        {/* Selected Tickets */}
        <div className="space-y-3 mb-4">
          {selectedItems.map((item) => (
            <div
              key={item.ticketTierId}
              className="flex justify-between items-start"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {formatTierName(item.tier?.tierType || '')}
                </p>
                <p className="text-sm text-gray-600">
                  {formatTicketCount(item.quantity)} ×{' '}
                  {formatCurrency(item.tier?.price || 0)}
                </p>
              </div>
              <p className="font-semibold text-gray-900">
                {formatCurrency((item.tier?.price || 0) * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="pt-4 border-t-2 border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">
              Total ({formatTicketCount(totalQuantity)}):
            </span>
            <span className="text-2xl font-bold text-primary-600">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
      </CardBody>

      <CardFooter>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onCheckout}
          isLoading={isLoading}
        >
          Proceed to Checkout
        </Button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Your tickets will be reserved for 10 minutes
        </p>
      </CardFooter>
    </Card>
  );
};
