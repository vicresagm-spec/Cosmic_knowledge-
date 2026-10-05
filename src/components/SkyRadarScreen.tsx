import React, { useState, useEffect } from 'react';
import { 
  ObservatoryLocation, 
  CelestialTarget, 
  NasaMission, 
  AstronomicalEvent 
} from '../types/cosmos';
import { 
  CELESTIAL_TARGETS, 
  NASA_MISSIONS, 
  ASTRONOMICAL_EVENTS, 
  OBSERVATORIES 
} from '../data/cosmosData';

interface SkyRadarScreenProps {
  currentObservatory: ObservatoryLocation;
  onSelectObservatory: (obs: ObservatoryLocation) => void;
  onSelectTarget: (target: CelestialTarget) => void;
  onSelectEvent: (event: AstronomicalEvent) => void;
  onSelectMission: (mission: NasaMission) => void;
  bookmarkedEventIds: string[];
  onToggleBookmark: (id: string) => void;
  soundEnabled: boolean;
}

export const SkyRadarScreen: React.FC<SkyRadarScreenProps> = ({
  currentObservatory,
  onSelectObservatory,
  onSelectTarget,
  onSelectEvent,
  onSelectMission,
  bookmarkedEventIds,
  onToggleBookmark,
  soundEnabled
}) => {
  // Pass alerts toggle
  const [alertsEnabled, setAlertsEnabled] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Gyro live tracking simulation
  const [isGyroActive, setIsGyroActive] = useState<boolean>(true);
  const [azimuth, setAzimuth] = useState<number>(42);
  const [altitude, setAltitude] = useState<number>(68);

  // Active mission index
  const [currentMissionIdx, setCurrentMissionIdx] = useState<number>(0);
  const activeMission = NASA_MISSIONS[currentMissionIdx];

  // Observatories picker modal
  const [showObsPicker, setShowObsPicker] = useState<boolean>(false);

  // Play audio synthesizer feedback
  const playChime = (freq: number = 880) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  // Gyro telemetry drift simulation when active
  useEffect(() => {
    if (!isGyroActive) return;
    const interval = setInterval(() => {
      setAzimuth((prev) => {
        const next = prev + (Math.random() > 0.5 ? 0.2 : -0.2);
        return Math.round(((next % 360) + 360) % 360);
      });
      setAltitude((prev) => {
        const delta = (Math.random() - 0.5) * 0.2;
        return Math.min(89, Math.max(10, Math.round(prev + delta)));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isGyroActive]);

  const handleToggleAlerts = () => {
    const next = !alertsEnabled;
    setAlertsEnabled(next);
    playChime(next ? 1046 : 523);
    setToastMessage(next ? 'Pass proximity alerts enabled (15m lead)' : 'Pass alerts muted');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTargetClick = (target: CelestialTarget) => {
    playChime(target.type === 'satellite' ? 1200 : 780);
    onSelectTarget(target);
  };

  const handleCycleMission = () => {
    const nextIdx = (currentMissionIdx + 1) % NASA_MISSIONS.length;
    setCurrentMissionIdx(nextIdx);
    playChime(660);
  };

  return (
    <div className="flex flex-col w-full px-margin space-y-space-md max-w-2xl mx-auto animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-surface-container-highest/95 border border-primary/40 shadow-xl text-primary font-telemetry-sm flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px]">sensors</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Location & Celestial Conditions Widget */}
      <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-xl relative overflow-hidden border border-outline-variant/15">
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
        
        <div className="flex items-start justify-between relative z-10 mb-space-sm">
          <button 
            onClick={() => setShowObsPicker(true)}
            className="flex items-center gap-space-xs text-left group cursor-pointer focus:outline-none"
            aria-label="Change observatory location"
          >
            <span className="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">
              location_on
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface block leading-tight font-semibold group-hover:text-primary transition-colors">
                  {currentObservatory.name}
                </span>
                <span className="material-symbols-outlined text-on-surface-variant text-[16px] group-hover:translate-y-0.5 transition-transform">
                  expand_more
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                {currentObservatory.country} • {currentObservatory.altitude}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-surface-container-highest">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="font-label-caps text-label-caps text-primary tracking-widest font-semibold uppercase">
              {currentObservatory.status}
            </span>
          </div>
        </div>

        {/* Micro Met Grid */}
        <div className="grid grid-cols-3 gap-gutter-sm mt-space-sm">
          <div className="flex flex-col p-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Dark Sky</span>
            <span className="font-telemetry-lg text-telemetry-lg text-primary font-bold mt-0.5">
              Bortle {currentObservatory.darkSkyBortle}
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
              {currentObservatory.bortleRating}
            </span>
          </div>
          <div className="flex flex-col p-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Cloud Cover</span>
            <span className="font-telemetry-lg text-telemetry-lg text-tertiary font-bold mt-0.5">
              {currentObservatory.cloudCover}%
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
              {currentObservatory.cloudStatus}
            </span>
          </div>
          <div className="flex flex-col p-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Moon Phase</span>
            <span className="font-telemetry-lg text-telemetry-lg text-secondary font-bold mt-0.5">
              {currentObservatory.moonPhasePercent}%
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
              {currentObservatory.moonPhaseName}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Real-time Sky Radar Viewport Card */}
      <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-xl relative overflow-hidden flex flex-col items-center border border-outline-variant/15">
        <div className="w-full flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">explore</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Live Celestial Dome</span>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-primary tracking-wide bg-surface-container-highest px-2 py-0.5 rounded-full font-medium">
            FOV 180° Zenith
          </span>
        </div>

        {/* Sky Radar Visualization Canvas Container */}
        <div className="relative w-full aspect-square max-w-[320px] rounded-full bg-surface-container-lowest flex items-center justify-center shadow-inner overflow-hidden my-space-xs border border-outline-variant/20 select-none">
          {/* Sweep Animation Radar Beam */}
          <div className="absolute inset-0 origin-center animate-[spin_12s_linear_infinite] pointer-events-none opacity-40 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,rgba(56,189,248,0.25)_360deg)]"></div>
          
          {/* Radar Concentric Rings */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-surface-container-highest/60 bg-surface-container-high/20 pointer-events-none"></div>
          <div className="absolute w-[50%] h-[50%] rounded-full border border-surface-container-highest/80 bg-surface-container-high/30 pointer-events-none"></div>
          <div className="absolute w-[20%] h-[20%] rounded-full border border-surface-container-highest bg-surface-container-high/40 pointer-events-none"></div>
          
          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-outline-variant/30 pointer-events-none"></div>
          <div className="absolute h-full w-[1px] bg-outline-variant/30 pointer-events-none"></div>

          {/* Cardinal Compass Indicators */}
          <span className="absolute top-2 font-label-caps text-label-caps text-primary font-bold">N 000°</span>
          <span className="absolute bottom-2 font-label-caps text-label-caps text-on-surface-variant font-bold">S 180°</span>
          <span className="absolute left-2 font-label-caps text-label-caps text-on-surface-variant font-bold">W 270°</span>
          <span className="absolute right-2 font-label-caps text-label-caps text-on-surface-variant font-bold">E 090°</span>

          {/* Zenith Center Marker */}
          <div className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.8)] z-10"></div>

          {/* Constellation 1: Orion (RA 05h) */}
          <div 
            onClick={() => handleTargetClick(CELESTIAL_TARGETS[0])}
            className="absolute top-1/4 left-1/3 flex flex-col items-center cursor-pointer group transition-transform active:scale-95 z-20" 
            id="target-orion"
            title="Orion (RA 05h) - Tap for telemetry"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_12px_rgba(255,193,116,0.9)] animate-pulse"></div>
              <div className="absolute w-6 h-6 rounded-full bg-tertiary/20 animate-ping"></div>
            </div>
            <div className="mt-1 px-1.5 py-0.5 rounded bg-surface-container-highest shadow-sm border border-tertiary/20 group-hover:border-tertiary/50 transition-colors">
              <span className="font-telemetry-sm text-telemetry-sm text-tertiary block leading-none font-medium">Orion (RA 05h)</span>
            </div>
          </div>

          {/* Constellation 2: Ursa Major */}
          <div 
            onClick={() => handleTargetClick(CELESTIAL_TARGETS[1])}
            className="absolute bottom-1/4 right-1/4 flex flex-col items-center cursor-pointer group transition-transform active:scale-95 z-20" 
            id="target-ursa"
            title="Ursa Major - Tap for telemetry"
          >
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(142,213,255,0.8)]"></div>
            <div className="mt-1 px-1.5 py-0.5 rounded bg-surface-container-highest shadow-sm border border-primary/20 group-hover:border-primary/50 transition-colors">
              <span className="font-telemetry-sm text-telemetry-sm text-primary block leading-none font-medium">Ursa Major</span>
            </div>
          </div>

          {/* Constellation 3: Cassiopeia */}
          <div 
            onClick={() => handleTargetClick(CELESTIAL_TARGETS[2])}
            className="absolute top-16 right-1/4 flex flex-col items-center cursor-pointer group transition-transform active:scale-95 z-20" 
            id="target-cassiopeia"
            title="Cassiopeia - Tap for telemetry"
          >
            <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(221,183,255,0.8)]"></div>
            <div className="mt-1 px-1.5 py-0.5 rounded bg-surface-container-highest shadow-sm border border-secondary/20 group-hover:border-secondary/50 transition-colors">
              <span className="font-telemetry-sm text-telemetry-sm text-secondary block leading-none font-medium">Cassiopeia</span>
            </div>
          </div>

          {/* Satellite 1: Simulated Passing Satellite Pulse (ISS) */}
          <div 
            onClick={() => handleTargetClick(CELESTIAL_TARGETS[3])}
            className="absolute top-12 left-16 flex items-center gap-1 opacity-90 cursor-pointer group hover:opacity-100 z-20"
            title="ISS Orbit Track"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant font-mono bg-surface-container-highest/80 px-1 py-0.2 rounded border border-error/30 group-hover:text-error transition-colors">
              ISS -3.4m
            </span>
          </div>

          {/* Target 4: Pleiades */}
          <div 
            onClick={() => handleTargetClick(CELESTIAL_TARGETS[4])}
            className="absolute top-[48%] left-[22%] flex items-center gap-1 opacity-75 hover:opacity-100 cursor-pointer z-20"
            title="Pleiades (M45)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span>
            <span className="font-label-caps text-[9px] text-on-surface-variant/80 font-mono hidden sm:inline">M45</span>
          </div>
        </div>

        {/* Active Celestial Compass Telemetry Strip */}
        <div className="w-full flex items-center justify-between pt-space-xs text-on-surface-variant">
          <button 
            onClick={() => setIsGyroActive(!isGyroActive)}
            className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle Gyro Live Tracking"
          >
            <span className={`material-symbols-outlined text-[18px] ${isGyroActive ? 'text-primary' : 'text-outline'}`}>
              screen_rotation
            </span>
            <span className="font-telemetry-sm text-telemetry-sm">Gyro Live Tracking</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isGyroActive ? 'bg-primary animate-pulse' : 'bg-outline'}`}></span>
          </button>
          
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            <span className="font-label-caps text-label-caps text-on-surface uppercase font-mono">
              Azimuth {String(azimuth).padStart(3, '0')}° • Alt {String(altitude).padStart(2, '0')}°
            </span>
          </div>
        </div>
      </div>

      {/* Notification Banner & Toggle for Upcoming Passes */}
      <div className="w-full bg-surface-container-high rounded-xl p-space-md shadow-md flex items-center justify-between border border-outline-variant/15">
        <div className="flex items-center gap-space-sm min-w-0 pr-space-xs">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[22px] material-symbols-fill">
              notifications_active
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-body-md text-body-md text-on-surface font-medium truncate">
              Pass Proximity Alerts
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Alert me 15m before visible overhead passes
            </span>
          </div>
        </div>
        <button 
          id="toggle-alert-btn"
          aria-label="Toggle notifications" 
          onClick={handleToggleAlerts}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
            alertsEnabled ? 'bg-primary' : 'bg-surface-container-highest'
          }`}
        >
          <span 
            id="toggle-thumb"
            className={`inline-block h-5 w-5 transform rounded-full bg-on-primary transition duration-200 ease-in-out mt-0.5 ml-0.5 shadow ${
              alertsEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} 
          />
        </button>
      </div>

      {/* NASA JWST Mission Tracker Card */}
      <div 
        onClick={() => onSelectMission(activeMission)}
        className="w-full bg-surface-container-low rounded-xl p-space-md shadow-xl relative overflow-hidden flex flex-col space-y-space-sm border border-outline-variant/15 cursor-pointer hover:border-tertiary/40 transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
            <span className="font-label-caps text-label-caps text-tertiary uppercase font-bold tracking-wider">
              {activeMission.badge}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
              {activeMission.location}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCycleMission();
              }}
              title="Next NASA Mission"
              className="text-on-surface-variant hover:text-primary transition-colors text-xs p-0.5 rounded bg-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[14px]">sync</span>
            </button>
          </div>
        </div>

        <div className="flex items-start gap-space-sm">
          <div className="w-16 h-16 rounded-lg bg-surface-container shrink-0 overflow-hidden relative border border-outline-variant/20">
            <img 
              alt="NASA Mission Target" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              src={activeMission.imageUrl} 
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
              {activeMission.name}
            </span>
            <span className="font-body-sm text-body-sm text-primary font-medium mt-0.5">
              {activeMission.program}
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant truncate mt-0.5">
              Target: {activeMission.targetName}
            </span>
          </div>
        </div>

        <div className="w-full bg-surface-container rounded-lg p-space-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Filter Mode</span>
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-medium font-mono">
              {activeMission.filterMode}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Exposure Elapsed</span>
            <span className="font-telemetry-sm text-telemetry-sm text-tertiary font-medium font-mono">
              {activeMission.exposureElapsed} / {activeMission.exposureTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming Celestial Events Feed */}
      <div className="w-full flex flex-col space-y-space-sm pb-space-lg">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Upcoming Astronomical Events
          </span>
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
            Next 30 Days
          </span>
        </div>

        {/* Dynamic event feed matching all events */}
        {ASTRONOMICAL_EVENTS.map((event) => {
          const isBookmarked = bookmarkedEventIds.includes(event.id);
          const iconColors: Record<string, string> = {
            primary: 'text-primary bg-primary/10',
            secondary: 'text-secondary bg-secondary/10',
            tertiary: 'text-tertiary bg-tertiary/10',
            error: 'text-error bg-error/10'
          };
          const badgeStyles: Record<string, string> = {
            tonight: 'bg-tertiary-container text-on-tertiary-container',
            tomorrow: 'bg-surface-container-highest text-secondary',
            upcoming: event.colorType === 'error' ? 'bg-surface-container-highest text-error' : 'bg-surface-container-highest text-tertiary'
          };

          return (
            <div 
              key={event.id}
              onClick={() => onSelectEvent(event)}
              className="w-full bg-surface-container-low rounded-xl p-space-md shadow-md flex items-center justify-between gap-space-sm border border-outline-variant/15 hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-lg ${iconColors[event.colorType] || 'text-primary bg-primary/10'} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-[26px]">
                  {event.icon}
                </span>
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                    {event.title}
                  </span>
                  <span className={`px-1.5 py-0.2 rounded ${badgeStyles[event.badgeType] || 'bg-surface-container-highest text-primary'} font-label-caps text-label-caps font-bold shrink-0`}>
                    {event.badgeText}
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 truncate">
                  {event.subtitle}
                </span>
              </div>

              <button 
                aria-label={`Toggle reminder for ${event.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(event.id);
                  playChime(isBookmarked ? 440 : 880);
                }}
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isBookmarked 
                    ? 'bg-primary text-on-primary shadow-[0_0_8px_rgba(56,189,248,0.6)]' 
                    : 'bg-surface-container text-primary hover:bg-surface-container-highest'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isBookmarked ? 'bookmark_added' : 'bookmark_add'}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Observatory Switcher Modal */}
      {showObsPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-sm bg-surface-container-low border border-outline-variant/30 rounded-2xl p-space-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Select Observatory</span>
              <button 
                onClick={() => setShowObsPicker(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-2 mt-2">
              {OBSERVATORIES.map((obs) => (
                <button
                  key={obs.id}
                  onClick={() => {
                    onSelectObservatory(obs);
                    setShowObsPicker(false);
                    playChime(900);
                  }}
                  className={`w-full p-space-sm rounded-xl text-left transition-all border ${
                    obs.id === currentObservatory.id 
                      ? 'bg-surface-container-high border-primary text-primary' 
                      : 'bg-surface-container border-outline-variant/20 hover:border-primary/40 text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-sm font-semibold">{obs.name}</span>
                    <span className="font-telemetry-sm font-bold">Bortle {obs.darkSkyBortle}</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant block mt-0.5">
                    {obs.country} • {obs.altitude}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
