"use client";

import { CONTENT } from "../constants/content";
import { IOSCard } from "./IOSCard";
import { motion } from "framer-motion";
import { ImageLightbox } from "./ImageLightbox";

export const OutcomesSection = () => {
  return (
    <section className="py-32 bg-navy relative z-10" id="outcomes">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-manrope mb-6 text-white"
          >
            {CONTENT.outcomes.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-silver/70 text-lg"
          >
            {CONTENT.outcomes.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {CONTENT.outcomes.items.map((item, i) => (
            <IOSCard 
              key={item.id} 
              className="p-0 overflow-hidden group flex flex-col h-full bg-navy/40 border-white/10"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <ImageLightbox 
                  src={item.image} 
                  alt={item.title} 
                  title={item.title}
                  description={item.description}
                  className="w-full h-full"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-medical/80">Mechanism 0{i + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-medical transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-silver/60 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </IOSCard>
          ))}
        </div>
      </div>
    </section>
  );
};
