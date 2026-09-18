import React from 'react';
import { motion } from 'motion/react';

export const SukhothaiAtmosphereBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Deep Atmospheric Temple Room Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0806] via-[#170e09] to-[#0a0604]" />

      {/* 2. Warm Candlelight & Sacred Altar Glow (Centered behind fortune cylinder) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#f59e0b]/18 via-[#ffd54f]/10 to-transparent blur-[120px] rounded-full" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d97706]/10 blur-[90px] rounded-full" />

      {/* 3. CENTERPIECE: Ancient Sukhothai Stone Inscription Stele (ศิลาจารึกสุโขทัย หลักที่ ๑) */}
      <div className="absolute top-12 sm:top-8 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[680px] sm:h-[750px] flex items-center justify-center opacity-25 sm:opacity-30">
        <svg viewBox="0 0 500 700" className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="silaStoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a4035" />
              <stop offset="25%" stopColor="#3d342b" />
              <stop offset="60%" stopColor="#2c241d" />
              <stop offset="100%" stopColor="#1e1813" />
            </linearGradient>
            <linearGradient id="silaGoldGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd54f" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c5a059" stopOpacity="0.1" />
            </linearGradient>
            <pattern id="ancientScript" width="100" height="22" patternUnits="userSpaceOnUse">
              <path
                d="M 5,11 Q 12,6 20,11 T 35,11 T 50,9 T 65,12 T 80,10 T 95,11"
                fill="none"
                stroke="#ecdac2"
                strokeWidth="1.2"
                strokeDasharray="4,2,6,3"
                opacity="0.35"
              />
            </pattern>
          </defs>

          {/* Arched Stele Body */}
          <path
            d="M 120,680 L 380,680 L 380,240 Q 380,60 250,50 Q 120,60 120,240 Z"
            fill="url(#silaStoneGrad)"
            stroke="#6e5d4b"
            strokeWidth="3"
          />

          {/* Inner Inscription Inset Panel */}
          <path
            d="M 140,660 L 360,660 L 360,245 Q 360,95 250,85 Q 140,95 140,245 Z"
            fill="#1d1611"
            opacity="0.65"
            stroke="#9c8266"
            strokeWidth="1.5"
          />

          {/* Engraved Ancient Sukhothai Script Fill */}
          <rect x="145" y="140" width="210" height="510" fill="url(#ancientScript)" />

          {/* Golden Highlight Rim */}
          <path
            d="M 120,240 Q 120,60 250,50 Q 380,60 380,240"
            fill="none"
            stroke="url(#silaGoldGlow)"
            strokeWidth="4"
          />
        </svg>
      </div>

      {/* 4. LEFT WING: Sukhothai Historical Park (เจดีย์ทรงพุ่มข้าวบิณฑ์ วัดมหาธาตุ), ตะเกียงโบราณ, สังคโลก, ดอกบัว */}
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 lg:w-[420px] h-[550px] sm:h-[620px] hidden sm:block pointer-events-none">
        <svg viewBox="0 0 420 620" className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
          <defs>
            {/* Brick & Terracotta Gradient */}
            <linearGradient id="brickGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#783e29" />
              <stop offset="50%" stopColor="#a35738" />
              <stop offset="100%" stopColor="#5c2d1b" />
            </linearGradient>
            {/* Celadon Green Ceramic Gradient */}
            <radialGradient id="celadonVase" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#b4e2d3" />
              <stop offset="45%" stopColor="#5ea797" />
              <stop offset="85%" stopColor="#356d61" />
              <stop offset="100%" stopColor="#1e443c" />
            </radialGradient>
            {/* Ceramic Iron Brown/Black Underglaze */}
            <radialGradient id="sangkhalokPot" cx="40%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#f5edd6" />
              <stop offset="60%" stopColor="#d8c5a4" />
              <stop offset="100%" stopColor="#7a6245" />
            </radialGradient>
            {/* Lotus Pink Gradient */}
            <linearGradient id="lotusPetal" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="60%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            {/* Lantern Flame Glow */}
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* --- Wat Mahathat Lotus-bud Pagoda Ruin (เจดีย์ทรงพุ่มข้าวบิณฑ์ 3D) --- */}
          <g transform="translate(60, 110) scale(1.15)">
            {/* Stepped Brick Base */}
            <rect x="20" y="240" width="130" height="28" rx="3" fill="url(#brickGrad)" stroke="#3e1b0e" strokeWidth="2" />
            <rect x="35" y="215" width="100" height="25" rx="3" fill="url(#brickGrad)" stroke="#3e1b0e" strokeWidth="1.5" />
            <rect x="50" y="190" width="70" height="25" rx="2" fill="url(#brickGrad)" stroke="#3e1b0e" strokeWidth="1.5" />
            <rect x="62" y="165" width="46" height="25" rx="2" fill="url(#brickGrad)" stroke="#ffd24d" strokeWidth="1" />
            {/* Bell/Bud Shaped Spire (พุ่มข้าวบิณฑ์) */}
            <path
              d="M 68,165 Q 85,90 85,45 Q 85,90 102,165 Z"
              fill="url(#brickGrad)"
              stroke="#ffd54f"
              strokeWidth="2"
            />
            {/* Golden Pinnacle Spire Tip */}
            <polygon points="81,45 85,15 89,45" fill="#fcd34d" stroke="#b45309" strokeWidth="1.2" />
            <circle cx="85" cy="14" r="5" fill="#fffbeb" />
            {/* Stupa Niche with Golden Buddha silhouette */}
            <rect x="76" y="200" width="18" height="25" rx="8" fill="#1b120c" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="85" cy="208" r="3" fill="#fcd34d" />
            <path d="M 80,220 Q 85,214 90,220 Z" fill="#fcd34d" />
          </g>

          {/* --- Hanging Ancient Brass Oil Lantern (ตะเกียงน้ำมันทองเหลืองโบราณ) --- */}
          <g transform="translate(195, 140)">
            <line x1="20" y1="-80" x2="20" y2="20" stroke="#a3824c" strokeWidth="2.5" />
            <circle cx="20" cy="22" r="6" fill="#a3824c" />
            {/* Lantern Cap */}
            <path d="M 5,30 Q 20,18 35,30 Z" fill="#805e26" stroke="#d4af37" strokeWidth="1" />
            {/* Glass Chamber with Flame */}
            <rect x="8" y="30" width="24" height="32" rx="3" fill="#291a0c" stroke="#d4af37" strokeWidth="1.5" opacity="0.8" />
            {/* Glowing Lantern Halo */}
            <circle cx="20" cy="46" r="35" fill="url(#lanternGlow)" />
            <ellipse cx="20" cy="48" rx="4" ry="7" fill="#fffbeb" />
            {/* Lantern Base */}
            <path d="M 4,62 L 36,62 L 30,70 L 10,70 Z" fill="#805e26" stroke="#d4af37" strokeWidth="1" />
          </g>

          {/* --- Antique Sukhothai Sangkhalok Celadon Pottery (เครื่องสังคโลก โถและแจกันเคลือบเขียวไข่กา) --- */}
          {/* Celadon Vase on Table */}
          <g transform="translate(130, 360)">
            {/* Vase Body */}
            <path
              d="M 40,110 C 15,110 5,75 18,40 C 22,25 25,12 25,0 L 55,0 C 55,12 58,25 62,40 C 75,75 65,110 40,110 Z"
              fill="url(#celadonVase)"
              stroke="#244e45"
              strokeWidth="2"
            />
            {/* Vase Lip & Foot */}
            <ellipse cx="40" cy="0" rx="16" ry="4" fill="#8fd1c0" stroke="#244e45" strokeWidth="1.5" />
            <ellipse cx="40" cy="108" rx="20" ry="5" fill="#244e45" stroke="#356d61" strokeWidth="1" />
            {/* Sangkhalok Painted Foliage Pattern */}
            <path d="M 28,50 Q 40,35 52,50 Q 40,65 28,50 Z" fill="none" stroke="#1d433b" strokeWidth="2" />
            <circle cx="40" cy="50" r="3" fill="#1d433b" />
          </g>

          {/* Classic Round Sangkhalok Jar with Fish & Floral Motif */}
          <g transform="translate(25, 410)">
            <ellipse cx="50" cy="70" rx="46" ry="38" fill="url(#sangkhalokPot)" stroke="#53402d" strokeWidth="2.5" />
            <ellipse cx="50" cy="36" rx="24" ry="6" fill="#ebe0ca" stroke="#53402d" strokeWidth="1.5" />
            {/* Classic Sangkhalok Fish motif on jar */}
            <path d="M 32,70 Q 50,58 68,68 Q 62,78 40,78 Z" fill="#423425" />
            <polygon points="66,67 78,60 74,75" fill="#423425" />
            <circle cx="36" cy="68" r="2" fill="#fff" />
          </g>

          {/* --- Stone Lotus Basin with Blooming Pink Water Lilies (อ่างบัวสุโขทัย) --- */}
          <g transform="translate(10, 485)">
            {/* Stone Basin Rim */}
            <ellipse cx="90" cy="85" rx="85" ry="35" fill="#2d251e" stroke="#715d48" strokeWidth="3" />
            <ellipse cx="90" cy="82" rx="80" ry="30" fill="#15201d" />

            {/* Lily Pads */}
            <ellipse cx="55" cy="82" rx="26" ry="12" fill="#2e5a44" stroke="#1c3b2c" strokeWidth="1.5" />
            <ellipse cx="120" cy="86" rx="30" ry="14" fill="#2e5a44" stroke="#1c3b2c" strokeWidth="1.5" />

            {/* Blooming Pink Lotus 1 */}
            <g transform="translate(75, 52)">
              <path d="M 15,30 C 5,20 2,10 15,0 C 28,10 25,20 15,30 Z" fill="url(#lotusPetal)" stroke="#db2777" strokeWidth="0.8" />
              <path d="M 8,30 C -2,22 -2,12 8,2 C 16,12 16,22 8,30 Z" fill="url(#lotusPetal)" opacity="0.9" />
              <path d="M 22,30 C 32,22 32,12 22,2 C 14,12 14,22 22,30 Z" fill="url(#lotusPetal)" opacity="0.9" />
              <circle cx="15" cy="18" r="4" fill="#facc15" />
            </g>

            {/* Blooming Pink Lotus 2 */}
            <g transform="translate(125, 60) scale(0.75)">
              <path d="M 15,30 C 5,20 2,10 15,0 C 28,10 25,20 15,30 Z" fill="url(#lotusPetal)" stroke="#db2777" strokeWidth="0.8" />
              <path d="M 8,30 C -2,22 -2,12 8,2 C 16,12 16,22 8,30 Z" fill="url(#lotusPetal)" />
              <path d="M 22,30 C 32,22 32,12 22,2 C 14,12 14,22 22,30 Z" fill="url(#lotusPetal)" />
              <circle cx="15" cy="18" r="4" fill="#facc15" />
            </g>
          </g>
        </svg>
      </div>

      {/* 5. RIGHT WING: พระพุทธรูปสุโขทัย, ขบวนแห่ช้างบวชนาค (3D Chibi Elephants), สังคโลก, ดอกบัว */}
      <div className="absolute bottom-0 right-0 w-64 sm:w-80 md:w-96 lg:w-[450px] h-[550px] sm:h-[620px] hidden sm:block pointer-events-none">
        <svg viewBox="0 0 450 620" className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
          <defs>
            {/* Golden Buddha Glow */}
            <linearGradient id="goldBuddhaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
            {/* Chibi Elephant Skin Gradient */}
            <linearGradient id="chibiElephantSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8d8c89" />
              <stop offset="60%" stopColor="#676663" />
              <stop offset="100%" stopColor="#484745" />
            </linearGradient>
            {/* Ceremonial Parasol Rainbow Gradient (ร่มสัปทนบวชนาค) */}
            <linearGradient id="parasolGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="33%" stopColor="#eab308" />
              <stop offset="66%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* --- Sukhothai Golden Buddha in Wooden Altar Niche (พระพุทธรูปสุโขทัย) --- */}
          <g transform="translate(260, 90)">
            {/* Wooden Shrine Base */}
            <rect x="25" y="190" width="110" height="30" rx="4" fill="#3b2619" stroke="#c5a059" strokeWidth="2" />
            <rect x="40" y="170" width="80" height="20" rx="3" fill="#2d1c12" stroke="#c5a059" strokeWidth="1.5" />

            {/* Flaming Nimbus / Flame finial (พระรัศมีเปลวเพลิง สุโขทัย) */}
            <circle cx="80" cy="115" r="42" fill="#f59e0b" opacity="0.25" filter="blur(6px)" />

            {/* Golden Buddha Statue Silhouette */}
            {/* Head & Usnisa */}
            <circle cx="80" cy="85" r="16" fill="url(#goldBuddhaGrad)" stroke="#78350f" strokeWidth="1" />
            <path d="M 76,70 Q 80,56 84,70 Z" fill="#ffd54f" stroke="#78350f" strokeWidth="1" />
            {/* Torso & Robes (ปางสมาธิ/มารวิชัย) */}
            <path
              d="M 52,165 C 50,125 65,100 80,100 C 95,100 110,125 108,165 Z"
              fill="url(#goldBuddhaGrad)"
              stroke="#78350f"
              strokeWidth="1.5"
            />
            {/* Crossed Legs on Lotus Throne */}
            <ellipse cx="80" cy="165" rx="36" ry="12" fill="url(#goldBuddhaGrad)" stroke="#78350f" strokeWidth="1.5" />
          </g>

          {/* --- Sukhothai Ordination Elephant Parade (ขบวนแห่ช้างบวชนาค หาดเสี้ยว สุโขทัย 3D Chibi) --- */}
          {/* Main Adorned Chibi Elephant 1 */}
          <g transform="translate(140, 310) scale(1.05)">
            {/* Elephant Body */}
            <ellipse cx="75" cy="95" rx="48" ry="38" fill="url(#chibiElephantSkin)" stroke="#333" strokeWidth="2" />
            {/* Legs */}
            <rect x="42" y="105" width="16" height="35" rx="7" fill="url(#chibiElephantSkin)" stroke="#333" strokeWidth="1.5" />
            <rect x="62" y="110" width="16" height="32" rx="7" fill="url(#chibiElephantSkin)" stroke="#333" strokeWidth="1.5" />
            <rect x="85" y="105" width="16" height="35" rx="7" fill="url(#chibiElephantSkin)" stroke="#333" strokeWidth="1.5" />
            {/* Big Chibi Head */}
            <circle cx="35" cy="80" r="30" fill="url(#chibiElephantSkin)" stroke="#333" strokeWidth="2" />
            {/* Large Flapping Ear */}
            <ellipse cx="56" cy="76" rx="16" ry="24" fill="#a1a09d" stroke="#333" strokeWidth="1.5" />
            {/* Trunk curled up playfully */}
            <path
              d="M 22,92 C 10,95 2,82 6,70 C 10,60 20,62 16,74"
              fill="none"
              stroke="url(#chibiElephantSkin)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* White Tusks */}
            <path d="M 24,96 Q 16,105 12,98" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            {/* Cute Big Eye */}
            <circle cx="32" cy="74" r="5" fill="#1f1f1f" />
            <circle cx="30" cy="72" r="1.8" fill="#ffffff" />
            {/* Ceremonial Forehead Cloth (ผ้าปกกระพองช้าง ลายทองสุโขทัย) */}
            <path d="M 22,60 Q 35,52 48,60 L 45,70 Q 35,74 25,70 Z" fill="#ef4444" stroke="#facc15" strokeWidth="1.5" />
            <circle cx="35" cy="65" r="2.5" fill="#facc15" />

            {/* Colorful Saddle Blanket (ผ้าปูหลังช้างหลากสี) */}
            <rect x="52" y="66" width="46" height="38" rx="4" fill="#ec4899" stroke="#facc15" strokeWidth="2" />
            <rect x="56" y="70" width="38" height="30" rx="3" fill="#10b981" />
            <rect x="62" y="76" width="26" height="18" rx="2" fill="#facc15" />

            {/* Ceremonial Tiered Parasol (ร่มสัปทนแห่ช้างบวชนาค) */}
            <line x1="75" y1="65" x2="75" y2="10" stroke="#78350f" strokeWidth="3" />
            <path d="M 45,26 Q 75,0 105,26 Z" fill="url(#parasolGrad)" stroke="#fbbf24" strokeWidth="2" />
            <line x1="45" y1="26" x2="105" y2="26" stroke="#fbbf24" strokeWidth="2" />
            {/* Hanging Golden Tassels */}
            <circle cx="48" cy="30" r="2.5" fill="#facc15" />
            <circle cx="62" cy="30" r="2.5" fill="#facc15" />
            <circle cx="75" cy="30" r="2.5" fill="#facc15" />
            <circle cx="88" cy="30" r="2.5" fill="#facc15" />
            <circle cx="102" cy="30" r="2.5" fill="#facc15" />
          </g>

          {/* Baby Chibi Follower Elephant 2 in Parade */}
          <g transform="translate(45, 360) scale(0.78)">
            <ellipse cx="65" cy="90" rx="38" ry="30" fill="url(#chibiElephantSkin)" stroke="#333" strokeWidth="2" />
            <circle cx="35" cy="78" r="24" fill="url(#chibiElephantSkin)" stroke="#333" strokeWidth="2" />
            <ellipse cx="52" cy="74" rx="12" ry="18" fill="#a1a09d" stroke="#333" strokeWidth="1.5" />
            <path d="M 25,88 Q 15,95 18,102" fill="none" stroke="url(#chibiElephantSkin)" strokeWidth="8" strokeLinecap="round" />
            <circle cx="32" cy="72" r="4" fill="#1f1f1f" />
            <circle cx="30" cy="70" r="1.5" fill="#ffffff" />
            {/* Blanket & Little Parasol */}
            <rect x="46" y="68" width="34" height="26" rx="3" fill="#3b82f6" stroke="#facc15" strokeWidth="1.5" />
            <line x1="63" y1="68" x2="63" y2="22" stroke="#78350f" strokeWidth="2" />
            <path d="M 40,36 Q 63,18 86,36 Z" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
          </g>

          {/* --- Sangkhalok Porcelain Pot with Lid & Lotus Basin --- */}
          <g transform="translate(240, 430)">
            {/* Sangkhalok Covered Pot with Foliage & Lotus Motifs */}
            <ellipse cx="60" cy="70" rx="44" ry="36" fill="url(#sangkhalokPot)" stroke="#453324" strokeWidth="2.5" />
            {/* Painted Blue & Celadon Patterns */}
            <circle cx="60" cy="70" r="18" fill="none" stroke="#2b534b" strokeWidth="2.5" strokeDasharray="5,3" />
            <path d="M 50,70 Q 60,60 70,70 Q 60,80 50,70 Z" fill="#2b534b" />
            {/* Pot Lid with Lotus Knob */}
            <ellipse cx="60" cy="40" rx="36" ry="10" fill="#e8dcc4" stroke="#453324" strokeWidth="2" />
            <ellipse cx="60" cy="30" rx="8" ry="10" fill="#36655c" stroke="#453324" strokeWidth="1.5" />
          </g>

          {/* Stone Lotus Basin on Right Side */}
          <g transform="translate(180, 500)">
            <ellipse cx="90" cy="75" rx="85" ry="35" fill="#2d251e" stroke="#715d48" strokeWidth="3" />
            <ellipse cx="90" cy="72" rx="80" ry="30" fill="#15201d" />
            <ellipse cx="60" cy="72" rx="26" ry="12" fill="#2e5a44" stroke="#1c3b2c" strokeWidth="1.5" />
            <ellipse cx="120" cy="76" rx="30" ry="14" fill="#2e5a44" stroke="#1c3b2c" strokeWidth="1.5" />
            {/* Blooming Lotus */}
            <g transform="translate(85, 42)">
              <path d="M 15,30 C 5,20 2,10 15,0 C 28,10 25,20 15,30 Z" fill="url(#lotusPetal)" stroke="#db2777" strokeWidth="0.8" />
              <path d="M 8,30 C -2,22 -2,12 8,2 C 16,12 16,22 8,30 Z" fill="url(#lotusPetal)" />
              <path d="M 22,30 C 32,22 32,12 22,2 C 14,12 14,22 22,30 Z" fill="url(#lotusPetal)" />
              <circle cx="15" cy="18" r="4" fill="#facc15" />
            </g>
          </g>
        </svg>
      </div>

      {/* 6. TOP & SIDES: Authentic Sukhothai Tin Chok Woven Silk Drapes (ผ้าซิ่นตีนจก สุโขทัย) */}
      {/* Top Pelmet / Valance with Gold Diamond Woven Brocade */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]">
          <defs>
            {/* Rich Indigo Fabric with Red & Gold Warp */}
            <linearGradient id="tinchokSilk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0d141e" />
              <stop offset="35%" stopColor="#1a273a" />
              <stop offset="70%" stopColor="#3b1511" />
              <stop offset="100%" stopColor="#1a0b08" />
            </linearGradient>
            {/* Gold Tassel Gradient */}
            <linearGradient id="goldTassel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            {/* Geometric Tin Chok Brocade Pattern */}
            <pattern id="tinchokPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" />
              {/* Diamond motif (ลายนกกินน้ำร่วมต้น/ดอกจก) */}
              <polygon points="20,4 36,20 20,36 4,20" fill="none" stroke="#d4af37" strokeWidth="1.5" />
              <polygon points="20,10 30,20 20,30 10,20" fill="#781d18" stroke="#fde047" strokeWidth="1" />
              <circle cx="20" cy="20" r="3" fill="#fde047" />
              {/* Corner mini diamonds */}
              <circle cx="0" cy="0" r="2" fill="#d4af37" />
              <circle cx="40" cy="0" r="2" fill="#d4af37" />
              <circle cx="0" cy="40" r="2" fill="#d4af37" />
              <circle cx="40" cy="40" r="2" fill="#d4af37" />
            </pattern>
          </defs>

          {/* Valance Swag Drape Curves */}
          <path
            d="M 0,0 L 1440,0 L 1440,55 Q 1260,85 1080,55 Q 900,85 720,55 Q 540,85 360,55 Q 180,85 0,55 Z"
            fill="url(#tinchokSilk)"
          />

          {/* Woven Brocade Texture Band */}
          <path
            d="M 0,0 L 1440,0 L 1440,48 Q 1260,78 1080,48 Q 900,78 720,48 Q 540,78 360,48 Q 180,78 0,48 Z"
            fill="url(#tinchokPattern)"
            opacity="0.85"
          />

          {/* Gold Woven Border Trim & Fringes */}
          <path
            d="M 0,55 Q 180,85 360,55 Q 540,85 720,55 Q 900,85 1080,55 Q 1260,85 1440,55"
            fill="none"
            stroke="url(#goldTassel)"
            strokeWidth="4"
          />
        </svg>
      </div>

      {/* Left Stage Curtain (ผ้าม่านตีนจกทอโบราณด้านซ้าย) */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 md:w-36 pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 150 900" preserveAspectRatio="none" className="w-full h-full filter drop-shadow-[8px_0_20px_rgba(0,0,0,0.85)]">
          <path
            d="M 0,0 L 130,0 C 110,250 145,500 115,900 L 0,900 Z"
            fill="url(#tinchokSilk)"
          />
          {/* Vertical Folds */}
          <path
            d="M 35,0 C 25,300 45,600 30,900"
            fill="none"
            stroke="#070b10"
            strokeWidth="12"
            opacity="0.6"
          />
          <path
            d="M 80,0 C 65,300 95,600 75,900"
            fill="none"
            stroke="#070b10"
            strokeWidth="14"
            opacity="0.5"
          />
          {/* Tin Chok Border Stripe */}
          <path
            d="M 125,0 C 105,250 140,500 110,900"
            fill="none"
            stroke="url(#goldTassel)"
            strokeWidth="4"
          />
          {/* Subtle Geometric Pattern on Edge */}
          <rect x="70" y="0" width="40" height="900" fill="url(#tinchokPattern)" opacity="0.35" />
        </svg>
      </div>

      {/* Right Stage Curtain (ผ้าม่านตีนจกทอโบราณด้านขวา) */}
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 md:w-36 pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 150 900" preserveAspectRatio="none" className="w-full h-full filter drop-shadow-[-8px_0_20px_rgba(0,0,0,0.85)]">
          <path
            d="M 150,0 L 20,0 C 40,250 5,500 35,900 L 150,900 Z"
            fill="url(#tinchokSilk)"
          />
          {/* Vertical Folds */}
          <path
            d="M 115,0 C 125,300 105,600 120,900"
            fill="none"
            stroke="#070b10"
            strokeWidth="12"
            opacity="0.6"
          />
          <path
            d="M 70,0 C 85,300 55,600 75,900"
            fill="none"
            stroke="#070b10"
            strokeWidth="14"
            opacity="0.5"
          />
          {/* Tin Chok Border Stripe */}
          <path
            d="M 25,0 C 45,250 10,500 40,900"
            fill="none"
            stroke="url(#goldTassel)"
            strokeWidth="4"
          />
          {/* Subtle Geometric Pattern on Edge */}
          <rect x="40" y="0" width="40" height="900" fill="url(#tinchokPattern)" opacity="0.35" />
        </svg>
      </div>

      {/* 7. FOREGROUND ALTAR TABLE (โต๊ะหมู่บูชาไม้สักโบราณ พร้อมผ้าปูโต๊ะตีนจก) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 pointer-events-none z-5 overflow-hidden">
        {/* Table Top Surface Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#0e0805] via-[#22150c] to-[#362215] border-t-2 border-[#c5a059]/40 shadow-[0_-15px_30px_rgba(0,0,0,0.9)]" />

        {/* Woven Tin Chok Table Runner in Center */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-2xl h-24 sm:h-32 bg-gradient-to-t from-[#200b08] via-[#3d1612] to-[#5a2119] border-x-2 border-t-2 border-[#ffd54f]/50 opacity-90 shadow-2xl">
          {/* Diamond Brocade Pattern Overlay */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffd54f_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
          {/* Golden Center Seam */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#ffd54f] to-transparent" />
        </div>
      </div>

      {/* 8. Subtle Floating Sacred Golden Sparks (ประกายไฟ/ละอองทองศักดิ์สิทธิ์) */}
      {[
        { top: '22%', left: '20%', delay: 0 },
        { top: '35%', right: '22%', delay: 1.5 },
        { top: '48%', left: '15%', delay: 2.2 },
        { top: '60%', right: '18%', delay: 0.7 },
        { top: '75%', left: '28%', delay: 1.8 },
        { top: '70%', right: '30%', delay: 2.5 },
      ].map((star, i) => (
        <motion.div
          key={i}
          style={{ top: star.top, left: star.left, right: star.right }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: star.delay,
            ease: 'easeInOut',
          }}
          className="absolute w-2 h-2 rounded-full bg-[#fde047] shadow-[0_0_10px_#fde047]"
        />
      ))}
    </div>
  );
};
