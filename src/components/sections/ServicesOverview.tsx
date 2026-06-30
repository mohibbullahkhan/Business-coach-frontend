"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, User, Briefcase, Wallet, Calendar, Users } from "lucide-react";

export function ServicesOverview() {
  const services = [
    { title: "1-on-1 Coaching Sessions", icon: User },
    { title: "Customized Budget Plan", icon: Briefcase },
    { title: "Debt Payoff Strategy", icon: Wallet },
    { title: "Monthly Progress Tracking", icon: Calendar },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle decorative dot top right */}
      <div className="hidden md:block absolute top-12 right-[15%] w-1.5 h-1.5 rounded-full bg-[#E84C3D]" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Services List */}
        <div className="flex flex-col gap-4 md:gap-5 relative order-2 lg:order-1">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex items-center justify-between bg-[#FDFCFB] border border-[#E7E2D9] shadow-sm rounded-xl md:rounded-[20px] p-4 md:p-5 cursor-pointer hover:shadow-md transition-all group min-h-[44px]"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E7E2D9] text-text-dark group-hover:text-accent transition-colors shrink-0">
                  <service.icon className="w-5 h-5 md:w-5 md:h-5 stroke-[1.5]" />
                </div>
                <span className="font-semibold text-text-dark text-[14px] md:text-[15px]">{service.title}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-text-dark transition-colors shrink-0" />
            </motion.div>
          ))}
        </div>

        {/* Right Column: Image & Floating Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-[420px] mx-auto lg:mx-0 lg:ml-auto w-full mt-10 lg:mt-0 order-1 lg:order-2 flex flex-col items-center pb-8 md:pb-0"
        >
          {/* Main Image */}
          <div className="relative w-full aspect-[4/5] bg-bg-cream rounded-2xl md:rounded-[24px] overflow-hidden">
            <Image 
              src="/images/hero-coach.png" 
              alt="Coach Portrait" 
              fill 
              className="object-cover object-top" 
            />
          </div>

          {/* Floating Card - Static on mobile, Absolute on md+ */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:absolute md:-bottom-10 md:-right-12 mt-6 md:mt-0 bg-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-[#E7E2D9] w-full max-w-[280px] md:w-[260px] z-10"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-serif italic text-2xl font-bold text-text-dark tracking-tight">Goals</h4>
              <button className="bg-[#171310] text-white text-[11px] font-semibold px-4 py-1.5 rounded-full hover:bg-black transition-colors tracking-wide min-h-[44px] flex items-center justify-center">
                Details
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[#D8B08B]/40 rounded-full flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#A56C3A] fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-[28px] font-bold text-text-dark leading-none mb-1 tracking-tight">85%</span>
                <span className="text-[11px] text-[#A5A09A] font-medium tracking-wide">Member Growth</span>
              </div>
            </div>
          </motion.div>
          
          {/* Subtle decorative dot bottom right */}
          <div className="hidden md:block absolute -bottom-20 right-12 w-1.5 h-1.5 rounded-full bg-[#E84C3D]" />
        </motion.div>

      </div>
    </section>
  );
}
