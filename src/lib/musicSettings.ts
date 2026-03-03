// Music Settings Utility
// Provides typed access to music-related settings with defaults

export type AudioQuality = "auto" | "low" | "medium" | "high" | "lossless";
export type EqualizerPreset = "flat" | "bass" | "treble" | "vocal" | "dance" | "acoustic";
export type RepeatMode = "off" | "track" | "playlist";
export type ProfileVisibility = "everyone" | "friends" | "noone";

export interface MusicSettings {
  // Audio
  audioQuality: AudioQuality;
  normalizeVolume: boolean;
  equalizerPreset: EqualizerPreset;
  crossfadeDuration: number;
  gaplessPlayback: boolean;
  musicVolume: number;
  backgroundMusic: boolean;
  soundEffects: boolean;
  showVisualizations: boolean;

  // Playback
  autoPlay: boolean;
  autoPlayNext: boolean;
  shuffleDefault: boolean;
  repeatMode: RepeatMode;
  skipSilence: boolean;
  preloadEnabled: boolean;

  // Downloads
  offlineMode: boolean;
  downloadQuality: "standard" | "high" | "lossless";
  autoDownload: boolean;
  storageLimit: number;
  clearCacheOnExit: boolean;

  // Content
  explicitContent: boolean;
  showLyrics: boolean;
  lyricsSync: boolean;
}

const defaultMusicSettings: MusicSettings = {
  audioQuality: "high",
  normalizeVolume: true,
  equalizerPreset: "flat",
  crossfadeDuration: 0,
  gaplessPlayback: true,
  musicVolume: 30,
  backgroundMusic: true,
  soundEffects: true,
  showVisualizations: true,

  autoPlay: false,
  autoPlayNext: true,
  shuffleDefault: false,
  repeatMode: "off",
  skipSilence: false,
  preloadEnabled: true,

  offlineMode: false,
  downloadQuality: "high",
  autoDownload: false,
  storageLimit: 5,
  clearCacheOnExit: false,

  explicitContent: true,
  showLyrics: true,
  lyricsSync: true
};

const SETTINGS_KEY = "venom-settings";

export function getMusicSettings(): MusicSettings {
  if (typeof window === "undefined") {
    return defaultMusicSettings;
  }

  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultMusicSettings, ...parsed };
    }
  } catch (error) {
    console.error("Failed to load music settings:", error);
  }

  return defaultMusicSettings;
}

export function saveMusicSettings(settings: Partial<MusicSettings>): void {
  if (typeof window === "undefined") return;

  try {
    const current = getMusicSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save music settings:", error);
  }
}

export function getBitrateForQuality(quality: AudioQuality): number {
  switch (quality) {
    case "low":
      return 96;
    case "medium":
      return 160;
    case "high":
      return 320;
    case "lossless":
      return 1411;
    case "auto":
    default:
      return 320;
  }
}

export function formatQualityLabel(quality: AudioQuality): string {
  switch (quality) {
    case "low":
      return "Low (~96 kbps)";
    case "medium":
      return "Medium (~160 kbps)";
    case "high":
      return "High (~320 kbps)";
    case "lossless":
      return "Lossless (FLAC)";
    case "auto":
      return "Auto (Adaptive)";
    default:
      return quality;
  }
}

export function getEqualizerBands(preset: EqualizerPreset): number[] {
  // Returns 10-band equalizer values (-12 to +12 dB)
  switch (preset) {
    case "bass":
      return [8, 6, 4, 2, 0, 0, 0, 0, 0, 0];
    case "treble":
      return [0, 0, 0, 0, 0, 0, 2, 4, 6, 8];
    case "vocal":
      return [-2, -1, 0, 3, 6, 6, 3, 0, -1, -2];
    case "dance":
      return [6, 4, 2, 0, 0, 2, 4, 6, 4, 2];
    case "acoustic":
      return [0, 2, 4, 3, 1, 1, 3, 4, 2, 0];
    case "flat":
    default:
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
}

// Storage management
export function getStorageUsage(): Promise<number> {
  return new Promise((resolve) => {
    if (typeof navigator !== "undefined" && "storage" in navigator) {
      navigator.storage.estimate().then((estimate) => {
        const usage = estimate.usage || 0;
        resolve(usage / (1024 * 1024 * 1024)); // Convert to GB
      }).catch(() => resolve(0));
    } else {
      resolve(0);
    }
  });
}

export function clearMusicCache(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        Promise.all(
          cacheNames
            .filter((name) => name.includes("audio") || name.includes("music"))
            .map((name) => caches.delete(name))
        ).then(() => resolve()).catch(reject);
      }).catch(reject);
    } else {
      resolve();
    }
  });
}

// Event system for settings changes
export type SettingsChangeCallback = (settings: MusicSettings) => void;

const listeners: SettingsChangeCallback[] = [];

export function subscribeToSettings(callback: SettingsChangeCallback): () => void {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

export function notifySettingsChange(): void {
  const settings = getMusicSettings();
  listeners.forEach((callback) => callback(settings));
}
