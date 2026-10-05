import React, { useState } from 'react';
import { NEBULA_SPECTRAL_BANDS, NEBULA_ELEMENT_COMPOSITION } from '../data/cosmosData';

interface NebulaScreenProps {
  soundEnabled: boolean;
}

export const NebulaScreen: React.FC<NebulaScreenProps> = () => {
  const [activeBand, setActiveBand] = useState<string>('composite');
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number }>({ x: 50, y: 45 });
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleBandChange = (bandId: string) => {
    setActiveBand(bandId);
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 400);
  };

  const getFilterStyle = () => {
    switch (activeBand) {
      case 'nircam':
        return 'contrast(120%) saturate(150%) hue-rotate(185deg) brightness(1.1)';
      case 'miri':
        return 'contrast(135%) saturate(180%) hue-rotate(30deg) brightness(0.95)';
      case 'halpha':
        return 'contrast(150%) saturate(220%) hue-rotate(330deg) brightness(1.05)';
      case 'oiii':
        return 'contrast(140%) saturate(190%) hue-rotate(150deg) brightness(1.15)';
      default:
        return 'none';
    }
  };

  return (
    <div className="flex flex-col w-full px-margin space-y-space-md max-w-2xl mx-auto pb-space-lg animate-fadeIn">
      {/* Header status */}
      <div className="bg-surface-container-low rounded-xl p-space-md shadow-xl border border-outline-variant/15 flex items-center justify-between">
        <div>
          <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-wider block">SPECTRAL SPECTROGRAPHY TERMINAL</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">NGC 3372 • Carina Molecular Cloud</h2>
        </div>
        <div className="text-right">
          <span className="font-label-caps text-[9px] text-on-surface-variant uppercase block">Resolution</span>
          <span className="font-telemetry-sm text-primary font-mono font-bold">0.031 arcsec/px</span>
        </div>
      </div>

      {/* Interactive Spectrogram Viewport */}
      <div className="relative w-full aspect-square max-h-[380px] bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20 flex items-center justify-center select-none group">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
          alt="Carina Nebula Multi-Spectral View"
          className="w-full h-full object-cover transition-all duration-700"
          style={{ filter: getFilterStyle() }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
            setCrosshairPos({ x, y });
          }}
        />

        {/* Scan line effect when analyzing */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-primary/10 animate-pulse pointer-events-none"></div>
        )}

        {/* Quadrant Crosshairs Overlay */}
        <div 
          className="absolute pointer-events-none transition-all duration-300 z-10"
          style={{ left: `${crosshairPos.x}%`, top: `${crosshairPos.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute w-8 h-8 rounded-full border border-primary/70 animate-ping"></div>
            <div className="w-6 h-6 rounded-full border border-primary"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#38bdf8]"></div>
            <div className="absolute -top-3 w-[1px] h-3 bg-primary"></div>
            <div className="absolute -bottom-3 w-[1px] h-3 bg-primary"></div>
            <div className="absolute -left-3 h-[1px] w-3 bg-primary"></div>
            <div className="absolute -right-3 h-[1px] w-3 bg-primary"></div>
          </div>
          <div className="mt-1 px-1 py-0.2 rounded bg-surface-container-lowest/90 border border-primary/40 text-[9px] font-mono text-primary whitespace-nowrap">
            X:{crosshairPos.x}% Y:{crosshairPos.y}%
          </div>
        </div>

        {/* Floating current filter badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur border border-outline-variant/30 font-telemetry-sm text-xs text-primary flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {NEBULA_SPECTRAL_BANDS.find((b) => b.id === activeBand)?.label}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 text-right">
          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur font-label-caps text-[9px] text-tertiary">
            TAP CANVAS TO REPOSITION TARGET
          </span>
        </div>
      </div>

      {/* Spectral Band Selector */}
      <div className="bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/15 space-y-2">
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block px-1">
          Select Emission Filter Wavelength
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {NEBULA_SPECTRAL_BANDS.map((band) => {
            const isActive = activeBand === band.id;
            return (
              <button
                key={band.id}
                onClick={() => handleBandChange(band.id)}
                className={`p-2.5 rounded-lg text-left transition-all border ${
                  isActive
                    ? 'bg-surface-container-high border-primary text-primary shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                    : 'bg-surface-container border-outline-variant/20 hover:border-outline-variant/50 text-on-surface-variant'
                }`}
              >
                <span className="font-headline-sm text-xs font-semibold block leading-tight">{band.label}</span>
                <span className="font-telemetry-sm text-[10px] text-on-surface-variant font-mono mt-0.5 block">{band.wavelength}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chemical Composition Breakdown */}
      <div className="bg-surface-container-low p-space-md rounded-xl border border-outline-variant/15 space-y-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-sm text-on-surface font-semibold">Spectroscopic Chemical Abundance</span>
          <span className="font-telemetry-sm text-primary font-bold">Z = 0.0142 (Solar Metallicity)</span>
        </div>

        <div className="space-y-2.5">
          {NEBULA_ELEMENT_COMPOSITION.map((elem) => (
            <div key={elem.element} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-telemetry-sm">
                <span className="text-on-surface">{elem.element}</span>
                <span className="text-primary font-bold font-mono">{elem.percentage}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                <div
                  className={`h-full ${elem.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(100, elem.percentage * 1.3)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Astrophysical Metrics */}
      <div className="grid grid-cols-2 gap-space-sm">
        <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/15">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Core Kinetic Temp</span>
          <span className="font-telemetry-lg text-telemetry-lg text-primary font-bold block mt-0.5">18.4 Kelvin</span>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">Cold Molecular Core</span>
        </div>
        <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/15">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Star Formation Rate</span>
          <span className="font-telemetry-lg text-telemetry-lg text-tertiary font-bold block mt-0.5">0.02 M☉ / yr</span>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">Active Protostellar Accretion</span>
        </div>
      </div>
    </div>
  );
};
