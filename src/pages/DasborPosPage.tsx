import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const DasborPosPage: React.FC = () => {
  const { incidentLogs, setCurrentPage } = useApp();

  const [isSendingOJK, setIsSendingOJK] = useState(false);
  const [ojkSentSuccess, setOjkSentSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Compute dynamic stats directly from in-memory state
  const totalCases = incidentLogs.length;

  const modusCounts: Record<string, number> = {
    belanja: 0,
    impersonasi: 0,
    investasi: 0,
    loker: 0,
    medsos: 0,
  };

  const timeCounts: Record<string, number> = {
    '<30': 0,
    '30-60': 0,
    '1-12': 0,
    '>12': 0,
  };

  let casesWithin60 = 0;

  incidentLogs.forEach((log) => {
    if (log.modus === 'apk' || log.modus === 'belanja') modusCounts.belanja++;
    else if (log.modus === 'impersonasi') modusCounts.impersonasi++;
    else if (log.modus === 'investasi') modusCounts.investasi++;
    else if (log.modus === 'loker') modusCounts.loker++;
    else if (log.modus === 'medsos') modusCounts.medsos++;

    if (timeCounts[log.timeToReport] !== undefined) {
      timeCounts[log.timeToReport]++;
    }

    if (log.isWithin60Min) {
      casesWithin60++;
    }
  });

  const percentWithin60 = totalCases > 0 ? Math.round((casesWithin60 / totalCases) * 100) : 72;

  // Real browser CSV export
  const handleDownloadCsv = () => {
    setIsDownloading(true);
    const headers = 'ID_Anonim,Timestamp,Kategori_Modus,Latensi_Waktu,Status_Laporan,Golden_Hour_Tercapai\n';
    const rows = incidentLogs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.modusLabel}","${l.timeLabel}","${l.statusLabel}","${
            l.isWithin60Min ? 'YA' : 'TIDAK'
          }"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sigap60-laporan-agregat-anonim-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 1200);
  };

  // Interactive OJK send simulation
  const handleSendOjk = () => {
    setIsSendingOJK(true);
    setTimeout(() => {
      setIsSendingOJK(false);
      setOjkSentSuccess(true);
      setTimeout(() => setOjkSentSuccess(false), 5000);
    }, 1300);
  };

  return (
    <div className="w-full flex flex-col gap-10 md:gap-12 pb-16">
      {/* Top Desktop Navigation & Switcher Bar */}
      <div className="w-full bg-[#003161] border border-[#FFF4B7]/20 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <button
          onClick={() => {
            setCurrentPage('pos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#000B58] hover:bg-[#00083b] text-[#FFF4B7] text-sm font-bold flex items-center gap-2 border border-[#006A67] shadow transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Kembali ke Pos Pendamping (Mode Ponsel)</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84d4d0] animate-pulse"></span>
          <span>TAMPILAN DESKTOP PENUH KHUSUS KOORDINATOR POS</span>
        </div>
      </div>

      {/* Top Subheader Banner */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#003161] text-[#84d4d0] text-xs font-bold uppercase tracking-wider border border-[#006A67]/40">
              <span className="material-symbols-outlined text-[15px]">shield_person</span>
              KHUSUS KOORDINATOR POS KAMPUS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#000B58] text-[#FFF4B7] text-xs font-semibold uppercase tracking-wider border border-[#003161]">
              <span className="material-symbols-outlined text-[15px] text-[#84d4d0]">analytics</span>
              MODUL MONITORING AGREGAT
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#003161] px-3.5 py-1.5 rounded-lg border border-[#FFF4B7]/10 text-xs text-white">
            <span className="material-symbols-outlined text-[#84d4d0] text-[18px]">hub</span>
            <span>Pos UKM &amp; Relawan Kampus Terpadu (Zona Jawa &amp; Regional)</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#FFF4B7] tracking-tight">
              Dasbor Pos: Umpan Balik Anonim
            </h1>
            <p className="text-sm md:text-base text-[#FFF4B7]/80 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#84d4d0] text-[20px]">visibility_off</span>
              <span>Hanya angka agregat. Tidak ada data pribadi korban.</span>
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003161] border border-[#006A67]/40 text-xs text-white/90">
            <span className="material-symbols-outlined text-[#84d4d0] text-[18px]">verified_user</span>
            <span>Kepatuhan UU PDP No. 27/2022 • Zero PII Storage • End-to-End Anonymized</span>
          </div>
        </div>
      </section>

      {/* Top KPI Row (3 Cards on Dark Blue #003161 with Big Cream #FFF4B7 numbers) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#003161] border border-[#FFF4B7]/15 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#000B58] border border-[#006A67] flex items-center justify-center text-[#84d4d0]">
              <span className="material-symbols-outlined text-[24px]">support_agent</span>
            </div>
            <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#000B58] text-[#FFF4B7]/80 tracking-wider border border-[#FFF4B7]/10">
              DATA CONTOH
            </span>
          </div>
          <div>
            <span className="text-5xl lg:text-[56px] leading-none font-extrabold text-[#FFF4B7] tracking-tight block font-mono">
              {totalCases}
            </span>
            <span className="text-base font-bold text-white mt-2 block">
              pendampingan bulan ini
            </span>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              Total sesi asistensi tanggap cepat sivitas akademika terlaksana
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#000B58] flex items-center gap-1.5 text-[#84d4d0] text-xs font-semibold bg-[#000B58]/60 px-3 py-1.5 rounded-lg w-fit">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+{Math.max(14, totalCases - 34)} sesi dari bulan lalu</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#003161] border border-[#FFF4B7]/15 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#000B58] border border-[#006A67] flex items-center justify-center text-[#84d4d0]">
              <span className="material-symbols-outlined text-[24px]">timer</span>
            </div>
            <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#000B58] text-[#FFF4B7]/80 tracking-wider border border-[#FFF4B7]/10">
              DATA CONTOH
            </span>
          </div>
          <div>
            <span className="text-5xl lg:text-[56px] leading-none font-extrabold text-[#FFF4B7] tracking-tight block font-mono">
              38 menit
            </span>
            <span className="text-base font-bold text-white mt-2 block">
              Median waktu melapor
            </span>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              Jeda sejak transaksi terjadi hingga korban menghubungi bank / IASC
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#000B58] flex items-center gap-1.5 text-[#FFF4B7] text-xs font-bold bg-[#006A67] px-3 py-1.5 rounded-lg w-fit">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Di bawah batas kritis 45 menit pengurasan</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#003161] border border-[#FFF4B7]/15 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#000B58] border border-[#006A67] flex items-center justify-center text-[#84d4d0]">
              <span className="material-symbols-outlined text-[24px]">hourglass_bottom</span>
            </div>
            <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#000B58] text-[#FFF4B7]/80 tracking-wider border border-[#FFF4B7]/10">
              DATA CONTOH
            </span>
          </div>
          <div>
            <span className="text-5xl lg:text-[56px] leading-none font-extrabold text-[#FFF4B7] tracking-tight block font-mono">
              {percentWithin60}%
            </span>
            <span className="text-base font-bold text-white mt-2 block">
              selesai dalam 60 menit
            </span>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              Kasus tertangani dalam Golden Hour sebelum kliring interbank tuntas
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#000B58] flex items-center gap-1.5 text-white text-xs font-semibold bg-[#000B58]/60 px-3 py-1.5 rounded-lg w-fit">
            <span className="material-symbols-outlined text-[#84d4d0] text-[16px]">bolt</span>
            <span>
              {casesWithin60} dari {totalCases} sesi berhasil memangkas latensi
            </span>
          </div>
        </div>
      </section>

      {/* Two Side-by-Side Charts (Desktop Grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Chart: Distribusi Modus Penipuan Siber */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#003161] border border-[#FFF4B7]/15 shadow-xl flex flex-col justify-between">
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#84d4d0]">crisis_alert</span>
                Distribusi Modus Penipuan Siber
              </h2>
              <span className="text-[10px] uppercase px-2.5 py-0.5 rounded bg-[#000B58] text-[#FFF4B7] font-bold font-mono border border-[#006A67]/40">
                N = {totalCases} KASUS
              </span>
            </div>
            <p className="text-xs text-white/70">
              Berdasarkan rekapan kategori laporan anonim mahasiswa
            </p>
          </div>

          {/* Horizontal Bars Chart in Teal (#006A67) */}
          <div className="flex flex-col gap-4 flex-1 justify-around">
            {/* Bar 1: Belanja Online */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#84d4d0]">shopping_bag</span>
                  Belanja Online
                </span>
                <span className="font-bold text-[#FFF4B7]">
                  {modusCounts.belanja} kasus{' '}
                  <span className="text-white/60 font-normal">
                    ({((modusCounts.belanja / totalCases) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
              <div className="w-full h-7 bg-[#000B58] rounded-md overflow-hidden flex items-center p-1 border border-[#003161]">
                <div
                  className="h-full bg-[#006A67] rounded flex items-center justify-end pr-2 transition-all duration-700"
                  style={{ width: `${Math.max(10, (modusCounts.belanja / totalCases) * 100)}%` }}
                >
                  <span className="text-[11px] font-bold text-white font-mono">
                    {((modusCounts.belanja / totalCases) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Bar 2: Impersonasi */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#84d4d0]">badge</span>
                  Impersonasi / Sos-Eng
                </span>
                <span className="font-bold text-[#FFF4B7]">
                  {modusCounts.impersonasi} kasus{' '}
                  <span className="text-white/60 font-normal">
                    ({((modusCounts.impersonasi / totalCases) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
              <div className="w-full h-7 bg-[#000B58] rounded-md overflow-hidden flex items-center p-1 border border-[#003161]">
                <div
                  className="h-full bg-[#006A67] rounded flex items-center justify-end pr-2 transition-all duration-700"
                  style={{ width: `${Math.max(10, (modusCounts.impersonasi / totalCases) * 100)}%` }}
                >
                  <span className="text-[11px] font-bold text-white font-mono">
                    {((modusCounts.impersonasi / totalCases) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Bar 3: Investasi */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#84d4d0]">monitoring</span>
                  Investasi Bodong
                </span>
                <span className="font-bold text-[#FFF4B7]">
                  {modusCounts.investasi} kasus{' '}
                  <span className="text-white/60 font-normal">
                    ({((modusCounts.investasi / totalCases) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
              <div className="w-full h-7 bg-[#000B58] rounded-md overflow-hidden flex items-center p-1 border border-[#003161]">
                <div
                  className="h-full bg-[#006A67] rounded flex items-center justify-end pr-2 transition-all duration-700"
                  style={{ width: `${Math.max(10, (modusCounts.investasi / totalCases) * 100)}%` }}
                >
                  <span className="text-[11px] font-bold text-white font-mono">
                    {((modusCounts.investasi / totalCases) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Bar 4: Lowongan Kerja */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#84d4d0]">work</span>
                  Lowongan Kerja Palsu
                </span>
                <span className="font-bold text-[#FFF4B7]">
                  {modusCounts.loker} kasus{' '}
                  <span className="text-white/60 font-normal">
                    ({((modusCounts.loker / totalCases) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
              <div className="w-full h-7 bg-[#000B58] rounded-md overflow-hidden flex items-center p-1 border border-[#003161]">
                <div
                  className="h-full bg-[#006A67] rounded flex items-center justify-end pr-2 transition-all duration-700"
                  style={{ width: `${Math.max(10, (modusCounts.loker / totalCases) * 100)}%` }}
                >
                  <span className="text-[11px] font-bold text-white font-mono">
                    {((modusCounts.loker / totalCases) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Bar 5: Media Sosial */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#84d4d0]">share</span>
                  Media Sosial (Takeover / Phishing)
                </span>
                <span className="font-bold text-[#FFF4B7]">
                  {modusCounts.medsos} kasus{' '}
                  <span className="text-white/60 font-normal">
                    ({((modusCounts.medsos / totalCases) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
              <div className="w-full h-7 bg-[#000B58] rounded-md overflow-hidden flex items-center p-1 border border-[#003161]">
                <div
                  className="h-full bg-[#006A67] rounded flex items-center justify-end pr-2 transition-all duration-700"
                  style={{ width: `${Math.max(8, (modusCounts.medsos / totalCases) * 100)}%` }}
                >
                  <span className="text-[11px] font-bold text-white font-mono">
                    {((modusCounts.medsos / totalCases) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#000B58] flex items-center justify-between text-white/60 text-xs">
            <span>Skala: Persentase relatif modus terhadap total insiden terlapor</span>
            <span className="text-[#84d4d0] font-semibold">Tervalidasi Operator Pos</span>
          </div>
        </div>

        {/* Right Chart: Sebaran Waktu Melapor Korban */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#003161] border border-[#FFF4B7]/15 shadow-xl flex flex-col justify-between">
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#FFF4B7]">schedule</span>
                Sebaran Waktu Melapor Korban
              </h2>
              <span className="text-[10px] uppercase px-2.5 py-0.5 rounded bg-[#006A67] text-white font-bold font-mono border border-[#FFF4B7]/20">
                TIME-TO-REPORT
              </span>
            </div>
            <p className="text-xs text-white/70">
              Distribusi latensi respons sejak transaksi penipuan disadari
            </p>
          </div>

          {/* Horizontal Bars Chart with Cream (#FFF4B7) bars & Dark Navy text */}
          <div className="flex flex-col gap-4 flex-1 justify-around">
            {/* Bucket 1: <30 menit */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFF4B7]"></span>
                  &lt;30 menit • <span className="text-[#FFF4B7] font-bold">Kategori Emas Golden Hour</span>
                </span>
                <span className="font-bold text-white">
                  {timeCounts['<30']} kasus ({((timeCounts['<30'] / totalCases) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-8 bg-[#000B58] rounded-md overflow-hidden flex items-center p-1 border border-[#003161]">
                <div
                  className="h-full bg-[#FFF4B7] rounded flex items-center justify-between px-2.5 transition-all duration-700"
                  style={{ width: `${Math.max(14, (timeCounts['<30'] / totalCases) * 100)}%` }}
                >
                  <span className="text-xs font-extrabold text-[#000B58] font-mono">
                    {timeCounts['<30']} KASUS
                  </span>
                  <span className="text-[11px] font-extrabold text-[#000B58] font-mono">
                    {((timeCounts['<30'] / totalCases) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Bucket 2: 30-60 menit */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFF4B7]/80"></span>
                  30-60 menit • <span className="text-[#FFF4B7]/90 font-bold">Kategori Siaga</span>
                </span>
                <span className="font-bold text-white">
                  {timeCounts['30-60']} kasus ({((timeCounts['30-60'] / totalCases) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-8 bg-[#000B58] rounded-md overflow-hidden flex items-center p-1 border border-[#003161]">
                <div
                  className="h-full bg-[#FFF4B7] rounded flex items-center justify-between px-2.5 transition-all duration-700"
                  style={{ width: `${Math.max(14, (timeCounts['30-60'] / totalCases) * 100)}%` }}
                >
                  <span className="text-xs font-extrabold text-[#000B58] font-mono">
                    {timeCounts['30-60']} KASUS
                  </span>
                  <span className="text-[11px] font-extrabold text-[#000B58] font-mono">
                    {((timeCounts['30-60'] / totalCases) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Bucket 3: 1-12 jam */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFF4B7]/60"></span>
                  1-12 jam • <span className="text-white/70 font-semibold">Kategori Latensi Sedang</span>
                </span>
                <span className="font-bold text-white">
                  {timeCounts['1-12']} kasus ({((timeCounts['1-12'] / totalCases) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-8 bg-[#000B58] rounded-md overflow-hidden flex items-center p-1 border border-[#003161]">
                <div
                  className="h-full bg-[#FFF4B7] rounded flex items-center justify-between px-2.5 transition-all duration-700"
                  style={{ width: `${Math.max(14, (timeCounts['1-12'] / totalCases) * 100)}%` }}
                >
                  <span className="text-xs font-extrabold text-[#000B58] font-mono">
                    {timeCounts['1-12']} KASUS
                  </span>
                  <span className="text-[11px] font-extrabold text-[#000B58] font-mono">
                    {((timeCounts['1-12'] / totalCases) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Bucket 4: >12 jam */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFF4B7]/40"></span>
                  &gt;12 jam • <span className="text-[#ffb4ab] font-bold">Risiko Saldo Terkuras Tinggi</span>
                </span>
                <span className="font-bold text-white">
                  {timeCounts['>12']} kasus ({((timeCounts['>12'] / totalCases) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-8 bg-[#000B58] rounded-md overflow-hidden flex items-center p-1 border border-[#003161]">
                <div
                  className="h-full bg-[#FFF4B7] rounded flex items-center justify-between px-2.5 transition-all duration-700"
                  style={{ width: `${Math.max(12, (timeCounts['>12'] / totalCases) * 100)}%` }}
                >
                  <span className="text-xs font-extrabold text-[#000B58] font-mono">
                    {timeCounts['>12']} KASUS
                  </span>
                  <span className="text-[11px] font-extrabold text-[#000B58] font-mono">
                    {((timeCounts['>12'] / totalCases) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Golden Hour Insight Note */}
          <div className="mt-5 p-4 rounded-xl bg-[#000B58] border border-[#003161] flex items-start gap-3">
            <span className="material-symbols-outlined text-[#FFF4B7] shrink-0 mt-0.5 text-[20px]">
              lightbulb
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-[#FFF4B7] font-bold">Catatan Analisis Latensi:</span>
              <p className="text-xs text-white/80 leading-relaxed">
                Pelaporan di bawah 60 menit (
                <span className="text-[#FFF4B7] font-bold">{percentWithin60}% gabungan</span>) sangat
                menentukan keberhasilan blokir rekening penampung sebelum dana dipecah ke multi-rekening mule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action & OJK Coordination Panel */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#003161] border border-[#FFF4B7]/15 shadow-xl flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#000B58]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#006A67] flex items-center justify-center text-white shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-white">
                Kanal Pelaporan Agregat Otoritas Jasa Keuangan (OJK)
              </h3>
              <p className="text-xs sm:text-sm text-[#FFF4B7] font-medium mt-0.5">
                Masukan agregat disampaikan lewat kanal resmi untuk memperkuat layanan IASC.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadCsv}
              disabled={isDownloading}
              className="min-h-[48px] px-5 py-3 rounded-xl bg-[#000B58] hover:bg-[#000B58]/80 text-[#FFF4B7] text-xs font-bold flex items-center gap-2 transition-colors border border-[#006A67]/40 cursor-pointer shadow"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDownloading ? 'hourglass_bottom' : 'download'}
              </span>
              <span>{isDownloading ? 'Menyiapkan CSV...' : 'Unduh Berkas Laporan CSV Anonim'}</span>
            </button>

            <button
              onClick={handleSendOjk}
              disabled={isSendingOJK}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-[#006A67] hover:bg-[#00827e] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer border border-[#FFF4B7]/20"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSendingOJK ? 'progress_activity' : 'send'}
              </span>
              <span>{isSendingOJK ? 'Mengirim Ringkasan...' : 'Kirim ringkasan ke OJK'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-white/70 text-xs">
          <div className="flex items-start gap-2.5 max-w-4xl">
            <span className="material-symbols-outlined text-[#84d4d0] text-[18px] shrink-0 mt-0.5">
              info
            </span>
            <p className="leading-relaxed">
              Format pengiriman: JSON terenkripsi agregat bulanan, tanpa identitas mahasiswa / kontak bank, ditujukan ke Direktorat Pengembangan Perlindungan Konsumen OJK.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-[#000B58] px-3.5 py-1.5 rounded-lg text-[#84d4d0] font-mono border border-[#003161]">
            <span className="w-2 h-2 rounded-full bg-[#84d4d0] animate-pulse"></span>
            <span>Protokol API IASC Aktif (v2.4)</span>
          </div>
        </div>

        {/* Dynamic Toast feedback */}
        {ojkSentSuccess && (
          <div className="p-4 rounded-xl bg-[#000B58] text-[#FFF4B7] text-xs font-semibold flex items-center gap-3 border border-[#84d4d0] animate-fade-in">
            <span className="material-symbols-outlined text-[#84d4d0] text-[22px]">check_circle</span>
            <span>
              Paket JSON agregat terenkripsi ({totalCases} insiden anonim) berhasil diantrikan ke gerbang resmi IASC OJK. Token pengiriman: <strong>IASC-AGR-2026-0588</strong>.
            </span>
          </div>
        )}
      </section>

      {/* Bottom Evaluation & Limitations Card */}
      <section className="p-6 rounded-2xl bg-[#003161]/80 border border-[#FFF4B7]/15 shadow-md flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#000B58] text-[#FFF4B7] flex items-center justify-center shrink-0 border border-[#006A67]">
          <span className="material-symbols-outlined text-[22px]">warning</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-[#FFF4B7]">
            Keterbatasan: efektivitas pendampingan sebaya masih hipotesis dan perlu evaluasi.
          </span>
          <p className="text-xs text-white/80 leading-relaxed">
            Data ini mencatat percepatan waktu laporan mandiri sivitas akademika, bukan keberhasilan pengembalian dana riil (restitusi perbankan) yang merupakan ranah penyidik kepolisian dan otoritas pengawas.
          </p>
        </div>
      </section>
    </div>
  );
};
