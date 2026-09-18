import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { SiamSiLogo } from './SiamSiLogo';
import { Sparkles, FastForward, Compass } from 'lucide-react';
import { ThemeMode } from '../types';
import { MascotKnowledgeBar } from './MascotKnowledgeBar';

interface FortuneBoxProps {
  isShaking: boolean;
  onStartShake: () => void;
  onFinishShake: (drawnNumber: number) => void;
  onBrowseAll: () => void;
  targetFortuneId?: number;
  themeMode?: ThemeMode;
}

export const FortuneBox: React.FC<FortuneBoxProps> = ({
  isShaking,
  onStartShake,
  onFinishShake,
  onBrowseAll,
  targetFortuneId,
  themeMode = 'chibi3d',
}) => {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'shaking' | 'popping' | 'revealed'>('idle');
  const [drawnNum, setDrawnNum] = useState<number | null>(null);
  const rattleIntervalRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  // Clear all pending timers on unmount
  useEffect(() => {
    return () => {
      if (rattleIntervalRef.current) clearInterval(rattleIntervalRef.current);
      timeoutRefs.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const triggerGoldenSparks = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f6e6b4', '#b84a39', '#ffffff'],
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback silently if confetti is blocked
    }
  };

  const startAnimation = (explicitNum?: number) => {
    // Determine the number to draw (1-20)
    const resultNum = explicitNum ?? targetFortuneId ?? Math.floor(Math.random() * 20) + 1;
    setDrawnNum(resultNum);
    setAnimationPhase('shaking');

    // 1. Shaking sound loop
    soundFx.playStickRattle();
    const interval = window.setInterval(() => {
      soundFx.playStickRattle();
    }, 450);
    rattleIntervalRef.current = interval;

    // 2. After 2.2s, transition to stick popping out
    const popTimer = window.setTimeout(() => {
      if (rattleIntervalRef.current) {
        clearInterval(rattleIntervalRef.current);
        rattleIntervalRef.current = null;
      }
      setAnimationPhase('popping');
      soundFx.playStickPop();
      triggerGoldenSparks();
    }, 2200);
    timeoutRefs.current.push(popTimer);

    // 3. After 3.6s, show revealed number & chime
    const revealTimer = window.setTimeout(() => {
      setAnimationPhase('revealed');
      soundFx.playBellChime();
    }, 3500);
    timeoutRefs.current.push(revealTimer);

    // 4. After 4.8s, complete and transition to Result page
    const finishTimer = window.setTimeout(() => {
      onFinishShake(resultNum);
    }, 4800);
    timeoutRefs.current.push(finishTimer);
  };

  // Immediate Skip functionality requested by user
  const handleSkip = () => {
    if (rattleIntervalRef.current) {
      clearInterval(rattleIntervalRef.current);
      rattleIntervalRef.current = null;
    }
    timeoutRefs.current.forEach((id) => clearTimeout(id));
    timeoutRefs.current = [];

    const num = drawnNum ?? (targetFortuneId ?? Math.floor(Math.random() * 20) + 1);
    soundFx.playBellChime();
    onFinishShake(num);
  };

  // Trigger when parent changes isShaking prop
  useEffect(() => {
    if (isShaking && animationPhase === 'idle') {
      startAnimation();
    }
  }, [isShaking]);

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-6 sm:py-10 px-4">
      {/* Hero Headings */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-6 sm:mb-8">
        <h1 className="font-thai-serif text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight py-2 text-center flex flex-col items-center justify-center space-y-1 sm:space-y-2">
          <span className="text-gold-gradient">
            เซียมซีแห่งกาลเวลา
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-gradient">
            เปิดร่องรอยอดีตสุโขทัย
          </span>
        </h1>

        <p className="font-thai-serif text-base sm:text-xl text-[#f3e5ab] font-medium tracking-wide">
          จากตำนาน สู่หลักฐาน จากอดีต สู่การเรียนรู้ด้วย AI
        </p>

        <p className="text-sm sm:text-base text-[#d8c5b0] italic font-serif">
          “วันนี้...สุโขทัยมีอะไรอยากบอกคุณ?”
        </p>

        <div className="pt-1">
          <span className="inline-block px-3 py-1 rounded-md bg-[#241a14] border border-[#3e2e22] text-xs sm:text-sm text-[#bca793]">
            20 เลข • 20 ดวง • 20 เรื่องราว
          </span>
        </div>
      </div>

      {/* Cylinder & Fortune Sticks Centerpiece */}
      <div className="relative flex items-center justify-center my-4 select-none w-full">
        <div className="relative w-60 sm:w-72 h-76 sm:h-96 flex items-end justify-center">
        {/* Golden halo glow behind cylinder */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none ${
            animationPhase === 'shaking'
              ? 'bg-[#d4af37]/20 blur-2xl scale-125'
              : animationPhase === 'popping' || animationPhase === 'revealed'
              ? 'bg-[#d4af37]/35 blur-3xl scale-150'
              : 'bg-[#c5a059]/10 blur-xl scale-95'
          }`}
        />

        {/* Shaking Container with Motion */}
        <motion.div
          animate={
            animationPhase === 'shaking'
              ? {
                  rotate: [-7, 7, -6, 6, -5, 5, 0],
                  y: [0, -10, 2, -8, 2, 0],
                  x: [-3, 3, -3, 3, 0],
                }
              : { rotate: 0, y: 0, x: 0 }
          }
          transition={
            animationPhase === 'shaking'
              ? { repeat: Infinity, duration: 0.35, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
          className="relative flex flex-col items-center justify-end w-full h-full"
        >
          {/* Bamboo Fortune Sticks inside cylinder */}
          <div className="relative w-44 h-56 flex items-end justify-center overflow-visible z-10">
            {/* Cluster of background sticks */}
            {[-32, -24, -16, -8, 0, 8, 16, 24, 32].map((deg, index) => {
              const heightOffset = (index % 3) * 12;
              const isPoppingStick = index === 4; // Center stick

              return (
                <motion.div
                  key={index}
                  animate={
                    isPoppingStick && (animationPhase === 'popping' || animationPhase === 'revealed')
                      ? {
                          y: -135,
                          scale: 1.15,
                          rotate: 0,
                          boxShadow: '0 0 20px rgba(212,175,55,0.9)',
                        }
                      : animationPhase === 'shaking'
                      ? {
                          y: [(index % 2 === 0 ? -12 : 8), (index % 2 === 0 ? 8 : -12)],
                          rotate: deg + (index % 2 === 0 ? 3 : -3),
                        }
                      : { y: 0, rotate: deg }
                  }
                  transition={
                    isPoppingStick && (animationPhase === 'popping' || animationPhase === 'revealed')
                      ? { type: 'spring', stiffness: 220, damping: 14 }
                      : animationPhase === 'shaking'
                      ? { repeat: Infinity, repeatType: 'reverse', duration: 0.25 }
                      : { duration: 0.3 }
                  }
                  style={{
                    transformOrigin: 'bottom center',
                    height: `${175 + heightOffset}px`,
                  }}
                  className={`absolute bottom-0 w-3.5 sm:w-4 rounded-t-sm transition-colors border-t border-x ${
                    isPoppingStick && (animationPhase === 'popping' || animationPhase === 'revealed')
                      ? 'bg-gradient-to-t from-[#c5a059] via-[#f7e0a3] to-[#b83a2a] border-[#ffe89e] z-30'
                      : 'bg-gradient-to-t from-[#d1b280] via-[#e5cf9f] to-[#aa382c] border-[#91764c] z-10'
                  }`}
                >
                  {/* Vermilion red painted top of traditional Siamese fortune stick */}
                  <div className="w-full h-8 bg-gradient-to-b from-[#b8291b] to-[#8f1d12] rounded-t-sm flex items-center justify-center text-[9px] font-bold text-[#fce8ba]">
                    {isPoppingStick && drawnNum ? (
                      <span>{drawnNum < 10 ? `0${drawnNum}` : drawnNum}</span>
                    ) : (
                      <span>|</span>
                    )}
                  </div>
                  {/* Subtle bamboo grain line */}
                  <div className="w-[1px] h-full bg-[#8c6d3b]/30 mx-auto" />
                </motion.div>
              );
            })}
          </div>

          {/* Contemporary Sukhothai Cylinder (กระบอกเซียมซี) */}
          <div className="relative w-56 sm:w-64 h-52 sm:h-56 rounded-b-2xl bg-gradient-to-b from-[#3a251a] via-[#24160f] to-[#170e0a] border-2 border-[#c5a059] shadow-2xl flex flex-col items-center justify-between p-3 z-20 overflow-hidden">
            {/* Top gold metallic band with Sukhothai engraving rim */}
            <div className="w-full h-4 rounded-sm bg-gradient-to-r from-[#947228] via-[#f7df94] to-[#947228] shadow-md border-b border-[#ffd778]/50 flex items-center justify-center">
              <div className="w-20 h-1 bg-[#473412]/40 rounded-full" />
            </div>

            {/* Cylinder emblem / Inscription Motif with Requested Punchy Quote (ประโยคเด็ดบนกระบอกเซียมซี) */}
            <div className="my-auto w-full flex flex-col items-center text-center px-1 py-1">
              <div className="w-full rounded-xl bg-[#1d120a]/90 border border-[#d4af37]/45 shadow-inner px-2.5 py-2 flex flex-col items-center justify-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-center">
                  <SiamSiLogo size={22} showTextGlow={false} />
                  <span className="font-thai-serif text-xs sm:text-[13px] font-extrabold text-[#fae5b6] drop-shadow-sm leading-tight">
                    เสี่ยงเซียมซี<br />ทำนายอดีต
                  </span>
                </div>

                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent my-0.5" />

                <p className="text-[10px] sm:text-[11px] text-[#d6c4b2] font-medium leading-snug">
                  แต่คำตอบไม่ได้อยู่ในคำทำนาย
                </p>

                <p className="font-thai-serif text-[11px] sm:text-xs font-bold text-[#ffd778] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] leading-normal">
                  คำตอบอยู่ในหลักฐาน
                </p>
              </div>
            </div>

            {/* Bottom antique brass footing */}
            <div className="w-full h-3 bg-gradient-to-r from-[#805e1b] via-[#c5a059] to-[#805e1b] rounded-b-xl border-t border-[#f7e0a3]/40" />

            {/* Subtle cylinder shading reflections */}
            <div className="absolute inset-y-0 left-3 w-4 bg-white/5 blur-[2px] pointer-events-none" />
            <div className="absolute inset-y-0 right-3 w-6 bg-black/40 pointer-events-none" />
          </div>
        </motion.div>

        {/* Revealed Number Pop-up Card during animation */}
        <AnimatePresence>
          {animationPhase === 'revealed' && drawnNum && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: -60 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              className="absolute z-40 bg-gradient-to-b from-[#2e1f16] to-[#170e0a] border-2 border-[#f7df94] rounded-2xl p-5 shadow-2xl text-center gold-glow-lg flex flex-col items-center min-w-[200px]"
            >
              <span className="text-xs text-[#d6c4b2] font-thai-serif tracking-widest">
                คุณได้เซียมซีหมายเลข
              </span>
              <span className="font-thai-serif text-5xl font-black text-gold-gradient my-1">
                {drawnNum < 10 ? `0${drawnNum}` : drawnNum}
              </span>
              <span className="text-xs text-[#f5ecd8] flex items-center gap-1 mt-1">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                กำลังเปิดบันทึกประวัติศาสตร์...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>

      {/* Primary Action Button & Skip Control */}
      <div className="flex flex-col items-center w-full max-w-sm gap-3 mt-4 z-20">
        {animationPhase === 'idle' ? (
          <>
            <button
              onClick={() => startAnimation()}
              className={`w-full py-4 px-8 rounded-2xl font-thai-serif text-xl sm:text-2xl font-bold flex items-center justify-center gap-3 cursor-pointer ${
                themeMode === 'chibi3d'
                  ? 'btn-chibi-3d-gold text-[#2b1404]'
                  : 'text-[#1a0f08] bg-gradient-to-r from-[#e7cb76] via-[#f7e4a8] to-[#cba34f] hover:from-[#f3da88] hover:to-[#dfb55c] active:scale-[0.98] transition-all duration-200 shadow-xl gold-glow border border-[#fff2c2]'
              }`}
            >
              <span className="text-2xl animate-bounce">🎋</span>
              <span>เสี่ยงเซียมซี</span>
            </button>

            <p className="text-xs sm:text-sm text-[#d8c5b0] text-center font-medium">
              “กดหนึ่งครั้ง แล้วค้นพบเรื่องราวที่รอคุณอยู่”
            </p>
          </>
        ) : (
          <button
            onClick={handleSkip}
            className="px-6 py-2.5 rounded-full bg-[#2c1e15] hover:bg-[#3d2c1e] text-[#f7e0a3] border border-[#c5a059]/40 text-sm font-medium flex items-center gap-2 cursor-pointer transition-colors shadow"
          >
            <FastForward className="w-4 h-4 text-[#d4af37]" />
            <span>ข้ามอนิเมชัน</span>
          </button>
        )}

        {/* Secondary options */}
        {animationPhase === 'idle' && (
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={onBrowseAll}
              className="text-xs sm:text-sm text-[#ffd54f] hover:text-[#fff2c2] underline underline-offset-4 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>หรือ ดูเรื่องราวที่มีทั้งหมด 20 ใบ</span>
            </button>
          </div>
        )}

        {/* Bottom Tagline */}
        <div className="pt-4 text-center">
          <p className="text-xs text-[#a3907e] tracking-wider">
            อ่านจากร่องรอย • เรียนรู้จากหลักฐาน
          </p>
        </div>
      </div>

      {/* Interactive Mascot Knowledge Bar with Speech Bubbles (ตามภาพการ์ตูนสุโขทัย 3D) */}
      {animationPhase === 'idle' && (
        <div className="w-full mt-8 z-20">
          <MascotKnowledgeBar />
        </div>
      )}
    </div>
  );
};
