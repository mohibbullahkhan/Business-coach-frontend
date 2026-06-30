"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "130", suffix: "+", label: "Completed" },
  { value: "200", suffix: "+", label: "Success Stories" },
  { value: "15", suffix: "+", label: "Countries" },
];

export function StatsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      valuesRef.current.forEach((el, index) => {
        if (!el) return;
        const targetValue = parseInt(STATS[index].value, 10);
        
        gsap.to(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          innerHTML: targetValue,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: "power2.out",
          onUpdate: function() {
            el.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString();
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 lg:py-24 bg-gradient-to-r from-[#1A1412] to-[#120F0D] text-white overflow-hidden">
      
      {/* Desktop Full-Bleed Left Image */}
      <div className="hidden lg:block absolute top-16 bottom-0 left-0 w-[45%] z-0">
        <Image 
          src="/images/stats-coach.png" 
          alt="Coach" 
          fill 
          className="object-cover object-[center_20%] opacity-90 sepia-[.4] hue-rotate-[-10deg] saturate-50 contrast-125" 
        />
        {/* Subtle gradient to blend the hard right edge slightly into the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#120F0D]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row">
        
        {/* Mobile Image (Hidden on Desktop) */}
        <div className="lg:hidden w-full relative aspect-[4/5] rounded-3xl overflow-hidden mb-10 shadow-xl">
          <Image 
            src="/images/stats-coach.png" 
            alt="Coach" 
            fill 
            className="object-cover object-[center_20%] opacity-90 sepia-[.4] hue-rotate-[-10deg] saturate-50 contrast-125" 
          />
        </div>

        {/* Spacer to push content to the right on desktop */}
        <div className="hidden lg:block lg:w-[50%]" />

        {/* Right Content */}
        <div className="w-full lg:w-[50%] flex flex-col lg:pl-16">
          <div className="flex justify-between items-start mb-8 w-full max-w-lg">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-[32px] sm:text-4xl md:text-5xl font-serif text-[#E5E0D8] mb-1 font-light italic tracking-tight">
                  <span ref={el => { valuesRef.current[i] = el; }}>0</span>{stat.suffix}
                </div>
                <div className="text-[11px] sm:text-[12px] text-[#8B8682] font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-lg h-[1px] bg-white/10 mb-8 md:mb-10"></div>

          <h2 className="text-xl md:text-2xl lg:text-[28px] font-semibold text-[#FAF8F5] mb-4 md:mb-6 leading-tight tracking-tight">
            Because Your Money Deserves Better
          </h2>
          
          <p className="text-[#A5A09A] text-[14px] sm:text-[15px] mb-5 leading-relaxed max-w-lg font-medium">
            Over 2,000 individuals and families have trusted our personalized coaching to transform their financial lives. From eliminating debt to building wealth, our proven system empowers you with clarity, confidence, and control.
            <br /><br />
            Whether you're starting fresh or leveling up, we're here to guide you every step of the way—without judgment, pressure, or confusion. Your goals are our mission.
          </p>

          <p className="text-[#A5A09A] text-[14px] sm:text-[15px] mb-8 md:mb-10 leading-relaxed max-w-lg font-medium relative inline-block">
            Join thousands who've gained clarity, crushed debt, and built lasting financial freedom with a proven coaching system tailored to your unique money goals.
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E84C3D] ml-2 mb-0.5" />
          </p>

          <div className="relative self-start w-full sm:w-auto">
            <button className="bg-[#D8B08B] text-[#171310] px-7 py-3 sm:py-2.5 rounded-full text-[15px] sm:text-sm font-bold hover:bg-[#C4986C] transition-colors shadow-[0_0_20px_rgba(216,176,139,0.2)] w-full sm:w-auto min-h-[44px]">
              Get in Touch
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
