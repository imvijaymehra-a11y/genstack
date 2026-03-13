'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from './Toast';

interface LogoutButtonProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function LogoutButton({ 
  className = '', 
  variant = 'default',
  size = 'md'
}: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogout = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        showToast({
          type: 'error',
          title: 'Logout Failed',
          message: 'There was an error signing you out. Please try again.',
        });
      } else {
        showToast({
          type: 'success',
          title: 'Logged Out Successfully',
          message: 'You have been logged out of your account.',
        });
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Logout Failed',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const getButtonStyles = () => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-6 py-3 text-base rounded-lg'
    };

    const variantStyles = {
      default: 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md',
      ghost: 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400',
      outline: 'border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
    };

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  };

  const getIconSize = () => {
    const sizes = {
      sm: 'h-4 w-4',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    };
    return sizes[size];
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={getButtonStyles()}
    >
      {loading ? (
        <>
          <Loader2 className={`animate-spin ${getIconSize()}`} />
          <span className="ml-2">Signing out...</span>
        </>
      ) : (
        <>
          <LogOut className={getIconSize()} />
          <span className="ml-2">Sign Out</span>
        </>
      )}
    </button>
  );
}
