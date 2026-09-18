import React, { useState, useCallback, useEffect } from 'react';
import { FORTUNES } from './data/fortunes';
import { Fortune, PageView, MissionState, ThemeMode } from './types';
import { soundFx } from './utils/audio';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { FortuneBox } from './components/FortuneBox';
import { FortuneResult } from './components/FortuneResult';
import { StorySection } from './components/StorySection';
import { MissionSection } from './components/MissionSection';
import { SouvenirCardGenerator } from './components/SouvenirCardGenerator';
import { AllFortunes } from './components/AllFortunes';
import { SukhothaiAtmosphereBackground } from './components/SukhothaiAtmosphereBackground';
import { MascotFloatingCompanion } from './components/MascotKnowledgeBar';
import {
  loadPermanentCardBg,
  savePermanentCardBg,
  removePermanentCardBg,
  loadWebsiteBg,
  saveWebsiteBg,
  removeWebsiteBg,
  loadCustomLogo,
  saveCustomLogo,
  removeCustomLogo,
  detectFirstAvailableImage,
} from './utils/imageStorage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedFortune, setSelectedFortune] = useState<Fortune | null>(null);
  const [lastDrawnId, setLastDrawnId] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const themeMode: ThemeMode = 'chibi3d';

  // Base prefix for assets (supports relative path on GitHub Pages)
  const basePrefix = import.meta.env.BASE_URL || './';
  const cleanBase = basePrefix.endsWith('/') ? basePrefix : `${basePrefix}/`;

  // Custom user-uploaded background image state
  const [customBgImage, setCustomBgImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sukhothai_custom_bg');
    } catch {
      return null;
    }
  });

  // Custom user-uploaded logo image state
  const [customLogoImage, setCustomLogoImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sukhothai_custom_logo');
    } catch {
      return null;
    }
  });

  // Permanent souvenir card background image
  const FALLBACK_CARD_BG_PATH = `${cleanBase}assets/sukhothai-card-bg.svg`;
  const [cardBgImage, setCardBgImage] = useState<string>(FALLBACK_CARD_BG_PATH);

  // Initialize and auto-detect background, logo, and card assets
  useEffect(() => {
    const initAssets = async () => {
      // 1. Website Background: Check IndexedDB -> localStorage -> Static files
      const savedBg = await loadWebsiteBg();
      if (savedBg) {
        setCustomBgImage(savedBg);
      } else {
        const websiteBgCandidates = [
          `${cleanBase}assets/website-bg.png`,
          `${cleanBase}assets/website-bg.jpg`,
          `${cleanBase}assets/website-bg.jpeg`,
          `${cleanBase}assets/website-bg.webp`,
          `${cleanBase}assets/sukhothai-bg.png`,
          `${cleanBase}assets/sukhothai-bg.jpg`,
          `${cleanBase}assets/sukhothai-bg.jpeg`,
          `${cleanBase}assets/sukhothai-bg.webp`,
          `${cleanBase}assets/background.png`,
          `${cleanBase}assets/background.jpg`,
          `${cleanBase}assets/background.jpeg`,
          `${cleanBase}assets/background.webp`,
          `${cleanBase}assets/bg.png`,
          `${cleanBase}assets/bg.jpg`,
          `${cleanBase}assets/bg.jpeg`,
          `${cleanBase}assets/bg.webp`,
          `${cleanBase}website-bg.png`,
          `${cleanBase}website-bg.jpg`,
          `${cleanBase}website-bg.webp`,
          `${cleanBase}sukhothai-bg.png`,
          `${cleanBase}sukhothai-bg.jpg`,
          `${cleanBase}sukhothai-bg.webp`,
          `${cleanBase}background.png`,
          `${cleanBase}background.jpg`,
          `${cleanBase}background.webp`,
          `${cleanBase}bg.png`,
          `${cleanBase}bg.jpg`,
          `${cleanBase}bg.webp`,
        ];
        const detectedBg = await detectFirstAvailableImage(websiteBgCandidates);
        if (detectedBg) {
          setCustomBgImage(detectedBg);
        }
      }

      // 2. Custom Logo: Check IndexedDB -> localStorage -> Static files
      const savedLogo = await loadCustomLogo();
      if (savedLogo) {
        setCustomLogoImage(savedLogo);
      } else {
        const logoCandidates = [
          `${cleanBase}assets/custom-logo.png`,
          `${cleanBase}assets/custom-logo.jpg`,
          `${cleanBase}assets/custom-logo.svg`,
          `${cleanBase}assets/custom-logo.webp`,
          `${cleanBase}assets/logo.png`,
          `${cleanBase}assets/logo.jpg`,
          `${cleanBase}assets/logo.svg`,
          `${cleanBase}assets/logo.webp`,
          `${cleanBase}custom-logo.png`,
          `${cleanBase}custom-logo.jpg`,
          `${cleanBase}custom-logo.svg`,
          `${cleanBase}custom-logo.webp`,
          `${cleanBase}logo.png`,
          `${cleanBase}logo.jpg`,
          `${cleanBase}logo.svg`,
          `${cleanBase}logo.webp`,
        ];
        const detectedLogo = await detectFirstAvailableImage(logoCandidates);
        if (detectedLogo) {
          setCustomLogoImage(detectedLogo);
        }
      }

      // 3. Card Background: Check IndexedDB -> localStorage -> Static files
      const savedCardBg = await loadPermanentCardBg();
      if (savedCardBg) {
        setCardBgImage(savedCardBg);
      } else {
        const cardBgCandidates = [
          `${cleanBase}assets/sukhothai-card-bg.png`,
          `${cleanBase}assets/sukhothai-card-bg.jpg`,
          `${cleanBase}assets/sukhothai-card-bg.jpeg`,
          `${cleanBase}assets/sukhothai-card-bg.webp`,
          `${cleanBase}assets/card-bg.png`,
          `${cleanBase}assets/card-bg.jpg`,
          `${cleanBase}assets/card-bg.jpeg`,
          `${cleanBase}assets/card-bg.webp`,
          `${cleanBase}sukhothai-card-bg.png`,
          `${cleanBase}sukhothai-card-bg.jpg`,
          `${cleanBase}sukhothai-card-bg.jpeg`,
          `${cleanBase}sukhothai-card-bg.webp`,
          `${cleanBase}card-bg.png`,
          `${cleanBase}card-bg.jpg`,
          `${cleanBase}card-bg.jpeg`,
          `${cleanBase}card-bg.webp`,
        ];
        const detectedCard = await detectFirstAvailableImage(cardBgCandidates);
        if (detectedCard) {
          setCardBgImage(detectedCard);
        }
      }
    };

    initAssets();
  }, [cleanBase]);

  const handleUploadCustomBg = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomBgImage(dataUrl);
        await saveWebsiteBg(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleResetCustomBg = useCallback(async () => {
    setCustomBgImage(null);
    await removeWebsiteBg();
  }, []);

  const handleUploadCustomLogo = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomLogoImage(dataUrl);
        await saveCustomLogo(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleResetCustomLogo = useCallback(async () => {
    setCustomLogoImage(null);
    await removeCustomLogo();
  }, []);

  const handleSavePermanentCardBg = useCallback(async (dataUrl: string) => {
    setCardBgImage(dataUrl);
    await savePermanentCardBg(dataUrl);
  }, []);

  const handleResetPermanentCardBg = useCallback(async () => {
    setCardBgImage(FALLBACK_CARD_BG_PATH);
    await removePermanentCardBg();
  }, [FALLBACK_CARD_BG_PATH]);

  // Mission state tracking per session
  const [missionState, setMissionState] = useState<MissionState>({
    answered: false,
    selectedOptionId: null,
    isCorrect: false,
    attempts: 0,
    wrongOptionIds: [],
  });

  // Sound toggle handler
  const handleToggleSound = useCallback(() => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFx.enabled = nextState;
  }, [soundEnabled]);

  // Non-repeating random number generator (1-20)
  const getRandomFortuneId = useCallback((): number => {
    let newId: number;
    do {
      newId = Math.floor(Math.random() * 20) + 1;
    } while (newId === lastDrawnId && FORTUNES.length > 1);
    return newId;
  }, [lastDrawnId]);

  // Start Shaking Flow
  const handleStartShake = () => {
    setIsShaking(true);
    setCurrentPage('shaking');
  };

  // Finish Shaking and show result
  const handleFinishShake = (drawnNumber: number) => {
    const fortune = FORTUNES.find((f) => f.id === drawnNumber) || FORTUNES[0];
    setSelectedFortune(fortune);
    setLastDrawnId(drawnNumber);
    setIsShaking(false);

    // Reset mission state for the new fortune
    setMissionState({
      answered: false,
      selectedOptionId: null,
      isCorrect: false,
      attempts: 0,
      wrongOptionIds: [],
    });

    setCurrentPage('result');
  };

  // Direct selection from 20 Fortunes Grid
  const handleSelectFortuneDirectly = (fortune: Fortune) => {
    setSelectedFortune(fortune);
    setLastDrawnId(fortune.id);
    setMissionState({
      answered: false,
      selectedOptionId: null,
      isCorrect: false,
      attempts: 0,
      wrongOptionIds: [],
    });
    soundFx.playCardFlip();
    setCurrentPage('result');
  };

  // Draw Again
  const handleDrawAgain = () => {
    setIsShaking(true);
    setCurrentPage('shaking');
  };

  return (
    <div
      className="min-h-screen theme-chibi-3d bg-[#100a07] flex flex-col text-[#f7f2e7] relative transition-colors duration-500 overflow-x-hidden"
    >
      {/* 3D Chibi Sukhothai Atmosphere Background or Custom Uploaded Image */}
      {customBgImage ? (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
          <img
            src={customBgImage}
            alt="Custom Sukhothai Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0805]/95 via-[#140b07]/60 to-[#0e0805]/80" />
        </div>
      ) : (
        <SukhothaiAtmosphereBackground />
      )}

      {/* Top App Bar & Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === 'shaking') {
            handleStartShake();
          } else {
            setCurrentPage(page);
          }
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        hasSelectedFortune={selectedFortune !== null}
        customBgActive={!!customBgImage}
        onUploadBg={handleUploadCustomBg}
        onResetBg={handleResetCustomBg}
        customLogoImage={customLogoImage}
        onUploadLogo={handleUploadCustomLogo}
        onResetLogo={handleResetCustomLogo}
        cardBgImage={cardBgImage}
        onUploadCardBg={handleSavePermanentCardBg}
        onResetCardBg={handleResetPermanentCardBg}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Home & Shaking View */}
        {(currentPage === 'home' || currentPage === 'shaking') && (
          <FortuneBox
            isShaking={currentPage === 'shaking'}
            onStartShake={handleStartShake}
            onFinishShake={handleFinishShake}
            onBrowseAll={() => setCurrentPage('all_fortunes')}
            themeMode={themeMode}
          />
        )}

        {/* Fortune Result Screen */}
        {currentPage === 'result' && selectedFortune && (
          <FortuneResult
            fortune={selectedFortune}
            onOpenStory={() => setCurrentPage('story')}
            onStartMission={() => setCurrentPage('mission')}
            onOpenSouvenir={() => setCurrentPage('souvenir')}
            onDrawAgain={handleDrawAgain}
            onBrowseAll={() => setCurrentPage('all_fortunes')}
            themeMode={themeMode}
          />
        )}

        {/* Historical Story & Evidence View */}
        {currentPage === 'story' && selectedFortune && (
          <StorySection
            fortune={selectedFortune}
            onBackToResult={() => setCurrentPage('result')}
            onGoToMission={() => setCurrentPage('mission')}
            onGoToSouvenir={() => setCurrentPage('souvenir')}
            onBrowseAll={() => setCurrentPage('all_fortunes')}
            themeMode={themeMode}
          />
        )}

        {/* Detective Mission View */}
        {currentPage === 'mission' && selectedFortune && (
          <MissionSection
            fortune={selectedFortune}
            missionState={missionState}
            onUpdateMissionState={setMissionState}
            onBackToStory={() => setCurrentPage('story')}
            onGoToSouvenir={() => setCurrentPage('souvenir')}
            themeMode={themeMode}
          />
        )}

        {/* Personalized Commemorative Souvenir Card View */}
        {currentPage === 'souvenir' && (
          <SouvenirCardGenerator
            fortune={selectedFortune || FORTUNES[0]}
            onDrawAgain={handleDrawAgain}
            onBackToResult={() => setCurrentPage(selectedFortune ? 'result' : 'home')}
            onBackToStory={selectedFortune ? () => setCurrentPage('story') : undefined}
            onBrowseAll={() => setCurrentPage('all_fortunes')}
            themeMode={themeMode}
            cardBgImage={cardBgImage}
            onSavePermanentCardBg={handleSavePermanentCardBg}
            onResetPermanentCardBg={handleResetPermanentCardBg}
          />
        )}

        {/* All 20 Fortunes Grid View */}
        {currentPage === 'all_fortunes' && (
          <AllFortunes
            onSelectFortune={handleSelectFortuneDirectly}
            onBackToHome={() => setCurrentPage('home')}
            onStartShake={handleStartShake}
            themeMode={themeMode}
          />
        )}
      </main>

      {/* Exhibition Footer (ซ่อนเฉพาะหน้าสั่งพิมพ์การ์ดที่ระลึกตามคำขอ) */}
      {currentPage !== 'souvenir' && <Footer />}

      {/* Floating Interactive Mascot Guide (มีให้แตะฟังเกร็ดความรู้ทุกหน้า) */}
      <MascotFloatingCompanion />
    </div>
  );
}
