import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, replaySplash } = useApp();

  return (
    <footer className="w-full bg-[#00083b] border-t border-[#003161] text-white/80 py-10 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          {/* Column 1: Principles */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#84d4d0] text-[20px]">
                security
              </span>
              <span className="text-sm font-bold text-[#FFF4B7]">
                Prinsip Integritas Relawan &amp; Keamanan Data
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-xl">
              Relawan dan pendamping sebaya SIGAP 60 tidak pernah meminta kata sandi (password), kode OTP, PIN perbankan, atau memegang dana korban dalam bentuk apapun. Layanan ini murni asistensi de-eskalasi kepanikan, mitigasi teknis, dan pendokumentasian bukti digital.
            </p>
          </div>

          {/* Column 2: Legal status */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#84d4d0] text-[20px]">
                gavel
              </span>
              <span className="text-sm font-bold text-[#FFF4B7]">
                Status Hukum &amp; Batasan Otoritas
              </span>
            </div>
            <p className="text-xs text-[#FFF4B7]/90 leading-relaxed font-semibold">
              Bukan situs resmi OJK/IASC. SIGAP 60 hanya memandu; keputusan pemblokiran ada di bank dan OJK.
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              Seluruh tindakan pembekuan rekening sepenuhnya tunduk pada regulasi perbankan Republik Indonesia dan kewenangan Otoritas Jasa Keuangan (OJK).
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#003161]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-center sm:text-left">
            <span>© 2025 SIGAP 60. Platform Gotong Royong Tanggap Penipuan Finansial Digital Kampus.</span>
            <button
              onClick={replaySplash}
              className="text-[#84d4d0] hover:text-[#FFF4B7] underline transition-colors cursor-pointer"
            >
              Putar Ulang Intro Logo
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentPage('pendampingan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#FFF4B7] transition-colors cursor-pointer"
            >
              Mode Pendamping Laporan
            </button>
            <button
              onClick={() => {
                setCurrentPage('dasbor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#FFF4B7] transition-colors cursor-pointer"
            >
              Dasbor Pos
            </button>
            <span className="text-[#84d4d0] font-semibold">Golden Hour Protocol Engine</span>
            <span>Bela Negara Siber</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
