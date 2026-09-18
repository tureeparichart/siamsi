import React from 'react';

// SVG Corner Ornament for Thai Luxury Sukhothai Framing
export const ThaiCornerOrnament: React.FC<{ className?: string; position?: 'tl' | 'tr' | 'bl' | 'br' }> = ({
  className = 'w-8 h-8 text-[#d4af37]',
  position = 'tl',
}) => {
  const rotationClass = {
    tl: '',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  }[position];

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotationClass} transition-transform`}
      aria-hidden="true"
    >
      <path
        d="M4 4H24C24 4 16 8 16 16C16 24 24 24 24 24C16 24 16 32 16 40C16 44 14 44 4 44V4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
      <path
        d="M4 4V20C8 20 12 16 12 12C12 8 8 4 4 4Z"
        fill="currentColor"
        opacity="0.3"
      />
      <circle cx="8" cy="8" r="2.5" fill="currentColor" />
      <path
        d="M4 4L22 22"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.5"
      />
    </svg>
  );
};

// Sangkhalok fish motif (classic Sukhothai Celadon symbol of abundance)
export const SangkhalokFish: React.FC<{ className?: string }> = ({ className = 'w-16 h-16 text-[#c5a059]' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M15 50C15 35 35 25 55 30C75 35 88 48 90 50C88 52 75 65 55 70C35 75 15 65 15 50Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 50L5 38M15 50L5 62M5 38C8 44 8 56 5 62"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="75" cy="46" r="2.5" fill="currentColor" />
    {/* Scales and spiral flourish */}
    <path
      d="M40 38C45 42 45 58 40 62M52 39C57 43 57 57 52 61M64 42C67 45 67 55 64 58"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M50 22C52 26 56 29 55 30"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M50 78C52 74 56 71 55 70"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

// Lotus flower emblem (Sukhothai Buddhist purity and wisdom)
export const SukhothaiLotus: React.FC<{ className?: string }> = ({ className = 'w-10 h-10 text-[#d4af37]' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M32 8C32 8 22 22 22 36C22 46 26 52 32 54C38 52 42 46 42 36C42 22 32 8 32 8Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M32 20C26 26 12 36 12 46C12 52 18 56 24 54C28 52 31 46 32 42"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <path
      d="M32 20C38 26 52 36 52 46C52 52 46 56 40 54C36 52 33 46 32 42"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <circle cx="32" cy="54" r="2" fill="currentColor" />
  </svg>
);

// 1. อุทยานประวัติศาสตร์สุโขทัย - เจดีย์ทรงพุ่มข้าวบิณฑ์ (Lotus-bud Chedi of Sukhothai)
export const SukhothaiChediMotif: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#8c6d23]' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Spire pinnacle */}
    <path d="M32 4V12M32 6L30 10H34L32 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Lotus bud (Phum Khao Bin) */}
    <path
      d="M32 12C28 16 26 20 28 25C29 27 31 28 32 28C33 28 35 27 36 25C38 20 36 16 32 12Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Chedi rings & tiered neck */}
    <path d="M26 28H38M25 31H39M23 34H41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Bell body / Stupa dome */}
    <path
      d="M23 34C22 39 20 44 18 47H46C44 44 42 39 41 34H23Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Laterite square stepped base */}
    <rect x="14" y="47" width="36" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="52" width="44" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 58H58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 2. ศิลาจารึกสุโขทัย (Sukhothai Inscription Stone Stele)
export const SukhothaiInscriptionMotif: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#8c6d23]' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Pyramid-apex stele head */}
    <path
      d="M32 6L46 18V54H18V18L32 6Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Stele stepped plinth */}
    <path d="M14 54H50V58H14V54Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
    {/* Inscription ancient script lines */}
    <line x1="24" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    <line x1="23" y1="26" x2="41" y2="26" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    <line x1="23" y1="30" x2="41" y2="30" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    <line x1="23" y1="34" x2="41" y2="34" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    <line x1="23" y1="38" x2="41" y2="38" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    <line x1="23" y1="42" x2="41" y2="42" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    <line x1="25" y1="46" x2="39" y2="46" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
  </svg>
);

// 3. เครื่องสังคโลก (Sangkhalok Celadon Plate with Swirling Fish)
export const SangkhalokDishMotif: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#8c6d23]' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="21" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    {/* Inner Celadon Fish motif */}
    <path
      d="M22 32C22 26 28 23 36 25C42 27 46 31 48 32C46 33 42 37 36 39C28 41 22 38 22 32Z"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path d="M22 32L17 28M22 32L17 36M17 28C18 30 18 34 17 36" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="42" cy="31" r="1.2" fill="currentColor" />
  </svg>
);

// 4. ประเพณีแห่ช้างบวชนาคสุโขทัย (Ordained Elephant with Ceremonial Headdress & Blanket)
export const OrdainedElephantMotif: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#8c6d23]' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Elephant body & back curve */}
    <path
      d="M18 48V38C18 30 22 22 34 22C44 22 52 28 52 38V48"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Forelegs and hindlegs */}
    <path d="M23 48V42M29 48V40M41 48V40M47 48V42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Trunk raised auspiciously */}
    <path
      d="M18 35C14 36 10 33 9 27C8 23 11 19 14 20C16 21 16 23 14 24C12 25 12 28 16 29"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Tusk */}
    <path d="M17 37C13 38 12 42 14 43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Ceremonial decorative headdress (แห่ช้างบวชนาค) */}
    <path d="M22 22L20 16L24 18L26 14L28 18L32 16L30 22" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
    {/* Ceremonial blanket (ผ้าคลุมช้างทรงเครื่อง) */}
    <rect x="29" y="27" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
    <path d="M33 27V38M37 27V38M41 27V38" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 1" />
    {/* Small tail */}
    <path d="M52 37C54 40 55 44 54 46" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 5. ผ้าซิ่นตีนจกสุโขทัย (Sukhothai Tin Chok Woven Textile Border Pattern)
export const SukhothaiTinChokBorder: React.FC<{ className?: string; height?: number }> = ({
  className = 'w-full text-[#8c6d23]',
  height = 14,
}) => (
  <svg
    viewBox="0 0 400 20"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ height: `${height}px` }}
    aria-hidden="true"
  >
    {/* Top and bottom guide lines */}
    <line x1="0" y1="2" x2="400" y2="2" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <line x1="0" y1="18" x2="400" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.6" />

    {/* Repeating Tin Chok Diamond & Sawtooth (ฟันปลา & สร้อยสา & ดอกพิกุล) */}
    <pattern id="tinChokRepeat" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
      {/* Sawtooth (ฟันปลา) */}
      <path d="M0 2L10 9L20 2L30 9L40 2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M0 18L10 11L20 18L30 11L40 18" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
      
      {/* Central Diamond (ลายโคม/สร้อยสา) */}
      <polygon points="20,4 28,10 20,16 12,10" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
      
      {/* Pickul star inside */}
      <circle cx="20" cy="10" r="1.5" fill="currentColor" />
      <circle cx="6" cy="10" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="34" cy="10" r="1" fill="currentColor" opacity="0.5" />
    </pattern>

    <rect x="0" y="0" width="400" height="20" fill="url(#tinChokRepeat)" />
  </svg>
);

// Sukhothai Heritage Icons Bar - All 6 Heritage Icons displayed together
export const SukhothaiHeritageIconsBar: React.FC<{ className?: string }> = ({
  className = 'flex items-center justify-between text-[#8c6d23] px-2',
}) => (
  <div className={className}>
    <div className="flex items-center gap-1" title="อุทยานประวัติศาสตร์สุโขทัย">
      <SukhothaiChediMotif className="w-4 h-4 text-[#8c6d23]" />
      <span className="text-[8px] font-thai-serif text-[#78591e] hidden sm:inline">อุทยานประวัติศาสตร์</span>
    </div>
    <span className="text-[7px] text-[#c5a059]/60">❖</span>
    <div className="flex items-center gap-1" title="ศิลาจารึกสุโขทัย">
      <SukhothaiInscriptionMotif className="w-4 h-4 text-[#8c6d23]" />
      <span className="text-[8px] font-thai-serif text-[#78591e] hidden sm:inline">ศิลาจารึก</span>
    </div>
    <span className="text-[7px] text-[#c5a059]/60">❖</span>
    <div className="flex items-center gap-1" title="เครื่องสังคโลก">
      <SangkhalokDishMotif className="w-4 h-4 text-[#8c6d23]" />
      <span className="text-[8px] font-thai-serif text-[#78591e] hidden sm:inline">สังคโลก</span>
    </div>
    <span className="text-[7px] text-[#c5a059]/60">❖</span>
    <div className="flex items-center gap-1" title="ดอกบัวสุโขทัย">
      <SukhothaiLotus className="w-4 h-4 text-[#8c6d23]" />
      <span className="text-[8px] font-thai-serif text-[#78591e] hidden sm:inline">ดอกบัว</span>
    </div>
    <span className="text-[7px] text-[#c5a059]/60">❖</span>
    <div className="flex items-center gap-1" title="ประเพณีแห่ช้างบวชนาค">
      <OrdainedElephantMotif className="w-4 h-4 text-[#8c6d23]" />
      <span className="text-[8px] font-thai-serif text-[#78591e] hidden sm:inline">แห่ช้างบวชนาค</span>
    </div>
  </div>
);
