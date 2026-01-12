import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { useUserBookings } from '@/hooks/useBookings';
import { useBookingStore } from '@/store/bookingStore';
import {
  formatCurrency,
  formatDateTime,
  formatTierName,
  getStatusColorClass
} from '@/utils/formatters';

export const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useBookingStore();
  const { data: bookings, isLoading } = useUserBookings(userId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

          <Card>
            <CardBody>
              <div className="text-center py-12">
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Bookings Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't made any bookings. Start by browsing available
                  concerts!
                </p>
                <Button variant="primary" onClick={() => navigate('/')}>
                  Browse Concerts
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} hover>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {booking.concertName}
                      </h3>
                      <Badge variant={getStatusColorClass(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{booking.concertVenue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{formatDateTime(booking.eventDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Ref:</p>
                    <p className="text-sm font-mono font-bold text-gray-900">
                      {booking.bookingReference}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tickets */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Tickets:
                    </p>
                    <div className="space-y-1">
                      {booking.items.map((item) => (
                        <p key={item.id} className="text-sm text-gray-600">
                          {item.quantity}x {formatTierName(item.tierType)}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {formatCurrency(booking.totalAmount)}
                    </p>
                  </div>
                </div>
              </CardBody>

              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight size={16} />}
                  onClick={() => navigate(`/booking-success/${booking.id}`)}
                  className="ml-auto"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};
