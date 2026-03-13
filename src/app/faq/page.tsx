'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HelpCircle, CreditCard, Shield, Zap, Users, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    question: "How do I get started with GenStacker?",
    answer: "Getting started is easy! Simply sign up for a free account using your email or Google account. Once registered, you'll have instant access to 10 free AI generations per day across all 41 tools. No credit card required for the free plan.",
    category: "Getting Started"
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes: 10 AI generations per day, access to all 41 AI tools, basic email support, and the ability to save your favorite tools. It's perfect for trying out our platform and occasional use.",
    category: "Getting Started"
  },
  {
    question: "Do I need to provide my credit card for the free trial?",
    answer: "No credit card is required to start with our free plan. You can sign up and use 10 generations per day completely free. Only upgrade to Pro when you're ready for unlimited access.",
    category: "Getting Started"
  },

  // Pricing & Billing
  {
    question: "How much does the Pro plan cost?",
    answer: "The Pro plan costs $29 per month and includes unlimited AI generations, access to all 41 tools, priority support, early access to new features, and commercial usage rights for generated content.",
    category: "Pricing & Billing"
  },
  {
    question: "Can I change or cancel my subscription anytime?",
    answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately, and you'll keep access to your paid features until the end of your current billing period.",
    category: "Pricing & Billing"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through Stripe.",
    category: "Pricing & Billing"
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee for new Pro plan subscriptions. If you're not satisfied, contact our support team within 14 days of your purchase for a full refund.",
    category: "Pricing & Billing"
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees! The price you see is the price you pay. All features included in your plan are available without additional charges. API usage and tool access are unlimited on the Pro plan.",
    category: "Pricing & Billing"
  },

  // Features & Tools
  {
    question: "How many AI tools are available?",
    answer: "GenStacker offers 41 different AI tools across 6 categories: AI Writing Tools, Creator Tools, Business Productivity Tools, Marketing & SEO Tools, Image Tools, and AI Prompt Tools.",
    category: "Features & Tools"
  },
  {
    question: "Can I use generated content commercially?",
    answer: "Yes! Pro plan users have full commercial usage rights for all generated content. Free plan users can use content for personal projects but should upgrade to Pro for commercial use.",
    category: "Features & Tools"
  },
  {
    question: "How accurate are the AI-generated results?",
    answer: "Our AI models are state-of-the-art and provide high-quality, contextually relevant results. However, we always recommend reviewing and editing generated content to ensure it meets your specific needs and standards.",
    category: "Features & Tools"
  },
  {
    question: "Can I save my generated content?",
    answer: "Yes, you can save, copy, and download all your generated content. Pro users also get access to a personal content library with search and organization features.",
    category: "Features & Tools"
  },

  // Technical Support
  {
    question: "What kind of support do you offer?",
    answer: "Free plan users receive email support within 48 hours. Pro plan users get priority email support within 24 hours, live chat during business hours, and access to our knowledge base.",
    category: "Technical Support"
  },
  {
    question: "Is there a mobile app available?",
    answer: "GenStacker is fully responsive and works great on mobile browsers. We're currently developing native iOS and Android apps, which will be available to Pro users first.",
    category: "Technical Support"
  },
  {
    question: "What browsers do you support?",
    answer: "GenStacker works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience.",
    category: "Technical Support"
  },
  {
    question: "Is there an API available?",
    answer: "Yes, Pro plan users get access to our API for integrating GenStacker tools into their own applications. API documentation and developer support are included.",
    category: "Technical Support"
  },

  // Privacy & Security
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We use industry-standard encryption, secure data storage, and never sell your data. Your generated content is private and only accessible to you unless you choose to share it.",
    category: "Privacy & Security"
  },
  {
    question: "How do you use my data?",
    answer: "We use your data solely to provide and improve our services. We analyze anonymized usage patterns to enhance our tools but never share personal information with third parties without your consent.",
    category: "Privacy & Security"
  },
  {
    question: "Can I delete my account and data?",
    answer: "Yes, you can delete your account at any time from your account settings. This permanently removes all your data and generated content from our servers within 30 days.",
    category: "Privacy & Security"
  },

  // Account Management
  {
    question: "Can I have multiple users on one account?",
    answer: "Each account is for individual use. For team or business needs, we offer enterprise plans with multiple user seats, centralized billing, and administrative controls.",
    category: "Account Management"
  },
  {
    question: "What happens if I exceed my daily limit?",
    answer: "Free plan users who exceed their 10-generation daily limit can upgrade to Pro for unlimited access or wait until the next day when their limit resets. Pro users have no daily limits.",
    category: "Account Management"
  },
  {
    question: "Can I change my email address?",
    answer: "Yes, you can update your email address from your account settings. We'll send a verification email to your new address to confirm the change.",
    category: "Account Management"
  }
];

const categoryIcons: Record<string, any> = {
  "Getting Started": HelpCircle,
  "Pricing & Billing": CreditCard,
  "Privacy & Security": Shield,
  "Features & Tools": Zap,
  "Technical Support": Settings,
  "Account Management": Users,
};

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(faqData.map(item => item.category)))];
  
  const filteredFAQs = selectedCategory === "All" 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about GenStacker, our AI tools, pricing, and more.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border transition-colors flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-primary text-white border-primary"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {category}
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => {
            const actualIndex = faqData.indexOf(item);
            const isExpanded = expandedItems.has(actualIndex);
            const Icon = categoryIcons[item.category];
            
            return (
              <div
                key={actualIndex}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleExpanded(actualIndex)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-5 w-5 text-primary flex-shrink-0" />}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.question}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-4">
                    <div className="pl-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/auth/signup"
              className="inline-flex items-center px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
            >
              Try GenStacker Free
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Browse our help documentation
            </p>
            <a href="#" className="text-primary hover:text-primary/90 text-sm font-medium">
              View Documentation →
            </a>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Community
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Join our user community
            </p>
            <a href="#" className="text-primary hover:text-primary/90 text-sm font-medium">
              Join Discord →
            </a>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Quick Start
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Get started in 5 minutes
            </p>
            <a href="/auth/signup" className="text-primary hover:text-primary/90 text-sm font-medium">
              Start Free Trial →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
