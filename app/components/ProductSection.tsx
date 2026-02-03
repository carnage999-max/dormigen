"use client";

import { CONTENT } from "../constants/content";
import { IOSCard } from "./IOSCard";
import { CheckCircle2, Clock, Microscope, Award } from "lucide-react";

const PRODUCT_ICONS = [CheckCircle2, Clock, Microscope, Award];

export const ProductSection = () => {
  return (
    <section className="py-32 bg-mid-blue/10 section-overlap relative z-10" id="product" style={{ clipPath: 'polygon(0 100px, 100% 0, 100% 100%, 0% 100%)' }}>
      <div className="container mx-auto px-6 pt-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-manrope mb-6">
            {CONTENT.product.title}
          </h2>
          <p className="text-silver/70 text-lg">
            {CONTENT.product.copy}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CONTENT.product.cards.map((card, i) => {
            const Icon = PRODUCT_ICONS[i];
            return (
              <IOSCard key={i} className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-medical/10 border border-medical/20 flex items-center justify-center mb-6 text-medical">
                  {Icon && <Icon size={24} />}
                </div>
                <h4 className="text-xl font-bold mb-4">{card.title}</h4>
                <p className="text-silver/60 text-sm leading-relaxed flex-grow">
                  {card.content}
                </p>
              </IOSCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
