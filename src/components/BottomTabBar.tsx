import React from 'react';
import { useApp } from '../context/AppContext';
import { PageType } from '../types';

export const BottomTabBar: React.FC = () => {
  const { currentPage, setCurrentPage, isAuthenticated } = useApp();

  const tabs: { key: PageType; label: string; icon: string }[] = [
    { key: 'beranda', label: 'Beranda', icon: 'home' },
    { key: 'protokol', label: 'Protokol', icon: 'shield_with_heart' },
    { key: 'pos', label: 'Pos', icon: 'groups' },
    { key: 'latihan', label: 'Latihan', icon: 'fitness_center' },
    { key: 'data', label: 'Data', icon: 'monitoring' },
  ];

  return (
    <nav
      className="sticky bottom-0 z-40 w-full bg-[#000B58]/95 backdrop-blur-md border-t border-[#003161] px-2 pt-1.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,11,88,0.5)] shrink-0"
      aria-label="Navigasi Bawah"
    >
      <div className="flex items-center justify-around max-w-[390px] mx-auto">
        {tabs.map((tab) => {
          const isActive = currentPage === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setCurrentPage(tab.key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-[#FFF4B7] font-bold'
                  : isAuthenticated
                  ? 'text-white/60 hover:text-white/90'
                  : 'text-white/40 hover:text-white/70'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`w-9 h-7 flex items-center justify-center rounded-full transition-colors relative ${
                  isActive ? 'bg-[#003161] text-[#FFF4B7]' : ''
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {tab.icon}
                </span>

                {/* Small padlock indicator when not logged in */}
                {!isAuthenticated && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#003161] border border-[#006A67] rounded-full flex items-center justify-center text-[9px] text-[#FFF4B7]">
                    <span className="material-symbols-outlined text-[10px]">lock</span>
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight ${
                  isActive ? 'text-[#FFF4B7] font-extrabold' : 'text-white/60 font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
