'use client';
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { useAuth } from '@/hooks/useAuth';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();
  const { user } = useAuth(false);

  useEffect(() => {
    if (!user) {
      router.push('/signin');
      return;
    }

    if (user?.emailVerified) {
      router.push('/products');
      return;
    }

    setLoading(false);
  }, [user, router]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResendVerification = async () => {
    try {
      if (!user) return;
      
      await sendEmailVerification(user);
      setMessage('Verification email sent! Please check your inbox.');
      setCountdown(60); // Reset countdown
      setError('');
    } catch (error) {
      setError('Failed to send verification email: ' + error.message);
    }
  };

  // Check verification status periodically
  useEffect(() => {
    if (!user) return;

    const checkVerification = async () => {
      try {
        await user.reload();
        if (auth.currentUser?.emailVerified) {
          router.push('/products');
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      }
    };

    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-gray-100">
          Verify Your Email
        </h1>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            We've sent a verification email to:
            <br />
            <span className="font-medium">{user?.email}</span>
          </p>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {message && (
            <p className="text-green-500 text-sm text-center">{message}</p>
          )}

          <div className="text-center">
            <button
              onClick={handleResendVerification}
              disabled={countdown > 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                countdown > 0
                  ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {countdown > 0
                ? `Resend email in ${countdown}s`
                : 'Resend verification email'}
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Please check your email and click the verification link to continue.
            <br />
            Don't forget to check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
} 