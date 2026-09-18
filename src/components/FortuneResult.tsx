import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Fortune, ThemeMode } from '../types';
import { BookOpen, Sparkles, Award, RotateCcw, Quote, Compass } from 'lucide-react';
import { ThaiCornerOrnament, SangkhalokFish, SukhothaiLotus } from './SukhothaiMotifs';
import {
  MascotStele,
  MascotPrince,
  MascotPrincess,
  MascotSangkhalok,
  MascotRoyalElephant,
} from './SukhothaiMascots';
import { MASCOT_KNOWLEDGE_LIST } from '../data/mascotKnowledge';

interface FortuneResultProps {
  fortune: Fortune;
  onOpenStory: () => void;
  onStartMission: () => void;
  onOpenSouvenir: () => void;
  onDrawAgain: () => void;
  onBrowseAll: () => void;
  themeMode?: ThemeMode;
}

export const FortuneResult: React.FC<FortuneResultProps> = ({
  fortune,
  onOpenStory,
  onStartMission,
  onOpenSouvenir,
  onDrawAgain,
  onBrowseAll,
  themeMode = 'chibi3d',
}) => {
  const [flipped, setFlipped] = useState(true);
  const [showMascotBubble, setShowMascotBubble] = useState(true);
  const [mascotIndex, setMascotIndex] = useState(0);

  // Relevant mascot knowledge matching the category or cycle
  const currentMascot = MASCOT_KNOWLEDGE_LIST[mascotIndex % MASCOT_KNOWLEDGE_LIST.length];

  const handleNextMascot = () => {
    setMascotIndex((prev) => (prev + 1) % MASCOT_KNOWLEDGE_LIST.length);
    setShowMascotBubble(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 flex flex-col items-center">
      {/* Top Banner Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 space-y-1"
      >
        <span className="text-xs sm:text-sm uppercase tracking-widest text-[#c5a059] font-medium">
          ผลการเสี่ยงเซียมซี
        </span>
        <h2 className="font-thai-serif text-xl sm:text-2xl text-[#f5ecd8]">
          คุณได้เซียมซีหมายเลข
        </h2>
        <div className="font-thai-serif text-5xl sm:text-6xl font-black text-gold-gradient py-1">
          {fortune.numberStr}
        </div>
      </motion.div>

      {/* Main Content Area: Card in Center + น้องสุโขทัย แทรกอยู่ด้านข้าง */}
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 my-2">
        {/* 3D Flipping Fortune Card */}
        <div className="w-full max-w-xl perspective-1000">
        <motion.div
          initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring', damping: 20 }}
          className="relative bg-gradient-to-b from-[#251912] via-[#1c120c] to-[#140b07] rounded-3xl border-2 border-[#c5a059]/60 p-6 sm:p-8 shadow-2xl gold-glow"
        >
          {/* Thai Corner Ornaments */}
          <ThaiCornerOrnament position="tl" className="absolute top-2 left-2 w-7 h-7 text-[#c5a059]" />
          <ThaiCornerOrnament position="tr" className="absolute top-2 right-2 w-7 h-7 text-[#c5a059]" />
          <ThaiCornerOrnament position="bl" className="absolute bottom-2 left-2 w-7 h-7 text-[#c5a059]" />
          <ThaiCornerOrnament position="br" className="absolute bottom-2 right-2 w-7 h-7 text-[#c5a059]" />

          {/* Card Top Header */}
          <div className="flex items-center justify-between border-b border-[#3d2c1e] pb-4 mb-5">
            <div className="flex items-center gap-2">
              <SukhothaiLotus className="w-6 h-6 text-[#d4af37]" />
              <span className="text-xs tracking-wider text-[#b8a391] font-thai-serif">
                เซียมซีสุโขทัย หมายเลข {fortune.numberStr}
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#38261b] border border-[#c5a059]/30 text-xs font-semibold text-[#f7e0a3]">
              ✨ {fortune.blessing}
            </div>
          </div>

          {/* Card Main: Fortune Name & Reading */}
          <div className="space-y-4 text-center sm:text-left">
            <div>
              <span className="text-xs text-[#b09b88] tracking-widest block mb-1">
                เปิดดวงนำทาง
              </span>
              <h3 className="font-thai-serif text-2xl sm:text-3xl font-extrabold text-[#fae5b6] drop-shadow-sm leading-normal py-1">
                {fortune.name}
              </h3>
            </div>

            {/* Positive Reading */}
            <div className="p-4 rounded-xl bg-[#2a1d15]/80 border border-[#4a3424] text-sm sm:text-base text-[#edd8c4] leading-relaxed relative">
              <Quote className="w-4 h-4 text-[#c5a059]/40 absolute top-2 right-3" />
              <p>“{fortune.fortuneReading}”</p>
            </div>

            {/* Story & Mission Teasers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Linked Historical Story */}
              <div className="p-3.5 rounded-xl bg-[#1b120c] border border-[#3e2c1f] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#c5a059] font-medium mb-1">
                    <span>🏺 เรื่องราวสุโขทัยของคุณ</span>
                  </div>
                  <h4 className="font-thai-serif text-base sm:text-lg text-[#fff3db] font-bold leading-normal pt-1">
                    {fortune.storyTitle}
                  </h4>
                </div>
                <p className="text-xs text-[#9d8977] mt-2 leading-relaxed">
                  {fortune.evidence.significance}
                </p>
              </div>

              {/* Detective Mission Teaser */}
              <div className="p-3.5 rounded-xl bg-[#1b120c] border border-[#3e2c1f] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#d4af37] font-medium mb-1">
                    <span>🔎 ภารกิจนักอ่าน</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#f5ebd7] font-medium leading-snug">
                    {fortune.mission.missionPrompt}
                  </p>
                </div>
                <span className="text-[11px] text-[#8e7b6c] mt-2 block">
                  💡 คำถามนักสืบรอให้คุณค้นพบ
                </span>
              </div>
            </div>

            {/* Auspicious Blessing Tag */}
            <div className="flex items-center justify-center pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#291c14] border border-[#c5a059]/40 text-[#f5ecd8] text-xs sm:text-sm">
                <span className="text-[#d4af37]">✨ คำมงคล :</span>
                <span className="font-thai-serif font-bold text-[#fce8ba]">“{fortune.blessing}”</span>
              </div>
            </div>
          </div>
        </motion.div>
        </div>

        {/* Interactive 3D Mascot Companion on the side with speech bubble */}
        <div className="w-full lg:w-80 flex flex-col items-center">
          {/* Mascot speech bubble */}
          {showMascotBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full bg-gradient-to-b from-[#2b1e15] to-[#1a100a] border-2 border-[#d4af37] rounded-2xl p-4 shadow-xl text-left mb-3"
            >
              {/* Bubble pointer */}
              <div className="hidden lg:block absolute -left-2 top-10 w-4 h-4 rotate-45 bg-[#2b1e15] border-l-2 border-b-2 border-[#d4af37]" />
              <div className="lg:hidden absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#1a100a] border-r-2 border-b-2 border-[#d4af37]" />

              <div className="flex items-center justify-between gap-1 pb-1.5 mb-1.5 border-b border-[#453120]">
                <span className="font-thai-serif text-xs font-bold text-gold-gradient flex items-center gap-1">
                  💬 {currentMascot.name} ชวนรู้
                </span>
                <span className="text-[10px] text-[#baa592] bg-[#120a05] px-2 py-0.5 rounded-full border border-[#3e2c1d]">
                  {currentMascot.role}
                </span>
              </div>

              <p className="font-thai-serif text-xs sm:text-[13px] text-[#fffaed] leading-relaxed italic mb-2">
                {currentMascot.quote}
              </p>

              <div className="p-2 bg-[#140b06] rounded-xl border border-[#3e2b1d] text-xs text-[#d8c7b4] leading-snug space-y-1">
                <span className="text-[#ffd54f] font-semibold block text-[11px]">💡 เกร็ดประวัติศาสตร์:</span>
                <p>{currentMascot.facts[0]}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-[#453120] flex items-center justify-between text-[11px]">
                <button
                  onClick={handleNextMascot}
                  className="text-[#ffd54f] hover:text-white font-medium cursor-pointer underline underline-offset-2"
                >
                  ชวนเพื่อนมาสคอตตัวอื่นมาเล่า →
                </button>
                <button
                  onClick={() => setShowMascotBubble(false)}
                  className="text-[#8e7b68] hover:text-[#d4af37] cursor-pointer"
                >
                  ซ่อนบับเบิล
                </button>
              </div>
            </motion.div>
          )}

          {/* Clickable 3D Mascot Character */}
          <button
            onClick={() => {
              if (!showMascotBubble) {
                setShowMascotBubble(true);
              } else {
                handleNextMascot();
              }
            }}
            className="group relative flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform"
            aria-label={`มาสคอต ${currentMascot.name}`}
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] animate-bounce-gentle">
              {currentMascot.avatarType === 'stele' && <MascotStele className="w-full h-full" />}
              {currentMascot.avatarType === 'prince' && <MascotPrince className="w-full h-full" />}
              {currentMascot.avatarType === 'princess' && <MascotPrincess className="w-full h-full" />}
              {currentMascot.avatarType === 'sangkhalok' && <MascotSangkhalok className="w-full h-full" />}
              {currentMascot.avatarType === 'elephant' && <MascotRoyalElephant className="w-full h-full" />}
              {currentMascot.avatarType === 'siamsi' && <MascotStele className="w-full h-full" />}
            </div>

            <div className="mt-1 px-3 py-1 rounded-full bg-[#1e130c] border border-[#d4af37]/60 text-xs text-[#ffd54f] font-thai-serif font-bold shadow-md group-hover:bg-[#d4af37] group-hover:text-[#1b120c] transition-colors flex items-center gap-1">
              <span>แตะตัวฉันเพื่อฟังเกร็ดความรู้</span>
              <Sparkles className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>

      {/* Primary Action Buttons (as requested in Section 6) */}
      <div className="w-full max-w-xl mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
        {/* 1. Open Historical Story */}
        <button
          onClick={onOpenStory}
          className="flex-1 min-w-[140px] py-3.5 px-5 rounded-xl font-thai-serif text-sm sm:text-base font-bold text-[#1a0f08] bg-gradient-to-r from-[#e5cb7b] to-[#c79f4c] hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#ffea9f]"
        >
          <BookOpen className="w-4 h-4" />
          <span>📖 เปิดเรื่องราว</span>
        </button>

        {/* 2. Start Detective Mission */}
        <button
          onClick={onStartMission}
          className="flex-1 min-w-[140px] py-3.5 px-5 rounded-xl font-thai-serif text-sm sm:text-base font-bold text-[#fbf5e8] bg-gradient-to-r from-[#8f2f20] to-[#b3402e] hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#c95a48]"
        >
          <Sparkles className="w-4 h-4" />
          <span>🔎 ทำภารกิจ</span>
        </button>

        {/* 3. Souvenir Card (Personalized Souvenir Card System) */}
        <button
          onClick={onOpenSouvenir}
          className="flex-1 min-w-[170px] py-3.5 px-5 rounded-xl font-thai-serif text-sm sm:text-base font-bold text-[#f7e0a3] bg-[#2d1e15] hover:bg-[#3d2b1e] border border-[#c5a059]/60 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Award className="w-4 h-4 text-[#d4af37]" />
          <span>🎁 สร้างการ์ดที่ระลึกของฉัน</span>
        </button>

        {/* 4. Draw Again */}
        <button
          onClick={onDrawAgain}
          className="w-full sm:w-auto py-3 px-5 rounded-xl text-sm font-medium text-[#c5b19d] hover:text-[#f7e0a3] bg-[#1a120e] hover:bg-[#281b14] border border-[#38281d] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#c5a059]" />
          <span>🎋 เสี่ยงอีกครั้ง</span>
        </button>
      </div>

      {/* Quick link to see all 20 */}
      <button
        onClick={onBrowseAll}
        className="mt-6 text-xs text-[#ab9784] hover:text-[#d4af37] flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <Compass className="w-3.5 h-3.5" />
        <span>เลือกดูเซียมซีใบอื่น ๆ ทั้ง 20 ใบ</span>
      </button>
    </div>
  );
};
