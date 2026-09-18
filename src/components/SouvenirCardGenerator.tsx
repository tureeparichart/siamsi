import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import { Fortune, ThemeMode } from '../types';
import { soundFx } from '../utils/audio';
import { NameForm } from './NameForm';
import { SouvenirCardPreview } from './SouvenirCardPreview';
import { PrintMode } from './PrintOptions';
import { SouvenirPrintLayout } from './SouvenirPrintLayout';
import { PrintModal } from './PrintModal';
import { ThaiCornerOrnament, SukhothaiLotus } from './SukhothaiMotifs';
import {
  Printer,
  Camera,
  RotateCcw,
  ArrowLeft,
  Share2,
  Check,
  BookOpen,
} from 'lucide-react';

interface SouvenirCardGeneratorProps {
  fortune: Fortune;
  onDrawAgain: () => void;
  onBackToResult: () => void;
  onBackToStory?: () => void;
  onBrowseAll: () => void;
  themeMode?: ThemeMode;
  cardBgImage?: string | null;
  onSavePermanentCardBg?: (dataUrl: string) => void;
}

// Cached CSS to embed fonts without triggering cross-origin stylesheet reading errors
let cachedFontEmbedCSS: string | null = null;

async function getCardFontEmbedCSS(): Promise<string> {
  if (cachedFontEmbedCSS !== null) return cachedFontEmbedCSS;
  try {
    const res = await fetch('/fonts/PhoKhunRam.ttf');
    if (!res.ok) throw new Error('Failed to fetch font');
    const blob = await res.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    cachedFontEmbedCSS = `
      @font-face {
        font-family: 'PhoKhunRam';
        src: url('${base64}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    return cachedFontEmbedCSS;
  } catch (e) {
    console.warn('Could not load base64 font for export:', e);
    cachedFontEmbedCSS = ' ';
    return cachedFontEmbedCSS;
  }
}

export const SouvenirCardGenerator: React.FC<SouvenirCardGeneratorProps> = ({
  fortune,
  onDrawAgain,
  onBackToResult,
  onBackToStory,
  onBrowseAll,
  themeMode = 'chibi3d',
  cardBgImage,
  onSavePermanentCardBg,
}) => {
  // Required states as specified in Section 14
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showSouvenir, setShowSouvenir] = useState(false);
  const [printMode, setPrintMode] = useState<PrintMode>('single');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Export and share states
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Ref for the DOM card preview to convert to PNG
  const cardPreviewRef = useRef<HTMLDivElement>(null);

  // Combined full name
  const fullName = `${firstName} ${lastName}`.trim();

  // Triggered when clicking "✨ สร้างการ์ดที่ระลึก" in NameForm
  const handleGenerateCard = () => {
    setShowSouvenir(true);
    soundFx.playBellChime();

    // Smooth scroll down to preview on mobile devices
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const previewEl = document.getElementById('card-preview-container');
        previewEl?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Section 8: Print handler opening rich PrintModal with direct print, new-tab print, and image export options
  const handlePrint = () => {
    soundFx.playBellChime();
    setIsPrintModalOpen(true);
  };

  // Section 10: Save card as high-definition PNG image
  const handleSaveImage = async () => {
    if (!cardPreviewRef.current) return;

    try {
      setIsSavingImage(true);
      soundFx.playBellChime();

      // Pre-fetch embedded font CSS so html-to-image never needs to inspect remote cross-origin stylesheets
      const fontEmbedCSS = await getCardFontEmbedCSS();

      // High quality pixel ratio for crisp typography and ornaments
      const dataUrl = await toPng(cardPreviewRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#fdfaf2',
        fontEmbedCSS: fontEmbedCSS || ' ',
        skipFonts: true,
      });

      // Sanitize user name for filename: Sukhothai-Fortune-01-ชื่อผู้ใช้.png
      const sanitizedName = fullName
        ? fullName.replace(/[^a-zA-Z0-9ก-๙_-]/g, '_').substring(0, 30)
        : 'ผู้เข้าชม';
      const fileName = `Sukhothai-Fortune-${fortune.numberStr}-${sanitizedName}.png`;

      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to export card image:', err);
    } finally {
      setIsSavingImage(false);
    }
  };

  // Quick text share
  const handleShare = async () => {
    const textToShare = `🎋 เซียมซีสุโขทัย หมายเลข ${fortune.numberStr} : ${fortune.name}\nการ์ดแห่งความทรงจำของ: ${fullName || 'ผู้เข้าชมนิทรรศการ'}\n✨ “${fortune.blessing}”\n“ดวงของคุณไม่ได้บอกอนาคต แต่พาคุณย้อนกลับไปค้นพบเรื่องราวจากอดีต”\nอ่านจากร่องรอย เรียนรู้จากหลักฐาน : เปิดโลกประวัติศาสตร์สุโขทัย`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'เซียมซีสุโขทัย | การ์ดที่ระลึกส่วนบุคคล',
          text: textToShare,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(textToShare);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4">
      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between mb-6 no-print">
        <button
          onClick={onBackToResult}
          className="inline-flex items-center gap-2 text-sm text-[#d4af37] hover:text-[#f7e0a3] transition-colors cursor-pointer bg-[#241710] px-3.5 py-1.5 rounded-lg border border-[#3e2c1e]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้าผลเซียมซี</span>
        </button>

        <button
          onClick={onBrowseAll}
          className="text-xs text-[#baa592] hover:text-[#f7e0a3] cursor-pointer"
        >
          ดูเซียมซีทั้ง 20 ใบ
        </button>
      </div>

      {/* Main Container */}
      <div className="relative bg-gradient-to-b from-[#241710] via-[#1c120c] to-[#140b07] rounded-3xl border-2 border-[#c5a059]/40 p-5 sm:p-8 md:p-10 shadow-2xl space-y-8 no-print">
        <ThaiCornerOrnament position="tl" className="absolute top-3 left-3 w-8 h-8 text-[#c5a059]" />
        <ThaiCornerOrnament position="tr" className="absolute top-3 right-3 w-8 h-8 text-[#c5a059]" />

        {/* Banner Section with น้องสุโขทัย แทรกอยู่ด้านข้าง */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#3e2c1e] pb-6">
          <div className="text-center md:text-left space-y-2 flex-1">
            <h2 className="font-thai-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-gold-gradient leading-normal py-1">
              🎁 การ์ดที่ระลึกสุโขทัยของฉัน
            </h2>

            <p className="text-xs sm:text-sm text-[#d8c5b0] max-w-xl">
              สร้างการ์ดที่มีชื่อของคุณด้วยฟอนต์ลายสือไท (PhoKhunRam) พิมพ์เก็บเป็นที่ระลึก หรือบันทึกภาพเก็บไว้ในสมาร์ตโฟน
            </p>
          </div>
        </header>

        {/* Split Grid: Left = Name Form, Right = Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form (5 Cols on large screens) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Step 1: Input Name */}
            <NameForm
              firstName={firstName}
              lastName={lastName}
              onChangeFirstName={setFirstName}
              onChangeLastName={setLastName}
              onSubmit={handleGenerateCard}
            />
          </div>

          {/* Right Column: Real-time Live Preview & Actions (7 Cols on large screens) */}
          <div id="card-preview-container" className="lg:col-span-7 space-y-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-semibold text-[#e8d5bf] flex items-center gap-1.5">
                <SukhothaiLotus className="w-4 h-4 text-[#d4af37]" />
                <span>ตัวอย่างการ์ดจริง (Live Preview):</span>
              </span>
              {fullName && (
                <span className="text-[11px] text-[#81c784] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> อัปเดตตามชื่อทันที
                </span>
              )}
            </div>

            {/* Card Live Preview Container */}
            <div className="w-full p-2 sm:p-4 rounded-2xl bg-[#18110b] border border-[#3b281b] flex items-center justify-center">
              <SouvenirCardPreview
                fortune={fortune}
                fullName={fullName}
                previewRef={cardPreviewRef}
                cardBgImage={cardBgImage}
                onSavePermanentCardBg={onSavePermanentCardBg}
              />
            </div>

            {/* Primary Action Buttons: Print & Save Image */}
            <div className="w-full space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Print Button (Section 8) */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full py-3.5 px-5 rounded-xl font-thai-serif text-base font-bold text-[#1a0f08] bg-gradient-to-r from-[#e7cb76] via-[#f7e4a8] to-[#cba34f] hover:brightness-110 active:scale-[0.98] transition-all shadow-xl gold-glow flex items-center justify-center gap-2 cursor-pointer border border-[#fff0ba]"
                >
                  <Printer className="w-5 h-5 text-[#6c4815]" />
                  <span>🖨️ พิมพ์การ์ดที่ระลึก</span>
                </button>

                {/* Save as PNG Image (Section 10) */}
                <button
                  type="button"
                  onClick={handleSaveImage}
                  disabled={isSavingImage}
                  className="w-full py-3.5 px-5 rounded-xl font-thai-serif text-base font-bold text-[#f7e0a3] bg-[#2d1e15] hover:bg-[#3d2b1e] border border-[#c5a059]/60 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-5 h-5 text-[#81c784]" />
                      <span>บันทึกสำเร็จแล้ว!</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 text-[#d4af37]" />
                      <span>{isSavingImage ? 'กำลังสร้างภาพ...' : '📸 บันทึกเป็นรูปภาพ'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary actions: Share & Draw Again */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#352518]">
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-xs sm:text-sm text-[#baa592] hover:text-[#f7e0a3] flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg hover:bg-[#251911]"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-[#81c784]" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'คัดลอกข้อความแล้ว!' : 'แชร์ข้อความมงคล'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {onBackToStory && (
                    <button
                      type="button"
                      onClick={onBackToStory}
                      className="text-xs sm:text-sm text-[#baa592] hover:text-[#f7e0a3] flex items-center gap-1 cursor-pointer py-1.5 px-2.5 rounded-lg hover:bg-[#251911]"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>อ่านเรื่องเล่า</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onDrawAgain}
                    className="text-xs sm:text-sm text-[#e8d5bf] hover:text-[#f7e0a3] flex items-center gap-1.5 font-medium transition-colors cursor-pointer py-1.5 px-3 rounded-lg bg-[#271a12] border border-[#3e2a1d] hover:border-[#c5a059]/40"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>🎋 เสี่ยงเซียมซีใบใหม่</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Hidden Layout for Clean Physical Printing (Active only in window.print()) */}
      <SouvenirPrintLayout
        fortune={fortune}
        fullName={fullName}
        printMode={printMode}
        cardBgImage={cardBgImage}
      />

      {/* Interactive Print Options & Actions Modal */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        printMode={printMode}
        onChangePrintMode={setPrintMode}
        onSaveImage={handleSaveImage}
        isSavingImage={isSavingImage}
        fullName={fullName}
        fortuneNumber={fortune.numberStr}
        cardElementRef={cardPreviewRef}
      />
    </div>
  );
};
