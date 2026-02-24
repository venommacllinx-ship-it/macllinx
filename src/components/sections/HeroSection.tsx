export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Hip-hop urban background — dark city/street art vibe */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80')",
        }}
      />

      {/* Deep dark overlay for readability */}
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />

      {/* Gold/amber hip-hop tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/25 via-transparent to-orange-900/20" />

      {/* Graffiti-style spray paint glow spots */}
      <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-yellow-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-[#00ff88]/6 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />

      {/* Subtle noise/grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] pulse-glow" />
          <span className="text-xs text-[#00ff88] font-medium tracking-widest uppercase">
            AI-Powered Music Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-none">
          <span className="text-white">Create.</span>{" "}
          <span className="gradient-text glow-text">Publish.</span>
          <br />
          <span className="text-white">Play.</span>{" "}
          <span className="gradient-text glow-text">Build.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
          Venom is the all-in-one music platform. Generate AI music, publish your tracks to the world,
          compete in music games, and build your own music website — no experience needed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#generate"
            className="px-8 py-4 bg-[#00ff88] text-black font-bold rounded-xl text-base hover:bg-[#00cc6e] transition-all duration-200 glow-green w-full sm:w-auto"
          >
            Start Creating Free
          </a>
          <a
            href="#games"
            className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl text-base hover:border-[#00ff88]/50 hover:text-[#00ff88] transition-all duration-200 w-full sm:w-auto backdrop-blur-sm bg-black/20"
          >
            Play Music Games →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "2M+", label: "Tracks Generated" },
            { value: "500K+", label: "Artists" },
            { value: "50+", label: "Music Games" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Waveform decoration */}
        <div className="mt-12 flex items-end justify-center gap-1 h-10">
          {[16, 24, 12, 30, 20, 8, 28, 18, 32, 14, 26, 10, 22, 30, 16, 24, 12, 28, 20, 18].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-[#00ff88] rounded-full wave-bar opacity-60"
              style={{
                animationDelay: `${i * 0.05}s`,
                height: `${h}px`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
