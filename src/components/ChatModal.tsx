import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SigapLogo } from './SigapLogo';

interface ChatMessage {
  id: string;
  sender: 'companion' | 'user';
  text: string;
  time: string;
  actionButton?: {
    label: string;
    action: () => void;
  };
}

const initialMessages: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'companion',
    text: 'Halo kawan sebaya! Saya relawan mahasiswa dari Pos Pendamping. Tetap tenang dan jangan panik. Kamu aman di sini. Apakah kamu baru saja mentransfer dana atau membagikan informasi rahasia?',
    time: 'Baru saja',
  },
];

const cannedSuggestions = [
  'Saya baru saja transfer uang ke penipu',
  'Saya unduh & install file APK mencurigakan',
  'Pelaku mengancam dan meneror saya via WA',
  'Bantu saya hubungi call center resmi bank',
];

export const ChatModal: React.FC = () => {
  const { isChatModalOpen, closeChatModal, chatTargetPost, setCurrentPage, startEmergencyTimer } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isChatModalOpen) return null;

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let actionBtn: { label: string; action: () => void } | undefined = undefined;

      const lower = textToSend.toLowerCase();
      if (lower.includes('transfer') || lower.includes('uang')) {
        botResponse =
          'Prioritas Menit 0-15: Segera hubungi Call Center resmi bank Anda untuk freeze rekening tujuan penipu! Ingat: Kami dan bank TIDAK AKAN PERNAH meminta PIN, OTP, atau kata sandimu. Apakah kamu ingin membuka protokol cepat sekarang?';
        actionBtn = {
          label: 'Buka Protokol Tanggap 60 Menit',
          action: () => {
            closeChatModal();
            startEmergencyTimer();
          },
        };
      } else if (lower.includes('apk') || lower.includes('install') || lower.includes('tautan')) {
        botResponse =
          'Segera aktifkan Mode Pesawat (Airplane Mode) pada ponselmu! Jangan hapus file atau aplikasi tersebut sebelum mencatat nama filenya untuk bukti. Matikan internet perbankan dan periksa mutasi dari perangkat lain yang aman.';
        actionBtn = {
          label: 'Lihat Daftar Amankan Bukti',
          action: () => {
            closeChatModal();
            setCurrentPage('protokol');
          },
        };
      } else if (lower.includes('ancam') || lower.includes('teror') || lower.includes('wa')) {
        botResponse =
          'Pelaku sengaja menciptakan kepanikan agar kamu tidak sempat berpikir logis. Jangan dibalas, jangan transfer uang tambahan. Lakukan tangkapan layar percakapan utuh dengan nomor telepon penipu terlihat jelas, lalu arsipkan.';
      } else {
        botResponse =
          'Kami mendampingi proses pelaporan resmimu ke Bank dan IASC OJK. Jangan ragu, waktu jam pertama sangat menentukan sebelum sindikat mencairkan dana.';
        actionBtn = {
          label: 'Mulai Protokol Darurat',
          action: () => {
            closeChatModal();
            setCurrentPage('protokol');
          },
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          sender: 'companion',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionButton: actionBtn,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000B58]/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-modal-title"
    >
      <div className="w-full max-w-lg bg-[#003161] border border-[#FFF4B7]/20 rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#000B58] px-5 py-4 border-b border-[#003161] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SigapLogo variant="icon" size={32} />
            <div>
              <h3 id="chat-modal-title" className="font-bold text-[#FFF4B7] text-sm leading-tight">
                Pendamping Sebaya • {chatTargetPost}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#84d4d0] mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#006A67] animate-pulse"></span>
                <span>Relawan Mahasiswa Aktif (Nir-Akses Sandi)</span>
              </div>
            </div>
          </div>
          <button
            onClick={closeChatModal}
            className="w-8 h-8 rounded-lg bg-[#003161] text-white/80 hover:text-[#FFF4B7] hover:bg-[#006A67] flex items-center justify-center transition-colors"
            aria-label="Tutup Obrolan"
          >
            ✕
          </button>
        </div>

        {/* Security Alert Header */}
        <div className="bg-[#FFF4B7] text-[#000B58] px-4 py-2 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-sm font-bold">warning</span>
          <span>Pendamping TIDAK PERNAH meminta OTP, Password, PIN, atau uang.</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 bg-[#003161]/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#006A67] text-white rounded-tr-none'
                    : 'bg-[#000B58] text-[#FFF4B7] border border-[#006A67]/40 rounded-tl-none'
                }`}
              >
                {msg.text}

                {msg.actionButton && (
                  <button
                    onClick={msg.actionButton.action}
                    className="mt-2.5 w-full py-2 px-3 rounded-xl bg-[#FFF4B7] text-[#000B58] hover:bg-white text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-colors"
                  >
                    <span>{msg.actionButton.label}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                )}
              </div>
              <span className="text-[10px] text-white/50 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="self-start bg-[#000B58] text-[#FFF4B7] text-xs p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 border border-[#006A67]/40">
              <span className="w-2 h-2 rounded-full bg-[#FFF4B7] animate-ping"></span>
              <span>Pendamping sedang mengetik saran tanggap darurat...</span>
            </div>
          )}
        </div>

        {/* Canned Suggestions */}
        <div className="p-2.5 bg-[#000B58]/90 border-t border-[#003161] overflow-x-auto flex gap-2 no-scrollbar">
          {cannedSuggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item)}
              className="text-xs bg-[#003161] text-[#FFF4B7] hover:bg-[#006A67] hover:text-white px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors border border-[#006A67]/30 shrink-0"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="p-3 bg-[#000B58] border-t border-[#003161] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik pertanyaan / kronologi tanpa data pribadi..."
            className="flex-1 bg-[#003161] border border-[#006A67]/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#FFF4B7]"
          />
          <button
            type="submit"
            className="h-10 px-4 rounded-xl bg-[#006A67] text-[#FFF4B7] hover:bg-[#00827e] font-bold text-sm flex items-center justify-center transition-colors shadow"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};
