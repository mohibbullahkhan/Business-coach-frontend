"use client";

import { PageHero } from "@/components/ui/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Download, Mail } from "lucide-react";

const CATEGORIES = ["All", "Guides", "Templates", "Webinars"];

const RESOURCES = [
  { id: 1, cat: "Templates", title: "The 50/30/20 Budgeting Dashboard", excerpt: "A complete Notion template to track your income, fixed costs, and investments.", readTime: "5 min setup", img: "/images/hero-coach.png" },
  { id: 2, cat: "Guides", title: "How to Ask for a 20% Raise", excerpt: "A step-by-step script and negotiation guide for your next performance review.", readTime: "10 min read", img: "/images/stats-coach.png" },
  { id: 3, cat: "Webinars", title: "Investing 101: Index Funds Explained", excerpt: "A recorded 45-minute masterclass on how to start investing with just $100.", readTime: "45 min watch", img: "/images/hero-coach.png" },
  { id: 4, cat: "Templates", title: "Debt Snowball Calculator", excerpt: "Plug in your balances and interest rates to find your exact debt-free date.", readTime: "3 min setup", img: "/images/stats-coach.png" },
  { id: 5, cat: "Guides", title: "The Freelancer's Guide to Taxes", excerpt: "Stop fearing tax season. Learn how to track write-offs and estimate quarterly payments.", readTime: "15 min read", img: "/images/hero-coach.png" },
  { id: 6, cat: "Guides", title: "Couples & Money: Having the Talk", excerpt: "A workbook for partners to align on financial goals without fighting.", readTime: "20 min read", img: "/images/stats-coach.png" }
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredResources = RESOURCES.filter(
    (res) => activeTab === "All" || res.cat === activeTab
  );

  return (
    <>
      <PageHero
        headline="Free Resources to Build Your Financial Clarity"
        subtext="Actionable guides, templates, and workshops to help you master your money today."
        breadcrumb="Resources"
      />

      {/* Featured Lead Magnet */}
      <section className="py-12 md:py-16 lg:py-24 bg-bg-cream px-6">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[20px] md:rounded-[24px] overflow-hidden relative shadow-[0_20px_60px_-15px_rgba(200,150,100,0.3)]"
          style={{
            background: 'linear-gradient(to right, #D8B08B 0%, #C4986C 50%, #D8B08B 100%)'
          }}
        >
          <div className="relative z-10 py-10 md:py-16 px-6 md:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-white">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 md:py-1 rounded-full text-[11px] md:text-xs font-bold tracking-wide uppercase mb-4 md:mb-6 backdrop-blur-sm border border-white/10">
                <Download className="w-3 h-3 md:w-3 md:h-3" /> Featured Guide
              </div>
              <h2 className="text-[28px] sm:text-[32px] md:text-4xl font-serif font-bold italic mb-3 md:mb-4 drop-shadow-sm leading-tight">
                The Ultimate Wealth-Building Roadmap
              </h2>
              <p className="text-white/90 mb-6 md:mb-8 max-w-md mx-auto md:mx-0 text-[14px] md:text-[15px] font-medium tracking-wide drop-shadow-sm leading-relaxed">
                Get the exact 7-step blueprint I use with my 1:1 clients to automate their savings, crush debt, and start investing confidently.
              </p>
            </div>
            
            <div className="w-full md:w-[400px] bg-white rounded-[16px] md:rounded-2xl p-6 md:p-8 shadow-2xl text-text-dark">
              <h3 className="font-serif text-[20px] md:text-xl mb-1 md:mb-2 text-center">Where should we send it?</h3>
              <p className="text-[12px] md:text-xs text-text-muted text-center mb-5 md:mb-6">100% free. No spam ever.</p>
              <form className="space-y-3 md:space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="sr-only">First Name</label>
                  <input type="text" id="name" placeholder="First Name" className="w-full min-h-[44px] bg-[#F7F4EE] border border-[#E7E2D9] rounded-lg px-4 py-3 text-[14px] md:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" required />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input type="email" id="email" placeholder="Email Address" className="w-full min-h-[44px] bg-[#F7F4EE] border border-[#E7E2D9] rounded-lg px-4 py-3 text-[14px] md:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" required />
                </div>
                <button type="submit" className="w-full min-h-[44px] bg-[#171310] text-white hover:bg-black transition-colors py-3 rounded-lg text-[14px] md:text-sm font-semibold tracking-wide shadow-md flex items-center justify-center gap-2">
                  Send Me the Guide <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Resource Grid */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 gap-6"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-3xl font-serif text-[#171310]">Latest Resources</h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 w-full md:w-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`whitespace-nowrap px-5 py-2.5 md:py-2 rounded-full text-[14px] md:text-sm font-medium transition-colors shrink-0 min-h-[44px] ${
                    activeTab === cat 
                      ? "bg-[#171310] text-white shadow-sm" 
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
              {filteredResources.map((res) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={res.id}
                  className="bg-white rounded-[20px] md:rounded-2xl overflow-hidden border border-[#E7E2D9] shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#EBE7DF]">
                    <Image src={res.img} alt={res.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#171310] text-[11px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {res.cat}
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className="font-serif text-[18px] md:text-xl text-text-dark mb-2 md:mb-3 group-hover:text-accent transition-colors">{res.title}</h3>
                    <p className="text-[14px] md:text-sm text-text-muted leading-relaxed mb-5 md:mb-6 flex-1">{res.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F7F4EE]">
                      <span className="text-[11px] md:text-xs text-text-muted font-medium">{res.readTime}</span>
                      <span className="text-accent text-[13px] md:text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Strip */}
      <section className="py-16 md:py-20 bg-[#171310] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Mail className="w-8 h-8 md:w-10 md:h-10 text-accent mx-auto mb-4 md:mb-6" />
          <h2 className="text-[28px] sm:text-[32px] md:text-3xl font-serif italic mb-3 md:mb-4 leading-tight">The Weekly Wealth Drop</h2>
          <p className="text-[#B9B4AC] text-[14px] md:text-sm max-w-lg mx-auto mb-6 md:mb-8 leading-relaxed">
            Join 15,000+ subscribers who get one actionable money tip in their inbox every Tuesday morning. No fluff, just results.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-[14px] md:text-sm focus:outline-none focus:border-accent focus:bg-white/15 transition-all text-white placeholder-white/50 min-h-[44px]" 
              required
            />
            <button type="submit" className="min-h-[44px] bg-accent hover:bg-[#b56529] text-white px-8 py-3 rounded-full text-[14px] md:text-sm font-medium transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
