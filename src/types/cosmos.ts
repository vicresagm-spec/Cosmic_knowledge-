export interface ObservatoryLocation {
  id: string;
  name: string;
  country: string;
  altitude: string;
  status: 'Optimum' | 'Good' | 'Fair' | 'Degraded';
  darkSkyBortle: number;
  bortleRating: string;
  cloudCover: number;
  cloudStatus: string;
  moonPhasePercent: number;
  moonPhaseName: string;
  lat: number;
  lng: number;
}

export interface CelestialTarget {
  id: string;
  name: string;
  designation: string;
  type: 'constellation' | 'satellite' | 'star' | 'galaxy' | 'nebula';
  x: number; // percentage in dome 0-100
  y: number; // percentage in dome 0-100
  color: 'tertiary' | 'primary' | 'secondary' | 'error';
  badgeColor: string;
  ra: string; // Right Ascension
  dec: string; // Declination
  magnitude: number;
  distanceLightYears?: string;
  description: string;
  bestViewingTime: string;
}

export interface NasaMission {
  id: string;
  badge: string;
  location: string;
  name: string;
  instrument: string;
  program: string;
  target: string;
  targetName: string;
  filterMode: string;
  exposureElapsed: string;
  exposureTotal: string;
  elapsedSeconds: number;
  totalSeconds: number;
  spectralBand: string;
  temperature: string;
  imageUrl: string;
}

export interface AstronomicalEvent {
  id: string;
  title: string;
  badgeText: string;
  badgeType: 'tonight' | 'tomorrow' | 'upcoming';
  icon: string;
  colorType: 'primary' | 'secondary' | 'tertiary' | 'error';
  subtitle: string;
  dateStr: string;
  details: string;
  visibilityTips: string;
  coordinates: string;
}

export interface ApodItem {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  mediaType: 'image' | 'video';
  copyright?: string;
  telescope: string;
  spectralBand: string;
  constellation: string;
  distance: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  objectDesignation: string;
  category: 'Nebulae' | 'Galaxies' | 'Star Clusters' | 'Exoplanets';
  imageUrl: string;
  telescope: 'JWST NIRCam' | 'JWST MIRI' | 'Hubble WFC3' | 'Chandra X-Ray' | 'Spitzer';
  spectrum: 'Near-Infrared' | 'Mid-Infrared' | 'Optical' | 'X-Ray' | 'Composite';
  distanceLy: string;
  constellation: string;
  redshiftZ?: string;
  description: string;
}
