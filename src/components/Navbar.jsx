import React from 'react';

const Navbar = ({ cart, onOpenCart }) => {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-600 bg-clip-text text-transparent">
                KODR<span className="text-indigo-600">.</span>store
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                Official
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#home" className="text-indigo-600 hover:text-indigo-700 transition-colors">Home</a>
            <a href="#products" className="hover:text-indigo-600 transition-colors">Products</a>
            <a href="#featured" className="hover:text-indigo-600 transition-colors">Featured</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About Us</a>
          </nav>

          {/* Action Buttons: Cart Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              type="button"
              className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gray-900 text-white hover:bg-indigo-600 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-indigo-200 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Cart</span>
              
              {/* Badge */}
              <span className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold rounded-full transition-transform duration-300 ${
                totalItems > 0 
                  ? 'bg-amber-400 text-gray-900 scale-100' 
                  : 'bg-gray-700 text-gray-300 scale-90'
              }`}>
                {totalItems}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
