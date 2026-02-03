"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface IOSCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const IOSCard = ({ children, className, animate = true }: IOSCardProps) => {
  const content = (
    <div className={cn("ios-card p-8", className)}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
};
