'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function VerifyPage() {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (!token || type !== 'signup') {
        setError('Invalid verification link');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.auth.verifyOtp({
          token,
          type: 'signup',
        });

        if (error) {
          setError(error.message);
        } else if (data.user) {
          setVerified(true);
          setEmail(data.user.email || '');
          // Auto redirect after 3 seconds
          setTimeout(() => {
            router.push('/tools');
          }, 3000);
        }
      } catch (err) {
        setError('An unexpected error occurred during verification');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  const handleResendEmail = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        setError(error.message);
      } else {
        setVerified(false);
        setError('');
        // Show success message
      }
    } catch (err) {
      setError('Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
        <Navbar />
        
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Verifying your email...
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we confirm your account.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-green-950">
        <Navbar />
        
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Email Verified!
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Welcome to GenStacker! Your account has been successfully verified.
              </p>

              {/* User Info */}
              {email && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center text-green-800 dark:text-green-400">
                    <Mail className="h-5 w-5 mr-2" />
                    <span className="font-medium">{email}</span>
                  </div>
                </div>
              )}

              {/* Auto-redirect notice */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-indigo-800 dark:text-indigo-400">
                  Redirecting you to the tools page in <span id="countdown">3</span> seconds...
                </p>
              </div>

              {/* Manual redirect button */}
              <Link
                href="/tools"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Go to Tools Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              {/* Countdown timer */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    let count = 3;
                    const countdown = document.getElementById('countdown');
                    const timer = setInterval(() => {
                      count--;
                      if (countdown) countdown.textContent = count;
                      if (count === 0) clearInterval(timer);
                    }, 1000);
                  `,
                }}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Verification Failed
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {error || 'We couldn\'t verify your email. The link may have expired or is invalid.'}
            </p>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleResendEmail}
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Resend Verification Email
                    <Mail className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>

              <Link
                href="/auth/login"
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium rounded-lg transition-all duration-200"
              >
                Back to Login
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              <p>Need help? Contact our support team</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
