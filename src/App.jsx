import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';

function App() {
  // Cart state persisted with localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  });

  // Slide-over cart drawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Add product to cart handler
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Increment quantity
        const updated = [...prevCart];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: (updated[existingItemIndex].quantity || 1) + 1,
        };
        return updated;
      } else {
        // Add new product with initial quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Show temporary toast notification
    setToastMessage(`"${product.title.slice(0, 24)}..." added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Quantity updates
  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove single item
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Total cart price calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Navbar Component */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Announcement Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-medium py-2.5 px-4 text-center">
        ⚡ Special Launch Deal: Flat 20% off with coupon code <span className="font-mono bg-white/20 px-2 py-0.5 rounded font-bold">KODR20</span> on checkout!
      </div>

      {/* Hero Showcase Banner */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Next-Gen Electronics
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Upgrade Your Everyday Tech Gear.
              </h1>
              <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
                Experience high-performance electronics crafted for creators, professionals, and tech enthusiasts.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200"
                >
                  Explore 4 Featured Products
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="w-full h-72 rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80"
                  alt="Modern Tech Products"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white text-sm font-medium">
                    Verified Authentic • Fast Courier Dispatch • 1 Year Warranty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Section Component */}
      <main className="flex-1">
        <ProductSection onAddToCart={handleAddToCart} />
      </main>

      {/* 3. Footer Component */}
      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700 animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Slide-over Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900">Your Shopping Cart</h3>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
                    {cart.reduce((s, i) => s + (i.quantity || 1), 0)} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Body: Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900">Your cart is empty</h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs">
                      Looks like you haven't added anything yet. Browse our 4 featured products above!
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 truncate">
                          {item.title}
                        </h4>
                        <div className="text-xs font-bold text-indigo-600 mt-0.5">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-100 text-xs font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-gray-800 min-w-4 text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-100 text-xs font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer: Subtotal and Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Saved in LocalStorage</span>
                    <span className="text-emerald-600 font-semibold">Auto-Synced ✓</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-gray-900">
                    <span>Subtotal</span>
                    <span className="text-base text-indigo-600">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => alert(`Order placed for ₹${subtotal.toLocaleString('en-IN')}! Thank you for shopping with KODR Store.`)}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-indigo-200 active:scale-98 cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-center text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors cursor-pointer"
                  >
                    Clear All Items
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;