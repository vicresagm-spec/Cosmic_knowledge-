import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/cosmosData';
import { GalleryItem } from '../types/cosmos';

interface GalleryScreenProps {
  soundEnabled: boolean;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTelescope, setSelectedTelescope] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Nebulae', 'Galaxies', 'Star Clusters'];
  const telescopes = ['All', 'JWST NIRCam', 'JWST MIRI', 'Hubble WFC3', 'Chandra X-Ray'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesTelescope = selectedTelescope === 'All' || item.telescope === selectedTelescope;
    return matchesCategory && matchesTelescope;
  });

  return (
    <div className="flex flex-col w-full px-margin space-y-space-md max-w-2xl mx-auto pb-space-lg animate-fadeIn">
      {/* Search / Filter header */}
      <div className="flex flex-col space-y-space-sm bg-surface-container-low p-space-md rounded-xl border border-outline-variant/15">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Cosmic Deep Field Catalog</span>
          <span className="font-telemetry-sm text-primary font-bold">{filteredItems.length} Targets</span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-telemetry-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary font-bold shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Telescope Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="font-label-caps text-[9px] text-on-surface-variant uppercase shrink-0">Sensor:</span>
          {telescopes.map((tel) => (
            <button
              key={tel}
              onClick={() => setSelectedTelescope(tel)}
              className={`px-2 py-0.5 rounded text-[11px] font-telemetry-sm transition-all whitespace-nowrap ${
                selectedTelescope === tel
                  ? 'bg-surface-container-highest text-tertiary border border-tertiary/40 font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tel}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of astronomical objects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group bg-surface-container-low rounded-xl overflow-hidden shadow-lg border border-outline-variant/15 hover:border-primary/40 transition-all cursor-pointer flex flex-col"
          >
            <div className="relative aspect-4/3 w-full bg-surface-container-lowest overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-70"></div>
              
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur font-label-caps text-[9px] text-tertiary font-bold border border-tertiary/30">
                  {item.telescope}
                </span>
              </div>

              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur font-telemetry-sm text-[10px] text-primary">
                  {item.distanceLy}
                </span>
              </div>

              <div className="absolute bottom-2 left-2 right-2">
                <span className="font-label-caps text-[9px] text-on-surface-variant uppercase">{item.objectDesignation}</span>
                <h3 className="font-headline-sm text-sm text-on-surface font-semibold group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="p-space-sm bg-surface-container/60 flex items-center justify-between text-on-surface-variant font-telemetry-sm text-xs">
              <span>{item.constellation}</span>
              <span className="text-secondary font-mono">{item.spectrum}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Inspector Modal */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveItem(null)}
        >
          <div 
            className="w-full max-w-xl bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-surface-container-lowest overflow-hidden">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 text-on-surface flex items-center justify-center hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-space-md space-y-space-md overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-label-caps text-label-caps text-primary uppercase">{activeItem.objectDesignation}</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{activeItem.title}</h2>
                </div>
                <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-caps text-label-caps font-bold">
                  {activeItem.telescope}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-surface-container p-space-sm rounded-lg">
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Distance</span>
                  <p className="font-telemetry-sm text-telemetry-sm text-primary font-bold mt-0.5">{activeItem.distanceLy}</p>
                </div>
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Constellation</span>
                  <p className="font-telemetry-sm text-telemetry-sm text-secondary font-bold mt-0.5">{activeItem.constellation}</p>
                </div>
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Spectral Mode</span>
                  <p className="font-telemetry-sm text-telemetry-sm text-tertiary font-bold mt-0.5">{activeItem.spectrum}</p>
                </div>
              </div>

              <p className="font-body-md text-body-md text-on-surface leading-relaxed bg-surface-container/40 p-space-sm rounded-lg border border-outline-variant/15">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
