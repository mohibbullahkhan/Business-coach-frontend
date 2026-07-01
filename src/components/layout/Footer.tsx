"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const FOOTER_LINKS = {
  "Quick Links": [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Coaching", href: "/coaching" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ],
  "Social Media": [
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "Facebook", href: "#" },
  ],
  "Free Resources": [
    { name: "Budgeting Toolkit", href: "#" },
    { name: "Debt Payoff Worksheet", href: "#" },
    { name: "Money Mindset", href: "#" },
    { name: "Free Financial Checklist", href: "#" },
  ],
  "Explore More": [
    { name: "FAQs", href: "#" },
    { name: "Money Education Hub", href: "#" },
    { name: "Tools & Calculators", href: "#" },
    { name: "Partner with Us", href: "#" },
  ]
};

export function Footer() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (category: string) => {
    setOpenSections(prev => ({ ...prev, [category]: !prev[category] }));
  };

  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-[#FAF8F5] pt-12 pb-8">
      <div className="max-w-[1300px] mx-auto px-6">
        
        {/* Top Pill Bar */}
        <div className="bg-[#F0EDEA] rounded-3xl md:rounded-full px-6 py-6 md:px-8 md:py-3 flex flex-col md:flex-row items-center justify-between mb-16 md:mb-20 shadow-[inset_0_2px_10px_-5px_rgba(0,0,0,0.05)] gap-6 md:gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
            <div className="w-8 h-8 rounded-full bg-[#1F1A16] flex items-center justify-center relative overflow-hidden shrink-0">
               <div className="w-[18px] h-[2px] bg-white absolute top-[10px]" />
               <div className="w-[22px] h-[2px] bg-white absolute top-[15px]" />
               <div className="w-[18px] h-[2px] bg-white absolute top-[20px]" />
            </div>
            <span className="font-bold text-[22px] text-[#1F1A16] tracking-tight">Clarity Finance</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2 md:p-1 rounded-2xl md:rounded-full shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] w-full md:w-auto md:min-w-[360px]">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent border-none outline-none text-[#1F1A16] px-4 py-3 md:py-2 w-full text-[15px] md:text-[14px] placeholder:text-[#B9B4AC]"
            />
            <button className="bg-[#D8B08B] hover:bg-[#c49a75] text-white transition-colors h-12 md:h-10 px-8 rounded-xl md:rounded-full text-[14px] md:text-[13px] font-semibold whitespace-nowrap w-full sm:w-auto min-h-[44px]">
              Join Community
            </button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-12 xl:gap-16 mb-20">
          
          {/* Profile Image & Floating Card */}
          <div className="w-full xl:w-[320px] shrink-0">
            <div className="relative aspect-[4/4.5] w-full max-w-[360px] mx-auto xl:mx-0 rounded-[28px] overflow-hidden bg-[#B3C0C9] shadow-lg">
              <Image src="/images/footer-coach.png" alt="Robert Muler" fill className="object-cover" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#F8F7F5]/95 backdrop-blur-md rounded-[20px] p-4 flex items-center justify-between shadow-lg border border-white/60">
                <div>
                  <div className="font-bold text-[#1F1A16] text-[15px] tracking-tight mb-0.5">Robert Muler</div>
                  <div className="text-[12px] text-[#B9B4AC] font-medium">Financial Coach</div>
                </div>
                <div className="grid grid-cols-2 gap-x-2.5 gap-y-2 text-[#1F1A16] items-center">
                  <div className="cursor-pointer hover:text-[#D8B08B] transition-colors justify-self-center flex items-center justify-center w-[15px] h-[15px]">
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                  <div className="w-[18px] h-[18px] bg-[#1F1A16] text-white flex items-center justify-center rounded-[5px] cursor-pointer hover:bg-[#D8B08B] transition-colors justify-self-center min-h-[24px] min-w-[24px]">
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  <div className="cursor-pointer hover:text-[#D8B08B] transition-colors justify-self-center flex items-center justify-center w-[15px] h-[15px]">
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </div>
                  <div className="text-[12px] font-bold cursor-pointer hover:text-[#D8B08B] transition-colors justify-self-center leading-none">X</div>
                </div>
              </div>
            </div>
          </div>

          {/* Links (Accordion on Mobile, Grid on Tablet/Desktop) */}
          <div className="w-full xl:flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-8 lg:pt-2">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => {
              const isOpen = openSections[category];
              
              return (
                <div key={category} className="border-b border-[#E5E0D8] md:border-none">
                  <button 
                    onClick={() => toggleSection(category)}
                    className="w-full flex items-center justify-between md:cursor-default py-4 md:py-0 md:mb-8 focus:outline-none min-h-[44px]"
                  >
                    <h4 className="font-bold text-[#1F1A16] text-[16px] md:text-[15px]">{category}</h4>
                    <ChevronDown className={cn("w-5 h-5 text-[#8B8682] md:hidden transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>
                  
                  {/* Desktop view: always visible. Mobile view: animated height */}
                  <div className="hidden md:block">
                    <ul className="space-y-4">
                      {links.map((link) => (
                        <li key={link.name}>
                          <Link 
                            href={link.href}
                            className="text-[14px] text-[#5C5753] hover:text-[#D8B08B] transition-colors font-medium flex items-center gap-1.5 min-h-[32px] md:min-h-0"
                          >
                            {link.name}
                            {link.name === "Budgeting Toolkit" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E84C3D] inline-block -mt-1" />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden"
                      >
                        <ul className="space-y-3 pb-6">
                          {links.map((link) => (
                            <li key={link.name}>
                              <Link 
                                href={link.href}
                                className="text-[15px] text-[#5C5753] active:text-[#D8B08B] transition-colors font-medium flex items-center gap-1.5 py-1 min-h-[44px]"
                              >
                                {link.name}
                                {link.name === "Budgeting Toolkit" && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#E84C3D] inline-block -mt-1" />
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E5E0D8] flex flex-col md:flex-row items-center justify-between gap-6 text-[14px] md:text-[13px] text-[#8B8682] font-medium text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 min-h-[44px] items-center">
             <span>@copyright 2025</span>
             <Link href="#" className="hover:text-[#1F1A16] transition-colors py-2 md:py-0">Privacy Policy</Link>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8 min-h-[44px] items-center">
            <Link href="#" className="hover:text-[#1F1A16] transition-colors py-2 md:py-0">Terms & Condition</Link>
            <span className="py-2 md:py-0">All rights reserved.</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
