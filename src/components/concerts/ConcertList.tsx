import React from 'react';
import { ConcertCard } from './ConcertCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useConcerts } from '@/hooks/useConcerts';
import { AlertCircle } from 'lucide-react';

export const ConcertList: React.FC = () => {
  const { data: concerts, isLoading, error } = useConcerts();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading concerts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Failed to load concerts
        </h3>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'Please try again later'}
        </p>
      </div>
    );
  }

  if (!concerts || concerts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          No concerts available at the moment.
        </p>
        <p className="text-gray-500 mt-2">Check back soon for new events!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} />
      ))}
    </div>
  );
};
