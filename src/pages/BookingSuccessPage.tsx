import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PaymentSimulator } from '@/components/booking/PaymentSimulator';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { useBooking, useConfirmBooking } from '@/hooks/useBookings';
import {
  formatCurrency,
  formatDateTime,
  formatRemainingTime,
  formatTierName,
  getRemainingMinutes
} from '@/utils/formatters';

export const BookingSuccessPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { data: booking, isLoading } = useBooking(bookingId!);
  const confirmBooking = useConfirmBooking();
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!booking?.expiresAt) return;

    const updateTimer = () => {
      const minutes = getRemainingMinutes(booking.expiresAt!);
      if (minutes <= 0) {
        setTimeRemaining('Expired');
      } else {
        setTimeRemaining(formatRemainingTime(booking.expiresAt!));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [booking?.expiresAt]);

  const handlePaymentSuccess = async () => {
    await confirmBooking.mutateAsync({
      bookingId: bookingId!,
      data: { paymentSuccess: true }
    });
  };

  const handlePaymentFailure = async () => {
    await confirmBooking.mutateAsync({
      bookingId: bookingId!,
      data: { paymentSuccess: false }
    });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (!booking) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Booking not found</p>
        </div>
      </Layout>
    );
  }

  const isPending = booking.status === 'PENDING';
  const isConfirmed = booking.status === 'CONFIRMED';
  const isCancelled = booking.status === 'CANCELLED';
  const isExpired = booking.status === 'EXPIRED';

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Status Banner */}
        <div className="text-center">
          {isConfirmed && (
            <div className="inline-flex items-center gap-3 bg-green-50 text-green-800 px-6 py-4 rounded-lg">
              <CheckCircle size={32} />
              <div className="text-left">
                <h2 className="text-xl font-bold">Booking Confirmed!</h2>
                <p className="text-sm">Your tickets have been secured</p>
              </div>
            </div>
          )}

          {isPending && (
            <div className="inline-flex items-center gap-3 bg-yellow-50 text-yellow-800 px-6 py-4 rounded-lg">
              <Clock size={32} />
              <div className="text-left">
                <h2 className="text-xl font-bold">Payment Pending</h2>
                <p className="text-sm">
                  Complete payment within {timeRemaining}
                </p>
              </div>
            </div>
          )}

          {(isCancelled || isExpired) && (
            <div className="inline-flex items-center gap-3 bg-red-50 text-red-800 px-6 py-4 rounded-lg">
              <AlertCircle size={32} />
              <div className="text-left">
                <h2 className="text-xl font-bold">
                  {isExpired ? 'Booking Expired' : 'Booking Cancelled'}
                </h2>
                <p className="text-sm">
                  {isExpired
                    ? 'Your reservation has expired'
                    : 'Payment was not completed'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Booking Details</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Booking Reference</p>
                  <p className="text-lg font-mono font-bold text-primary-600">
                    {booking.bookingReference}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge
                    variant={
                      isConfirmed ? 'success' : isPending ? 'warning' : 'error'
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Concert</p>
                  <p className="font-semibold">{booking.concertName}</p>
                  <p className="text-sm text-gray-600">
                    {booking.concertVenue}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Event Date</p>
                  <p className="font-semibold">
                    {formatDateTime(booking.eventDate)}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Tickets</p>
                  <div className="space-y-2">
                    {booking.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.quantity}x {formatTierName(item.tierType)}
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(item.subtotal)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatCurrency(booking.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Payment Section */}
          {isPending && (
            <PaymentSimulator
              amount={booking.totalAmount}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
              isLoading={confirmBooking.isPending}
            />
          )}

          {isConfirmed && (
            <Card>
              <CardBody>
                <div className="text-center py-8">
                  <CheckCircle
                    size={64}
                    className="mx-auto text-green-500 mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your tickets have been confirmed and sent to your email.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/my-bookings')}
                  >
                    View My Bookings
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};
