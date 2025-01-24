'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth(false);

  useEffect(() => {
    if (user) {
      router.push('/products');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to Our Store
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Discover amazing products and great deals. Join our community of satisfied customers today!
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/login')}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Get Started
          </button>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account? Click above to sign in.
          </p>
        </div>
      </div>
    </div>
  );
}
