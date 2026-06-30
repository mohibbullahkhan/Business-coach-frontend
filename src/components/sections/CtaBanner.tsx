"use client";

import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-[#FAF8F5] px-4 sm:px-6 relative">
      <div 
        className="max-w-5xl mx-auto rounded-t-[24px] overflow-hidden relative bg-gradient-to-r from-[#D8B08B] via-[#C4986C] to-[#D8B08B] sm:from-[#D8B08B] sm:via-[#C4986C] sm:to-[#D8B08B]"
      >
        {/* Melt gradient overlay to blend the bottom of the card into the background */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[150px] z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #FAF8F5 100%)'
          }}
        />
        <div className="relative z-10 py-12 md:py-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">
          
          <div className="flex-1 flex flex-col items-center md:items-start max-w-2xl">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[40px] font-serif font-bold italic mb-3 lg:mb-5 leading-tight drop-shadow-sm">
              Not Ready for Coaching Yet? Start with This Free Guide.
            </h2>
            <p className="text-white/90 mb-4 md:mb-0 text-[14px] lg:text-[15px] font-medium tracking-wide drop-shadow-sm">
              Get my proven 5-Step Budgeting Template & Start Saving More Today
            </p>
          </div>
          
          <div className="w-full md:w-auto shrink-0 flex justify-center md:justify-end">
            <button 
              className="flex items-center justify-center gap-2 bg-[#171310] text-white hover:bg-black transition-colors h-[48px] md:h-12 w-full md:w-auto px-8 rounded-full text-[14px] md:text-[13px] font-semibold tracking-wide shadow-xl min-h-[44px]"
            >
              Download the Free Guide
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
