'use client';
import { useAuth } from '@/hooks/useAuth';

export default function SummaryPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-8 dark:text-gray-200">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Order Summary</h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b dark:border-gray-700 pb-4">
            <span className="font-medium dark:text-gray-300">Total Products</span>
            <span className="dark:text-gray-300">3</span>
          </div>
          <div className="flex justify-between items-center border-b dark:border-gray-700 pb-4">
            <span className="font-medium dark:text-gray-300">Total Amount</span>
            <span className="dark:text-gray-300">$449.97</span>
          </div>
          <button className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 