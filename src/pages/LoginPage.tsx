import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SigapLogo } from '../components/SigapLogo';

export const LoginPage: React.FC = () => {
  const { loginWithFingerprint, authPromptMessage, clearAuthPrompt } = useApp();
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const handleStartScan = () => {
    if (scanState === 'scanning' || scanState === 'success') return;
    setScanState('scanning');
    setProgress(0);

    // Audio cue synthesis if supported (subtle click & confirm)
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } catch {
      // Audio optional, fallback silently
    }

    // Step animation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 15;
      });
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setScanState('success');

      // Success chime
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.32);
      } catch {
        // Fallback silently
      }

      // Complete login in AppContext after brief confirmation feedback
      setTimeout(() => {
        loginWithFingerprint();
      }, 700);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-2 max-w-[390px] sm:max-w-md mx-auto text-center gap-6 animate-fade-in">
      {/* Brand Header */}
      <div className="flex flex-col items-center gap-3">
        <SigapLogo variant="icon" size={80} animated={true} />
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold tracking-[0.2em] text-[#FFF4B7] font-sans">
              SIGAP
            </span>
            <span className="text-2xl font-extrabold text-[#006A67] border-b-2 border-[#FFF4B7] pb-0.5">
              60
            </span>
          </div>
          <span className="text-xs text-[#84d4d0] font-semibold tracking-wider uppercase mt-1">
            Portal Autentikasi Relawan Siber
          </span>
        </div>
      </div>

      {/* Auth required banner if redirected from menu */}
      {authPromptMessage && (
        <div className="w-full p-3.5 rounded-xl bg-[#003161] border border-[#FFF4B7]/40 text-[#FFF4B7] text-xs font-semibold flex items-center justify-between gap-2 shadow-lg animate-fade-in">
          <div className="flex items-center gap-2 text-left">
            <span className="material-symbols-outlined text-[#84d4d0] text-[20px] shrink-0">
              lock
            </span>
            <span>{authPromptMessage}</span>
          </div>
          <button
            onClick={clearAuthPrompt}
            className="text-white/60 hover:text-white shrink-0 p-1"
            aria-label="Tutup pesan"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Biometric Scanner Card */}
      <div className="w-full p-6 sm:p-7 rounded-2xl bg-[#003161] border border-[#FFF4B7]/20 shadow-2xl flex flex-col items-center gap-6 relative overflow-hidden">
        {/* Ambient tactical lighting */}
        <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#006A67]/30 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-[#000B58]/60 blur-2xl pointer-events-none"></div>

        {/* Card Title & Instructions */}
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#000B58] text-[#FFF4B7] text-[11px] font-mono font-bold border border-[#006A67]">
            <span className="w-2 h-2 rounded-full bg-[#84d4d0] animate-pulse"></span>
            <span>BIOMETRIC TOUCH ID</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#FFF4B7] mt-1">
            Masuk dengan Sidik Jari
          </h2>
          <p className="text-xs text-white/80 max-w-xs leading-relaxed">
            Tempelkan jari pada sensor untuk memverifikasi identitas relawan dan membuka menu protokol 60 menit.
          </p>
        </div>

        {/* Interactive Fingerprint Scanner Pad */}
        <div className="relative flex flex-col items-center justify-center my-2 z-10">
          {/* Outer Pulsing Rings */}
          <div
            className={`absolute w-36 h-36 rounded-full border transition-all duration-700 pointer-events-none ${
              scanState === 'scanning'
                ? 'border-[#84d4d0] scale-110 animate-ping opacity-40'
                : scanState === 'success'
                ? 'border-[#FFF4B7] scale-125 opacity-70'
                : 'border-[#006A67]/40 scale-100'
            }`}
          ></div>

          <div
            className={`absolute w-32 h-32 rounded-full border-2 transition-all duration-500 pointer-events-none ${
              scanState === 'scanning'
                ? 'border-[#84d4d0] shadow-[0_0_25px_rgba(132,212,208,0.5)]'
                : scanState === 'success'
                ? 'border-[#FFF4B7] shadow-[0_0_30px_rgba(255,244,183,0.7)]'
                : 'border-[#006A67]/60'
            }`}
          ></div>

          {/* Scanner Button Surface */}
          <button
            onClick={handleStartScan}
            disabled={scanState === 'scanning' || scanState === 'success'}
            className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden select-none focus:outline-none focus:ring-4 focus:ring-[#FFF4B7]/40 shadow-xl ${
              scanState === 'scanning'
                ? 'bg-[#000B58] border-2 border-[#84d4d0]'
                : scanState === 'success'
                ? 'bg-[#006A67] border-2 border-[#FFF4B7] scale-105'
                : 'bg-[#000B58] hover:bg-[#001740] border-2 border-[#006A67] active:scale-95'
            }`}
            aria-label="Pindai sidik jari untuk login"
          >
            {/* Laser scanning sweep line */}
            {scanState === 'scanning' && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#84d4d0] to-transparent shadow-[0_0_12px_#84d4d0] animate-[shimmerPass_1s_infinite] top-0 pointer-events-none"></div>
            )}

            {/* Fingerprint Vector Graphic */}
            <svg
              viewBox="0 0 64 64"
              className={`w-16 h-16 transition-all duration-300 ${
                scanState === 'scanning'
                  ? 'text-[#84d4d0] scale-105'
                  : scanState === 'success'
                  ? 'text-[#FFF4B7] scale-110'
                  : 'text-[#FFF4B7]/80 group-hover:text-[#FFF4B7]'
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Concentric Biometric Ridges */}
              <path d="M32 10 C20 10 12 18 12 28 C12 34 14 42 16 50" />
              <path d="M52 28 C52 18 44 10 32 10" opacity="0.4" />
              <path d="M48 50 C50 42 52 34 52 28" />
              <path d="M18 28 C18 20 24 15 32 15 C40 15 46 20 46 28 C46 36 44 46 42 54" />
              <path d="M22 54 C20 46 18 36 18 28" opacity="0.4" />
              <path d="M24 28 C24 23 27 20 32 20 C37 20 40 23 40 28 C40 37 38 48 36 57" />
              <path d="M28 57 C26 48 24 37 24 28" opacity="0.4" />
              <path d="M30 28 C30 26 31 25 32 25 C33 25 34 26 34 28 C34 35 33 46 32 60" />
            </svg>

            {/* Checkmark overlay upon success */}
            {scanState === 'success' && (
              <div className="absolute inset-0 bg-[#006A67]/90 flex items-center justify-center animate-fade-in">
                <span className="material-symbols-outlined text-[44px] text-[#FFF4B7] font-bold">
                  check_circle
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Scan Status & Dynamic Progress */}
        <div className="w-full flex flex-col items-center gap-2 z-10">
          <div className="text-xs font-bold font-mono">
            {scanState === 'idle' && (
              <span className="text-[#FFF4B7] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#84d4d0]">fingerprint</span>
                Sentuh sensor untuk memindai
              </span>
            )}
            {scanState === 'scanning' && (
              <span className="text-[#84d4d0] flex items-center gap-1.5 animate-pulse">
                <span className="material-symbols-outlined text-[16px]">sync</span>
                Memverifikasi sidik jari... {progress}%
              </span>
            )}
            {scanState === 'success' && (
              <span className="text-[#FFF4B7] flex items-center gap-1.5 font-extrabold">
                <span className="material-symbols-outlined text-[16px] text-[#84d4d0]">verified</span>
                Sidik Jari Valid! Membuka Portal...
              </span>
            )}
          </div>

          {/* Progress Bar during Scanning */}
          <div className="w-48 h-1.5 rounded-full bg-[#000B58] overflow-hidden border border-[#006A67]/50">
            <div
              className={`h-full transition-all duration-200 ${
                scanState === 'success' ? 'bg-[#FFF4B7]' : 'bg-[#84d4d0]'
              }`}
              style={{ width: `${scanState === 'idle' ? 0 : progress}%` }}
            ></div>
          </div>
        </div>

        {/* Primary Action Button (min-h-48px) */}
        <button
          onClick={handleStartScan}
          disabled={scanState === 'scanning' || scanState === 'success'}
          className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#006A67] hover:bg-[#00827e] active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg border border-[#FFF4B7]/25 transition-all cursor-pointer z-10"
        >
          <span className="material-symbols-outlined text-[20px] text-[#FFF4B7]">
            fingerprint
          </span>
          <span>
            {scanState === 'idle'
              ? 'Pindai Sidik Jari Sekarang'
              : scanState === 'scanning'
              ? 'Sedang Memindai...'
              : 'Autentikasi Berhasil!'}
          </span>
        </button>

        {/* Mock Credential Profile Info */}
        <div className="w-full pt-4 border-t border-[#000B58] flex flex-col gap-2 text-left z-10">
          <div className="flex items-center justify-between text-[11px] text-white/70">
            <span>Identitas Akun Sebaya:</span>
            <span className="text-[#84d4d0] font-mono font-bold">REL-SGP-60 (Aktif)</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/70">
            <span>Peran Akses:</span>
            <span className="text-[#FFF4B7] font-semibold">Pendamping Darurat Kampus</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/70">
            <span>Metode Enkripsi:</span>
            <span className="font-mono text-white/80">SHA-256 Biometrik Lokal</span>
          </div>
        </div>
      </div>

      {/* Security and Privacy Assurance */}
      <div className="w-full p-4 rounded-xl bg-[#003161]/60 border border-[#006A67]/40 text-[11px] text-white/80 leading-relaxed text-left flex items-start gap-3">
        <span className="material-symbols-outlined text-[#84d4d0] text-[20px] shrink-0 mt-0.5">
          security
        </span>
        <div>
          <span className="text-[#FFF4B7] font-bold block mb-0.5">
            Privasi &amp; Kepatuhan Tanpa Kata Sandi (Zero-Password):
          </span>
          SIGAP 60 tidak pernah meminta, menerima, atau menyimpan kata sandi, kode OTP, PIN perbankan, atau data saldo rekening. Akses biometrik ini hanya memverifikasi kehadiran relawan pendamping.
        </div>
      </div>
    </div>
  );
};
