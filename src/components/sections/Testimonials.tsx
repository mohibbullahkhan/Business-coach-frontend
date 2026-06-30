"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote: "I used to live paycheck to paycheck. Now I have savings, a plan, and peace of mind. Coaching changed my life.",
    name: "Jasmine L.",
    title: "Designer",
    avatarSrc: "https://i.pravatar.cc/100?img=47"
  },
  {
    quote: "I finally paid off my credit cards and learned how to manage my money without stress. It feels amazing.",
    name: "Daniel R.",
    title: "Engineer",
    avatarSrc: "https://i.pravatar.cc/100?img=11"
  },
  {
    quote: "I didn't grow up learning about money. This coaching gave me confidence and tools to secure my future.",
    name: "Amanda T.",
    title: "Entrepreneur",
    avatarSrc: "https://i.pravatar.cc/100?img=5"
  },
  {
    quote: "The personalized strategy helped me invest for the first time. I now feel in control of my financial destiny.",
    name: "Michael B.",
    title: "Consultant",
    avatarSrc: "https://i.pravatar.cc/100?img=8"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const visibleTestimonials = Array.from({ length: itemsToShow }).map((_, i) => {
    return TESTIMONIALS[(currentIndex + i) % TESTIMONIALS.length];
  });

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-bg-cream text-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[28px] sm:text-[32px] md:text-4xl lg:text-5xl font-serif text-text-dark mb-4 leading-tight">
          Real People. Real Results.
        </h2>
        <p className="text-text-muted text-[15px] sm:text-base max-w-xl mx-auto mb-10 md:mb-16">
          See how real clients broke free from financial stress and transformed their money mindset — with support, strategy, and accountability.
        </p>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Desktop/Tablet Grid (Hidden on mobile) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 text-left min-h-[250px]">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((testimonial, i) => (
                <motion.div
                  key={`${currentIndex}-${testimonial.name}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Swipeable Carousel (Hidden on md+) */}
          <div className="md:hidden relative text-left min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
              >
                <TestimonialCard {...TESTIMONIALS[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col items-center gap-6 mt-16 md:mt-12">
            
            {/* Dots */}
            <div className="flex items-center justify-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="flex items-center justify-center w-11 h-11"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span className={cn(
                    "block h-2 rounded-full transition-all duration-300",
                    currentIndex === idx ? "w-6 bg-[#D98C4A]" : "w-2 bg-[#E5E0D8]"
                  )} />
                </button>
              ))}
            </div>

            {/* Arrows (Hidden on Mobile) */}
            <div className="hidden md:flex items-center justify-center gap-4">
              <button 
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-[#E5E0D8] bg-transparent flex items-center justify-center text-[#B9B4AC] hover:bg-white hover:text-[#1F1A16] transition-colors shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-[#D98C4A] flex items-center justify-center text-white hover:bg-[#c67c3f] transition-colors shadow-md"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
