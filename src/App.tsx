import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Lenis from 'lenis';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background Text
  const bgTextScale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 0]);

  // Center Portrait
  const centerScale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  
  // Flanking Images
  const leftImageX = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const rightImageX = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const flankingOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Foreground
  const foregroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-[#0A0A0F] text-[#F5F0EB]">
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Layer 1: Background Text */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ scale: bgTextScale, opacity: bgTextOpacity }}
          >
            <h1 className="font-serif text-[20vw] leading-none text-[#F5F0EB] whitespace-nowrap select-none">
              YOUR HAIR
            </h1>
          </motion.div>

          {/* Layer 2: Images */}
          <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center h-full z-10">
            
            {/* Left Flanking Image */}
            <motion.div 
              className="absolute left-[5%] md:left-[10%] w-40 h-56 md:w-72 md:h-96"
              style={{ x: leftImageX, opacity: flankingOpacity, rotate: -8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=800&auto=format&fit=crop" 
                alt="Hair styling detail" 
                className="w-full h-full object-cover rounded-sm grayscale-[20%] contrast-125 opacity-80"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Center Portrait */}
            <motion.div 
              className="relative w-[65vw] md:w-[35vw] max-w-md aspect-[3/4] z-20 origin-center"
              style={{ scale: centerScale }}
            >
              <img 
                src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1000&auto=format&fit=crop" 
                alt="Black woman with stunning hair" 
                className="w-full h-full object-cover rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
              />
              {/* Dark mask overlay that fades in at the end of the scroll to transition to next section */}
              <motion.div 
                className="absolute inset-0 bg-[#0A0A0F]"
                style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]) }}
              />
            </motion.div>

            {/* Right Flanking Image */}
            <motion.div 
              className="absolute right-[5%] md:right-[10%] w-40 h-56 md:w-72 md:h-96"
              style={{ x: rightImageX, opacity: flankingOpacity, rotate: 8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop" 
                alt="Hair styling detail" 
                className="w-full h-full object-cover rounded-sm grayscale-[20%] contrast-125 opacity-80"
                referrerPolicy="no-referrer"
              />
            </motion.div>

          </div>

          {/* Layer 3: Foreground */}
          <motion.div 
            className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 md:p-12"
            style={{ opacity: foregroundOpacity }}
          >
            <div className="flex justify-between items-start w-full">
              <div className="font-serif text-2xl tracking-widest uppercase">GlamGo</div>
              <button className="text-xs tracking-widest uppercase border border-[#F5F0EB]/30 px-6 py-3 rounded-full hover:bg-[#F5F0EB] hover:text-[#0A0A0F] transition-colors pointer-events-auto">
                Book Now
              </button>
            </div>
            
            <div className="flex justify-center w-full pb-12">
              <p className="font-serif italic text-4xl md:text-6xl tracking-wide text-[#F5F0EB]">
                Your Way
              </p>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Content after hero to scroll into */}
      <div className="h-screen bg-[#0A0A0F] relative z-40 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="font-serif text-5xl md:text-7xl mb-8 font-light">Discover Your Style</h2>
          <p className="text-[#F5F0EB]/60 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            Experience the ultimate in luxury hair care and styling. Our expert stylists are dedicated to bringing your unique vision to life.
          </p>
        </div>
      </div>
    </div>
  );
}
