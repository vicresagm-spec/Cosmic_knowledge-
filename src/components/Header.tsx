import React from 'react';
import { COSMOS_LOGO_URL, USER_AVATAR_URL } from '../data/cosmosData';

interface HeaderProps {
  currentTab: string;
  onOpenProfile: () => void;
  isNightVision: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onOpenProfile, isNightVision }) => {
  const getTabBadge = () => {
    switch (currentTab) {
      case 'sky-radar':
        return { label: 'Sky Radar', status: 'ONLINE', color: 'text-tertiary' };
      case 'daily-apod':
        return { label: 'APOD Feed', status: 'SYNCHRONIZED', color: 'text-primary' };
      case 'gallery':
        return { label: 'Archive', status: 'TELEMETRY', color: 'text-secondary' };
      case 'nebula':
        return { label: 'Spectroscopy', status: 'CALIBRATED', color: 'text-primary' };
      default:
        return { label: 'Observer', status: 'READY', color: 'text-tertiary' };
    }
  };

  const badge = getTabBadge();

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)] border-b border-outline-variant/20 transition-colors duration-300">
      <div className="h-16 px-margin flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex items-center gap-space-sm">
          <img
            alt="Cosmos NASA Logo"
            className="h-8 w-auto object-contain transition-transform hover:scale-105"
            src={COSMOS_LOGO_URL}
            onError={(e) => {
              // fallback if network fails
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%2338bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>';
            }}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-wider font-bold">COSMOS</span>
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">DEEP SPACE EXPLORER</span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <div className="text-right hidden xs:flex flex-col">
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant font-medium">{badge.label}</span>
            <span className={`font-label-caps text-label-caps ${badge.color} font-semibold flex items-center justify-end gap-1`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              {badge.status}
            </span>
          </div>

          <button
            onClick={onOpenProfile}
            aria-label="Open explorer profile and settings"
            className="p-[1px] rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 relative group"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={USER_AVATAR_URL}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
              }}
            />
            {isNightVision && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-error border border-surface" title="Red Night-Vision Filter Active"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
