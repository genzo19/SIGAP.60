import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashLoader } from './components/SplashLoader';
import { ChatModal } from './components/ChatModal';
import { MobileTopBar } from './components/MobileTopBar';
import { BottomTabBar } from './components/BottomTabBar';
import { MobileFooter } from './components/MobileFooter';
import { Footer } from './components/Footer';
import { LoginPage } from './pages/LoginPage';
import { BerandaPage } from './pages/BerandaPage';
import { ProtokolPage } from './pages/ProtokolPage';
import { PosPage } from './pages/PosPage';
import { PendampinganPage } from './pages/PendampinganPage';
import { LatihanPage } from './pages/LatihanPage';
import { DataPage } from './pages/DataPage';
import { DasborPosPage } from './pages/DasborPosPage';

const MainLayout: React.FC = () => {
  const { currentPage, isAuthenticated } = useApp();

  // Exception for Dasbor Pos: Full-width desktop layout when authenticated
  if (isAuthenticated && currentPage === 'dasbor') {
    return (
      <div className="min-h-screen w-full bg-[#000B58] text-white flex flex-col justify-between selection:bg-[#006A67] selection:text-[#FFF4B7] font-sans">
        <SplashLoader />
        <ChatModal />

        <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 flex-1 flex flex-col transition-opacity duration-300">
          <DasborPosPage />
        </main>

        <Footer />
      </div>
    );
  }

  // Mobile-First Layout: Centered inside a 390x844 phone-frame mockup on screens > 600px
  return (
    <div className="min-h-screen w-full bg-[#000B58] text-white flex flex-col items-center justify-center sm:py-6 sm:px-4 selection:bg-[#006A67] selection:text-[#FFF4B7] font-sans">
      {/* Full-screen animated Logo Splash Loader */}
      <SplashLoader />

      {/* Global Peer Companion Chat Modal */}
      <ChatModal />

      {/* Phone Frame Mockup Container (390x844 on screens > 600px; full-width on mobile) */}
      <div className="w-full min-h-screen sm:min-h-0 sm:w-[390px] sm:h-[844px] sm:max-h-[94vh] bg-[#000B58] sm:rounded-[50px] sm:border-[8px] sm:border-[#003161] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(0,106,103,0.3)] sm:ring-1 sm:ring-[#FFF4B7]/25 relative flex flex-col overflow-hidden">
        {/* Decorative Phone Speaker / Camera Pill on Mockup frame */}
        <div className="hidden sm:block absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#00083b] rounded-full z-50 border border-[#003161]/60 pointer-events-none"></div>

        {/* Sticky Top Bar (Logo + Page Title + Timer Chip / Auth Status) */}
        <MobileTopBar />

        {/* Scrollable Page Body (390px Base Single Column) */}
        <main className="flex-1 overflow-y-auto px-4 py-4 w-full scrollbar-thin scrollbar-thumb-[#003161] scrollbar-track-transparent">
          {/* Show Login Screen with Fingerprint Scanner if not logged in or on login page */}
          {(!isAuthenticated || currentPage === 'login') && <LoginPage />}

          {/* Protected Menus - Active and functional only when logged in */}
          {isAuthenticated && currentPage === 'beranda' && <BerandaPage />}
          {isAuthenticated && currentPage === 'protokol' && <ProtokolPage />}
          {isAuthenticated && currentPage === 'pos' && <PosPage />}
          {isAuthenticated && currentPage === 'pendampingan' && <PendampinganPage />}
          {isAuthenticated && currentPage === 'latihan' && <LatihanPage />}
          {isAuthenticated && currentPage === 'data' && <DataPage />}

          {/* Mobile Footer with mandatory OJK/IASC disclaimer */}
          <MobileFooter />
        </main>

        {/* Fixed Bottom Tab Bar (5 Items: Beranda, Protokol, Pos, Latihan, Data) */}
        <BottomTabBar />
      </div>

      {/* Subtle Desktop Device Hint */}
      <div className="hidden sm:flex items-center gap-2 mt-3 text-xs text-white/50 font-mono">
        <span className="material-symbols-outlined text-[16px] text-[#84d4d0]">
          {isAuthenticated ? 'lock_open' : 'fingerprint'}
        </span>
        <span>
          {isAuthenticated
            ? 'SIGAP 60 • Sesi Relawan Aktif (Menu Terbuka)'
            : 'SIGAP 60 • Autentikasi Biometrik Diperlukan (Menu Terkunci)'}
        </span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
