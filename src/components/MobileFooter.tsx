import React from 'react';
import { useApp } from '../context/AppContext';

export const MobileFooter: React.FC = () => {
  const { replaySplash, setCurrentPage } = useApp();

  return (
    <footer className="w-full max-w-[390px] mx-auto mt-6 pt-5 pb-6 border-t border-[#003161] flex flex-col gap-3 text-center px-2">
      <div className="flex items-center justify-center gap-1.5 text-xs text-[#FFF4B7] font-semibold">
        <span className="material-symbols-outlined text-[16px] text-[#84d4d0]">shield</span>
        <span>SIGAP 60 • Gerakan Mahasiswa Bela Negara Siber</span>
      </div>

      {/* Mandatory exact institutional disclaimer */}
      <p className="text-[11px] text-[#FFF4B7]/90 font-medium leading-relaxed bg-[#003161]/50 p-2.5 rounded-xl border border-[#006A67]/30">
        Bukan situs resmi OJK/IASC. SIGAP 60 hanya memandu; keputusan pemblokiran ada di bank dan OJK.
      </p>

      <div className="flex items-center justify-center gap-3 text-[10px] text-white/60">
        <button
          onClick={replaySplash}
          className="hover:text-[#FFF4B7] underline transition-colors cursor-pointer"
        >
          Putar Ulang Intro Logo
        </button>
        <span>•</span>
        <button
          onClick={() => {
            setCurrentPage('pendampingan');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:text-[#FFF4B7] underline transition-colors cursor-pointer"
        >
          Form Pendamping
        </button>
        <span>•</span>
        <span>v2.4 Mobile</span>
      </div>
    </footer>
  );
};
