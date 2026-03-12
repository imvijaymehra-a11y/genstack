'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Star, 
  ArrowRight,
  Sparkles,
  Users,
  Shield,
  Headphones
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying out our AI tools',
      price: 0,
      yearlyPrice: 0,
      features: [
        '10 generations per day',
        'Access to all 41 AI tools',
        'Basic email support',
        'Standard processing speed',
        'Community access'
      ],
      limitations: [
        'Daily usage limits',
        'No priority support',
        'Standard features only'
      ],
      popular: false,
      buttonText: 'Get Started Free',
      buttonLink: '/auth/signup'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For professionals and power users',
      price: 19,
      yearlyPrice: 190,
      features: [
        'Unlimited generations',
        'Access to all 41 AI tools',
        'Priority email support',
        'Faster processing speed',
        'Advanced features',
        'Early access to new tools',
        'Custom AI model settings',
        'Export to multiple formats',
        'Team collaboration tools',
        'API access'
      ],
      limitations: [],
      popular: true,
      buttonText: 'Start Free Trial',
      buttonLink: '/auth/signup?plan=pro'
    }
  ];

  const faqs = [
    {
      question: 'Can I switch between plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences in billing.'
    },
    {
      question: 'What happens if I exceed my free plan limit?',
      answer: 'Free plan users get 10 generations per day. Once you reach the limit, you can upgrade to Pro for unlimited access or wait until the next day when your limit resets.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 14-day money-back guarantee for Pro plans. If you\'re not satisfied, contact our support team for a full refund.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and various international payment methods. All payments are processed securely through Stripe.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use industry-standard encryption and never share your data with third parties. Your generated content is yours to keep.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your Pro subscription at any time. You\'ll continue to have access until the end of your current billing period.'
    }
  ];

  const getDisplayPrice = (plan: typeof plans[0]) => {
    if (billingCycle === 'yearly' && plan.yearlyPrice > 0) {
      return (plan.yearlyPrice / 12).toFixed(0);
    }
    return plan.price;
  };

  const getYearlySavings = (plan: typeof plans[0]) => {
    if (plan.price === 0) return 0;
    const monthlyTotal = plan.price * 12;
    const savings = monthlyTotal - plan.yearlyPrice;
    return Math.round((savings / monthlyTotal) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Pay Only for What You Use
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Free forever for casual users; go Pro for unlimited power, priority support, and advanced features. Scale at your pace.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>
                
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    ${getDisplayPrice(plan)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-600 dark:text-gray-400">
                      /month
                    </span>
                  )}
                </div>
                
                {billingCycle === 'yearly' && plan.price > 0 && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Save ${plan.price * 12 - plan.yearlyPrice}/year ({getYearlySavings(plan)}% off)
                  </div>
                )}
              </div>

              <Link
                href={plan.buttonLink}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 mb-8 inline-block ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {plan.buttonText}
                <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </Link>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  What's included:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 dark:text-white mt-6">
                      Limitations:
                    </h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500 dark:text-gray-400">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Feature Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Free
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    Daily Generations
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">
                    10 per day
                  </td>
                  <td className="py-4 px-4 text-center text-green-600 dark:text-green-400 font-semibold">
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    AI Tools Access
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    Processing Speed
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">
                    Standard
                  </td>
                  <td className="py-4 px-4 text-center text-green-600 dark:text-green-400 font-semibold">
                    Priority
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    Support
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">
                    Email (48h)
                  </td>
                  <td className="py-4 px-4 text-center text-green-600 dark:text-green-400 font-semibold">
                    Priority (24h)
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    API Access
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    Team Collaboration
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to supercharge your content creation?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who are already creating amazing content with our AI tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Free
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Browse Tools
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
