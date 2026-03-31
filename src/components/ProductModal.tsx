import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ChevronDown } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const hasSizes = product?.category === 'Tees' || product?.category === 'Outerwear' || product?.category === 'Bottoms';
  const sizes = ['S', 'M', 'L', 'XL'];

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(hasSizes ? '' : 'OS');
      setImageLoaded(false);
      setAddedToast(false);
    }
  }, [product, hasSizes]);

  // Focus trap & Escape handler
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
    // Focus the modal on open
    modalRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!product) return;
    if (hasSizes && !selectedSize) return;

    addItem(product, selectedSize || 'OS');
    setAddedToast(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[90] bg-white border-4 border-black shadow-2xl flex flex-col md:flex-row md:w-[900px] md:max-w-[90vw] md:max-h-[85vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black bg-white"
              aria-label="Close product details"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <div className="relative w-full md:w-1/2 aspect-[3/4] md:aspect-auto flex-shrink-0">
              {!imageLoaded && (
                <div className="absolute inset-0 img-skeleton" />
              )}
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">
                  {product.category}
                </p>
                <h2 className="font-sans font-black italic text-3xl md:text-4xl uppercase tracking-tight mb-4">
                  {product.name}
                </h2>
                <p className="text-2xl font-black mb-6">${product.price}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Size Selector */}
                {hasSizes && (
                  <div className="mb-8">
                    <label className="block text-xs font-bold uppercase tracking-widest mb-3">
                      Size
                    </label>
                    <div className="flex gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 flex items-center justify-center font-black italic text-sm uppercase border-2 border-black transition-colors ${
                            selectedSize === size
                              ? 'bg-black text-white'
                              : 'bg-white text-black hover:bg-gray-100'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {!selectedSize && (
                      <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest">
                        Select a size to continue
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={hasSizes && !selectedSize}
                className={`w-full py-4 font-black italic uppercase tracking-widest text-sm border-4 border-black transition-colors flex items-center justify-center gap-2 ${
                  addedToast
                    ? 'bg-green-600 text-white border-green-600'
                    : hasSizes && !selectedSize
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-white hover:text-black'
                }`}
              >
                <ShoppingBag size={18} />
                {addedToast ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
