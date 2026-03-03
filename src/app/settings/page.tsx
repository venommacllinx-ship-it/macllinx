"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Settings,
  Bell,
  Moon,
  Volume2,
  Globe,
  Shield,
  User,
  Palette,
  Music,
  Monitor,
  Save,
  Check,
  Wifi,
  HardDrive,
  Headphones,
  Sliders,
  Repeat,
  Download,
  Zap,
  Eye,
  Key,
  Database,
  Smartphone
} from "lucide-react";

interface AppSettings {
  // Appearance
  theme: "dark" | "light" | "system";
  fontSize: "small" | "medium" | "large";
  reducedMotion: boolean;
  showVisualizations: boolean;

  // Audio
  backgroundMusic: boolean;
  soundEffects: boolean;
  musicVolume: number;
  audioQuality: "auto" | "low" | "medium" | "high" | "lossless";
  normalizeVolume: boolean;
  equalizerPreset: "flat" | "bass" | "treble" | "vocal" | "dance" | "acoustic";
  crossfadeDuration: number;
  gaplessPlayback: boolean;

  // Playback
  autoPlay: boolean;
  autoPlayNext: boolean;
  shuffleDefault: boolean;
  repeatMode: "off" | "track" | "playlist";
  skipSilence: boolean;
  preloadEnabled: boolean;

  // Downloads & Storage
  offlineMode: boolean;
  downloadQuality: "standard" | "high" | "lossless";
  autoDownload: boolean;
  storageLimit: number;
  clearCacheOnExit: boolean;

  // Content
  explicitContent: boolean;
  showLyrics: boolean;
  lyricsSync: boolean;

  // Notifications
  notifications: boolean;
  newReleaseAlerts: boolean;
  playlistUpdates: boolean;
  artistFollowNotifications: boolean;
  quietHours: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;

  // Privacy & Security
  privacyMode: boolean;
  shareListeningActivity: boolean;
  showProfileTo: "everyone" | "friends" | "noone";
  twoFactorAuth: boolean;
  dataSaver: boolean;

  // General
  language: string;
  keyboardShortcuts: boolean;
  betaFeatures: boolean;
  analyticsEnabled: boolean;
}

const defaultSettings: AppSettings = {
  // Appearance
  theme: "dark",
  fontSize: "medium",
  reducedMotion: false,
  showVisualizations: true,

  // Audio
  backgroundMusic: true,
  soundEffects: true,
  musicVolume: 30,
  audioQuality: "high",
  normalizeVolume: true,
  equalizerPreset: "flat",
  crossfadeDuration: 0,
  gaplessPlayback: true,

  // Playback
  autoPlay: false,
  autoPlayNext: true,
  shuffleDefault: false,
  repeatMode: "off",
  skipSilence: false,
  preloadEnabled: true,

  // Downloads & Storage
  offlineMode: false,
  downloadQuality: "high",
  autoDownload: false,
  storageLimit: 5,
  clearCacheOnExit: false,

  // Content
  explicitContent: true,
  showLyrics: true,
  lyricsSync: true,

  // Notifications
  notifications: true,
  newReleaseAlerts: true,
  playlistUpdates: true,
  artistFollowNotifications: true,
  quietHours: false,
  quietHoursStart: "22:00",
  quietHoursEnd: "08:00",

  // Privacy & Security
  privacyMode: false,
  shareListeningActivity: true,
  showProfileTo: "everyone",
  twoFactorAuth: false,
  dataSaver: false,

  // General
  language: "en",
  keyboardShortcuts: true,
  betaFeatures: false,
  analyticsEnabled: true
};

const formatStorage = (gb: number): string => {
  if (gb >= 1) return `${gb} GB`;
  return `${gb * 1000} MB`;
};

// Sub-components defined outside the main component
interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  color?: "purple" | "cyan" | "yellow" | "red" | "green" | "blue";
}

function Toggle({ checked, onChange, color = "purple" }: ToggleProps) {
  const colorClasses = {
    purple: "bg-purple-500",
    cyan: "bg-cyan-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500"
  };

  return (
    <button
      onClick={onChange}
      className={`w-14 h-7 rounded-full transition-all ${
        checked ? colorClasses[color] : "bg-slate-700"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );
}

interface SectionProps {
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}

function Section({ title, icon: Icon, color, children }: SectionProps) {
  return (
    <section className={`bg-slate-900/50 border rounded-2xl p-6 ${color}`}>
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-5 h-5 text-current" />
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

interface SettingItemProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

function SettingItem({ icon: Icon, title, description, children, className = "" }: SettingItemProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

const tabs = [
  { id: "all", label: "All Settings", icon: Settings },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "audio", label: "Audio", icon: Headphones },
  { id: "playback", label: "Playback", icon: Music },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield }
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("venom-settings");
      if (stored) {
        try {
          return { ...defaultSettings, ...JSON.parse(stored) };
        } catch {
          console.error("Failed to parse settings");
        }
      }
    }
    return defaultSettings;
  });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("venom-settings", JSON.stringify(newSettings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("venom-settings", JSON.stringify(defaultSettings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const showSection = (tab: string) => activeTab === "all" || activeTab === tab;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Header />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <Settings className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Settings
                </h1>
                <p className="text-gray-400">Customize your Venom experience</p>
              </div>
            </div>
          </div>

          {/* Save indicator */}
          {saved && (
            <div className="fixed top-24 right-4 bg-green-500/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2 z-50">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Settings saved!</span>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-purple-500 text-white"
                    : "bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {/* Appearance Section */}
            {showSection("appearance") && (
              <Section title="Appearance" icon={Palette} color="border-purple-500/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Theme</p>
                      <p className="text-sm text-gray-400">Choose your preferred color scheme</p>
                    </div>
                    <div className="flex gap-2">
                      {(["dark", "light", "system"] as const).map((theme) => (
                        <button
                          key={theme}
                          onClick={() => updateSetting("theme", theme)}
                          className={`px-4 py-2 rounded-lg capitalize transition-all ${
                            settings.theme === theme
                              ? "bg-purple-500 text-white"
                              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Font Size</p>
                      <p className="text-sm text-gray-400">Adjust text size for better readability</p>
                    </div>
                    <div className="flex gap-2">
                      {(["small", "medium", "large"] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => updateSetting("fontSize", size)}
                          className={`px-4 py-2 rounded-lg capitalize transition-all ${
                            settings.fontSize === size
                              ? "bg-purple-500 text-white"
                              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <SettingItem
                    icon={Monitor}
                    title="Reduced Motion"
                    description="Minimize animations and transitions"
                  >
                    <Toggle
                      checked={settings.reducedMotion}
                      onChange={() => updateSetting("reducedMotion", !settings.reducedMotion)}
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Eye}
                    title="Show Visualizations"
                    description="Display audio visualizations during playback"
                  >
                    <Toggle
                      checked={settings.showVisualizations}
                      onChange={() => updateSetting("showVisualizations", !settings.showVisualizations)}
                      color="purple"
                    />
                  </SettingItem>
                </div>
              </Section>
            )}

            {/* Audio Section */}
            {showSection("audio") && (
              <Section title="Audio Quality" icon={Headphones} color="border-cyan-500/20">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white font-medium">Streaming Quality</p>
                        <p className="text-sm text-gray-400">Higher quality uses more data</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {(["auto", "low", "medium", "high", "lossless"] as const).map((quality) => (
                        <button
                          key={quality}
                          onClick={() => updateSetting("audioQuality", quality)}
                          className={`px-3 py-2 rounded-lg text-sm capitalize transition-all ${
                            settings.audioQuality === quality
                              ? "bg-cyan-500 text-white"
                              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                          }`}
                        >
                          {quality}
                          <span className="block text-xs opacity-75 mt-1">
                            {quality === "auto" && "Adaptive"}
                            {quality === "low" && "~96 kbps"}
                            {quality === "medium" && "~160 kbps"}
                            {quality === "high" && "~320 kbps"}
                            {quality === "lossless" && "FLAC"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <SettingItem
                    icon={Sliders}
                    title="Equalizer Preset"
                    description="Choose a sound profile"
                    className="!items-start sm:!items-center flex-col sm:!flex-row gap-4"
                  >
                    <select
                      value={settings.equalizerPreset}
                      onChange={(e) => updateSetting("equalizerPreset", e.target.value as AppSettings["equalizerPreset"])}
                      className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 w-full sm:w-auto"
                    >
                      <option value="flat">Flat (Default)</option>
                      <option value="bass">Bass Boost</option>
                      <option value="treble">Treble Boost</option>
                      <option value="vocal">Vocal Clarity</option>
                      <option value="dance">Dance/Electronic</option>
                      <option value="acoustic">Acoustic</option>
                    </select>
                  </SettingItem>

                  <SettingItem
                    icon={Volume2}
                    title="Normalize Volume"
                    description="Keep consistent volume across tracks"
                  >
                    <Toggle
                      checked={settings.normalizeVolume}
                      onChange={() => updateSetting("normalizeVolume", !settings.normalizeVolume)}
                      color="cyan"
                    />
                  </SettingItem>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Music className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-white font-medium">Crossfade</p>
                          <p className="text-sm text-gray-400">Smooth transition between songs</p>
                        </div>
                      </div>
                      <span className="text-cyan-400 font-mono">{settings.crossfadeDuration}s</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      step="1"
                      value={settings.crossfadeDuration}
                      onChange={(e) => updateSetting("crossfadeDuration", parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Off</span>
                      <span>6s</span>
                      <span>12s</span>
                    </div>
                  </div>

                  <SettingItem
                    icon={Zap}
                    title="Gapless Playback"
                    description="Seamless playback for live albums and classical music"
                  >
                    <Toggle
                      checked={settings.gaplessPlayback}
                      onChange={() => updateSetting("gaplessPlayback", !settings.gaplessPlayback)}
                      color="cyan"
                    />
                  </SettingItem>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-white font-medium">System Volume</p>
                          <p className="text-sm text-gray-400">Adjust master output level</p>
                        </div>
                      </div>
                      <span className="text-cyan-400 font-mono">{settings.musicVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.musicVolume}
                      onChange={(e) => updateSetting("musicVolume", parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>
                </div>
              </Section>
            )}

            {/* Playback Section */}
            {showSection("playback") && (
              <Section title="Playback" icon={Music} color="border-orange-500/20">
                <div className="space-y-6">
                  <SettingItem
                    icon={Zap}
                    title="Auto-Play"
                    description="Automatically start playback when opening the app"
                  >
                    <Toggle
                      checked={settings.autoPlay}
                      onChange={() => updateSetting("autoPlay", !settings.autoPlay)}
                      color="yellow"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Music}
                    title="Auto-Play Next"
                    description="Automatically continue to the next track"
                  >
                    <Toggle
                      checked={settings.autoPlayNext}
                      onChange={() => updateSetting("autoPlayNext", !settings.autoPlayNext)}
                      color="yellow"
                    />
                  </SettingItem>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Default Shuffle</p>
                      <p className="text-sm text-gray-400">Start playlists in shuffle mode</p>
                    </div>
                    <Toggle
                      checked={settings.shuffleDefault}
                      onChange={() => updateSetting("shuffleDefault", !settings.shuffleDefault)}
                      color="yellow"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Repeat className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-white font-medium">Repeat Mode</p>
                          <p className="text-sm text-gray-400">Default repeat behavior</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {(["off", "track", "playlist"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => updateSetting("repeatMode", mode)}
                          className={`px-4 py-2 rounded-lg capitalize transition-all ${
                            settings.repeatMode === mode
                              ? "bg-yellow-500 text-white"
                              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                          }`}
                        >
                          {mode === "off" ? "Off" : mode === "track" ? "Repeat One" : "Repeat All"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <SettingItem
                    icon={Volume2}
                    title="Skip Silence"
                    description="Automatically skip silent parts in tracks"
                  >
                    <Toggle
                      checked={settings.skipSilence}
                      onChange={() => updateSetting("skipSilence", !settings.skipSilence)}
                      color="yellow"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Wifi}
                    title="Preload Upcoming Tracks"
                    description="Buffer next songs for seamless playback"
                  >
                    <Toggle
                      checked={settings.preloadEnabled}
                      onChange={() => updateSetting("preloadEnabled", !settings.preloadEnabled)}
                      color="yellow"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Eye}
                    title="Show Lyrics"
                    description="Display synchronized lyrics when available"
                  >
                    <Toggle
                      checked={settings.showLyrics}
                      onChange={() => updateSetting("showLyrics", !settings.showLyrics)}
                      color="yellow"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Music}
                    title="Lyrics Synchronization"
                    description="Highlight current lyrics line"
                  >
                    <Toggle
                      checked={settings.lyricsSync}
                      onChange={() => updateSetting("lyricsSync", !settings.lyricsSync)}
                      color="yellow"
                    />
                  </SettingItem>
                </div>
              </Section>
            )}

            {/* Downloads & Storage Section */}
            {showSection("storage") && (
              <Section title="Downloads & Storage" icon={HardDrive} color="border-green-500/20">
                <div className="space-y-6">
                  <SettingItem
                    icon={Download}
                    title="Offline Mode"
                    description="Only play downloaded content"
                  >
                    <Toggle
                      checked={settings.offlineMode}
                      onChange={() => updateSetting("offlineMode", !settings.offlineMode)}
                      color="green"
                    />
                  </SettingItem>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Download Quality</p>
                      <p className="text-sm text-gray-400">Quality for offline tracks</p>
                    </div>
                    <div className="flex gap-2">
                      {(["standard", "high", "lossless"] as const).map((quality) => (
                        <button
                          key={quality}
                          onClick={() => updateSetting("downloadQuality", quality)}
                          className={`px-3 py-2 rounded-lg capitalize text-sm transition-all ${
                            settings.downloadQuality === quality
                              ? "bg-green-500 text-white"
                              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                          }`}
                        >
                          {quality}
                        </button>
                      ))}
                    </div>
                  </div>

                  <SettingItem
                    icon={Wifi}
                    title="Auto-Download"
                    description="Automatically download liked songs and playlists"
                  >
                    <Toggle
                      checked={settings.autoDownload}
                      onChange={() => updateSetting("autoDownload", !settings.autoDownload)}
                      color="green"
                    />
                  </SettingItem>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <HardDrive className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-white font-medium">Storage Limit</p>
                          <p className="text-sm text-gray-400">Maximum space for downloads</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-mono">{formatStorage(settings.storageLimit)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="50"
                      step="0.5"
                      value={settings.storageLimit}
                      onChange={(e) => updateSetting("storageLimit", parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>500 MB</span>
                      <span>25 GB</span>
                      <span>50 GB</span>
                    </div>
                  </div>

                  <SettingItem
                    icon={Database}
                    title="Clear Cache on Exit"
                    description="Remove temporary files when closing the app"
                  >
                    <Toggle
                      checked={settings.clearCacheOnExit}
                      onChange={() => updateSetting("clearCacheOnExit", !settings.clearCacheOnExit)}
                      color="green"
                    />
                  </SettingItem>

                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Storage Used</span>
                      <span className="text-white font-mono text-sm">1.2 GB / {formatStorage(settings.storageLimit)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "24%" }} />
                    </div>
                    <button className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors">
                      Clear All Downloads
                    </button>
                  </div>
                </div>
              </Section>
            )}

            {/* Notifications Section */}
            {showSection("notifications") && (
              <Section title="Notifications" icon={Bell} color="border-yellow-500/20">
                <div className="space-y-6">
                  <SettingItem
                    icon={Bell}
                    title="Push Notifications"
                    description="Receive updates and alerts"
                  >
                    <Toggle
                      checked={settings.notifications}
                      onChange={() => updateSetting("notifications", !settings.notifications)}
                      color="yellow"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Music}
                    title="New Release Alerts"
                    description="Get notified when followed artists release new music"
                  >
                    <Toggle
                      checked={settings.newReleaseAlerts}
                      onChange={() => updateSetting("newReleaseAlerts", !settings.newReleaseAlerts)}
                      color="yellow"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Database}
                    title="Playlist Updates"
                    description="Notifications when playlists you follow are updated"
                  >
                    <Toggle
                      checked={settings.playlistUpdates}
                      onChange={() => updateSetting("playlistUpdates", !settings.playlistUpdates)}
                      color="yellow"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={User}
                    title="Artist Notifications"
                    description="Updates from artists you follow"
                  >
                    <Toggle
                      checked={settings.artistFollowNotifications}
                      onChange={() => updateSetting("artistFollowNotifications", !settings.artistFollowNotifications)}
                      color="yellow"
                    />
                  </SettingItem>

                  <div className="pt-4 border-t border-slate-800">
                    <SettingItem
                      icon={Moon}
                      title="Quiet Hours"
                      description="Pause notifications during specific hours"
                    >
                      <Toggle
                        checked={settings.quietHours}
                        onChange={() => updateSetting("quietHours", !settings.quietHours)}
                        color="yellow"
                      />
                    </SettingItem>

                    {settings.quietHours && (
                      <div className="mt-4 flex items-center gap-4">
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Start</label>
                          <input
                            type="time"
                            value={settings.quietHoursStart}
                            onChange={(e) => updateSetting("quietHoursStart", e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <span className="text-gray-500 mt-6">to</span>
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">End</label>
                          <input
                            type="time"
                            value={settings.quietHoursEnd}
                            onChange={(e) => updateSetting("quietHoursEnd", e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Section>
            )}

            {/* Privacy & Security Section */}
            {showSection("privacy") && (
              <Section title="Privacy & Security" icon={Shield} color="border-red-500/20">
                <div className="space-y-6">
                  <SettingItem
                    icon={Moon}
                    title="Privacy Mode"
                    description="Hide sensitive information in UI"
                  >
                    <Toggle
                      checked={settings.privacyMode}
                      onChange={() => updateSetting("privacyMode", !settings.privacyMode)}
                      color="red"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Eye}
                    title="Share Listening Activity"
                    description="Let friends see what you're playing"
                  >
                    <Toggle
                      checked={settings.shareListeningActivity}
                      onChange={() => updateSetting("shareListeningActivity", !settings.shareListeningActivity)}
                      color="red"
                    />
                  </SettingItem>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Profile Visibility</p>
                      <p className="text-sm text-gray-400">Who can see your profile</p>
                    </div>
                    <select
                      value={settings.showProfileTo}
                      onChange={(e) => updateSetting("showProfileTo", e.target.value as AppSettings["showProfileTo"])}
                      className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends Only</option>
                      <option value="noone">No One</option>
                    </select>
                  </div>

                  <SettingItem
                    icon={Shield}
                    title="Two-Factor Authentication"
                    description="Add extra security to your account"
                  >
                    <Toggle
                      checked={settings.twoFactorAuth}
                      onChange={() => updateSetting("twoFactorAuth", !settings.twoFactorAuth)}
                      color="red"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Smartphone}
                    title="Explicit Content"
                    description="Allow playback of explicit content"
                  >
                    <Toggle
                      checked={settings.explicitContent}
                      onChange={() => updateSetting("explicitContent", !settings.explicitContent)}
                      color="red"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Wifi}
                    title="Data Saver"
                    description="Reduce data usage (lower quality audio, no prefetch)"
                  >
                    <Toggle
                      checked={settings.dataSaver}
                      onChange={() => updateSetting("dataSaver", !settings.dataSaver)}
                      color="red"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Database}
                    title="Analytics"
                    description="Help improve Venom by sharing usage data"
                  >
                    <Toggle
                      checked={settings.analyticsEnabled}
                      onChange={() => updateSetting("analyticsEnabled", !settings.analyticsEnabled)}
                      color="red"
                    />
                  </SettingItem>
                </div>
              </Section>
            )}

            {/* Language & Region Section */}
            {showSection("all") && (
              <Section title="Language & Region" icon={Globe} color="border-blue-500/20">
                <div className="space-y-6">
                  <div>
                    <p className="text-white font-medium mb-2">Display Language</p>
                    <select
                      value={settings.language}
                      onChange={(e) => updateSetting("language", e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="it">Italiano</option>
                      <option value="pt">Português</option>
                      <option value="ru">Русский</option>
                      <option value="zh">中文</option>
                      <option value="ja">日本語</option>
                      <option value="ko">한국어</option>
                      <option value="ar">العربية</option>
                      <option value="hi">हिन्दी</option>
                    </select>
                  </div>
                </div>
              </Section>
            )}

            {/* Advanced Section */}
            {showSection("all") && (
              <Section title="Advanced" icon={Zap} color="border-indigo-500/20">
                <div className="space-y-6">
                  <SettingItem
                    icon={Key}
                    title="Keyboard Shortcuts"
                    description="Enable keyboard navigation and shortcuts"
                  >
                    <Toggle
                      checked={settings.keyboardShortcuts}
                      onChange={() => updateSetting("keyboardShortcuts", !settings.keyboardShortcuts)}
                      color="blue"
                    />
                  </SettingItem>

                  <SettingItem
                    icon={Zap}
                    title="Beta Features"
                    description="Try experimental features before release"
                  >
                    <Toggle
                      checked={settings.betaFeatures}
                      onChange={() => updateSetting("betaFeatures", !settings.betaFeatures)}
                      color="blue"
                    />
                  </SettingItem>

                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                    <h4 className="text-white font-medium">Keyboard Shortcuts Reference</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>Play/Pause</span>
                        <kbd className="bg-slate-700 px-2 py-0.5 rounded text-white">Space</kbd>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Next Track</span>
                        <kbd className="bg-slate-700 px-2 py-0.5 rounded text-white">→</kbd>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Previous Track</span>
                        <kbd className="bg-slate-700 px-2 py-0.5 rounded text-white">←</kbd>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Volume Up</span>
                        <kbd className="bg-slate-700 px-2 py-0.5 rounded text-white">↑</kbd>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Volume Down</span>
                        <kbd className="bg-slate-700 px-2 py-0.5 rounded text-white">↓</kbd>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Search</span>
                        <kbd className="bg-slate-700 px-2 py-0.5 rounded text-white">Ctrl+K</kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            )}

            {/* Account Section */}
            {showSection("all") && (
              <Section title="Account" icon={User} color="border-blue-500/20">
                <div className="space-y-4">
                  <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-3 rounded-lg transition-all text-left">
                    <p className="font-medium">Manage Account</p>
                    <p className="text-sm text-blue-300/70">Update your profile and preferences</p>
                  </button>

                  <button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-3 rounded-lg transition-all text-left">
                    <p className="font-medium">Export Data</p>
                    <p className="text-sm text-purple-300/70">Download your data and playlists</p>
                  </button>

                  <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-3 rounded-lg transition-all text-left">
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-red-300/70">Permanently remove your account and data</p>
                  </button>
                </div>
              </Section>
            )}

            {/* Reset Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={resetSettings}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-gray-300 px-6 py-3 rounded-lg transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Reset All Settings to Default</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
