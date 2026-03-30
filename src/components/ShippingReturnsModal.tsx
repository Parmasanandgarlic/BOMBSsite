import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ShippingReturnsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShippingReturnsModal({ isOpen, onClose }: ShippingReturnsModalProps) {
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:w-[800px] md:max-w-[90vw] h-[85vh] md:h-[80vh] bg-white text-black flex flex-col shadow-2xl md:border-4 md:border-black"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-4 border-black bg-white sticky top-0 z-10">
              <h2 className="font-sans font-black italic text-3xl uppercase tracking-tighter">
                Shipping & Returns
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 bg-white">
              
              {/* Shipping Section */}
              <section className="space-y-6">
                <div className="border-b-2 border-black pb-2">
                  <h3 className="font-sans font-black italic text-2xl uppercase tracking-tighter">
                    Shipping Policy
                  </h3>
                </div>
                
                <div className="space-y-6 text-sm md:text-base font-medium leading-relaxed">
                  <p>
                    All orders are processed within <span className="font-bold bg-black text-white px-1">1 to 3 business days</span> (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
                  </p>
                  
                  <div className="bg-zinc-100 p-6 border-2 border-black">
                    <h4 className="font-bold uppercase tracking-widest mb-4 text-xs">Domestic Shipping Rates & Estimates</h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-zinc-300 pb-2">
                        <span>Standard (5-8 business days)</span>
                        <span className="font-mono font-bold">$8.00</span>
                      </li>
                      <li className="flex justify-between border-b border-zinc-300 pb-2">
                        <span>Express (2-3 business days)</span>
                        <span className="font-mono font-bold">$15.00</span>
                      </li>
                      <li className="flex justify-between pt-2">
                        <span>Overnight (1-2 business days)</span>
                        <span className="font-mono font-bold">$25.00</span>
                      </li>
                    </ul>
                  </div>

                  <p>
                    <strong className="uppercase tracking-widest text-xs">International Shipping:</strong> We currently offer international shipping to select countries. Shipping charges for your order will be calculated and displayed at checkout. Please note that your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. BOMBS BRAND is not responsible for these charges if they are applied.
                  </p>
                </div>
              </section>

              {/* Returns Section */}
              <section className="space-y-6">
                <div className="border-b-2 border-black pb-2">
                  <h3 className="font-sans font-black italic text-2xl uppercase tracking-tighter">
                    Return Policy
                  </h3>
                </div>
                
                <div className="space-y-6 text-sm md:text-base font-medium leading-relaxed">
                  <p>
                    We accept returns up to <span className="font-bold bg-black text-white px-1">14 days after delivery</span>, if the item is unused and in its original condition, and we will refund the full order amount minus the shipping costs for the return.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-black p-6">
                      <h4 className="font-bold uppercase tracking-widest mb-2 text-xs">Eligible for Return</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600">
                        <li>Unworn & unwashed</li>
                        <li>Original tags attached</li>
                        <li>Original packaging intact</li>
                        <li>Within 14 days of delivery</li>
                      </ul>
                    </div>
                    <div className="border-2 border-black p-6 bg-black text-white">
                      <h4 className="font-bold uppercase tracking-widest mb-2 text-xs">Non-Returnable</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-zinc-400">
                        <li>Final sale items</li>
                        <li>Limited edition drops</li>
                        <li>Worn or washed items</li>
                        <li>Accessories & headwear</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold uppercase tracking-widest text-xs">How to Start a Return</h4>
                    <ol className="list-decimal list-inside space-y-2 text-zinc-700">
                      <li>Email <a href="mailto:support@bombsbrand.com" className="text-black font-bold underline hover:bg-black hover:text-white transition-colors">support@bombsbrand.com</a> with your order number.</li>
                      <li>Wait for our team to approve the return and provide a shipping label.</li>
                      <li>Pack the items securely and attach the provided label.</li>
                      <li>Drop off the package at the designated carrier.</li>
                    </ol>
                  </div>

                  <p className="text-sm text-zinc-500 italic mt-8 border-t border-zinc-200 pt-4">
                    In the event that your order arrives damaged in any way, please email us as soon as possible at support@bombsbrand.com with your order number and a photo of the item's condition. We address these on a case-by-case basis but will try our best to work towards a satisfactory solution.
                  </p>
                </div>
              </section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
