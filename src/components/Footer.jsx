import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                KODR<span className="text-indigo-400">.</span>store
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for modern tech accessories, everyday gear, and premium electronics designed for your lifestyle.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Free shipping on orders over ₹999
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#products" className="hover:text-indigo-400 transition-colors">Featured Collection</a>
              </li>
              <li>
                <a href="#new" className="hover:text-indigo-400 transition-colors">New Arrivals</a>
              </li>
              <li>
                <a href="#offers" className="hover:text-indigo-400 transition-colors">Special Offers</a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-indigo-400 transition-colors">Best Sellers</a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#help" className="hover:text-indigo-400 transition-colors">Help Center / FAQs</a>
              </li>
              <li>
                <a href="#track" className="hover:text-indigo-400 transition-colors">Track Order</a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-indigo-400 transition-colors">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#returns" className="hover:text-indigo-400 transition-colors">Easy 7-Day Returns</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Stay in the Loop
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe for exclusive flash sales, product drops, and weekly discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shrink-0"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} KODR Store. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-gray-400 transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
