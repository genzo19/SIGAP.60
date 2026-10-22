import React from 'react';
import { useApp } from '../context/AppContext';
import { SigapLogo } from '../components/SigapLogo';

export const BerandaPage: React.FC = () => {
  const {
    startEmergencyTimer,
    setCurrentPage,
    secondsLeft,
    formatTime,
    timerActive,
  } = useApp();

  return (
    <div className="w-full flex flex-col gap-6 pb-6 max-w-[390px] mx-auto">
      {/* 1. HERO SECTION (Mobile Single Column) */}
      <section className="relative w-full rounded-2xl bg-[#000B58] p-5 shadow-xl border border-[#003161] overflow-hidden flex flex-col items-center text-center">
        {/* Ambient subtle tactical glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#003161]/50 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[#006A67]/30 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 w-full flex flex-col items-center gap-4">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-[#003161] px-3.5 py-1.5 rounded-full border border-[#006A67]/50 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#FFF4B7] animate-pulse"></span>
            <span className="text-[11px] font-extrabold text-[#FFF4B7] tracking-wider uppercase font-mono">
              PANDUAN DARURAT 60 MENIT
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-extrabold text-[#FFF4B7] tracking-tight leading-tight">
            Jam pertama menentukan.
          </h1>

          {/* Subline */}
          <p className="text-sm text-white/95 leading-relaxed">
            Teman sebaya yang menemanimu melapor penipuan digital dalam 60 menit lewat jalur resmi.
          </p>

          {/* Centered Countdown Ring */}
          <div className="w-full bg-[#003161]/80 border border-[#FFF4B7]/15 rounded-2xl p-4 flex flex-col items-center shadow-lg my-1">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <SigapLogo
                variant="icon"
                size={165}
                countdownSeconds={timerActive ? secondsLeft : 3600}
                totalSeconds={3600}
                animated={true}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#FFF4B7] tracking-tight font-mono leading-none">
                  {formatTime(secondsLeft)}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#FFF4B7]/80 font-bold mt-2">
                  {timerActive ? 'SISA WAKTU KRUSIAL' : 'MENIT PERTAMA'}
                </span>
              </div>
            </div>

            <div className="mt-2 bg-[#000B58] px-3 py-1.5 rounded-lg w-full border border-[#006A67]/40 text-center">
              <p className="text-[11px] text-[#84d4d0] font-bold">
                Golden Hour Penyelamatan Saldo &amp; Rekening Pelaku
              </p>
            </div>
            <p className="mt-1 text-[11px] text-white/70 text-center">
              Tindakan dalam 60 menit melipatgandakan peluang pembekuan rekening penampung.
            </p>
          </div>

          {/* Action Buttons: Full width & placed in lower half for thumb reach */}
          <div className="w-full flex flex-col gap-3 pt-2">
            <button
              onClick={startEmergencyTimer}
              className="w-full min-h-[52px] px-5 rounded-xl bg-[#006A67] active:bg-[#00827e] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#006A67]/40 border border-[#FFF4B7]/30 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-[#FFF4B7]">bolt</span>
              <span>Saya baru tertipu</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('pos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full min-h-[48px] px-5 rounded-xl bg-[#003161] hover:bg-[#003161]/80 text-[#FFF4B7] font-bold text-xs flex items-center justify-center gap-2 border border-[#FFF4B7]/20 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#84d4d0]">handshake</span>
              <span>Saya ingin jadi pendamping</span>
            </button>
          </div>

          {/* Reassurance Metadata */}
          <div className="flex items-center gap-1.5 text-white/70 text-[11px] text-center pt-1">
            <span className="material-symbols-outlined text-[#84d4d0] text-[15px] shrink-0">
              verified_user
            </span>
            <span>Didampingi mahasiswa • Alur OJK IASC • 100% Gratis</span>
          </div>
        </div>
      </section>

      {/* 2. STAT CARDS (Stacked Vertically for 390px base width) */}
      <section className="flex flex-col gap-3">
        {/* Card 1 */}
        <div className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-4 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-white/70 font-bold">
              Keterlambatan Melapor
            </span>
            <span className="material-symbols-outlined text-[#84d4d0] text-[20px]">
              history_toggle_off
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#FFF4B7] tracking-tight font-mono">
            80%
          </div>
          <p className="text-xs text-white font-medium mt-0.5">
            korban melapor lebih dari 12 jam setelah kejadian
          </p>
          <div className="mt-2 pt-1 border-t border-[#000B58]">
            <span className="text-[11px] text-[#ffb4ab] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
              Peluang blokir saldo menurun tajam
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-4 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-white/70 font-bold">
              Kecepatan Pelaku
            </span>
            <span className="material-symbols-outlined text-[#84d4d0] text-[20px]">timer</span>
          </div>
          <div className="text-3xl font-extrabold text-[#FFF4B7] tracking-tight font-mono">
            &lt; 1 jam
          </div>
          <p className="text-xs text-white font-medium mt-0.5">
            dana pelaku dapat berpindah ke rekening layer berikutnya
          </p>
          <div className="mt-2 pt-1 border-t border-[#000B58]">
            <span className="text-[11px] text-[#FFF4B7] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#84d4d0]">speed</span>
              Butuh tindakan seketika di menit 0-60
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-4 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-white/70 font-bold">
              Rekapitulasi Nasional
            </span>
            <span className="material-symbols-outlined text-[#84d4d0] text-[20px]">database</span>
          </div>
          <div className="text-3xl font-extrabold text-[#FFF4B7] tracking-tight font-mono">
            636.014
          </div>
          <p className="text-xs text-white font-medium mt-0.5">
            laporan masuk ke IASC (s.d. 30 Jul 2026)
          </p>
          <div className="mt-2 pt-1 border-t border-[#000B58]">
            <span className="text-[11px] text-[#84d4d0] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">hub</span>
              Terintegrasi jaringan anti-fraud perbankan
            </span>
          </div>
        </div>

        <div className="text-right pr-1">
          <span className="text-[10px] text-white/50">
            Sumber data: OJK &amp; Laporan Berkala Penipuan Finansial, 2026
          </span>
        </div>
      </section>

      {/* 3. BAGAIMANA SIGAP 60 BEKERJA (Stacked Steps) */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-[#84d4d0] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">account_tree</span>
            Alur Pendampingan Terstruktur
          </div>
          <h2 className="text-xl font-bold text-[#FFF4B7]">
            Bagaimana SIGAP 60 bekerja
          </h2>
          <p className="text-xs text-white/80 leading-relaxed">
            Relawan mendampingimu langkah demi langkah tanpa panik, memastikan bukti valid dan tersampaikan ke kanal resmi.
          </p>
        </div>

        {/* 4 Steps Stacked Vertically */}
        <div className="flex flex-col gap-2.5">
          {/* Step 1 */}
          <div
            onClick={() => {
              setCurrentPage('protokol');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-4 flex flex-col gap-2 cursor-pointer active:border-[#006A67] transition-all min-h-[48px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#006A67] flex items-center justify-center text-[#FFF4B7] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </div>
                <h3 className="text-sm font-bold text-white">1. Hubungi Bank</h3>
              </div>
              <span className="text-[10px] font-extrabold text-[#FFF4B7] px-2 py-0.5 rounded-full bg-[#000B58] border border-[#FFF4B7]/20">
                01
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Minta pemblokiran rekening tujuan &amp; penundaan transaksi seketika via fraud center bank.
            </p>
            <div className="text-[10px] text-[#84d4d0] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">alarm</span>
              Prioritas Menit 0 - 15
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => {
              setCurrentPage('protokol');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-4 flex flex-col gap-2 cursor-pointer active:border-[#006A67] transition-all min-h-[48px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#006A67] flex items-center justify-center text-[#FFF4B7] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">policy</span>
                </div>
                <h3 className="text-sm font-bold text-white">2. Lapor ke IASC</h3>
              </div>
              <span className="text-[10px] font-extrabold text-[#FFF4B7] px-2 py-0.5 rounded-full bg-[#000B58] border border-[#FFF4B7]/20">
                02
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Kanal terpadu <em>iasc.ojk.go.id</em> untuk sinkronisasi pemblokiran rekening penipu antarbank.
            </p>
            <div className="text-[10px] text-[#84d4d0] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">sync</span>
              Prioritas Menit 15 - 30
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => {
              setCurrentPage('protokol');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-4 flex flex-col gap-2 cursor-pointer active:border-[#006A67] transition-all min-h-[48px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#006A67] flex items-center justify-center text-[#FFF4B7] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">folder_zip</span>
                </div>
                <h3 className="text-sm font-bold text-white">3. Simpan Bukti</h3>
              </div>
              <span className="text-[10px] font-extrabold text-[#FFF4B7] px-2 py-0.5 rounded-full bg-[#000B58] border border-[#FFF4B7]/20">
                03
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Amankan tangkapan layar mutasi transaksi, chat utuh, identitas penipu, dan file APK.
            </p>
            <div className="text-[10px] text-[#84d4d0] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">inventory_2</span>
              Prioritas Menit 30 - 45
            </div>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => {
              setCurrentPage('protokol');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-4 flex flex-col gap-2 cursor-pointer active:border-[#006A67] transition-all min-h-[48px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#006A67] flex items-center justify-center text-[#FFF4B7] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                </div>
                <h3 className="text-sm font-bold text-white">4. Hubungi 157</h3>
              </div>
              <span className="text-[10px] font-extrabold text-[#FFF4B7] px-2 py-0.5 rounded-full bg-[#000B58] border border-[#FFF4B7]/20">
                04
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Eskalasi pengaduan resmi ke Layanan Konsumen OJK 157 via telepon darurat atau WhatsApp terverifikasi.
            </p>
            <div className="text-[10px] text-[#84d4d0] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Prioritas Menit 45 - 60
            </div>
          </div>
        </div>
      </section>

      {/* 4. SAFETY PRINCIPLES BANNER */}
      <section className="w-full rounded-2xl bg-[#003161] border border-[#FFF4B7]/20 p-4 shadow-lg flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#000B58] border border-[#006A67] flex items-center justify-center text-[#84d4d0] shrink-0">
            <span className="material-symbols-outlined text-[22px]">drive_file_rename_outline</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#FFF4B7] block">
              Prinsip Perlindungan Relawan
            </span>
            <span className="text-[10px] text-[#84d4d0] font-semibold">
              Protokol Teruji Bela Negara
            </span>
          </div>
        </div>
        <p className="text-xs text-white/90 leading-relaxed">
          Pendamping sebaya <span className="text-[#FFF4B7] font-bold underline underline-offset-2">TIDAK PERNAH</span> meminta OTP, kata sandi, PIN transaksi, atau menguasai uang Anda dalam bentuk apapun. Seluruh laporan dipandu langsung ke otoritas resmi.
        </p>
      </section>

      {/* 5. LEGAL DISCLAIMER */}
      <div className="text-center py-2 px-1">
        <p className="text-[10px] text-white/60 leading-relaxed">
          <span className="text-[#FFF4B7] font-semibold">Catatan Otoritas:</span> SIGAP 60 adalah inisiatif gotong-royong teman sebaya dan hanya memandu proses tanggap darurat. Keputusan mutlak pembekuan rekening sepenuhnya berada di bank terkait dan otoritas OJK/IASC.
        </p>
      </div>
    </div>
  );
};
