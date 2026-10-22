import React from 'react';
import { useApp } from '../context/AppContext';
import { SigapLogo } from './SigapLogo';
import { PageType } from '../types';

export const MobileTopBar: React.FC = () => {
  const { currentPage, setCurrentPage, secondsLeft, formatTime, timerActive } = useApp();

  const getPageTitle = (page: PageType): string => {
    switch (page) {
      case 'beranda':
        return 'SIGAP 60';
      case 'protokol':
        return 'Protokol 60 Menit';
      case 'pos':
        return 'Pos Pendamping';
      case 'latihan':
        return 'Drill Refleks';
      case 'data':
        return 'Data & Riset';
      case 'pendampingan':
        return 'Sesi Pendampingan';
      case 'dasbor':
        return 'Dasbor Pos Kampus';
      default:
        return 'SIGAP 60';
    }
  };

  const showCountdownChip = currentPage === 'protokol' || currentPage === 'pendampingan';

  return (
    <div className="sticky top-0 z-40 w-full bg-[#000B58]/95 backdrop-blur-md border-b border-[#003161] px-4 h-14 flex items-center justify-between shrink-0 shadow-md">
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        {currentPage === 'pendampingan' ? (
          <button
            onClick={() => setCurrentPage('pos')}
            className="w-8 h-8 rounded-lg bg-[#003161] text-[#FFF4B7] flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Kembali ke Pos"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentPage('beranda')}
            className="flex items-center gap-2 shrink-0 cursor-pointer focus:outline-none"
            aria-label="Beranda SIGAP 60"
          >
            <SigapLogo variant="icon" size={28} />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <h1 className="text-sm font-extrabold text-[#FFF4B7] tracking-tight truncate leading-tight">
            {getPageTitle(currentPage)}
          </h1>
          <span className="text-[10px] text-[#84d4d0] font-semibold tracking-wider uppercase leading-none truncate">
            Bela Negara Siber
          </span>
        </div>
      </div>

      {/* Right: Countdown Chip if on Protokol or Pendampingan */}
      <div className="flex items-center gap-2 shrink-0">
        {showCountdownChip && (
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold border shadow-sm ${
              timerActive
                ? 'bg-[#006A67] text-[#FFF4B7] border-[#FFF4B7]/40'
                : 'bg-[#003161] text-[#FFF4B7] border-[#006A67]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FFF4B7] animate-pulse"></span>
            <span>{formatTime(secondsLeft)}</span>
          </div>
        )}

        {/* Status chip if not on countdown pages */}
        {!showCountdownChip && (
          <div className="flex items-center gap-1 bg-[#003161] px-2.5 py-1 rounded-full text-[10px] font-bold text-[#84d4d0] border border-[#006A67]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84d4d0] animate-ping"></span>
            <span>Siaga 60</span>
          </div>
        )}
      </div>
    </div>
  );
};
