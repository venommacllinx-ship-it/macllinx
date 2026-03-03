"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MusicSettings,
  getMusicSettings,
  saveMusicSettings,
  subscribeToSettings,
  notifySettingsChange,
  AudioQuality,
  EqualizerPreset,
  RepeatMode
} from "@/lib/musicSettings";

export function useMusicSettings() {
  const [settings, setSettingsState] = useState<MusicSettings>(() => getMusicSettings());

  useEffect(() => {
    const unsubscribe = subscribeToSettings((newSettings) => {
      setSettingsState(newSettings);
    });
    return unsubscribe;
  }, []);

  const updateSettings = useCallback((updates: Partial<MusicSettings>) => {
    saveMusicSettings(updates);
    setSettingsState((prev) => ({ ...prev, ...updates }));
    notifySettingsChange();
  }, []);

  const setAudioQuality = useCallback((quality: AudioQuality) => {
    updateSettings({ audioQuality: quality });
  }, [updateSettings]);

  const setEqualizerPreset = useCallback((preset: EqualizerPreset) => {
    updateSettings({ equalizerPreset: preset });
  }, [updateSettings]);

  const setRepeatMode = useCallback((mode: RepeatMode) => {
    updateSettings({ repeatMode: mode });
  }, [updateSettings]);

  const toggleShuffle = useCallback(() => {
    updateSettings({ shuffleDefault: !settings.shuffleDefault });
  }, [updateSettings, settings.shuffleDefault]);

  const toggleNormalizeVolume = useCallback(() => {
    updateSettings({ normalizeVolume: !settings.normalizeVolume });
  }, [updateSettings, settings.normalizeVolume]);

  const setVolume = useCallback((volume: number) => {
    updateSettings({ musicVolume: Math.max(0, Math.min(100, volume)) });
  }, [updateSettings]);

  const toggleGaplessPlayback = useCallback(() => {
    updateSettings({ gaplessPlayback: !settings.gaplessPlayback });
  }, [updateSettings, settings.gaplessPlayback]);

  const setCrossfadeDuration = useCallback((duration: number) => {
    updateSettings({ crossfadeDuration: Math.max(0, Math.min(12, duration)) });
  }, [updateSettings]);

  const toggleOfflineMode = useCallback(() => {
    updateSettings({ offlineMode: !settings.offlineMode });
  }, [updateSettings, settings.offlineMode]);

  const toggleAutoPlay = useCallback(() => {
    updateSettings({ autoPlay: !settings.autoPlay });
  }, [updateSettings, settings.autoPlay]);

  const toggleAutoPlayNext = useCallback(() => {
    updateSettings({ autoPlayNext: !settings.autoPlayNext });
  }, [updateSettings, settings.autoPlayNext]);

  return {
    settings,
    updateSettings,
    setAudioQuality,
    setEqualizerPreset,
    setRepeatMode,
    toggleShuffle,
    toggleNormalizeVolume,
    setVolume,
    toggleGaplessPlayback,
    setCrossfadeDuration,
    toggleOfflineMode,
    toggleAutoPlay,
    toggleAutoPlayNext
  };
}

export function useVolume() {
  const { settings, setVolume } = useMusicSettings();

  return {
    volume: settings.musicVolume,
    setVolume,
    isMuted: settings.musicVolume === 0
  };
}

export function usePlaybackSettings() {
  const {
    settings,
    setRepeatMode,
    toggleShuffle,
    toggleAutoPlay,
    toggleAutoPlayNext
  } = useMusicSettings();

  return {
    repeatMode: settings.repeatMode,
    shuffle: settings.shuffleDefault,
    autoPlay: settings.autoPlay,
    autoPlayNext: settings.autoPlayNext,
    setRepeatMode,
    toggleShuffle,
    toggleAutoPlay,
    toggleAutoPlayNext
  };
}

export function useAudioQuality() {
  const { settings, setAudioQuality } = useMusicSettings();

  return {
    quality: settings.audioQuality,
    setAudioQuality
  };
}
