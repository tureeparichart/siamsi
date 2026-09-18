import React, { useState, useCallback } from 'react';
import { Fortune } from '../types';
import {
  SukhothaiLotus,
  SukhothaiTinChokBorder,
} from './SukhothaiMotifs';
import { SiamSiLogo } from './SiamSiLogo';
import { Upload } from 'lucide-react';

interface SouvenirCardPreviewProps {
  fortune: Fortune;
  fullName: string;
  previewRef?: React.RefObject<HTMLDivElement | null>;
  cardBgImage?: string | null;
  onSavePermanentCardBg?: (dataUrl: string) => void;
}

const defaultBg = `${import.meta.env.BASE_URL || './'}assets/sukhothai-card-bg.svg`;

export const SouvenirCardPreview: React.FC<SouvenirCardPreviewProps> = ({
  fortune,
  fullName,
  previewRef,
  cardBgImage,
  onSavePermanentCardBg,
}) => {
  const activeBg = cardBgImage || defaultBg;
  const [isDragging, setIsDragging] = useState(false);

  // Display name or placeholder
  const displayName = fullName.trim() || 'ชื่อ นามสกุล ของท่าน';
  const isPlaceholder = !fullName.trim();

  // Handle file drop onto card
  const processImageFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl && onSavePermanentCardBg) {
        onSavePermanentCardBg(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  }, [onSavePermanentCardBg]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Responsive font sizing for user name in horizontal card (5.4 × 8.8 cm)
  const getPhoKhunRamFontSize = (len: number) => {
    if (len > 35) return 'clamp(11px, 2.8vw, 15px)';
    if (len > 25) return 'clamp(13px, 3.2vw, 18px)';
    if (len > 18) return 'clamp(15px, 3.7vw, 21px)';
    if (len > 12) return 'clamp(17px, 4.3vw, 25px)';
    return 'clamp(19px, 5vw, 28px)';
  };

  const getRegularFontSize = (len: number) => {
    if (len > 35) return 'clamp(9px, 2vw, 11px)';
    if (len > 25) return 'clamp(10px, 2.2vw, 13px)';
    if (len > 18) return 'clamp(11px, 2.5vw, 15px)';
    if (len > 12) return 'clamp(12px, 2.9vw, 17px)';
    return 'clamp(13px, 3.3vw, 19px)';
  };

  const phoKhunRamFontSize = getPhoKhunRamFontSize(displayName.length);
  const regularFontSize = getRegularFontSize(displayName.length);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 
        Sukhothai Horizontal Souvenir Card
        True standard size: 8.8 cm wide × 5.4 cm high (ratio 88:54 ≈ 1.6296)
        Rendered responsively in exact horizontal proportions
      */}
      <div
        ref={previewRef}
        id="souvenir-card-target"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`souvenir-card relative w-full max-w-[528px] aspect-[88/54] rounded-xl text-[#2c1810] p-2 sm:p-3 md:p-3.5 flex flex-col justify-between border-[2.5px] sm:border-[3px] border-[#8c6d23] shadow-2xl overflow-hidden transition-all duration-300 ${
          isDragging ? 'ring-4 ring-[#ffd54f] scale-[1.01]' : ''
        }`}
        style={{
          boxShadow: '0 12px 35px rgba(0,0,0,0.5), 0 0 25px rgba(212,175,55,0.25)',
          backgroundImage: `url(${activeBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Drag overlay notice */}
        {isDragging && (
          <div className="absolute inset-0 bg-black/75 z-40 flex flex-col items-center justify-center text-center p-4 text-[#fae5b6]">
            <Upload className="w-10 h-10 mb-2 animate-bounce text-[#ffd54f]" />
            <p className="font-thai-serif text-base font-bold">ปล่อยไฟล์ภาพที่นี่เพื่อบันทึกและล็อกถาวร</p>
          </div>
        )}

        {/* Top Sukhothai Tin Chok woven textile border */}
        <div className="absolute top-0 inset-x-0 pointer-events-none z-10 opacity-80">
          <SukhothaiTinChokBorder className="w-full text-[#8c6d23]" height={10} />
        </div>

        {/* Bottom Sukhothai Tin Chok woven textile border */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none z-10 opacity-80">
          <SukhothaiTinChokBorder className="w-full text-[#8c6d23]" height={10} />
        </div>

        {/* Subtle decorative tint overlay to maintain text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-[#fbf6ea]/45 to-[#120a06]/40 pointer-events-none" />

        {/* Delicate inner double borders */}
        <div className="absolute inset-1.5 sm:inset-2 border border-[#8c6d23]/40 rounded-lg pointer-events-none" />
        <div className="absolute inset-2 sm:inset-2.5 border border-[#8c6d23]/20 rounded-md pointer-events-none" />

        {/* 1. Card Top Header:
            - ด้านบนซ้ายใส่โลโก้เว็บไซต์
            - หัวข้อตรงกลางใส่ข้อความว่า เซียมซีแห่งกาลเวลา
        */}
        <header
          className="relative z-10 flex items-center justify-between border-b border-[#8c6d23]/35 pb-1 px-1.5 rounded-t-lg transition-colors mt-1 bg-[#fffdf7]/92 backdrop-blur-[2px] shadow-xs"
        >
          {/* ด้านบนซ้าย: โลโก้เว็บไซต์ */}
          <div className="flex items-center gap-1.5 w-1/4">
            <SiamSiLogo size={32} showTextGlow={false} className="shrink-0" />
          </div>

          {/* หัวข้อตรงกลาง: เซียมซีแห่งกาลเวลา */}
          <div className="flex-1 flex items-center justify-center gap-1.5">
            <SukhothaiLotus className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#8c6d23]" />
            <h2 className="font-thai-serif text-xs sm:text-[14px] font-bold text-[#452712] tracking-wider whitespace-nowrap">
              เซียมซีแห่งกาลเวลา
            </h2>
            <SukhothaiLotus className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#8c6d23]" />
          </div>

          {/* ด้านบนขวา: เว้นพื้นที่สมดุลกับโลโก้ด้านซ้าย */}
          <div className="w-1/4" />
        </header>

        {/* 2. Card Middle Body:
            - บรรทัดที่ 1: เซียมซีที่ 01   ดวงนักปราชญ์
            - บรรทัดที่ 2: คำทำนาย "ปัญญานำทาง"
            - บรรทัดที่ 3: ชื่อบรรทัดที่ 1 ฟอนต์ลายสือไท (PhoKhunRam)
            - บรรทัดที่ 4: ชื่อบรรทัดที่ 2 ตัวหนังสือปกติ
            - บรรทัดที่ 5: เนื้อหาคำทำนายเต็ม
        */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center py-1 px-2 text-center space-y-1 sm:space-y-1.5">
          {/* บรรทัดที่ 1: เซียมซีที่ {numberStr}   {name} (เช่น เซียมซีที่ 01   ดวงนักปราชญ์) */}
          <div className="flex items-center justify-center gap-3">
            <span
              className="font-thai-serif text-[11px] sm:text-[13px] font-extrabold text-[#3a200f] px-2 py-0.5 rounded-md border border-[#8c6d23]/35 shadow-xs bg-[#fff9ee]/90"
            >
              เซียมซีที่ {fortune.numberStr}
            </span>
            <span className="font-thai-serif text-xs sm:text-[14px] font-bold text-[#633a17] tracking-wide drop-shadow-xs bg-[#fff9ee]/80 px-2 py-0.5 rounded-md border border-[#8c6d23]/25">
              {fortune.name}
            </span>
          </div>

          {/* บรรทัดที่ 2: คำทำนาย (คำมงคลสั้น 4-6 คำ เช่น “ปัญญานำทาง”) */}
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[#8c6d23] text-xs">✦</span>
            <p className="font-thai-serif text-sm sm:text-[16px] font-black text-[#502c11] tracking-wider drop-shadow-xs bg-[#fff8eb]/85 px-3 py-0.5 rounded-full border border-[#8c6d23]/30">
              คำทำนาย &ldquo;{fortune.blessing}&rdquo;
            </p>
            <span className="text-[#8c6d23] text-xs">✦</span>
          </div>

          {/* User Name Double Lines (บรรทัดที่ 3 & 4) */}
          <div className="w-full max-w-[94%] mx-auto my-0.5 py-1 px-2.5 rounded-lg border border-[#8c6d23]/40 shadow-xs flex flex-col items-center justify-center bg-[#fff8eb]/92 backdrop-blur-xs">
            {/* บรรทัดที่ 3: ชื่อผู้รับการ์ด ฟอนต์ลายสือไท (PhoKhunRam) */}
            <div
              className={`font-phokhunram font-lai-sue-thai text-[#1f0f08] font-bold text-center tracking-wider leading-snug drop-shadow-xs ${
                isPlaceholder ? 'opacity-40 italic' : 'opacity-95'
              }`}
              style={{
                fontFamily: "'PhoKhunRam', 'Charm', 'Noto Serif Thai', serif",
                fontSize: phoKhunRamFontSize,
              }}
              title="ชื่ออักษรลายสือไท (พ่อขุนรามคำแหง)"
            >
              {displayName}
            </div>

            {/* บรรทัดที่ 4: ชื่อผู้รับการ์ด ฟอนต์ปกติ (Thai Serif) ชัดเจน */}
            <div
              className={`font-thai-serif text-[#4e2f18] font-semibold text-center tracking-normal leading-tight mt-0.5 ${
                isPlaceholder ? 'opacity-40' : 'opacity-90'
              }`}
              style={{ fontSize: regularFontSize }}
            >
              {displayName}
            </div>
          </div>

          {/* บรรทัดที่ 5: เนื้อหาคำทำนายเต็ม */}
          <div className="w-full max-w-[98%] mx-auto px-1">
            <p className="text-[9.5px] sm:text-[11px] text-[#42291a] font-medium italic leading-relaxed text-center font-thai-serif bg-[#fffdf7]/85 px-2 py-0.5 rounded-md border border-[#8c6d23]/20">
              &ldquo;{fortune.fortuneReading}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
