import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Fortune, ThemeMode } from '../types';
import { ArrowLeft, Sparkles, Award, MapPin, ScrollText, BookOpen, Compass, MessageCircle, X, Search } from 'lucide-react';
import { ThaiCornerOrnament, SangkhalokFish, SukhothaiLotus } from './SukhothaiMotifs';
import { MascotStele, MascotSangkhalok, MascotPrince } from './SukhothaiMascots';
import { MASCOT_KNOWLEDGE_LIST } from '../data/mascotKnowledge';

interface StorySectionProps {
  fortune: Fortune;
  onBackToResult: () => void;
  onGoToMission: () => void;
  onGoToSouvenir: () => void;
  onBrowseAll: () => void;
  themeMode?: ThemeMode;
}

export const StorySection: React.FC<StorySectionProps> = ({
  fortune,
  onBackToResult,
  onGoToMission,
  onGoToSouvenir,
  onBrowseAll,
  themeMode = 'chibi3d',
}) => {
  const [showSteleBubble, setShowSteleBubble] = useState(true);
  const steleKnowledge = MASCOT_KNOWLEDGE_LIST.find((m) => m.id === 'stele') || MASCOT_KNOWLEDGE_LIST[0];

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4">
      {/* Top Navigation & น้องสุโขทัย แทรกอยู่ด้านข้าง */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <button
            onClick={onBackToResult}
            className="inline-flex items-center gap-2 text-sm text-[#d4af37] hover:text-[#f7e0a3] transition-colors cursor-pointer bg-[#241710] px-3.5 py-1.5 rounded-lg border border-[#3e2c1e]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปหน้าผลเซียมซี</span>
          </button>

          <button
            onClick={onBrowseAll}
            className="text-xs text-[#baa592] hover:text-[#f7e0a3] flex items-center gap-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>ดูทั้ง 20 เรื่อง</span>
          </button>
        </div>

        {/* Quick Stele Mascot Trigger */}
        <button
          onClick={() => setShowSteleBubble(!showSteleBubble)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#27180e] border border-[#d4af37]/50 text-xs font-thai-serif text-[#ffd54f] hover:bg-[#382315] transition-colors cursor-pointer"
        >
          <div className="w-6 h-6">
            <MascotStele className="w-full h-full" />
          </div>
          <span>{showSteleBubble ? 'ซ่อนเกร็ดศิลาจารึก' : '💬 คุยกับน้องศิลาจารึก'}</span>
        </button>
      </div>

      {/* Interactive Mascot Stele Speech Bubble (เกร็ดความรู้เกี่ยวกับศิลาจารึก) */}
      {showSteleBubble && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-[#291b11] via-[#20140c] to-[#170e08] border-2 border-[#d4af37] rounded-2xl p-4 sm:p-5 shadow-2xl relative"
        >
          <button
            onClick={() => setShowSteleBubble(false)}
            className="absolute top-3 right-3 text-[#a89582] hover:text-white p-1 rounded-full"
            aria-label="ปิดเกร็ดความรู้"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Clickable Stele mascot avatar */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] animate-bounce-gentle">
                <MascotStele className="w-full h-full" />
              </div>
              <span className="text-[11px] font-thai-serif font-bold text-[#ffd54f] mt-1">
                น้องศิลา ๑
              </span>
            </div>

            {/* Bubble content */}
            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-gradient bg-[#120a05] px-2.5 py-0.5 rounded-full border border-[#c5a059]/40">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  เกร็ดความรู้จากมาสคอตศิลาจารึก
                </span>
                <span className="text-[10px] text-[#9e8b79]">
                  มรดกความทรงจำแห่งโลก UNESCO
                </span>
              </div>

              <p className="font-thai-serif text-sm sm:text-base text-[#fffaee] italic">
                {steleKnowledge.quote}
              </p>

              <div className="p-2.5 bg-[#140b06]/80 rounded-xl border border-[#3e2c1d] text-xs text-[#d6c4b2] leading-relaxed">
                <strong>ความลับของศิลาจารึกหลักที่ ๑:</strong> {steleKnowledge.facts[0]} {steleKnowledge.facts[1]}
              </div>

              <p className="text-[11px] text-[#e8ca84] font-medium">
                {steleKnowledge.funFact}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Article Container */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-b from-[#251912] via-[#1d130d] to-[#150d09] rounded-3xl border-2 border-[#c5a059]/40 p-6 sm:p-10 shadow-2xl space-y-8"
      >
        <ThaiCornerOrnament position="tl" className="absolute top-3 left-3 w-8 h-8 text-[#c5a059]" />
        <ThaiCornerOrnament position="tr" className="absolute top-3 right-3 w-8 h-8 text-[#c5a059]" />

        {/* Article Header */}
        <header className="border-b border-[#3e2c1e] pb-6 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#3d291c] border border-[#c5a059]/40 text-xs font-bold text-[#f7e0a3]">
              เซียมซีใบที่ {fortune.numberStr} • {fortune.name}
            </span>
            <span className="text-xs text-[#a89582] flex items-center gap-1">
              <SukhothaiLotus className="w-4 h-4 text-[#c5a059]" />
              มรดกประวัติศาสตร์สุโขทัย
            </span>
          </div>

          <h2 className="font-thai-serif text-2xl sm:text-4xl font-extrabold text-[#fae5b6] drop-shadow-[0_2px_12px_rgba(212,175,55,0.25)] leading-relaxed pt-2 pb-1">
            {fortune.storyTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#d8c5b0] mt-2 italic font-serif">
            “อ่านจากร่องรอย เรียนรู้จากหลักฐาน”
          </p>
        </header>

        {/* Highlighted Evidence Stone / Inscription Box */}
        <section className="relative rounded-2xl bg-gradient-to-br from-[#2a1d15] to-[#19100a] border border-[#806030] p-5 sm:p-7 shadow-inner">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#f7df94] mb-3">
            <ScrollText className="w-5 h-5 text-[#d4af37]" />
            <span>ร่องรอยและหลักฐานชิ้นเอก</span>
          </div>

          <blockquote className="font-thai-serif text-base sm:text-xl text-[#fffaed] font-medium leading-relaxed italic border-l-4 border-[#d4af37] pl-4 sm:pl-6 my-3">
            {fortune.evidence.quote}
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#473323] text-xs text-[#c5b19d]">
            <div>
              <span className="font-semibold text-[#f5ecd8] block">แหล่งที่มาของหลักฐาน:</span>
              <span>{fortune.evidence.source}</span>
            </div>
            {fortune.evidence.discoveryLocation && (
              <div>
                <span className="font-semibold text-[#f5ecd8] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  สถานที่ค้นพบ:
                </span>
                <span>{fortune.evidence.discoveryLocation}</span>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-[#473323]/60 text-xs text-[#baa38e]">
            <span className="font-semibold text-[#e8d5bf]">คุณค่าทางประวัติศาสตร์: </span>
            <span>{fortune.evidence.significance}</span>
          </div>
        </section>

        {/* In-depth Historical Narration */}
        <section className="space-y-4 text-sm sm:text-base text-[#e5d5c4] leading-relaxed">
          <div className="flex items-center gap-2 text-[#f7e0a3] font-thai-serif font-bold text-lg">
            <BookOpen className="w-5 h-5 text-[#c5a059]" />
            <span>เรื่องเล่าจากหลักฐานโบราณคดี</span>
          </div>

          {fortune.storyDetails.map((paragraph, idx) => {
            const isMissionLink = paragraph.startsWith('ความเชื่อมโยงสู่ภารกิจนักสืบ');
            if (isMissionLink) {
              return (
                <div
                  key={idx}
                  className="mt-5 p-4 rounded-xl bg-[#2a1b12]/95 border border-[#c5a059]/50 shadow-md space-y-2 text-left"
                >
                  <div className="flex items-center gap-2 text-[#f7d070] font-thai-serif font-bold text-sm sm:text-base">
                    <Search className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>หลักฐานเชื่อมโยงสู่ภารกิจนักสืบ</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#ebd8c5] leading-relaxed">
                    {paragraph.replace(/^ความเชื่อมโยงสู่ภารกิจนักสืบ:\s*/, '')}
                  </p>
                  <div className="pt-2 border-t border-[#473323]/60 flex items-center justify-between text-xs text-[#c5a059] font-medium">
                    <span>💡 คำถามภารกิจ: {fortune.mission.question}</span>
                  </div>
                </div>
              );
            }
            return (
              <p key={idx} className="indent-6 sm:indent-8">
                {paragraph}
              </p>
            );
          })}
        </section>

        {/* Watermark Fish / Ceramic motif */}
        <div className="flex items-center justify-center pt-2 opacity-30">
          <SangkhalokFish className="w-12 h-12 text-[#c5a059]" />
        </div>

        {/* Mission Preview / Next Step Call to Action */}
        <footer className="pt-6 border-t border-[#3e2c1e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs text-[#c5a059] block">ขั้นตอนต่อไปของคุณ:</span>
            <span className="font-thai-serif text-sm sm:text-base text-[#fff1d6] font-bold">
              พิสูจน์ความเข้าใจผ่าน “ภารกิจนักสืบ”
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onGoToMission}
              className="flex-1 sm:flex-initial py-3 px-6 rounded-xl font-thai-serif text-sm sm:text-base font-bold text-[#fbf5e8] bg-gradient-to-r from-[#8f2f20] to-[#b3402e] hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#c95a48]"
            >
              <Sparkles className="w-4 h-4" />
              <span>ทำภารกิจนักสืบ</span>
            </button>

            <button
              onClick={onGoToSouvenir}
              className="py-3 px-4 rounded-xl text-sm font-medium text-[#f7e0a3] bg-[#2d1e15] hover:bg-[#3d2b1e] border border-[#c5a059]/40 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>🎁 สร้างการ์ดที่ระลึก</span>
            </button>
          </div>
        </footer>
      </motion.article>
    </div>
  );
};
