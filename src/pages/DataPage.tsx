import React, { useState } from 'react';

interface DataPoint {
  date: string;
  count: number;
  label: string;
  x: number;
  y: number;
  growthNote: string;
}

// 6 Data Points scaled for 350x180 mobile chart
const cumulativeData: DataPoint[] = [
  { date: "Des '24", count: 18614, label: '18.614', x: 35, y: 145, growthNote: 'Awal integrasi fraud perbankan IASC' },
  { date: "Feb '25", count: 57426, label: '57.426', x: 92, y: 136, growthNote: '+208% dalam 2 bulan operasional' },
  { date: "Mei '25", count: 128281, label: '128.281', x: 150, y: 120, growthNote: '+123% eskalasi penipuan APK siber' },
  { date: "Des '25", count: 411055, label: '411.055', x: 215, y: 62, growthNote: '+220% sindikat lintas kanal transfer' },
  { date: "Apr '26", count: 548093, label: '548.093', x: 275, y: 34, growthNote: '+33% percepatan laporan digital' },
  { date: "Jul '26", count: 636014, label: '636.014', x: 326, y: 14, growthNote: 'Puncak kumulatif 19 bulan operasional' },
];

export const DataPage: React.FC = () => {
  const [activeNode, setActiveNode] = useState<DataPoint | null>(null);
  const [activeBar, setActiveBar] = useState<'terblokir' | 'dikembalikan' | null>(null);

  return (
    <div className="w-full flex flex-col gap-5 pb-6 max-w-[390px] mx-auto">
      {/* 1. HEADER SECTION (Mobile Single Column) */}
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#003161] text-[#FFF4B7] text-[10px] font-bold border border-[#006A67]/40">
            <span className="material-symbols-outlined text-[14px] text-[#84d4d0]">emergency_home</span>
            URGENSI GOLDEN HOUR
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#001d1c] text-[#84d4d0] text-[10px] font-bold border border-[#006A67]">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            DATA OJK 2025–2026
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold text-[#FFF4B7] tracking-tight">
            Mengapa 60 Menit?
          </h1>
          <p className="text-xs text-white/90 leading-relaxed">
            Data resmi IASC OJK &amp; Satgas PASTI (2024–2026) membuktikan urgensi respons jam pertama pasca transaksi penipuan.
          </p>
        </div>

        {/* Latency Urgency Banner */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#003161] border border-[#FFF4B7]/15">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#84d4d0] animate-pulse"></span>
            <span className="text-[11px] font-bold text-[#FFF4B7]">Tingkat Kritis Respons</span>
          </div>
          <span className="text-[11px] font-mono text-[#84d4d0] font-bold">
            Menit 00–60 Pertama
          </span>
        </div>
      </header>

      {/* 2. CUMULATIVE GROWTH LINE CHART CARD (390px Optimized, Tap Tooltips) */}
      <div className="flex flex-col p-4 rounded-2xl bg-[#003161] border border-[#FFF4B7]/15 shadow-xl gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#84d4d0] text-[18px]">monitoring</span>
            <span className="text-[11px] uppercase tracking-wider text-white/70 font-bold">
              Eskalasi Pengaduan Digital
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#FFF4B7] text-[#000B58] text-[10px] font-extrabold shadow">
            Puncak: 636.014
          </span>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#FFF4B7]">
            Pertumbuhan Kumulatif Laporan IASC
          </h2>
          <p className="text-[11px] text-white/80 leading-relaxed mt-0.5">
            Lonjakan lebih dari 34x lipat dalam kurun 19 bulan operasional Satgas PASTI &amp; OJK.
          </p>
        </div>

        {/* Interactive Tap Helper Hint */}
        <div className="flex items-center gap-1.5 text-[10px] text-[#84d4d0] bg-[#000B58] px-2.5 py-1 rounded-lg border border-[#006A67]/40">
          <span className="material-symbols-outlined text-[13px]">touch_app</span>
          <span>Ketuk titik lingkaran pada grafik untuk melihat rincian laporan</span>
        </div>

        {/* SVG Chart Container */}
        <div className="w-full p-3 rounded-xl bg-[#000B58] border border-[#003161] relative">
          {/* Active Tap Node Modal/Callout */}
          {activeNode && (
            <div className="mb-2.5 p-2 rounded-lg bg-[#003161] border border-[#006A67] shadow-lg animate-fade-in flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-xs font-extrabold text-[#FFF4B7]">
                  {activeNode.count.toLocaleString('id-ID')} Laporan
                </div>
                <div className="text-[10px] text-[#84d4d0]">{activeNode.growthNote}</div>
              </div>
              <button
                onClick={() => setActiveNode(null)}
                className="w-6 h-6 rounded bg-[#000B58] text-white/70 hover:text-white flex items-center justify-center text-xs"
                aria-label="Tutup rincian"
              >
                ✕
              </button>
            </div>
          )}

          <div className="w-full">
            <svg
              className="w-full h-auto overflow-visible select-none"
              viewBox="0 0 350 175"
            >
              <defs>
                <linearGradient id="chartGradientMobile" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#84d4d0" stopOpacity="0.4"></stop>
                  <stop offset="100%" stopColor="#84d4d0" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>

              {/* Reference Gridlines */}
              <line stroke="#214778" strokeDasharray="3 3" strokeWidth="1" x1="26" x2="338" y1="20" y2="20"></line>
              <text className="font-mono" fill="#a7c8ff" fontSize="8" textAnchor="end" x="22" y="23">600k</text>

              <line stroke="#214778" strokeDasharray="3 3" strokeWidth="1" x1="26" x2="338" y1="65" y2="65"></line>
              <text className="font-mono" fill="#a7c8ff" fontSize="8" textAnchor="end" x="22" y="68">400k</text>

              <line stroke="#214778" strokeDasharray="3 3" strokeWidth="1" x1="26" x2="338" y1="110" y2="110"></line>
              <text className="font-mono" fill="#a7c8ff" fontSize="8" textAnchor="end" x="22" y="113">200k</text>

              <line stroke="#214778" strokeWidth="1" x1="26" x2="338" y1="150" y2="150"></line>
              <text className="font-mono" fill="#a7c8ff" fontSize="8" textAnchor="end" x="22" y="153">0</text>

              {/* Gradient Area Fill */}
              <path
                d="M 35 145 L 92 136 L 150 120 L 215 62 L 275 34 L 326 14 L 326 150 L 35 150 Z"
                fill="url(#chartGradientMobile)"
              ></path>

              {/* Glowing Line */}
              <path
                d="M 35 145 L 92 136 L 150 120 L 215 62 L 275 34 L 326 14"
                fill="none"
                stroke="#84d4d0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              ></path>

              {/* Interactive Nodes with Tap Target */}
              {cumulativeData.map((node) => {
                const isSelected = activeNode?.date === node.date;
                return (
                  <g
                    key={node.date}
                    className="cursor-pointer"
                    onClick={() => setActiveNode(isSelected ? null : node)}
                  >
                    {/* Invisible expanded tap circle */}
                    <circle cx={node.x} cy={node.y} r={16} fill="transparent" />

                    {/* Visible node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 7 : node.count === 636014 ? 5.5 : 4}
                      fill={isSelected ? '#FFF4B7' : '#84d4d0'}
                      stroke="#000B58"
                      strokeWidth="2"
                    />

                    {/* Date label at bottom */}
                    <text
                      fill={isSelected ? '#FFF4B7' : '#a7c8ff'}
                      fontSize="8"
                      fontWeight={isSelected ? 'bold' : '600'}
                      textAnchor="middle"
                      x={node.x}
                      y="164"
                    >
                      {node.date}
                    </text>

                    {/* Point Count on top */}
                    <text
                      fill="#FFF4B7"
                      fontSize={node.count === 636014 ? '9' : '7.5'}
                      fontWeight={node.count === 636014 ? '800' : '600'}
                      textAnchor={node.count === 636014 ? 'end' : 'middle'}
                      x={node.count === 636014 ? node.x - 3 : node.x}
                      y={node.count === 636014 ? node.y - 4 : node.y - 6}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Milestone Milestones (Vertical Stack) */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#000B58]">
          <div className="flex items-start gap-2.5 bg-[#000B58]/60 p-2.5 rounded-xl border border-[#003161]">
            <span className="material-symbols-outlined text-[#84d4d0] text-[18px] shrink-0 mt-0.5">speed</span>
            <div>
              <div className="text-[10px] uppercase text-white/60 font-bold">Awal Fase (Des 2024)</div>
              <div className="text-xs font-extrabold text-[#FFF4B7]">18.614 Laporan</div>
              <p className="text-[10px] text-white/70 leading-relaxed">
                Penipuan manual bergeser ke bot otomatis &amp; APK perbankan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-[#000B58]/60 p-2.5 rounded-xl border border-[#003161]">
            <span className="material-symbols-outlined text-[#84d4d0] text-[18px] shrink-0 mt-0.5">trending_up</span>
            <div>
              <div className="text-[10px] uppercase text-white/60 font-bold">Akselerasi 1 Tahun (Des 2025)</div>
              <div className="text-xs font-extrabold text-[#FFF4B7]">411.055 Laporan</div>
              <p className="text-[10px] text-white/70 leading-relaxed">
                Sindikat terorganisir mengeksekusi split transfer multi-rekening mule.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. COMPARATIVE ASSET RESCUE METRIC BARS (Rp 723,7 M vs Rp 204,3 M) */}
      <div className="flex flex-col p-4 rounded-2xl bg-[#003161] border border-[#FFF4B7]/15 shadow-xl gap-3">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#84d4d0] text-[18px]">account_balance</span>
          <span className="text-[11px] uppercase tracking-wider text-white/70 font-bold">
            Statistik Penyelamatan Aset
          </span>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#FFF4B7]">
            Komparasi Dana Terblokir vs Dikembalikan
          </h2>
          <p className="text-[11px] text-white/80 leading-relaxed mt-0.5">
            Perbandingan efektivitas blokir rekening darurat versus nominal yang dapat dipulihkan pasca-kejadian.
          </p>
        </div>

        {/* Tap Helper Hint */}
        <div className="flex items-center gap-1.5 text-[10px] text-[#84d4d0] bg-[#000B58] px-2.5 py-1 rounded-lg border border-[#006A67]/40">
          <span className="material-symbols-outlined text-[13px]">touch_app</span>
          <span>Ketuk salah satu batang untuk melihat analisis selisih dana</span>
        </div>

        {/* Interactive Metrics Bars with Tap State */}
        <div className="flex flex-col gap-3.5 p-3.5 rounded-xl bg-[#000B58] border border-[#003161]">
          {/* Bar 1: Dana Terblokir */}
          <div
            onClick={() => setActiveBar(activeBar === 'terblokir' ? null : 'terblokir')}
            className={`flex flex-col gap-1.5 p-2 rounded-lg transition-colors cursor-pointer ${
              activeBar === 'terblokir' ? 'bg-[#003161] ring-1 ring-[#84d4d0]' : 'hover:bg-[#003161]/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#84d4d0]"></span>
                Dana Berhasil Terblokir (IASC)
              </span>
              <span className="text-sm font-bold text-[#84d4d0]">Rp 723,7 M</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#000B58] overflow-hidden border border-[#003161]">
              <div
                className="h-full bg-[#84d4d0] rounded-full transition-all duration-700"
                style={{ width: '78%' }}
              ></div>
            </div>
            <span className="text-[10px] text-white/60">
              Pemblokiran saldo rekening penampung sistem perbankan
            </span>
          </div>

          {/* Bar 2: Dana Dikembalikan */}
          <div
            onClick={() => setActiveBar(activeBar === 'dikembalikan' ? null : 'dikembalikan')}
            className={`flex flex-col gap-1.5 p-2 rounded-lg transition-colors cursor-pointer ${
              activeBar === 'dikembalikan' ? 'bg-[#003161] ring-1 ring-[#FFF4B7]' : 'hover:bg-[#003161]/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#FFF4B7]"></span>
                Dana Berhasil Dikembalikan
              </span>
              <span className="text-sm font-bold text-[#FFF4B7]">Rp 204,3 M</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#000B58] overflow-hidden border border-[#003161]">
              <div
                className="h-full bg-[#FFF4B7] rounded-full transition-all duration-700"
                style={{ width: '28.2%' }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-white/70 text-[10px]">
              <span>Rasio Pemulihan: ~28,2% dari dana terblokir</span>
              <span className="text-[#FFF4B7] font-bold">Selisih waktu kritis</span>
            </div>
          </div>

          {/* Dynamic Tap Tooltip Box */}
          {activeBar && (
            <div className="p-2.5 bg-[#003161] rounded-lg text-[11px] text-[#FFF4B7] border border-[#006A67] flex items-start justify-between gap-2">
              <div className="leading-relaxed">
                {activeBar === 'terblokir'
                  ? 'Rp 723,7 Miliar terselamatkan di fase awal penahanan saldo rekening penampung lintas bank penerima.'
                  : 'Rp 204,3 Miliar berhasil direstitusi kepada korban melalui verifikasi kepolisian dan persetujuan bank.'}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBar(null);
                }}
                className="text-white/60 hover:text-white shrink-0 font-bold text-xs"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* National Total Damage Card */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/40 text-white">
          <span className="material-symbols-outlined text-2xl shrink-0 text-[#ffb4ab]">
            gpp_maybe
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-wider text-[#ffb4ab] font-bold">
              Total Kerugian Terlapor Nasional
            </span>
            <span className="text-xl font-extrabold text-[#FFF4B7]">
              Rp 9,1 Triliun
            </span>
            <span className="text-[10px] text-white/80 leading-relaxed mt-0.5">
              Data kompilasi s.d. 14 Januari 2026. Kurang dari 8% total kerugian terselamatkan jika pelaporan terlambat &gt;2 jam.
            </span>
          </div>
        </div>
      </div>

      {/* 4. HIGH CONTRAST CREAM PARADOX CARD (Stacked) */}
      <div className="p-5 rounded-2xl bg-[#FFF4B7] text-[#000B58] shadow-xl flex flex-col gap-4 border border-white">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#000B58] text-[#FFF4B7] text-[10px] font-bold font-mono">
            <span className="material-symbols-outlined text-[13px]">psychology_alt</span>
            PARADOKS PENYELAMATAN
          </span>
          <span className="material-symbols-outlined text-2xl opacity-30">format_quote</span>
        </div>

        <blockquote className="text-base font-extrabold leading-snug">
          “Sistem blokir sudah ada. Titik lemahnya ada di menit sebelum laporan masuk.”
        </blockquote>

        <p className="text-xs text-[#000B58]/90 font-medium leading-relaxed">
          Ketika panik, mahasiswa kehilangan <strong>3 hingga 5 jam</strong> untuk curhat ke medsos atau mencari nomor telepon yang salah. Padahal sindikat hanya butuh <strong>45 menit</strong> untuk menarik tunai saldo via rekening penampung bertingkat.
        </p>

        <div className="pt-3 border-t border-[#000B58]/20 flex flex-col gap-2">
          <div className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-[#000B58] text-[#FFF4B7] text-xs font-extrabold flex items-center justify-center gap-2 shadow-md">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            MISI SIGAP 60: PANGKAS LATENSI
          </div>
          <span className="text-center text-[10px] text-[#000B58]/70 font-semibold">
            Protokol pendampingan sebaya untuk respons terukur detik per detik.
          </span>
        </div>
      </div>

      {/* 5. 3-STEP 0-60 MINUTE TRIAGE LIFECYCLE (Stacked Cards) */}
      <div className="p-4 rounded-2xl bg-[#003161] border border-[#FFF4B7]/15 shadow-xl flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#84d4d0] text-[18px]">schedule</span>
          <span className="text-[11px] uppercase tracking-wider text-white/70 font-bold">
            Anatomi Siklus Pengurasan
          </span>
        </div>

        <h2 className="text-base font-bold text-[#FFF4B7]">
          Mengapa Menit 0–60 Menentukan?
        </h2>

        {/* 3 Step Cards */}
        <div className="flex flex-col gap-2.5">
          {/* Phase 1 */}
          <div className="p-3.5 rounded-xl bg-[#000B58] border border-[#003161] flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#93000a] text-white flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFF4B7]">Menit 00 – 15 (Kritis)</span>
                <span className="text-[10px] font-mono text-[#84d4d0]">Layer 1</span>
              </div>
              <p className="text-[11px] text-white/80 mt-0.5 leading-relaxed">
                Hubungi Call Center Bank untuk pembekuan akun pengirim &amp; penahanan (hold) rekening tujuan.
              </p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="p-3.5 rounded-xl bg-[#000B58] border border-[#003161] flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#006A67] text-[#FFF4B7] flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFF4B7]">Menit 15 – 45 (Interbank)</span>
                <span className="text-[10px] font-mono text-[#84d4d0]">Layer 2</span>
              </div>
              <p className="text-[11px] text-white/80 mt-0.5 leading-relaxed">
                Pengisian formulir koordinasi IASC OJK (<span className="text-[#84d4d0] font-mono">iasc.ojk.go.id</span>) untuk membekukan rekening penampung.
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="p-3.5 rounded-xl bg-[#000B58] border border-[#003161] flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#003161] text-[#FFF4B7] flex items-center justify-center font-bold text-sm shrink-0 border border-[#FFF4B7]/20">
              3
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFF4B7]">Menit 45 – 60 (Yuridis)</span>
                <span className="text-[10px] font-mono text-[#84d4d0]">Layer 3</span>
              </div>
              <p className="text-[11px] text-white/80 mt-0.5 leading-relaxed">
                Amankan tangkapan layar mutasi, nama akun target, dan chat sebelum dihapus sindikat untuk berkas kepolisian &amp; OJK 157.
              </p>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#000B58] border border-[#003161] text-[10px] text-white/70 flex items-center justify-between">
          <span>Setelah 60 menit: Dana dipecah ke ATM / kripto</span>
          <span className="text-[#84d4d0] font-bold">Rasio ampas &lt;5%</span>
        </div>
      </div>

      {/* 6. METHODOLOGY & DATA SOURCES */}
      <div className="p-4 rounded-2xl bg-[#003161]/80 border border-[#FFF4B7]/10 flex flex-col gap-2.5 text-white/70">
        <div className="flex items-center gap-1.5 text-white font-bold text-xs">
          <span className="material-symbols-outlined text-[#84d4d0] text-[16px]">analytics</span>
          <span>METODOLOGI &amp; SUMBER DATA</span>
        </div>
        <p className="text-[10px] leading-relaxed">
          Sumber: Publikasi OJK 2025–2026, Satgas PASTI, dan APJII. SIGAP 60 memandu alur mitigasi; wewenang hukum pemblokiran sepenuhnya berada pada Bank Penerbit dan OJK.
        </p>
      </div>
    </div>
  );
};
