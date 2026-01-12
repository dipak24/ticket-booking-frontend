import React, { useState } from 'react';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '@/utils/formatters';

interface PaymentSimulatorProps {
  amount: number;
  onSuccess: () => void;
  onFailure: () => void;
  isLoading?: boolean;
}

export const PaymentSimulator: React.FC<PaymentSimulatorProps> = ({
  amount,
  onSuccess,
  onFailure,
  isLoading
}) => {
  const [selectedOption, setSelectedOption] = useState<
    'success' | 'failure' | null
  >(null);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CreditCard size={24} className="text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Payment Simulation
          </h3>
        </div>
      </CardHeader>

      <CardBody>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This is a simulated payment. No real
            transactions will be processed.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">Total Amount:</p>
          <p className="text-3xl font-bold text-primary-600">
            {formatCurrency(amount)}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setSelectedOption('success')}
            className={`w-full p-4 border-2 rounded-lg transition-all ${
              selectedOption === 'success'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle
                size={24}
                className={
                  selectedOption === 'success'
                    ? 'text-green-600'
                    : 'text-gray-400'
                }
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Simulate Success</p>
                <p className="text-sm text-gray-600">
                  Payment will be processed successfully
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedOption('failure')}
            className={`w-full p-4 border-2 rounded-lg transition-all ${
              selectedOption === 'failure'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <XCircle
                size={24}
                className={
                  selectedOption === 'failure'
                    ? 'text-red-600'
                    : 'text-gray-400'
                }
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Simulate Failure</p>
                <p className="text-sm text-gray-600">Payment will fail</p>
              </div>
            </div>
          </button>
        </div>
      </CardBody>

      <CardFooter>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={selectedOption === 'success' ? onSuccess : onFailure}
          disabled={!selectedOption || isLoading}
          isLoading={isLoading}
        >
          {selectedOption === 'success'
            ? 'Confirm Payment'
            : 'Simulate Failed Payment'}
        </Button>
      </CardFooter>
    </Card>
  );
};
