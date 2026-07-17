'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { BRANDING } from '@/constants/branding';

interface PreloaderProps {
  finishLoading: () => void;
}

export const Preloader = ({ finishLoading }: PreloaderProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  // Auto-finish after a minimum display time to ensure the animation is seen,
  // but also tied to hydration state in the provider.
  useEffect(() => {
    // Lock scrolling
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Minimum 2s premium feel

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  const handleExitComplete = () => {
    finishLoading();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0a0f1c] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 1.02,
            filter: shouldReduceMotion ? 'blur(0px)' : 'blur(8px)',
          }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Subtle Background Effects */}
          {!shouldReduceMotion && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white dark:from-blue-900/10 dark:via-[#0a0f1c] dark:to-[#0a0f1c] opacity-60" />
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-50 animate-pulse-slow" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-50" />
            </>
          )}

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Logo Container */}
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: shouldReduceMotion ? 0 : [0, 3, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, ease: "easeOut" },
                scale: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
                rotate: { duration: 2, ease: "easeInOut", times: [0, 0.5, 1] }
              }}
              className="relative w-32 h-32 md:w-40 md:h-40 mb-8"
            >
              <Image
                src={BRANDING.ASSETS.LOGO}
                alt={`${BRANDING.ORGANIZATION.NAME} Logo`}
                fill
                priority
                className="object-contain drop-shadow-xl"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                {BRANDING.ORGANIZATION.NAME}
              </h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium tracking-wide max-w-xs mx-auto leading-relaxed">
                Empowering Communities<br/>Changing Lives
              </p>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 w-48 md:w-64 h-[2px] bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative"
            >
              {!shouldReduceMotion ? (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-blue-600 dark:bg-blue-500 rounded-full"
                  initial={{ width: "0%", left: "0%" }}
                  animate={{ 
                    width: ["0%", "40%", "100%", "100%"],
                    left: ["0%", "0%", "100%", "100%"]
                  }}
                  transition={{ 
                    duration: 2, 
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              ) : (
                <div className="absolute inset-y-0 left-0 w-1/3 bg-blue-600 dark:bg-blue-500 rounded-full opacity-50" />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
