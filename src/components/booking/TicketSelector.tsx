import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { TicketTier } from '@/types/concert.types';
import {
  formatCurrency,
  formatTierName,
  getTierColorClass
} from '@/utils/formatters';
import { useBookingStore } from '@/store/bookingStore';
import { toast } from 'sonner';

interface TicketSelectorProps {
  tier: TicketTier;
}

export const TicketSelector: React.FC<TicketSelectorProps> = ({ tier }) => {
  const { items, addItem, updateItemQuantity } = useBookingStore();
  const [quantity, setQuantity] = useState(0);

  const existingItem = items.find((item) => item.ticketTierId === tier.id);
  const currentQuantity = existingItem?.quantity || 0;

  const handleIncrease = () => {
    if (currentQuantity >= 10) {
      toast.error('Maximum 10 tickets per tier');
      return;
    }
    if (currentQuantity >= tier.availableQuantity) {
      toast.error('Not enough tickets available');
      return;
    }

    const newQuantity = currentQuantity + 1;
    if (existingItem) {
      updateItemQuantity(tier.id, newQuantity);
    } else {
      addItem({ ticketTierId: tier.id, quantity: 1 });
    }
  };

  const handleDecrease = () => {
    if (currentQuantity > 0) {
      updateItemQuantity(tier.id, currentQuantity - 1);
    }
  };

  const isAvailable = tier.availableQuantity > 0;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        {/* Tier Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColorClass(
                tier.tierType
              )}`}
            >
              {formatTierName(tier.tierType)}
            </span>
            <span className="text-sm text-gray-500">
              {tier.availableQuantity} available
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(tier.price)}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3">
          {isAvailable ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecrease}
                disabled={currentQuantity === 0}
                icon={<Minus size={16} />}
              />
              <span className="text-xl font-semibold w-12 text-center">
                {currentQuantity}
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={handleIncrease}
                disabled={
                  currentQuantity >= tier.availableQuantity ||
                  currentQuantity >= 10
                }
                icon={<Plus size={16} />}
              />
            </>
          ) : (
            <span className="text-red-600 font-semibold">Sold Out</span>
          )}
        </div>
      </div>

      {/* Subtotal */}
      {currentQuantity > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-lg font-bold text-primary-600">
            {formatCurrency(tier.price * currentQuantity)}
          </span>
        </div>
      )}
    </Card>
  );
};
