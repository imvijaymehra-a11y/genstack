'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Settings, 
  LogOut, 
  Crown,
  Zap,
  FileText,
  Clock,
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getUserUsage } from '@/lib/supabase';
import { tools } from '@/lib/tools';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [usage, setUsage] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/auth/login');
          return;
        }

        setUser(user);
        
        // Fetch user's daily usage
        const dailyUsage = await getUserUsage(user.id);
        setUsage(dailyUsage);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/');
        } else if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const getMostUsedTool = () => {
    // This would typically come from your database
    // For now, return the first tool as a placeholder
    return tools[0];
  };

  const getUsagePercentage = () => {
    const dailyLimit = 10; // Free plan limit
    return Math.min((usage / dailyLimit) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const isPro = user.plan === 'pro';
  const mostUsedTool = getMostUsedTool();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user.user_metadata?.full_name || user.email}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your AI tools usage overview and account information.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Today's Usage */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Today</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {usage}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generations used
              </p>
            </div>
          </div>

          {/* Plan Status */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                {isPro ? (
                  <Crown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                ) : (
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Plan</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                {isPro ? 'Pro' : 'Free'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isPro ? 'Unlimited usage' : '10/day limit'}
              </p>
            </div>
          </div>

          {/* Most Used Tool */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Most Used</span>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {mostUsedTool.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {mostUsedTool.category}
              </p>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Member Since</span>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Account age
              </p>
            </div>
          </div>
        </div>

        {/* Usage Progress */}
        {!isPro && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Daily Usage Progress
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {usage}/10 generations
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-300"
                style={{ width: `${getUsagePercentage()}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {10 - usage} generations remaining today
              </span>
              {usage >= 8 && (
                <Link
                  href="/pricing"
                  className="flex items-center text-primary hover:text-primary/90 font-medium transition-colors"
                >
                  <ArrowUp className="h-4 w-4 mr-1" />
                  Upgrade to Pro
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Start */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Start
            </h2>
            <div className="space-y-3">
              <Link
                href="/tools"
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Sparkles className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Browse All Tools</span>
              </Link>
              <Link
                href={`/tools/${mostUsedTool.slug}`}
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Zap className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Use {mostUsedTool.name}</span>
              </Link>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Account Settings
            </h2>
            <div className="space-y-3">
              <button className="flex items-center w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Account Settings</span>
              </button>
              <button className="flex items-center w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Usage History</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <LogOut className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
                <span className="text-red-700 dark:text-red-400">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <Link
              href="/dashboard/history"
              className="text-sm text-primary hover:text-primary/90 transition-colors"
            >
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {usage > 0 ? (
              <>
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mr-4">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Generated content with {mostUsedTool.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Just now
                    </p>
                  </div>
                </div>
                
                {/* Placeholder activities */}
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-60">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Generated content with Blog Generator
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      2 hours ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-60">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full mr-4">
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Generated content with Email Writer
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Yesterday
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No activity yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start using our AI tools to see your activity here.
                </p>
                <Link
                  href="/tools"
                  className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Creating
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
