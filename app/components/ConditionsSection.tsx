"use client";

import { CONTENT } from "../constants/content";
import { motion } from "framer-motion";
import { Search, Activity } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ConditionsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = CONTENT.conditions.categories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <section className="py-32 bg-navy relative overflow-hidden" id="conditions">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-medical/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-medical/10 border border-medical/20 text-medical text-xs font-bold tracking-widest uppercase mb-6"
          >
            <Activity size={14} />
            Clinical Relevance
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-manrope mb-6 text-white"
          >
            {CONTENT.conditions.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-silver/70 text-lg leading-relaxed"
          >
            {CONTENT.conditions.subtitle}
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16 px-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-silver/40 group-focus-within:text-medical transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-silver/30 focus:outline-none focus:border-medical/50 focus:ring-4 focus:ring-medical/5 transition-all"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCategories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white/5 border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.07] transition-all hover:-translate-y-1">
                <h3 className="text-medical font-bold text-sm uppercase tracking-widest mb-6 pb-4 border-b border-white/5">
                  {category.name}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="text-silver/80 text-sm leading-snug flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-medical/40 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-silver/40">No conditions match your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};
