import { ObservatoryLocation, CelestialTarget, NasaMission, AstronomicalEvent, ApodItem, GalleryItem } from '../types/cosmos';

export const COSMOS_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1XFN0Kg4Czxj617T70sK4MiGECCOTdfK3TdM_wXHsCbpR_LQy6rJCeSk8pnqWGXdjCpCuxdhQVowZEoDJ3_Oi1TaN5xhvqVkB4kRJFQG65oOxzgBpFCBy2gCSb-HVefUEyS-u9CeebYDYkM1BgHZ20aiwcF9pDLyPROnRAa42zLXwrSxN7-o4A3d__CFYFkV5VIZR0tLGvfQtmqLBIso5pQWXplUSYATlzngoGXwmvvHWpF-TRJS4_h0mA';
export const USER_AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCokES4JBnSek2QW39GZDdr8LTO87wMHcGtzDiSqgynEAL8zqD-bPCWyWcq4I5j5Z-imB20-X0RYxscZl_Dw1AJ_isYmc53eV18zq8pFS_VdGQteGJCvlAvbaGtraACTikXNPU2PbPEkRzTRLUtFcIKSEXGLNcvNR2OzW06-o0sAgjgdxotU_WQfXfvLiHA-hvzjG_JHmmJTELXW8OqhjeRUAn6Wkh5lbszL-WSlmFctBUkstn1L1Hl';
export const JWST_MIRROR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6DuhpfUjScbdOA3uzWbDASAyGkkp7fP3LbQwNL7U-INsiuRKwnr0dnRtCU3yWqr0plaZubVpSyoILlvPJKRqNISZwFkxMkaBki3ydTeoDIZe4a1y3XIbC1Gsc39KUOseGnmLqI-M8BItOB-HyCuQZbnPKnWbY7R4CGhkeWemc6pg9VkNIZtDfTKvmEV89yeAVtPzuTWAPysD2Xv4fBzMzPJWrzsFzMLN0vwjhOzzdEDzRN6lIbp6B';

export const OBSERVATORIES: ObservatoryLocation[] = [
  {
    id: 'mauna-kea',
    name: 'Mauna Kea Observatory',
    country: 'Hawaii, USA',
    altitude: '4,207M ALT',
    status: 'Optimum',
    darkSkyBortle: 1,
    bortleRating: 'Exceptional',
    cloudCover: 4,
    cloudStatus: 'Crystal Clear',
    moonPhasePercent: 18,
    moonPhaseName: 'Waxing Cresc.',
    lat: 19.8207,
    lng: -155.4681
  },
  {
    id: 'alma-atacama',
    name: 'ALMA Array / Chajnantor',
    country: 'Atacama, Chile',
    altitude: '5,050M ALT',
    status: 'Optimum',
    darkSkyBortle: 1,
    bortleRating: 'Pristine Dark',
    cloudCover: 1,
    cloudStatus: 'Zero Moisture',
    moonPhasePercent: 18,
    moonPhaseName: 'Waxing Cresc.',
    lat: -23.029,
    lng: -67.755
  },
  {
    id: 'roque-muchachos',
    name: 'Roque de los Muchachos',
    country: 'La Palma, Spain',
    altitude: '2,396M ALT',
    status: 'Good',
    darkSkyBortle: 2,
    bortleRating: 'Truly Dark',
    cloudCover: 8,
    cloudStatus: 'Above Inversion',
    moonPhasePercent: 18,
    moonPhaseName: 'Waxing Cresc.',
    lat: 28.7566,
    lng: -17.892
  },
  {
    id: 'paranal',
    name: 'Paranal Observatory (VLT)',
    country: 'Antofagasta, Chile',
    altitude: '2,635M ALT',
    status: 'Optimum',
    darkSkyBortle: 1,
    bortleRating: 'Sub-Arcsec Seeing',
    cloudCover: 2,
    cloudStatus: 'Super Clear',
    moonPhasePercent: 18,
    moonPhaseName: 'Waxing Cresc.',
    lat: -24.627,
    lng: -70.404
  }
];

export const CELESTIAL_TARGETS: CelestialTarget[] = [
  {
    id: 'target-orion',
    name: 'Orion (RA 05h)',
    designation: 'M42 / Betelgeuse Cluster',
    type: 'constellation',
    x: 35,
    y: 26,
    color: 'tertiary',
    badgeColor: 'bg-surface-container-highest text-tertiary',
    ra: '05h 35m 17s',
    dec: '-05° 23′ 28″',
    magnitude: 0.45,
    distanceLightYears: '1,344 LY',
    description: 'Prominent winter constellation housing the Great Orion Nebula (M42) and red supergiant Betelgeuse. Currently transiting the upper meridian with exceptional transparency.',
    bestViewingTime: '23:45 - 03:15 HST'
  },
  {
    id: 'target-ursa',
    name: 'Ursa Major',
    designation: 'The Great Bear / Big Dipper',
    type: 'constellation',
    x: 60,
    y: 74,
    color: 'primary',
    badgeColor: 'bg-surface-container-highest text-primary',
    ra: '11h 00m 00s',
    dec: '+60° 00′ 00″',
    magnitude: 1.77,
    distanceLightYears: '80 LY (average)',
    description: 'Circumpolar northern constellation featuring Dubhe and Merak, the pointer stars leading directly to Polaris. Ideal orientation for wide-field astrophotography.',
    bestViewingTime: '01:00 - 05:30 HST'
  },
  {
    id: 'target-cassiopeia',
    name: 'Cassiopeia',
    designation: 'The Queen / W-Asterism',
    type: 'constellation',
    x: 68,
    y: 20,
    color: 'secondary',
    badgeColor: 'bg-surface-container-highest text-secondary',
    ra: '01h 15m 00s',
    dec: '+60° 30′ 00″',
    magnitude: 2.24,
    distanceLightYears: '228 LY',
    description: 'Characteristic W-shaped asterism located opposite the Big Dipper across the celestial pole. Rich in emission nebulae including the Heart and Soul complex.',
    bestViewingTime: '21:30 - 02:00 HST'
  },
  {
    id: 'target-iss',
    name: 'ISS -3.4m',
    designation: 'ZARYA / NORAD 25544',
    type: 'satellite',
    x: 28,
    y: 16,
    color: 'error',
    badgeColor: 'bg-surface-container-highest text-on-surface-variant font-mono',
    ra: '03h 12m 44s',
    dec: '+28° 40′ 12″',
    magnitude: -3.4,
    distanceLightYears: '418 km (orbital altitude)',
    description: 'International Space Station executing a high-elevation orbital transit. Apparent velocity 7.66 km/s, crossing zenith with peak visual brilliance visible to the naked eye.',
    bestViewingTime: '04:12 HST (6m duration)'
  },
  {
    id: 'target-pleiades',
    name: 'Pleiades (M45)',
    designation: 'The Seven Sisters',
    type: 'star',
    x: 48,
    y: 42,
    color: 'primary',
    badgeColor: 'bg-surface-container-highest text-primary',
    ra: '03h 47m 24s',
    dec: '+24° 07′ 00″',
    magnitude: 1.6,
    distanceLightYears: '444 LY',
    description: 'Open star cluster enveloped in luminous reflection nebulosity of ionized interstellar dust. Brightest stars are hot blue luminous B-type giants.',
    bestViewingTime: '00:15 - 04:00 HST'
  },
  {
    id: 'target-andromeda',
    name: 'Andromeda (M31)',
    designation: 'NGC 224 Spiral Galaxy',
    type: 'galaxy',
    x: 75,
    y: 48,
    color: 'secondary',
    badgeColor: 'bg-surface-container-highest text-secondary',
    ra: '00h 42m 44s',
    dec: '+41° 16′ 09″',
    magnitude: 3.44,
    distanceLightYears: '2.537M LY',
    description: 'Nearest major spiral galaxy to the Milky Way containing over one trillion stars. Approaching the Milky Way at 110 km/s on a galactic collision trajectory in 4.5B years.',
    bestViewingTime: '22:00 - 02:45 HST'
  }
];

export const NASA_MISSIONS: NasaMission[] = [
  {
    id: 'jwst-nirspec',
    badge: 'NASA MISSION TRACKER',
    location: 'L2 Lagrange Point',
    name: 'JWST NIRSpec',
    instrument: 'Near-Infrared Spectrograph',
    program: 'Atmospheric Spectroscopy',
    target: 'HD 189733 b',
    targetName: 'Exoplanet HD 189733 b',
    filterMode: 'G395H/F290LP',
    exposureElapsed: '04h 18m',
    exposureTotal: '06h 00m',
    elapsedSeconds: 15480,
    totalSeconds: 21600,
    spectralBand: '2.87 - 5.14 µm',
    temperature: '38.4 K (-234.75°C)',
    imageUrl: JWST_MIRROR_URL
  },
  {
    id: 'jwst-nircam-carina',
    badge: 'DEEP SPACE OBSERVATORY',
    location: 'L2 Lagrange Point',
    name: 'JWST NIRCam',
    instrument: 'Near-Infrared Camera',
    program: 'Cosmic Cliffs Starburst',
    target: 'NGC 3372',
    targetName: 'Carina Nebula Molecular Cloud',
    filterMode: 'F090W/F200W/F444W',
    exposureElapsed: '02h 45m',
    exposureTotal: '04h 30m',
    elapsedSeconds: 9900,
    totalSeconds: 16200,
    spectralBand: '0.6 - 5.0 µm',
    temperature: '39.1 K (-234.05°C)',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hubble-acs',
    badge: 'LOW EARTH ORBIT',
    location: '540 km Altitude',
    name: 'Hubble ACS',
    instrument: 'Advanced Camera for Surveys',
    program: 'Ultra Deep Field Relic',
    target: 'Fornax Cluster',
    targetName: 'Primordial Galaxy Filaments',
    filterMode: 'F606W/F814W/F435W',
    exposureElapsed: '08h 12m',
    exposureTotal: '11h 20m',
    elapsedSeconds: 29520,
    totalSeconds: 40800,
    spectralBand: '200 - 1050 nm',
    temperature: '268.2 K (-4.95°C)',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
  }
];

export const ASTRONOMICAL_EVENTS: AstronomicalEvent[] = [
  {
    id: 'event-orionids',
    title: 'Orionids Meteor Peak',
    badgeText: 'TONIGHT',
    badgeType: 'tonight',
    icon: 'mobile_arrow_up_right',
    colorType: 'primary',
    subtitle: '20 meteors/hr • Peak visibility 2:00 AM HST',
    dateStr: 'Oct 05, 2026',
    details: 'Originating from debris left by Halley’s Comet (1P/Halley). The radiant point is situated north of Betelgeuse in Orion. High velocity entries (66 km/s) produce persistent ion trains.',
    visibilityTips: 'Face east-southeast away from direct city light. Allow 20 minutes for rhodopsin dark adaptation. Peak radiant elevation after 02:00 AM local time.',
    coordinates: 'RA 06h 20m | Dec +16°'
  },
  {
    id: 'event-iss',
    title: 'ISS Overhead Pass',
    badgeText: 'TOMORROW',
    badgeType: 'tomorrow',
    icon: 'satellite_alt',
    colorType: 'secondary',
    subtitle: 'Magnitude -3.4 (Bright) • 6 min duration',
    dateStr: 'Oct 06, 2026',
    details: 'The ISS will rise in the SW, cross zenith at 79° maximum elevation, and set in the NE. Bright solar panel reflections guarantee prominent naked-eye visibility exceeding Venus in magnitude.',
    visibilityTips: 'Look towards azimuth 215° starting at 04:12 AM HST. Pass reaches maximum elevation in zenith directly overhead at 04:15 AM HST.',
    coordinates: 'Azimuth 215° SW → 035° NE'
  },
  {
    id: 'event-jupiter',
    title: 'Jupiter at Opposition',
    badgeText: 'OCT 28',
    badgeType: 'upcoming',
    icon: 'wb_sunny',
    colorType: 'tertiary',
    subtitle: 'Closest approach to Earth • Visible with binoculars',
    dateStr: 'Oct 28, 2026',
    details: 'The gas giant will be directly opposite the Sun as seen from Earth, shining at magnitude -2.9. All four Galilean moons (Io, Europa, Ganymede, Callisto) clearly resolvable with modest 10x50 optics.',
    visibilityTips: 'Visible throughout the entire dark period from sunset to dawn. Transit at midnight HST with angular size of 49.8 arcseconds.',
    coordinates: 'Constellation Aries | RA 02h 55m'
  },
  {
    id: 'event-eclipse',
    title: 'Total Lunar Eclipse',
    badgeText: 'NOV 14',
    badgeType: 'upcoming',
    icon: 'brightness_2',
    colorType: 'error',
    subtitle: 'Blood Moon phase • Worldwide high-def stream',
    dateStr: 'Nov 14, 2026',
    details: 'The Moon passes directly through the umbral shadow of Earth. Rayleigh scattering through Earth’s atmospheric ring refracts amber and deep crimson sunset wavelengths onto the lunar surface.',
    visibilityTips: 'Totality lasts 1 hour and 25 minutes. No eye protection required. Excellent photographic opportunity for telephoto lenses.',
    coordinates: 'Totality Peak 03:34 AM HST'
  },
  {
    id: 'event-leonids',
    title: 'Leonids Fireball Storm',
    badgeText: 'NOV 17',
    badgeType: 'upcoming',
    icon: 'flare',
    colorType: 'tertiary',
    subtitle: '15 meteors/hr • Fast fireballs with smoke trails',
    dateStr: 'Nov 17, 2026',
    details: 'Comet 55P/Tempel-Tuttle debris field. Known for exceptional bolides and supersonic sonic booms from hypersonic kinetic impact at 71 km/s.',
    visibilityTips: 'Radiant rises in the sickle of Leo after midnight. Look 45 degrees away from radiant for longest atmospheric streaks.',
    coordinates: 'RA 10h 08m | Dec +22°'
  }
];

export const APOD_CURRENT: ApodItem = {
  date: '2026-10-05',
  title: 'JWST Peeks into the Cosmic Cliffs of Carina',
  explanation: 'What looks like craggy mountains on a moonlit evening is actually the edge of the nearby, young, star-forming region NGC 3372 in the Carina Nebula. Captured in infrared light by the James Webb Space Telescope’s Near-Infrared Camera (NIRCam), this image reveals for the first time previously invisible areas of star birth. The blistering ultraviolet radiation and stellar winds from extremely massive, hot, young stars in the center of the nebula are carving the cosmic wall of dust and gas.',
  url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
  hdurl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2400&q=90',
  mediaType: 'image',
  copyright: 'NASA, ESA, CSA, and STScI',
  telescope: 'JWST NIRCam / MIRI',
  spectralBand: '0.9 to 4.4 µm (Infrared)',
  constellation: 'Carina (The Keel)',
  distance: '7,600 Light-Years'
};

export const APOD_ARCHIVE: ApodItem[] = [
  APOD_CURRENT,
  {
    date: '2026-10-04',
    title: 'Pillars of Creation in Sharp Infrared Radiance',
    explanation: 'Webb’s near-infrared look at the iconic Pillars of Creation in the Eagle Nebula (M16) reveals newly formed protostars emerging from dense knots of gas and dust. When knots with sufficient mass form within the gas pillars, they collapse under their own gravity, slowly heat up, and eventually ignite thermonuclear fusion.',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    hdurl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90',
    mediaType: 'image',
    copyright: 'NASA, ESA, CSA, STScI',
    telescope: 'JWST NIRCam',
    spectralBand: '1.4 to 4.7 µm',
    constellation: 'Serpens Cauda',
    distance: '6,500 Light-Years'
  },
  {
    date: '2026-10-03',
    title: 'The Ghostly Shell of the Southern Ring Nebula',
    explanation: 'The Southern Ring planetary nebula (NGC 3132) is an expanding cloud of gas surrounding a dying binary star system. JWST reveals that the dimmer star at the center has been emitting cloaks of dust in every direction for thousands of years as it sheds its outer atmosphere.',
    url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
    hdurl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2400&q=90',
    mediaType: 'image',
    copyright: 'NASA, ESA, CSA',
    telescope: 'JWST MIRI',
    spectralBand: '7.7 to 18 µm',
    constellation: 'Vela',
    distance: '2,500 Light-Years'
  },
  {
    date: '2026-10-02',
    title: 'Stephan’s Quintet: A Gravitational Dance of Galaxies',
    explanation: 'Five galaxies locked in a high-speed cosmic ballet. JWST cuts through obscuring dust blankets to reveal shockwaves produced as galaxy NGC 7318B smashes through the cluster at millions of miles per hour.',
    url: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1600&q=80',
    hdurl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=2400&q=90',
    mediaType: 'image',
    copyright: 'NASA / ESA',
    telescope: 'JWST NIRCam / MIRI',
    spectralBand: 'Near & Mid-IR Composite',
    constellation: 'Pegasus',
    distance: '290 Million Light-Years'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-carina',
    title: 'Cosmic Cliffs in Carina',
    objectDesignation: 'NGC 3372',
    category: 'Nebulae',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    telescope: 'JWST NIRCam',
    spectrum: 'Near-Infrared',
    distanceLy: '7,600 LY',
    constellation: 'Carina',
    redshiftZ: 'z = -0.00008',
    description: 'Towering stellar nursery illuminated by ionizing ultraviolet radiation from luminous blue variable stars.'
  },
  {
    id: 'gal-pillars',
    title: 'Pillars of Creation',
    objectDesignation: 'M16 / NGC 6611',
    category: 'Nebulae',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    telescope: 'JWST NIRCam',
    spectrum: 'Near-Infrared',
    distanceLy: '6,500 LY',
    constellation: 'Serpens',
    redshiftZ: 'z = +0.00012',
    description: 'Finger-like gas columns forming protostars with supersonic bipolar outflows and Herbig-Haro bow shocks.'
  },
  {
    id: 'gal-orion',
    title: 'Great Orion Nebula Core',
    objectDesignation: 'M42 / NGC 1976',
    category: 'Nebulae',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    telescope: 'Hubble WFC3',
    spectrum: 'Optical',
    distanceLy: '1,344 LY',
    constellation: 'Orion',
    redshiftZ: 'z = +0.00006',
    description: 'The closest massive star-forming region to our solar system, anchored by the bright Trapezium cluster.'
  },
  {
    id: 'gal-tarantula',
    title: '30 Doradus (Tarantula Nebula)',
    objectDesignation: 'NGC 2070',
    category: 'Nebulae',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80',
    telescope: 'JWST NIRCam',
    spectrum: 'Near-Infrared',
    distanceLy: '160,000 LY',
    constellation: 'Dorado',
    redshiftZ: 'z = +0.0009',
    description: 'The largest and brightest H II region in the Local Group, located inside the Large Magellanic Cloud.'
  },
  {
    id: 'gal-andromeda',
    title: 'Andromeda Galaxy Spiral Arms',
    objectDesignation: 'M31 / NGC 224',
    category: 'Galaxies',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    telescope: 'Hubble WFC3',
    spectrum: 'Composite',
    distanceLy: '2.54M LY',
    constellation: 'Andromeda',
    redshiftZ: 'z = -0.0010',
    description: 'Billion-star spiral galaxy exhibiting warped outer gas discs and dense globular cluster systems.'
  },
  {
    id: 'gal-cartwheel',
    title: 'Cartwheel Ring Galaxy',
    objectDesignation: 'ESO 350-40',
    category: 'Galaxies',
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80',
    telescope: 'JWST MIRI',
    spectrum: 'Mid-Infrared',
    distanceLy: '500M LY',
    constellation: 'Sculptor',
    redshiftZ: 'z = +0.030',
    description: 'A spectacular bullseye galaxy formed by a high-velocity collision with a companion galaxy 400M years ago.'
  },
  {
    id: 'gal-pleiades',
    title: 'Seven Sisters Reflection Veil',
    objectDesignation: 'Messier 45',
    category: 'Star Clusters',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    telescope: 'Hubble WFC3',
    spectrum: 'Optical',
    distanceLy: '444 LY',
    constellation: 'Taurus',
    redshiftZ: 'z = +0.00001',
    description: 'Open cluster passing through an interstellar dust cloud whose sub-micron grains scatter brilliant blue light.'
  },
  {
    id: 'gal-chandra-sgra',
    title: 'Sagittarius A* Galactic Center',
    objectDesignation: 'Sgr A*',
    category: 'Galaxies',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    telescope: 'Chandra X-Ray',
    spectrum: 'X-Ray',
    distanceLy: '26,670 LY',
    constellation: 'Sagittarius',
    redshiftZ: 'z = 0.000',
    description: 'High-energy X-ray flares escaping the supermassive black hole event horizon at the center of the Milky Way.'
  }
];

export const NEBULA_SPECTRAL_BANDS = [
  { id: 'composite', label: 'Composite RGB', wavelength: '0.6 - 4.4 µm', color: 'text-primary' },
  { id: 'nircam', label: 'NIRCam (Near-IR)', wavelength: '2.1 µm F200W', color: 'text-primary-container' },
  { id: 'miri', label: 'MIRI (Mid-IR)', wavelength: '7.7 µm F770W', color: 'text-tertiary' },
  { id: 'halpha', label: 'H-Alpha 656nm', wavelength: '656.3 nm (Red)', color: 'text-error' },
  { id: 'oiii', label: 'Oxygen [O-III]', wavelength: '500.7 nm (Teal)', color: 'text-secondary' }
];

export const NEBULA_ELEMENT_COMPOSITION = [
  { element: 'Hydrogen (H I / H II)', percentage: 74, color: 'bg-primary' },
  { element: 'Helium (He I / He II)', percentage: 24, color: 'bg-tertiary' },
  { element: 'Oxygen ([O III] Doubly Ionized)', percentage: 0.85, color: 'bg-secondary' },
  { element: 'Carbon & PAHs (Hydrocarbons)', percentage: 0.72, color: 'bg-amber-400' },
  { element: 'Nitrogen & Sulfur ([N II] / [S II])', percentage: 0.43, color: 'bg-red-400' }
];
