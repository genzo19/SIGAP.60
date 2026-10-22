import React from 'react';
import { useApp } from '../context/AppContext';
import { SigapLogo } from './SigapLogo';

export const SplashLoader: React.FC = () => {
  const { showSplash, dismissSplash } = useApp();

  if (!showSplash) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000B58] text-[#FFF4B7] select-none transition-opacity duration-700"
      aria-label="Memuat SIGAP 60"
    >
      {/* Subtle ambient tactical glow in background */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#003161]/40 blur-3xl pointer-events-none"></div>
      <div className="absolute w-[280px] h-[280px] rounded-full bg-[#006A67]/25 blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md animate-fade-in">
        {/* Animated 3.2s Logo */}
        <div className="relative mb-6">
          <SigapLogo
            variant="icon"
            size={180}
            animated={true}
            isIntroSplash={true}
          />
        </div>

        {/* Wordmark and Tagline */}
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-2">
            <span
              className="text-4xl font-extrabold tracking-[0.22em] text-[#FFF4B7]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              SIGAP
            </span>
            <span
              className="text-4xl font-extrabold text-[#006A67] border-b-2 border-[#FFF4B7]/80 pb-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              60
            </span>
          </div>
          <span className="text-xs uppercase tracking-widest text-white/70 font-semibold mt-2">
            Peer Response Network • Bela Negara Siber
          </span>
          <p className="text-sm text-[#FFF4B7]/90 font-medium mt-3 italic">
            “Jam pertama menentukan.”
          </p>
        </div>

        {/* Skip button for quick user access */}
        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={dismissSplash}
            className="px-5 py-2 rounded-xl bg-[#003161] hover:bg-[#006A67] text-[#FFF4B7] text-xs font-bold transition-all border border-[#006A67]/50 shadow-md flex items-center gap-2"
          >
            <span>Lewati Intro</span>
            <span className="material-symbols-outlined text-[16px]">fast_forward</span>
          </button>
        </div>
      </div>

      {/* Authority footer note */}
      <div className="absolute bottom-6 text-center px-4 text-[11px] text-white/50 max-w-lg">
        Bukan situs resmi OJK/IASC. SIGAP 60 hanya memandu; keputusan pemblokiran ada di bank dan OJK.
      </div>
    </div>
  );
};
