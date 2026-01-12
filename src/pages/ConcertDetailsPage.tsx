import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { TicketSelector } from '@/components/booking/TicketSelector';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { useConcert } from '@/hooks/useConcerts';
import { useBookingStore } from '@/store/bookingStore';
import { formatDate, formatTime } from '@/utils/formatters';
import { useCreateBooking } from '@/hooks/useBookings';
import { toast } from 'sonner';

export const ConcertDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: concert, isLoading } = useConcert(id!);
  const { items, userId, clearCart } = useBookingStore();
  const createBooking = useCreateBooking();

  const handleCheckout = async () => {
    if (!concert || items.length === 0) {
      toast.error('Please select tickets');
      return;
    }

    console.log('Checkout initiated', userId, concert.id, items);

    try {
      const booking = await createBooking.mutateAsync({
        userId,
        concertId: concert.id,
        items
      });

      clearCart();
      navigate(`/booking-success/${booking.id}`);
    } catch (error) {
      // Error already handled by the mutation
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (!concert) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Concert not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={20} />}
          onClick={() => navigate('/')}
          className="mb-6"
        >
          Back to Concerts
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Concert Header */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {concert.name}
              </h1>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-gray-400" />
                  <span className="text-lg">{concert.venue}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-400" />
                  <span className="text-lg">
                    {formatDate(concert.eventDate)} at{' '}
                    {formatTime(concert.eventDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Ticket Selection */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Select Your Tickets
              </h2>
              <div className="space-y-4">
                {concert.ticketTiers.map((tier) => (
                  <TicketSelector key={tier.id} tier={tier} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              concert={concert}
              onCheckout={handleCheckout}
              isLoading={createBooking.isPending}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
