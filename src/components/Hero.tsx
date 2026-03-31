import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 p-4 md:p-12 pt-24 md:pt-32 pb-12">
        <div className="relative w-full h-full overflow-hidden border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2000&auto=format&fit=crop"
            alt="Urban brutalist streetwear aesthetic"
            className="w-full h-full object-cover grayscale contrast-125 brightness-50"
          />
          {/* Grain overlay specific to image */}
          <div className="absolute inset-0 bg-grain opacity-50 mix-blend-overlay" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="box-logo text-[15vw] md:text-[10vw] m-4">
            B.O.M.B.S
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 text-sm md:text-lg font-black tracking-widest text-black bg-white px-4 py-1 uppercase max-w-xl border-2 border-black"
        >
          BACK ON MY BULLSHIT.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <a
            href="#shop"
            className="inline-block bg-white text-black px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-black hover:text-white border-2 border-transparent hover:border-white transition-colors"
          >
            Enter Ground Zero
          </a>
        </motion.div>
      </div>
    </section>
  );
}
