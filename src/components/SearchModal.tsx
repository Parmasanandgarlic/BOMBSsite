import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { addItem } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Focus input on open 
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape handler + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-[90] bg-white border-b-4 border-black shadow-2xl"
          >
            <div className="max-w-3xl mx-auto p-6">
              {/* Search Input */}
              <div className="flex items-center gap-4 border-b-4 border-black pb-4">
                <Search size={24} className="text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SEARCH PRODUCTS..."
                  className="flex-1 text-xl font-black italic uppercase tracking-wider outline-none placeholder:text-gray-300 bg-transparent"
                />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto mt-4">
                {query.trim() && filtered.length === 0 && (
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold py-8 text-center">
                    No products found for "{query}"
                  </p>
                )}

                {filtered.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      const size = (product.category === 'Tees' || product.category === 'Outerwear' || product.category === 'Bottoms') ? 'M' : 'OS';
                      addItem(product, size);
                      onClose();
                    }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover border-2 border-black flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black italic uppercase tracking-tight truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">
                        {product.category}
                      </p>
                    </div>
                    <span className="font-black text-lg flex-shrink-0">${product.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
