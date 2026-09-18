import React, { useState } from 'react';
import { User, Sparkles, ShieldCheck, Check, RotateCcw } from 'lucide-react';

interface NameFormProps {
  firstName: string;
  lastName: string;
  onChangeFirstName: (val: string) => void;
  onChangeLastName: (val: string) => void;
  onSubmit: () => void;
}

export const NameForm: React.FC<NameFormProps> = ({
  firstName,
  lastName,
  onChangeFirstName,
  onChangeLastName,
  onSubmit,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!firstName.trim()) {
      setErrorMessage('กรุณากรอกชื่อก่อนสร้างการ์ดที่ระลึก');
      return;
    }

    if (!lastName.trim()) {
      setErrorMessage('กรุณากรอกนามสกุลก่อนสร้างการ์ดที่ระลึก');
      return;
    }

    setErrorMessage(null);
    onSubmit();
  };

  const handleQuickName = (first: string, last: string) => {
    onChangeFirstName(first);
    onChangeLastName(last);
    setErrorMessage(null);
  };

  const handleClear = () => {
    onChangeFirstName('');
    onChangeLastName('');
    setErrorMessage(null);
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#241710] to-[#170e0a] border border-[#c5a059]/40 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-[#3b291d] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#3a281c] border border-[#c5a059]/60 flex items-center justify-center text-[#f7e0a3]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-thai-serif text-base sm:text-lg font-bold text-[#f7e0a3]">
              ระบุชื่อเพื่อพิมพ์ลงบนการ์ด
            </h3>
          </div>
        </div>

        {(firstName || lastName) && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-[#baa592] hover:text-[#f7e0a3] flex items-center gap-1 cursor-pointer"
            title="ล้างข้อมูล"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ล้าง</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* First Name Field */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="first-name-input" className="block text-xs sm:text-sm font-medium text-[#e5d5c4]">
              ชื่อ <span className="text-[#e57373]">*</span>
            </label>
            <div className="relative">
              <input
                id="first-name-input"
                type="text"
                value={firstName}
                onChange={(e) => {
                  onChangeFirstName(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="กรอกชื่อ"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-xl bg-[#1b120c] border border-[#4a3424] text-[#fff] placeholder-[#7d6b5b] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-base transition-colors"
              />
            </div>
          </div>

          {/* Last Name Field */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="last-name-input" className="block text-xs sm:text-sm font-medium text-[#e5d5c4]">
              นามสกุล <span className="text-[#e57373]">*</span>
            </label>
            <div className="relative">
              <input
                id="last-name-input"
                type="text"
                value={lastName}
                onChange={(e) => {
                  onChangeLastName(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="กรอกนามสกุล"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-xl bg-[#1b120c] border border-[#4a3424] text-[#fff] placeholder-[#7d6b5b] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-base transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Validation error notice */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-[#361311] border border-[#e53935]/60 text-xs sm:text-sm text-[#ffcdd2] flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Quick Example Chips for Kiosk Booth Visitors */}
        <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#8e7b6c]">ตัวอย่างด่วน:</span>
          <button
            type="button"
            onClick={() => handleQuickName('สมชาย', 'สุโขทัย')}
            className="px-2.5 py-1 rounded-lg bg-[#2b1e16] hover:bg-[#3d2c1e] text-[#d6c4b2] hover:text-[#f7e0a3] border border-[#443122] transition-colors cursor-pointer"
          >
            สมชาย สุโขทัย
          </button>
          <button
            type="button"
            onClick={() => handleQuickName('พิชญา', 'รามคำแหง')}
            className="px-2.5 py-1 rounded-lg bg-[#2b1e16] hover:bg-[#3d2c1e] text-[#d6c4b2] hover:text-[#f7e0a3] border border-[#443122] transition-colors cursor-pointer"
          >
            พิชญา รามคำแหง
          </button>
          <button
            type="button"
            onClick={() => handleQuickName('กิตติศักดิ์', 'ศิลาแก้ว')}
            className="px-2.5 py-1 rounded-lg bg-[#2b1e16] hover:bg-[#3d2c1e] text-[#d6c4b2] hover:text-[#f7e0a3] border border-[#443122] transition-colors cursor-pointer"
          >
            กิตติศักดิ์ ศิลาแก้ว
          </button>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl font-thai-serif text-base sm:text-lg font-bold text-[#1a0f08] bg-gradient-to-r from-[#e7cb76] via-[#f7e4a8] to-[#cba34f] hover:brightness-110 active:scale-[0.99] transition-all shadow-lg gold-glow flex items-center justify-center gap-2 cursor-pointer border border-[#fff0ba]"
          >
            <Sparkles className="w-4 h-4 text-[#735118]" />
            <span>✨ สร้างการ์ดที่ระลึก</span>
          </button>
        </div>

        {/* Privacy Note (Section 13) */}
        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-[#7d6b5b]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#81c784]" />
          <span>ข้อมูลใช้สำหรับสร้างการ์ดในเบราว์เซอร์นี้เท่านั้น ไม่มีการบันทึกหรือส่งไปยังเซิร์ฟเวอร์</span>
        </div>
      </form>
    </div>
  );
};
