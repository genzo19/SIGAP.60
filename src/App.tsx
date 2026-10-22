import React, { useState } from 'react';
import { SigapLogo } from './components/SigapLogo';

interface ChartPoint {
  date: string;
  count: number;
  label: string;
  x: number;
  y: number;
}

const cumulativeData: ChartPoint[] = [
  { date: 'Des 2024', count: 18614, label: '18.614', x: 40, y: 138 },
  { date: 'Mei 2025', count: 128281, label: '128.281', x: 125, y: 112 },
  { date: 'Des 2025', count: 411055, label: '411.055', x: 215, y: 56 },
  { date: 'Jul 2026', count: 636014, label: '636.014', x: 300, y: 16 },
];

export default function App() {
  // Mobile Hamburger state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ Accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive Quiz state (Section 8)
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Mini Chart tooltip state (Section 3)
  const [activeChartPoint, setActiveChartPoint] = useState<ChartPoint | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const navLinks = [
    { href: '#masalah', label: 'Masalah' },
    { href: '#cara-kerja', label: 'Cara Kerja' },
    { href: '#pendamping', label: 'Pendamping' },
    { href: '#keamanan', label: 'Keamanan' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-[#000B58] text-white selection:bg-[#006A67] selection:text-[#FFF4B7] font-sans overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. STICKY NAVBAR                                          */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#000B58]/95 backdrop-blur-md border-b border-[#003161]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Logo Left */}
          <a
            href="#"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7] rounded-lg p-1"
            aria-label="SIGAP 60 Beranda"
          >
            <SigapLogo variant="horizontal" size={38} animated={false} showTagline={false} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/80 hover:text-[#FFF4B7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7] rounded px-1 py-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#cara-kerja"
              className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#006A67] hover:bg-[#00827e] text-white text-sm font-bold flex items-center justify-center transition-colors shadow-md border border-[#FFF4B7]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
            >
              Lihat Protokol
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[48px] min-w-[48px] flex items-center justify-center text-[#FFF4B7] rounded-xl bg-[#003161] border border-[#006A67] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Buka menu navigasi"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden bg-[#000B58] border-b border-[#003161] px-4 py-4 flex flex-col gap-3 shadow-xl animate-fade-in"
            aria-label="Navigasi Mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] flex items-center text-base font-semibold text-white/90 hover:text-[#FFF4B7] px-3 rounded-lg hover:bg-[#003161]/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cara-kerja"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] w-full rounded-xl bg-[#006A67] text-white font-bold text-sm flex items-center justify-center border border-[#FFF4B7]/20 shadow mt-1"
            >
              Lihat Protokol
            </a>
          </nav>
        )}
      </header>

      {/* Main Container */}
      <main className="w-full">
        {/* ========================================================= */}
        {/* 2. HERO SECTION (Navy #000B58)                           */}
        {/* ========================================================= */}
        <section className="w-full bg-[#000B58] pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#003161]/50">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 flex flex-col items-start gap-6 max-w-2xl text-left">
              {/* Prototype Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003161] border border-[#006A67] text-[#FFF4B7] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#FFF4B7] animate-pulse"></span>
                <span>Konsep prototipe, bukan layanan resmi OJK</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFF4B7] tracking-tight leading-[1.15]">
                Jam pertama menentukan.
              </h1>

              {/* Subline */}
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
                Teman sebaya yang menemanimu melapor penipuan digital dalam 60 menit lewat jalur resmi.
              </p>

              {/* Buttons */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#cara-kerja"
                  className="min-h-[48px] px-7 py-3 rounded-xl bg-[#006A67] hover:bg-[#00827e] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#006A67]/30 border border-[#FFF4B7]/25 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
                >
                  <span>Saya baru tertipu</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
                <a
                  href="#pendamping"
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-transparent hover:bg-[#003161] text-[#FFF4B7] font-bold text-sm sm:text-base flex items-center justify-center border-2 border-[#FFF4B7] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
                >
                  Jadi pendamping
                </a>
              </div>
            </div>

            {/* Right Visual: Large Animated Ring with "60:00" in Cream & Label "menit pertama" */}
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Background soft ambient halo */}
                <div className="absolute inset-0 rounded-full bg-[#006A67]/20 blur-3xl pointer-events-none"></div>

                {/* Animated Logo Ring */}
                <SigapLogo variant="icon" size="100%" animated={true} />

                {/* Inner Center Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#FFF4B7] font-mono tracking-tight leading-none">
                    60:00
                  </span>
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-[#FFF4B7]/80 font-bold mt-2">
                    menit pertama
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. MASALAH (Dark Blue #003161)                           */}
        {/* ========================================================= */}
        <section id="masalah" className="w-full bg-[#003161] py-16 sm:py-24 border-b border-[#000B58]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col gap-10">
            {/* Section Title */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[#FFF4B7]/70 font-mono">
                REALITAS LAPANGAN
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF4B7] tracking-tight">
                Sistemnya sudah ada. Waktunya yang terlewat.
              </h2>
            </div>

            {/* Three Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#000B58] border border-[#006A67]/40 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-5xl sm:text-6xl font-extrabold text-[#FFF4B7] font-mono tracking-tight block">
                    80%
                  </span>
                  <p className="text-sm text-white/90 mt-3 leading-relaxed">
                    korban melapor lebih dari 12 jam setelah kejadian
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#000B58] border border-[#006A67]/40 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-5xl sm:text-6xl font-extrabold text-[#FFF4B7] font-mono tracking-tight block">
                    &lt; 1 jam
                  </span>
                  <p className="text-sm text-white/90 mt-3 leading-relaxed">
                    dana pelaku dapat berpindah
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#000B58] border border-[#006A67]/40 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-5xl sm:text-6xl font-extrabold text-[#FFF4B7] font-mono tracking-tight block">
                    636.014
                  </span>
                  <p className="text-sm text-white/90 mt-3 leading-relaxed">
                    laporan masuk ke IASC (s.d. 30 Jul 2026)
                  </p>
                </div>
              </div>
            </div>

            {/* Mini Line Chart in Teal / Cream */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#FFF4B7]">
                    Pertumbuhan Kumulatif Laporan IASC
                  </h3>
                  <p className="text-xs text-white/70">
                    Eskalasi laporan masyarakat sejak integrasi penanganan fraud digital
                  </p>
                </div>
                {activeChartPoint && (
                  <div className="px-3 py-1.5 rounded-lg bg-[#003161] border border-[#006A67] text-xs text-[#FFF4B7] font-mono">
                    {activeChartPoint.date}: <strong>{activeChartPoint.label} laporan</strong>
                  </div>
                )}
              </div>

              {/* SVG Line Chart */}
              <div className="w-full pt-2">
                <svg
                  viewBox="0 0 340 160"
                  className="w-full h-auto overflow-visible select-none"
                  aria-label="Grafik kumulatif laporan IASC OJK"
                >
                  <defs>
                    <linearGradient id="iascGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#006A67" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#006A67" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  <line x1="25" y1="20" x2="330" y2="20" stroke="#003161" strokeDasharray="3 3" strokeWidth="1" />
                  <text x="20" y="23" fill="#FFF4B7" opacity="0.6" fontSize="8" textAnchor="end" fontFamily="monospace">600k</text>

                  <line x1="25" y1="65" x2="330" y2="65" stroke="#003161" strokeDasharray="3 3" strokeWidth="1" />
                  <text x="20" y="68" fill="#FFF4B7" opacity="0.6" fontSize="8" textAnchor="end" fontFamily="monospace">400k</text>

                  <line x1="25" y1="110" x2="330" y2="110" stroke="#003161" strokeDasharray="3 3" strokeWidth="1" />
                  <text x="20" y="113" fill="#FFF4B7" opacity="0.6" fontSize="8" textAnchor="end" fontFamily="monospace">200k</text>

                  <line x1="25" y1="145" x2="330" y2="145" stroke="#003161" strokeWidth="1" />
                  <text x="20" y="148" fill="#FFF4B7" opacity="0.6" fontSize="8" textAnchor="end" fontFamily="monospace">0</text>

                  {/* Area fill */}
                  <path
                    d="M 40 138 L 125 112 L 215 56 L 300 16 L 300 145 L 40 145 Z"
                    fill="url(#iascGradient)"
                  />

                  {/* Glowing Teal line */}
                  <path
                    d="M 40 138 L 125 112 L 215 56 L 300 16"
                    fill="none"
                    stroke="#006A67"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Interactive Nodes */}
                  {cumulativeData.map((pt) => {
                    const isSelected = activeChartPoint?.date === pt.date;
                    return (
                      <g
                        key={pt.date}
                        className="cursor-pointer"
                        onClick={() => setActiveChartPoint(isSelected ? null : pt)}
                        onMouseEnter={() => setActiveChartPoint(pt)}
                      >
                        {/* Expanded touch area */}
                        <circle cx={pt.x} cy={pt.y} r={18} fill="transparent" />

                        {/* Outer ring */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? 7 : 5}
                          fill="#FFF4B7"
                          stroke="#000B58"
                          strokeWidth="2"
                        />

                        {/* Top Value */}
                        <text
                          x={pt.x}
                          y={pt.y - 8}
                          fill="#FFF4B7"
                          fontSize="9"
                          fontWeight="700"
                          textAnchor={pt.count === 636014 ? 'end' : 'middle'}
                          fontFamily="monospace"
                        >
                          {pt.label}
                        </text>

                        {/* Bottom Date */}
                        <text
                          x={pt.x}
                          y="157"
                          fill="#FFFFFF"
                          opacity="0.8"
                          fontSize="8.5"
                          textAnchor="middle"
                        >
                          {pt.date}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Source Line */}
              <p className="text-xs text-white/70 italic pt-2 border-t border-[#003161]">
                Sumber: OJK, 2025-2026. Diolah penulis.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. PARADOKS (Navy #000B58)                               */}
        {/* ========================================================= */}
        <section className="w-full bg-[#000B58] py-16 sm:py-24 border-b border-[#003161]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            {/* Left: Pull Quote */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#003161] flex items-center justify-center text-[#FFF4B7] border border-[#006A67]">
                <span className="material-symbols-outlined text-[24px]">format_quote</span>
              </div>
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFF4B7] leading-snug tracking-tight">
                “Sistem blokir cepat sudah ada, tetapi titik lemahnya ada di menit sebelum laporan masuk.”
              </blockquote>
            </div>

            {/* Right: Side Note Card */}
            <div className="flex-1 w-full p-6 sm:p-8 rounded-2xl bg-[#003161] border border-[#006A67]/40 shadow-xl">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#FFF4B7] text-[24px] shrink-0 mt-0.5">
                  info
                </span>
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wider text-[#FFF4B7] font-bold font-mono">
                    CATATAN REKENING &amp; REGULASI
                  </span>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                    Dana terblokir Rp723,7 miliar, dikembalikan Rp204,3 miliar, dari kerugian terlapor Rp9,1 triliun (s.d. 14 Jan 2026). Angka berasal dari tanggal rilis berbeda, baca sebagai gambaran.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CARA KERJA (Dark Blue #003161)                        */}
        {/* ========================================================= */}
        <section id="cara-kerja" className="w-full bg-[#003161] py-16 sm:py-24 border-b border-[#000B58]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[#FFF4B7]/70 font-mono">
                ALUR DARURAT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF4B7] tracking-tight">
                Protokol 60 Menit
              </h2>
              <p className="text-sm sm:text-base text-white/90">
                Empat langkah terarah yang harus diselesaikan sesegera mungkin pada jam pertama.
              </p>
            </div>

            {/* 4-Step Timeline: Horizontal on Desktop, Vertical on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#006A67] text-[#FFF4B7] font-extrabold flex items-center justify-center text-lg font-mono">
                    1
                  </div>
                  <span className="material-symbols-outlined text-[#FFF4B7] text-[24px]">
                    account_balance
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-base font-bold text-[#FFF4B7]">
                    Hubungi bank atau e-wallet
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Minta penundaan transaksi seketika pada rekening pengirim dan tujuan.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#006A67] text-[#FFF4B7] font-extrabold flex items-center justify-center text-lg font-mono">
                    2
                  </div>
                  <span className="material-symbols-outlined text-[#FFF4B7] text-[24px]">
                    language
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-base font-bold text-[#FFF4B7]">
                    Lapor di iasc.ojk.go.id
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Ajukan laporan resmi melalui sistem Anti-Scam Center OJK untuk blokir rekening sindikat.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#006A67] text-[#FFF4B7] font-extrabold flex items-center justify-center text-lg font-mono">
                    3
                  </div>
                  <span className="material-symbols-outlined text-[#FFF4B7] text-[24px]">
                    screenshot
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-base font-bold text-[#FFF4B7]">
                    Simpan bukti
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Amankan tangkapan layar mutasi, nomor rekening pelaku, dan histori percakapan.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#006A67] text-[#FFF4B7] font-extrabold flex items-center justify-center text-lg font-mono">
                    4
                  </div>
                  <span className="material-symbols-outlined text-[#FFF4B7] text-[24px]">
                    support_agent
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-base font-bold text-[#FFF4B7]">
                    Hubungi Kontak OJK 157
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Lakukan konfirmasi dan eskalasi penanganan tindak pidana sektor jasa keuangan.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="https://iasc.ojk.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] px-7 py-3 rounded-xl bg-[#006A67] hover:bg-[#00827e] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg border border-[#FFF4B7]/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
              >
                <span>Buka situs resmi IASC</span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </a>

              <a
                href="tel:157"
                className="min-h-[48px] px-6 py-3 rounded-xl bg-transparent hover:bg-[#000B58] text-[#FFF4B7] font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-2 border-[#FFF4B7] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Telepon 157</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. PENDAMPING SEBAYA (Navy #000B58)                      */}
        {/* ========================================================= */}
        <section id="pendamping" className="w-full bg-[#000B58] py-16 sm:py-24 border-b border-[#003161]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[#FFF4B7]/70 font-mono">
                ETIKA &amp; BATASAN PERAN
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF4B7] tracking-tight">
                Mahasiswa yang memandu, bukan memegang.
              </h2>
            </div>

            {/* Two-Column Card: Boleh vs Tidak Boleh */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#003161] border border-[#006A67]/50 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Column 1: Boleh */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#000B58]">
                  <span className="material-symbols-outlined text-[#006A67] bg-[#FFF4B7] p-1 rounded-lg text-[20px] font-bold">
                    check
                  </span>
                  <h3 className="text-lg font-extrabold text-[#FFF4B7]">
                    Boleh
                  </h3>
                </div>
                <ul className="flex flex-col gap-3 text-sm text-white/90">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#006A67] text-[20px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>Memandu isi laporan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#006A67] text-[20px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>Menemani menghubungi bank</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#006A67] text-[20px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>Mengingatkan simpan bukti</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: Tidak boleh */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#000B58]">
                  <span className="material-symbols-outlined text-[#000B58] bg-[#FFF4B7] p-1 rounded-lg text-[20px] font-bold">
                    close
                  </span>
                  <h3 className="text-lg font-extrabold text-[#FFF4B7]">
                    Tidak boleh
                  </h3>
                </div>
                <ul className="flex flex-col gap-3 text-sm text-white/90">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#FFF4B7] text-[20px] shrink-0 mt-0.5">
                      cancel
                    </span>
                    <span>Memegang uang</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#FFF4B7] text-[20px] shrink-0 mt-0.5">
                      cancel
                    </span>
                    <span>Meminta kata sandi atau OTP</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#FFF4B7] text-[20px] shrink-0 mt-0.5">
                      cancel
                    </span>
                    <span>Menyimpan bukti pribadi korban</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mandatory Note */}
            <div className="p-4 rounded-xl bg-[#000B58] border border-[#006A67]/40 text-xs sm:text-sm text-[#FFF4B7] flex items-center gap-3">
              <span className="material-symbols-outlined text-[#006A67] text-[22px] shrink-0">
                shield
              </span>
              <p className="font-semibold leading-relaxed">
                Pendamping hanya memandu. Keputusan pemblokiran ada di bank dan OJK.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. EMPAT KOMPONEN (Dark Blue #003161)                     */}
        {/* ========================================================= */}
        <section className="w-full bg-[#003161] py-16 sm:py-24 border-b border-[#000B58]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[#FFF4B7]/70 font-mono">
                ARSITEKTUR INISIATIF
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF4B7] tracking-tight">
                Empat Komponen SIGAP 60
              </h2>
            </div>

            {/* 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Component 1 */}
              <div className="p-6 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#003161] flex items-center justify-center text-[#FFF4B7]">
                  <span className="material-symbols-outlined text-[24px]">timer</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-lg font-bold text-[#FFF4B7]">
                    Protokol 60 menit
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Panduan sekuensial ringkas menit demi menit untuk tindakan penyelamatan aset darurat.
                  </p>
                </div>
              </div>

              {/* Component 2 */}
              <div className="p-6 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#003161] flex items-center justify-center text-[#FFF4B7]">
                  <span className="material-symbols-outlined text-[24px]">diversity_3</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-lg font-bold text-[#FFF4B7]">
                    Pos pendamping sebaya kampus
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Jaringan simpul sukarelawan mahasiswa terlatih untuk mendampingi korban tanpa kepanikan.
                  </p>
                </div>
              </div>

              {/* Component 3 */}
              <div className="p-6 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#003161] flex items-center justify-center text-[#FFF4B7]">
                  <span className="material-symbols-outlined text-[24px]">fitness_center</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-lg font-bold text-[#FFF4B7]">
                    Latihan refleks sebaya
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Simulasi skenario kasus cepat untuk melatih ketangkasan respons pasca-tertipu.
                  </p>
                </div>
              </div>

              {/* Component 4 */}
              <div className="p-6 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#003161] flex items-center justify-center text-[#FFF4B7]">
                  <span className="material-symbols-outlined text-[24px]">analytics</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-lg font-bold text-[#FFF4B7]">
                    Umpan balik anonim
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Hanya angka agregat untuk masukan ke OJK tanpa mengumpulkan data pribadi korban.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. LATIHAN REFLEKS TEASER (Navy #000B58)                 */}
        {/* ========================================================= */}
        <section className="w-full bg-[#000B58] py-16 sm:py-24 border-b border-[#003161]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[#FFF4B7]/70 font-mono">
                SIMULASI KETANGKASAN
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF4B7] tracking-tight">
                Latihan Refleks Sebaya
              </h2>
            </div>

            {/* Interactive Mini Card */}
            <div className="max-w-2xl mx-auto w-full p-6 sm:p-8 rounded-2xl bg-[#003161] border border-[#006A67]/60 shadow-2xl flex flex-col gap-6">
              {/* Badge & Scenario */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-[#000B58] text-[#FFF4B7] text-xs font-mono font-bold tracking-wider border border-[#006A67]">
                    SIMULASI
                  </span>
                  <span className="text-xs text-white/60">Uji Respon Refleks</span>
                </div>

                <div className="p-4 rounded-xl bg-[#000B58] border border-[#003161] text-sm text-[#FFF4B7] font-medium leading-relaxed">
                  “Paket Anda tertahan, klik tautan untuk membayar ongkir”
                </div>

                <p className="text-base font-bold text-white leading-relaxed">
                  Kamu baru sadar sudah transfer. Apa langkah pertamamu?
                </p>
              </div>

              {/* 3 Options */}
              <div className="flex flex-col gap-3">
                {/* Option 1: Correct */}
                <button
                  onClick={() => setSelectedOption(1)}
                  className={`min-h-[48px] w-full p-4 rounded-xl text-left text-sm font-semibold transition-all border flex items-center justify-between gap-3 cursor-pointer ${
                    selectedOption === 1
                      ? 'bg-[#006A67] border-[#FFF4B7] text-white shadow-lg'
                      : 'bg-[#000B58] border-[#006A67]/40 text-white/90 hover:border-[#FFF4B7]/60'
                  }`}
                >
                  <span>Hubungi bank untuk meminta penundaan transaksi</span>
                  <span className="material-symbols-outlined text-[20px] text-[#FFF4B7] shrink-0">
                    {selectedOption === 1 ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </button>

                {/* Option 2: Incorrect */}
                <button
                  onClick={() => setSelectedOption(2)}
                  className={`min-h-[48px] w-full p-4 rounded-xl text-left text-sm font-semibold transition-all border flex items-center justify-between gap-3 cursor-pointer ${
                    selectedOption === 2
                      ? 'bg-[#000B58] border-[#FFF4B7] text-white shadow-lg'
                      : 'bg-[#000B58] border-[#006A67]/40 text-white/90 hover:border-[#FFF4B7]/60'
                  }`}
                >
                  <span>Tutup aplikasi dan pasrah menunggu paket</span>
                  <span className="material-symbols-outlined text-[20px] text-white/50 shrink-0">
                    {selectedOption === 2 ? 'cancel' : 'radio_button_unchecked'}
                  </span>
                </button>

                {/* Option 3: Incorrect */}
                <button
                  onClick={() => setSelectedOption(3)}
                  className={`min-h-[48px] w-full p-4 rounded-xl text-left text-sm font-semibold transition-all border flex items-center justify-between gap-3 cursor-pointer ${
                    selectedOption === 3
                      ? 'bg-[#000B58] border-[#FFF4B7] text-white shadow-lg'
                      : 'bg-[#000B58] border-[#006A67]/40 text-white/90 hover:border-[#FFF4B7]/60'
                  }`}
                >
                  <span>Kirim pesan komplain ke nomor pengirim</span>
                  <span className="material-symbols-outlined text-[20px] text-white/50 shrink-0">
                    {selectedOption === 3 ? 'cancel' : 'radio_button_unchecked'}
                  </span>
                </button>
              </div>

              {/* Feedback on Tap */}
              {selectedOption !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3 animate-fade-in ${
                    selectedOption === 1
                      ? 'bg-[#006A67]/40 border-[#FFF4B7] text-white'
                      : 'bg-[#000B58] border-[#FFF4B7]/50 text-white/90'
                  }`}
                >
                  <span className="material-symbols-outlined text-[#FFF4B7] text-[22px] shrink-0 mt-0.5">
                    {selectedOption === 1 ? 'task_alt' : 'help'}
                  </span>
                  <div>
                    {selectedOption === 1 ? (
                      <p>
                        <strong className="text-[#FFF4B7]">Tepat!</strong> Menghubungi bank seketika dalam 60 menit pertama adalah tindakan krusial untuk meminta penahanan transaksi sebelum saldo dilarikan penipu ke jaringan rekening berlapis.
                      </p>
                    ) : (
                      <p>
                        <strong className="text-[#FFF4B7]">Langkah kurang tepat.</strong> Menunggu atau menghubungi penipu hanya membuang jendela waktu 60 menit emas. Segera hubungi bank untuk meminta penundaan transaksi.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. KEAMANAN DAN BATASAN (Dark Blue #003161)              */}
        {/* ========================================================= */}
        <section id="keamanan" className="w-full bg-[#003161] py-16 sm:py-24 border-b border-[#000B58]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[#FFF4B7]/70 font-mono">
                PRINSIP &amp; INTEGRITAS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF4B7] tracking-tight">
                Keamanan dan Batasan
              </h2>
            </div>

            {/* Bullets Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#000B58] border border-[#006A67]/50 shadow-xl">
              <ul className="flex flex-col gap-4 text-sm sm:text-base text-white/90">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#FFF4B7] text-[22px] shrink-0 mt-0.5">
                    lock
                  </span>
                  <span>Tidak pernah meminta kata sandi, PIN, atau OTP.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#FFF4B7] text-[22px] shrink-0 mt-0.5">
                    link
                  </span>
                  <span>Hanya mengarahkan ke iasc.ojk.go.id dan 157.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#FFF4B7] text-[22px] shrink-0 mt-0.5">
                    warning
                  </span>
                  <span>Waspada situs palsu yang mengatasnamakan IASC.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#FFF4B7] text-[22px] shrink-0 mt-0.5">
                    science
                  </span>
                  <span>Efektivitas pendampingan sebaya masih hipotesis dan perlu evaluasi.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 10. SELARAS DENGAN BELA NEGARA & SDGS (Navy #000B58)     */}
        {/* ========================================================= */}
        <section className="w-full bg-[#000B58] py-16 sm:py-24 border-b border-[#003161]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[#FFF4B7]/70 font-mono">
                LANDASAN FILOSOFIS &amp; GLOBAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF4B7] tracking-tight">
                Selaras dengan Bela Negara dan SDGs
              </h2>
            </div>

            {/* Short Text */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#003161] border border-[#006A67]/40 shadow-xl flex flex-col gap-6">
              <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
                Pahlawan masa kini adalah warga muda yang bertindak dalam 60 menit pertama, berdasar hak dan kewajiban bela negara (UU 3/2002 Pasal 9).
              </p>

              {/* Row of SDG chips: text badges only (no official logos) */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#000B58]">
                <span className="text-xs uppercase font-bold text-[#FFF4B7] font-mono mr-2">
                  TARGET SDGs:
                </span>
                {['16.4', '16.6', '4.4', '8.10', '17.17'].map((chip) => (
                  <span
                    key={chip}
                    className="px-3.5 py-1.5 rounded-lg bg-[#000B58] text-[#FFF4B7] text-xs font-extrabold font-mono border border-[#006A67] shadow-sm"
                  >
                    SDG {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 11. FAQ ACCORDION (Dark Blue #003161)                     */}
        {/* ========================================================= */}
        <section id="faq" className="w-full bg-[#003161] py-16 sm:py-24 border-b border-[#000B58]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[#FFF4B7]/70 font-mono">
                TANYA JAWAB
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF4B7] tracking-tight">
                Pertanyaan yang Sering Diajukan
              </h2>
            </div>

            {/* Accordion List */}
            <div className="flex flex-col gap-4">
              {/* Question 1 */}
              <div className="rounded-2xl bg-[#000B58] border border-[#006A67]/50 overflow-hidden shadow-lg transition-all">
                <button
                  onClick={() => toggleFaq(0)}
                  className="w-full min-h-[52px] p-5 sm:p-6 text-left font-bold text-base sm:text-lg text-[#FFF4B7] flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
                  aria-expanded={openFaqIndex === 0}
                >
                  <span>Apa bedanya dengan edukasi literasi keuangan OJK?</span>
                  <span className="material-symbols-outlined text-[24px] text-[#FFF4B7] shrink-0 transition-transform duration-200">
                    {openFaqIndex === 0 ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaqIndex === 0 && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-white/90 leading-relaxed border-t border-[#003161] pt-4">
                    Edukasi mencegah, SIGAP 60 menangani jam pertama setelah tertipu tanpa membuat lembaga baru.
                  </div>
                )}
              </div>

              {/* Question 2 */}
              <div className="rounded-2xl bg-[#000B58] border border-[#006A67]/50 overflow-hidden shadow-lg transition-all">
                <button
                  onClick={() => toggleFaq(1)}
                  className="w-full min-h-[52px] p-5 sm:p-6 text-left font-bold text-base sm:text-lg text-[#FFF4B7] flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
                  aria-expanded={openFaqIndex === 1}
                >
                  <span>Apakah pendamping bisa memblokir rekening?</span>
                  <span className="material-symbols-outlined text-[24px] text-[#FFF4B7] shrink-0 transition-transform duration-200">
                    {openFaqIndex === 1 ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaqIndex === 1 && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-white/90 leading-relaxed border-t border-[#003161] pt-4">
                    Tidak. Pemblokiran hanya oleh bank dan OJK lewat IASC.
                  </div>
                )}
              </div>

              {/* Question 3 */}
              <div className="rounded-2xl bg-[#000B58] border border-[#006A67]/50 overflow-hidden shadow-lg transition-all">
                <button
                  onClick={() => toggleFaq(2)}
                  className="w-full min-h-[52px] p-5 sm:p-6 text-left font-bold text-base sm:text-lg text-[#FFF4B7] flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
                  aria-expanded={openFaqIndex === 2}
                >
                  <span>Apakah data korban disimpan?</span>
                  <span className="material-symbols-outlined text-[24px] text-[#FFF4B7] shrink-0 transition-transform duration-200">
                    {openFaqIndex === 2 ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaqIndex === 2 && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-white/90 leading-relaxed border-t border-[#003161] pt-4">
                    Tidak. Pencatatan hanya angka agregat tanpa data pribadi.
                  </div>
                )}
              </div>

              {/* Question 4 */}
              <div className="rounded-2xl bg-[#000B58] border border-[#006A67]/50 overflow-hidden shadow-lg transition-all">
                <button
                  onClick={() => toggleFaq(3)}
                  className="w-full min-h-[52px] p-5 sm:p-6 text-left font-bold text-base sm:text-lg text-[#FFF4B7] flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
                  aria-expanded={openFaqIndex === 3}
                >
                  <span>Apakah ini layanan resmi?</span>
                  <span className="material-symbols-outlined text-[24px] text-[#FFF4B7] shrink-0 transition-transform duration-200">
                    {openFaqIndex === 3 ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaqIndex === 3 && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-white/90 leading-relaxed border-t border-[#003161] pt-4">
                    Bukan. Ini konsep prototipe untuk lomba esai.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 12. CTA PENUTUP (Navy #000B58)                           */}
        {/* ========================================================= */}
        <section className="w-full bg-[#000B58] py-16 sm:py-24 border-b border-[#003161]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF4B7] tracking-tight">
              Setiap menit berarti.
            </h2>
            <p className="text-base sm:text-lg text-white/90 max-w-lg leading-relaxed">
              Jendela 60 menit pertama menentukan peluang pembekuan rekening penampung sebelum dana dilarikan sindikat.
            </p>
            <a
              href="#cara-kerja"
              className="min-h-[48px] px-8 py-3.5 rounded-xl bg-[#006A67] hover:bg-[#00827e] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl border border-[#FFF4B7]/25 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4B7]"
            >
              <span>Mulai Protokol 60 Menit</span>
              <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
            </a>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* 13. FOOTER                                                */}
      {/* ========================================================= */}
      <footer className="w-full bg-[#00083b] border-t border-[#003161] py-12 text-white/80">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <SigapLogo variant="horizontal" size={34} animated={false} showTagline={false} />

          {/* Mandatory Disclaimers */}
          <div className="flex flex-col gap-2 max-w-xl">
            <p className="text-sm font-bold text-[#FFF4B7]">
              Bukan situs resmi OJK/IASC
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              Dibuat untuk Festival Bela Negara 2026
            </p>
            <p className="text-xs text-white/60 italic pt-2 border-t border-[#003161]">
              Sumber: OJK, 2025-2026. Diolah penulis.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
