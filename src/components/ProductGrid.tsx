import { useState } from 'react';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export function ProductGrid() {
  const { addItem } = useCart();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="shop" className="py-24 px-6 max-w-7xl mx-auto relative">
      {/* Hand-drawn accent */}
      <div className="absolute top-12 right-12 text-5xl font-hand transform rotate-12 z-10 hidden md:block">
        Fresh drops!
      </div>

      <div className="flex justify-between items-end mb-12 border-b-4 border-black pb-4">
        <h2 className="font-sans font-black italic text-5xl md:text-7xl uppercase tracking-tighter">
          Drop 01
        </h2>
        <a href="#" className="hidden md:block text-sm font-black uppercase tracking-widest hover:text-gray-500 transition-colors">
          View All
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l-4 border-t-4 border-black bg-white">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="group relative border-r-4 border-b-4 border-black p-6 flex flex-col hover:bg-gray-50 transition-colors"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Hand-drawn sticker for first item */}
            {index === 0 && (
              <div className="absolute -top-4 -right-4 bg-white border-4 border-black rounded-full w-20 h-20 flex items-center justify-center z-20 transform rotate-12">
                <span className="font-hand text-2xl font-bold">NEW!</span>
              </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6 border-4 border-black flex-grow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Quick Add Overlay */}
              <div
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex flex-col items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-black italic uppercase tracking-widest text-sm bg-black px-4 py-2 border-2 border-white">
                    Quick Add
                  </span>
                  <div className="flex gap-2">
                    {(product.category === 'Tees' || product.category === 'Outerwear' || product.category === 'Bottoms') ? (
                      ['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={(e) => {
                            e.preventDefault();
                            addItem(product, size);
                          }}
                          className="bg-white text-black w-10 h-10 flex items-center justify-center font-black italic text-xs uppercase hover:bg-black hover:text-white transition-colors border-2 border-black"
                        >
                          {size}
                        </button>
                      ))
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addItem(product, 'OS');
                        }}
                        className="bg-white text-black px-6 py-3 font-black italic text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors border-2 border-black"
                      >
                        OS
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex justify-between items-start mt-auto">
              <div>
                <h3 className="font-sans font-black italic text-xl uppercase tracking-tight">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 font-bold uppercase tracking-widest">{product.category}</p>
              </div>
              <span className="text-lg font-black">${product.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center md:hidden">
        <a href="#" className="inline-block border-4 border-black px-8 py-4 text-sm font-black italic uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
          View All Products
        </a>
      </div>
    </section>
  );
}
