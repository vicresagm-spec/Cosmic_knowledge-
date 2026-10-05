import React, { useState } from 'react';
import { APOD_ARCHIVE } from '../data/cosmosData';
import { ApodItem } from '../types/cosmos';

interface DailyApodScreenProps {
  soundEnabled: boolean;
}

export const DailyApodScreen: React.FC<DailyApodScreenProps> = ({ soundEnabled }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentApod: ApodItem = APOD_ARCHIVE[selectedIdx] || APOD_ARCHIVE[0];

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${currentApod.title}. ${currentApod.explanation}`);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(`${currentApod.title} - ${currentApod.url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full px-margin space-y-space-md max-w-2xl mx-auto pb-space-lg animate-fadeIn">
      {/* Date navigation bar */}
      <div className="flex items-center justify-between bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/15">
        <div className="flex items-center gap-space-xs overflow-x-auto py-0.5 no-scrollbar">
          {APOD_ARCHIVE.map((item, idx) => (
            <button
              key={item.date}
              onClick={() => {
                setSelectedIdx(idx);
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-telemetry-sm whitespace-nowrap transition-all ${
                selectedIdx === idx
                  ? 'bg-primary text-on-primary font-bold shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {idx === 0 ? 'Latest (Today)' : item.date}
            </button>
          ))}
        </div>

        <button
          onClick={handleShare}
          className="shrink-0 ml-2 px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-highest text-primary font-telemetry-sm flex items-center gap-1 transition-colors"
          title="Copy Link"
        >
          <span className="material-symbols-outlined text-[16px]">
            {copied ? 'check' : 'share'}
          </span>
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Main APOD Hero Viewport */}
      <div className="w-full bg-surface-container-low rounded-xl overflow-hidden shadow-2xl border border-outline-variant/15 flex flex-col">
        <div 
          className="relative aspect-video w-full bg-surface-container-lowest overflow-hidden group cursor-pointer"
          onClick={() => setIsZoomed(true)}
        >
          <img
            src={currentApod.url}
            alt={currentApod.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur text-primary font-label-caps text-label-caps uppercase border border-primary/20">
              NASA APOD ARCHIVE
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur flex items-center justify-center text-primary hover:scale-110 transition-transform"
              title="Bookmark Photo"
            >
              <span className={`material-symbols-outlined text-[18px] ${isLiked ? 'text-error material-symbols-fill' : ''}`}>
                favorite
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(true);
              }}
              className="w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur flex items-center justify-center text-on-surface hover:text-primary transition-colors"
              title="Expand HD Viewer"
            >
              <span className="material-symbols-outlined text-[18px]">zoom_in</span>
            </button>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-tertiary uppercase">{currentApod.date}</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight drop-shadow-md">
                {currentApod.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Telemetry Strip */}
        <div className="p-space-md grid grid-cols-2 sm:grid-cols-4 gap-space-sm bg-surface-container/60 border-b border-outline-variant/15">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Observatory</span>
            <span className="font-telemetry-sm text-telemetry-sm text-primary font-bold truncate mt-0.5">{currentApod.telescope}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Spectral Band</span>
            <span className="font-telemetry-sm text-telemetry-sm text-tertiary font-bold truncate mt-0.5">{currentApod.spectralBand}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Constellation</span>
            <span className="font-telemetry-sm text-telemetry-sm text-secondary font-bold truncate mt-0.5">{currentApod.constellation}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Distance</span>
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-bold truncate mt-0.5">{currentApod.distance}</span>
          </div>
        </div>

        {/* Explanation & Audio Narration */}
        <div className="p-space-md space-y-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Credit & Copyright</span>
              <span className="font-telemetry-sm text-on-surface font-medium">{currentApod.copyright || 'NASA Public Domain'}</span>
            </div>

            <button
              onClick={toggleSpeech}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-telemetry-sm text-xs font-semibold transition-all ${
                isSpeaking
                  ? 'bg-tertiary text-on-tertiary shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                  : 'bg-surface-container text-primary hover:bg-surface-container-highest border border-primary/20'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isSpeaking ? 'pause' : 'volume_up'}
              </span>
              <span>{isSpeaking ? 'Pause Audio' : 'Listen Briefing'}</span>
            </button>
          </div>

          <p className="font-body-md text-body-md text-on-surface leading-relaxed bg-surface-container/40 p-space-md rounded-xl border border-outline-variant/15">
            {currentApod.explanation}
          </p>
        </div>
      </div>

      {/* Fullscreen HD Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(false)}
              className="p-2 rounded-full bg-surface-container text-on-surface hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
          <img
            src={currentApod.hdurl || currentApod.url}
            alt={currentApod.title}
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="font-label-caps text-label-caps text-on-surface-variant mt-2">
            {currentApod.title} • High Definition Astro-Viewer
          </span>
        </div>
      )}
    </div>
  );
};
