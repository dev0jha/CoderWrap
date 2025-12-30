'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressDotsProps {
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
}

export default function ProgressDots({ total, current, onDotClick }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick?.(index)}
          className={cn(
            'relative transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            index === current
              ? 'w-3 h-3'
              : 'w-2 h-2 hover:w-2.5 hover:h-2.5'
          )}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current ? 'true' : 'false'}
        >
          <motion.div
            initial={false}
            animate={{
              scale: index === current ? 1 : 0.7,
              opacity: index === current ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              'w-full h-full rounded-full',
              index === current
                ? 'bg-primary shadow-lg shadow-primary/50'
                : 'bg-muted-foreground hover:bg-primary/70'
            )}
          />
          {index === current && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={false}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
