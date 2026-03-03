"use client";

import { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import { Volume2, VolumeX, Music, Settings2, Sliders } from "lucide-react";
import { getMusicSettings, subscribeToSettings, MusicSettings, getEqualizerBands } from "@/lib/musicSettings";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  settings: MusicSettings;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}

// Funk music URLs (using royalty-free funk tracks)
const OPENING_DUB_URL = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_4c5c6c7c8c.mp3?filename=funk-intro-sting-108bpm-121529.mp3";
const BACKGROUND_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=funky-groove-112bpm-121856.mp3";

// Web Audio API for advanced audio processing
class AudioProcessor {
  private audioContext: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private equalizerBands: BiquadFilterNode[] = [];
  private audioElement: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
  }

  connect(audio: HTMLAudioElement) {
    if (!this.audioContext || this.audioElement === audio) return;

    try {
      // Disconnect previous if exists
      this.disconnect();

      this.audioElement = audio;
      this.sourceNode = this.audioContext.createMediaElementSource(audio);
      
      // Create gain node for volume control
      this.gainNode = this.audioContext.createGain();
      
      // Create analyser for visualizations
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;

      // Create equalizer bands
      this.createEqualizer();

      // Connect chain: source -> equalizer -> gain -> analyser -> destination
      let lastNode: AudioNode = this.sourceNode;
      
      this.equalizerBands.forEach((band) => {
        lastNode.connect(band);
        lastNode = band;
      });

      lastNode.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    } catch (error) {
      console.error("Error connecting audio processor:", error);
    }
  }

  disconnect() {
    if (this.sourceNode) {
      try {
        this.sourceNode.disconnect();
      } catch {
        // Ignore disconnect errors
      }
    }
    this.equalizerBands.forEach((band) => {
      try {
        band.disconnect();
      } catch {
        // Ignore
      }
    });
    this.equalizerBands = [];
  }

  private createEqualizer() {
    if (!this.audioContext) return;

    // 10-band equalizer frequencies
    const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
    
    this.equalizerBands = frequencies.map((freq) => {
      const filter = this.audioContext!.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.value = freq;
      filter.Q.value = 1;
      filter.gain.value = 0;
      return filter;
    });
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = volume;
    }
  }

  setEqualizer(preset: "flat" | "bass" | "treble" | "vocal" | "dance" | "acoustic") {
    const gains = getEqualizerBands(preset);
    this.equalizerBands.forEach((band, index) => {
      if (gains[index] !== undefined) {
        // Smooth transition
        band.gain.setTargetAtTime(gains[index], this.audioContext!.currentTime, 0.1);
      }
    });
  }

  getVisualizationData(): Uint8Array | null {
    if (!this.analyser) return null;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  resume() {
    if (this.audioContext?.state === "suspended") {
      this.audioContext.resume();
    }
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [settings, setSettings] = useState<MusicSettings>(() => getMusicSettings());
  const [showSettings, setShowSettings] = useState(false);
  
  const openingAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const processorRef = useRef<AudioProcessor | null>(null);

  // Initialize audio processor
  useEffect(() => {
    processorRef.current = new AudioProcessor();
    
    return () => {
      processorRef.current?.disconnect();
    };
  }, []);

  // Subscribe to settings changes
  useEffect(() => {
    const unsubscribe = subscribeToSettings((newSettings) => {
      setSettings(newSettings);
      
      // Apply settings to audio
      if (bgMusicRef.current) {
        // Update volume
        const effectiveVolume = newSettings.backgroundMusic ? newSettings.musicVolume / 100 : 0;
        bgMusicRef.current.volume = effectiveVolume * 0.5;
        
        // Apply equalizer
        processorRef.current?.setEqualizer(newSettings.equalizerPreset);
        
        // Apply mute state
        setIsMuted(!newSettings.backgroundMusic);
      }
    });
    
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Create audio elements
    openingAudioRef.current = new Audio(OPENING_DUB_URL);
    bgMusicRef.current = new Audio(BACKGROUND_MUSIC_URL);
    
    if (openingAudioRef.current) {
      openingAudioRef.current.volume = volume;
    }
    if (bgMusicRef.current) {
      const effectiveVolume = settings.backgroundMusic ? settings.musicVolume / 100 : 0;
      bgMusicRef.current.volume = effectiveVolume * 0.5;
      bgMusicRef.current.loop = true;
      
      // Connect to audio processor for effects
      processorRef.current?.connect(bgMusicRef.current);
    }

    // Show controls after a short delay
    const timer = setTimeout(() => setShowControls(true), 2000);

    return () => {
      openingAudioRef.current?.pause();
      bgMusicRef.current?.pause();
      clearTimeout(timer);
    };
  }, [settings.backgroundMusic, settings.musicVolume, volume]);

  useEffect(() => {
    const effectiveVolume = isMuted ? 0 : settings.musicVolume / 100;
    if (openingAudioRef.current) {
      openingAudioRef.current.volume = effectiveVolume;
    }
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = effectiveVolume * 0.5;
    }
  }, [settings.musicVolume, isMuted]);

  // Handle first user interaction to start audio
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && settings.backgroundMusic) {
        setHasInteracted(true);
        processorRef.current?.resume();
        
        // Play opening dub
        if (openingAudioRef.current && settings.soundEffects) {
          openingAudioRef.current.play().catch(() => {
            // Autoplay blocked, will try on next interaction
          });
        }
        
        // Start background music after opening dub
        setTimeout(() => {
          if (bgMusicRef.current && settings.backgroundMusic) {
            bgMusicRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              // Autoplay blocked
            });
          }
        }, settings.soundEffects ? 2000 : 0);
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("keydown", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [hasInteracted, settings.backgroundMusic, settings.soundEffects]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (bgMusicRef.current) {
        if (newMuted) {
          bgMusicRef.current.pause();
          setIsPlaying(false);
        } else {
          bgMusicRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
        }
      }
      return newMuted;
    });
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = newVolume * 0.5;
    }
  }, []);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, volume, setVolume: handleVolumeChange, isPlaying, settings }}>
      {children}
      
      {/* Audio Controls */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-xl border border-[#6B46C1]/30 rounded-full px-3 py-2 shadow-2xl shadow-[#6B46C1]/20">
          <div className="flex items-center gap-2">
            <Music className={`w-4 h-4 text-[#6B46C1] ${isPlaying ? "animate-pulse" : ""}`} />
            <span className="text-xs text-white/70 hidden sm:block">Funk Radio</span>
          </div>
          
          <div className="h-4 w-px bg-white/10 mx-1" />
          
          {/* Quick Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="Quick Settings"
          >
            <Sliders className="w-4 h-4 text-white/70" />
          </button>
          
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/50" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#6B46C1]" />
            )}
          </button>
          
          {!isMuted && isPlaying && (
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-[#6B46C1] rounded-full animate-pulse audio-bar-${i}`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "0.5s"
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Quick Settings Panel */}
        {showSettings && (
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-black/90 backdrop-blur-xl border border-[#6B46C1]/30 rounded-xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white text-sm font-medium">Quick Audio Settings</span>
              <button
                onClick={() => setShowSettings(false)}
                className="text-white/50 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Volume</span>
                  <span>{Math.round(settings.musicVolume)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.musicVolume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value) / 100)}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#6B46C1]"
                />
              </div>
              
              <div>
                <div className="text-xs text-gray-400 mb-2">Equalizer</div>
                <div className="flex gap-1">
                  {(["flat", "bass", "treble", "vocal", "dance"] as const).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => processorRef.current?.setEqualizer(preset)}
                      className={`flex-1 py-1 text-xs capitalize rounded ${
                        settings.equalizerPreset === preset
                          ? "bg-[#6B46C1] text-white"
                          : "bg-slate-800 text-gray-400 hover:bg-slate-700"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <a
              href="/settings"
              className="mt-3 flex items-center justify-center gap-1 text-xs text-[#6B46C1] hover:text-[#8B5CF6] transition-colors"
            >
              <Settings2 className="w-3 h-3" />
              Open Full Settings
            </a>
          </div>
        )}
      </div>

      {/* Now Playing Indicator */}
      {!isMuted && hasInteracted && isPlaying && settings.showVisualizations && (
        <div className="fixed top-24 right-6 z-40 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-xl border border-[#6B46C1]/30 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-gradient-to-t from-[#6B46C1] to-[#F59E0B] rounded-full equalizer-bar-${i}`}
                  />
                ))}
              </div>
              <span className="text-xs text-white/80">Now Playing: Funk Groove</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes equalizer {
          0% { height: 4px; }
          100% { height: 20px; }
        }
        @keyframes audioBar0 {
          0%, 100% { height: 8px; }
          50% { height: 16px; }
        }
        @keyframes audioBar1 {
          0%, 100% { height: 12px; }
          50% { height: 6px; }
        }
        @keyframes audioBar2 {
          0%, 100% { height: 6px; }
          50% { height: 14px; }
        }
        @keyframes audioBar3 {
          0%, 100% { height: 10px; }
          50% { height: 18px; }
        }
        .audio-bar-0 { animation: audioBar0 0.6s ease-in-out infinite; }
        .audio-bar-1 { animation: audioBar1 0.5s ease-in-out infinite; }
        .audio-bar-2 { animation: audioBar2 0.7s ease-in-out infinite; }
        .audio-bar-3 { animation: audioBar3 0.4s ease-in-out infinite; }
        .equalizer-bar-0 { animation: equalizer 0.5s ease-in-out 0s infinite alternate; height: 8px; }
        .equalizer-bar-1 { animation: equalizer 0.6s ease-in-out 0.1s infinite alternate; height: 12px; }
        .equalizer-bar-2 { animation: equalizer 0.4s ease-in-out 0.2s infinite alternate; height: 16px; }
        .equalizer-bar-3 { animation: equalizer 0.7s ease-in-out 0.3s infinite alternate; height: 10px; }
        .equalizer-bar-4 { animation: equalizer 0.5s ease-in-out 0.4s infinite alternate; height: 14px; }
      `}</style>
    </AudioContext.Provider>
  );
}
