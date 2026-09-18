import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Fortune, ThemeMode } from '../types';
import { FORTUNES } from '../data/fortunes';
import { Sparkles, ArrowLeft, Filter, Compass } from 'lucide-react';
import { ThaiCornerOrnament, SukhothaiLotus } from './SukhothaiMotifs';
import { ChibiMascotSukhothai } from './ChibiCharacters';

interface AllFortunesProps {
  onSelectFortune: (fortune: Fortune) => void;
  onBackToHome: () => void;
  onStartShake: () => void;
  themeMode?: ThemeMode;
}

export const AllFortunes: React.FC<AllFortunesProps> = ({
  onSelectFortune,
  onBackToHome,
  onStartShake,
  themeMode = 'chibi3d',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ทั้งหมด (20)' },
    { id: 'wisdom', label: 'ปัญญาและจารึก' },
    { id: 'lifestyle', label: 'วิถีชีวิตและการค้า' },
    { id: 'monarchy', label: 'ราชวงศ์และธรรมราชา' },
    { id: 'art_craft', label: 'สังคโลกและศิลป์' },
    { id: 'heritage', label: 'มรดกและผังเมือง' },
  ];

  const filteredFortunes = selectedCategory === 'all'
    ? FORTUNES
    : FORTUNES.filter((f) => f.category === selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4">
      {/* Top Header with น้องสุโขทัย แทรกอยู่ด้านข้าง */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 p-4 rounded-3xl bg-[#241710]/60 border border-[#3e2c1e]">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm text-[#d4af37] hover:text-[#f7e0a3] transition-colors cursor-pointer bg-[#241710] px-3.5 py-1.5 rounded-lg border border-[#3e2c1e] shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าแรก</span>
          </button>

          <div className="text-center sm:text-left">
            <h2 className="font-thai-serif text-2xl sm:text-3xl font-extrabold text-gold-gradient leading-normal py-1">
              📜 เซียมซีสุโขทัย 20 เรื่องราว
            </h2>
            <p className="text-xs sm:text-sm text-[#baa592] mt-1">
              เลือกหมายเลขที่คุณต้องการเปิดอ่านได้ทันที หรือแตะเพื่อเสี่ยงดวง
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onStartShake}
            className="py-2 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#1a0f08] bg-gradient-to-r from-[#e7cb76] to-[#cba34f] hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow border border-[#fff2c2] shrink-0"
          >
            <span>🎋 เสี่ยงสุ่มเซียมซี</span>
          </button>

          {themeMode === 'chibi3d' && (
            <div className="hidden lg:block shrink-0">
              <ChibiMascotSukhothai
                size="sm"
                bubblePosition="left"
                pose="waving"
                speechText="เลือกชมเรื่องเล่าประวัติศาสตร์ทั้ง 20 หมายเลขได้เลยจ้า!"
              />
            </div>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <Filter className="w-4 h-4 text-[#c5a059] mr-1 hidden sm:inline" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#3e2b1e] text-[#f7e0a3] border border-[#c5a059] shadow-sm'
                : 'bg-[#1e1510] text-[#9c8978] hover:text-[#e0d0bf] border border-[#2e2017]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of 20 Fortunes (matching Prompt Section 9: 01, 02, ... 20 with hover animation) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
        {filteredFortunes.map((fortune) => (
          <motion.button
            key={fortune.id}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelectFortune(fortune)}
            className="group relative bg-gradient-to-b from-[#241710] to-[#150d09] hover:from-[#2e1f16] hover:to-[#1c120c] border border-[#3e2c1e] hover:border-[#c5a059] rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between text-center transition-all cursor-pointer shadow-md hover:shadow-xl hover:gold-glow overflow-hidden min-h-[140px] sm:min-h-[160px]"
          >
            <ThaiCornerOrnament position="tl" className="absolute top-1.5 left-1.5 w-4 h-4 text-[#c5a059]/40 group-hover:text-[#d4af37]" />
            <ThaiCornerOrnament position="tr" className="absolute top-1.5 right-1.5 w-4 h-4 text-[#c5a059]/40 group-hover:text-[#d4af37]" />

            {/* Top Stick indicator */}
            <div className="w-4 h-1 rounded-full bg-[#b83a2a] group-hover:bg-[#d94836] transition-colors mb-1" />

            {/* Prominent Number: 01, 02, ... 20 */}
            <span className="font-thai-serif text-3xl sm:text-4xl font-extrabold text-[#ecdac2] group-hover:text-gold-gradient transition-colors my-auto">
              {fortune.numberStr}
            </span>

            {/* Fortune Name & Auspicious Blessing subtitle */}
            <div className="w-full mt-1 border-t border-[#38261b] pt-2">
              <p className="font-thai-serif text-xs font-bold text-[#e8d5bf] group-hover:text-[#f7e0a3] leading-normal py-0.5">
                {fortune.name}
              </p>
              <p className="text-[10px] text-[#8e7b6c] group-hover:text-[#c5a059] mt-0.5 leading-normal">
                {fortune.blessing}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom info banner */}
      <div className="text-center mt-10">
        <p className="text-xs text-[#7d6b5b]">
          แตะที่การ์ดเพื่อเปิดดูดวง คำทำนาย และเรื่องราวหลักฐานสุโขทัย
        </p>
      </div>
    </div>
  );
};
