"use client";

import { CONTENT } from "../constants/content";
import ThreeBackground from "./ThreeBackground";
import { motion } from "framer-motion";
import { Shield, Microscope, Activity } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onBuyClick?: () => void;
}

export const Hero = ({ onBuyClick }: HeroProps) => {
  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" 
    >
      <ThreeBackground />
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Large Logo in Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-10 md:mb-12"
        >
          <div className="relative w-48 h-48 md:w-72 md:h-72 drop-shadow-[0_0_50px_rgba(70,152,218,0.5)]">
            <Image
              src="/dormigen-logo.png"
              alt="Dormigen Logo"
              fill
              className="object-contain rounded-[40px] md:rounded-[60px]"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold font-manrope mb-6 tracking-tight text-white uppercase"
        >
          {CONTENT.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          {CONTENT.hero.support}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuyClick?.();
            }}
            className="w-full sm:w-auto px-10 py-5 bg-medical hover:bg-mid-blue text-white rounded-2xl font-bold text-lg transition-all shadow-2xl hover:shadow-medical/30 hover:-translate-y-1"
          >
            {CONTENT.hero.ctaPrimary}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-10 py-5 border border-white/30 hover:bg-white/5 text-white rounded-2xl font-bold text-lg transition-all"
          >
            {CONTENT.hero.ctaSecondary}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap justify-center gap-8 text-white text-sm font-bold"
        >
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-medical" />
            <span>{CONTENT.hero.trustChips[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Microscope size={18} className="text-medical" />
            <span>{CONTENT.hero.trustChips[1]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-medical" />
            <span>{CONTENT.hero.trustChips[2]}</span>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Mask for diagonal transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-navy" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)' }} />
    </section>
  );
};
