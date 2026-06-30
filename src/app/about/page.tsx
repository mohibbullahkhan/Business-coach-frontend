"use client";

import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Heart, Shield, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const statsRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!statsRef.current) return;
    const ctx = gsap.context(() => {
      valuesRef.current.forEach((el) => {
        if (!el) return;
        const targetValue = parseInt(el.getAttribute("data-value") || "0", 10);
        
        gsap.to(el, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
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
    }, statsRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageHero
        headline="The Story Behind Clarity Finance"
        subtext="Empowering you to take control of your money, so it stops controlling you."
        breadcrumb="About"
      />

      {/* Founder Story Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-bg-cream text-text-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] overflow-hidden w-full max-w-[480px] mx-auto lg:mx-0 rounded-2xl lg:rounded-[24px] bg-[#EBE7DF]"
            >
              <Image src="/images/hero-coach.png" alt="Founder Portrait" fill className="object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col text-center lg:text-left items-center lg:items-start"
            >
              <h2 className="text-[28px] sm:text-[32px] md:text-4xl font-serif text-[#171310] mb-4 md:mb-6 leading-tight">
                Hi, I'm Alex. <br />
                <span className="italic font-light">I've been where you are.</span>
              </h2>
              <div className="w-12 h-1 bg-accent mb-6 md:mb-8"></div>
              
              <p className="text-text-muted text-[15px] sm:text-base mb-4 md:mb-5 leading-relaxed max-w-lg font-medium">
                A decade ago, I was drowning in $50,000 of debt despite making a great salary. I felt ashamed, stressed, and completely paralyzed by my finances. The traditional advice of "skip the latte" didn't work for me.
              </p>
              <p className="text-text-muted text-[15px] sm:text-base mb-4 md:mb-5 leading-relaxed max-w-lg font-medium">
                I realized that wealth building isn't just about math—it's about behavior, psychology, and having a realistic system that fits your life. After successfully paying off my debt and building a multi-six-figure portfolio, I made it my mission to help others do the same.
              </p>
              <p className="text-text-muted text-[15px] sm:text-base leading-relaxed max-w-lg font-medium">
                My philosophy is simple: money is a tool for freedom. Let's sharpen yours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials Timeline */}
      <section className="py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-3xl font-serif text-[#171310] mb-4">The Journey So Far</h2>
            <p className="text-text-muted text-[15px] sm:text-base">A timeline of milestones and continuous learning.</p>
          </motion.div>

          {/* Mobile: Vertical list with connecting line */}
          <div className="md:hidden space-y-8 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#E7E2D9] before:to-transparent">
            {[
              { year: "2015", title: "Debt Free Journey", desc: "Paid off $50k in debt." },
              { year: "2018", title: "Certified CFP®", desc: "Obtained official CFP® certification." },
              { year: "2020", title: "Clarity Finance", desc: "Launched full-time coaching." },
              { year: "2023", title: "2,000+ Clients", desc: "Impacting two thousand lives globally." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-start gap-4 group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white shadow shrink-0 z-10 text-sm font-bold mt-1">
                  {i + 1}
                </div>
                <div className="flex-1 p-5 rounded-2xl bg-bg-cream border border-[#E7E2D9] shadow-sm">
                  <span className="text-accent font-bold text-[13px] mb-1 block">{item.year}</span>
                  <h3 className="font-serif text-[17px] text-text-dark mb-1.5">{item.title}</h3>
                  <p className="text-[14px] text-text-muted leading-snug">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tablet/Desktop: Horizontal Scroll */}
          <div className="hidden md:flex overflow-x-auto pb-8 -mx-6 px-6 gap-6 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-6 min-w-max relative mt-4">
              {/* Horizontal line */}
              <div className="absolute top-[20px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E7E2D9] to-transparent z-0" />
              
              {[
                { year: "2015", title: "Debt Free Journey Completed", desc: "Paid off $50k in debt and discovered a passion for financial strategy." },
                { year: "2018", title: "Certified Financial Planner™", desc: "Obtained official CFP® certification to provide fiduciary-level advice." },
                { year: "2020", title: "Founded Clarity Finance", desc: "Launched full-time coaching to empower individuals with money." },
                { year: "2023", title: "2,000+ Clients Served", desc: "Reached a major milestone of impacting over two thousand lives globally." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative w-[300px] flex flex-col group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white shadow z-10 text-sm font-bold mx-auto mb-6 relative">
                    {i + 1}
                  </div>
                  <div className="p-6 rounded-2xl bg-bg-cream border border-[#E7E2D9] shadow-sm flex-1">
                    <span className="text-accent font-bold text-sm mb-2 block">{item.year}</span>
                    <h3 className="font-serif text-lg text-text-dark mb-2">{item.title}</h3>
                    <p className="text-[15px] text-text-muted">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Values Grid */}
      <section className="py-12 md:py-16 lg:py-24 bg-bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-3xl font-serif text-[#171310] mb-4">Core Principles</h2>
            <p className="text-text-muted text-[15px] sm:text-base">The foundation of every coaching session.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Target, title: "Clarity Over Complexity", desc: "We simplify the jargon into actionable steps." },
              { icon: Shield, title: "Zero Judgment", desc: "Your past mistakes don't define your financial future." },
              { icon: Zap, title: "Action-Biased", desc: "Theory is great, but execution is what builds wealth." },
              { icon: Heart, title: "Holistic Approach", desc: "Money affects life. We plan for the whole picture." },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-[20px] md:rounded-[24px] shadow-sm border border-[#E7E2D9]"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-5 md:mb-6">
                  <val.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-[18px] text-[#171310] mb-2 md:mb-3">{val.title}</h3>
                <p className="text-text-muted text-[14px] sm:text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Stats Strip */}
      <section ref={statsRef} className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#241E1A] to-[#171310] text-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center flex-wrap gap-10 md:gap-8 text-center">
          {[
            { val: "10", suffix: "+", label: "Years Experience" },
            { val: "2000", suffix: "+", label: "Clients Served" },
            { val: "15", suffix: "M+", label: "Debt Eliminated" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-[36px] sm:text-4xl md:text-5xl font-serif text-[#E5E0D8] mb-1 font-light italic">
                <span ref={el => { valuesRef.current[i] = el; }} data-value={stat.val}>0</span>{stat.suffix}
              </div>
              <div className="text-[11px] text-[#8B8682] font-medium tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
