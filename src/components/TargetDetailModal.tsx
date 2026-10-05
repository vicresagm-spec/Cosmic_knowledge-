import React from 'react';
import { CelestialTarget, AstronomicalEvent, NasaMission } from '../types/cosmos';

interface TargetDetailModalProps {
  target: CelestialTarget | AstronomicalEvent | NasaMission | null;
  type: 'target' | 'event' | 'mission';
  onClose: () => void;
  onBookmarkToggle?: (id: string) => void;
  isBookmarked?: boolean;
}

export const TargetDetailModal: React.FC<TargetDetailModalProps> = ({
  target,
  type,
  onClose,
  onBookmarkToggle,
  isBookmarked
}) => {
  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-surface-container-low border border-outline-variant/30 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[88vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="p-space-md bg-surface-container flex items-center justify-between border-b border-outline-variant/20">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[24px]">
              {type === 'target' ? 'stars' : type === 'event' ? 'event' : 'satellite_alt'}
            </span>
            <div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block">
                {type === 'target' ? 'CELESTIAL OBJECT TELEMETRY' : type === 'event' ? 'ASTRONOMICAL EPHEMERIS' : 'NASA DEEP SPACE OBSERVATORY'}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                {type === 'target' ? (target as CelestialTarget).name : type === 'event' ? (target as AstronomicalEvent).title : (target as NasaMission).name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-space-md space-y-space-md overflow-y-auto">
          {type === 'target' && (() => {
            const t = target as CelestialTarget;
            return (
              <>
                <div className="flex items-center justify-between bg-surface-container rounded-lg p-space-sm">
                  <div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Designation</span>
                    <p className="font-telemetry-sm text-telemetry-sm text-primary font-bold mt-0.5">{t.designation}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Visual Mag</span>
                    <p className="font-telemetry-sm text-telemetry-sm text-tertiary font-bold mt-0.5">{t.magnitude}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Right Ascension (RA)</span>
                    <p className="font-telemetry-lg text-telemetry-lg text-on-surface font-mono mt-0.5">{t.ra}</p>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Declination (Dec)</span>
                    <p className="font-telemetry-lg text-telemetry-lg text-on-surface font-mono mt-0.5">{t.dec}</p>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container flex items-center justify-between">
                  <div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Distance to Earth</span>
                    <p className="font-telemetry-sm text-telemetry-sm text-secondary font-bold mt-0.5">{t.distanceLightYears || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Viewing Window</span>
                    <p className="font-telemetry-sm text-telemetry-sm text-primary font-bold mt-0.5">{t.bestViewingTime}</p>
                  </div>
                </div>

                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-1">Scientific Overview</span>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed bg-surface-container/50 p-space-sm rounded-lg border border-outline-variant/20">
                    {t.description}
                  </p>
                </div>
              </>
            );
          })()}

          {type === 'event' && (() => {
            const ev = target as AstronomicalEvent;
            return (
              <>
                <div className="flex items-center justify-between bg-surface-container rounded-lg p-space-sm">
                  <div className="flex items-center gap-space-xs">
                    <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps font-bold">
                      {ev.badgeText}
                    </span>
                    <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">{ev.dateStr}</span>
                  </div>
                  <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono">{ev.coordinates}</span>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-1">Observational Timing & Key Stats</span>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-medium">{ev.subtitle}</p>
                </div>

                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-1">Astrophysical Mechanics</span>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed bg-surface-container/50 p-space-sm rounded-lg border border-outline-variant/20">
                    {ev.details}
                  </p>
                </div>

                <div>
                  <span className="font-label-caps text-label-caps text-primary uppercase block mb-1">Stargazer Viewing Tips</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-high/60 p-space-sm rounded-lg border border-primary/20">
                    🔭 {ev.visibilityTips}
                  </p>
                </div>
              </>
            );
          })()}

          {type === 'mission' && (() => {
            const m = target as NasaMission;
            return (
              <>
                <div className="relative h-44 rounded-xl overflow-hidden bg-surface-container-highest">
                  <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps font-bold">
                      {m.badge}
                    </span>
                    <span className="font-telemetry-sm text-telemetry-sm text-on-surface bg-surface-container-lowest/80 px-2 py-0.5 rounded backdrop-blur">
                      {m.location}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Scientific Target</span>
                    <p className="font-telemetry-sm text-telemetry-sm text-primary font-bold mt-0.5 truncate">{m.targetName}</p>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Filter Mode</span>
                    <p className="font-telemetry-sm text-telemetry-sm text-tertiary font-bold mt-0.5 font-mono">{m.filterMode}</p>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Spectral Band</span>
                    <p className="font-telemetry-sm text-telemetry-sm text-secondary font-bold mt-0.5">{m.spectralBand}</p>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Cryo Temp</span>
                    <p className="font-telemetry-sm text-telemetry-sm text-on-surface font-bold mt-0.5">{m.temperature}</p>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Active Observation Progress</span>
                    <span className="font-telemetry-sm text-telemetry-sm text-tertiary font-mono">{m.exposureElapsed} / {m.exposureTotal}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full transition-all duration-500" 
                      style={{ width: `${(m.elapsedSeconds / m.totalSeconds) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>

        {/* Footer actions */}
        <div className="p-space-md bg-surface-container-high border-t border-outline-variant/20 flex items-center justify-between gap-space-sm">
          {type === 'event' && onBookmarkToggle && (
            <button
              onClick={() => onBookmarkToggle(target.id)}
              className={`flex-1 py-2.5 px-space-md rounded-lg flex items-center justify-center gap-space-xs font-headline-sm text-sm font-semibold transition-all ${
                isBookmarked 
                  ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(56,189,248,0.5)]' 
                  : 'bg-surface-container text-primary hover:bg-surface-container-highest border border-primary/30'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isBookmarked ? 'bookmark_added' : 'bookmark_add'}
              </span>
              {isBookmarked ? 'Reminder Scheduled' : 'Add to Observation Log'}
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-space-md rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-highest transition-colors font-headline-sm text-sm font-medium text-center"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
