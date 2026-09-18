import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export type ChibiPose = 'waving' | 'shaking' | 'reading' | 'detective' | 'cheering';

interface ChibiMascotProps {
  pose?: ChibiPose;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechText?: string;
  showSpeech?: boolean;
  bubblePosition?: 'top' | 'left' | 'right';
  className?: string;
  onClick?: () => void;
}

export const ChibiMascotSukhothai: React.FC<ChibiMascotProps> = ({
  pose = 'waving',
  size = 'md',
  speechText,
  showSpeech = true,
  bubblePosition = 'top',
  className = '',
  onClick,
}) => {
  const [clickedHeart, setClickedHeart] = useState(false);
  const [interactiveDialogue, setInteractiveDialogue] = useState<string | null>(null);

  const sizePixels = {
    sm: 90,
    md: 140,
    lg: 190,
    xl: 240,
  }[size];

  const handleClick = () => {
    setClickedHeart(true);
    setTimeout(() => setClickedHeart(false), 1200);

    const funQuotes = [
      'ยินดีต้อนรับสู่นครสุโขทัย 700 ปีนะจ๊ะ!',
      'รู้ไหมว่า ศิลาจารึกหลักที่ 1 เป็นมรดกความทรงจำโลกด้วยนะ!',
      'เครื่องสังคโลกส่งออกไปไกลถึงญี่ปุ่นและฟิลิปปินส์เลยนะ!',
      'สุโขทัยแปลว่า รุ่งอรุณแห่งความสุข จ้า!',
      'ขอให้ได้ใบเซียมซีและเรื่องราวที่เป็นสิริมงคลนะ!',
    ];
    const randomQuote = funQuotes[Math.floor(Math.random() * funQuotes.length)];
    setInteractiveDialogue(randomQuote);
    setTimeout(() => setInteractiveDialogue(null), 3800);

    if (onClick) onClick();
  };

  const currentSpeech = interactiveDialogue || speechText;

  const isSideLeft = bubblePosition === 'left';
  const isSideRight = bubblePosition === 'right';

  return (
    <div
      className={`relative inline-flex ${
        isSideLeft
          ? 'flex-col md:flex-row-reverse items-center gap-3'
          : isSideRight
          ? 'flex-col md:flex-row items-center gap-3'
          : 'flex-col items-center'
      } select-none ${className}`}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeech && currentSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ type: 'spring', damping: 14, stiffness: 200 }}
            className="mb-2 md:mb-0 max-w-[260px] sm:max-w-[320px] px-3.5 py-2.5 rounded-2xl bg-gradient-to-b from-[#fffaf0] to-[#f7eed9] text-[#331c0e] border-2 border-[#e5a83b] shadow-[0_6px_18px_rgba(0,0,0,0.35)] relative text-center z-30"
          >
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#e5a83b] animate-ping" />
              <span className="text-[10px] font-bold text-[#b36b00] tracking-wider uppercase">
                น้องสุโขทัย (3D Chibi)
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#2e180d] leading-snug">
              {currentSpeech}
            </p>
            {/* Bubble Tail */}
            {isSideLeft ? (
              <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#f7eed9] border-t-2 border-r-2 border-[#e5a83b] rotate-45" />
            ) : isSideRight ? (
              <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#f7eed9] border-b-2 border-l-2 border-[#e5a83b] rotate-45" />
            ) : (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#f7eed9] border-r-2 border-b-2 border-[#e5a83b] rotate-45" />
            )}
            {(isSideLeft || isSideRight) && (
              <div className="md:hidden absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#f7eed9] border-r-2 border-b-2 border-[#e5a83b] rotate-45" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Chibi Character Mascot Container */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.06, rotate: [-1, 1, -1] }}
        whileTap={{ scale: 0.95 }}
        animate={
          pose === 'shaking'
            ? { y: [0, -8, 2, -6, 0], rotate: [-4, 4, -3, 3, 0] }
            : pose === 'cheering'
            ? { y: [0, -10, 0], scale: [1, 1.04, 1] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: pose === 'shaking' ? 0.35 : 2.4,
          ease: 'easeInOut',
        }}
        className="relative cursor-pointer group"
        style={{ width: sizePixels, height: sizePixels * 1.15 }}
      >
        {/* Soft 3D Volumetric Shadow below feet */}
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#120a06]/60 rounded-full blur-[3px] transition-all duration-300 pointer-events-none"
          style={{ width: sizePixels * 0.65, height: sizePixels * 0.16 }}
        />

        {/* Click Heart Explosion */}
        <AnimatePresence>
          {clickedHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 1, y: 0 }}
              animate={{ scale: 1.5, opacity: 0, y: -40 }}
              exit={{ opacity: 0 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none z-50 text-rose-500 flex items-center gap-1"
            >
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500 drop-shadow-lg" />
              <Sparkles className="w-4 h-4 text-amber-300" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Chibi Vector Mascot Illustration */}
        <svg
          viewBox="0 0 200 230"
          className="w-full h-full filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)] overflow-visible"
        >
          <defs>
            {/* 3D Skin Gradients with warm subsurface scattering */}
            <radialGradient id="chibiSkin" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fff2e4" />
              <stop offset="60%" stopColor="#ffd8bd" />
              <stop offset="100%" stopColor="#f7bc99" />
            </radialGradient>
            <radialGradient id="chibiCheek" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff7b88" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ff9eaa" stopOpacity="0" />
            </radialGradient>

            {/* 3D Gold Ornaments Gradients */}
            <linearGradient id="chibiGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff3b0" />
              <stop offset="35%" stopColor="#ffd24d" />
              <stop offset="70%" stopColor="#d89617" />
              <stop offset="100%" stopColor="#8c5806" />
            </linearGradient>
            <radialGradient id="chibiRuby" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff7b88" />
              <stop offset="50%" stopColor="#d91b3b" />
              <stop offset="100%" stopColor="#660011" />
            </radialGradient>

            {/* Traditional Royal Attire Gradients */}
            <linearGradient id="chibiSabai" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe680" />
              <stop offset="50%" stopColor="#e5a825" />
              <stop offset="100%" stopColor="#996a0a" />
            </linearGradient>
            <linearGradient id="chibiPants" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9e2a2b" />
              <stop offset="50%" stopColor="#67161b" />
              <stop offset="100%" stopColor="#400b0f" />
            </linearGradient>

            {/* Eyes 3D Gloss */}
            <radialGradient id="chibiEye" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#4a2810" />
              <stop offset="60%" stopColor="#251206" />
              <stop offset="100%" stopColor="#0a0502" />
            </radialGradient>
          </defs>

          {/* 3D Cute Ears */}
          <circle cx="56" cy="116" r="14" fill="url(#chibiSkin)" stroke="#e8a882" strokeWidth="1" />
          <circle cx="56" cy="116" r="8" fill="#f7baa0" opacity="0.6" />
          <circle cx="144" cy="116" r="14" fill="url(#chibiSkin)" stroke="#e8a882" strokeWidth="1" />
          <circle cx="144" cy="116" r="8" fill="#f7baa0" opacity="0.6" />

          {/* Gold Sukhothai Ear Pendants (กุณฑล) */}
          <circle cx="56" cy="128" r="4.5" fill="url(#chibiGold)" />
          <circle cx="144" cy="128" r="4.5" fill="url(#chibiGold)" />

          {/* Cute Body & Traditional Attire */}
          <g id="body">
            {/* Legs & Cute Feet */}
            <ellipse cx="84" cy="202" rx="11" ry="8" fill="url(#chibiSkin)" />
            <ellipse cx="116" cy="202" rx="11" ry="8" fill="url(#chibiSkin)" />
            {/* Golden Anklets */}
            <ellipse cx="84" cy="198" rx="8" ry="3" fill="url(#chibiGold)" />
            <ellipse cx="116" cy="198" rx="8" ry="3" fill="url(#chibiGold)" />

            {/* Jongkrabaen Pants (Puffy 3D) */}
            <path
              d="M72,165 Q100,168 128,165 Q138,190 120,196 Q100,199 100,188 Q100,199 80,196 Q62,190 72,165 Z"
              fill="url(#chibiPants)"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
            />
            {/* Gold Trim along Jongkrabaen */}
            <path
              d="M74,166 Q100,170 126,166"
              stroke="url(#chibiGold)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Torso & Golden Sabai (สไบทองเฉียงไหล่แบบสุโขทัย) */}
            <path
              d="M76,145 Q100,148 124,145 L128,168 Q100,172 72,168 Z"
              fill="url(#chibiSkin)"
            />
            {/* Golden Sabai Drape */}
            <path
              d="M76,145 L126,168 L114,171 L68,148 Z"
              fill="url(#chibiSabai)"
            />
            {/* Royal Golden Necklace (ทับทรวงจิ๋ว 3D) */}
            <circle cx="100" cy="153" r="5" fill="url(#chibiGold)" />
            <circle cx="100" cy="153" r="2" fill="url(#chibiRuby)" />
          </g>

          {/* Large 3D Chibi Head (Cute Chubby Proportions) */}
          <ellipse
            cx="100"
            cy="112"
            rx="46"
            ry="42"
            fill="url(#chibiSkin)"
            stroke="#f5b693"
            strokeWidth="1.2"
          />

          {/* Chubby Cheeks Blush */}
          <ellipse cx="73" cy="122" rx="9" ry="6" fill="url(#chibiCheek)" />
          <ellipse cx="127" cy="122" rx="9" ry="6" fill="url(#chibiCheek)" />

          {/* Big Sparkling Anime/Chibi Eyes */}
          <g id="eyes">
            {/* Left Eye */}
            <ellipse cx="79" cy="110" rx="9" ry="12" fill="url(#chibiEye)" />
            {/* Specular Highlights for sparkling eyes */}
            <ellipse cx="76" cy="106" rx="4" ry="5.5" fill="#ffffff" />
            <circle cx="83" cy="115" r="2.2" fill="#ffffff" />
            <ellipse cx="79" cy="116" rx="4" ry="2" fill="#ffb088" opacity="0.4" />

            {/* Right Eye */}
            <ellipse cx="121" cy="110" rx="9" ry="12" fill="url(#chibiEye)" />
            <ellipse cx="118" cy="106" rx="4" ry="5.5" fill="#ffffff" />
            <circle cx="125" cy="115" r="2.2" fill="#ffffff" />
            <ellipse cx="121" cy="116" rx="4" ry="2" fill="#ffb088" opacity="0.4" />

            {/* Cute Eyebrows */}
            <path d="M72,98 Q79,93 87,97" stroke="#683816" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M113,97 Q121,93 128,98" stroke="#683816" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>

          {/* Cute Tiny Nose */}
          <ellipse cx="100" cy="116" rx="1.5" ry="1" fill="#df8e66" />

          {/* Happy Smiling Mouth */}
          <path
            d="M93,124 Q100,132 107,124"
            stroke="#942a2a"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#d94b4b"
          />

          {/* 3D Sukhothai Royal Chada Crown (เกี้ยวทองสุโขทัยยอดแหลม) */}
          <g id="crown">
            {/* Hair Base */}
            <path
              d="M58,100 Q100,68 142,100 Q135,84 100,80 Q65,84 58,100 Z"
              fill="#26150b"
            />
            {/* Golden Tiara Rim */}
            <path
              d="M66,86 Q100,75 134,86 Q100,80 66,86 Z"
              fill="url(#chibiGold)"
              stroke="#996a0a"
              strokeWidth="1"
            />
            {/* Tiered Lotus Spire (เกี้ยวทอง 3 มิติ) */}
            <path
              d="M84,81 L100,42 L116,81 Q100,76 84,81 Z"
              fill="url(#chibiGold)"
              stroke="#996a0a"
              strokeWidth="1"
            />
            {/* Spire Tip */}
            <path
              d="M95,43 L100,18 L105,43 Z"
              fill="url(#chibiGold)"
              stroke="#ffd84d"
              strokeWidth="0.8"
            />
            {/* Center Sparkling Ruby Gemstone */}
            <circle cx="100" cy="74" r="4.5" fill="url(#chibiRuby)" stroke="#ffd84d" strokeWidth="1.2" />
            <circle cx="100" cy="56" r="3" fill="url(#chibiGold)" />
            {/* Sparkle glint on crown */}
            <path d="M100,18 L102,23 L100,28 L98,23 Z" fill="#ffffff" />
          </g>

          {/* Dynamic Arms & Hands Based on Pose */}
          <g id="arms">
            {pose === 'shaking' ? (
              <>
                {/* Cheering / Shaking hands holding mini bamboo fortune tube */}
                <ellipse cx="64" cy="154" rx="8" ry="11" fill="url(#chibiSkin)" transform="rotate(-25 64 154)" />
                <ellipse cx="136" cy="154" rx="8" ry="11" fill="url(#chibiSkin)" transform="rotate(25 136 154)" />
                {/* Mini 3D Siam Si Shaker in hand */}
                <g transform="translate(132, 134) rotate(15)">
                  <rect x="0" y="0" width="16" height="32" rx="4" fill="#a84323" stroke="#fbd366" strokeWidth="1.5" />
                  <line x1="2" y1="8" x2="14" y2="8" stroke="#fbd366" strokeWidth="1" />
                  {/* Fortune sticks popping out */}
                  <rect x="4" y="-12" width="2" height="14" fill="#f7df94" />
                  <rect x="7" y="-18" width="2.5" height="20" fill="#e63946" />
                  <rect x="11" y="-10" width="2" height="12" fill="#f7df94" />
                </g>
              </>
            ) : pose === 'reading' ? (
              <>
                {/* Holding Mini 3D Inscription Stone Tablet */}
                <ellipse cx="76" cy="162" rx="7" ry="9" fill="url(#chibiSkin)" />
                <ellipse cx="124" cy="162" rx="7" ry="9" fill="url(#chibiSkin)" />
                {/* Mini Ancient Stone */}
                <g transform="translate(85, 148)">
                  <path d="M0,8 Q15,0 30,8 L28,32 L2,32 Z" fill="#4d443c" stroke="#d4af37" strokeWidth="1" />
                  {/* Glowing Ancient Lines */}
                  <line x1="6" y1="12" x2="24" y2="12" stroke="#ffd966" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="6" y1="18" x2="24" y2="18" stroke="#ffd966" strokeWidth="1" strokeDasharray="3,1" />
                  <line x1="6" y1="24" x2="20" y2="24" stroke="#ffd966" strokeWidth="1" strokeDasharray="2,2" />
                </g>
              </>
            ) : pose === 'detective' ? (
              <>
                {/* Left hand on hip */}
                <ellipse cx="64" cy="162" rx="7" ry="10" fill="url(#chibiSkin)" />
                {/* Right hand holding 3D Golden Magnifying Glass */}
                <g transform="translate(124, 136)">
                  <ellipse cx="10" cy="10" rx="14" ry="14" fill="none" stroke="url(#chibiGold)" strokeWidth="3.5" />
                  <circle cx="10" cy="10" r="12" fill="#78d5ff" opacity="0.35" />
                  {/* Glass Reflection Glint */}
                  <path d="M5,5 Q10,2 15,5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  {/* Handle */}
                  <line x1="20" y1="20" x2="30" y2="30" stroke="url(#chibiGold)" strokeWidth="4" strokeLinecap="round" />
                </g>
              </>
            ) : pose === 'cheering' ? (
              <>
                {/* Both hands raised in celebration */}
                <ellipse cx="52" cy="132" rx="7" ry="12" fill="url(#chibiSkin)" transform="rotate(-35 52 132)" />
                <ellipse cx="148" cy="132" rx="7" ry="12" fill="url(#chibiSkin)" transform="rotate(35 148 132)" />
                {/* Golden Bangles */}
                <ellipse cx="52" cy="135" rx="5" ry="2" fill="url(#chibiGold)" />
                <ellipse cx="148" cy="135" rx="5" ry="2" fill="url(#chibiGold)" />
              </>
            ) : (
              /* 'waving' (Default) */
              <>
                {/* Left Hand holding glowing golden lotus blossom */}
                <ellipse cx="62" cy="162" rx="7" ry="9" fill="url(#chibiSkin)" />
                <g transform="translate(48, 150) scale(0.7)">
                  <path d="M12,0 Q18,10 12,20 Q6,10 12,0 Z" fill="#ffd166" />
                  <path d="M4,8 Q12,12 12,20 Q0,16 4,8 Z" fill="#f48fb1" />
                  <path d="M20,8 Q12,12 12,20 Q24,16 20,8 Z" fill="#f48fb1" />
                </g>

                {/* Right Hand Waving high */}
                <motion.g
                  animate={{ rotate: [-8, 18, -8] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  style={{ transformOrigin: '136px 150px' }}
                >
                  <ellipse cx="142" cy="136" rx="8" ry="12" fill="url(#chibiSkin)" transform="rotate(35 142 136)" />
                  <ellipse cx="140" cy="142" rx="6" ry="2.5" fill="url(#chibiGold)" />
                </motion.g>
              </>
            )}
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------
   Companion 2: "น้องศิลาจิ๋ว" (Chibi 3D Stone Inscription Mascot)
------------------------------------------------------------- */
export const ChibiSilaTablet: React.FC<{ size?: number; className?: string }> = ({
  size = 75,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{ width: size, height: size * 1.15 }}
      title="น้องศิลาจิ๋ว: จารึกหลักที่ 1 แห่งสุโขทัย"
    >
      <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-md">
        <defs>
          <linearGradient id="silaBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6e6255" />
            <stop offset="50%" stopColor="#4f453a" />
            <stop offset="100%" stopColor="#302821" />
          </linearGradient>
        </defs>

        {/* Stone Tablet Shape */}
        <path
          d="M20,105 L80,105 L85,45 Q50,15 15,45 Z"
          fill="url(#silaBody)"
          stroke="#c5a059"
          strokeWidth="2.5"
        />

        {/* Tiny Golden Crown on Tablet */}
        <polygon points="45,28 50,16 55,28" fill="#ffd24d" stroke="#b38600" strokeWidth="1" />

        {/* Cute Blinking Big Eyes */}
        <ellipse cx="38" cy="56" rx="6" ry="8" fill="#1b120c" />
        <ellipse cx="36" cy="54" rx="2.5" ry="3.5" fill="#ffffff" />
        <ellipse cx="62" cy="56" rx="6" ry="8" fill="#1b120c" />
        <ellipse cx="60" cy="54" rx="2.5" ry="3.5" fill="#ffffff" />

        {/* Rosy Cheeks */}
        <circle cx="30" cy="65" r="4" fill="#ff7b88" opacity="0.7" />
        <circle cx="70" cy="65" r="4" fill="#ff7b88" opacity="0.7" />

        {/* Smile */}
        <path d="M44,66 Q50,72 56,66" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Glowing Ancient Sukhothai Script Letters */}
        <g stroke="#ffd24d" strokeWidth="1.5" strokeLinecap="round" opacity="0.9">
          <line x1="28" y1="80" x2="72" y2="80" strokeDasharray="3,2" />
          <line x1="26" y1="88" x2="74" y2="88" strokeDasharray="4,2" />
          <line x1="30" y1="96" x2="70" y2="96" strokeDasharray="2,3" />
        </g>

        {/* Cute Tiny Legs */}
        <ellipse cx="36" cy="110" rx="6" ry="4" fill="#302821" stroke="#c5a059" strokeWidth="1" />
        <ellipse cx="64" cy="110" rx="6" ry="4" fill="#302821" stroke="#c5a059" strokeWidth="1" />
      </svg>
    </motion.div>
  );
};

/* -------------------------------------------------------------
   Companion 3: "น้องปลาสังคโลก 3D" (Sangkhalok Celadon Fish)
------------------------------------------------------------- */
export const ChibiSangkhalokFish: React.FC<{ size?: number; className?: string }> = ({
  size = 70,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [-5, 5, -5] }}
      animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{ width: size, height: size * 0.8 }}
      title="น้องปลาสังคโลก: จานปลาอันเลื่องชื่อแห่งสุโขทัย"
    >
      <svg viewBox="0 0 110 80" className="w-full h-full filter drop-shadow-md">
        <defs>
          <radialGradient id="celadonFish" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#a8e6cf" />
            <stop offset="50%" stopColor="#4db6ac" />
            <stop offset="100%" stopColor="#00695c" />
          </radialGradient>
        </defs>

        {/* Fish Body */}
        <path
          d="M85,40 Q60,15 25,25 Q5,40 25,55 Q60,65 85,40 Z"
          fill="url(#celadonFish)"
          stroke="#004d40"
          strokeWidth="2"
        />

        {/* Wavy Tail */}
        <path
          d="M82,40 Q98,15 105,25 Q95,40 105,55 Q98,65 82,40 Z"
          fill="#4db6ac"
          stroke="#004d40"
          strokeWidth="1.8"
        />

        {/* Cute Big Eye */}
        <circle cx="28" cy="35" r="7" fill="#ffffff" stroke="#004d40" strokeWidth="1.5" />
        <circle cx="27" cy="35" r="4.5" fill="#004d40" />
        <circle cx="25" cy="33" r="1.8" fill="#ffffff" />

        {/* Ceramic Underglaze Swirl Pattern (ลายปลากาในจานสังคโลก) */}
        <path
          d="M45,30 Q55,40 45,50"
          stroke="#004d40"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M55,28 Q65,40 55,52"
          stroke="#004d40"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Fish Fin */}
        <path d="M42,50 Q48,65 38,62 Z" fill="#80cbc4" stroke="#004d40" strokeWidth="1.5" />

        {/* Cute Water Bubble */}
        <circle cx="12" cy="22" r="3" fill="#e0f7fa" opacity="0.8" stroke="#80deea" strokeWidth="1" />
      </svg>
    </motion.div>
  );
};

/* -------------------------------------------------------------
   Companion 4: Miniature 3D Sukhothai Lotus Stupa (เจดีย์ดอกบัวตูม)
------------------------------------------------------------- */
export const ChibiMiniPagoda3D: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none opacity-80 ${className}`}
      style={{ width: size, height: size * 1.3 }}
    >
      <svg viewBox="0 0 100 130" className="w-full h-full filter drop-shadow-lg">
        <defs>
          <linearGradient id="pagodaBrick" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8d4a30" />
            <stop offset="50%" stopColor="#c76d47" />
            <stop offset="100%" stopColor="#5d2f1d" />
          </linearGradient>
        </defs>

        {/* Base Platform */}
        <rect x="15" y="105" width="70" height="18" rx="4" fill="url(#pagodaBrick)" stroke="#d4af37" strokeWidth="1.5" />
        <rect x="25" y="85" width="50" height="20" rx="3" fill="url(#pagodaBrick)" stroke="#d4af37" strokeWidth="1.5" />

        {/* Lotus Bud Spire (ทรงพุ่มข้าวบิณฑ์ 3D) */}
        <path
          d="M32,85 Q50,45 50,20 Q50,45 68,85 Z"
          fill="url(#pagodaBrick)"
          stroke="#ffd24d"
          strokeWidth="2"
        />

        {/* Golden Pinnacle Tip */}
        <polygon points="46,20 50,6 54,20" fill="#ffd24d" stroke="#b38600" strokeWidth="1" />
        <circle cx="50" cy="6" r="3.5" fill="#fff3b0" />

        {/* Warm Golden Lamp inside niche */}
        <circle cx="50" cy="95" r="4.5" fill="#ffe082" />
      </svg>
    </div>
  );
};
