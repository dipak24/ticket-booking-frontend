import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ConcertWithAvailability } from '@/types/concert.types';
import { formatDate, formatTime, formatCurrency } from '@/utils/formatters';

interface ConcertCardProps {
  concert: ConcertWithAvailability;
}

export const ConcertCard: React.FC<ConcertCardProps> = ({ concert }) => {
  const navigate = useNavigate();

  return (
    <Card hover onClick={() => navigate(`/concerts/${concert.id}`)}>
      {/* Header */}
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {concert.name}
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span>{concert.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span>
                  {formatDate(concert.eventDate)} at{' '}
                  {formatTime(concert.eventDate)}
                </span>
              </div>
            </div>
          </div>
          {concert.hasAvailableTickets ? (
            <Badge variant="success">Available</Badge>
          ) : (
            <Badge variant="error">Sold Out</Badge>
          )}
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Ticket size={16} />
            <span className="text-sm">
              {concert.ticketTiers.length} ticket types
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">From</p>
            <p className="text-xl font-bold text-primary-600">
              {formatCurrency(concert.lowestPrice)}
            </p>
          </div>
        </div>
      </CardBody>

      {/* Footer */}
      <CardFooter>
        <Button
          variant="primary"
          size="md"
          className="w-full"
          disabled={!concert.hasAvailableTickets}
        >
          {concert.hasAvailableTickets ? 'Book Tickets' : 'Sold Out'}
        </Button>
      </CardFooter>
    </Card>
  );
};
