"use client";

import { useEffect, useRef } from "react";
import { User } from "lucide-react";
import { gsap } from "gsap";

export function FloatingGoalsCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: -12,
      duration: 3.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div ref={cardRef} className="absolute -bottom-10 -right-4 md:-right-10 bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-[#E5E0D8] w-[260px] z-20">
      <div className="flex items-center justify-between mb-6">
        <span className="font-serif font-bold text-xl text-[#1F1A16] italic">Goals</span>
        <button className="bg-[#1F1A16] text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full hover:bg-[#D98C4A] transition-colors">
          Details
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#D98C4A] text-white flex items-center justify-center shrink-0 shadow-inner">
          <User className="w-6 h-6" />
        </div>
        <div>
          <div className="text-3xl font-sans font-bold text-[#1F1A16] mb-0.5 tracking-tight">85%</div>
          <div className="text-[11px] text-[#B9B4AC] uppercase tracking-wider font-medium">Member Growth</div>
        </div>
      </div>
    </div>
  );
}
