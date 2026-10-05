import React from 'react';

export type CosmosTab = 'daily-apod' | 'gallery' | 'nebula' | 'sky-radar';

interface NavigationProps {
  currentTab: CosmosTab;
  onSelectTab: (tab: CosmosTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: CosmosTab; label: string; icon: string }[] = [
    { id: 'daily-apod', label: 'Daily APOD', icon: 'auto_awesome' },
    { id: 'gallery', label: 'Gallery', icon: 'grid_view' },
    { id: 'nebula', label: 'Nebula', icon: 'qr_code_2' },
    { id: 'sky-radar', label: 'Sky Radar', icon: 'radar' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_-8px_32px_rgba(0,0,0,0.7)] border-t border-outline-variant/20">
      <div className="flex items-center justify-around h-16 px-space-xs max-w-2xl mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-space-xs transition-all min-h-[44px] cursor-pointer group focus:outline-none ${
                isActive
                  ? 'text-primary [&>span:first-child]:text-primary [&>span:first-child]:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-primary/10' : 'group-hover:bg-surface-container-highest/50'}`}>
                <span className={`material-symbols-outlined text-[22px] transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                  {tab.icon}
                </span>
              </div>
              <span className={`font-label-caps text-label-caps mt-0.5 tracking-wider transition-colors ${isActive ? 'text-primary font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
