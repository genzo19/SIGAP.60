import React from 'react';
import { useApp } from '../context/AppContext';
import { SigapLogo } from './SigapLogo';
import { PageType } from '../types';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    timerActive,
    secondsLeft,
    formatTime,
    startEmergencyTimer,
  } = useApp();

  const navItems: { key: PageType; label: string }[] = [
    { key: 'beranda', label: 'Beranda' },
    { key: 'protokol', label: 'Protokol' },
    { key: 'pos', label: 'Pos' },
    { key: 'latihan', label: 'Latihan' },
    { key: 'data', label: 'Data' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#000B58]/95 backdrop-blur-xl border-b border-[#003161]/80 shadow-[0_4px_20px_rgba(0,11,88,0.5)]">
      <div className="max-w-[1440px] mx-auto h-20 px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center gap-4">
          <SigapLogo
            variant="horizontal"
            size={38}
            animated={false}
            showTagline={false}
            onClick={() => setCurrentPage('beranda')}
            className="hover:opacity-95 transition-opacity"
          />

          {/* Institutional Badge */}
          <div className="hidden xl:flex items-center px-3 py-1 rounded bg-[#003161]/60 text-[#FFF4B7] text-xs font-semibold border border-[#006A67]/30">
            <span className="material-symbols-outlined text-[15px] mr-1 text-[#84d4d0]">shield</span>
            Inisiatif Bela Negara - Pahlawan Masa Kini
          </div>
        </div>

        {/* Center: Main Nav Links */}
        <nav
          className="hidden md:flex items-center gap-1.5 lg:gap-2"
          aria-label="Navigasi Utama"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#003161] text-[#FFF4B7] shadow-inner border border-[#006A67]/40'
                    : 'text-white/80 hover:text-[#FFF4B7] hover:bg-[#003161]/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Golden Hour Status & Quick Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Timer or Status Pill */}
          {timerActive ? (
            <button
              onClick={() => setCurrentPage('protokol')}
              className="flex items-center gap-2 bg-[#006A67] hover:bg-[#00827e] px-3 sm:px-4 py-1.5 rounded-full text-[#FFF4B7] shadow-lg transition-all border border-[#FFF4B7]/40 cursor-pointer"
              title="Klik untuk melihat Protokol Darurat"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFF4B7] animate-ping"></span>
              <span className="font-extrabold text-xs sm:text-sm font-mono tracking-wider">
                {formatTime(secondsLeft)} SISA
              </span>
            </button>
          ) : (
            <button
              onClick={startEmergencyTimer}
              className="flex items-center gap-2 bg-[#001d1c] hover:bg-[#003161] px-3 sm:px-3.5 py-1.5 rounded-full border border-[#006A67] transition-all cursor-pointer"
              title="Klik jika butuh bantuan darurat 60 menit"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#84d4d0] animate-pulse"></span>
              <span className="text-[11px] sm:text-xs text-[#84d4d0] font-bold tracking-wider uppercase">
                Siaga Golden 60
              </span>
            </button>
          )}

          {/* Quick Access to Sesi Pendampingan / Dasbor Pos */}
          <div className="relative group">
            <button
              onClick={() =>
                setCurrentPage(currentPage === 'dasbor' ? 'pos' : 'dasbor')
              }
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                currentPage === 'dasbor' || currentPage === 'pendampingan'
                  ? 'bg-[#FFF4B7] text-[#000B58]'
                  : 'bg-[#003161] text-[#FFF4B7] hover:bg-[#006A67]'
              }`}
              title="Mode Koordinator / Relawan Pos"
              aria-label="Menu Koordinator & Pendamping"
            >
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer Row */}
      <div className="md:hidden flex items-center justify-around bg-[#000B58] border-t border-[#003161] px-2 py-1.5 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = currentPage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                setCurrentPage(item.key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#003161] text-[#FFF4B7]'
                  : 'text-white/70 hover:text-[#FFF4B7]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentPage('pendampingan')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
            currentPage === 'pendampingan' ? 'bg-[#006A67] text-white' : 'text-white/60'
          }`}
        >
          Pendampingan
        </button>
        <button
          onClick={() => setCurrentPage('dasbor')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
            currentPage === 'dasbor' ? 'bg-[#006A67] text-white' : 'text-white/60'
          }`}
        >
          Dasbor
        </button>
      </div>
    </header>
  );
};
