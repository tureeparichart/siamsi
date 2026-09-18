import React, { useState } from 'react';
import {
  MascotStele,
  MascotPrince,
  MascotPrincess,
  MascotSiamSiPot,
  MascotSangkhalok,
  MascotRoyalElephant,
} from './SukhothaiMascots';
import { MASCOT_KNOWLEDGE_LIST, MascotKnowledge } from '../data/mascotKnowledge';
import { soundFx } from '../utils/audio';
import { Sparkles, X, Volume2, ChevronRight } from 'lucide-react';

interface MascotKnowledgeBarProps {
  onSelectMascot?: (mascot: MascotKnowledge) => void;
  className?: string;
}

export const MascotKnowledgeBar: React.FC<MascotKnowledgeBarProps> = ({
  onSelectMascot,
  className = '',
}) => {
  const [activeMascot, setActiveMascot] = useState<MascotKnowledge | null>(null);
  const [hoveredMascotId, setHoveredMascotId] = useState<string | null>(null);

  const renderMascotIcon = (type: MascotKnowledge['avatarType'], sizeClass = 'w-14 h-14') => {
    switch (type) {
      case 'stele':
        return <MascotStele className={sizeClass} />;
      case 'prince':
        return <MascotPrince className={sizeClass} />;
      case 'princess':
        return <MascotPrincess className={sizeClass} />;
      case 'siamsi':
        return <MascotSiamSiPot className={sizeClass} />;
      case 'sangkhalok':
        return <MascotSangkhalok className={sizeClass} />;
      case 'elephant':
        return <MascotRoyalElephant className={sizeClass} />;
      default:
        return <MascotStele className={sizeClass} />;
    }
  };

  const handleMascotClick = (mascot: MascotKnowledge) => {
    soundFx.playCardFlip();
    if (activeMascot?.id === mascot.id) {
      setActiveMascot(null);
    } else {
      setActiveMascot(mascot);
      onSelectMascot?.(mascot);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Horizontal Interactive Mascot Showcase Strip */}
      <div className="bg-[#18110b]/90 border border-[#c5a059]/40 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-3 mb-3 border-b border-[#3d2c1e]">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]"></span>
            </span>
            <span className="font-thai-serif text-sm sm:text-base font-bold text-gold-gradient flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              มาสคอตนำทางแห่งสุโขทัย • คลิกที่ตัวการ์ตูนเพื่อรับเกร็ดความรู้
            </span>
          </div>
          <span className="text-[11px] sm:text-xs text-[#a99784] font-serif">
            แตะที่ศิลาจารึก เจ้าชายน้อย สังคโลก หรือช้างทรง เพื่อเปิดบับเบิล
          </span>
        </div>

        {/* Mascot Avatar Row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {MASCOT_KNOWLEDGE_LIST.map((m) => {
            const isSelected = activeMascot?.id === m.id;
            const isHovered = hoveredMascotId === m.id;

            return (
              <button
                key={m.id}
                onClick={() => handleMascotClick(m)}
                onMouseEnter={() => setHoveredMascotId(m.id)}
                onMouseLeave={() => setHoveredMascotId(null)}
                className={`group relative flex flex-col items-center p-2 rounded-xl transition-all duration-300 text-center cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#3a2a1b] to-[#25180f] border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                    : 'bg-[#150d08]/80 border border-[#3b291c] hover:border-[#c5a059]/60 hover:bg-[#261a12] hover:scale-105'
                }`}
                aria-label={`คลิกเพื่อดูเกร็ดความรู้จาก ${m.name}`}
              >
                {/* Mascot Visual */}
                <div className="relative mb-1 transition-transform group-hover:-translate-y-1">
                  {renderMascotIcon(m.avatarType, 'w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md')}
                  {/* Pulsing indicator when active */}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#1b120c] rounded-full p-0.5 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Mascot Name Badge */}
                <span className="text-xs font-thai-serif font-bold text-[#f2e2cb] leading-tight line-clamp-1 group-hover:text-[#ffd54f]">
                  {m.name.replace(/น้อง|พ่อขุน/g, '')}
                </span>
                <span className="text-[10px] text-[#9f8a75] leading-none mt-0.5">
                  แตะอ่านเกร็ด
                </span>

                {/* Floating tooltip hint on desktop hover */}
                {isHovered && !isSelected && (
                  <div className="hidden lg:block absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1b120c] text-[#f7e4a7] text-[11px] font-thai-serif px-2.5 py-1 rounded-md border border-[#c5a059]/50 whitespace-nowrap z-30 shadow-lg pointer-events-none animate-fade-in">
                    คลิกฟังเกร็ดความรู้! 💬
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Knowledge Speech Bubble / Modal Drawer */}
      {activeMascot && (
        <div
          id="mascot-knowledge-bubble"
          className="mt-4 relative bg-gradient-to-br from-[#2a1d13] via-[#1f140d] to-[#170e08] border-2 border-[#d4af37] rounded-2xl p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.85)] animate-fade-in"
        >
          {/* Speech Bubble Arrow pointing upwards */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-[#2a1d13] border-t-2 border-l-2 border-[#d4af37]" />

          {/* Close button */}
          <button
            onClick={() => setActiveMascot(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#a89582] hover:text-[#fff] bg-[#3a281a] hover:bg-[#523722] p-1.5 rounded-full transition-colors cursor-pointer"
            aria-label="ปิดเกร็ดความรู้"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with mascot preview */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-[#473322]">
            <div className="shrink-0 p-2 bg-[#130b06] rounded-2xl border border-[#c5a059]/40 shadow-inner">
              {renderMascotIcon(activeMascot.avatarType, 'w-20 h-20 sm:w-24 sm:h-24')}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#ffd54f] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                {activeMascot.role}
              </div>
              <h3 className="font-thai-serif text-xl sm:text-2xl font-bold text-gold-gradient">
                {activeMascot.title}
              </h3>
              <p className="font-thai-serif text-sm sm:text-base text-[#f5ebd7] italic">
                {activeMascot.quote}
              </p>
            </div>
          </div>

          {/* Core historical facts checklist */}
          <div className="py-4 space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#d4af37]">
              สาระสำคัญทางประวัติศาสตร์และหลักฐาน:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {activeMascot.facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#170e08]/90 border border-[#3b291b] text-xs sm:text-sm text-[#ddd0c0] leading-relaxed"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#ffd54f] border border-[#d4af37]/50 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Fact Gold Highlight */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#3e2912] to-[#251809] border border-[#d4af37]/60 text-xs sm:text-sm text-[#fffae8] flex items-center gap-3">
            <p className="leading-relaxed">
              <strong>เกร็ดน่ารู้พิเศษ:</strong> {activeMascot.funFact}
            </p>
          </div>

          {/* Footer action */}
          <div className="mt-4 pt-3 border-t border-[#473322] flex flex-wrap items-center justify-between gap-2 text-xs text-[#baa794]">
            <span>💡 เรียนรู้เพิ่มเติมได้ในหัวข้อ 20 เรื่องราวและศิลาจารึก</span>
            <button
              onClick={() => setActiveMascot(null)}
              className="px-4 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6be44] text-[#1a120c] font-bold text-xs transition-colors cursor-pointer"
            >
              เข้าใจแล้ว ขอบคุณนะ!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Mascot Quick Floating Helper on the corner
export const MascotFloatingCompanion: React.FC<{
  onOpenMascotList?: () => void;
}> = ({ onOpenMascotList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const mascot = MASCOT_KNOWLEDGE_LIST[currentIdx];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playCardFlip();
    setCurrentIdx((prev) => (prev + 1) % MASCOT_KNOWLEDGE_LIST.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 no-print flex flex-col items-end">
      {/* Speech Bubble Popup */}
      {isOpen && (
        <div
          id="mascot-floating-bubble"
          className="mb-3 w-72 sm:w-80 p-4 rounded-2xl bg-[#1e140d]/95 backdrop-blur-md border-2 border-[#d4af37] text-white shadow-2xl animate-fade-in text-left relative"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-[#a89582] hover:text-white p-1 rounded-full"
            aria-label="ปิด"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#3f2c1d]">
            <span className="font-thai-serif text-sm font-bold text-gold-gradient">
              💬 {mascot.name} ชวนรู้
            </span>
          </div>

          <p className="font-thai-serif text-xs sm:text-sm text-[#f5ebd7] mb-2 leading-relaxed">
            {mascot.quote}
          </p>

          <div className="p-2 bg-[#120a05] rounded-lg border border-[#3e2b1c] text-[11px] text-[#ddd0bf] mb-3 leading-snug">
            {mascot.facts[0]}
          </div>

          <div className="flex items-center justify-between text-xs">
            <button
              onClick={handleNext}
              className="text-[#ffd54f] hover:text-white flex items-center gap-1 font-medium cursor-pointer"
            >
              สลับตัวละครอื่น <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-[#8e7b68]">
              {currentIdx + 1} / {MASCOT_KNOWLEDGE_LIST.length}
            </span>
          </div>
        </div>
      )}

      {/* Floating Mascot Button */}
      <button
        onClick={() => {
          soundFx.playCardFlip();
          setIsOpen(!isOpen);
          onOpenMascotList?.();
        }}
        className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#3b2818] via-[#2a1b0e] to-[#190f07] border-2 border-[#d4af37] shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        title="แตะเพื่อคุยกับมาสคอตสุโขทัย"
        aria-label="มาสคอตให้ความรู้สุโขทัย"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
          <MascotStele className="w-full h-full drop-shadow-md" />
        </div>

        {/* Pulsing Hint Badge */}
        <span className="absolute -top-1 -left-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ffd54f] items-center justify-center text-[9px] font-bold text-black">
            !
          </span>
        </span>

        {/* Small label badge */}
        <span className="absolute -bottom-2 bg-[#d4af37] text-[#1b120c] font-thai-serif text-[10px] font-bold px-2 py-0.2 rounded-full whitespace-nowrap shadow-sm">
          เกร็ดสุโขทัย
        </span>
      </button>
    </div>
  );
};
