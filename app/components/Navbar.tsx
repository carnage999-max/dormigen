"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Outcomes", href: "#outcomes" },
  { name: "Science", href: "#science" },
  { name: "Product", href: "#product" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
            scrolled ? "glass-panel shadow-lg" : "bg-transparent"
          )}
        >
          {/* Desktop Left Nav */}
          <div className="hidden lg:flex items-center space-x-8 flex-1">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-silver/80 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Centered Logo */}
          <div className="flex items-center justify-center space-x-3 px-4">
            <Image
              src="/dormigen-logo.png"
              alt="Dormigen Logo"
              width={64}
              height={64}
              className="object-contain w-12 h-12 md:w-16 md:h-16 transform scale-125"
            />
            <span className="text-xl font-bold tracking-tighter font-manrope">
              DORMIGEN®
            </span>
          </div>

          {/* Desktop Right Nav + CTA */}
          <div className="hidden lg:flex items-center justify-end space-x-8 flex-1">
            {NAV_LINKS.slice(3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-silver/80 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#buy"
              className="bg-medical hover:bg-mid-blue text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(70,152,218,0.3)] hover:shadow-[0_0_20px_rgba(70,152,218,0.5)]"
            >
              Buy Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-medical transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="lg:hidden absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="mx-6 mt-2 p-6 glass-panel rounded-3xl space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-silver hover:text-white py-2 border-b border-white/5 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#buy"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-medical text-white text-center py-4 rounded-2xl font-bold text-lg"
              >
                Buy Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
