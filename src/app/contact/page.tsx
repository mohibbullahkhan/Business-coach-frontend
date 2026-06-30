"use client";

import { PageHero } from "@/components/ui/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Send, CheckCircle2, Mail, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 800);
  };

  return (
    <>
      <PageHero
        headline="Let's Talk About Your Goals"
        breadcrumb="Contact"
        shorter={true}
      />

      <section className="py-12 md:py-16 lg:py-24 bg-bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Left Column: Form */}
            <div className="flex-1 bg-white p-6 md:p-12 rounded-[20px] md:rounded-3xl shadow-sm border border-[#E7E2D9]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="mb-6 md:mb-8">
                      <h2 className="text-[22px] md:text-2xl font-serif text-[#171310] mb-2">Apply for Coaching</h2>
                      <p className="text-text-muted text-[14px] md:text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-[13px] md:text-sm font-semibold text-text-dark">Full Name</label>
                        <div className={cn(
                          "border rounded-xl transition-colors duration-300 min-h-[44px]",
                          focusedField === "name" ? "border-accent ring-1 ring-accent" : "border-[#E7E2D9]"
                        )}>
                          <input 
                            type="text" 
                            id="name" 
                            required
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full h-[44px] md:h-auto bg-transparent px-4 py-3 md:py-3.5 text-[14px] md:text-sm focus:outline-none"
                            placeholder="Jane Doe"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[13px] md:text-sm font-semibold text-text-dark">Email Address</label>
                        <div className={cn(
                          "border rounded-xl transition-colors duration-300 min-h-[44px]",
                          focusedField === "email" ? "border-accent ring-1 ring-accent" : "border-[#E7E2D9]"
                        )}>
                          <input 
                            type="email" 
                            id="email" 
                            required
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full h-[44px] md:h-auto bg-transparent px-4 py-3 md:py-3.5 text-[14px] md:text-sm focus:outline-none"
                            placeholder="jane@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Revenue */}
                    <div className="space-y-2">
                      <label htmlFor="revenue" className="text-[13px] md:text-sm font-semibold text-text-dark">Current Monthly Income / Revenue</label>
                      <div className={cn(
                        "border rounded-xl transition-colors duration-300 min-h-[44px]",
                        focusedField === "revenue" ? "border-accent ring-1 ring-accent" : "border-[#E7E2D9]"
                      )}>
                        <select 
                          id="revenue"
                          required
                          onFocus={() => setFocusedField("revenue")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full h-[44px] md:h-auto bg-transparent px-4 py-3 md:py-3.5 text-[14px] md:text-sm focus:outline-none appearance-none cursor-pointer text-text-dark"
                        >
                          <option value="" disabled selected>Select an option</option>
                          <option value="under-5k">Under $5k / month</option>
                          <option value="5k-10k">$5k - $10k / month</option>
                          <option value="10k-25k">$10k - $25k / month</option>
                          <option value="25k-plus">$25k+ / month</option>
                        </select>
                      </div>
                    </div>

                    {/* Challenge */}
                    <div className="space-y-2">
                      <label htmlFor="challenge" className="text-[13px] md:text-sm font-semibold text-text-dark">What is your biggest financial challenge right now?</label>
                      <div className={cn(
                        "border rounded-xl transition-colors duration-300",
                        focusedField === "challenge" ? "border-accent ring-1 ring-accent" : "border-[#E7E2D9]"
                      )}>
                        <textarea 
                          id="challenge"
                          required
                          rows={4}
                          onFocus={() => setFocusedField("challenge")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent px-4 py-3 md:py-3.5 text-[14px] md:text-sm focus:outline-none resize-none"
                          placeholder="Tell me a bit about what's holding you back..."
                        />
                      </div>
                    </div>

                    {/* Call Time */}
                    <div className="space-y-2">
                      <label htmlFor="time" className="text-[13px] md:text-sm font-semibold text-text-dark">Preferred Call Time (Timezone)</label>
                      <div className={cn(
                        "border rounded-xl transition-colors duration-300 min-h-[44px]",
                        focusedField === "time" ? "border-accent ring-1 ring-accent" : "border-[#E7E2D9]"
                      )}>
                        <input 
                          type="text" 
                          id="time" 
                          required
                          onFocus={() => setFocusedField("time")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full h-[44px] md:h-auto bg-transparent px-4 py-3 md:py-3.5 text-[14px] md:text-sm focus:outline-none"
                          placeholder="e.g. Mornings (EST)"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full min-h-[48px] bg-accent text-white hover:bg-[#b56529] transition-colors py-3.5 md:py-4 rounded-xl text-[14px] md:text-sm font-bold tracking-wide shadow-md flex items-center justify-center gap-2 mt-2 md:mt-4"
                    >
                      Submit Application <Send className="w-4 h-4" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center h-full min-h-[400px] md:min-h-[500px] py-12"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5 md:mb-6">
                      <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <h2 className="text-[26px] md:text-3xl font-serif text-[#171310] mb-3 md:mb-4">Application Received!</h2>
                    <p className="text-text-muted text-[14px] md:text-base max-w-md mx-auto leading-relaxed">
                      Thank you for taking the first step. We'll review your application and email you within 24 hours to schedule your strategy call.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Sidebar / Cal */}
            <div className="w-full lg:w-[400px] flex flex-col gap-6">
              {/* Profile Card */}
              <div className="bg-white p-6 md:p-8 rounded-[20px] md:rounded-3xl shadow-sm border border-[#E7E2D9]">
                <div className="flex items-center gap-4 mb-6">
                  <Image src="/images/hero-coach.png" alt="Coach Profile" width={64} height={64} className="rounded-full border-2 border-bg-cream object-cover bg-[#EBE7DF] md:w-[80px] md:h-[80px]" />
                  <div>
                    <h3 className="font-serif text-[18px] md:text-xl text-text-dark">Alex Rivera</h3>
                    <p className="text-[13px] md:text-sm text-text-muted font-medium">Head Coach & Founder</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-[13px] md:text-sm text-text-muted">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <a href="mailto:hello@clarityfinance.com" className="hover:text-accent transition-colors break-all">hello@clarityfinance.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-accent shrink-0" />
                    <span>Response within 24 hours</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="leading-snug">Based in New York (EST), serving clients globally.</span>
                  </div>
                </div>
              </div>

              {/* Calendly Embed Placeholder */}
              <div className="bg-white p-6 md:p-8 rounded-[20px] md:rounded-3xl shadow-sm border border-[#E7E2D9] flex-1 flex flex-col items-center justify-center min-h-[250px] md:min-h-[300px]">
                <div className="text-center w-full">
                  <h4 className="font-serif text-[17px] md:text-lg text-text-dark mb-2">Book Directly</h4>
                  <p className="text-[11px] md:text-xs text-text-muted mb-5 md:mb-6">Skip the form and grab a time directly on my calendar.</p>
                  
                  {/* Note: Insert actual Calendly / Cal.com embed script here */}
                  <div id="cal-embed" className="w-full h-[180px] md:h-[200px] bg-[#F7F4EE] border border-dashed border-[#D8B08B] rounded-[12px] md:rounded-xl flex items-center justify-center">
                    <span className="text-[13px] md:text-sm text-text-muted font-medium">Calendly Embed Placeholder</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
