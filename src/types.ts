export type PageType = 
  | 'login'
  | 'beranda' 
  | 'protokol' 
  | 'pos' 
  | 'pendampingan' 
  | 'latihan' 
  | 'data' 
  | 'dasbor';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  campusNode: string;
  authMethod: 'biometric-fingerprint';
  authTime: string;
}

export interface IncidentLog {
  id: string;
  timestamp: string;
  modus: 'belanja' | 'impersonasi' | 'investasi' | 'loker' | 'medsos' | 'apk';
  modusLabel: string;
  timeToReport: '<30' | '30-60' | '1-12' | '>12';
  timeLabel: string;
  status: 'iasc-process' | 'bank-frozen' | 'collecting' | 'escalated';
  statusLabel: string;
  isWithin60Min: boolean;
}

export interface PostItem {
  id: string;
  title: string;
  location: string;
  distance: string;
  activeVolunteers: number;
  status: string;
  categories: string[];
  specialty: string;
  phone: string;
}

export interface ScenarioQuestion {
  id: string;
  category: string;
  badge: string;
  sender: string;
  platform: string;
  time: string;
  message: string;
  linkText?: string;
  prompt: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    isCorrect: boolean;
    note: string;
  }[];
  explanation: string;
  recoveryPotential: string;
}
