import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Printer,
  ExternalLink,
  Download,
  X,
  Check,
  CreditCard,
  Grid,
  Info,
  FileText,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { PrintMode } from './PrintOptions';
import { triggerDirectPrint, isRunningInIframe } from '../utils/printHelper';
import { downloadPrintablePDF } from '../utils/pdfHelper';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  printMode: PrintMode;
  onChangePrintMode: (mode: PrintMode) => void;
  onSaveImage: () => void;
  isSavingImage: boolean;
  fullName: string;
  fortuneNumber: string;
  cardElementRef: React.RefObject<HTMLDivElement | null>;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  printMode,
  onChangePrintMode,
  onSaveImage,
  isSavingImage,
  fullName,
  fortuneNumber,
  cardElementRef,
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [iframeWarning, setIframeWarning] = useState(false);

  if (!isOpen) return null;

  const inIframe = isRunningInIframe();

  // Primary Reliable Solution: Export high-precision PDF file for instant printing
  const handleDownloadPDF = async () => {
    if (!cardElementRef.current) return;
    try {
      setIsGeneratingPDF(true);
      await downloadPrintablePDF(
        cardElementRef.current,
        printMode,
        fortuneNumber,
        fullName
      );
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to generate printable PDF:', err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Direct browser print handler
  const handleDirectPrint = () => {
    if (inIframe) {
      setIframeWarning(true);
    }
    triggerDirectPrint(printMode);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto no-print">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-[#251710] to-[#180f0a] border-2 border-[#c5a059]/70 rounded-2xl shadow-2xl p-6 text-[#f5ecd8] space-y-5 my-8"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#352115] hover:bg-[#4a2e1d] border border-[#c5a059]/40 text-[#baa592] hover:text-[#fff] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[#3e2a1d] pb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e7cb76] to-[#cba34f] text-[#1c1008] flex items-center justify-center shadow-md shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-thai-serif text-xl font-bold text-gold-gradient">
                🖨️ สั่งพิมพ์การ์ดที่ระลึกสุโขทัย
              </h3>
              <p className="text-xs text-[#d8c5b0] mt-0.5">
                เลือกขนาดและช่องทางการพิมพ์ที่ต้องการ
              </p>
            </div>
          </div>

          {/* Step 1: Choose Layout */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#f7e0a3] flex items-center justify-between">
              <span>1. เลือกรูปแบบการพิมพ์:</span>
              <span className="text-[11px] text-[#baa592]">
                {printMode === 'single'
                  ? 'ขนาด 8.8 × 5.4 ซม. (มาตรฐาน)'
                  : 'กระดาษ A4 (8 ใบบนหน้าเดียว)'}
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Option 1: Single Card */}
              <button
                type="button"
                onClick={() => onChangePrintMode('single')}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  printMode === 'single'
                    ? 'bg-[#3b271a] border-[#c5a059] text-[#f7e0a3] shadow-md ring-1 ring-[#c5a059]/50'
                    : 'bg-[#1e130d] border-[#38261a] text-[#baa592] hover:bg-[#281911]'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#271810] border border-[#4d3625] flex items-center justify-center shrink-0 text-[#d4af37]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#f5ecd8]">
                      พิมพ์การ์ด 1 ใบ
                    </span>
                    {printMode === 'single' && (
                      <Check className="w-4 h-4 text-[#d4af37]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#baa592] mt-0.5">
                    ขนาดจริง 8.8 × 5.4 ซม. สำหรับใส่ซองหรือกระเป๋า
                  </p>
                </div>
              </button>

              {/* Option 2: A4 Multi-card */}
              <button
                type="button"
                onClick={() => onChangePrintMode('a4')}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  printMode === 'a4'
                    ? 'bg-[#3b271a] border-[#c5a059] text-[#f7e0a3] shadow-md ring-1 ring-[#c5a059]/50'
                    : 'bg-[#1e130d] border-[#38261a] text-[#baa592] hover:bg-[#281911]'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#271810] border border-[#4d3625] flex items-center justify-center shrink-0 text-[#d4af37]">
                  <Grid className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#f5ecd8]">
                      พิมพ์ 8 ใบบน A4
                    </span>
                    {printMode === 'a4' && (
                      <Check className="w-4 h-4 text-[#d4af37]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#baa592] mt-0.5">
                    จัดเรียง 8 ใบเต็มแผ่น A4 พร้อมเส้นประสำหรับตัด
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Print Actions */}
          <div className="space-y-2.5 pt-1">
            <label className="text-xs font-semibold text-[#f7e0a3]">
              2. สั่งพิมพ์ / ดาวน์โหลดเอกสาร:
            </label>

            <div className="space-y-2.5">
              {/* Action 1 (Primary & 100% Reliable): Download Print-Ready PDF */}
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="w-full py-3.5 px-4 rounded-xl font-thai-serif text-base font-bold text-[#1a0f08] bg-gradient-to-r from-[#e7cb76] via-[#f7e4a8] to-[#cba34f] hover:brightness-110 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#fff0ba] disabled:opacity-50"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#6c4815]" />
                    <span>กำลังประมวลผลเอกสาร PDF พร้อมพิมพ์...</span>
                  </>
                ) : pdfSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-800" />
                    <span>ดาวน์โหลด PDF สำเร็จ! (เปิดไฟล์แล้วสั่งพิมพ์ได้เลย)</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 text-[#6c4815]" />
                    <span>
                      📄 ดาวน์โหลดไฟล์ PDF พร้อมพิมพ์ (
                      {printMode === 'single' ? 'การ์ดเดี่ยว' : 'A4 ชุด 8 ใบ'})
                    </span>
                  </>
                )}
              </button>

              {/* Action 2: Direct Print Dialog */}
              <button
                type="button"
                onClick={handleDirectPrint}
                className="w-full py-2.5 px-4 rounded-xl font-thai-serif text-sm font-semibold text-[#f5ecd8] bg-[#2a1b12] hover:bg-[#382418] border border-[#c5a059]/60 hover:border-[#ffd54f] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#ffd54f]" />
                <span>🖨️ สั่งพิมพ์ผ่านเบราว์เซอร์โดยตรง (เปิดหน้าต่าง Print)</span>
              </button>

              {/* Iframe warning notice if direct print was clicked inside an iframe */}
              {iframeWarning && inIframe && (
                <div className="p-3 rounded-xl bg-[#361810] border border-[#9b3d2b] text-xs text-[#f5ecd8] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#ffb4a2]">
                    <AlertCircle className="w-4 h-4 text-[#ff8e72] shrink-0" />
                    <span>เบราว์เซอร์บล็อกหน้าต่างสั่งพิมพ์ในโหมดพรีวิว iFrame</span>
                  </div>
                  <p className="text-[11px] text-[#e8d5c4] leading-relaxed">
                    ระบบความปลอดภัยของเบราว์เซอร์จะไม่เปิดหน้าต่างสั่งพิมพ์เมื่ออยู่ในกรอบพรีวิว
                    กรุณากดปุ่ม <strong>"📄 ดาวน์โหลดไฟล์ PDF พร้อมพิมพ์"</strong> ด้านบน
                    หรือกดปุ่ม <strong>"↗️ เปิดในแท็บใหม่"</strong> ด้านล่างเพื่อสั่งพิมพ์ตามปกติครับ
                  </p>
                </div>
              )}

              {/* Action 3: Open in New Standalone Tab */}
              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-thai-serif text-xs font-semibold text-[#ffd54f] bg-[#1a100a] hover:bg-[#251710] border border-[#523824] hover:border-[#ffd54f] transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-[#c5a059]" />
                <span>↗️ เปิดแอปในแท็บใหม่เต็มจอ (เพื่อสั่งพิมพ์ผ่านเบราว์เซอร์ได้ 100%)</span>
              </a>

              {/* Action 4: Download High-Res Image */}
              <button
                type="button"
                onClick={() => {
                  onSaveImage();
                  onClose();
                }}
                disabled={isSavingImage}
                className="w-full py-2 px-4 rounded-xl font-thai-serif text-xs text-[#baa592] hover:text-[#f5ecd8] bg-[#140c07] hover:bg-[#1e130d] border border-[#2a1b12] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>📥 หรือบันทึกเป็นการ์ดรูปภาพความละเอียดสูง (PNG 300 DPI)</span>
              </button>
            </div>
          </div>

          {/* Printing Tips */}
          <div className="p-3.5 rounded-xl bg-[#1a100a] border border-[#3e2a1d] text-xs text-[#baa592] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#f7e0a3]">
              <Info className="w-4 h-4 text-[#c5a059]" />
              <span>เคล็ดลับการตั้งค่าเครื่องพิมพ์ให้สวยสมจริง:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-[#d8c5b0] pl-1">
              <li>
                ติ๊กถูกที่ <strong className="text-[#f7e0a3]">"พิมพ์ภาพพื้นหลัง" (Background graphics)</strong> เพื่อให้ลายสุโขทัยและสีทองคมชัด
              </li>
              <li>
                ตั้งค่าขนาดพิมพ์เป็น <strong className="text-[#f7e0a3]">"ขนาดจริง 100%" (Actual Size)</strong> ไม่ต้องย่อ/ขยาย
              </li>
              <li>
                แนะนำใช้กระดาษอาร์ตการ์ดความหนา 210 - 260 แกรมเพื่อสัมผัสที่พรีเมียม
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
