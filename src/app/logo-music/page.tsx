"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Play, 
  Pause, 
  Download, 
  Sparkles,
  Music,
  Volume2,
  Wand2,
  Save,
  Trash2,
  Copy,
  Check,
  Zap,
  Bell,
  Rocket,
  Building2,
  Gamepad2,
  Smartphone
} from "lucide-react";

interface GeneratedLogo {
  id: string;
  name: string;
  type: LogoType;
  style: string;
  duration: number;
  createdAt: Date;
  audioUrl?: string;
}

type LogoType = "startup" | "notification" | "brand" | "game" | "app";

const LOGO_TYPES: { id: LogoType; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "startup", label: "Startup Sound", icon: <Rocket className="w-5 h-5" />, desc: "Powerful intro sounds for apps and products" },
  { id: "notification", label: "Notification", icon: <Bell className="w-5 h-5" />, desc: "Short alerts and message sounds" },
  { id: "brand", label: "Brand Jingle", icon: <Building2 className="w-5 h-5" />, desc: "Memorable audio logos for companies" },
  { id: "game", label: "Game Audio", icon: <Gamepad2 className="w-5 h-5" />, desc: "Fun sounds for games and interactive media" },
  { id: "app", label: "App Sound", icon: <Smartphone className="w-5 h-5" />, desc: "UI sounds and transitions" },
];

const STYLES = [
  { id: "corporate", label: "Corporate", desc: "Professional & trustworthy" },
  { id: "tech", label: "Tech", desc: "Modern & futuristic" },
  { id: "playful", label: "Playful", desc: "Fun & energetic" },
  { id: "elegant", label: "Elegant", desc: "Sophisticated & smooth" },
  { id: "minimal", label: "Minimal", desc: "Clean & simple" },
  { id: "bold", label: "Bold", desc: "Strong & impactful" },
];

const DURATIONS = [
  { value: 1, label: "1s" },
  { value: 2, label: "2s" },
  { value: 3, label: "3s" },
  { value: 5, label: "5s" },
  { value: 10, label: "10s" },
];

// Simulated audio generation using Web Audio API
const generateAudioTone = (type: LogoType, style: string, duration: number): string => {
  const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate different waveforms based on type and style
  const baseFreq = type === "notification" ? 880 : type === "startup" ? 440 : 220;
  const harmonicCount = style === "tech" ? 5 : style === "minimal" ? 1 : 3;
  
  for (let i = 0; i < data.length; i++) {
    const t = i / sampleRate;
    let sample = 0;
    
    // Add harmonics based on style
    for (let h = 1; h <= harmonicCount; h++) {
      const freq = baseFreq * h;
      const envelope = Math.exp(-t * (2 + h * 0.5));
      sample += Math.sin(2 * Math.PI * freq * t) * envelope * (1 / h);
    }
    
    // Add style-specific characteristics
    if (style === "playful") {
      sample += Math.sin(2 * Math.PI * baseFreq * 2 * t) * Math.sin(2 * Math.PI * 10 * t) * 0.3;
    } else if (style === "bold") {
      sample = Math.tanh(sample * 2); // Distortion
    }
    
    data[i] = sample * 0.5;
  }
  
  // Convert to WAV and create URL
  const wavBuffer = bufferToWave(buffer, duration * sampleRate);
  const blob = new Blob([wavBuffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
};

// Convert AudioBuffer to WAV format
const bufferToWave = (abuffer: AudioBuffer, len: number): ArrayBuffer => {
  const numOfChan = abuffer.numberOfChannels;
  const length = len * numOfChan * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);
  const channels: Float32Array[] = [];
  let offset = 0;
  let pos = 0;

  // Write WAV header
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"
  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // length = 16
  setUint16(1); // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(abuffer.sampleRate);
  setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2); // block-align
  setUint16(16); // 16-bit (hardcoded in this demo)
  setUint32(0x61746164); // "data" - chunk
  setUint32(length - pos - 4); // chunk length

  // Write interleaved data
  for (let i = 0; i < abuffer.numberOfChannels; i++)
    channels.push(abuffer.getChannelData(i));

  while (pos < length) {
    for (let i = 0; i < numOfChan; i++) {
      let sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      view.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  return buffer;

  function setUint16(data: number) {
    view.setUint16(pos, data, true);
    pos += 2;
  }
  function setUint32(data: number) {
    view.setUint32(pos, data, true);
    pos += 4;
  }
};

export default function LogoMusicPage() {
  const [selectedType, setSelectedType] = useState<LogoType>("startup");
  const [selectedStyle, setSelectedStyle] = useState("tech");
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<GeneratedLogo[]>(() => {
    // Load from localStorage during initial render
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("venom-logo-music");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((l: GeneratedLogo) => ({ ...l, createdAt: new Date(l.createdAt) }));
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Save to localStorage
  useEffect(() => {
    if (generatedLogos.length > 0) {
      localStorage.setItem("venom-logo-music", JSON.stringify(generatedLogos));
    }
  }, [generatedLogos]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const audioUrl = generateAudioTone(selectedType, selectedStyle, selectedDuration);
    
    const newLogo: GeneratedLogo = {
      id: Date.now().toString(),
      name: `${STYLES.find(s => s.id === selectedStyle)?.label} ${LOGO_TYPES.find(t => t.id === selectedType)?.label}`,
      type: selectedType,
      style: selectedStyle,
      duration: selectedDuration,
      createdAt: new Date(),
      audioUrl,
    };
    
    setGeneratedLogos(prev => [newLogo, ...prev]);
    setIsGenerating(false);
  }, [selectedType, selectedStyle, selectedDuration]);

  const handlePlay = useCallback((logo: GeneratedLogo) => {
    if (playingId === logo.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (logo.audioUrl) {
        audioRef.current = new Audio(logo.audioUrl);
        audioRef.current.play();
        audioRef.current.onended = () => setPlayingId(null);
        setPlayingId(logo.id);
      }
    }
  }, [playingId]);

  const handleDownload = useCallback((logo: GeneratedLogo) => {
    if (logo.audioUrl) {
      const a = document.createElement("a");
      a.href = logo.audioUrl;
      a.download = `venom-logo-${logo.type}-${logo.id}.wav`;
      a.click();
    }
  }, []);

  const handleCopy = useCallback((logo: GeneratedLogo) => {
    navigator.clipboard.writeText(`${logo.name} - ${logo.duration}s`);
    setCopiedId(logo.id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setGeneratedLogos(prev => prev.filter(l => l.id !== id));
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    }
  }, [playingId]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 mb-4">
            <Sparkles className="w-4 h-4 text-[#00ff88]" />
            <span className="text-xs text-[#00ff88] font-medium tracking-widest uppercase">AI Audio Branding</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Logo Music <span className="text-[#00ff88]">Generator</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create unique audio logos, startup sounds, and brand jingles in seconds. 
            Perfect for apps, products, and companies.
          </p>
        </div>

        {/* Generator Panel */}
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-2xl p-6 sm:p-8 mb-8">
          {/* Logo Type Selection */}
          <div className="mb-8">
            <label className="block text-sm text-gray-400 mb-4">Select Logo Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {LOGO_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    selectedType === type.id
                      ? "bg-[#00ff88]/10 border-[#00ff88] text-white"
                      : "bg-[#0a0a0a] border-[#1a1a1a] text-gray-400 hover:border-[#00ff88]/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`${selectedType === type.id ? "text-[#00ff88]" : ""}`}>
                      {type.icon}
                    </div>
                    <span className="font-semibold text-sm">{type.label}</span>
                  </div>
                  <p className="text-xs opacity-60">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          <div className="mb-8">
            <label className="block text-sm text-gray-400 mb-4">Choose Style</label>
            <div className="flex flex-wrap gap-3">
              {STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    selectedStyle === style.id
                      ? "bg-[#00ff88]/10 border-[#00ff88] text-[#00ff88]"
                      : "bg-[#0a0a0a] border-[#1a1a1a] text-gray-400 hover:border-[#00ff88]/30"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {STYLES.find(s => s.id === selectedStyle)?.desc}
            </p>
          </div>

          {/* Duration Selection */}
          <div className="mb-8">
            <label className="block text-sm text-gray-400 mb-4">Duration</label>
            <div className="flex gap-3">
              {DURATIONS.map((dur) => (
                <button
                  key={dur.value}
                  onClick={() => setSelectedDuration(dur.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    selectedDuration === dur.value
                      ? "bg-[#00ff88]/10 border-[#00ff88] text-[#00ff88]"
                      : "bg-[#0a0a0a] border-[#1a1a1a] text-gray-400 hover:border-[#00ff88]/30"
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black font-bold rounded-xl hover:from-[#00ff99] hover:to-[#00dd77] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Generating Audio Logo...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Logo Sound
              </>
            )}
          </button>
        </div>

        {/* Generated Logos Library */}
        {generatedLogos.length > 0 && (
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Music className="w-5 h-5 text-[#00ff88]" />
                Your Generated Logos
              </h2>
              <span className="text-sm text-gray-500">{generatedLogos.length} saved</span>
            </div>

            <div className="space-y-3">
              {generatedLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4 flex items-center justify-between group hover:border-[#00ff88]/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handlePlay(logo)}
                      className="w-10 h-10 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] hover:bg-[#00ff88]/20 transition-colors"
                    >
                      {playingId === logo.id ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 ml-0.5" />
                      )}
                    </button>
                    <div>
                      <h3 className="font-semibold text-white">{logo.name}</h3>
                      <p className="text-xs text-gray-500">
                        {logo.duration}s • {logo.style} • {logo.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(logo)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="Copy details"
                    >
                      {copiedId === logo.id ? <Check className="w-4 h-4 text-[#00ff88]" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDownload(logo)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="Download WAV"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(logo.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6">
            <Zap className="w-8 h-8 text-[#00ff88] mb-4" />
            <h3 className="font-semibold text-white mb-2">Instant Generation</h3>
            <p className="text-sm text-gray-400">
              AI creates unique audio logos in seconds. No musical experience required.
            </p>
          </div>
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6">
            <Volume2 className="w-8 h-8 text-[#00ff88] mb-4" />
            <h3 className="font-semibold text-white mb-2">High Quality Export</h3>
            <p className="text-sm text-gray-400">
              Download your logos in WAV format for professional use in any project.
            </p>
          </div>
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6">
            <Save className="w-8 h-8 text-[#00ff88] mb-4" />
            <h3 className="font-semibold text-white mb-2">Save & Organize</h3>
            <p className="text-sm text-gray-400">
              All your generated logos are saved locally for easy access anytime.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
