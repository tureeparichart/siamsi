import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Fortune, MissionState, ThemeMode } from '../types';
import { soundFx } from '../utils/audio';
import { ArrowLeft, CheckCircle2, AlertCircle, HelpCircle, Award, BookOpen, Sparkles, RefreshCw, XCircle } from 'lucide-react';
import { ThaiCornerOrnament, SukhothaiLotus } from './SukhothaiMotifs';

interface MissionSectionProps {
  fortune: Fortune;
  missionState: MissionState;
  onUpdateMissionState: (newState: MissionState) => void;
  onBackToStory: () => void;
  onGoToSouvenir: () => void;
  themeMode?: ThemeMode;
}

export const MissionSection: React.FC<MissionSectionProps> = ({
  fortune,
  missionState,
  onUpdateMissionState,
  onBackToStory,
  onGoToSouvenir,
  themeMode = 'chibi3d',
}) => {
  const [showClue, setShowClue] = useState(false);

  const handleSelectOption = (optionId: string) => {
    const selected = fortune.mission.options.find((o) => o.id === optionId);
    if (!selected) return;

    const isCorrect = selected.isCorrect;
    const nextAttempts = missionState.attempts + 1;
    const currentWrong = missionState.wrongOptionIds || [];

    if (isCorrect) {
      soundFx.playSuccessFanfare();
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f6e6b4', '#b84a39'],
        });
      } catch {
        // Fallback silently
      }

      onUpdateMissionState({
        answered: true,
        selectedOptionId: optionId,
        isCorrect: true,
        attempts: nextAttempts,
        wrongOptionIds: currentWrong,
      });
    } else {
      soundFx.playTryAgain();
      const updatedWrong = currentWrong.includes(optionId) ? currentWrong : [...currentWrong, optionId];

      onUpdateMissionState({
        answered: true,
        selectedOptionId: optionId,
        isCorrect: false,
        attempts: nextAttempts,
        wrongOptionIds: updatedWrong,
      });
    }
  };

  const handleRetry = () => {
    onUpdateMissionState({
      answered: false,
      selectedOptionId: null,
      isCorrect: false,
      attempts: missionState.attempts,
      wrongOptionIds: [],
    });
  };

  const selectedOption = fortune.mission.options.find(
    (o) => o.id === missionState.selectedOptionId
  );

  return (
    <div className="w-full max-w-3xl mx-auto py-6 sm:py-10 px-4">
      {/* Top Header & น้องสุโขทัย แทรกอยู่ด้านข้าง */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <button
            onClick={onBackToStory}
            className="inline-flex items-center gap-2 text-sm text-[#d4af37] hover:text-[#f7e0a3] transition-colors cursor-pointer bg-[#241710] px-3.5 py-1.5 rounded-lg border border-[#3e2c1e]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปอ่านเรื่องราว</span>
          </button>

          <span className="text-xs font-thai-serif text-[#bda793]">
            ภารกิจเซียมซี #{fortune.numberStr}
          </span>
        </div>
      </div>

      {/* Main Mission Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-b from-[#251912] via-[#1c120c] to-[#140b07] rounded-3xl border-2 border-[#c5a059]/50 p-6 sm:p-9 shadow-2xl space-y-6"
      >
        <ThaiCornerOrnament position="tl" className="absolute top-3 left-3 w-7 h-7 text-[#c5a059]" />
        <ThaiCornerOrnament position="tr" className="absolute top-3 right-3 w-7 h-7 text-[#c5a059]" />

        {/* Mission Banner */}
        <div className="text-center space-y-2 border-b border-[#3c2b1e] pb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3d291c] border border-[#c5a059]/40 text-xs font-semibold text-[#f7e0a3]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>ภารกิจนักสืบประวัติศาสตร์</span>
          </div>

          <h2 className="font-thai-serif text-xl sm:text-2xl md:text-3xl font-bold text-gold-gradient leading-normal py-1">
            {fortune.mission.missionPrompt}
          </h2>

          <p className="text-xs sm:text-sm text-[#baa592]">
            ใช้การสังเกตจากหลักฐานเพื่อหาคำตอบที่ถูกต้อง
          </p>
        </div>

        {/* The Detective Question */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1b120c] border border-[#4a3424] space-y-2">
          <span className="text-xs text-[#c5a059] font-semibold tracking-wide block">
            คำถามนักสืบ:
          </span>
          <p className="font-thai-serif text-base sm:text-lg text-[#fff3de] font-semibold leading-relaxed">
            {fortune.mission.question}
          </p>
        </div>

        {/* Clue/Hint Toggle */}
        <div className="flex flex-col items-start">
          <button
            onClick={() => setShowClue(!showClue)}
            className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] hover:text-[#f7e0a3] transition-colors cursor-pointer bg-[#2c1d14] px-3 py-1.5 rounded-lg border border-[#4d3625]"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showClue ? 'ซ่อนเบาะแส' : '💡 ต้องการเบาะแสช่วยคิด?'}</span>
          </button>

          <AnimatePresence>
            {showClue && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3.5 rounded-xl bg-[#2b1f17] border border-[#c5a059]/30 text-xs text-[#edd8c4] leading-relaxed w-full"
              >
                <span className="font-semibold text-[#f7df94]">เบาะแสนักสืบ: </span>
                {fortune.mission.clue}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {fortune.mission.options.map((option, index) => {
            const isWrongAttempt = (missionState.wrongOptionIds || []).includes(option.id);

            let optionStyle = 'bg-[#22160f] border-[#3d2a1d] text-[#e6d6c4] hover:bg-[#2e1f16] hover:border-[#c5a059]/40';

            if (missionState.isCorrect) {
              // ONLY when the user gets the correct answer do we reveal it in green!
              if (option.isCorrect) {
                optionStyle = 'bg-[#182c16] border-[#4caf50] text-[#e8f5e9] shadow-[0_0_18px_rgba(76,175,80,0.3)]';
              } else {
                optionStyle = 'bg-[#1a110b] border-[#2c1e15] text-[#786757] opacity-40 cursor-not-allowed';
              }
            } else {
              // When NOT yet answered correctly:
              // DO NOT REVEAL THE CORRECT ANSWER! Keep it looking like an ordinary selectable option.
              if (isWrongAttempt) {
                optionStyle = 'bg-[#2d1512]/80 border-[#e53935]/60 text-[#f5bcba] opacity-75 cursor-not-allowed';
              } else {
                optionStyle = 'bg-[#22160f] border-[#3d2a1d] text-[#e6d6c4] hover:bg-[#2e1f16] hover:border-[#c5a059]/60 active:scale-[0.99] cursor-pointer';
              }
            }

            const isDisabled = missionState.isCorrect || isWrongAttempt;

            return (
              <button
                key={option.id}
                disabled={isDisabled}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-4 rounded-xl border text-left text-sm sm:text-base font-medium transition-all flex items-start gap-3 ${optionStyle}`}
              >
                <div className="w-7 h-7 rounded-full bg-[#342419] flex items-center justify-center text-xs font-bold text-[#f7e0a3] shrink-0 mt-0.5">
                  {missionState.isCorrect && option.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#81c784]" />
                  ) : isWrongAttempt ? (
                    <XCircle className="w-5 h-5 text-[#ef5350]" />
                  ) : (
                    <span>{String.fromCharCode(65 + index)}</span>
                  )}
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="leading-snug">{option.text}</span>
                  {isWrongAttempt && !missionState.isCorrect && (
                    <span className="self-start sm:self-auto text-xs font-normal text-[#ef9a9a] bg-[#3a1512] px-2.5 py-0.5 rounded-full border border-[#e53935]/30 shrink-0">
                      ยังไม่ถูกต้อง
                    </span>
                  )}
                  {missionState.isCorrect && option.isCorrect && (
                    <span className="self-start sm:self-auto text-xs font-bold text-[#a5d6a7] bg-[#142812] px-2.5 py-0.5 rounded-full border border-[#4caf50]/40 shrink-0">
                      คำตอบที่ถูกต้อง
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Section (Do NOT reveal answer on incorrect attempt) */}
        <AnimatePresence>
          {missionState.answered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border ${
                missionState.isCorrect
                  ? 'bg-gradient-to-br from-[#1d3119] to-[#12220f] border-[#5bb450]'
                  : 'bg-gradient-to-br from-[#331815] to-[#200e0b] border-[#d9534f]'
              }`}
            >
              <div className="flex items-start gap-3">
                {missionState.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-[#81c784] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-[#ef5350] shrink-0 mt-0.5" />
                )}

                <div className="space-y-2.5 flex-1">
                  <h4 className="font-thai-serif text-lg font-bold">
                    {missionState.isCorrect ? (
                      <span className="text-[#a5d6a7]">
                        🎉 เก่งมาก! คุณค้นพบร่องรอยสำคัญและตอบถูกต้องแล้ว
                      </span>
                    ) : (
                      <span className="text-[#ef9a9a]">
                        ❌ ยังไม่ใช่คำตอบที่ถูกต้อง (ยังไม่เฉลยคำตอบ)
                      </span>
                    )}
                  </h4>

                  {/* ONLY reveal explanation when the answer is correct! */}
                  {missionState.isCorrect ? (
                    <>
                      {selectedOption && (
                        <p className="text-xs sm:text-sm text-[#e0d6c9] leading-relaxed">
                          {selectedOption.explanation}
                        </p>
                      )}

                      {/* Fun Fact revealed only on success */}
                      <div className="pt-2.5 border-t border-[#3d5e39] text-xs text-[#c8e6c9]">
                        <span className="font-semibold text-[#f1f8e9]">เกร็ดประวัติศาสตร์น่ารู้: </span>
                        {fortune.mission.funFact}
                      </div>
                    </>
                  ) : (
                    /* When incorrect: encourage to read clue or rethink, NO spoilers */
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm text-[#ecd9c7] leading-relaxed">
                        อย่าเพิ่งท้อแท้! ยังไม่มีการเฉลยคำตอบ ลองสังเกตตัวเลือกที่เหลือ หรือเปิดดู <span className="text-[#f7e0a3] font-semibold">“เบาะแสนักสืบ”</span> ด้านบน แล้วลองเลือกคำตอบใหม่อีกครั้ง
                      </p>
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        {!showClue && (
                          <button
                            type="button"
                            onClick={() => setShowClue(true)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#f7e0a3] bg-[#3a2216] hover:bg-[#4d2f1f] px-3 py-1.5 rounded-lg border border-[#c5a059]/40 cursor-pointer transition-colors"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>เปิดดูเบาะแสช่วยคิด</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={onBackToStory}
                          className="inline-flex items-center gap-1.5 text-xs text-[#d6c4b2] hover:text-[#fff] bg-[#22160f] hover:bg-[#2e1d14] px-3 py-1.5 rounded-lg border border-[#3e2c1e] cursor-pointer transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>กลับไปอ่านเรื่องราวจากหลักฐาน</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-[#3c2b1e] flex flex-col sm:flex-row items-center justify-between gap-3">
          {missionState.answered && !missionState.isCorrect ? (
            <div className="flex items-center gap-3 w-full justify-center sm:justify-start">
              <button
                onClick={handleRetry}
                className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#f7e0a3] bg-[#332216] hover:bg-[#453022] border border-[#c5a059]/50 flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>รีเซ็ตแล้วเลือกใหม่ทั้งหมด</span>
              </button>

              <button
                onClick={onBackToStory}
                className="py-2.5 px-4 rounded-xl text-xs sm:text-sm text-[#d6c4b2] hover:text-[#fff] bg-[#22160f] flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>กลับไปอ่านหลักฐาน</span>
              </button>
            </div>
          ) : null}

          {/* If correct, or user wants to proceed to souvenir */}
          <div className="w-full sm:w-auto ml-auto flex items-center gap-3">
            <button
              onClick={onGoToSouvenir}
              className={`w-full sm:w-auto py-3 px-6 rounded-xl font-thai-serif text-sm sm:text-base font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                missionState.isCorrect
                  ? 'text-[#1a0f08] bg-gradient-to-r from-[#e7cb76] to-[#cba34f] hover:brightness-110 gold-glow border border-[#fff0ba]'
                  : 'text-[#baa592] bg-[#22160f] hover:bg-[#2d1e15] border border-[#3e2c1e]'
              }`}
            >
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>{missionState.isCorrect ? '🎁 สร้างการ์ดที่ระลึกของฉัน' : 'ข้ามไปทำการ์ดที่ระลึก'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
