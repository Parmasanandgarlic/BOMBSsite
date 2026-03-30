import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Account } from './Account';

export function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b-4 border-black py-4`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Links (Left) */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-black tracking-widest text-black uppercase italic">
            <a href="#shop" className="hover:text-gray-500 transition-colors">Shop</a>
            <a href="#collections" className="hover:text-gray-500 transition-colors">Intel</a>
            <a href="#crypto" className="hover:text-gray-500 transition-colors">$TOKEN</a>
            <a href="#nft" className="hover:text-gray-500 transition-colors">NFTs</a>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="box-logo text-3xl m-1">
              B.O.M.B.S
            </a>
          </div>

          {/* Icons (Right) */}
          <div className="flex items-center space-x-6 text-black">
            <button className="hidden md:block hover:text-gray-500 transition-colors">
              <Search size={20} />
            </button>
            <button 
              className="hover:text-gray-500 transition-colors"
              onClick={() => setIsAccountOpen(true)}
            >
              <User size={20} />
            </button>
            <button
              className="relative hover:text-gray-500 transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <Account isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white text-black p-6 flex flex-col border-r-4 border-black"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="box-logo text-3xl m-1">B.O.M.B.S</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-8 text-2xl font-black italic uppercase tracking-widest">
              <a href="#shop" className="hover:text-gray-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Shop</a>
              <a href="#collections" className="hover:text-gray-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Intel</a>
              <a href="#crypto" className="hover:text-gray-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>$TOKEN</a>
              <a href="#nft" className="hover:text-gray-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>NFTs</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
