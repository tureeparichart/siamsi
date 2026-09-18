import React from 'react';
import { BookOpen, Compass, Award, Home, Maximize, Minimize } from 'lucide-react';
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
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  customLogoImage,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

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

  return (
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

        {/* Quick controls: Fullscreen for Kiosk */}
        <div className="flex items-center gap-1.5 sm:gap-2">
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
  );
};
