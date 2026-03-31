import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Account } from './Account';
import { SearchModal } from './SearchModal';

interface NavbarProps {
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
}

export function Navbar({ isAccountOpen, setIsAccountOpen }: NavbarProps) {
  const { cartCount, setIsCartOpen, isCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu: Escape key + focus trap
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'button, a, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
  }, [isMobileMenuOpen]);

  const handleOpenAccount = () => {
    if (isCartOpen) setIsCartOpen(false);
    setIsAccountOpen(true);
  };

  const handleOpenCart = () => {
    if (isAccountOpen) setIsAccountOpen(false);
    setIsCartOpen(true);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white border-b-4 border-black ${
          isScrolled ? 'py-2 shadow-lg' : 'py-4'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Links (Left) */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-black tracking-widest text-black uppercase italic">
            <a href="#shop" className="hover:text-gray-500 transition-colors">Shop</a>
            <a href="#collections" className="hover:text-gray-500 transition-colors">Intel</a>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="relative flex justify-center items-center group" aria-label="BOMBS Home">
              <span className="font-sans font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none whitespace-nowrap text-outline group-hover:text-black transition-colors duration-300">
                BOMBS
              </span>
              {/* Hand-drawn scribble over the text */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl font-hand text-black z-10 rotate-[-15deg] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Worldwide
              </div>
            </a>
          </div>

          {/* Icons (Right) */}
          <div className="flex items-center space-x-6 text-black">
            <button
              className="hidden md:block hover:text-gray-500 transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
            >
              <Search size={20} />
            </button>
            <button
              className="hover:text-gray-500 transition-colors"
              onClick={handleOpenAccount}
              aria-label="Open account panel"
            >
              <User size={20} />
            </button>
            <button
              className="relative hover:text-gray-500 transition-colors"
              onClick={handleOpenCart}
              aria-label={`Open shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center" aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <Account isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white text-black p-6 flex flex-col border-r-4 border-black"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="relative flex justify-center items-center select-none">
                <span className="font-sans font-black italic text-4xl uppercase tracking-tighter leading-none whitespace-nowrap text-outline">
                  BOMBS
                </span>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-hand text-black z-10 rotate-[-15deg] pointer-events-none">
                  Worldwide
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-8 text-2xl font-black italic uppercase tracking-widest">
              <a href="#shop" className="hover:text-gray-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Shop</a>
              <a href="#collections" className="hover:text-gray-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Intel</a>
            </div>

            {/* Mobile search button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setTimeout(() => setIsSearchOpen(true), 350);
              }}
              className="mt-auto mb-8 flex items-center gap-3 text-lg font-black italic uppercase tracking-widest hover:text-gray-500 transition-colors"
            >
              <Search size={20} />
              Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
