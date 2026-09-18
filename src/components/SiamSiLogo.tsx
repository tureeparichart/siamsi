import React from 'react';

interface SiamSiLogoProps {
  size?: number | string;
  className?: string;
  showTextGlow?: boolean;
}

export const SiamSiLogo: React.FC<SiamSiLogoProps> = ({
  size = 48,
  className = '',
  showTextGlow = true,
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={`inline-block select-none filter ${showTextGlow ? 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]' : ''} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer Ring Deep Navy Background */}
        <radialGradient id="navyOuterGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a3458" />
          <stop offset="65%" stopColor="#10233f" />
          <stop offset="90%" stopColor="#0a172c" />
          <stop offset="100%" stopColor="#060e1c" />
        </radialGradient>

        {/* Rich Metallic Gold Gradient for Borders & Rims */}
        <linearGradient id="metallicGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff1b8" />
          <stop offset="25%" stopColor="#f5c754" />
          <stop offset="50%" stopColor="#dfa732" />
          <stop offset="75%" stopColor="#b37c1d" />
          <stop offset="100%" stopColor="#ffd868" />
        </linearGradient>

        {/* Bronze Gold Gradient for Darker Accents */}
        <linearGradient id="bronzeGold" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#634311" />
          <stop offset="50%" stopColor="#9c7324" />
          <stop offset="100%" stopColor="#e0b852" />
        </linearGradient>

        {/* Inner Sunset Horizon Glow behind Pagoda & Buddha */}
        <radialGradient id="sunsetGlow" cx="50%" cy="55%" r="48%">
          <stop offset="0%" stopColor="#fff8db" />
          <stop offset="20%" stopColor="#fde047" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="75%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#451a03" />
        </radialGradient>

        {/* Buddha & Architecture Golden Highlights */}
        <linearGradient id="buddhaGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff9c4" />
          <stop offset="35%" stopColor="#fcd34d" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Stupa Stone & Brick Gradients */}
        <linearGradient id="stupaBrick" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#35170d" />
          <stop offset="50%" stopColor="#692d19" />
          <stop offset="100%" stopColor="#291108" />
        </linearGradient>

        {/* Text Curving Paths */}
        {/* Top Arc for "SIAM SI" */}
        <path id="topTextArc" d="M 95,225 A 170,170 0 0,1 405,225" fill="none" />
        {/* Bottom Arc for "OPEN THE PAST OF SUKOTHAI" */}
        <path id="bottomTextArc" d="M 425,270 A 185,185 0 0,1 75,270" fill="none" />

        {/* Subtle Damask Wallpaper Pattern for Navy Rim */}
        <pattern id="thaiFloralBg" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="3" fill="#ffffff" opacity="0.04" />
          <path d="M 15,6 Q 20,15 15,24 Q 10,15 15,6 Z" fill="#ffffff" opacity="0.03" />
          <path d="M 6,15 Q 15,20 24,15 Q 15,10 6,15 Z" fill="#ffffff" opacity="0.03" />
        </pattern>
      </defs>

      {/* 1. Base Outer Gold Rim & Cast Shadow */}
      <circle cx="250" cy="250" r="242" fill="#070c15" stroke="url(#metallicGold)" strokeWidth="4" />
      <circle cx="250" cy="250" r="236" fill="none" stroke="#2a1b08" strokeWidth="2" />

      {/* 2. Navy Blue Ring with Subtle Damask Motif */}
      <circle cx="250" cy="250" r="234" fill="url(#navyOuterGrad)" />
      <circle cx="250" cy="250" r="234" fill="url(#thaiFloralBg)" />

      {/* Inner Decorative Beaded Gold Ring */}
      <circle cx="250" cy="250" r="226" fill="none" stroke="url(#metallicGold)" strokeWidth="1.8" strokeDasharray="3,3" opacity="0.85" />
      <circle cx="250" cy="250" r="150" fill="none" stroke="url(#metallicGold)" strokeWidth="3" />
      <circle cx="250" cy="250" r="146" fill="none" stroke="#221404" strokeWidth="2" />

      {/* 3. Left & Right Traditional Thai Kranok Gold Scrollwork (ลายกนกเทศทองคำ) */}
      {/* Left Kranok Flourish */}
      <g transform="translate(42, 175) scale(0.68)">
        <path
          d="M 25,110 C 10,95 5,70 15,45 C 22,25 38,15 45,5 C 40,25 45,45 35,65 C 50,45 65,30 85,25 C 70,40 60,65 52,85 C 65,75 80,70 95,72 C 80,88 65,102 45,112 C 60,115 72,122 80,135 C 60,132 42,122 25,110 Z"
          fill="url(#metallicGold)"
          stroke="#452705"
          strokeWidth="1.2"
        />
        <circle cx="50" cy="70" r="4.5" fill="#fff9db" />
      </g>

      {/* Right Kranok Flourish (Mirrored) */}
      <g transform="translate(458, 175) scale(-0.68, 0.68)">
        <path
          d="M 25,110 C 10,95 5,70 15,45 C 22,25 38,15 45,5 C 40,25 45,45 35,65 C 50,45 65,30 85,25 C 70,40 60,65 52,85 C 65,75 80,70 95,72 C 80,88 65,102 45,112 C 60,115 72,122 80,135 C 60,132 42,122 25,110 Z"
          fill="url(#metallicGold)"
          stroke="#452705"
          strokeWidth="1.2"
        />
        <circle cx="50" cy="70" r="4.5" fill="#fff9db" />
      </g>

      {/* 4. Top Arched Title: "SIAM SI" */}
      <g className="font-serif font-black tracking-widest text-[36px]">
        {/* Soft shadow duplicate */}
        <text dy="-2">
          <textPath href="#topTextArc" startOffset="50%" textAnchor="middle" fill="#040810" stroke="#040810" strokeWidth="4">
            SIAM SI
          </textPath>
        </text>
        {/* Top Gold Foil Text */}
        <text>
          <textPath
            href="#topTextArc"
            startOffset="50%"
            textAnchor="middle"
            fill="url(#metallicGold)"
            stroke="#5c3808"
            strokeWidth="0.8"
          >
            SIAM SI
          </textPath>
        </text>
      </g>

      {/* 5. Bottom Arched Subtitle: "OPEN THE PAST OF SUKOTHAI" */}
      <g className="font-serif font-bold tracking-widest text-[19px]">
        {/* Soft shadow duplicate */}
        <text dy="-2">
          <textPath href="#bottomTextArc" startOffset="50%" textAnchor="middle" fill="#040810" stroke="#040810" strokeWidth="3">
            OPEN THE PAST OF SUKOTHAI
          </textPath>
        </text>
        {/* Gold Foil Text */}
        <text>
          <textPath
            href="#bottomTextArc"
            startOffset="50%"
            textAnchor="middle"
            fill="url(#metallicGold)"
            stroke="#452705"
            strokeWidth="0.6"
          >
            OPEN THE PAST OF SUKOTHAI
          </textPath>
        </text>
      </g>

      {/* Central Bottom Lotus Floret Embellishment */}
      <g transform="translate(250, 412) scale(0.65)">
        <polygon points="0,-18 7,-6 18,-6 10,2 14,14 0,7 -14,14 -10,2 -18,-6 -7,-6" fill="url(#metallicGold)" stroke="#3e2105" strokeWidth="1" />
        <circle cx="0" cy="0" r="3.5" fill="#fff" />
      </g>

      {/* 6. CENTERPIECE: Inner Sacred Portal / Temple Chamber (ซุ้มเรือนแก้ว) */}
      {/* Chamber Clip Path for Arch */}
      <clipPath id="archClip">
        <path d="M 160,370 L 160,250 Q 160,135 250,95 Q 340,135 340,250 L 340,370 Z" />
      </clipPath>

      {/* Center Sunset Glow & Horizon within Arch */}
      <g clipPath="url(#archClip)">
        {/* Sunset Sky */}
        <rect x="150" y="80" width="200" height="300" fill="url(#sunsetGlow)" />
        {/* Soft Sun Disc */}
        <circle cx="250" cy="250" r="45" fill="#fff9c4" opacity="0.65" filter="blur(4px)" />

        {/* Distant Temple Silhouettes (วัดมหาธาตุ & เสาศิลาแลงสุโขทัย) */}
        {/* Left Temple Rooftop Gable */}
        <polygon points="155,270 175,250 195,270" fill="#3b170c" />
        <rect x="160" y="270" width="30" height="35" fill="#2b1108" />
        {/* Small Left Chedi */}
        <path d="M 215,285 Q 220,235 223,210 Q 226,235 231,285 Z" fill="#4d2212" />
        {/* Small Right Chedi & Ruin Pillars */}
        <path d="M 270,285 Q 275,240 278,220 Q 281,240 286,285 Z" fill="#4d2212" />
        {/* Ruined Stone Columns on Right */}
        <rect x="295" y="260" width="7" height="40" fill="#30150b" />
        <rect x="306" y="250" width="7" height="50" fill="#30150b" />
        <rect x="318" y="265" width="6" height="35" fill="#30150b" />
        <rect x="328" y="245" width="6" height="55" fill="#30150b" />

        {/* Central Bell-Shaped Sukhothai Chedi (เจดีย์ประธานทรงระฆัง) */}
        <g transform="translate(250, 245)">
          {/* Spire Pinnacle */}
          <polygon points="-2,-115 0,-138 2,-115" fill="#fde047" stroke="#78350f" strokeWidth="0.8" />
          {/* Ringed Spire (ปล้องไฉน) */}
          <rect x="-4" y="-115" width="8" height="28" fill="url(#metallicGold)" />
          {/* Harmika Box (บัลลังก์สี่เหลี่ยม) */}
          <rect x="-8" y="-87" width="16" height="7" fill="#602812" stroke="#fcd34d" strokeWidth="0.8" />
          {/* Main Bell Body (องค์ระฆัง) */}
          <path
            d="M -22,-20 C -22,-70 -16,-80 0,-80 C 16,-80 22,-70 22,-20 Z"
            fill="url(#stupaBrick)"
            stroke="#f59e0b"
            strokeWidth="1"
          />
          {/* Tiered Octagonal Base (ฐานเขียงบัวถลา) */}
          <rect x="-26" y="-20" width="52" height="8" rx="1" fill="#4a1e0e" stroke="#240c05" strokeWidth="1" />
          <rect x="-32" y="-12" width="64" height="9" rx="1" fill="#38160a" stroke="#240c05" strokeWidth="1" />
          <rect x="-38" y="-3" width="76" height="10" rx="1" fill="#2d1107" stroke="#240c05" strokeWidth="1" />
        </g>

        {/* Foreground Golden Seated Buddha Statue (พระพุทธรูปสุโขทัย ปางมารวิชัย/สมาธิ) */}
        <g transform="translate(250, 290)">
          {/* Lotus Altar Throne */}
          <rect x="-28" y="18" width="56" height="10" rx="2" fill="url(#metallicGold)" stroke="#3e1b06" strokeWidth="1.2" />
          <rect x="-34" y="27" width="68" height="9" rx="2" fill="#2d1206" stroke="#c5a059" strokeWidth="1" />

          {/* Buddha Halo / Flame Ushnisha (พระเกตุมาลาเปลวเพลิง) */}
          <path d="M -2,-26 Q 0,-37 2,-26 Z" fill="#fff9c4" stroke="#d97706" strokeWidth="0.8" />
          {/* Head & Usnisa */}
          <circle cx="0" cy="-21" r="7" fill="url(#buddhaGold)" stroke="#451e05" strokeWidth="0.8" />
          {/* Meditating Body / Robes */}
          <path
            d="M -12,18 C -16,4 -11,-12 0,-12 C 11,-12 16,4 12,18 Z"
            fill="url(#buddhaGold)"
            stroke="#451e05"
            strokeWidth="1.2"
          />
          {/* Crossed Legs (ปางสมาธิ) */}
          <ellipse cx="0" cy="18" rx="20" ry="6" fill="url(#buddhaGold)" stroke="#451e05" strokeWidth="1.2" />
        </g>
      </g>

      {/* 7. Ornate Golden Thai Portal Frame (ซุ้มเรือนแก้วลอยตัวรอบภาพกลาง) */}
      <g>
        {/* Outer Arch Border Path */}
        <path
          d="M 160,370 L 160,248 Q 160,135 250,92 Q 340,135 340,248 L 340,370"
          fill="none"
          stroke="url(#metallicGold)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Inner Arch Fine Gold Border */}
        <path
          d="M 160,370 L 160,250 Q 160,138 250,95 Q 340,138 340,250 L 340,370"
          fill="none"
          stroke="#452705"
          strokeWidth="2"
        />

        {/* Golden Arch Spire / Central Top Gable Pinnacle (ยอดปราสาท) */}
        <path
          d="M 242,92 L 250,55 L 258,92 Z"
          fill="url(#metallicGold)"
          stroke="#452705"
          strokeWidth="1.5"
        />
        <circle cx="250" cy="53" r="3.5" fill="#fff" />

        {/* Left & Right Finials / Chofah (ช่อฟ้าใบระกาหัวซุ้ม) */}
        {/* Left Gable Finial */}
        <path
          d="M 170,165 C 150,150 142,125 152,105 C 158,115 168,125 174,135 Z"
          fill="url(#metallicGold)"
          stroke="#452705"
          strokeWidth="1.2"
        />
        {/* Right Gable Finial */}
        <path
          d="M 330,165 C 350,150 358,125 348,105 C 342,115 332,125 326,135 Z"
          fill="url(#metallicGold)"
          stroke="#452705"
          strokeWidth="1.2"
        />

        {/* Pillars Base Pedestals */}
        <rect x="148" y="358" width="24" height="14" rx="2" fill="url(#metallicGold)" stroke="#3e1b05" strokeWidth="1.5" />
        <rect x="328" y="358" width="24" height="14" rx="2" fill="url(#metallicGold)" stroke="#3e1b05" strokeWidth="1.5" />
      </g>
    </svg>
  );
};
