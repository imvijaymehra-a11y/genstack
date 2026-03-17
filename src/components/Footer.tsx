import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold">GenStacker</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Generate high-quality content 10x faster with AI. Professional blog posts, SEO titles, product descriptions, YouTube scripts, and ad copy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 GenStacker. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-2.006.928-2.006 2.023v2.36h3.637l-.587 3.47h-3.05v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-4.594 3.417 4.932 4.932 0 00-2.22-.084 4.935 4.935 0 004.6 3.417 4.938 4.938 0 003.127-1.184 4.958 4.958 0 002.163 2.723 10.02 10.02 0 01-2.825.775 4.938 4.938 0 00-4.6 3.417 4.932 4.932 0 002.22.084 4.935 4.935 0 00-4.594-3.417 4.958 4.958 0 00-2.163 2.723 10.02 10.02 0 01-2.825-.775 4.938 4.938 0 003.127 1.184 4.958 4.958 0 002.163-2.723 4.935 4.935 0 004.6-3.417 4.932 4.932 0 00-2.22-.084 4.935 4.935 0 004.594 3.417 4.958 4.958 0 002.163-2.723 10.02 10.02 0 012.825.775z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.462 3.228.07 3.608.07 4.85 0 3.204-.012 3.584-.07 4.85-.07 3.252-.148 4.771-1.691 4.919-4.919.462-3.228.07-3.608.07-4.85 0-3.204.012-3.584.07-4.85.07-3.252-.148-4.771-1.691-4.919-4.919-.462-3.228-.07-3.608-.07-4.85 0-3.204.012-3.584.07-4.85.07-3.252.148-4.771 1.691-4.919 4.919-.462 3.228-.07 3.608-.07 4.85zm-4.85 20.674c-2.548 0-4.617-2.069-4.617-4.617s2.069-4.617 4.617-4.617 4.617 2.069 4.617 4.617-2.069 4.617-4.617 4.617zm0-7.426c-1.545 0-2.809 1.264-2.809 2.809s1.264 2.809 2.809 2.809 2.809-1.264 2.809-2.809-1.264-2.809-2.809-2.809z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
