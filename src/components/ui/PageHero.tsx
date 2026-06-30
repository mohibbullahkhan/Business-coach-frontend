"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Breadcrumb } from "./Breadcrumb";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  headline: string;
  subtext?: string;
  breadcrumb: string;
  shorter?: boolean;
}

export function PageHero({ headline, subtext, breadcrumb, shorter }: PageHeroProps) {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion && gradientRef.current) {
      gsap.to(gradientRef.current, {
        x: "1%",
        y: "2%",
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <section className={cn(
      "relative w-full bg-[#171310] flex flex-col items-center justify-center font-sans pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden",
      shorter ? "min-h-[25vh] md:min-h-[30vh]" : "min-h-[35vh] md:min-h-[40vh]"
    )}>
      {/* Glows and Melt Overlay - z-20 to cover content bottom */}
      <div
        ref={gradientRef}
        className="absolute bottom-0 left-0 w-full h-[35%] md:h-[80%] z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 60% 100% at 35% 100%,
              rgba(180, 100, 255, 0.5) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 60% 100% at 75% 100%,
              rgba(240, 160, 90, 0.4) 0%,
              transparent 70%
            )
          `,
          filter: "blur(40px)",
        }}
      />

      <div 
        className="absolute bottom-0 left-0 w-full h-[80px] md:h-[100px] z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #F7F4EE 100%)"
        }}
      />

      {/* Main Content */}
      <div className="relative z-30 w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumb pageName={breadcrumb} />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif italic text-[28px] sm:text-3xl md:text-[36px] lg:text-[44px] text-[#FAF8F5] leading-tight tracking-tight mb-4"
        >
          {headline}
        </motion.h1>

        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#B9B4AC] text-[14px] md:text-base lg:text-lg max-w-2xl mt-2"
          >
            {subtext}
          </motion.p>
        )}
      </div>
    </section>
  );
}
