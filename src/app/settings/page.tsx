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
  Check
} from "lucide-react";

interface AppSettings {
  theme: "dark" | "light" | "system";
  notifications: boolean;
  soundEffects: boolean;
  backgroundMusic: boolean;
  musicVolume: number;
  language: string;
  autoPlay: boolean;
  reducedMotion: boolean;
  privacyMode: boolean;
  fontSize: "small" | "medium" | "large";
}

const defaultSettings: AppSettings = {
  theme: "dark",
  notifications: true,
  soundEffects: true,
  backgroundMusic: true,
  musicVolume: 30,
  language: "en",
  autoPlay: false,
  reducedMotion: false,
  privacyMode: false,
  fontSize: "medium"
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Initialize from localStorage during render (safe for hydration)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Header />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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
            <div className="fixed top-24 right-4 bg-green-500/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Settings saved!</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Appearance Section */}
            <section className="bg-slate-900/50 border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Appearance</h2>
              </div>

              <div className="space-y-4">
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Reduced Motion</p>
                      <p className="text-sm text-gray-400">Minimize animations and transitions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting("reducedMotion", !settings.reducedMotion)}
                    className={`w-14 h-7 rounded-full transition-all ${
                      settings.reducedMotion ? "bg-purple-500" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.reducedMotion ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Audio Section */}
            <section className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Volume2 className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">Audio</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Background Music</p>
                      <p className="text-sm text-gray-400">Enable funk music in the background</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting("backgroundMusic", !settings.backgroundMusic)}
                    className={`w-14 h-7 rounded-full transition-all ${
                      settings.backgroundMusic ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.backgroundMusic ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Sound Effects</p>
                      <p className="text-sm text-gray-400">Play sounds for interactions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting("soundEffects", !settings.soundEffects)}
                    className={`w-14 h-7 rounded-full transition-all ${
                      settings.soundEffects ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.soundEffects ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">Music Volume</p>
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
            </section>

            {/* Notifications Section */}
            <section className="bg-slate-900/50 border border-yellow-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-400">Receive updates and alerts</p>
                  </div>
                  <button
                    onClick={() => updateSetting("notifications", !settings.notifications)}
                    className={`w-14 h-7 rounded-full transition-all ${
                      settings.notifications ? "bg-yellow-500" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.notifications ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Auto-Play Media</p>
                    <p className="text-sm text-gray-400">Automatically play music and videos</p>
                  </div>
                  <button
                    onClick={() => updateSetting("autoPlay", !settings.autoPlay)}
                    className={`w-14 h-7 rounded-full transition-all ${
                      settings.autoPlay ? "bg-yellow-500" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.autoPlay ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Privacy Section */}
            <section className="bg-slate-900/50 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-red-400" />
                <h2 className="text-xl font-semibold text-white">Privacy & Security</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Privacy Mode</p>
                      <p className="text-sm text-gray-400">Hide sensitive information in UI</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting("privacyMode", !settings.privacyMode)}
                    className={`w-14 h-7 rounded-full transition-all ${
                      settings.privacyMode ? "bg-red-500" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.privacyMode ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Language Section */}
            <section className="bg-slate-900/50 border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Language</h2>
              </div>

              <div>
                <p className="text-white font-medium mb-2">Select Language</p>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting("language", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
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
            </section>

            {/* Account Section */}
            <section className="bg-slate-900/50 border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Account</h2>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-3 rounded-lg transition-all text-left">
                  <p className="font-medium">Manage Account</p>
                  <p className="text-sm text-blue-300/70">Update your profile and preferences</p>
                </button>

                <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-3 rounded-lg transition-all text-left">
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-red-300/70">Permanently remove your account and data</p>
                </button>
              </div>
            </section>

            {/* Reset Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={resetSettings}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-gray-300 px-6 py-3 rounded-lg transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
