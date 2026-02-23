const templates = [
  {
    name: "Artist Portfolio",
    desc: "Showcase your music, bio, and tour dates",
    icon: "🎨",
    color: "#00ff88",
  },
  {
    name: "Music Blog",
    desc: "Share reviews, news, and playlists",
    icon: "✍️",
    color: "#00ccff",
  },
  {
    name: "Band Website",
    desc: "Full site for your band with merch store",
    icon: "🎸",
    color: "#ff6b6b",
  },
  {
    name: "Podcast Site",
    desc: "Host and distribute your music podcast",
    icon: "🎙️",
    color: "#ffd93d",
  },
  {
    name: "Label Site",
    desc: "Professional site for your record label",
    icon: "🏷️",
    color: "#c77dff",
  },
  {
    name: "Event Page",
    desc: "Promote concerts, festivals, and shows",
    icon: "🎪",
    color: "#ff9f43",
  },
];

const builderFeatures = [
  { icon: "🖱️", title: "Drag & Drop", desc: "Build pages visually without writing a single line of code." },
  { icon: "🎵", title: "Music Player", desc: "Embed your Venom tracks directly into your website." },
  { icon: "📱", title: "Mobile Ready", desc: "Every site is automatically optimized for all screen sizes." },
  { icon: "🌐", title: "Custom Domain", desc: "Connect your own domain or use a free venom.site subdomain." },
  { icon: "📊", title: "Analytics", desc: "Track visitors, plays, and fan engagement in real time." },
  { icon: "🛒", title: "Merch Store", desc: "Sell merchandise, beats, and digital downloads directly." },
];

export default function BuilderSection() {
  return (
    <section id="builder" className="py-24 px-4 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c77dff]/20 bg-[#c77dff]/5 mb-4">
            <span className="text-xs text-[#c77dff] font-medium tracking-widest uppercase">Web Builder</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Build Your{" "}
            <span className="gradient-text">Music Website</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Create a stunning music website in minutes. No coding required. Choose a template, customize it, and go live.
          </p>
        </div>

        {/* Builder mockup */}
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-2xl overflow-hidden mb-16 max-w-5xl mx-auto">
          {/* Browser chrome */}
          <div className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 bg-[#1a1a1a] rounded-md px-3 py-1 text-xs text-gray-500 font-mono">
              yourname.venom.site
            </div>
            <button className="text-xs text-[#00ff88] font-medium">Publish</button>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-48 bg-[#0a0a0a] border-r border-[#1a1a1a] p-3 hidden sm:block">
              <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider">Blocks</p>
              {["Hero", "Music Player", "About", "Gallery", "Tour Dates", "Contact", "Merch Store"].map((block) => (
                <div
                  key={block}
                  className="px-3 py-2 rounded-lg text-xs text-gray-400 hover:bg-[#1a1a1a] hover:text-white cursor-pointer transition-colors mb-1"
                >
                  {block}
                </div>
              ))}
            </div>

            {/* Canvas */}
            <div className="flex-1 p-4 min-h-64">
              {/* Fake website preview */}
              <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#1a1a1a]">
                {/* Fake hero */}
                <div className="bg-gradient-to-br from-[#001a0d] to-[#000d1a] p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/30 mx-auto mb-3 flex items-center justify-center text-2xl">
                    🎤
                  </div>
                  <div className="h-4 bg-white/20 rounded w-32 mx-auto mb-2" />
                  <div className="h-2 bg-white/10 rounded w-48 mx-auto mb-4" />
                  <div className="inline-block px-4 py-1.5 bg-[#00ff88] rounded-lg">
                    <div className="h-2 bg-black/30 rounded w-16" />
                  </div>
                </div>
                {/* Fake music player */}
                <div className="p-4 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-sm">
                      ▶
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-[#1a1a1a] rounded w-3/4 mb-1.5" />
                      <div className="h-1.5 bg-[#1a1a1a] rounded w-1/2" />
                    </div>
                    <div className="text-xs text-[#00ff88]">2:34</div>
                  </div>
                </div>
              </div>

              {/* Drag hint */}
              <div className="mt-3 border-2 border-dashed border-[#1a1a1a] rounded-xl p-4 text-center">
                <p className="text-xs text-gray-600">Drag a block here to add it</p>
              </div>
            </div>

            {/* Properties panel */}
            <div className="w-44 bg-[#0a0a0a] border-l border-[#1a1a1a] p-3 hidden lg:block">
              <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider">Style</p>
              {[
                { label: "Font", value: "Inter" },
                { label: "Color", value: "#00ff88" },
                { label: "BG", value: "#0a0a0a" },
              ].map((prop) => (
                <div key={prop.label} className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">{prop.label}</p>
                  <div className="bg-[#1a1a1a] rounded px-2 py-1 text-xs text-gray-300">{prop.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Templates */}
        <h3 className="text-xl font-bold text-white text-center mb-6">Start with a Template</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {templates.map((t) => (
            <div
              key={t.name}
              className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-4 text-center card-hover cursor-pointer group"
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-xl"
                style={{ backgroundColor: `${t.color}15`, border: `1px solid ${t.color}30` }}
              >
                {t.icon}
              </div>
              <p className="text-xs font-semibold text-white group-hover:text-[#00ff88] transition-colors mb-1">
                {t.name}
              </p>
              <p className="text-xs text-gray-600 leading-tight">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {builderFeatures.map((f) => (
            <div key={f.title} className="flex gap-4 bg-[#111111] border border-[#1a1a1a] rounded-xl p-5 card-hover">
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <h4 className="text-white font-semibold mb-1">{f.title}</h4>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
