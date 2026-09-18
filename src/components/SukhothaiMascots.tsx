import React from 'react';

// Mascot 1: Prince Ram (พ่อขุนรามคำแหงน้อย / เจ้าชายน้อยสุโขทัย ถือธงลายสือไท)
export const MascotPrince: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="เจ้าชายน้อยสุโขทัย">
    <defs>
      <radialGradient id="princeSkin" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#fff4ea" />
        <stop offset="70%" stopColor="#fedac2" />
        <stop offset="100%" stopColor="#f3bba0" />
      </radialGradient>
      <linearGradient id="princeCloth" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2c3e6b" />
        <stop offset="50%" stopColor="#1e2c4f" />
        <stop offset="100%" stopColor="#141c33" />
      </linearGradient>
      <linearGradient id="thaiGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe680" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#997015" />
      </linearGradient>
      <filter id="mascotGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>

    <g filter="url(#mascotGlow)">
      {/* Shadow */}
      <ellipse cx="80" cy="192" rx="42" ry="6" fill="#000" opacity="0.25" />

      {/* Royal Flag Stick & Banner */}
      <g>
        <rect x="132" y="58" width="4" height="95" rx="2" fill="url(#thaiGold)" />
        <circle cx="134" cy="56" r="3.5" fill="url(#thaiGold)" />
        {/* Banner with Thai kranok pattern */}
        <path d="M136 65H158V100L147 114L136 100Z" fill="#b93b2a" stroke="url(#thaiGold)" strokeWidth="1.5" />
        <path d="M141 72H153V94L147 102L141 94Z" fill="#2c3e6b" stroke="url(#thaiGold)" strokeWidth="1" />
        <circle cx="147" cy="83" r="2.5" fill="url(#thaiGold)" />
      </g>

      {/* Feet / Legs */}
      <rect x="58" y="152" width="16" height="30" rx="8" fill="url(#princeSkin)" />
      <rect x="86" y="152" width="16" height="30" rx="8" fill="url(#princeSkin)" />
      {/* Golden Anklets */}
      <ellipse cx="66" cy="176" rx="9" ry="3" fill="url(#thaiGold)" />
      <ellipse cx="94" cy="176" rx="9" ry="3" fill="url(#thaiGold)" />
      {/* Golden Shoes */}
      <path d="M52 186C52 180 62 180 74 180C80 180 82 185 80 189C78 191 54 191 52 186Z" fill="url(#thaiGold)" />
      <path d="M86 186C86 180 96 180 108 180C114 180 116 185 114 189C112 191 88 191 86 186Z" fill="url(#thaiGold)" />

      {/* Lower Garment (Chong Kraben) */}
      <path d="M48 122C48 116 112 116 112 122C116 136 110 156 80 156C50 156 44 136 48 122Z" fill="url(#thaiGold)" />
      {/* Silk texture folds */}
      <path d="M80 120V155M66 124C68 136 72 148 76 154M94 124C92 136 88 148 84 154" stroke="#8a6312" strokeWidth="1.2" strokeLinecap="round" />

      {/* Body / Royal Jacket */}
      <path d="M50 88C50 88 42 124 48 126C54 128 106 128 112 126C118 124 110 88 110 88Z" fill="url(#princeCloth)" />
      {/* Ornate Gold Embroidery on jacket */}
      <path d="M72 88L80 110L88 88" stroke="url(#thaiGold)" strokeWidth="2" fill="none" />
      <circle cx="80" cy="116" r="4.5" fill="url(#thaiGold)" />
      {/* Gold Belt & Hanging Sash */}
      <rect x="48" y="118" width="64" height="6" rx="3" fill="url(#thaiGold)" />
      <path d="M75 124H85L88 145L80 150L72 145Z" fill="url(#thaiGold)" stroke="#8a6312" strokeWidth="0.8" />

      {/* Left Arm holding flag */}
      <path d="M106 94C114 98 124 104 134 108" stroke="url(#princeCloth)" strokeWidth="14" strokeLinecap="round" />
      <circle cx="134" cy="108" r="7" fill="url(#princeSkin)" />
      {/* Golden Bangle right */}
      <ellipse cx="127" cy="104" rx="4" ry="7" fill="url(#thaiGold)" />

      {/* Right Arm waving */}
      <path d="M54 94C44 100 36 112 36 122" stroke="url(#princeCloth)" strokeWidth="14" strokeLinecap="round" />
      <circle cx="36" cy="122" r="7" fill="url(#princeSkin)" />
      {/* Golden Bangle left */}
      <ellipse cx="40" cy="114" rx="4" ry="7" fill="url(#thaiGold)" />

      {/* Royal Neck Collar */}
      <path d="M60 86C66 94 94 94 100 86C96 80 64 80 60 86Z" fill="url(#thaiGold)" stroke="#8a6312" strokeWidth="1" />

      {/* Head */}
      <circle cx="80" cy="56" r="32" fill="url(#princeSkin)" />

      {/* Ears */}
      <circle cx="48" cy="58" r="6.5" fill="url(#princeSkin)" />
      <circle cx="112" cy="58" r="6.5" fill="url(#princeSkin)" />
      {/* Gold Ear Ornaments (Karn-Chai) */}
      <path d="M46 54C40 50 38 42 42 36C45 42 46 48 46 54Z" fill="url(#thaiGold)" />
      <path d="M114 54C120 50 122 42 118 36C115 42 114 48 114 54Z" fill="url(#thaiGold)" />

      {/* Hair Topknot (Juk) & Golden Crown (Chada/Kiao) */}
      <path d="M52 48C52 30 64 24 80 24C96 24 108 30 108 48C108 44 98 34 80 34C62 34 52 44 52 48Z" fill="#201a18" />
      {/* Top Hair Bun */}
      <circle cx="80" cy="20" r="13" fill="#201a18" />
      {/* Golden Kiao ring around bun */}
      <ellipse cx="80" cy="23" rx="14" ry="4.5" fill="url(#thaiGold)" />
      <path d="M80 8L84 19H76Z" fill="url(#thaiGold)" />
      <circle cx="80" cy="7" r="2.5" fill="#e53935" />

      {/* Rosy Cheeks */}
      <ellipse cx="64" cy="65" rx="6" ry="3.5" fill="#f48fb1" opacity="0.6" />
      <ellipse cx="96" cy="65" rx="6" ry="3.5" fill="#f48fb1" opacity="0.6" />

      {/* Big Sparkling Anime Eyes */}
      <ellipse cx="66" cy="56" rx="5.5" ry="7" fill="#1b120c" />
      <ellipse cx="94" cy="56" rx="5.5" ry="7" fill="#1b120c" />
      <circle cx="64.5" cy="54" r="2.2" fill="#ffffff" />
      <circle cx="68" cy="58" r="1.1" fill="#ffffff" />
      <circle cx="92.5" cy="54" r="2.2" fill="#ffffff" />
      <circle cx="96" cy="58" r="1.1" fill="#ffffff" />

      {/* Eyebrows */}
      <path d="M60 47C64 45 70 46 72 48" stroke="#3e2723" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 47C96 45 90 46 88 48" stroke="#3e2723" strokeWidth="2" strokeLinecap="round" />

      {/* Cute Smile */}
      <path d="M73 66C75 71 85 71 87 66" stroke="#b71c1c" strokeWidth="2" strokeLinecap="round" fill="#d32f2f" />
    </g>
  </svg>
);

// Mascot 2: Sukhothai Inscription Stele (มาสคอตศิลาจารึกสุโขทัย 3D ยิ้มตาแป๋ว)
export const MascotStele: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 160 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="มาสคอตศิลาจารึกหลักที่ 1">
    <defs>
      <linearGradient id="steleStone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d3ccc4" />
        <stop offset="50%" stopColor="#b5aba0" />
        <stop offset="100%" stopColor="#8d8174" />
      </linearGradient>
      <linearGradient id="steleShadow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7a6f63" />
        <stop offset="100%" stopColor="#554c42" />
      </linearGradient>
      <linearGradient id="goldScript" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffd54f" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
      <filter id="steleGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>

    <g filter="url(#steleGlow)">
      {/* Ground Shadow */}
      <ellipse cx="80" cy="180" rx="55" ry="8" fill="#000" opacity="0.3" />

      {/* Base Pedestal (ฐานสี่เหลี่ยมหินทราย) */}
      <path d="M28 152L38 142H122L132 152H28Z" fill="url(#steleShadow)" />
      <rect x="25" y="152" width="110" height="24" rx="4" fill="url(#steleStone)" stroke="#6d6256" strokeWidth="1.5" />
      <rect x="32" y="156" width="96" height="4" rx="2" fill="#e2dcd5" opacity="0.6" />

      {/* Stele Main Body (เสาศิลา 4 ด้าน ยอดแหลมมน) */}
      <path d="M80 18L116 52V142H44V52L80 18Z" fill="url(#steleStone)" stroke="#6d6256" strokeWidth="2" />
      {/* 3D Chamfered Right Edge */}
      <path d="M80 18L116 52V142H110V54L80 24Z" fill="#756a5e" opacity="0.45" />
      {/* Top facet highlight */}
      <path d="M80 20L47 53H78L80 20Z" fill="#f0ebe4" opacity="0.6" />

      {/* Ancient Sukhothai Script Lines (ลายสือไท) */}
      <g stroke="url(#goldScript)" strokeWidth="1.8" strokeLinecap="round" opacity="0.85">
        <path d="M52 62H72M52 68H76M52 74H70M52 80H75" />
        <path d="M85 62H108M85 68H104M85 74H106M85 80H102" />
        <path d="M52 118H108M54 124H106M56 130H102M60 136H100" />
      </g>

      {/* Cute Chibi Face on the Inscription Stele! */}
      {/* Rosy Cheeks */}
      <ellipse cx="58" cy="98" rx="6" ry="3.5" fill="#f48fb1" opacity="0.75" />
      <ellipse cx="102" cy="98" rx="6" ry="3.5" fill="#f48fb1" opacity="0.75" />

      {/* Big Cute Eyes */}
      <circle cx="66" cy="92" r="7" fill="#241a14" />
      <circle cx="94" cy="92" r="7" fill="#241a14" />
      <circle cx="64.5" cy="90" r="2.5" fill="#ffffff" />
      <circle cx="67.5" cy="93.5" r="1.2" fill="#ffffff" />
      <circle cx="92.5" cy="90" r="2.5" fill="#ffffff" />
      <circle cx="95.5" cy="93.5" r="1.2" fill="#ffffff" />

      {/* Gentle smiling eyebrows */}
      <path d="M60 83C63 81 69 82 71 84" stroke="#4a3b32" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 83C97 81 91 82 89 84" stroke="#4a3b32" strokeWidth="2" strokeLinecap="round" />

      {/* Happy Open Smile */}
      <path d="M74 98C74 104 86 104 86 98" stroke="#b71c1c" strokeWidth="2" strokeLinecap="round" fill="#e53935" />

      {/* Little Lotus Flower Accessory on Top */}
      <g transform="translate(80, 16) scale(0.9)">
        <path d="M0 -12C-4 -5 0 0 0 0C0 0 4 -5 0 -12Z" fill="#ff80ab" />
        <path d="M-6 -8C-8 -2 0 0 0 0C0 0 -2 -5 -6 -8Z" fill="#f48fb1" />
        <path d="M6 -8C8 -2 0 0 0 0C0 0 2 -5 6 -8Z" fill="#f48fb1" />
        <circle cx="0" cy="-2" r="2" fill="#ffd54f" />
      </g>
    </g>
  </svg>
);

// Mascot 3: Siam Si Cylinder (กระบอกเซียมซีแห่งกาลเวลา 3D)
export const MascotSiamSiPot: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 160 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="กระบอกเซียมซีนำโชค">
    <defs>
      <linearGradient id="woodPot" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6d3c1a" />
        <stop offset="30%" stopColor="#a35f2d" />
        <stop offset="65%" stopColor="#bf733b" />
        <stop offset="100%" stopColor="#572e12" />
      </linearGradient>
      <linearGradient id="stickRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#d32f2f" />
        <stop offset="40%" stopColor="#e53935" />
        <stop offset="100%" stopColor="#c62828" />
      </linearGradient>
      <linearGradient id="potGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe57f" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#8d6e18" />
      </linearGradient>
      <filter id="potGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>

    <g filter="url(#potGlow)">
      {/* Ground Shadow */}
      <ellipse cx="80" cy="180" rx="46" ry="7" fill="#000" opacity="0.3" />

      {/* Red-tipped Fortune Sticks Fan */}
      <g>
        {/* Stick 1 */}
        <path d="M50 35L54 85H58L54 35Z" fill="#e8d5b5" stroke="#795548" strokeWidth="0.8" />
        <path d="M50 35L51 52H57L54 35Z" fill="url(#stickRed)" />
        {/* Stick 2 */}
        <path d="M62 25L65 85H69L66 25Z" fill="#f5e1c2" stroke="#795548" strokeWidth="0.8" />
        <path d="M62 25L63 43H68L66 25Z" fill="url(#stickRed)" />
        {/* Center Golden Lucky Stick 3 */}
        <path d="M77 15L78 85H83L82 15Z" fill="#fff9c4" stroke="#b78103" strokeWidth="1" />
        <path d="M77 15L77.5 35H82.5L82 15Z" fill="url(#stickRed)" />
        <circle cx="80" cy="25" r="2" fill="url(#potGold)" />
        {/* Stick 4 */}
        <path d="M92 25L90 85H94L96 25Z" fill="#f5e1c2" stroke="#795548" strokeWidth="0.8" />
        <path d="M96 25L95 43H90L92 25Z" fill="url(#stickRed)" />
        {/* Stick 5 */}
        <path d="M104 35L101 85H105L108 35Z" fill="#e8d5b5" stroke="#795548" strokeWidth="0.8" />
        <path d="M108 35L107 52H101L104 35Z" fill="url(#stickRed)" />
      </g>

      {/* Cylinder Rim (ปากกระบอก) */}
      <ellipse cx="80" cy="85" rx="42" ry="12" fill="#42220e" />
      <ellipse cx="80" cy="85" rx="38" ry="10" fill="#2d170a" />
      <ellipse cx="80" cy="83" rx="42" ry="10" fill="url(#potGold)" stroke="#8d6e18" strokeWidth="1.5" />

      {/* Cylinder Body */}
      <path d="M38 85C38 85 41 150 43 162C45 168 115 168 117 162C119 150 122 85 122 85Z" fill="url(#woodPot)" stroke="#42220e" strokeWidth="2" />
      {/* Wooden Barrel Planks texture */}
      <path d="M56 86C58 110 59 140 60 165M72 86C72 110 73 140 73 165M88 86C88 110 87 140 87 165M104 86C102 110 101 140 100 165" stroke="#42220e" strokeWidth="1" opacity="0.35" />

      {/* Decorative Thai Lotus/Gold Bands */}
      <rect x="40" y="96" width="80" height="7" rx="3.5" fill="url(#potGold)" />
      <rect x="42" y="152" width="76" height="7" rx="3.5" fill="url(#potGold)" />

      {/* Center Parchment Badge with Text */}
      <rect x="46" y="112" width="68" height="32" rx="6" fill="#fff9eb" stroke="url(#potGold)" strokeWidth="1.8" />

      {/* Eyes and Happy Face */}
      <circle cx="67" cy="125" r="3.5" fill="#2d170a" />
      <circle cx="93" cy="125" r="3.5" fill="#2d170a" />
      <circle cx="66" cy="124" r="1.2" fill="#fff" />
      <circle cx="92" cy="124" r="1.2" fill="#fff" />
      {/* Rosy Cheeks */}
      <ellipse cx="61" cy="130" rx="3.5" ry="2" fill="#f48fb1" opacity="0.7" />
      <ellipse cx="99" cy="130" rx="3.5" ry="2" fill="#f48fb1" opacity="0.7" />
      {/* Big Smile */}
      <path d="M76 131C76 135 84 135 84 131" stroke="#b71c1c" strokeWidth="1.8" strokeLinecap="round" fill="#e53935" />
      <text x="80" y="141" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#6d3c1a" fontFamily="'Sarabun', sans-serif">
        เซียมซีสุโขทัย
      </text>
    </g>
  </svg>
);

// Mascot 4: Sangkhalok Ceramic Fish Dish (จานปลาสังคโลกและช้างศิลาดล)
export const MascotSangkhalok: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="เครื่องสังคโลกสุโขทัย">
    <defs>
      <linearGradient id="celadonPlate" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b4e2d3" />
        <stop offset="50%" stopColor="#7ec4b0" />
        <stop offset="100%" stopColor="#438f7b" />
      </linearGradient>
      <linearGradient id="celadonJar" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a3ded0" />
        <stop offset="70%" stopColor="#55a593" />
        <stop offset="100%" stopColor="#306b5e" />
      </linearGradient>
      <filter id="sangkhalokGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>

    <g filter="url(#sangkhalokGlow)">
      {/* Ground Shadow */}
      <ellipse cx="85" cy="155" rx="55" ry="7" fill="#000" opacity="0.3" />

      {/* 1. Large Celadon Fish Plate (จานเชิงลายปลากา) */}
      <circle cx="95" cy="82" r="50" fill="url(#celadonPlate)" stroke="#285a4e" strokeWidth="2.5" />
      <circle cx="95" cy="82" r="44" stroke="#285a4e" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
      <circle cx="95" cy="82" r="33" fill="#9cd7c5" stroke="#285a4e" strokeWidth="1.5" />

      {/* Two Sangkhalok Underglaze Iron-Black Fishes swimming in circle */}
      <g stroke="#1a3b33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#2d6457">
        {/* Fish 1 (Top) */}
        <path d="M78 70C84 64 96 64 104 68C110 72 112 76 112 76C112 76 106 80 98 80C90 80 82 76 78 70Z" />
        <path d="M78 70L70 65M78 70L70 75" />
        <circle cx="106" cy="72" r="1.5" fill="#1a3b33" />
        {/* Fish 2 (Bottom) */}
        <path d="M112 94C106 100 94 100 86 96C80 92 78 88 78 88C78 88 84 84 92 84C100 84 108 88 112 94Z" />
        <path d="M112 94L120 99M112 94L120 89" />
        <circle cx="84" cy="92" r="1.5" fill="#1a3b33" />
      </g>

      {/* Plate Sparkle */}
      <path d="M125 50L128 58L136 61L128 64L125 72L122 64L114 61L122 58Z" fill="#ffffff" opacity="0.8" />

      {/* 2. Sangkhalok Ceramic Jar in foreground */}
      <g>
        <ellipse cx="45" cy="115" rx="14" ry="4" fill="#2d6457" />
        <path d="M32 115C32 110 58 110 58 115C64 125 66 142 58 150C52 154 38 154 32 150C24 142 26 125 32 115Z" fill="url(#celadonJar)" stroke="#1a3b33" strokeWidth="2" />
        {/* Jar Neck Rim */}
        <ellipse cx="45" cy="113" rx="12" ry="3.5" fill="#bbf2e3" stroke="#1a3b33" strokeWidth="1.2" />
        {/* Thai Kranok swirl carving */}
        <path d="M35 132C42 126 48 138 55 132" stroke="#1a3b33" strokeWidth="1.5" fill="none" />
      </g>

      {/* 3. Chibi Celadon Elephant Figurine (ช้างสังคโลกเคลือบเขียวไข่กา) */}
      <g>
        {/* Body */}
        <ellipse cx="120" cy="132" rx="22" ry="16" fill="url(#celadonJar)" stroke="#1a3b33" strokeWidth="1.8" />
        {/* Legs */}
        <rect x="105" y="136" width="8" height="15" rx="4" fill="url(#celadonJar)" stroke="#1a3b33" strokeWidth="1.2" />
        <rect x="126" y="136" width="8" height="15" rx="4" fill="url(#celadonJar)" stroke="#1a3b33" strokeWidth="1.2" />
        {/* Head and Ears */}
        <circle cx="98" cy="126" r="11" fill="url(#celadonJar)" stroke="#1a3b33" strokeWidth="1.5" />
        <ellipse cx="104" cy="124" rx="5" ry="8" fill="#7ec4b0" stroke="#1a3b33" strokeWidth="1.2" />
        {/* Trunk curled up in luck (งวงชูขึ้นมงคล) */}
        <path d="M92 128C88 130 84 136 84 140C84 144 90 144 90 140" stroke="#1a3b33" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="95" cy="123" r="2" fill="#1a3b33" />
        <circle cx="94.5" cy="122.5" r="0.7" fill="#fff" />
      </g>
    </g>
  </svg>
);

// Mascot 5: Princess Nang Nopphamat (นางนพมาศน้อย / พระสนมเอกสุโขทัย ห่มสไบทอง)
export const MascotPrincess: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="นางนพมาศน้อยสุโขทัย">
    <defs>
      <radialGradient id="prinSkin" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#fff8f2" />
        <stop offset="70%" stopColor="#fedfcb" />
        <stop offset="100%" stopColor="#f3beaa" />
      </radialGradient>
      <linearGradient id="prinGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff176" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#997015" />
      </linearGradient>
      <linearGradient id="prinClothRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d32f2f" />
        <stop offset="50%" stopColor="#9a1b1e" />
        <stop offset="100%" stopColor="#5f090c" />
      </linearGradient>
      <filter id="princessGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>

    <g filter="url(#princessGlow)">
      {/* Shadow */}
      <ellipse cx="80" cy="192" rx="38" ry="6" fill="#000" opacity="0.25" />

      {/* Feet */}
      <rect x="62" y="162" width="14" height="24" rx="7" fill="url(#prinSkin)" />
      <rect x="84" y="162" width="14" height="24" rx="7" fill="url(#prinSkin)" />
      {/* Golden Anklets */}
      <ellipse cx="69" cy="180" rx="8" ry="2.5" fill="url(#prinGold)" />
      <ellipse cx="91" cy="180" rx="8" ry="2.5" fill="url(#prinGold)" />

      {/* Traditional Thai Sinh Skirt (ผ้านุ่งลายพุ่มข้าวบิณฑ์สุโขทัย) */}
      <path d="M52 118C52 112 108 112 108 118L114 168C114 172 46 172 46 168Z" fill="url(#prinClothRed)" stroke="#5f090c" strokeWidth="1.5" />
      {/* Gold embroidery on skirt */}
      <path d="M50 162H110M52 152H108" stroke="url(#prinGold)" strokeWidth="1.8" strokeDasharray="3 3" />
      <path d="M80 116V168" stroke="url(#prinGold)" strokeWidth="2" />

      {/* Gold Belt & Hanging Jewelry */}
      <rect x="50" y="114" width="60" height="6" rx="3" fill="url(#prinGold)" />
      <circle cx="80" cy="117" r="4.5" fill="#e53935" stroke="url(#prinGold)" strokeWidth="1.5" />

      {/* Torso & Golden Sabai Pleated Shawl (สไบทองอัดกลีบ) */}
      <path d="M56 88C56 88 48 116 52 120C56 124 104 124 108 120C112 116 104 88 104 88Z" fill="url(#prinSkin)" />
      {/* Sabai draping diagonally over left shoulder */}
      <path d="M60 88L108 122L102 128L52 94Z" fill="url(#prinGold)" stroke="#8d6e18" strokeWidth="1" />
      {/* Pleats texture */}
      <path d="M64 88L106 118M68 90L106 122" stroke="#b38f28" strokeWidth="1" />

      {/* Golden Royal Necklace (กรองคอสุโขทัย) */}
      <path d="M64 84C72 96 88 96 96 84C92 80 68 80 64 84Z" fill="url(#prinGold)" stroke="#8a6312" strokeWidth="1" />
      <circle cx="80" cy="94" r="2.5" fill="#e53935" />

      {/* Arms in graceful Thai dance pose */}
      <path d="M56 92C46 98 40 108 42 120" stroke="url(#prinSkin)" strokeWidth="11" strokeLinecap="round" />
      <path d="M104 92C114 98 120 108 118 120" stroke="url(#prinSkin)" strokeWidth="11" strokeLinecap="round" />
      {/* Golden Bracelets */}
      <ellipse cx="43" cy="114" rx="4" ry="6" fill="url(#prinGold)" />
      <ellipse cx="117" cy="114" rx="4" ry="6" fill="url(#prinGold)" />

      {/* Head */}
      <circle cx="80" cy="54" r="30" fill="url(#prinSkin)" />

      {/* Ears with Kundan Gold Dangling Earrings */}
      <circle cx="50" cy="56" r="6" fill="url(#prinSkin)" />
      <circle cx="110" cy="56" r="6" fill="url(#prinSkin)" />
      <g fill="url(#prinGold)">
        <circle cx="48" cy="62" r="2.5" />
        <path d="M48 64L45 74L51 74Z" />
        <circle cx="112" cy="62" r="2.5" />
        <path d="M112 64L109 74L115 74Z" />
      </g>

      {/* Hair Topknot & Royal Crown (มงกุฎชฎาน้อยประดับดอกไม้ไหว) */}
      <path d="M54 46C54 28 66 22 80 22C94 22 106 28 106 46C106 42 96 32 80 32C64 32 54 42 54 46Z" fill="#1b120c" />
      <circle cx="80" cy="18" r="12" fill="#1b120c" />
      {/* Golden Crown */}
      <path d="M60 28L80 6L100 28H60Z" fill="url(#prinGold)" stroke="#8a6312" strokeWidth="1.2" />
      <circle cx="80" cy="6" r="3" fill="#e53935" />
      <ellipse cx="80" cy="24" rx="14" ry="4" fill="url(#prinGold)" />
      {/* Hair Flower Jasmine */}
      <circle cx="56" cy="30" r="3.5" fill="#ffffff" />
      <circle cx="56" cy="30" r="1.5" fill="#ffd54f" />

      {/* Rosy Cheeks */}
      <ellipse cx="65" cy="63" rx="6" ry="3.5" fill="#f48fb1" opacity="0.65" />
      <ellipse cx="95" cy="63" rx="6" ry="3.5" fill="#f48fb1" opacity="0.65" />

      {/* Big Sparkling Anime Eyes with Long Eyelashes */}
      <ellipse cx="67" cy="55" rx="5.5" ry="7" fill="#1b120c" />
      <ellipse cx="93" cy="55" rx="5.5" ry="7" fill="#1b120c" />
      <circle cx="65.5" cy="53" r="2.2" fill="#ffffff" />
      <circle cx="68.5" cy="57" r="1.1" fill="#ffffff" />
      <circle cx="91.5" cy="53" r="2.2" fill="#ffffff" />
      <circle cx="94.5" cy="57" r="1.1" fill="#ffffff" />
      {/* Eyelashes */}
      <path d="M61 50L58 48M100 48L98 50" stroke="#1b120c" strokeWidth="1.5" strokeLinecap="round" />

      {/* Delicate Eyebrows */}
      <path d="M62 46C65 44 71 45 73 47" stroke="#3e2723" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M98 46C95 44 89 45 87 47" stroke="#3e2723" strokeWidth="1.5" strokeLinecap="round" />

      {/* Sweet Smile */}
      <path d="M74 65C76 69 84 69 86 65" stroke="#c2185b" strokeWidth="2" strokeLinecap="round" fill="#e91e63" />
    </g>
  </svg>
);

// Mascot 6: Royal Elephant Procession (ขบวนช้างทรงสุโขทัยและเณรน้อย)
export const MascotRoyalElephant: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="ขบวนช้างทรงสุโขทัย">
    <defs>
      <linearGradient id="elephSkin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9e9893" />
        <stop offset="60%" stopColor="#736c66" />
        <stop offset="100%" stopColor="#4f4842" />
      </linearGradient>
      <linearGradient id="elephGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe680" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#8d6e18" />
      </linearGradient>
      <filter id="elephGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>

    <g filter="url(#elephGlow)">
      {/* Ground Pedestal / Shadow */}
      <ellipse cx="95" cy="165" rx="65" ry="7" fill="#000" opacity="0.3" />
      <rect x="35" y="158" width="120" height="8" rx="4" fill="url(#elephGold)" stroke="#684e10" strokeWidth="1" />

      {/* Royal Elephant Body */}
      <ellipse cx="105" cy="122" rx="34" ry="24" fill="url(#elephSkin)" stroke="#3e3833" strokeWidth="2" />
      {/* Elephant Legs */}
      <rect x="76" y="128" width="13" height="32" rx="6" fill="url(#elephSkin)" stroke="#3e3833" strokeWidth="1.5" />
      <rect x="94" y="128" width="13" height="32" rx="6" fill="url(#elephSkin)" stroke="#3e3833" strokeWidth="1.5" />
      <rect x="114" y="128" width="13" height="32" rx="6" fill="url(#elephSkin)" stroke="#3e3833" strokeWidth="1.5" />
      <rect x="130" y="128" width="13" height="32" rx="6" fill="url(#elephSkin)" stroke="#3e3833" strokeWidth="1.5" />

      {/* Ornate Howdah Saddle & Thai Silk Cloth (สัปคับและผ้าคลุมช้างทรง) */}
      <path d="M88 104C88 104 122 104 122 104C126 118 126 132 122 136C108 140 100 140 88 136C84 132 84 118 88 104Z" fill="#1b5e20" stroke="url(#elephGold)" strokeWidth="2" />
      <path d="M94 112H116V130H94Z" fill="#b71c1c" stroke="url(#elephGold)" strokeWidth="1" />
      <circle cx="105" cy="121" r="3" fill="url(#elephGold)" />

      {/* Golden Parasol (ฉัตรทองสุโขทัย) */}
      <rect x="103" y="44" width="4" height="64" fill="url(#elephGold)" />
      <path d="M78 44C88 28 122 28 132 44H78Z" fill="url(#elephGold)" stroke="#7a5f15" strokeWidth="1.5" />
      {/* Hanging Bell tassels */}
      <circle cx="82" cy="48" r="2" fill="url(#elephGold)" />
      <circle cx="95" cy="48" r="2" fill="url(#elephGold)" />
      <circle cx="115" cy="48" r="2" fill="url(#elephGold)" />
      <circle cx="128" cy="48" r="2" fill="url(#elephGold)" />

      {/* Novice Monk on Elephant (เณรน้อยนั่งพนมมือบนช้าง) */}
      <circle cx="105" cy="80" r="10" fill="#fedfcb" />
      <circle cx="105" cy="74" r="9" fill="#ffb74d" opacity="0.3" />
      <ellipse cx="105" cy="95" rx="10" ry="12" fill="#e65100" />
      <circle cx="102" cy="79" r="1.5" fill="#2d170a" />
      <circle cx="108" cy="79" r="1.5" fill="#2d170a" />
      {/* Novice Anjali Hands (พนมมือ) */}
      <ellipse cx="105" cy="94" rx="4" ry="5" fill="#fedfcb" stroke="#bf360c" strokeWidth="0.8" />

      {/* Elephant Head & Big Flapping Ear */}
      <circle cx="68" cy="112" r="18" fill="url(#elephSkin)" stroke="#3e3833" strokeWidth="2" />
      <ellipse cx="78" cy="110" rx="9" ry="15" fill="#a48e83" stroke="#3e3833" strokeWidth="1.5" />

      {/* Golden Head Netting Ornament */}
      <path d="M56 104C64 98 76 98 82 104" stroke="url(#elephGold)" strokeWidth="2.5" />

      {/* Elephant Big Cute Eye */}
      <circle cx="62" cy="108" r="4" fill="#1b120c" />
      <circle cx="60.5" cy="106.5" r="1.5" fill="#ffffff" />
      <circle cx="56" cy="115" rx="3" ry="2" fill="#f48fb1" opacity="0.6" />

      {/* Curved Up Trunk (งวงมงคล) & White Tusks (งาช้าง) */}
      <path d="M52 114C44 116 38 126 40 134C42 140 48 140 50 134" stroke="url(#elephSkin)" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M52 118C44 122 46 128 54 126" stroke="#fffdf8" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);
