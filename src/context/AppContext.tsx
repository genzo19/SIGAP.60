import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageType, IncidentLog } from '../types';

interface AppContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  // Timer state
  timerActive: boolean;
  secondsLeft: number;
  startEmergencyTimer: () => void;
  resetTimer: () => void;
  formatTime: (totalSecs: number) => string;
  // Protokol checklist
  stepStates: Record<number, boolean>;
  toggleStep: (stepNumber: 1 | 2 | 3 | 4) => void;
  evidenceChecks: { mutasi: boolean; chat: boolean; apk: boolean };
  toggleEvidenceCheck: (key: 'mutasi' | 'chat' | 'apk') => void;
  allStepsDone: boolean;
  completedStepsCount: number;
  // In-memory Incident Logs
  incidentLogs: IncidentLog[];
  addIncidentLog: (newEntry: {
    modus: IncidentLog['modus'];
    modusLabel: string;
    timeToReport: IncidentLog['timeToReport'];
    timeLabel: string;
    status: IncidentLog['status'];
    statusLabel: string;
  }) => void;
  // Chat modal
  isChatModalOpen: boolean;
  chatTargetPost: string;
  openChatModal: (postTitle?: string) => void;
  closeChatModal: () => void;
  // Splash intro
  showSplash: boolean;
  dismissSplash: () => void;
  replaySplash: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial 48 anonymous mock records corresponding to the design
const initialIncidentLogs: IncidentLog[] = [
  ...Array.from({ length: 18 }).map((_, i) => ({
    id: `INIT-BELANJA-${i + 1}`,
    timestamp: '2026-10-20T10:00:00Z',
    modus: 'belanja' as const,
    modusLabel: 'Belanja Online',
    timeToReport: (i < 8 ? '<30' : i < 14 ? '30-60' : '1-12') as IncidentLog['timeToReport'],
    timeLabel: i < 8 ? '<30 menit' : i < 14 ? '30-60 menit' : '1-12 jam',
    status: 'iasc-process' as const,
    statusLabel: 'Laporan IASC Terkirim',
    isWithin60Min: i < 14,
  })),
  ...Array.from({ length: 14 }).map((_, i) => ({
    id: `INIT-IMPERSONASI-${i + 1}`,
    timestamp: '2026-10-19T14:30:00Z',
    modus: 'impersonasi' as const,
    modusLabel: 'Impersonasi / Social Engineering',
    timeToReport: (i < 7 ? '<30' : i < 11 ? '30-60' : i < 13 ? '1-12' : '>12') as IncidentLog['timeToReport'],
    timeLabel: i < 7 ? '<30 menit' : i < 11 ? '30-60 menit' : i < 13 ? '1-12 jam' : '>12 jam',
    status: 'bank-frozen' as const,
    statusLabel: 'Rekening Berhasil Dibekukan Bank',
    isWithin60Min: i < 11,
  })),
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `INIT-INVESTASI-${i + 1}`,
    timestamp: '2026-10-18T09:15:00Z',
    modus: 'investasi' as const,
    modusLabel: 'Investasi Bodong',
    timeToReport: (i < 3 ? '<30' : i < 5 ? '30-60' : '1-12') as IncidentLog['timeToReport'],
    timeLabel: i < 3 ? '<30 menit' : i < 5 ? '30-60 menit' : '1-12 jam',
    status: 'collecting' as const,
    statusLabel: 'Sedang Mengumpulkan Berkas Bukti',
    isWithin60Min: i < 5,
  })),
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: `INIT-LOKER-${i + 1}`,
    timestamp: '2026-10-17T11:45:00Z',
    modus: 'loker' as const,
    modusLabel: 'Lowongan Kerja Palsu',
    timeToReport: (i < 2 ? '<30' : i < 4 ? '30-60' : '>12') as IncidentLog['timeToReport'],
    timeLabel: i < 2 ? '<30 menit' : i < 4 ? '30-60 menit' : '>12 jam',
    status: 'escalated' as const,
    statusLabel: 'Eskalasi ke Pos BEM',
    isWithin60Min: i < 4,
  })),
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `INIT-MEDSOS-${i + 1}`,
    timestamp: '2026-10-16T16:20:00Z',
    modus: 'medsos' as const,
    modusLabel: 'Media Sosial (Takeover / Phishing)',
    timeToReport: (i < 2 ? '<30' : '>12') as IncidentLog['timeToReport'],
    timeLabel: i < 2 ? '<30 menit' : '>12 jam',
    status: 'iasc-process' as const,
    statusLabel: 'Laporan IASC Terkirim',
    isWithin60Min: i < 2,
  })),
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('beranda');
  
  // Timer state (persists across pages!)
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(3600); // 60 mins

  // Ticking effect
  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const startEmergencyTimer = () => {
    setTimerActive(true);
    setCurrentPage('protokol');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetTimer = () => {
    setSecondsLeft(3600);
    setTimerActive(false);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Protokol 4-step checklist state
  const [stepStates, setStepStates] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
  });

  const toggleStep = (stepNumber: 1 | 2 | 3 | 4) => {
    setStepStates((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const [evidenceChecks, setEvidenceChecks] = useState({
    mutasi: true,
    chat: false,
    apk: false,
  });

  const toggleEvidenceCheck = (key: 'mutasi' | 'chat' | 'apk') => {
    setEvidenceChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const completedStepsCount = Object.values(stepStates).filter(Boolean).length;
  const allStepsDone = completedStepsCount === 4;

  // Incident logs in-memory state
  const [incidentLogs, setIncidentLogs] = useState<IncidentLog[]>(initialIncidentLogs);

  const addIncidentLog = (newEntry: {
    modus: IncidentLog['modus'];
    modusLabel: string;
    timeToReport: IncidentLog['timeToReport'];
    timeLabel: string;
    status: IncidentLog['status'];
    statusLabel: string;
  }) => {
    const isWithin60Min = newEntry.timeToReport === '<30' || newEntry.timeToReport === '30-60';
    const newRecord: IncidentLog = {
      id: `SGP-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      ...newEntry,
      isWithin60Min,
    };
    setIncidentLogs((prev) => [newRecord, ...prev]);
  };

  // Chat modal state
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatTargetPost, setChatTargetPost] = useState('Pos SIGAP UKM Menwa');

  const openChatModal = (postTitle?: string) => {
    if (postTitle) setChatTargetPost(postTitle);
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  // Splash intro state
  const [showSplash, setShowSplash] = useState(true);

  // Auto dismiss splash after ~2.4s intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const dismissSplash = () => {
    setShowSplash(false);
  };

  const replaySplash = () => {
    setShowSplash(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        timerActive,
        secondsLeft,
        startEmergencyTimer,
        resetTimer,
        formatTime,
        stepStates,
        toggleStep,
        evidenceChecks,
        toggleEvidenceCheck,
        allStepsDone,
        completedStepsCount,
        incidentLogs,
        addIncidentLog,
        isChatModalOpen,
        chatTargetPost,
        openChatModal,
        closeChatModal,
        showSplash,
        dismissSplash,
        replaySplash,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
