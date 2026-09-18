import React from 'react';
import { motion } from 'motion/react';
import { ChibiMiniPagoda3D, ChibiSangkhalokFish } from './ChibiCharacters';

export const ChibiSceneBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft Golden Sunlight Orb */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#f59e0b]/20 via-[#ffd54f]/10 to-transparent blur-3xl rounded-full" />

      {/* Floating 3D Cloud 1 (Top Left) */}
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        className="absolute top-16 left-4 sm:left-12 opacity-35"
      >
        <svg width="120" height="48" viewBox="0 0 120 48" fill="none">
          <path
            d="M20 38C12 38 4 32 4 24C4 16 12 12 18 12C20 6 28 2 38 2C50 2 58 10 60 14C66 10 76 10 82 16C90 14 100 18 102 26C110 26 116 32 116 38C116 44 108 46 100 46L20 46C14 46 20 42 20 38Z"
            fill="url(#cloudGrad1)"
          />
          <defs>
            <linearGradient id="cloudGrad1" x1="60" y1="2" x2="60" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fdf0d5" />
              <stop offset="1" stopColor="#c5a059" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating 3D Cloud 2 (Top Right) */}
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        className="absolute top-24 right-6 sm:right-16 opacity-30"
      >
        <svg width="140" height="54" viewBox="0 0 140 54" fill="none">
          <path
            d="M25 44C15 44 6 36 6 28C6 18 15 14 22 14C24 6 34 2 46 2C60 2 70 12 72 16C78 12 90 12 98 18C108 16 120 20 122 30C132 30 138 36 138 44C138 50 128 52 118 52L25 52Z"
            fill="url(#cloudGrad2)"
          />
          <defs>
            <linearGradient id="cloudGrad2" x1="72" y1="2" x2="72" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffe6a7" />
              <stop offset="1" stopColor="#bb9457" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Miniature 3D Sukhothai Pagoda Stupas at bottom corners */}
      <div className="absolute bottom-4 left-3 sm:left-10 opacity-40 hover:opacity-80 transition-opacity">
        <ChibiMiniPagoda3D size={64} />
      </div>
      <div className="absolute bottom-6 right-3 sm:right-10 opacity-40 hover:opacity-80 transition-opacity">
        <ChibiMiniPagoda3D size={56} />
      </div>

      {/* Cute Floating Swimming Sangkhalok Fish in lower right */}
      <div className="absolute bottom-28 right-8 sm:right-24 opacity-45">
        <ChibiSangkhalokFish size={50} />
      </div>

      {/* Tiny Sparkles in the air */}
      {[
        { top: '20%', left: '15%', delay: 0 },
        { top: '35%', right: '20%', delay: 1.2 },
        { top: '65%', left: '10%', delay: 2.1 },
        { top: '75%', right: '12%', delay: 0.8 },
      ].map((star, i) => (
        <motion.div
          key={i}
          style={{ top: star.top, left: star.left, right: star.right }}
          animate={{
            scale: [0.6, 1.2, 0.6],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: star.delay,
            ease: 'easeInOut',
          }}
          className="absolute w-2 h-2 rounded-full bg-[#fde047] shadow-[0_0_8px_#fde047]"
        />
      ))}
    </div>
  );
};
