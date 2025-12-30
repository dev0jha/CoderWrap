'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import ProgressDots from './ProgressDots';
import { cn } from '@/lib/utils';

interface SlideContainerProps {
  children: ReactNode[];
  initialSlide?: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function SlideContainer({ children, initialSlide = 0 }: SlideContainerProps) {
  const [[page, direction], setPage] = useState([initialSlide, 0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slideIndex = page % children.length;

  const paginate = useCallback(
    (newDirection: number) => {
      if (isTransitioning) return;

      const newPage = page + newDirection;
      if (newPage < 0 || newPage >= children.length) return;

      setIsTransitioning(true);
      setPage([newPage, newDirection]);
      
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [page, children.length, isTransitioning]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === page) return;
      
      const newDirection = index > page ? 1 : -1;
      setIsTransitioning(true);
      setPage([index, newDirection]);
      
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [page, isTransitioning]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const handleDragEnd = (_e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Slide content */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full"
          >
            {children[slideIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <ProgressDots
          total={children.length}
          current={page}
          onDotClick={goToSlide}
        />
      </div>

      {/* Navigation arrows */}
      {page > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => paginate(-1)}
          disabled={isTransitioning}
          className={cn(
            'absolute left-4 top-1/2 transform -translate-y-1/2 z-10',
            'w-12 h-12 rounded-full bg-secondary/80 backdrop-blur',
            'flex items-center justify-center',
            'hover:bg-secondary transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
      )}

      {page < children.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => paginate(1)}
          disabled={isTransitioning}
          className={cn(
            'absolute right-4 top-1/2 transform -translate-y-1/2 z-10',
            'w-12 h-12 rounded-full bg-secondary/80 backdrop-blur',
            'flex items-center justify-center',
            'hover:bg-secondary transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      )}

      {/* Slide counter */}
      <div className="absolute top-6 right-6 z-10">
        <div className="px-4 py-2 rounded-full bg-secondary/80 backdrop-blur text-sm font-medium">
          {page + 1} / {children.length}
        </div>
      </div>
    </div>
  );
}
