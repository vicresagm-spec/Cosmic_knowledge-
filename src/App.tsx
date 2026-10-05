import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation, CosmosTab } from './components/Navigation';
import { SkyRadarScreen } from './components/SkyRadarScreen';
import { DailyApodScreen } from './components/DailyApodScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { NebulaScreen } from './components/NebulaScreen';
import { TargetDetailModal } from './components/TargetDetailModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { OBSERVATORIES, ASTRONOMICAL_EVENTS } from './data/cosmosData';
import { 
  ObservatoryLocation, 
  CelestialTarget, 
  AstronomicalEvent, 
  NasaMission 
} from './types/cosmos';

export default function App() {
  const [currentTab, setCurrentTab] = useState<CosmosTab>('sky-radar');
  const [currentObservatory, setCurrentObservatory] = useState<ObservatoryLocation>(OBSERVATORIES[0]);
  
  // Modals and Drawers
  const [selectedTarget, setSelectedTarget] = useState<CelestialTarget | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<AstronomicalEvent | null>(null);
  const [selectedMission, setSelectedMission] = useState<NasaMission | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Settings
  const [isNightVision, setIsNightVision] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Bookmarks
  const [bookmarkedEventIds, setBookmarkedEventIds] = useState<string[]>(['event-orionids']);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedEventIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenEventById = (eventId: string) => {
    const ev = ASTRONOMICAL_EVENTS.find((e) => e.id === eventId);
    if (ev) setSelectedEvent(ev);
  };

  return (
    <div className={`min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col selection:bg-primary-container selection:text-on-primary-container transition-colors duration-300 ${
      isNightVision ? 'brightness-90 contrast-125 sepia-50 hue-rotate-[320deg]' : ''
    }`}>
      {/* Night Vision Red Overlay Indicator banner */}
      {isNightVision && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-error/90 text-on-error py-1 px-4 text-center font-label-caps text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg">
          <span className="material-symbols-outlined text-[14px]">nightlight</span>
          Night Vision Mode Active (Dark Rhodopsin Preservation)
          <button 
            onClick={() => setIsNightVision(false)} 
            className="underline ml-2 text-[10px] cursor-pointer"
          >
            Disable
          </button>
        </div>
      )}

      {/* Persistent App Header */}
      <Header
        currentTab={currentTab}
        onOpenProfile={() => setIsProfileOpen(true)}
        isNightVision={isNightVision}
      />

      {/* Main Viewport Container */}
      <main className={`flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen ${isNightVision ? 'pt-24' : ''}`}>
        {currentTab === 'sky-radar' && (
          <SkyRadarScreen
            currentObservatory={currentObservatory}
            onSelectObservatory={setCurrentObservatory}
            onSelectTarget={setSelectedTarget}
            onSelectEvent={setSelectedEvent}
            onSelectMission={setSelectedMission}
            bookmarkedEventIds={bookmarkedEventIds}
            onToggleBookmark={handleToggleBookmark}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'daily-apod' && (
          <DailyApodScreen soundEnabled={soundEnabled} />
        )}

        {currentTab === 'gallery' && (
          <GalleryScreen soundEnabled={soundEnabled} />
        )}

        {currentTab === 'nebula' && (
          <NebulaScreen soundEnabled={soundEnabled} />
        )}
      </main>

      {/* Target Detail Modal (for celestial targets) */}
      {selectedTarget && (
        <TargetDetailModal
          target={selectedTarget}
          type="target"
          onClose={() => setSelectedTarget(null)}
        />
      )}

      {/* Event Detail Modal (for astronomical events) */}
      {selectedEvent && (
        <TargetDetailModal
          target={selectedEvent}
          type="event"
          onClose={() => setSelectedEvent(null)}
          onBookmarkToggle={handleToggleBookmark}
          isBookmarked={bookmarkedEventIds.includes(selectedEvent.id)}
        />
      )}

      {/* Mission Detail Modal (for NASA missions) */}
      {selectedMission && (
        <TargetDetailModal
          target={selectedMission}
          type="mission"
          onClose={() => setSelectedMission(null)}
        />
      )}

      {/* Astronomer Profile & Terminal Settings Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        isNightVision={isNightVision}
        onToggleNightVision={() => setIsNightVision(!isNightVision)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        currentObservatory={currentObservatory}
        onSelectObservatory={setCurrentObservatory}
        bookmarkedEventIds={bookmarkedEventIds}
        onOpenEvent={handleOpenEventById}
      />

      {/* Bottom Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />
    </div>
  );
}
