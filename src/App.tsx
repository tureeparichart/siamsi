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
import { loadPermanentCardBg, savePermanentCardBg } from './utils/imageStorage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedFortune, setSelectedFortune] = useState<Fortune | null>(null);
  const [lastDrawnId, setLastDrawnId] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const themeMode: ThemeMode = 'chibi3d';

  // Custom user-uploaded background image state with localStorage support
  const [customBgImage, setCustomBgImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sukhothai_custom_bg');
    } catch {
      return null;
    }
  });

  // Custom user-uploaded logo image state with localStorage support
  const [customLogoImage, setCustomLogoImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sukhothai_custom_logo');
    } catch {
      return null;
    }
  });

  const handleUploadCustomBg = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomBgImage(dataUrl);
        try {
          localStorage.setItem('sukhothai_custom_bg', dataUrl);
        } catch {
          // localStorage quota or privacy restrictions
        }
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleResetCustomBg = useCallback(() => {
    setCustomBgImage(null);
    try {
      localStorage.removeItem('sukhothai_custom_bg');
    } catch {}
  }, []);

  const handleUploadCustomLogo = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomLogoImage(dataUrl);
        try {
          localStorage.setItem('sukhothai_custom_logo', dataUrl);
        } catch {
          // localStorage quota or privacy restrictions
        }
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleResetCustomLogo = useCallback(() => {
    setCustomLogoImage(null);
    try {
      localStorage.removeItem('sukhothai_custom_logo');
    } catch {}
  }, []);

  // Permanent souvenir card background image (Sukhothai Wat Mahathat & Heritage landscape - ล็อกถาวร)
  const FALLBACK_CARD_BG_PATH = '/assets/sukhothai-card-bg.svg';
  const [cardBgImage, setCardBgImage] = useState<string>(FALLBACK_CARD_BG_PATH);

  useEffect(() => {
    // Attempt loading permanent saved background from IndexedDB or static file
    const initBg = async () => {
      const saved = await loadPermanentCardBg();
      if (saved) {
        setCardBgImage(saved);
        return;
      }
      // Check if user has uploaded static file to /assets/sukhothai-card-bg.png
      const testImg = new Image();
      testImg.onload = () => setCardBgImage('/assets/sukhothai-card-bg.png');
      testImg.onerror = () => {
        // keep fallback
      };
      testImg.src = '/assets/sukhothai-card-bg.png';
    };
    initBg();
  }, []);

  const handleSavePermanentCardBg = useCallback(async (dataUrl: string) => {
    setCardBgImage(dataUrl);
    await savePermanentCardBg(dataUrl);
  }, []);

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

      {/* Exhibition Footer */}
      <Footer />

      {/* Floating Interactive Mascot Guide (มีให้แตะฟังเกร็ดความรู้ทุกหน้า) */}
      <MascotFloatingCompanion />
    </div>
  );
}
