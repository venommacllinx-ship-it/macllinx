const genres = ["Hip-Hop", "Electronic", "Jazz", "Rock", "Classical", "R&B", "Pop", "Ambient"];
const moods = ["Energetic", "Chill", "Dark", "Uplifting", "Melancholic", "Aggressive", "Romantic", "Mysterious"];

const features = [
  {
    icon: "🎵",
    title: "Text-to-Music",
    desc: "Describe your vision in words and watch Venom transform it into a full track in seconds.",
  },
  {
    icon: "🎛️",
    title: "Style Mixing",
    desc: "Blend multiple genres and styles to create something entirely unique to you.",
  },
  {
    icon: "🎧",
    title: "DJ Studio",
    desc: "Mix your tracks live with dual decks, EQ controls, crossfader, and real-time effects.",
  },
  {
    icon: "🔊",
    title: "Logo Music Generator",
    desc: "Create unique audio logos, startup sounds, and brand jingles for your products and apps.",
    link: "/logo-music",
  },
  {
    icon: "🎤",
    title: "Vocal Generation",
    desc: "Add AI-generated vocals, harmonies, and lyrics to your instrumental tracks.",
  },
  {
    icon: "🎸",
    title: "Instrument Control",
    desc: "Fine-tune individual instruments — adjust the bass, drums, melody, and more.",
  },
  {
    icon: "⚡",
    title: "Instant Export",
    desc: "Export your tracks in WAV, MP3, or FLAC with full commercial rights.",
  },
];

export default function GenerateSection() {
  return (
    <section id="generate" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 mb-4">
            <span className="text-xs text-[#00ff88] font-medium tracking-widest uppercase">AI Music Generation</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Generate Music with{" "}
            <span className="gradient-text">AI Power</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            No instruments. No studio. No experience needed. Just describe what you want and Venom creates it.
          </p>
        </div>

        {/* Generator UI mockup */}
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-2xl p-6 sm:p-8 mb-16 max-w-3xl mx-auto card-hover">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-gray-600 font-mono">venom-studio.app</span>
          </div>

          <label className="block text-sm text-gray-400 mb-2">Describe your track</label>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4 mb-4 text-gray-300 text-sm">
            A dark, cinematic hip-hop beat with heavy 808s, haunting piano melodies, and atmospheric pads...
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Genre</label>
              <div className="flex flex-wrap gap-2">
                {genres.slice(0, 4).map((g) => (
                  <span
                    key={g}
                    className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                      g === "Hip-Hop"
                        ? "bg-[#00ff88]/10 border-[#00ff88]/50 text-[#00ff88]"
                        : "border-[#1a1a1a] text-gray-500 hover:border-[#00ff88]/30"
                    }`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Mood</label>
              <div className="flex flex-wrap gap-2">
                {moods.slice(0, 4).map((m) => (
                  <span
                    key={m}
                    className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                      m === "Dark"
                        ? "bg-[#00ff88]/10 border-[#00ff88]/50 text-[#00ff88]"
                        : "border-[#1a1a1a] text-gray-500 hover:border-[#00ff88]/30"
                    }`}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-2">Duration</label>
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-gray-300">
                2:30
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-2">BPM</label>
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-gray-300">
                140
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-2">Key</label>
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-gray-300">
                C Minor
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:bg-[#00cc6e] transition-colors glow-green">
            ⚡ Generate Track
          </button>

          {/* Fake waveform result */}
          <div className="mt-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400 font-mono">dark_cinematic_hiphop_v1.wav</span>
              <span className="text-xs text-[#00ff88]">✓ Ready</span>
            </div>
            <div className="flex items-end gap-0.5 h-8">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#00ff88]/40 rounded-sm"
                  style={{ height: `${Math.sin(i * 0.3) * 50 + 50}%` }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-[#00ff88] text-black flex items-center justify-center text-xs font-bold">
                  ▶
                </button>
                <button className="w-8 h-8 rounded-full border border-[#1a1a1a] text-gray-400 flex items-center justify-center text-xs">
                  ↺
                </button>
              </div>
              <button className="px-3 py-1 border border-[#00ff88]/30 text-[#00ff88] text-xs rounded-lg hover:bg-[#00ff88]/10 transition-colors">
                Export →
              </button>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const CardContent = (
              <>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                {f.link && (
                  <span className="inline-flex items-center gap-1 text-[#00ff88] text-sm mt-3 hover:underline">
                    Try it →
                  </span>
                )}
              </>
            );

            return f.link ? (
              <a
                key={f.title}
                href={f.link}
                className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 card-hover block hover:border-[#00ff88]/30 transition-colors"
              >
                {CardContent}
              </a>
            ) : (
              <div
                key={f.title}
                className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 card-hover"
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
