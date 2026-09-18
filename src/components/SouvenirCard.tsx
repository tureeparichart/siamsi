import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Fortune } from '../types';
import { Printer, RotateCcw, Share2, Compass, Sparkles, Check } from 'lucide-react';
import { ThaiCornerOrnament, SangkhalokFish, SukhothaiLotus } from './SukhothaiMotifs';

interface SouvenirCardProps {
  fortune: Fortune;
  onDrawAgain: () => void;
  onBrowseAll: () => void;
}

export const SouvenirCard: React.FC<SouvenirCardProps> = ({
  fortune,
  onDrawAgain,
  onBrowseAll,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const textToShare = `🎋 เซียมซีสุโขทัย หมายเลข ${fortune.numberStr} : ${fortune.name}\n✨ คำมงคล: “${fortune.blessing}”\n📖 เรื่องราว: ${fortune.storyTitle}\nอ่านจากร่องรอย เรียนรู้จากหลักฐาน : เปิดโลกประวัติศาสตร์สุโขทัย`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'เซียมซีสุโขทัย | การ์ดที่ระลึก',
          text: textToShare,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(textToShare);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-6 sm:py-10 px-4 flex flex-col items-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 space-y-2 no-print"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c1d15] border border-[#c5a059]/40 text-xs font-semibold text-[#f7e0a3]">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>นิทรรศการส่งเสริมการอ่านประวัติศาสตร์สุโขทัย</span>
        </div>
        <h2 className="font-thai-serif text-2xl sm:text-3xl font-extrabold text-gold-gradient">
          🎁 การ์ดที่ระลึกของคุณ
        </h2>
        <p className="text-xs sm:text-sm text-[#baa592]">
          เก็บเป็นที่ระลึกแห่งการเรียนรู้ หรือพิมพ์เพื่อพกติดตัว
        </p>
      </motion.div>

      {/* Collectible Souvenir Card Preview:
          Strictly follows Section 11 & 12:
          Vertical ratio ~5.5 x 8.5 cm, antique cream / light gold paper,
          delicate Sukhothai frame, number, fortune name, blessing, bottom text.
      */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 18 }}
        id="souvenir-print-area"
        ref={cardRef}
        className="relative w-72 sm:w-80 h-[440px] sm:h-[480px] rounded-2xl bg-[#fbf7ee] text-[#2c1810] shadow-2xl p-6 flex flex-col justify-between items-center text-center border-4 border-[#8c6d23] overflow-hidden select-none"
        style={{
          boxShadow: '0 15px 40px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.3)',
        }}
      >
        {/* Intricate Inner Border */}
        <div className="absolute inset-2.5 border border-[#8c6d23]/40 rounded-xl pointer-events-none" />
        <div className="absolute inset-3 border border-[#8c6d23]/20 rounded-lg pointer-events-none" />

        {/* Thai Corner Ornaments (rendered in classic Sukhothai antique gold/bronze) */}
        <ThaiCornerOrnament position="tl" className="absolute top-3.5 left-3.5 w-7 h-7 text-[#8c6d23]" />
        <ThaiCornerOrnament position="tr" className="absolute top-3.5 right-3.5 w-7 h-7 text-[#8c6d23]" />
        <ThaiCornerOrnament position="bl" className="absolute bottom-3.5 left-3.5 w-7 h-7 text-[#8c6d23]" />
        <ThaiCornerOrnament position="br" className="absolute bottom-3.5 right-3.5 w-7 h-7 text-[#8c6d23]" />

        {/* Watermark Sangkhalok fish background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-6 pointer-events-none">
          <SangkhalokFish className="w-56 h-56 text-[#8c6d23]" />
        </div>

        {/* Card Header: Exhibition Title & Number */}
        <div className="w-full pt-2 flex flex-col items-center relative z-10">
          <div className="flex items-center gap-1.5 text-[11px] font-thai-serif tracking-wide text-[#7a591e] uppercase font-semibold">
            <SukhothaiLotus className="w-3.5 h-3.5 text-[#8c6d23]" />
            <span>เซียมซีแห่งกาลเวลา : เปิดร่องรอยอดีตสุโขทัย</span>
            <SukhothaiLotus className="w-3.5 h-3.5 text-[#8c6d23]" />
          </div>

          <div className="w-16 h-[1.5px] bg-[#8c6d23]/50 my-1" />

          {/* Number Display */}
          <div className="font-thai-serif text-5xl sm:text-6xl font-black text-[#5c3e10] my-1 drop-shadow-sm leading-normal">
            {fortune.numberStr}
          </div>
        </div>

        {/* Card Center: Fortune Name & Blessing */}
        <div className="w-full my-auto space-y-3 relative z-10 px-2">
          <div>
            <span className="text-[10px] tracking-widest text-[#8a6828] uppercase font-medium">
              เปิดดวงนำทาง
            </span>
            <h3 className="font-thai-serif text-2xl sm:text-3xl font-extrabold text-[#3a200f] leading-normal pt-1 mt-0.5">
              {fortune.name}
            </h3>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-[1px] bg-[#8c6d23]/40" />
            <span className="text-[#8c6d23] text-xs">❖</span>
            <div className="w-8 h-[1px] bg-[#8c6d23]/40" />
          </div>

          {/* Auspicious Blessing Quote */}
          <div className="py-2 px-3 rounded-lg bg-[#f2e7ce]/70 border border-[#8c6d23]/30">
            <p className="font-thai-serif text-base sm:text-lg font-bold text-[#682415] leading-normal py-0.5">
              “{fortune.blessing}”
            </p>
          </div>

          <p className="text-xs text-[#5e493a] font-medium leading-relaxed py-0.5">
            เรื่อง: <span className="font-semibold text-[#3a200f]">{fortune.storyTitle}</span>
          </p>
        </div>

        {/* Card Footer: Required Inscription Tagline */}
        <div className="w-full pb-2 relative z-10 border-t border-[#8c6d23]/30 pt-3">
          <p className="font-thai-serif text-[11px] sm:text-xs text-[#4d3625] font-semibold leading-relaxed tracking-wide">
            อ่านจากร่องรอย
            <br />
            เรียนรู้จากหลักฐาน
            <br />
            เปิดโลกประวัติศาสตร์สุโขทัย
          </p>
        </div>
      </motion.div>

      {/* Buttons (Hidden in print mode) */}
      <div className="w-full max-w-md mt-6 flex flex-col sm:flex-row items-center gap-3 no-print">
        {/* Print Card Button */}
        <button
          onClick={handlePrint}
          className="w-full py-3 px-5 rounded-xl font-thai-serif text-sm font-bold text-[#1a0f08] bg-gradient-to-r from-[#e7cb76] to-[#cba34f] hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#fff0ba]"
        >
          <Printer className="w-4 h-4" />
          <span>🖨️ พิมพ์การ์ด</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full sm:w-auto py-3 px-5 rounded-xl text-sm font-medium text-[#f7e0a3] bg-[#2d1e15] hover:bg-[#3d2b1e] border border-[#c5a059]/50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-[#81c784]" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'คัดลอกแล้ว!' : 'แชร์การ์ด'}</span>
        </button>

        {/* Draw Again Button */}
        <button
          onClick={onDrawAgain}
          className="w-full sm:w-auto py-3 px-5 rounded-xl text-sm font-medium text-[#d6c4b2] hover:text-[#fff] bg-[#1a120e] hover:bg-[#281b14] border border-[#3a281d] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#c5a059]" />
          <span>🎋 เสี่ยงอีกครั้ง</span>
        </button>
      </div>

      {/* Explore all 20 link */}
      <button
        onClick={onBrowseAll}
        className="mt-5 text-xs text-[#ab9784] hover:text-[#f7e0a3] flex items-center gap-1.5 transition-colors cursor-pointer no-print"
      >
        <Compass className="w-3.5 h-3.5" />
        <span>ดูเรื่องราวทั้งหมด 20 ใบ</span>
      </button>
    </div>
  );
};
