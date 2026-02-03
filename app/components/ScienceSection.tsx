"use client";

import { CONTENT } from "../constants/content";
import { IOSCard } from "./IOSCard";
import { motion } from "framer-motion";

export const ScienceSection = () => {
  return (
    <section className="py-32 relative bg-primary section-overlap" id="science" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 100px), 0% 100%)' }}>
      <div className="container mx-auto px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-manrope mb-8 text-center"
          >
            {CONTENT.science.title}
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start mt-16">
            <div>
              <ul className="space-y-6">
                {CONTENT.science.bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-medical shrink-0" />
                    <p className="text-silver/80 leading-relaxed">{bullet}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <IOSCard className="p-8 bg-navy/40 border-white/5">
              <div className="text-medical font-bold text-sm uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                {CONTENT.science.mechanism.title}
              </div>
              <div className="grid gap-6">
                {CONTENT.science.mechanism.points.map((point, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-white font-bold text-lg mb-1">{point.title}</span>
                    <span className="text-silver/60 text-sm">{point.description}</span>
                  </div>
                ))}
              </div>
            </IOSCard>
          </div>
        </div>
      </div>
    </section>
  );
};
