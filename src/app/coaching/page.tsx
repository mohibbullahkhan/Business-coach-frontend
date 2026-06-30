"use client";

import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  { q: "How long does the coaching program last?", a: "Most of our 1:1 coaching engagements last between 3 to 6 months, depending on your goals. We focus on building sustainable habits, not quick fixes." },
  { q: "Do you offer payment plans?", a: "Yes, we offer flexible monthly payment plans for both our 1:1 and Group Coaching programs to make them as accessible as possible." },
  { q: "Will you manage my investments for me?", a: "No. We are financial coaches, not financial advisors. We will teach you how to understand and manage your own investments confidently, empowering you to make your own decisions." },
  { q: "Is the self-paced course right for me?", a: "If you are highly self-motivated and prefer learning on your own schedule without needing personalized accountability, the self-paced course is a perfect starting point." },
  { q: "What happens after the program ends?", a: "You'll graduate with a clear, actionable plan and the confidence to execute it. We also offer alumni check-in calls if you need occasional tune-ups." }
];

export default function CoachingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero
        headline="Coaching Built Around Your Goals"
        subtext="Whether you need 1:1 guidance or prefer to learn at your own pace, we have a system for you."
        breadcrumb="Coaching"
      />

      {/* Program Tiers */}
      <section className="py-12 md:py-16 lg:py-24 bg-bg-cream relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* Self-Paced */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[20px] md:rounded-2xl p-6 md:p-8 border border-[#E7E2D9] shadow-sm flex flex-col h-full lg:h-auto"
            >
              <h3 className="font-serif text-[22px] md:text-2xl text-text-dark mb-2">Self-Paced Course</h3>
              <div className="text-[28px] md:text-3xl font-light mb-6">$297</div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Lifetime access to video modules", "Downloadable budgeting templates", "Private community access", "Monthly live Q&A calls"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 md:py-3.5 rounded-full border border-[#E7E2D9] text-text-dark font-medium hover:bg-gray-50 transition-colors min-h-[44px]">
                Get Started
              </button>
            </motion.div>

            {/* 1:1 Coaching (Recommended) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[20px] md:rounded-2xl p-6 md:p-8 border-2 border-accent shadow-xl flex flex-col relative lg:-translate-y-4 h-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-[11px] md:text-xs font-bold tracking-wide uppercase">
                Recommended
              </div>
              <h3 className="font-serif text-[22px] md:text-2xl text-text-dark mb-2">1:1 Coaching</h3>
              <div className="text-[28px] md:text-3xl font-light mb-6">$1,500 <span className="text-sm text-text-muted">/ 3 months</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Bi-weekly 60-min strategy calls", "Customized financial roadmap", "Direct email support between calls", "Deep dive into investment strategies", "Complete money mindset overhaul"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 md:py-3.5 rounded-full bg-accent text-white font-medium hover:bg-[#b56529] transition-colors min-h-[44px]">
                Apply for 1:1
              </button>
            </motion.div>

            {/* Group Coaching */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[20px] md:rounded-2xl p-6 md:p-8 border border-[#E7E2D9] shadow-sm flex flex-col h-full lg:h-auto"
            >
              <h3 className="font-serif text-[22px] md:text-2xl text-text-dark mb-2">Group Coaching</h3>
              <div className="text-[28px] md:text-3xl font-light mb-6">$800 <span className="text-sm text-text-muted">/ 8 weeks</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Weekly 90-min group sessions", "Small cohort (max 10 people)", "Peer accountability & support", "Shared resource library", "Hot-seat coaching"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 md:py-3.5 rounded-full border border-[#E7E2D9] text-text-dark font-medium hover:bg-gray-50 transition-colors min-h-[44px]">
                Join Waitlist
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works (Vertical Timeline) */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-3xl font-serif text-[#171310] mb-4">How It Works</h2>
            <p className="text-text-muted text-[15px] sm:text-base max-w-2xl mx-auto">A simple, transparent process to get you from overwhelmed to empowered.</p>
          </motion.div>

          <div className="space-y-10 lg:space-y-16 relative before:absolute before:inset-0 before:ml-[23px] before:-translate-x-px lg:before:mx-auto lg:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#E7E2D9] before:to-transparent">
            {[
              { step: "01", title: "Apply", desc: "Fill out a brief application to ensure we're a good mutual fit for coaching." },
              { step: "02", title: "Strategy Call", desc: "A free 30-minute discovery call to map out your biggest goals and hurdles." },
              { step: "03", title: "Onboarding", desc: "Get set up in our client portal and complete your initial financial audit." },
              { step: "04", title: "Coaching Begins", desc: "We roll up our sleeves and start building your financial future." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex items-center justify-between lg:justify-normal lg:odd:flex-row-reverse group"
              >
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-white border-2 border-accent text-accent rounded-full font-bold text-sm shrink-0 lg:order-1 lg:group-odd:-translate-x-1/2 lg:group-even:translate-x-1/2 z-10 shadow-sm mt-1 lg:mt-0">
                  {s.step}
                </div>
                <div className="w-[calc(100%-4rem)] lg:w-[calc(50%-3rem)] p-6 md:p-8 rounded-[20px] bg-bg-cream border border-[#E7E2D9] shadow-sm text-left lg:text-center lg:group-odd:text-right lg:group-even:text-left">
                  <h3 className="font-serif text-[18px] md:text-xl text-[#171310] mb-2 md:mb-3">{s.title}</h3>
                  <p className="text-text-muted text-[14px] md:text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 lg:py-24 bg-bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-3xl font-serif text-[#171310] mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-[#E7E2D9] rounded-[16px] md:rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left min-h-[60px]"
                  >
                    <span className="font-serif text-[17px] md:text-lg text-text-dark pr-4">{faq.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0">
                      <ChevronDown className="w-5 h-5 text-accent" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 text-text-muted text-[14px] md:text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
