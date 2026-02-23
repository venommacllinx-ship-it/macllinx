const platforms = [
  { name: "Spotify", color: "#1DB954", icon: "🎧" },
  { name: "Apple Music", color: "#FC3C44", icon: "🍎" },
  { name: "YouTube Music", color: "#FF0000", icon: "▶" },
  { name: "SoundCloud", color: "#FF5500", icon: "☁" },
  { name: "Tidal", color: "#00FFFF", icon: "〰" },
  { name: "Amazon Music", color: "#00A8E0", icon: "♪" },
  { name: "Deezer", color: "#A238FF", icon: "◈" },
  { name: "TikTok", color: "#FF0050", icon: "♬" },
];

const steps = [
  {
    step: "01",
    title: "Upload Your Track",
    desc: "Upload your generated or original music in any format. We handle the conversion.",
  },
  {
    step: "02",
    title: "Add Metadata",
    desc: "Set your track title, artist name, genre, cover art, and release date.",
  },
  {
    step: "03",
    title: "Choose Platforms",
    desc: "Select which streaming platforms you want to distribute to — or choose all of them.",
  },
  {
    step: "04",
    title: "Collect Royalties",
    desc: "Earn 100% of your royalties. We track streams and pay you directly every month.",
  },
];

export default function PublishSection() {
  return (
    <section id="publish" className="py-24 px-4 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ccff]/20 bg-[#00ccff]/5 mb-4">
            <span className="text-xs text-[#00ccff] font-medium tracking-widest uppercase">Music Publishing</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Publish to{" "}
            <span className="gradient-text">Every Platform</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Distribute your music to 150+ streaming platforms worldwide. Keep 100% of your royalties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={s.step} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#111111] border border-[#1a1a1a] flex items-center justify-center group-hover:border-[#00ff88]/30 transition-colors">
                  <span className="text-xs font-black text-[#00ff88]">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute ml-6 mt-12 w-px h-6 bg-[#1a1a1a]" />
                )}
              </div>
            ))}
          </div>

          {/* Platform grid */}
          <div>
            <p className="text-sm text-gray-500 mb-4 text-center">Distribute to 150+ platforms including:</p>
            <div className="grid grid-cols-4 gap-3">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-4 flex flex-col items-center gap-2 card-hover cursor-pointer"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-xs text-gray-400 text-center leading-tight">{p.name}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-600 mt-3">+ 142 more platforms</p>
          </div>
        </div>

        {/* Royalty stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { value: "100%", label: "Royalties Kept", sub: "No hidden fees" },
            { value: "$0", label: "Upfront Cost", sub: "Free to start" },
            { value: "24h", label: "Distribution Speed", sub: "Live within a day" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111111] border border-[#1a1a1a] rounded-2xl p-6 text-center card-hover"
            >
              <div className="text-4xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
