"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (volume: number) => void;
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

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const openingAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio elements
    openingAudioRef.current = new Audio(OPENING_DUB_URL);
    bgMusicRef.current = new Audio(BACKGROUND_MUSIC_URL);
    
    if (openingAudioRef.current) {
      openingAudioRef.current.volume = volume;
    }
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = volume * 0.5; // Background music quieter
      bgMusicRef.current.loop = true;
    }

    // Show controls after a short delay
    const timer = setTimeout(() => setShowControls(true), 2000);

    return () => {
      openingAudioRef.current?.pause();
      bgMusicRef.current?.pause();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (openingAudioRef.current) {
      openingAudioRef.current.volume = isMuted ? 0 : volume;
    }
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = isMuted ? 0 : volume * 0.5;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume, isMuted]);

  // Handle first user interaction to start audio
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Play opening dub
        if (openingAudioRef.current) {
          openingAudioRef.current.play().catch(() => {
            // Autoplay blocked, will try on next interaction
          });
        }
        // Start background music after opening dub
        setTimeout(() => {
          if (bgMusicRef.current) {
            bgMusicRef.current.play().catch(() => {
              // Autoplay blocked
            });
          }
        }, 2000);
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
  }, [hasInteracted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (bgMusicRef.current) {
      if (isMuted) {
        bgMusicRef.current.play().catch(() => {});
      } else {
        bgMusicRef.current.pause();
      }
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, volume, setVolume }}>
      {children}
      {/* Audio Controls */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-xl border border-[#6B46C1]/30 rounded-full px-3 py-2 shadow-2xl shadow-[#6B46C1]/20">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-[#6B46C1] animate-pulse" />
            <span className="text-xs text-white/70 hidden sm:block">Funk Radio</span>
          </div>
          
          <div className="h-4 w-px bg-white/10 mx-1" />
          
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
          
          {!isMuted && (
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
      </div>

      {/* Now Playing Indicator - shows briefly when music starts */}
      {!isMuted && hasInteracted && (
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
