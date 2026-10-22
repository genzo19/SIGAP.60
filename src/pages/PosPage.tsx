import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface PosItem {
  id: string;
  name: string;
  subname: string;
  distance: string;
  volunteers: number;
  operatingHours: string;
  isOnlineNow: boolean;
  specialty: string;
  icon: string;
  category: 'menwa' | 'bem' | 'layanan' | 'siber';
  phone: string;
}

const mockPosts: PosItem[] = [
  {
    id: 'pos-1',
    name: 'Pos SIGAP UKM Menwa',
    subname: 'Kampus Nusantara - Contoh',
    distance: '~1,2 km',
    volunteers: 8,
    operatingHours: 'AKTIF SEKARANG',
    isOnlineNow: true,
    specialty: 'Triage darurat jam pertama & pendampingan panggilan bank darurat.',
    icon: 'military_tech',
    category: 'menwa',
    phone: 'tel:081299001122',
  },
  {
    id: 'pos-2',
    name: 'Advokasi Siber BEM FT',
    subname: 'Fakultas Teknik - Contoh',
    distance: '~2,5 km',
    volunteers: 6,
    operatingHours: 'AKTIF SEKARANG',
    isOnlineNow: true,
    specialty: 'Verifikasi metadata screenshot transaksi & kawal formulir IASC OJK.',
    icon: 'shield',
    category: 'bem',
    phone: 'tel:081299003344',
  },
  {
    id: 'pos-3',
    name: 'Biro Kesejahteraan Mhs',
    subname: 'Gedung Pelayanan Rektorat - Contoh',
    distance: '~3,8 km',
    volunteers: 12,
    operatingHours: '08.00 - 20.00',
    isOnlineNow: false,
    specialty: 'Mitigasi intimidasi pelaku, mediasi konseling & stabilisasi psikologis.',
    icon: 'psychology',
    category: 'layanan',
    phone: 'tel:081299005566',
  },
  {
    id: 'pos-4',
    name: 'UKM Komputasi & Siber',
    subname: 'Lab Riset Gedung C - Contoh',
    distance: '~4,1 km',
    volunteers: 5,
    operatingHours: '08.00 - 20.00',
    isOnlineNow: false,
    specialty: 'Pemeriksaan phishing perbankan & sanitasi file APK/ekstensi fiktif.',
    icon: 'terminal',
    category: 'siber',
    phone: 'tel:081299007788',
  },
];

export const PosPage: React.FC = () => {
  const { openChatModal, setCurrentPage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'menwa' | 'bem' | 'layanan' | 'siber'>('all');

  // Filter logic
  const filteredPosts = mockPosts.filter((pos) => {
    const matchesFilter = selectedFilter === 'all' || pos.category === selectedFilter;
    const matchesSearch =
      pos.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.subname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-6 pb-6 max-w-[390px] mx-auto">
      {/* Hero Header */}
      <section className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-1.5 self-start bg-[#003161] px-3 py-1 rounded-lg border border-[#006A67]/40 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#84d4d0] animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#FFF4B7] font-mono">
            RADAR RELAWAN AKTIF
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold text-[#FFF4B7] tracking-tight">
            Pos Pendamping Kampus
          </h1>
          <p className="text-xs text-white/90 leading-relaxed">
            Mahasiswa terlatih yang memandu, tanpa memegang uang atau akunmu.
          </p>
        </div>

        {/* Active Volunteers Banner */}
        <div className="flex items-center gap-3 bg-[#003161] border border-[#FFF4B7]/15 p-3.5 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-[#000B58] flex items-center justify-center text-[#84d4d0] border border-[#006A67] shrink-0">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FFF4B7]">31 Relawan Aktif</span>
              <span className="text-[9px] bg-[#006A67] text-white px-1.5 py-0.5 rounded font-bold">
                Terverifikasi
              </span>
            </div>
            <span className="text-[11px] text-white/70">Siaga dalam radius 5 km sekitarmu</span>
          </div>
        </div>

        {/* Search Input (min-h-[48px]) */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pos atau kampus..."
            className="w-full pl-10 pr-4 min-h-[48px] bg-[#000B58] rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#FFF4B7] border border-[#003161] text-xs"
          />
        </div>

        {/* Filter Chips (Horizontally Scrollable without page scroll) */}
        <div className="overflow-x-auto no-scrollbar flex items-center gap-2 py-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#006A67] text-[#FFF4B7] border border-[#FFF4B7]/40 shadow'
                : 'bg-[#003161] text-white/70 border border-[#003161]'
            }`}
          >
            Semua Pos (4)
          </button>
          <button
            onClick={() => setSelectedFilter('menwa')}
            className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === 'menwa'
                ? 'bg-[#006A67] text-[#FFF4B7] border border-[#FFF4B7]/40 shadow'
                : 'bg-[#003161] text-white/70 border border-[#003161]'
            }`}
          >
            Menwa
          </button>
          <button
            onClick={() => setSelectedFilter('bem')}
            className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === 'bem'
                ? 'bg-[#006A67] text-[#FFF4B7] border border-[#FFF4B7]/40 shadow'
                : 'bg-[#003161] text-white/70 border border-[#003161]'
            }`}
          >
            BEM FT
          </button>
          <button
            onClick={() => setSelectedFilter('layanan')}
            className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === 'layanan'
                ? 'bg-[#006A67] text-[#FFF4B7] border border-[#FFF4B7]/40 shadow'
                : 'bg-[#003161] text-white/70 border border-[#003161]'
            }`}
          >
            Biro Mhs
          </button>
          <button
            onClick={() => setSelectedFilter('siber')}
            className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === 'siber'
                ? 'bg-[#006A67] text-[#FFF4B7] border border-[#FFF4B7]/40 shadow'
                : 'bg-[#003161] text-white/70 border border-[#003161]'
            }`}
          >
            Siber &amp; IT
          </button>
        </div>
      </section>

      {/* Grid of 4 Campus Volunteer Posts (Single Column Stack) */}
      <section className="flex flex-col gap-4">
        {filteredPosts.map((pos) => (
          <div
            key={pos.id}
            className="flex flex-col gap-3.5 bg-[#003161] border border-[#FFF4B7]/15 p-4 rounded-2xl shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#000B58] border border-[#006A67]/50 flex items-center justify-center text-[#FFF4B7] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">{pos.icon}</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#FFF4B7] leading-tight">{pos.name}</h2>
                  <span className="text-[11px] text-white/70">{pos.subname}</span>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 ${
                  pos.isOnlineNow
                    ? 'bg-[#FFF4B7] text-[#000B58]'
                    : 'bg-[#000B58] text-white/70'
                }`}
              >
                {pos.operatingHours}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#84d4d0] font-semibold">
              <span className="material-symbols-outlined text-[15px]">location_on</span>
              <span>{pos.distance}</span>
              <span className="text-white/40">•</span>
              <span className="material-symbols-outlined text-[15px]">group</span>
              <span>{pos.volunteers} Pendamping</span>
            </div>

            <div className="bg-[#000B58] p-3 rounded-xl border border-[#003161]">
              <span className="text-[9px] text-white/60 block uppercase mb-0.5 font-semibold">
                Spesialisasi Dukungan
              </span>
              <p className="text-xs text-white/95 leading-relaxed">{pos.specialty}</p>
            </div>

            {/* Action Buttons: Min-height 48px */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => openChatModal(pos.name)}
                className="w-full min-h-[48px] rounded-xl text-xs font-bold bg-[#006A67] hover:bg-[#00827e] text-[#FFF4B7] flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer border border-[#FFF4B7]/20"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chat Relawan</span>
              </button>
              <a
                href={pos.phone}
                className="w-full min-h-[48px] rounded-xl text-xs font-bold bg-[#000B58] hover:bg-[#003161] text-white flex items-center justify-center gap-1.5 transition-all border border-[#006A67]/40"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Telepon Pos</span>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Prominent Link to Dasbor Pos (Requirement 6) */}
      <section className="w-full bg-[#003161] border border-[#FFF4B7]/25 p-4 rounded-2xl flex flex-col gap-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#84d4d0] text-[20px]">analytics</span>
            <span className="text-xs font-bold text-[#FFF4B7] uppercase tracking-wider">
              Khusus Koordinator &amp; Pos
            </span>
          </div>
          <span className="text-[9px] bg-[#000B58] text-[#84d4d0] px-2 py-0.5 rounded font-mono font-bold">
            Desktop Penuh
          </span>
        </div>
        <h3 className="text-sm font-bold text-white">Dasbor Pos: Umpan Balik Anonim</h3>
        <p className="text-xs text-white/70 leading-relaxed">
          Pantau statistik 48+ insiden siber kampus, analisis sebaran waktu melapor, dan unduh berkas CSV agregat resmi OJK.
        </p>
        <button
          onClick={() => {
            setCurrentPage('dasbor');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full min-h-[48px] rounded-xl bg-[#000B58] hover:bg-[#003161] text-[#FFF4B7] font-bold text-xs flex items-center justify-center gap-2 border border-[#006A67] shadow transition-all cursor-pointer"
        >
          <span>Buka Dasbor Pos (Tampilan Desktop Penuh)</span>
          <span className="material-symbols-outlined text-[16px]">open_in_full</span>
        </button>
      </section>

      {/* Training Action Call */}
      <section className="bg-[#003161] border border-[#FFF4B7]/15 rounded-2xl p-4 flex flex-col gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#000B58] border border-[#006A67] text-[#FFF4B7] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">campaign</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#84d4d0] font-bold">
              Solidaritas Bela Negara
            </span>
            <h3 className="text-sm font-bold text-[#FFF4B7]">Ingin Jadi Pendamping Sebaya?</h3>
          </div>
        </div>
        <p className="text-xs text-white/80 leading-relaxed">
          Ikuti simulasi 60 menit Bela Negara Siber dan dapatkan sertifikasi kompetensi relawan darurat.
        </p>
        <button
          onClick={() => {
            setCurrentPage('pendampingan');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full min-h-[48px] rounded-xl text-xs font-extrabold bg-[#FFF4B7] text-[#000B58] flex items-center justify-center transition-all shadow cursor-pointer"
        >
          Daftar Pelatihan &amp; Mode Pendamping
        </button>
      </section>

      {/* Ethics Section (Stacked Vertically) */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 self-start bg-[#003161] px-3 py-1 rounded-md text-[#FFF4B7] text-[10px] uppercase tracking-wider font-bold border border-[#006A67]/40">
            KODE ETIK &amp; MANDAT
          </div>
          <h2 className="text-lg font-bold text-[#FFF4B7]">
            Batasan Mandat Pendamping
          </h2>
        </div>

        {/* Boleh */}
        <div className="bg-[#003161] border border-[#006A67]/60 p-4 rounded-xl flex flex-col gap-2.5">
          <div className="flex items-center gap-2 pb-1 border-b border-[#000B58]">
            <span className="material-symbols-outlined text-[#84d4d0] text-[18px]">check_circle</span>
            <span className="text-xs font-bold text-[#FFF4B7]">YANG BOLEH DILAKUKAN</span>
          </div>
          <ul className="text-xs text-white/90 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#84d4d0] text-[15px] shrink-0 mt-0.5">check</span>
              <span>Memandu pengisian laporan kronologi resmi portal IASC OJK.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#84d4d0] text-[15px] shrink-0 mt-0.5">check</span>
              <span>Menemani korban berbicara via call center resmi bank terkait.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#84d4d0] text-[15px] shrink-0 mt-0.5">check</span>
              <span>Membantu merapikan tangkapan layar mutasi dan histori chat.</span>
            </li>
          </ul>
        </div>

        {/* Tidak Boleh */}
        <div className="bg-[#003161] border border-[#ffb4ab]/30 p-4 rounded-xl flex flex-col gap-2.5">
          <div className="flex items-center gap-2 pb-1 border-b border-[#000B58]">
            <span className="material-symbols-outlined text-[#ffb4ab] text-[18px]">cancel</span>
            <span className="text-xs font-bold text-[#FFF4B7]">TIDAK BOLEH DILAKUKAN</span>
          </div>
          <ul className="text-xs text-white/90 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[15px] shrink-0 mt-0.5">close</span>
              <span>Memegang atau menerima titipan dana pengembalian apapun.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[15px] shrink-0 mt-0.5">close</span>
              <span>Meminta kata sandi, PIN ATM, atau kode OTP.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[15px] shrink-0 mt-0.5">close</span>
              <span>Mengambil alih gawai korban atau login akun perbankan.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
