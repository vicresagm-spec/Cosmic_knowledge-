import React from 'react';
import { USER_AVATAR_URL, OBSERVATORIES, ASTRONOMICAL_EVENTS } from '../data/cosmosData';
import { ObservatoryLocation } from '../types/cosmos';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isNightVision: boolean;
  onToggleNightVision: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentObservatory: ObservatoryLocation;
  onSelectObservatory: (obs: ObservatoryLocation) => void;
  bookmarkedEventIds: string[];
  onOpenEvent: (eventId: string) => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  isNightVision,
  onToggleNightVision,
  soundEnabled,
  onToggleSound,
  currentObservatory,
  onSelectObservatory,
  bookmarkedEventIds,
  onOpenEvent
}) => {
  if (!isOpen) return null;

  const bookmarkedEvents = ASTRONOMICAL_EVENTS.filter((e) => bookmarkedEventIds.includes(e.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-surface-container-low h-full shadow-2xl flex flex-col border-l border-outline-variant/30 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer header */}
        <div className="p-space-md bg-surface-container flex items-center justify-between border-b border-outline-variant/20 sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[22px]">manage_accounts</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Astronomy Terminal</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-space-md space-y-space-lg flex-1">
          {/* User profile card */}
          <div className="p-space-md rounded-xl bg-surface-container flex items-center gap-space-md border border-outline-variant/20">
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary to-secondary shrink-0">
              <img src={USER_AVATAR_URL} alt="Astronomy Explorer" className="w-14 h-14 rounded-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Dr. S. Vance</span>
                <span className="px-1.5 py-0.2 rounded bg-primary/20 text-primary font-label-caps text-[9px] uppercase font-bold">LVL 4</span>
              </div>
              <span className="font-label-caps text-label-caps text-primary">DEEP SKY OBSERVER</span>
              <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant mt-0.5">Callsign: KEA-ALPHA-7</span>
            </div>
          </div>

          {/* Stargazing Tools & Dark Adaptation */}
          <div className="space-y-space-sm">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">Observational Controls</span>
            
            <div className="p-space-sm rounded-xl bg-surface-container flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isNightVision ? 'bg-error/20 text-error' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-[20px]">nightlight</span>
                </div>
                <div>
                  <span className="font-body-md text-body-md text-on-surface font-medium block">Red Night-Vision Filter</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Protects rhodopsin & dark eye adaptation</span>
                </div>
              </div>
              <button
                onClick={onToggleNightVision}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  isNightVision ? 'bg-error' : 'bg-surface-container-highest'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out mt-0.5 ml-0.5 shadow ${
                  isNightVision ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${soundEnabled ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </div>
                <div>
                  <span className="font-body-md text-body-md text-on-surface font-medium block">Radio Spectral Chimes</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Acoustic radar feedback on hover/tap</span>
                </div>
              </div>
              <button
                onClick={onToggleSound}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  soundEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-on-primary transition duration-200 ease-in-out mt-0.5 ml-0.5 shadow ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Active Observatory Station */}
          <div className="space-y-space-sm">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">Observatory Feed Switcher</span>
            <div className="space-y-2">
              {OBSERVATORIES.map((obs) => {
                const isSelected = obs.id === currentObservatory.id;
                return (
                  <button
                    key={obs.id}
                    onClick={() => onSelectObservatory(obs)}
                    className={`w-full p-space-sm rounded-xl flex items-center justify-between text-left transition-all border ${
                      isSelected
                        ? 'bg-surface-container-high border-primary shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                        : 'bg-surface-container border-outline-variant/20 hover:border-outline-variant/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-headline-sm text-sm text-on-surface font-semibold">{obs.name}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>}
                      </div>
                      <span className="font-label-caps text-label-caps text-on-surface-variant block mt-0.5">
                        {obs.country} • {obs.altitude}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-telemetry-sm text-telemetry-sm text-primary font-bold block">Bortle {obs.darkSkyBortle}</span>
                      <span className="font-label-caps text-[9px] text-tertiary">{obs.status}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bookmarked Events */}
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Scheduled Passes & Events</span>
              <span className="font-telemetry-sm text-primary font-bold">{bookmarkedEvents.length} Saved</span>
            </div>

            {bookmarkedEvents.length === 0 ? (
              <div className="p-space-md rounded-xl bg-surface-container text-center border border-dashed border-outline-variant/30">
                <span className="material-symbols-outlined text-outline text-[32px] mb-1">bookmarks</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  No celestial reminders saved yet. Tap the bookmark icon next to any event to schedule an alert.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {bookmarkedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => {
                      onOpenEvent(ev.id);
                      onClose();
                    }}
                    className="p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer flex items-center justify-between border border-outline-variant/20"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-headline-sm text-sm text-on-surface font-semibold">{ev.title}</span>
                        <span className="px-1.5 py-0.2 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-[9px] font-bold">
                          {ev.badgeText}
                        </span>
                      </div>
                      <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant block mt-0.5">
                        {ev.subtitle}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[20px]">chevron_right</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-space-md bg-surface-container-high border-t border-outline-variant/20 text-center">
          <span className="font-label-caps text-label-caps text-on-surface-variant">COSMOS SPACE EXPLORER v2.4.0 • NASA JPL/STScI EPHEMERIS</span>
        </div>
      </div>
    </div>
  );
};
