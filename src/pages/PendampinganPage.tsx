import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentLog } from '../types';

export const PendampinganPage: React.FC = () => {
  const { addIncidentLog, setCurrentPage } = useApp();

  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(2);
  const [guideDrawerOpen, setGuideDrawerOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Form state for Anonymous Aggregate Log
  const [modus, setModus] = useState<IncidentLog['modus']>('impersonasi');
  const [timeToReport, setTimeToReport] = useState<IncidentLog['timeToReport']>('<30');
  const [status, setStatus] = useState<IncidentLog['status']>('iasc-process');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [lastSavedToken, setLastSavedToken] = useState('#SGP-842-88');

  // Checklist states for stage 2
  const [stage2Checks, setStage2Checks] = useState({
    url: true,
    noPin: true,
    ticket: false,
    proof: false,
  });

  const handleCopyUrl = () => {
    navigator.clipboard.writeText('https://iasc.ojk.go.id').then(() => {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    });
  };

  const handleSaveAggregate = (e: React.FormEvent) => {
    e.preventDefault();

    const modusMap: Record<IncidentLog['modus'], string> = {
      belanja: 'Belanja Online',
      impersonasi: 'Impersonasi / Social Engineering',
      investasi: 'Investasi Bodong',
      loker: 'Lowongan Kerja Palsu',
      medsos: 'Media Sosial (Takeover / Phishing)',
      apk: 'APK Undangan / File Phishing',
    };

    const timeMap: Record<IncidentLog['timeToReport'], string> = {
      '<30': '<30 menit (Golden Hour)',
      '30-60': '30-60 menit (Golden Hour)',
      '1-12': '1 - 12 Jam',
      '>12': '> 12 Jam',
    };

    const statusMap: Record<IncidentLog['status'], string> = {
      'iasc-process': 'Laporan IASC Terkirim (Menunggu Tiket)',
      'bank-frozen': 'Rekening Berhasil Dibekukan Bank',
      collecting: 'Sedang Mengumpulkan Berkas Bukti',
      escalated: 'Eskalasi ke Pos BEM / Konseling Psikologis',
    };

    addIncidentLog({
      modus,
      modusLabel: modusMap[modus],
      timeToReport,
      timeLabel: timeMap[timeToReport],
      status,
      statusLabel: statusMap[status],
    });

    const token = `#SGP-${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}`;
    setLastSavedToken(token);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const stageNames = [
    { num: 1, label: '1. Bank', subtitle: 'Triage Call Center' },
    { num: 2, label: '2. IASC', subtitle: 'Portal Satgas' },
    { num: 3, label: '3. Bukti', subtitle: 'Preservasi Berkas' },
    { num: 4, label: '4. 157', subtitle: 'Eskalasi OJK' },
  ];

  return (
    <div className="w-full flex flex-col gap-6 pb-6 max-w-[390px] mx-auto">
      {/* Header Info */}
      <header className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#001d1c] text-[#84d4d0] text-[10px] font-bold tracking-wider uppercase border border-[#006A67]">
          <span className="w-2 h-2 rounded-full bg-[#84d4d0] animate-ping"></span>
          <span>TERENKRIPSI SISI KLIEN</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#FFF4B7] tracking-tight">
          Sesi Pendampingan Laporan
        </h1>
        <p className="text-xs text-white/80 leading-relaxed">
          Panduan interaktif tatap muka / sambungan telepon untuk mendampingi korban penipuan digital tanpa melanggar privasi.
        </p>
      </header>

      {/* Stepper (4 Stages with >= 48px tap targets, 2x2 Grid) */}
      <div className="grid grid-cols-2 gap-2">
        {stageNames.map((stage) => {
          const isActive = activeStage === stage.num;
          const isCompleted = activeStage > stage.num;
          return (
            <button
              key={stage.num}
              onClick={() => setActiveStage(stage.num as 1 | 2 | 3 | 4)}
              className={`min-h-[48px] p-2.5 rounded-xl flex items-center gap-2 text-left transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#FFF4B7] text-[#000B58] border-white shadow-md'
                  : isCompleted
                  ? 'bg-[#000B58] text-white border-[#006A67]'
                  : 'bg-[#003161] text-white/70 border-[#003161]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isActive
                    ? 'bg-[#000B58] text-[#FFF4B7]'
                    : isCompleted
                    ? 'bg-[#006A67] text-[#FFF4B7]'
                    : 'bg-[#000B58] text-white/60'
                }`}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-[15px]">check</span>
                ) : (
                  `0${stage.num}`
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`text-[11px] font-extrabold truncate ${isActive ? 'text-[#000B58]' : 'text-white'}`}>
                  {stage.label}
                </span>
                <span className={`text-[9px] truncate ${isActive ? 'text-[#000B58]/70' : 'text-white/50'}`}>
                  {stage.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Safety Reminder Card (Cream Highlight) */}
      <div className="w-full bg-[#FFF4B7] text-[#000B58] p-4 rounded-xl flex flex-col gap-1.5 shadow-md border border-white">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[20px] font-bold">gshield</span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider">
            Pengingat Keamanan Mandat
          </span>
        </div>
        <div className="text-xs font-extrabold leading-snug">
          “Jangan meminta atau menyimpan kata sandi, PIN, OTP, atau foto bukti korban.”
        </div>
        <p className="text-[11px] text-[#000B58]/90 font-medium leading-relaxed">
          Dampingi dengan mata memandu, bukan mengambil alih kendali gawai milik korban (UU PDP No. 27/2022).
        </p>
      </div>

      {/* Active Stage Details Card */}
      <div className="w-full bg-[#003161] border border-[#FFF4B7]/15 p-4 rounded-2xl flex flex-col gap-4 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-[#84d4d0] font-bold">
            Tahap {activeStage} dari 4
          </span>
          <span className="text-[10px] bg-[#000B58] text-white px-2 py-0.5 rounded font-mono border border-[#006A67]/40">
            Prosedur Resmi
          </span>
        </div>

        <h2 className="text-lg font-bold text-[#FFF4B7]">
          {activeStage === 1 && 'Hubungi Bank Terkait'}
          {activeStage === 2 && 'Lapor di IASC (iasc.ojk.go.id)'}
          {activeStage === 3 && 'Amankan Berkas Digital'}
          {activeStage === 4 && 'Eskalasi ke Kontak 157'}
        </h2>

        {/* Guided Script */}
        <div className="bg-[#000B58] p-3.5 rounded-xl flex flex-col gap-2 border border-[#003161]">
          <div className="flex items-center gap-1.5 text-[#84d4d0] text-[10px] font-bold uppercase">
            <span className="material-symbols-outlined text-[15px]">record_voice_over</span>
            <span>Skrip Panduan Pendamping:</span>
          </div>
          <blockquote className="text-xs text-[#FFF4B7] italic pl-2.5 border-l-2 border-[#84d4d0] leading-relaxed">
            {activeStage === 1 &&
              '“Tanyakan: Bank apa yang kamu gunakan dan ke mana saldo ditransfer? Mari hubungi call center resminya sekarang.”'}
            {activeStage === 2 &&
              '“Tanyakan: Apakah sudah menghubungi bank? Bantu korban membuka iasc.ojk.go.id dan membaca formulir, jangan mengetik data korban.”'}
            {activeStage === 3 &&
              '“Tanyakan: Jangan hapus riwayat chat WhatsApp. Ambil tangkapan layar nomor ponsel pelaku & bukti transfer mutasi.”'}
            {activeStage === 4 &&
              '“Tanyakan: Nomor tiket aduan IASC sudah dicatat? Sekarang hubungi hotline 157 OJK untuk pengawasan hak konsumen.”'}
          </blockquote>

          {activeStage === 2 && (
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleCopyUrl}
                className="w-full min-h-[48px] rounded-xl bg-[#006A67] hover:bg-[#00827e] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                <span>{copiedUrl ? 'Alamat Tersalin!' : 'Salin Alamat iasc.ojk.go.id'}</span>
              </button>

              <button
                onClick={() => setGuideDrawerOpen(!guideDrawerOpen)}
                className="w-full min-h-[48px] rounded-xl bg-[#003161] text-[#FFF4B7] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#FFF4B7]/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span>{guideDrawerOpen ? 'Tutup Panduan Kolom' : 'Panduan Kolom Form IASC'}</span>
              </button>

              <a
                href="https://iasc.ojk.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] rounded-xl bg-[#FFF4B7] text-[#000B58] text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <span>Kunjungi iasc.ojk.go.id</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>
          )}

          {activeStage === 2 && guideDrawerOpen && (
            <div className="p-3 rounded-lg bg-[#000B58] border border-[#006A67]/40 text-xs text-white/90 space-y-1 mt-1">
              <span className="font-bold text-[#FFF4B7] block text-xs">Kolom Kritis:</span>
              <p>• Data Pelapor: Nama lengkap &amp; NIK korban.</p>
              <p>• Identitas Terlapor: Bank &amp; nomor rekening penipu.</p>
              <p>• Bukti Digital: File PDF/JPG resi transfer &amp; chat WA.</p>
              <p>• Nomor Tiket: Wajib disimpan untuk follow-up.</p>
            </div>
          )}
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase text-[#FFF4B7]">
            Daftar Periksa Pendamping:
          </span>
          <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#000B58] border border-[#003161] select-none min-h-[48px] cursor-pointer">
            <input
              type="checkbox"
              checked={stage2Checks.url}
              onChange={(e) => setStage2Checks({ ...stage2Checks, url: e.target.checked })}
              className="mt-1 w-5 h-5 rounded accent-[#006A67] shrink-0"
            />
            <span className="text-xs text-white leading-snug">
              Pastikan URL pada browser korban persis <strong>https://iasc.ojk.go.id</strong>.
            </span>
          </label>

          <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#000B58] border border-[#003161] select-none min-h-[48px] cursor-pointer">
            <input
              type="checkbox"
              checked={stage2Checks.noPin}
              onChange={(e) => setStage2Checks({ ...stage2Checks, noPin: e.target.checked })}
              className="mt-1 w-5 h-5 rounded accent-[#006A67] shrink-0"
            />
            <span className="text-xs text-white leading-snug">
              Dampingi pembacaan pertanyaan formulir tanpa meminta melihat PIN atau kata sandi.
            </span>
          </label>

          <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#000B58] border border-[#003161] select-none min-h-[48px] cursor-pointer">
            <input
              type="checkbox"
              checked={stage2Checks.ticket}
              onChange={(e) => setStage2Checks({ ...stage2Checks, ticket: e.target.checked })}
              className="mt-1 w-5 h-5 rounded accent-[#006A67] shrink-0"
            />
            <span className="text-xs text-white leading-snug">
              Ingatkan korban mencatat Nomor Tiket Laporan IASC untuk referensi kepolisian &amp; bank.
            </span>
          </label>
        </div>

        {/* Stepper Navigation: Full-width min-h-[48px] */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#000B58]">
          <button
            onClick={() => {
              if (activeStage < 4) {
                setActiveStage((activeStage + 1) as 1 | 2 | 3 | 4);
              } else {
                setCurrentPage('dasbor');
              }
            }}
            className="w-full min-h-[48px] rounded-xl bg-[#006A67] hover:bg-[#00827e] text-[#FFF4B7] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow border border-[#FFF4B7]/20"
          >
            <span>
              {activeStage < 4
                ? `Lanjut ke Tahap ${activeStage + 1}`
                : 'Lihat Dasbor Rekapitulasi'}
            </span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>

          {activeStage > 1 && (
            <button
              onClick={() => setActiveStage(Math.max(1, activeStage - 1) as 1 | 2 | 3 | 4)}
              className="w-full min-h-[48px] rounded-xl bg-[#000B58] text-white/80 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-[#003161]"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Kembali ke Tahap Sebelumnya</span>
            </button>
          )}
        </div>
      </div>

      {/* Aggregate Log Form Card */}
      <div className="w-full bg-[#003161] border border-[#FFF4B7]/15 p-4 rounded-2xl flex flex-col gap-3 shadow-md">
        <div className="flex items-center gap-2 pb-1 border-b border-[#000B58]">
          <span className="material-symbols-outlined text-[#84d4d0] text-[20px]">bar_chart</span>
          <div>
            <h3 className="text-sm font-bold text-[#FFF4B7]">Catatan Agregat Sesi</h3>
            <p className="text-[10px] text-white/60">
              Data anonim radar insiden tanpa identitas korban.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveAggregate} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="modus-mob-select" className="text-xs font-bold text-white">
              Jenis Modus Kejahatan Siber
            </label>
            <select
              id="modus-mob-select"
              value={modus}
              onChange={(e) => setModus(e.target.value as IncidentLog['modus'])}
              className="w-full min-h-[48px] px-3 rounded-xl bg-[#000B58] border border-[#003161] text-white text-xs focus:ring-1 focus:ring-[#FFF4B7]"
            >
              <option value="impersonasi">Impersonasi / Social Engineering</option>
              <option value="belanja">Belanja Online Fiktif</option>
              <option value="investasi">Investasi Bodong</option>
              <option value="loker">Lowongan Kerja Palsu</option>
              <option value="medsos">Media Sosial Phishing</option>
              <option value="apk">APK Undangan Fiktif</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="time-mob-select" className="text-xs font-bold text-white">
              Perkiraan Waktu Sejak Kejadian
            </label>
            <select
              id="time-mob-select"
              value={timeToReport}
              onChange={(e) => setTimeToReport(e.target.value as IncidentLog['timeToReport'])}
              className="w-full min-h-[48px] px-3 rounded-xl bg-[#000B58] border border-[#003161] text-white text-xs focus:ring-1 focus:ring-[#FFF4B7]"
            >
              <option value="<30">&lt; 30 Menit (Golden Hour Emas)</option>
              <option value="30-60">30 - 60 Menit (Golden Hour Siaga)</option>
              <option value="1-12">1 - 12 Jam</option>
              <option value=">12">&gt; 12 Jam</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="status-mob-select" className="text-xs font-bold text-white">
              Status Hasil Pendampingan
            </label>
            <select
              id="status-mob-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as IncidentLog['status'])}
              className="w-full min-h-[48px] px-3 rounded-xl bg-[#000B58] border border-[#003161] text-white text-xs focus:ring-1 focus:ring-[#FFF4B7]"
            >
              <option value="iasc-process">Laporan IASC Terkirim</option>
              <option value="bank-frozen">Rekening Dibekukan Bank</option>
              <option value="collecting">Mengumpulkan Bukti</option>
              <option value="escalated">Eskalasi Pos BEM</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full min-h-[48px] rounded-xl bg-[#006A67] hover:bg-[#00827e] text-[#FFF4B7] text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer border border-[#FFF4B7]/20 mt-1"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>Simpan Catatan Anonim</span>
          </button>

          {saveSuccess ? (
            <div className="p-2.5 rounded-lg bg-[#000B58] border border-[#84d4d0] text-[11px] text-[#FFF4B7] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#84d4d0] text-[16px]">check_circle</span>
              <span>
                Tersimpan anonim! Token: <strong>{lastSavedToken}</strong>.
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-white/50 text-[10px]">
              <span>Radar Kampus</span>
              <span className="font-mono text-[#84d4d0] font-bold">{lastSavedToken}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
