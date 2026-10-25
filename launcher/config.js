// Override these defaults in config.local.js (gitignored), then deploy again.
var LAUNCHER_CONFIG = {
  favorites: [
    { title: 'YouTube', match: ['9Ur5IzDKqV.TizenYouTube', 'YouTube'], art: 'youtube', fit: 'mark' },
    { title: 'Netflix', match: ['org.tizen.netflix-app', 'Netflix'], art: 'netflixMark', fit: 'mark' },
    { title: 'Prime Video', match: ['org.tizen.primevideo', 'Prime Video'], art: 'primeSmile', fit: 'mark' },
    { title: 'Hulu', match: ['Hulu'], art: 'huluMark', fit: 'mark' }
  ],
  hideMissing: false,
  // Empty means a plain background. No photos or downloads are required.
  wallpapers: { files: [], minutes: 60 },
  weather: { latitude: null, longitude: null, units: 'fahrenheit' },
  clock24h: false,
  idleSource: null,
  returnToLauncher: true,
  launcherOnPowerOn: true
};
