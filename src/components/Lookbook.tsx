import { motion } from 'motion/react';

export function Lookbook() {
  return (
    <section id="collections" className="py-24 bg-black text-white overflow-hidden relative border-t-4 border-white">
      {/* Background texture/pattern hint */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #111 25%, #111 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 relative">
          <h2 className="font-gothic text-6xl md:text-8xl tracking-widest text-white z-20 mix-blend-difference">
            The Manifesto
          </h2>
          <p className="mt-8 md:mt-0 text-sm md:text-base text-gray-300 max-w-sm uppercase tracking-widest leading-relaxed font-bold border-l-4 border-white pl-4">
            B.O.M.B.S — Back On My Bullshit. Inspired by industrial brutalism, heavy machinery, and the unapologetic attitude of the underground.
          </p>
          {/* Hand-drawn accent */}
          <div className="absolute -bottom-12 left-1/4 text-6xl font-hand text-white transform -rotate-6 opacity-80">
            Raw & Uncut
          </div>
        </div>

        <div className="relative min-h-[800px] w-full">
          {/* Large Image - Center/Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 md:left-10 w-[85%] md:w-[60%] aspect-[4/3] z-10 border-4 border-white shadow-[10px_10px_0px_rgba(255,255,255,1)]"
          >
            <img
              src="https://image.pollinations.ai/prompt/black_and_white_ink_drawing_comic_book_style_post_apocalyptic_wasteland_ruins_doom_scenario?width=2000&height=1500&nologo=true"
              alt="Hand drawn doom scenario wasteland"
              className="w-full h-full object-cover grayscale contrast-125"
              loading="lazy"
            />
            <div className="absolute -top-6 -right-4 bg-black text-white px-4 py-1 border-2 border-white font-gothic text-3xl transform rotate-6">
              Featured Work
            </div>
          </motion.div>

          {/* Small Image 1 - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-20 right-0 md:right-10 w-[60%] md:w-[35%] aspect-square z-20 border-4 border-white shadow-[-10px_10px_0px_rgba(255,255,255,1)]"
          >
            <img
              src="https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=1000&auto=format&fit=crop"
              alt="Abstract Metal Texture"
              className="w-full h-full object-cover grayscale contrast-150"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 font-gothic text-4xl text-white mix-blend-difference">
              PHOTO.
            </div>
          </motion.div>

          {/* Text Block - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-0 right-0 md:right-20 w-[90%] md:w-[45%] bg-white text-black p-8 z-30 border-4 border-black shadow-[10px_-10px_0px_rgba(255,255,255,1)] transform -rotate-1"
          >
            <h3 className="font-gothic text-5xl mb-6">
              The Syndicate
            </h3>
            <p className="text-sm text-black font-bold uppercase tracking-widest leading-relaxed mb-8">
              We're not just making clothes; we're building a syndicate for the bold.
            </p>
            <a href="#" className="inline-block border-4 border-black px-8 py-4 text-sm font-black italic uppercase tracking-widest hover:bg-black hover:text-white transition-colors w-max">
              Read The Files
            </a>
            {/* Hand-drawn arrow or scribble */}
            <div className="absolute -top-10 -left-10 text-7xl font-hand text-white transform -rotate-45 mix-blend-difference">
              →
            </div>
          </motion.div>
          
          {/* Decorative Gothic Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 pointer-events-none">
            <h2 className="font-gothic text-[15vw] leading-none text-white whitespace-nowrap">
              DESIGN.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
