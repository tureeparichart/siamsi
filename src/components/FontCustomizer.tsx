import React, { useState, useRef } from 'react';
import { Type, Upload, CheckCircle2, Info, FolderOpen } from 'lucide-react';

interface FontCustomizerProps {
  onFontLoaded?: (fontName: string) => void;
}

export const FontCustomizer: React.FC<FontCustomizerProps> = ({ onFontLoaded }) => {
  const [loadedFileName, setLoadedFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['ttf', 'otf', 'woff', 'woff2'].includes(ext || '')) {
      setErrorMessage('กรุณาเลือกไฟล์ฟอนต์นามสกุล .ttf, .otf, .woff หรือ .woff2');
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      // Register custom font directly into browser's FontFace API as 'PhoKhunRam'
      const fontFace = new FontFace('PhoKhunRam', buffer);
      await fontFace.load();
      document.fonts.add(fontFace);

      setLoadedFileName(file.name);
      setErrorMessage(null);
      if (onFontLoaded) onFontLoaded(file.name);

      // Trigger re-render of text on canvas/preview
      document.body.classList.add('font-loaded-custom');
    } catch (err) {
      console.error('Font load error:', err);
      setErrorMessage('ไม่สามารถโหลดฟอนต์นี้ได้ กรุณาตรวจสอบว่าเป็นไฟล์ฟอนต์ที่สมบูรณ์');
    }
  };

  return (
    <div className="w-full bg-[#1b120c] border border-[#3e2b1d] rounded-xl p-3.5 space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs font-bold text-[#f5ecd8]">
            ฟอนต์ชื่อบนการ์ด (PhoKhunRam)
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpenInfo(!isOpenInfo)}
          className="text-[11px] text-[#baa592] hover:text-[#f7e0a3] flex items-center gap-1 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{isOpenInfo ? 'ปิดคำแนะนำ' : 'วิธีติดตั้งในเครื่อง'}</span>
        </button>
      </div>

      {/* Font status / File picker button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          accept=".ttf,.otf,.woff,.woff2"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 py-2 px-3 rounded-lg bg-[#271910] hover:bg-[#382518] text-[#f7e0a3] border border-[#c5a059]/40 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <FolderOpen className="w-4 h-4 text-[#d4af37]" />
          <span>เลือกไฟล์ฟอนต์จากเครื่องของคุณ</span>
        </button>
      </div>

      {loadedFileName ? (
        <div className="p-2 rounded-lg bg-[#142818] border border-[#2e7d32] text-xs text-[#a5d6a7] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#81c784]" />
          <span className="break-words">
            โหลดฟอนต์ <strong>{loadedFileName}</strong> สำเร็จแล้ว! แสดงผลบนการ์ดทันที
          </span>
        </div>
      ) : (
        <p className="text-[11px] text-[#917e6e]">
          💡 สามารถเลือกไฟล์ <code className="text-[#d4af37]">PhoKhunRam.ttf</code> จากไดรฟ์ <code className="text-[#d4af37]">D:\งานโรงเรียน\...</code> ได้ทันที
        </p>
      )}

      {errorMessage && (
        <div className="p-2 rounded-lg bg-[#3a1414] border border-[#d32f2f] text-xs text-[#ffcdd2]">
          {errorMessage}
        </div>
      )}

      {/* Expandable Setup Info */}
      {isOpenInfo && (
        <div className="p-3 rounded-lg bg-[#130b07] border border-[#312015] text-[11px] text-[#b09e8e] space-y-2 leading-relaxed">
          <p className="font-semibold text-[#f7e0a3]">📌 ข้อมูลทางเทคนิคเกี่ยวกับเบราว์เซอร์และไดรฟ์ D:\</p>
          <p>
            เนื่องจากระบบความปลอดภัยของเว็บเบราว์เซอร์ (Web Security) หน้าเว็บไม่สามารถเข้าถึงไฟล์ในเครื่องผ่านพาธ <code className="text-[#d4af37]">D:\...</code> ตรง ๆ ในโค้ด CSS ได้
          </p>
          <p className="font-semibold text-[#f7e0a3]">คุณสามารถทำได้ 3 วิธี:</p>
          <ol className="list-decimal pl-4 space-y-1">
            <li>
              <strong>กดปุ่ม “เลือกไฟล์ฟอนต์จากเครื่องของคุณ” ด้านบน</strong> แล้วเลือกไฟล์ฟอนต์จากโฟลเดอร์ในไดรฟ์ D:\ ได้ทันที (สะดวกที่สุด)
            </li>
            <li>
              <strong>ติดตั้งฟอนต์ลงใน Windows</strong>: คลิกขวาที่ไฟล์ฟอนต์ในโฟลเดอร์ แล้วเลือก <em>“Install” (ติดตั้ง)</em> ระบบ CSS จะดึงผ่าน <code className="text-[#d4af37]">local('PhoKhunRam')</code> ให้อัตโนมัติ
            </li>
            <li>
              <strong>วางในโฟลเดอร์โปรเจกต์</strong>: คัดลอกไฟล์ฟอนต์ไปวางที่ <code className="text-[#d4af37]">public/fonts/PhoKhunRam.ttf</code>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};
