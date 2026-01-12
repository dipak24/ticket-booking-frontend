import React from 'react';
import { Sparkles } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ConcertList } from '@/components/concerts/ConcertList';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={32} className="text-primary-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Upcoming Concerts
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book your tickets now with guaranteed seat availability and secure
            transactions
          </p>
        </div>

        {/* Concert List */}
        <ConcertList />
      </div>
    </Layout>
  );
};
