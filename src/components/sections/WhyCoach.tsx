"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";

const IMAGES = [
  "/images/why-1.png",
  "/images/why-2.png",
  "/images/why-3.png"
];

export function WhyCoach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-bg-cream text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[28px] sm:text-[30px] md:text-4xl lg:text-5xl font-serif text-text-dark mb-4 leading-tight">
          Why Work With a Financial Coach?
        </h2>
        <p className="text-text-muted text-[15px] sm:text-base max-w-xl mx-auto mb-10 md:mb-16">
          Master the art of public speaking, storytelling, and presentation — whether on stage, in meetings, or in the media.
        </p>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {IMAGES.map((src, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className={`relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-white/50 border border-border w-full ${
                i === 2 ? 'md:col-span-2 md:w-1/2 md:mx-auto lg:col-span-1 lg:w-full lg:mx-0' : ''
              }`}
            >
              <Image src={src} alt={`Coaching scene ${i + 1}`} fill className="object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
