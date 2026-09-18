import React, { useState, useRef } from 'react';
import { BookOpen, Compass, Award, Home, Maximize, Minimize, Image as ImageIcon, Upload, RotateCcw, X, Info, Check } from 'lucide-react';
import { PageView } from '../types';
import { SiamSiLogo } from './SiamSiLogo';

interface NavigationProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  hasSelectedFortune: boolean;
  customBgActive?: boolean;
  onUploadBg?: (file: File) => void;
  onResetBg?: () => void;
  customLogoImage?: string | null;
  onUploadLogo?: (file: File) => void;
  onResetLogo?: () => void;
  cardBgImage?: string | null;
  onUploadCardBg?: (dataUrl: string) => void;
  onResetCardBg?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  customBgActive,
  onUploadBg,
  onResetBg,
  customLogoImage,
  onUploadLogo,
  onResetLogo,
  cardBgImage,
  onUploadCardBg,
  onResetCardBg,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBgSettings, setShowBgSettings] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'website' | 'card'>('website');
  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const cardBgFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const navItems: { id: PageView; label: string; icon: React.ReactNode; disabled?: boolean }[] = [
    { id: 'home', label: 'หน้าแรก', icon: <Home className="w-4 h-4" /> },
    { id: 'shaking', label: 'เสี่ยงเซียมซี', icon: <Compass className="w-4 h-4" /> },
    { id: 'all_fortunes', label: '20 เรื่องราว', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'souvenir', label: 'การ์ดที่ระลึก', icon: <Award className="w-4 h-4" /> },
  ];

  const handleBgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadBg) {
      onUploadBg(file);
      setShowBgSettings(false);
    }
  };

  const handleCardBgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadCardBg) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const dataUrl = evt.target?.result as string;
        if (dataUrl) {
          onUploadCardBg(dataUrl);
          setShowBgSettings(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadLogo) {
      onUploadLogo(file);
      setShowBgSettings(false);
    }
  };

  const isCustomCardBg = Boolean(cardBgImage && !cardBgImage.includes('sukhothai-card-bg.svg'));

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#16120f]/90 border-b border-[#3a2c1f] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand & Logo with User's SIAM SI Emblem */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative shrink-0 flex items-center justify-center">
              {customLogoImage ? (
                <img
                  src={customLogoImage}
                  alt="SIAM SI - Open the Past of Sukothai Logo"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#d4af37] shadow-[0_2px_10px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform"
                />
              ) : (
                <SiamSiLogo size={46} className="group-hover:scale-105 transition-transform" />
              )}
            </div>
            <div>
              <h1 className="font-thai-serif text-sm sm:text-base md:text-lg font-bold text-gold-gradient tracking-wide leading-tight">
                เซียมซีแห่งกาลเวลา
              </h1>
              <p className="text-[10px] sm:text-xs text-[#bda793] font-serif tracking-wider hidden xs:block">
                OPEN THE PAST OF SUKOTHAI
              </p>
            </div>
          </button>

          {/* Navigation items for tablet / desktop */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => !item.disabled && onNavigate(item.id)}
                  disabled={item.disabled}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3d2c1e] text-[#f7e0a3] border border-[#c5a059]/50 shadow-sm'
                      : item.disabled
                      ? 'text-[#615245] cursor-not-allowed opacity-50'
                      : 'text-[#d6c4b2] hover:text-[#f7e0a3] hover:bg-[#281e17]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick controls: Background Settings & Fullscreen */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Background Settings button */}
            <button
              onClick={() => setShowBgSettings(true)}
              aria-label="ตั้งค่าพื้นหลังเว็บไซต์"
              title="ตั้งค่าภาพพื้นหลังเว็บไซต์"
              className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                customBgActive
                  ? 'border-[#ffd54f]/60 bg-[#352517] text-[#ffe082]'
                  : 'border-[#382b21] bg-[#1b1512] text-[#d6c4b2] hover:text-[#f7e0a3] hover:border-[#c5a059]/40'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#ffd54f]" />
              <span className="hidden lg:inline">ภาพพื้นหลัง</span>
            </button>

            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              aria-label="เต็มหน้าจอสำหรับจอแสดงผล"
              title="โหมดเต็มหน้าจอสำหรับจอนิทรรศการ"
              className="p-2.5 rounded-lg border border-[#382b21] bg-[#1b1512] text-[#d6c4b2] hover:text-[#f7e0a3] hover:border-[#c5a059]/40 transition-all cursor-pointer"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile bottom nav bar */}
        <div className="md:hidden flex items-center justify-around bg-[#1c1511]/95 border-t border-[#35281e] px-2 py-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => !item.disabled && onNavigate(item.id)}
                disabled={item.disabled}
                className={`flex flex-col items-center gap-1 px-2 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#f7e0a3] font-semibold'
                    : item.disabled
                    ? 'text-[#594a3e] opacity-40 cursor-not-allowed'
                    : 'text-[#ab9887] hover:text-[#f7e0a3]'
                }`}
              >
                <span className={`p-1 rounded ${isActive ? 'bg-[#3e2c1e]' : ''}`}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Hidden file inputs for uploading */}
      <input
        type="file"
        ref={bgFileInputRef}
        onChange={handleBgFileChange}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />
      <input
        type="file"
        ref={cardBgFileInputRef}
        onChange={handleCardBgFileChange}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />
      <input
        type="file"
        ref={logoFileInputRef}
        onChange={handleLogoFileChange}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />

      {/* Background & Theme Settings Modal */}
      {showBgSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#1a120c] border border-[#d4af37]/40 rounded-2xl p-5 sm:p-6 shadow-2xl text-[#f5ebd9] max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowBgSettings(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#a89582] hover:text-[#ffd54f] hover:bg-[#2b1f16] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-[#332215] border border-[#c5a059]/40 text-[#ffd54f]">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-thai-serif text-[#ffd54f]">
                  ตั้งค่าภาพพื้นหลัง (Background Settings)
                </h3>
                <p className="text-xs text-[#bda793]">
                  กำหนดภาพพื้นหลังสำหรับเว็บไซต์และการ์ดที่ระลึก
                </p>
              </div>
            </div>

            {/* Tab Navigation: Website BG vs Card BG */}
            <div className="flex border-b border-[#3b281b] mb-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveSettingsTab('website')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 flex items-center gap-1.5 ${
                  activeSettingsTab === 'website'
                    ? 'border-[#ffd54f] text-[#ffd54f]'
                    : 'border-transparent text-[#9e8b7a] hover:text-[#d6c4b2]'
                }`}
              >
                <span>🌐 พื้นหลังเว็บไซต์</span>
                {customBgActive && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
              </button>
              <button
                type="button"
                onClick={() => setActiveSettingsTab('card')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 flex items-center gap-1.5 ${
                  activeSettingsTab === 'card'
                    ? 'border-[#ffd54f] text-[#ffd54f]'
                    : 'border-transparent text-[#9e8b7a] hover:text-[#d6c4b2]'
                }`}
              >
                <span>🎴 พื้นหลังการ์ดที่ระลึก</span>
                {isCustomCardBg && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
              </button>
            </div>

            {/* Tab 1: Website Background Settings */}
            {activeSettingsTab === 'website' && (
              <div className="space-y-4">
                {/* Current Status */}
                <div className="p-3 rounded-xl bg-[#231811] border border-[#3f2e21] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#bda793] block">สถานะพื้นหลังเว็บไซต์:</span>
                    <span className="text-sm font-semibold text-[#f7f2e7] flex items-center gap-1.5 mt-0.5">
                      {customBgActive ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          กำลังใช้ภาพพื้นหลังที่คุณกำหนด
                        </>
                      ) : (
                        'ภาพพื้นหลังสุโขทัย 3D (บรรยากาศวัดมหาธาตุ)'
                      )}
                    </span>
                  </div>
                  {customBgActive && onResetBg && (
                    <button
                      onClick={() => {
                        onResetBg();
                        setShowBgSettings(false);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#fca5a5] hover:bg-[#3f1c1c] border border-red-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      คืนค่าเดิม
                    </button>
                  )}
                </div>

                {/* Upload Button */}
                <div className="space-y-2">
                  <button
                    onClick={() => bgFileInputRef.current?.click()}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa822d] text-[#1c0e08] font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/40 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>เลือกและอัปโหลดภาพพื้นหลังเว็บไซต์ใหม่</span>
                  </button>
                  <p className="text-[11px] text-[#a89582] text-center">
                    รองรับ JPG, PNG, WebP (บันทึกในเบราว์เซอร์เครื่องนี้)
                  </p>
                </div>

                {/* GitHub Pages Tip */}
                <div className="p-3.5 rounded-xl bg-[#241a12] border border-[#c5a059]/30 text-xs text-[#d6c4b2] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#ffd54f]">
                    <Info className="w-4 h-4 shrink-0 text-[#ffd54f]" />
                    <span>ต้องการให้พื้นหลังเว็บแสดงผลถาวรสำหรับทุกคนบน GitHub Pages?</span>
                  </div>
                  <p className="leading-relaxed">
                    นำไฟล์รูปภาพของคุณไปวางไว้ในโค้ดโปรเจกต์ที่:
                  </p>
                  <div className="p-2 rounded-lg bg-[#140e0a] border border-[#3d2b1c] font-mono text-[11px] text-[#ffd54f]">
                    public/assets/website-bg.jpg (หรือ .png)
                  </div>
                  <p className="text-[11px] text-[#a89582]">
                    เมื่อ Git push ขึ้น GitHub ระบบจะดึงภาพนี้มาแสดงเป็นพื้นหลังให้ทุกคนทันที
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Commemorative Card Background Settings */}
            {activeSettingsTab === 'card' && (
              <div className="space-y-4">
                {/* Current Status */}
                <div className="p-3 rounded-xl bg-[#231811] border border-[#3f2e21] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#bda793] block">สถานะพื้นหลังการ์ดที่ระลึก:</span>
                    <span className="text-sm font-semibold text-[#f7f2e7] flex items-center gap-1.5 mt-0.5">
                      {isCustomCardBg ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          กำลังใช้ภาพพื้นหลังการ์ดที่คุณกำหนด
                        </>
                      ) : (
                        'ภาพลายสถูปสุโขทัยและลวดลายโบราณเดิม (SVG)'
                      )}
                    </span>
                  </div>
                  {isCustomCardBg && onResetCardBg && (
                    <button
                      onClick={() => {
                        onResetCardBg();
                        setShowBgSettings(false);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#fca5a5] hover:bg-[#3f1c1c] border border-red-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      คืนค่าเดิม
                    </button>
                  )}
                </div>

                {/* Upload Button */}
                <div className="space-y-2">
                  <button
                    onClick={() => cardBgFileInputRef.current?.click()}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa822d] text-[#1c0e08] font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/40 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>เลือกและอัปโหลดภาพพื้นหลังการ์ดใหม่</span>
                  </button>
                  <p className="text-[11px] text-[#a89582] text-center">
                    รองรับ JPG, PNG, WebP (บันทึกในเบราว์เซอร์เครื่องนี้ และใช้พิมพ์การ์ด)
                  </p>
                </div>

                {/* GitHub Pages Tip for Card */}
                <div className="p-3.5 rounded-xl bg-[#241a12] border border-[#c5a059]/30 text-xs text-[#d6c4b2] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#ffd54f]">
                    <Info className="w-4 h-4 shrink-0 text-[#ffd54f]" />
                    <span>ต้องการให้พื้นหลังการ์ดแสดงผลถาวรสำหรับทุกคนบน GitHub Pages?</span>
                  </div>
                  <p className="leading-relaxed">
                    นำไฟล์รูปภาพของคุณไปวางไว้ในโค้ดโปรเจกต์ที่:
                  </p>
                  <div className="p-2 rounded-lg bg-[#140e0a] border border-[#3d2b1c] font-mono text-[11px] text-[#ffd54f]">
                    public/assets/sukhothai-card-bg.png (หรือ .jpg)
                  </div>
                  <p className="text-[11px] text-[#a89582]">
                    เมื่อ Git push ขึ้น GitHub การ์ดที่ระลึกของทุกคนจะใช้ภาพนี้เป็นพื้นหลังทันที
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5 text-right">
              <button
                onClick={() => setShowBgSettings(false)}
                className="px-5 py-2 rounded-xl bg-[#2d1e14] hover:bg-[#3d2c1e] text-[#f7f2e7] text-xs font-semibold border border-[#4d3827] transition-colors cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

