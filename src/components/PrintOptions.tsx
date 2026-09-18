import React from 'react';
import { CreditCard, Grid, Check } from 'lucide-react';

export type PrintMode = 'single' | 'a4';

interface PrintOptionsProps {
  printMode: PrintMode;
  onChangePrintMode: (mode: PrintMode) => void;
}

export const PrintOptions: React.FC<PrintOptionsProps> = ({
  printMode,
  onChangePrintMode,
}) => {
  return (
    <div className="w-full bg-[#1e140e] border border-[#3d2c1e] rounded-xl p-3.5 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#e5d5c4] flex items-center gap-1.5">
          <span>รูปแบบการพิมพ์:</span>
        </span>
        <span className="text-[11px] text-[#9e8b7a]">
          {printMode === 'single' ? 'ขนาดแนวนอน 5.4 × 8.8 ซม.' : 'จัดเรียง 8 ใบบนกระดาษ A4'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Option 1: Single Card */}
        <button
          type="button"
          onClick={() => onChangePrintMode('single')}
          className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
            printMode === 'single'
              ? 'bg-[#35251a] border-[#c5a059] text-[#f7e0a3] shadow-sm'
              : 'bg-[#18100c] border-[#312217] text-[#9d8977] hover:bg-[#231710] hover:text-[#d6c4b2]'
          }`}
        >
          <div className="w-7 h-7 rounded-md bg-[#251911] border border-[#4d3625] flex items-center justify-center shrink-0 mt-0.5 text-[#d4af37]">
            <CreditCard className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#f5ecd8]">พิมพ์การ์ด 1 ใบ (แนวนอน)</span>
              {printMode === 'single' && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
            </div>
            <p className="text-[11px] text-[#baa592] mt-0.5">
              พิมพ์ขนาดจริงใบเดี่ยว แนวนอน (5.4 × 8.8 ซม.)
            </p>
          </div>
        </button>

        {/* Option 2: Multi-card on A4 */}
        <button
          type="button"
          onClick={() => onChangePrintMode('a4')}
          className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
            printMode === 'a4'
              ? 'bg-[#35251a] border-[#c5a059] text-[#f7e0a3] shadow-sm'
              : 'bg-[#18100c] border-[#312217] text-[#9d8977] hover:bg-[#231710] hover:text-[#d6c4b2]'
          }`}
        >
          <div className="w-7 h-7 rounded-md bg-[#251911] border border-[#4d3625] flex items-center justify-center shrink-0 mt-0.5 text-[#d4af37]">
            <Grid className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#f5ecd8]">จัดหลายใบลง A4</span>
              {printMode === 'a4' && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
            </div>
            <p className="text-[11px] text-[#baa592] mt-0.5">
              พิมพ์ 8 ใบบน A4 พร้อมเส้นประสำหรับตัด
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
