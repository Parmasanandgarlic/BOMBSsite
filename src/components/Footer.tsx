import React, { useState } from 'react';
import { Instagram, Twitter, Mail } from 'lucide-react';
import { ShippingReturnsModal } from './ShippingReturnsModal';

export function Footer() {
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // In production, send to an API / Mailchimp / Cloud Function
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-white text-black pt-24 pb-0 border-t-4 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-0 border-x-4 border-black">
        
        {/* Newsletter */}
        <div className="md:col-span-5 flex flex-col justify-between p-8 border-b-4 md:border-b-0 md:border-r-4 border-black">
          <div>
            <h3 className="font-sans font-black italic text-4xl uppercase tracking-tighter mb-4 text-black">
              Join The Syndicate
            </h3>
            <p className="text-sm text-gray-600 uppercase tracking-widest mb-8 max-w-sm font-bold">
              Sign up for early access to drops, classified intel, and more.
            </p>
            <form className="flex border-b-4 border-black pb-2 max-w-md" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="bg-transparent w-full outline-none text-sm uppercase tracking-widest placeholder:text-gray-500 font-bold"
                required
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="text-sm font-black uppercase tracking-widest hover:text-gray-500 transition-colors ml-4"
              >
                Submit
              </button>
            </form>
            {subscribed && (
              <p className="mt-3 text-sm font-bold uppercase tracking-widest text-green-700 toast-enter">
                ✓ You're in. Welcome to the Syndicate.
              </p>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-0 border-b-4 md:border-b-0 md:border-r-4 border-black">
          <div className="flex flex-col space-y-4 text-xs font-black uppercase tracking-widest text-black p-8 border-r-4 border-black">
            <h4 className="text-black mb-2 underline decoration-2 underline-offset-4">Shop</h4>
            <a href="#shop" className="hover:text-gray-500 transition-colors">All Products</a>
            <a href="#shop" className="hover:text-gray-500 transition-colors">New Arrivals</a>
          </div>
          <div className="flex flex-col space-y-4 text-xs font-black uppercase tracking-widest text-black p-8">
            <h4 className="text-black mb-2 underline decoration-2 underline-offset-4">Support</h4>
            <button onClick={() => setIsShippingModalOpen(true)} className="text-left hover:text-gray-500 transition-colors">Shipping</button>
            <button onClick={() => setIsShippingModalOpen(true)} className="text-left hover:text-gray-500 transition-colors">Returns</button>
            <a href="mailto:support@bombsbrand.com" className="hover:text-gray-500 transition-colors">Contact</a>
          </div>
        </div>

        {/* Socials & Info */}
        <div className="md:col-span-3 flex flex-col justify-between items-start p-8">
          <div className="flex space-x-6 mb-12 md:mb-0">
            <a
              href="https://instagram.com/bombsbrand"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={32} strokeWidth={2.5} />
            </a>
            <a
              href="https://x.com/bombsbrand"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter size={32} strokeWidth={2.5} />
            </a>
            <a
              href="mailto:hello@bombsbrand.com"
              className="hover:text-gray-500 transition-colors"
              aria-label="Email us"
            >
              <Mail size={32} strokeWidth={2.5} />
            </a>
          </div>
          
          <div className="text-xs text-black font-black uppercase tracking-widest text-left mt-auto">
            <p>&copy; {new Date().getFullYear()} BOMBS BRAND.</p>
            <p className="mt-2">ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>

      {/* Massive Footer Text */}
      <div className="border-t-4 border-black overflow-hidden flex justify-center select-none pointer-events-none bg-white relative">
        <span className="font-sans font-black italic text-[25vw] uppercase tracking-tighter leading-none whitespace-nowrap text-outline">
          BOMBS
        </span>
        {/* Hand-drawn scribble over the giant text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-hand text-black z-10 rotate-[-15deg]">
          Peace out
        </div>
      </div>

      <ShippingReturnsModal 
        isOpen={isShippingModalOpen} 
        onClose={() => setIsShippingModalOpen(false)} 
      />
    </footer>
  );
}
