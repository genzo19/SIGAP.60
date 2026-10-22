import React, { useState, useEffect } from 'react';
import { ScenarioQuestion } from '../types';

const drillScenarios: ScenarioQuestion[] = [
  {
    id: 's-belanja',
    category: 'Belanja Online',
    badge: 'Scam APK',
    sender: 'Ekspedisi Kilat [PALSU]',
    platform: '+62 812-9981-XXXX • WA Phishing Mock',
    time: '14:02',
    message: '“Paket Anda tertahan di transit regional. Klik tautan cekresi-ongkir-bayar.apk untuk melunasi ongkir Rp 15.000 agar segera dikirim.”',
    linkText: 'cekresi-ongkir-bayar.apk',
    prompt: 'Kamu baru sadar sudah transfer biaya dan klik tautan. Apa langkah pertamamu?',
    options: [
      {
        key: 'A',
        text: 'Hubungi bank untuk meminta penundaan transaksi & blokir rekening tujuan',
        isCorrect: true,
        note: 'Pilihan Refleks Golden Hour',
      },
      {
        key: 'B',
        text: 'Tutup aplikasi dan pasrah menunggu paket datang',
        isCorrect: false,
        note: 'Tidak efektif - saldo terkuras',
      },
      {
        key: 'C',
        text: 'Kirim pesan caci maki ke nomor WhatsApp pengirim',
        isCorrect: false,
        note: 'Risiko blokir kontak sepihak',
      },
      {
        key: 'D',
        text: 'Curhat dan buat status komplain di media sosial',
        isCorrect: false,
        note: 'Membuang 3-5 jam emas',
      },
    ],
    explanation: 'Golden Hour (60 Menit Pertama) adalah jendela krusial sebelum sistem kliring antarbank memindahkan saldo secara tuntas atau sebelum sindikat menarik tunai di ATM. Menghubungi fraud call center bank untuk membekukan rekening penampung adalah tindakan darurat nomor 1.',
    recoveryPotential: 'Tindakan cepat ini menyelamatkan potensi pemulihan dana hingga 84%.',
  },
  {
    id: 's-impersonasi',
    category: 'Impersonasi',
    badge: 'Sos-Eng',
    sender: 'Prof. Bambang [Palsu]',
    platform: '+62 857-1122-XXXX • Profil Dosen Palsu',
    time: '09:15',
    message: '“Halo mas, bapak sedang rapat senat mendesak. Tolong talangi transfer Rp 2.500.000 ke bendahara sistem, sore diganti uang dinas.”',
    prompt: 'Kamu terlanjur transfer karena segan pada atasan. Apa tindakan pertama 0-15 menit?',
    options: [
      {
        key: 'A',
        text: 'Segera telepon call center bank pengirim minta penahanan transaksi darurat',
        isCorrect: true,
        note: 'Pilihan Refleks Tepat',
      },
      {
        key: 'B',
        text: 'Tunggu sampai sore hari menagih ganti rugi ke dekanat',
        isCorrect: false,
        note: 'Terlambat, saldo telah dilarikan',
      },
      {
        key: 'C',
        text: 'Hapus riwayat obrolan agar tidak malu pada dekan asli',
        isCorrect: false,
        note: 'Menghilangkan alat bukti hukum',
      },
      {
        key: 'D',
        text: 'Pinjam uang ke pinjol untuk menutupi saldo tabungan',
        isCorrect: false,
        note: 'Menambah kerugian finansial',
      },
    ],
    explanation: 'Pelaku impersonasi memanfaatkan relasi kuasa. Begitu menyadari adanya penipuan, kecepatan menghubungi bank dalam menit pertama adalah satu-satunya benteng penyelamat saldo sebelum sindikat memecah dana ke rekening mule layer-2.',
    recoveryPotential: 'Penanganan seketika meningkatkan peluang penahanan saldo hingga 80%.',
  },
  {
    id: 's-investasi',
    category: 'Investasi',
    badge: 'Tugas Bodong',
    sender: 'Admin Freelance [PALSU]',
    platform: '@TaskFreelanceID • Grup Telegram',
    time: '19:40',
    message: '“Tugas like YouTube berhasil. Komisi Rp 80.000 cair. Untuk buka tugas VIP reward Rp 5.000.000, setor deposit jaminan Rp 1.500.000.”',
    prompt: 'Setelah transfer Rp 1.500.000, admin meminta transfer lagi Rp 4.000.000 untuk unfreeze saldo. Sikapmu?',
    options: [
      {
        key: 'A',
        text: 'Stop transfer sepeser pun, catat rekening penipu & lapor ke bank + IASC OJK',
        isCorrect: true,
        note: 'Pilihan Refleks Tanggap',
      },
      {
        key: 'B',
        text: 'Transfer Rp 4.000.000 lagi agar deposit awal bisa ditarik',
        isCorrect: false,
        note: 'Sunk cost fallacy - jebakan deposit berulang',
      },
      {
        key: 'C',
        text: 'Minta tolong hacker di Instagram untuk meretas rekening admin',
        isCorrect: false,
        note: 'Scam pemulihan palsu (recovery scam)',
      },
      {
        key: 'D',
        text: 'Diam saja karena merasa bersalah tergiur uang mudah',
        isCorrect: false,
        note: 'Membiarkan pelaku memangsa korban lain',
      },
    ],
    explanation: 'Sindikat tugas online tidak akan pernah mengembalikan uang; mereka terus memeras dengan dalih biaya aktivasi. Berhenti membayar seketika dan langsung lapor bank adalah proteksi mutlak.',
    recoveryPotential: 'Memutus rantai transaksi mencegah kerugian berlipat ganda 100%.',
  },
  {
    id: 's-loker',
    category: 'Lowongan Kerja',
    badge: 'Travel Fiktif',
    sender: 'PT Rekrutmen BUMN [PALSU]',
    platform: 'hrd-recruitment@mail-palsu.com • Email',
    time: '11:20',
    message: '“Selamat lolos berkas seleksi di Bali. Pemesanan tiket pesawat & hotel wajib lewat biro travel mitra Rp 1.850.000 (reimburse di lokasi).”',
    prompt: 'Kamu baru transfer ke biro travel fiktif tersebut dan sadar itu penipuan. Apa langkah utamamu?',
    options: [
      {
        key: 'A',
        text: 'Telepon call center bank darurat untuk blokir rekening travel penipu & amankan bukti transfer',
        isCorrect: true,
        note: 'Pilihan Refleks Tepat',
      },
      {
        key: 'B',
        text: 'Tetap pergi ke bandara berharap tiket pesawat terbit',
        isCorrect: false,
        note: 'Membuang biaya perjalanan fisik',
      },
      {
        key: 'C',
        text: 'Kirim email protes ke alamat email pengirim',
        isCorrect: false,
        note: 'Email palsu tidak akan merespons',
      },
      {
        key: 'D',
        text: 'Pasrah dan menganggap uang hilang sebagai nasib sial',
        isCorrect: false,
        note: 'Kehilangan hak proteksi konsumen',
      },
    ],
    explanation: 'BUMN resmi tidak pernah memungut biaya akomodasi atau mewajibkan pembelian tiket via travel tertentu. Laporan cepat ke bank dan portal IASC OJK akan membekukan rekening sindikat travel fiktif.',
    recoveryPotential: 'Menghambat sindikat sebelum menarik tunai di ATM lokal.',
  },
  {
    id: 's-medsos',
    category: 'Media Sosial',
    badge: 'WA Dibajak',
    sender: 'Dinda (Teman) [Akun Dihack]',
    platform: '+62 813-8877-XXXX • WA Kena Bajak',
    time: '21:05',
    message: '“Bisa pinjem saldo ShopeePay / rekening Rp 500rb gak bentar aja? M-bankingku error, besok pagi jam 8 aku balikin lunas.”',
    prompt: 'Kamu sudah transfer dan 2 menit kemudian Dinda asli mengabari WA-nya dibajak. Tindakanmu?',
    options: [
      {
        key: 'A',
        text: 'Buka m-banking, catat nomor rekening tujuan & hubungi bank untuk laporkan fraud cybercrime',
        isCorrect: true,
        note: 'Pilihan Refleks Tepat',
      },
      {
        key: 'B',
        text: 'Marahi Dinda asli dan paksa dia mengganti uangnya seketika',
        isCorrect: false,
        note: 'Dinda juga korban peretasan akun',
      },
      {
        key: 'C',
        text: 'Menghubungi dukun online untuk melacak pelaku',
        isCorrect: false,
        note: 'Irasional dan berbahaya',
      },
      {
        key: 'D',
        text: 'Hapus kontak WhatsApp nomor yang dibajak',
        isCorrect: false,
        note: 'Menghilangkan log nomor telepon pelaku',
      },
    ],
    explanation: 'Pembajakan akun WA teman sering memanfaatkan kedekatan emosional. Mengetahui rekening penerima bukan atas nama temanmu adalah tanda bahaya. Segera hubungi bank pengirim dan bank penerima dalam Golden Hour.',
    recoveryPotential: 'Tindakan dalam 15 menit menyelamatkan sisa saldo yang belum ditarik.',
  },
];

export const LatihanPage: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(10.0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(1);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const currentScenario = drillScenarios[activeScenarioIdx];

  useEffect(() => {
    setTimerSeconds(10.0);
    setIsTimerRunning(true);
    setSelectedOptionKey(null);
    setHasAnswered(false);
  }, [activeScenarioIdx]);

  useEffect(() => {
    if (!isTimerRunning || hasAnswered) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 0.1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          return 0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isTimerRunning, hasAnswered]);

  const handleSelectOption = (key: string, isCorrect: boolean) => {
    setSelectedOptionKey(key);
    setHasAnswered(true);
    setIsTimerRunning(false);
    if (isCorrect) {
      setCorrectAnswersCount((prev) => Math.min(5, prev + 1));
    }
  };

  const handleNextExercise = () => {
    setActiveScenarioIdx((prev) => (prev + 1) % drillScenarios.length);
  };

  return (
    <div className="w-full flex flex-col gap-5 pb-6 max-w-[390px] mx-auto">
      {/* Permanent Simulation Badge */}
      <div className="w-full bg-[#FFF4B7] text-[#000B58] px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between border border-white">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#000B58] text-[#FFF4B7] font-bold text-[10px]">
            🛡️
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-tight">
            SIMULASI — BUKAN LAYANAN RESMI
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-[#006A67] animate-pulse"></span>
      </div>

      {/* Header with Title & Scenarios Carousel */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-[#FFF4B7] tracking-tight">
            Drill Refleks Tanggap
          </h1>
          <span className="bg-[#006A67] text-[#FFF4B7] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border border-[#FFF4B7]/20">
            GOLDEN 60
          </span>
        </div>

        {/* 5 Scenario Chips (Horizontally scrollable without page overflow, min-h-[48px]) */}
        <div className="overflow-x-auto no-scrollbar flex items-center gap-2 py-1">
          {drillScenarios.map((sc, idx) => {
            const isActive = idx === activeScenarioIdx;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioIdx(idx)}
                className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#006A67] text-[#FFF4B7] shadow-md border border-[#FFF4B7]/40'
                    : 'bg-[#003161] text-white/70 border border-[#003161]'
                }`}
              >
                {sc.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* 10-Second Countdown Meter */}
      <div className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-3.5 shadow-md flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#FFF4B7] font-bold">
            <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
            <span>JAWAB DALAM 10 DETIK</span>
          </div>
          <span className="text-sm font-extrabold text-[#FFF4B7] font-mono">
            {timerSeconds.toFixed(1)}s
          </span>
        </div>
        <div className="w-full h-2 bg-[#000B58] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-100 ${
              timerSeconds <= 3 ? 'bg-[#ffb4ab]' : 'bg-[#006A67]'
            }`}
            style={{ width: `${(timerSeconds / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Simulated Scam Message Bubble */}
      <div className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-4 shadow-md flex flex-col gap-2.5">
        <div className="flex items-center justify-between pb-2 bg-[#002447] px-3 py-2 rounded-lg border border-[#003161]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#006A67] flex items-center justify-center text-white shrink-0 text-xs">
              💬
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">{currentScenario.sender}</span>
              <span className="text-[10px] text-white/60 truncate">{currentScenario.platform}</span>
            </div>
          </div>
          <span className="text-[10px] bg-red-500/20 text-red-300 font-bold px-1.5 py-0.5 rounded shrink-0">
            {currentScenario.badge}
          </span>
        </div>

        <div className="bg-[#000B58] p-3 rounded-xl border border-[#003161]">
          <p className="text-xs text-white/95 leading-relaxed">
            {currentScenario.message}
          </p>
        </div>
      </div>

      {/* Prompt Question */}
      <div className="flex items-center gap-1.5 px-0.5">
        <span className="text-base">❓</span>
        <h2 className="text-xs font-bold text-[#FFF4B7] leading-snug">
          {currentScenario.prompt}
        </h2>
      </div>

      {/* Options A, B, C, D (Each min-h-[48px], full width) */}
      <div className="flex flex-col gap-2.5">
        {currentScenario.options.map((opt) => {
          const isSelected = selectedOptionKey === opt.key;
          const showSuccess = hasAnswered && opt.isCorrect;
          const showWrong = hasAnswered && isSelected && !opt.isCorrect;

          return (
            <button
              key={opt.key}
              onClick={() => handleSelectOption(opt.key, opt.isCorrect)}
              className={`w-full min-h-[48px] p-3 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                showSuccess
                  ? 'bg-[#006A67] text-[#FFF4B7] border-[#FFF4B7] shadow'
                  : showWrong
                  ? 'bg-[#93000a] text-white border-[#ffb4ab]'
                  : isSelected
                  ? 'bg-[#006A67] text-[#FFF4B7] border-[#FFF4B7]'
                  : 'bg-[#003161] text-white/90 hover:bg-[#003161]/80 border-[#FFF4B7]/10'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center text-xs shrink-0 ${
                    showSuccess
                      ? 'bg-[#000B58] text-[#FFF4B7]'
                      : 'bg-[#000B58] text-white/70'
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-xs font-semibold leading-snug line-clamp-2">
                  {opt.text}
                </span>
              </div>

              {showSuccess && (
                <span className="material-symbols-outlined text-base text-[#FFF4B7] shrink-0">
                  check_circle
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Card (Cream Container with Navy Text) */}
      <div className="bg-[#FFF4B7] text-[#000B58] rounded-xl p-4 shadow-md flex flex-col gap-2 border border-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#006A67] font-bold">
              verified_user
            </span>
            <span className="text-xs font-extrabold">
              {hasAnswered && selectedOptionKey === 'A'
                ? `Tepat! Respons: ${(10 - timerSeconds).toFixed(1)}s`
                : hasAnswered
                ? 'Evaluasi Refleks'
                : 'Target Respons: < 10 Detik'}
            </span>
          </div>
          <span className="bg-[#000B58] text-[#FFF4B7] text-[9px] px-2 py-0.5 rounded font-extrabold uppercase">
            REFLEKS SIAGA
          </span>
        </div>
        <p className="text-xs text-[#000B58]/95 font-medium leading-relaxed">
          {currentScenario.explanation}
        </p>
      </div>

      {/* Progress & Next Button (Full-width min-h-[48px] in lower half for one-handed thumb use) */}
      <div className="bg-[#003161] border border-[#FFF4B7]/15 rounded-xl p-4 flex flex-col gap-3 shadow-md">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/70 font-semibold">
            Latihan {activeScenarioIdx + 1} dari 5
          </span>
          <span className="font-bold text-[#FFF4B7]">
            {Math.round(((activeScenarioIdx + 1) / 5) * 100)}%
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 w-full">
          {[0, 1, 2, 3, 4].map((stepIdx) => (
            <div
              key={stepIdx}
              className={`h-1.5 rounded transition-colors ${
                stepIdx < activeScenarioIdx
                  ? 'bg-[#006A67]'
                  : stepIdx === activeScenarioIdx
                  ? 'bg-[#FFF4B7]'
                  : 'bg-[#000B58]'
              }`}
            ></div>
          ))}
        </div>

        <button
          onClick={handleNextExercise}
          className="w-full min-h-[48px] rounded-xl bg-[#006A67] hover:bg-[#00827e] text-[#FFF4B7] font-extrabold text-xs flex items-center justify-center gap-2 shadow cursor-pointer border border-[#FFF4B7]/20 mt-1"
        >
          <span>Latihan Berikutnya</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
