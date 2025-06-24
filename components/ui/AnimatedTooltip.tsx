'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AnimatedTooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedTooltip({
  content,
  children,
  className,
}: AnimatedTooltipProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className={'relative inline-block ' + (className ?? '')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-800 text-neutral-200 text-xs px-2 py-1 rounded-md shadow-lg z-50 pointer-events-none"
          >
            {content}
            <span className="absolute left-1/2 -bottom-1 w-2 h-2 -translate-x-1/2 rotate-45 bg-neutral-800"></span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
