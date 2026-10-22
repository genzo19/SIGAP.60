import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SigapLogo } from '../components/SigapLogo';

export const ProtokolPage: React.FC = () => {
  const {
    secondsLeft,
    formatTime,
    timerActive,
    stepStates,
    toggleStep,
    evidenceChecks,
    toggleEvidenceCheck,
    allStepsDone,
    completedStepsCount,
    setCurrentPage,
    openChatModal,
  } = useApp();

  const [copied, setCopied] = useState(false);

  const csDraftText = `"Halo Petugas, saya melaporkan transaksi mencurigakan dugaan tindak pidana penipuan pada [WAKTU]. Mohon segera dilakukan pemblokiran/penundaan transaksi pada rekening tujuan [NAMA BANK] No. Rekening [NOMOR REKENING PELAKU] atas nama [NAMA PELAKU] sebesar Rp [NOMINAL]. Bukti transaksi lengkap sudah saya amankan."`;

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(csDraftText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const progressPercent = (completedStepsCount / 4) * 100;

  return (
    <div className="w-full flex flex-col gap-6 pb-6 max-w-[390px] mx-auto">
      {/* Top Golden Hour Status Banner (Mobile Stacked) */}
      <section className="w-full bg-[#003161] rounded-2xl p-5 shadow-xl border border-[#FFF4B7]/15 relative overflow-hidden flex flex-col gap-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#006A67] text-[#FFF4B7] text-[10px] font-bold tracking-wider uppercase border border-[#FFF4B7]/30 self-start shadow-sm">
          <span className="material-symbols-outlined text-[14px]">timer</span>
          GOLDEN HOUR REKENING
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold text-[#FFF4B7] tracking-tight">
            Protokol Tanggap 60 Menit
          </h1>
          <p className="text-xs text-white/90 leading-relaxed">
            Lakukan 4 tindakan darurat ini secepatnya sebelum dana penipu dialihkan ke multi-rekening jaringan pencucian uang.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-[#000B58]/90 p-4 rounded-xl border border-[#003161]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-white">Status Tindakan</span>
            <span className="text-xs font-bold text-[#FFF4B7]">
              {completedStepsCount} dari 4 Selesai ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#003161] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#006A67] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-white/70 mt-1.5 truncate">
            Prioritas Saat Ini:{' '}
            <span className="text-[#FFF4B7] font-semibold">
              {!stepStates[1]
                ? 'Hubungi Bank Pengirim'
                : !stepStates[2]
                ? 'Lapor ke IASC OJK'
                : !stepStates[3]
                ? 'Simpan Bukti Digital'
                : !stepStates[4]
                ? 'Hubungi Kontak 157'
                : 'Semua Protokol Dituntaskan!'}
            </span>
          </p>
        </div>

        {/* Compact Countdown Visual */}
        <div className="flex items-center justify-between bg-[#000B58] p-3 rounded-xl border border-[#006A67]/40">
          <div className="flex items-center gap-3">
            <SigapLogo
              variant="icon"
              size={54}
              countdownSeconds={timerActive ? secondsLeft : 3600}
              totalSeconds={3600}
              animated={true}
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-[#FFF4B7] font-mono leading-none">
                {formatTime(secondsLeft)}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-white/70 font-bold mt-0.5">
                Sisa Waktu Penyelamatan Saldo
              </span>
            </div>
          </div>
          <div className="text-[10px] bg-[#006A67] text-[#FFF4B7] px-2 py-1 rounded font-bold uppercase shrink-0">
            {timerActive ? 'Aktif' : 'Siaga'}
          </div>
        </div>
      </section>

      {/* Cream Success Card when all done */}
      {allStepsDone && (
        <div className="w-full bg-[#FFF4B7] text-[#000B58] rounded-2xl p-5 shadow-xl border-2 border-white animate-fade-in flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#006A67] font-bold">
              task_alt
            </span>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-tight">
                SELURUH 4 TINDAKAN DARURAT SELESAI
              </h3>
              <p className="text-[11px] font-semibold text-[#000B58]/80">
                Kamu telah menuntaskan langkah penyelamatan Golden Hour.
              </p>
            </div>
          </div>
          <p className="text-xs font-medium leading-relaxed">
            Simpan nomor tiket laporan IASC OJK dan nomor aduan bank. Lanjutkan pengawalan laporan dengan relawan kampus.
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                setCurrentPage('pos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full min-h-[48px] rounded-xl bg-[#000B58] text-[#FFF4B7] font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
            >
              Cari Posko Kampus Terdekat
            </button>
            <button
              onClick={() => {
                setCurrentPage('pendampingan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full min-h-[48px] rounded-xl bg-[#006A67] text-white font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
            >
              Buka Sesi Pendampingan Laporan
            </button>
          </div>
        </div>
      )}

      {/* Cream Warning Box (Mandatory Alert Styling) */}
      <div className="w-full bg-[#FFF4B7] text-[#000B58] rounded-2xl p-4 shadow-md border border-[#FFF4B7] flex items-start gap-3">
        <span className="material-symbols-outlined text-[#000B58] text-[24px] shrink-0 mt-0.5 font-bold">
          warning
        </span>
        <div className="flex flex-col">
          <h4 className="text-xs font-extrabold text-[#000B58] uppercase tracking-wider mb-1">
            PERINGATAN KEAMANAN KRUSIAL
          </h4>
          <p className="text-xs text-[#000B58] font-bold leading-relaxed">
            Jangan pernah membagikan kata sandi, PIN, atau kode OTP kepada siapa pun, termasuk pendamping sebaya atau pihak mana pun yang mengaku sebagai petugas bank atau aparat keamanan.
          </p>
        </div>
      </div>

      {/* 4 Steps Operational Checklist (Stacked Vertically) */}
      <section className="flex flex-col gap-4">
        {/* Step 01: Hubungi Bank */}
        <article
          className={`bg-[#003161] rounded-2xl p-5 shadow-md transition-all border ${
            stepStates[1] ? 'border-[#006A67] ring-1 ring-[#006A67]' : 'border-[#FFF4B7]/10'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#000B58] text-[#FFF4B7] text-xs flex items-center justify-center font-bold border border-[#FFF4B7]/20 shrink-0">
                01
              </span>
              <div>
                <span className="px-2 py-0.5 rounded bg-[#006A67] text-[#FFF4B7] text-[10px] font-bold uppercase">
                  TINDAKAN PRIMER
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Hubungi bank / e-wallet pengirim &amp; penerima
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/90 mb-4 leading-relaxed">
            Minta penundaan transaksi seketika dan sebutkan secara tegas nomor rekening tujuan penipu. Informasikan bahwa transaksi terindikasi tindak pidana fraud siber.
          </p>

          {/* Call Center Hotline Matrix (2x2 with min-h-[48px]) */}
          <div className="bg-[#000B58] rounded-xl p-3 border border-[#003161] mb-4">
            <span className="text-[10px] text-white/70 uppercase tracking-wider block mb-2 font-semibold">
              Call Center Bebas Pulsa Darurat:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:14017"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#003161] hover:bg-[#006A67] transition-all min-h-[48px] border border-[#FFF4B7]/10 px-3"
              >
                <span className="text-xs font-bold text-[#FFF4B7]">BRI</span>
                <span className="text-xs font-mono font-bold text-white">14017</span>
              </a>
              <a
                href="tel:1500888"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#003161] hover:bg-[#006A67] transition-all min-h-[48px] border border-[#FFF4B7]/10 px-3"
              >
                <span className="text-xs font-bold text-[#FFF4B7]">BCA</span>
                <span className="text-xs font-mono font-bold text-white">1500888</span>
              </a>
              <a
                href="tel:14000"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#003161] hover:bg-[#006A67] transition-all min-h-[48px] border border-[#FFF4B7]/10 px-3"
              >
                <span className="text-xs font-bold text-[#FFF4B7]">Mandiri</span>
                <span className="text-xs font-mono font-bold text-white">14000</span>
              </a>
              <a
                href="tel:1500046"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#003161] hover:bg-[#006A67] transition-all min-h-[48px] border border-[#FFF4B7]/10 px-3"
              >
                <span className="text-xs font-bold text-[#FFF4B7]">BNI</span>
                <span className="text-xs font-mono font-bold text-white">1500046</span>
              </a>
            </div>
          </div>

          {/* Toggle Step Button (Full width min-h-[48px]) */}
          <button
            onClick={() => toggleStep(1)}
            className={`w-full min-h-[48px] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              stepStates[1]
                ? 'bg-[#006A67] text-[#FFF4B7] shadow'
                : 'bg-[#000B58] text-white/80 hover:bg-[#006A67] border border-[#003161]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {stepStates[1] ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <span>{stepStates[1] ? 'Langkah 1: Selesai' : 'Tandai Selesai Langkah 1'}</span>
          </button>
        </article>

        {/* Step 02: Lapor di IASC OJK */}
        <article
          className={`bg-[#003161] rounded-2xl p-5 shadow-md transition-all border ${
            stepStates[2] ? 'border-[#006A67] ring-1 ring-[#006A67]' : 'border-[#FFF4B7]/10'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#000B58] text-[#FFF4B7] text-xs flex items-center justify-center font-bold border border-[#FFF4B7]/20 shrink-0">
                02
              </span>
              <div>
                <span className="px-2 py-0.5 rounded bg-[#000B58] text-[#FFF4B7] text-[10px] font-semibold uppercase border border-[#006A67]/40">
                  PORTAL RESMI OJK
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Lapor di iasc.ojk.go.id (Anti-Scam Center)
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/90 mb-4 leading-relaxed">
            Isi laporan lewat portal Satgas PASTI / IASC OJK. Pastikan URL peramban adalah persis{' '}
            <code className="bg-[#000B58] text-[#FFF4B7] px-1.5 py-0.5 rounded font-mono font-bold">
              iasc.ojk.go.id
            </code>.
          </p>

          {/* External Link strictly to https://iasc.ojk.go.id (Full width min-h-[48px]) */}
          <div className="flex flex-col gap-2.5 mb-4">
            <a
              href="https://iasc.ojk.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] rounded-xl bg-[#FFF4B7] text-[#000B58] hover:bg-white text-xs font-extrabold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>Kunjungi iasc.ojk.go.id</span>
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            </a>
            <span className="text-[10px] text-white/60 text-center">
              Perlu waktu ± 4 menit untuk melengkapi data rekening tujuan.
            </span>
          </div>

          {/* Toggle Step Button */}
          <button
            onClick={() => toggleStep(2)}
            className={`w-full min-h-[48px] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              stepStates[2]
                ? 'bg-[#006A67] text-[#FFF4B7] shadow'
                : 'bg-[#000B58] text-white/80 hover:bg-[#006A67] border border-[#003161]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {stepStates[2] ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <span>{stepStates[2] ? 'Langkah 2: Selesai' : 'Tandai Selesai Langkah 2'}</span>
          </button>
        </article>

        {/* Step 03: Simpan Bukti */}
        <article
          className={`bg-[#003161] rounded-2xl p-5 shadow-md transition-all border ${
            stepStates[3] ? 'border-[#006A67] ring-1 ring-[#006A67]' : 'border-[#FFF4B7]/10'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#000B58] text-[#FFF4B7] text-xs flex items-center justify-center font-bold border border-[#FFF4B7]/20 shrink-0">
                03
              </span>
              <div>
                <span className="px-2 py-0.5 rounded bg-[#006A67] text-[#FFF4B7] text-[10px] font-bold uppercase">
                  DOKUMENTASI LEGAL
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Amankan &amp; Simpan Barang Bukti Digital
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/90 mb-3 leading-relaxed">
            Tangkapan layar mutasi transaksi, chat utuh sebelum dihapus, dan log nomor penipu.
          </p>

          {/* Checkboxes with min-h-[48px] tap containers */}
          <div className="bg-[#000B58] rounded-xl p-3 flex flex-col gap-2 border border-[#003161] mb-4">
            <label className="flex items-center gap-2.5 cursor-pointer min-h-[48px] p-1.5 rounded-lg hover:bg-[#003161]/50 select-none">
              <input
                type="checkbox"
                checked={evidenceChecks.mutasi}
                onChange={() => toggleEvidenceCheck('mutasi')}
                className="w-5 h-5 rounded accent-[#006A67] shrink-0"
              />
              <span className="text-xs text-white">
                Tangkapan layar mutasi bank / resi transfer lengkap dengan nomor referensi unik.
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer min-h-[48px] p-1.5 rounded-lg hover:bg-[#003161]/50 select-none">
              <input
                type="checkbox"
                checked={evidenceChecks.chat}
                onChange={() => toggleEvidenceCheck('chat')}
                className="w-5 h-5 rounded accent-[#006A67] shrink-0"
              />
              <span className="text-xs text-white">
                Tangkapan layar chat WhatsApp / Telegram tanpa dipotong (nomor terlihat).
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer min-h-[48px] p-1.5 rounded-lg hover:bg-[#003161]/50 select-none">
              <input
                type="checkbox"
                checked={evidenceChecks.apk}
                onChange={() => toggleEvidenceCheck('apk')}
                className="w-5 h-5 rounded accent-[#006A67] shrink-0"
              />
              <span className="text-xs text-white">
                Log riwayat panggilan, tautan APK, atau nama file unduhan yang mencurigakan.
              </span>
            </label>
          </div>

          {/* Toggle Step Button */}
          <button
            onClick={() => toggleStep(3)}
            className={`w-full min-h-[48px] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              stepStates[3]
                ? 'bg-[#006A67] text-[#FFF4B7] shadow'
                : 'bg-[#000B58] text-white/80 hover:bg-[#006A67] border border-[#003161]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {stepStates[3] ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <span>{stepStates[3] ? 'Langkah 3: Selesai' : 'Tandai Selesai Langkah 3'}</span>
          </button>
        </article>

        {/* Step 04: Kontak OJK 157 */}
        <article
          className={`bg-[#003161] rounded-2xl p-5 shadow-md transition-all border ${
            stepStates[4] ? 'border-[#006A67] ring-1 ring-[#006A67]' : 'border-[#FFF4B7]/10'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#000B58] text-[#FFF4B7] text-xs flex items-center justify-center font-bold border border-[#FFF4B7]/20 shrink-0">
                04
              </span>
              <div>
                <span className="px-2 py-0.5 rounded bg-[#000B58] text-[#FFF4B7] text-[10px] font-semibold uppercase border border-[#006A67]/40">
                  KONSULTASI KONSUMEN
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Hubungi Kontak OJK 157
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/90 mb-4 leading-relaxed">
            Telepon 157 untuk konsultasi lanjutan dan pengaduan konsumen jasa keuangan terpadu.
          </p>

          <div className="flex flex-col gap-2 mb-4">
            <a
              href="tel:157"
              className="w-full min-h-[48px] rounded-xl bg-[#006A67] text-[#FFF4B7] hover:bg-[#00827e] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow"
            >
              <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
              <span>Telepon Kontak 157</span>
            </a>

            <a
              href="https://wa.me/6281157157157"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] rounded-xl bg-[#000B58] text-white hover:text-[#FFF4B7] text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-[#006A67]/40"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp Resmi OJK (081-157-157-157)</span>
            </a>
          </div>

          {/* Toggle Step Button */}
          <button
            onClick={() => toggleStep(4)}
            className={`w-full min-h-[48px] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              stepStates[4]
                ? 'bg-[#006A67] text-[#FFF4B7] shadow'
                : 'bg-[#000B58] text-white/80 hover:bg-[#006A67] border border-[#003161]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {stepStates[4] ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            <span>{stepStates[4] ? 'Langkah 4: Selesai' : 'Tandai Selesai Langkah 4'}</span>
          </button>
        </article>
      </section>

      {/* Draf Laporan CS Bank Box */}
      <section className="w-full bg-[#003161] rounded-2xl p-5 shadow-md border border-[#FFF4B7]/10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FFF4B7] text-[18px]">
              description
            </span>
            <h4 className="text-sm font-bold text-[#FFF4B7]">Draf Laporan Cepat CS Bank</h4>
          </div>
          <span className="text-[10px] bg-[#000B58] text-white/80 px-2 py-0.5 rounded font-mono">
            Format Resmi
          </span>
        </div>

        <p className="text-xs text-white/80 leading-relaxed">
          Bacakan atau salin teks ini saat terhubung dengan CS Bank:
        </p>

        <div className="bg-[#000B58] rounded-xl p-3 font-mono text-white/90 text-[11px] leading-relaxed select-all border border-[#003161]">
          {csDraftText}
        </div>

        <button
          onClick={handleCopyDraft}
          className={`w-full min-h-[48px] rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow cursor-pointer ${
            copied
              ? 'bg-[#FFF4B7] text-[#000B58]'
              : 'bg-[#006A67] text-[#FFF4B7] hover:bg-[#00827e]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {copied ? 'done_all' : 'content_copy'}
          </span>
          <span>{copied ? 'Draf Berhasil Disalin!' : 'Salin Draf Laporan'}</span>
        </button>
      </section>

      {/* Solidarity Card */}
      <section className="w-full bg-[#003161] rounded-2xl p-5 shadow-md border border-[#FFF4B7]/10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#006A67] text-[#FFF4B7] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">groups</span>
          </div>
          <div>
            <span className="text-[10px] text-[#FFF4B7] uppercase tracking-wider font-bold">
              SOLIDARITAS KAMPUS
            </span>
            <h4 className="text-sm font-bold text-white">Minta Pendamping Sebaya</h4>
          </div>
        </div>

        <p className="text-xs text-white/90 leading-relaxed">
          Relawan mahasiswa terlatih Bela Negara siap mendampingi pelaporan ke bank &amp; posko kampus terdekat (100% Bebas Biaya).
        </p>

        <button
          onClick={() => openChatModal('Pos SIGAP UKM Menwa')}
          className="w-full min-h-[48px] rounded-xl bg-[#FFF4B7] text-[#000B58] hover:bg-white text-xs font-extrabold flex items-center justify-center gap-2 shadow cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">support_agent</span>
          <span>Hubungi Posko Pendamping Terdekat</span>
        </button>
      </section>
    </div>
  );
};
