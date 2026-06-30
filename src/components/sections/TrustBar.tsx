"use client";

import { useEffect, useRef } from "react";
import { Users, Calendar, Target, Award, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { StatCard } from "@/components/ui/StatCard";

const STATS = [
  { icon: <Users className="w-5 h-5" />, value: "1000", suffix: "+", label: "Happy Clients" },
  { icon: <Calendar className="w-5 h-5" />, value: "10", suffix: "+", label: "Years Experience" },
  { icon: <Target className="w-5 h-5" />, value: "90", suffix: "%", label: "Goal Achievement" },
  { icon: <Award className="w-5 h-5" />, value: "Featured", suffix: "", label: "In Forbes" },
];

const TRUST_BADGES = [
  "Certified Financial Coach",
  "10+ Years Experience",
  "90% Client Success Rate"
];

export function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      valuesRef.current.forEach((el, index) => {
        if (!el || STATS[index].value === "Featured") return;
        
        const targetValue = parseInt(STATS[index].value, 10);
        
        gsap.to(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-24 bg-bg-cream text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[28px] md:text-[32px] lg:text-4xl font-serif text-text-dark mb-10 md:mb-16 leading-tight">
          Trusted by 1,000+ Clients Across the Globe
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat, i) => (
            <StatCard 
              key={i}
              icon={stat.icon}
              value={
                stat.value === "Featured" 
                  ? "Featured" 
                  : <><span ref={el => { valuesRef.current[i] = el; }}>0</span>{stat.suffix}</> as any
              }
              label={stat.label}
              valueClassName={stat.value === "Featured" ? "text-[24px] md:text-[28px] lg:text-3xl" : "text-[32px] md:text-[36px] lg:text-4xl"}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-accent text-[15px] sm:text-sm font-medium">
          {TRUST_BADGES.map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
