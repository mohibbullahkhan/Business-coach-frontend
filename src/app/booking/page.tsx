"use client";

import { PageHero } from "@/components/ui/PageHero";
import { BookingCalendar } from "@/components/ui/BookingCalendar";
import { motion } from "framer-motion";
import { Check, Star, Shield, Clock } from "lucide-react";
import Image from "next/image";

export default function BookingPage() {
  return (
    <>
      <PageHero
        headline="Secure Your Strategy Session"
        subtext="Choose a time below for your free 30-minute discovery call."
        breadcrumb="Booking"
        shorter={true}
      />

      <section className="py-24 bg-bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Column: Why Book a Call */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-[400px] flex flex-col gap-8"
            >
              <div className="bg-white p-8 rounded-3xl border border-[#E7E2D9] shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent/20 relative shrink-0">
                    <Image src="/images/hero-coach.png" alt="Alex Rivera" fill className="object-cover bg-[#EBE7DF]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-text-dark">Alex Rivera</h3>
                    <p className="text-sm text-text-muted">Head Financial Coach</p>
                  </div>
                </div>

                <div className="space-y-5 mb-8">
                  <h4 className="font-semibold text-text-dark text-sm uppercase tracking-wider mb-2">What to expect</h4>
                  {[
                    "Deep dive into your current finances",
                    "Identify your #1 biggest roadblock",
                    "A customized action plan overview",
                    "No pressure, 100% free consultation"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-accent/10 rounded-full p-1 text-accent">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-text-muted leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#FDFCFB] border border-[#E7E2D9] p-4 rounded-2xl flex items-center gap-3">
                  <Shield className="w-8 h-8 text-[#A5A09A]" strokeWidth={1.5} />
                  <p className="text-xs text-text-muted leading-relaxed">
                    All sessions are 100% confidential. Your financial privacy is our top priority.
                  </p>
                </div>
              </div>

              {/* Mini Social Proof */}
              <div className="bg-[#171310] text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl rounded-full" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-white/90 italic mb-4 leading-relaxed relative z-10">
                  "The best 30 minutes I've ever spent on my finances. I finally have clarity on exactly what I need to do next."
                </p>
                <div className="text-xs font-bold text-white/60 tracking-wider uppercase">
                  — Sarah Jenkins, Entrepreneur
                </div>
              </div>
            </motion.div>

            {/* Right Column: Calendar Embed Area */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full rounded-3xl border border-[#E7E2D9] shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden min-h-[600px] flex flex-col"
            >
              <BookingCalendar />
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
