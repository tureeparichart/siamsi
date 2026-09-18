import React from 'react';
import { SukhothaiLotus } from './SukhothaiMotifs';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#120e0b] border-t border-[#2a1d14] text-[#9e8c79] py-6 px-4 mt-auto relative z-10 no-print">
      <div className="max-w-xl mx-auto flex flex-col items-center text-center space-y-3">
        {/* Creator Info / ข้อมูลผู้จัดทำ (Compact & Refined) */}
        <div className="w-full max-w-md mx-auto bg-[#18100b]/90 border border-[#c5a059]/35 rounded-xl py-2.5 px-4 shadow-md">
          <div className="flex items-center justify-center gap-1.5 mb-1 text-[#d4af37]">
            <SukhothaiLotus className="w-3 h-3 opacity-75" />
            <span className="text-[11px] tracking-wider uppercase font-semibold text-[#d4af37]">
              ผู้จัดทำ
            </span>
            <SukhothaiLotus className="w-3 h-3 opacity-75" />
          </div>

          <p className="font-thai-serif text-sm sm:text-base text-[#f0e2d1] font-semibold tracking-wide">
            นางสาวอวยพร วิจักษณ์ภาณุสิน
          </p>

          <p className="text-xs text-[#baa691] mt-0.5 font-normal leading-relaxed">
            ครูชำนาญการ โรงเรียนบ้านห้วยไคร้ สพป.สุโขทัย เขต 2
          </p>
        </div>

        {/* Project Branding */}
        <div className="space-y-0.5 pt-0.5">
          <p className="font-thai-serif text-xs sm:text-sm text-[#9e8b79] font-medium tracking-wide">
            “เซียมซีแห่งกาลเวลา : เปิดร่องรอยอดีตสุโขทัย”
          </p>
          <p className="text-[10px] sm:text-[11px] text-[#6e5d4e]">
            จากตำนาน สู่หลักฐาน จากอดีต สู่การเรียนรู้ด้วย AI • SIAM SI : OPEN THE PAST OF SUKHOTHAI
          </p>
        </div>
      </div>
    </footer>
  );
};

