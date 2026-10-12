import React, { useState } from 'react';

// 4 Curated Products
const PRODUCTS = [
  {
    id: 1,
    title: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Audio & Music',
    price: 24999,
    originalPrice: 29990,
    discount: '17% OFF',
    rating: 4.9,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
    description: 'Industry-leading noise cancellation, crystal-clear hands-free calling, and up to 30-hour battery life.',
    tag: 'Best Seller'
  },
  {
    id: 2,
    title: 'Apple Watch Series 9 GPS 45mm',
    category: 'Wearables',
    price: 41999,
    originalPrice: 44900,
    discount: '6% OFF',
    rating: 4.8,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80',
    description: 'S9 chip with magic Double Tap gesture, brighter display, and advanced health sensors.',
    tag: 'Trending'
  },
  {
    id: 3,
    title: 'Keychron K2 RGB Mechanical Keyboard',
    category: 'Computer Gear',
    price: 7499,
    originalPrice: 9999,
    discount: '25% OFF',
    rating: 4.7,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80',
    description: 'Wireless Bluetooth compact 75% mechanical keyboard with tactile Gateron G Pro switches.',
    tag: 'Staff Pick'
  },
  {
    id: 4,
    title: 'Bellroy Classic Everyday Leather Backpack',
    category: 'Lifestyle & Bags',
    price: 9499,
    originalPrice: 12999,
    discount: '27% OFF',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80',
    description: 'Water-resistant recycled fabric with premium eco-tanned leather accents and padded laptop sleeve.',
    tag: 'New Arrival'
  }
];

const ProductSection = ({ onAddToCart }) => {
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Trending Today
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Featured Products
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-xl">
              Handpicked premium tech and lifestyle essentials designed for everyday performance.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-sm font-medium text-gray-500">
            Showing <span className="font-bold text-gray-900">{PRODUCTS.length}</span> curated items
          </div>
        </div>

        {/* 4 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PRODUCTS.map((product) => {
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Tag */}
                  <span className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                    {product.tag}
                  </span>

                  {/* Discount */}
                  <span className="absolute top-3 right-3 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                    {product.discount}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="text-xs font-medium text-indigo-600 mb-1">
                    {product.category}
                  </div>

                  <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h3>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1.5 mt-2 mb-3">
                    <div className="flex text-amber-400 text-sm">
                      {'★'.repeat(5)}
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price & Add to Cart button */}
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      type="button"
                      disabled={isJustAdded}
                      className={`relative inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white shadow-emerald-200'
                          : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-sm hover:shadow-indigo-200'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductSection;
