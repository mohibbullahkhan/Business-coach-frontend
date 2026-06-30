'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { cn } from '@/lib/utils';

export function Hero() {
  const gradientRef = useRef<HTMLDivElement>(null);
  const isTouch = useTouchDevice();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && gradientRef.current) {
      // Reduce movement distance on mobile for performance
      const isMobile = window.innerWidth < 768;
      gsap.to(gradientRef.current, {
        x: isMobile ? '0.5%' : '1%',
        y: isMobile ? '1%' : '2%',
        duration: isMobile ? 18 : 14,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] bg-[#171310] flex flex-col items-center font-sans pt-16 md:pt-6 pb-0 overflow-hidden">
      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row mt-12 md:mt-16 px-6 gap-8 lg:gap-12 flex-1">
        
        {/* Left Column (Text) */}
        <div className="flex-1 lg:w-[55%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left pb-4 lg:pb-32 relative">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:self-start w-full lg:w-auto"
          >
            <h1 className="font-serif italic text-[32px] leading-tight sm:text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px] lg:leading-[1.05] tracking-tight">
              <span className="text-[#D98C4A]">Take Control</span> <span className="text-[#FAF8F5] font-bold">of Your</span><br className="hidden sm:block" />
              <span className="text-[#FAF8F5] font-bold"> Finances. Build the</span><br className="hidden sm:block" />
              <span className="text-[#FAF8F5] font-bold"> Life You Deserve.</span>
            </h1>
            {/* Red decorative dot 1 */}
            <div className="hidden lg:block absolute right-[-24px] bottom-12 w-1.5 h-1.5 rounded-full bg-[#E84C3D]" />
          </motion.div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-[#B9B4AC] text-[15px] sm:text-base md:text-lg max-w-[440px] leading-relaxed font-sans relative mx-auto lg:mx-0"
          >
            Master the art of public speaking, storytelling, and presentation whether on stage, in meetings, or in the media.
            {/* Red decorative dot 2 */}
            <div className="hidden lg:block absolute right-[-40px] bottom-[-20px] w-1.5 h-1.5 rounded-full bg-[#E84C3D]" />
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 relative z-20 w-full sm:w-auto items-center justify-center lg:justify-start"
          >
            <motion.button 
              whileHover={!isTouch ? { scale: 1.03, filter: 'brightness(1.1)' } : undefined}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#C9712E] text-white px-7 py-3.5 md:py-4 lg:py-3.5 rounded-full font-medium w-full sm:w-auto min-h-[44px]"
            >
              Download Free Toolkit
            </motion.button>
            <motion.button 
              whileHover={!isTouch ? { scale: 1.03, backgroundColor: 'rgba(255,255,255,0.05)' } : undefined}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-transparent border border-white/30 text-[#FAF8F5] px-7 py-3.5 md:py-4 lg:py-3.5 rounded-full font-medium w-full sm:w-auto min-h-[44px]"
            >
              See How It Works
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column (Image and Social Proof) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex-1 lg:w-[45%] flex flex-col items-center justify-end relative mt-8 lg:mt-0 w-full"
        >
          {/* Red decorative dot 3 */}
          <div className="hidden lg:block absolute right-[10%] bottom-[30%] w-1.5 h-1.5 rounded-full bg-[#E84C3D] z-30" />

          {/* Using a wrapper to easily apply bottom blending */}
          <div className="relative w-full max-w-[480px] lg:max-w-[550px] mx-auto h-full flex flex-col justify-end pt-4 lg:pt-10 overflow-hidden lg:overflow-visible">
            {/* IMPORTANT: For the gradient to show perfectly behind the image, this image MUST be a transparent PNG. */}
            <img 
              src="/images/hero-coach.png" 
              alt="Clarity Finance Coach" 
              className="w-full h-auto object-contain rounded-t-[40px] relative z-10"
              style={{
                // Mask image so it fades at the bottom gently, blending with the gradient
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
              }}
            />

          </div>
        </motion.div>
        
      </div>

      {/* Glows and Melt Overlay - z-20 so it beautifully covers the bottom of the image like the screenshot */}
      <div
        ref={gradientRef}
        className={cn(
          "absolute bottom-0 left-0 w-full z-20 pointer-events-none blur-[40px] md:blur-[50px]",
          "h-[60%] md:h-[45%]"
        )}
        style={{
          background: `
            radial-gradient(
              ellipse 60% 100% at 35% 100%,
              rgba(180, 100, 255, 0.65) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 60% 100% at 75% 100%,
              rgba(240, 160, 90, 0.6) 0%,
              transparent 70%
            )
          `
        }}
      />

      <div 
        className="absolute bottom-0 left-0 w-full h-[140px] z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #F7F4EE 100%)'
        }}
      />

      {/* Centered Social Proof Pill */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-[#171310]/80 sm:bg-white/10 border border-white/10 sm:border-white/20 rounded-3xl sm:rounded-full py-3 px-6 sm:py-2 backdrop-blur-md shadow-lg w-[90%] sm:w-auto justify-center"
      >
        <div className="flex -space-x-3">
          <img src="https://i.pravatar.cc/100?img=1" alt="User 1" className="w-10 h-10 rounded-full border-2 border-[#171310] sm:border-white/50 object-cover" />
          <img src="https://i.pravatar.cc/100?img=2" alt="User 2" className="w-10 h-10 rounded-full border-2 border-[#171310] sm:border-white/50 object-cover" />
          <img src="https://i.pravatar.cc/100?img=3" alt="User 3" className="w-10 h-10 rounded-full border-2 border-[#171310] sm:border-white/50 object-cover" />
          <img src="https://i.pravatar.cc/100?img=4" alt="User 4" className="w-10 h-10 rounded-full border-2 border-[#171310] sm:border-white/50 object-cover" />
        </div>
        
        <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-0.5">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#D98C4A] text-[#D98C4A] sm:fill-white sm:text-white" />
            ))}
          </div>
          <span className="text-[12px] sm:text-[12px] text-white/90 font-medium italic">Trusted by 2,000+ Happy Clients</span>
        </div>
      </motion.div>

    </section>
  );
}
