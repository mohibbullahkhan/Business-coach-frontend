"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Coaching", href: "/coaching" },
  { name: "Client Success", href: "/client-success" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname?.startsWith('/admin')) return null;

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 pointer-events-none">
        <div className={cn(
          "max-w-6xl mx-auto h-16 rounded-full flex items-center justify-between px-6 pointer-events-auto transition-all duration-300",
          "bg-[#1E1B19]/80 backdrop-blur-md border border-white/10",
          isScrolled && "shadow-lg bg-[#1E1B19]/95"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex flex-col items-center justify-center gap-[3px] bg-white text-black p-1 shrink-0">
              <div className="w-4 h-[2px] bg-[#171310] rounded-full self-start ml-1" />
              <div className="w-5 h-[2px] bg-[#171310] rounded-full" />
              <div className="w-4 h-[2px] bg-[#171310] rounded-full self-start ml-1" />
            </div>
            <span className="font-medium text-white text-lg tracking-wide hidden sm:block">
              Clarity Finance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-white flex items-center gap-1.5",
                    isActive ? "text-white" : "text-white/70"
                  )}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/booking" className="bg-[#D6A07B] hover:brightness-110 text-[#171310] text-sm font-semibold px-6 py-2.5 rounded-full transition-all inline-block min-w-[44px] min-h-[44px] flex items-center justify-center">
              Book Free Call
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="lg:hidden w-11 h-11 flex items-center justify-center text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[60] bg-[#171310] flex flex-col px-6 pt-6 pb-12 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-12 min-h-[64px]">
              <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-8 h-8 rounded-full flex flex-col items-center justify-center gap-[3px] bg-white text-black p-1 shrink-0">
                  <div className="w-4 h-[2px] bg-[#171310] rounded-full self-start ml-1" />
                  <div className="w-5 h-[2px] bg-[#171310] rounded-full" />
                  <div className="w-4 h-[2px] bg-[#171310] rounded-full self-start ml-1" />
                </div>
                <span className="font-medium text-white text-lg tracking-wide">
                  Clarity Finance
                </span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-white bg-white/10 rounded-full"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <motion.nav 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 flex-1 justify-center"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-3xl font-serif tracking-tight transition-colors flex items-center gap-4 py-2",
                        isActive ? "text-white italic" : "text-[#F7F4EE]/70"
                      )}
                    >
                      {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#D6A07B] block shrink-0" />}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <Link 
                href="/booking" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#D6A07B] text-[#171310] text-lg font-semibold px-6 py-4 rounded-full w-full block text-center transition-all min-h-[56px] flex items-center justify-center"
              >
                Book Free Call
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
