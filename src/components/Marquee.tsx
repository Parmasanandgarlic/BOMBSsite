import { motion } from 'motion/react';

export function Marquee() {
  const text = "B.O.M.B.S WORLDWIDE // $BOMBS TOKEN INCOMING // NFT SYNDICATE // BACK ON MY BULLSHIT // ";
  
  return (
    <div className="bg-black text-white py-3 overflow-hidden border-y-4 border-white">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15,
          }}
          className="flex text-sm md:text-base font-black italic uppercase tracking-widest"
        >
          {/* Repeat text multiple times to ensure continuous scrolling */}
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </motion.div>
      </div>
    </div>
  );
}
