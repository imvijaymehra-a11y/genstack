import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                GenStacker
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Your all-in-one AI companion for creating copy, images, and ideas at lightning speed. 
              41 smart tools to help you write, design, and grow.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/tools" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/refund-policy" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} GenStacker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
