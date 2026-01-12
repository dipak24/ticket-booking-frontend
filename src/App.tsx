import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

// Pages
import { HomePage } from './pages/HomePage';
import { ConcertDetailsPage } from './pages/ConcertDetailsPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { MyBookingsPage } from './pages/MyBookingsPage';

// Error Boundary
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { NotFound } from './components/common/NotFound';

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5000
    },
    mutations: {
      retry: 0
    }
  }
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/concerts/:id" element={<ConcertDetailsPage />} />
            <Route
              path="/booking-success/:bookingId"
              element={<BookingSuccessPage />}
            />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#1f2937',
                border: '1px solid #e5e7eb'
              }
            }}
          />
        </BrowserRouter>

        {/* React Query DevTools (only in development) */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
