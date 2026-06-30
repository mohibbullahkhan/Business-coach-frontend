"use client";

import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const CATEGORIES = ["All", "Debt Payoff", "Investing", "Business Growth"];

const CASE_STUDIES = [
  { id: 1, cat: "Debt Payoff", metric: "$45k Paid Off in 18 Months", name: "Sarah J.", summary: "Sarah was drowning in student loans and credit card debt. Through aggressive budgeting and accountability, she is now 100% debt-free.", img: "https://i.pravatar.cc/150?img=5" },
  { id: 2, cat: "Investing", metric: "First $100k Invested", name: "Michael & Emily", summary: "This couple didn't know how to start investing. We built a simple, automated index fund strategy that put them on track to retire early.", img: "https://i.pravatar.cc/150?img=11" },
  { id: 3, cat: "Business Growth", metric: "3x Monthly Revenue", name: "David L.", summary: "David's freelance business was struggling with cash flow. We implemented a profit-first system and restructured his pricing.", img: "https://i.pravatar.cc/150?img=12" },
  { id: 4, cat: "Debt Payoff", metric: "Saved Home from Foreclosure", name: "The Martinez Family", summary: "Faced with crushing medical debt, we negotiated settlements and built an emergency fund to secure their housing.", img: "https://i.pravatar.cc/150?img=20" },
  { id: 5, cat: "Investing", metric: "Maxed Out Retirement Accounts", name: "Jessica R.", summary: "Jessica went from saving 2% of her income to maxing out her 401k and IRA within a year by optimizing her expenses.", img: "https://i.pravatar.cc/150?img=24" },
  { id: 6, cat: "Business Growth", metric: "Successfully Sold Agency", name: "Marcus T.", summary: "Helped Marcus clean up his business financials and increase profit margins, leading to a lucrative acquisition.", img: "https://i.pravatar.cc/150?img=33" }
];

const TESTIMONIALS = [
  { quote: "I used to lose sleep over money. Now, I have an automated system that runs in the background. It's truly life-changing.", name: "Amanda P.", title: "Software Engineer", avatarSrc: "https://i.pravatar.cc/100?img=1" },
  { quote: "The coaching paid for itself in the first month. We found so many leaks in our budget that we were completely blind to.", name: "James & Lily", title: "Small Business Owners", avatarSrc: "https://i.pravatar.cc/100?img=2" },
  { quote: "No judgment, just pure actionable advice. I finally understand what a Roth IRA is and why I need one.", name: "Robert K.", title: "Graphic Designer", avatarSrc: "https://i.pravatar.cc/100?img=3" },
  { quote: "I was terrified of looking at my bank account. Now I log in every morning with excitement because I know exactly where my money is going.", name: "Sophia W.", title: "Freelance Writer", avatarSrc: "https://i.pravatar.cc/100?img=4" },
  { quote: "The group coaching was incredible. Hearing other people's struggles made me realize I wasn't alone, and the accountability was unmatched.", name: "Ethan M.", title: "Teacher", avatarSrc: "https://i.pravatar.cc/100?img=5" },
  { quote: "If you want someone to just tell you what to do, this isn't it. If you want someone to teach you how to build wealth for life, this is the place.", name: "Olivia H.", title: "Marketing Director", avatarSrc: "https://i.pravatar.cc/100?img=6" }
];

export default function ClientSuccessPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredStudies = CASE_STUDIES.filter(
    (study) => activeTab === "All" || study.cat === activeTab
  );

  return (
    <>
      <PageHero
        headline="Real People. Real Results."
        subtext="Don't just take our word for it. See how our clients are transforming their financial lives."
        breadcrumb="Client Success"
      />

      {/* Video Spotlight */}
      <section className="py-12 md:py-16 lg:py-24 bg-bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full aspect-[4/3] md:aspect-video rounded-[20px] md:rounded-3xl overflow-hidden bg-black group cursor-pointer shadow-xl"
          >
            <Image src="/images/hero-coach.png" alt="Video thumbnail" fill className="object-cover opacity-60 group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/90 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 md:w-8 md:h-8 fill-white translate-x-1" />
              </div>
              <h3 className="font-serif text-[22px] md:text-3xl font-medium tracking-wide drop-shadow-md text-center px-6 leading-snug">
                "We paid off $80k in debt and bought our dream home."
              </h3>
              <p className="text-white/80 mt-2 text-[13px] md:text-sm font-medium">— The Anderson Family</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filterable Case Studies */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-3xl font-serif text-[#171310] mb-6 md:mb-8">Featured Case Studies</h2>
            
            {/* Filter Tabs - Horizontal scroll on mobile */}
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`whitespace-nowrap px-5 py-2.5 md:py-2 rounded-full text-[14px] md:text-sm font-medium transition-colors shrink-0 min-h-[44px] ${
                    activeTab === cat 
                      ? "bg-accent text-white shadow-md" 
                      : "bg-[#F7F4EE] text-text-muted hover:bg-[#EBE7DF]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={study.id}
                  className="bg-bg-cream rounded-[20px] md:rounded-2xl overflow-hidden border border-[#E7E2D9] shadow-sm flex flex-col"
                >
                  <div className="p-5 md:p-6 pb-0 flex items-center gap-4 mb-3 md:mb-4">
                    <img src={study.img} alt={study.name} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#E7E2D9] object-cover" />
                    <div>
                      <div className="text-[11px] md:text-xs font-bold text-accent tracking-wider uppercase mb-1">{study.cat}</div>
                      <div className="font-semibold text-[15px] md:text-base text-text-dark">{study.name}</div>
                    </div>
                  </div>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 flex-1 flex flex-col">
                    <h4 className="font-serif text-[18px] md:text-xl text-text-dark mb-2 md:mb-3">{study.metric}</h4>
                    <p className="text-[14px] md:text-sm text-text-muted leading-relaxed">{study.summary}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Wall */}
      <section className="py-12 md:py-16 lg:py-24 bg-bg-cream border-t border-[#E7E2D9]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-3xl font-serif text-[#171310] mb-3 md:mb-4">Wall of Love</h2>
            <p className="text-text-muted text-[15px] md:text-base">Words from our amazing community.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <TestimonialCard quote={t.quote} name={t.name} title={t.title} avatarSrc={t.avatarSrc} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
