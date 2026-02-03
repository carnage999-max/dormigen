"use client";

import { useState } from "react";
import { CONTENT } from "../constants/content";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-navy relative z-10" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold font-manrope mb-16 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {CONTENT.faq.map((item, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl border transition-all overflow-hidden",
                openIndex === i ? "bg-white/5 border-medical/40" : "bg-white/[0.02] border-white/5 hover:border-white/10"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-lg">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={cn("text-silver/40 transition-transform duration-300", openIndex === i && "rotate-180 text-medical")}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-silver/70 leading-relaxed border-t border-white/5 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
