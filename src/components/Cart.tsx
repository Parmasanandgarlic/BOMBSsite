import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  onAccountOpen?: () => void;
}

export function Cart({ onAccountOpen }: CartProps) {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();
  const [checkoutToast, setCheckoutToast] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Escape key to close
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
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
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const handleCheckout = () => {
    setCheckoutToast(true);
    setTimeout(() => setCheckoutToast(false), 3000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Cart Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col border-l-4 border-black"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-4 border-black">
              <h2 className="font-sans font-black italic text-2xl uppercase tracking-tighter flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="hover:text-gray-500 transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 border-4 border-black px-6 py-3 text-black text-xs font-black italic uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-gray-100 pb-6">
                      {/* Image */}
                      <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-sans font-black italic text-lg uppercase tracking-tight pr-4">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              className="text-gray-400 hover:text-black transition-colors"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                            Size: {item.size || 'OS'}
                          </p>
                          <p className="text-sm font-medium mt-2">${item.price}</p>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 w-max mt-4">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium" aria-label={`Quantity: ${item.quantity}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="text-xl font-black">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest text-center">
                  Shipping & taxes calculated at checkout
                </p>
                <button
                  onClick={handleCheckout}
                  className={`w-full py-4 font-black italic uppercase tracking-widest border-4 border-black transition-colors ${
                    checkoutToast
                      ? 'bg-gray-800 text-gray-300 cursor-default'
                      : 'bg-black text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {checkoutToast ? 'Coming Soon — Stay Tuned' : 'Checkout'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
