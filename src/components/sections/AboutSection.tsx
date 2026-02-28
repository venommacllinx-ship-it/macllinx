export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00ff88]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#00ff88]" />
          <span className="text-xs font-semibold tracking-[0.3em] text-[#00ff88] uppercase">About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Who We Are
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-5">
              <strong className="text-white">Venom DLS</strong> is the creator and owner of Venom — an AI-powered music platform built for creators who want to move fast.
              Whether you&apos;re generating beats from scratch, publishing your tracks to the world,
              competing in music games, or building your own music website — Venom gives you the tools
              to do it all in one place.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-5">
              We believe music creation should be accessible to everyone. No studio. No expensive gear.
              Just your ideas and the power of AI to bring them to life. Visit us at{" "}
              <a href="https://www.venom.com" className="text-[#00ff88] hover:underline" target="_blank" rel="noopener noreferrer">www.venom.com</a>.
            </p>
            {/* Role model callout */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-[#8b5cf6]/30 bg-[#8b5cf6]/5 mb-8">
              <div className="w-9 h-9 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0 text-[#8b5cf6] font-black text-lg">
                X
              </div>
              <div>
                <p className="text-[10px] text-[#8b5cf6] uppercase tracking-widest font-semibold mb-0.5">Our Role Model</p>
                <p className="text-sm font-bold text-white">XXXTentacion — raw emotion, no limits</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-[#1a1a1a] bg-white/[0.02] hover:border-[#00ff88]/30 transition-colors duration-300 group w-fit">
              <div className="w-9 h-9 rounded-lg bg-[#00ff88]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00ff88]/20 transition-colors duration-300">
                <svg className="w-4 h-4 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium mb-0.5">Get in touch</p>
                <a
                  href="mailto:venommacllinx@gmail.com"
                  className="text-sm font-semibold text-white group-hover:text-[#00ff88] transition-colors duration-300"
                >
                  venommacllinx@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right — values cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ),
                title: "Music First",
                desc: "Every feature is designed with music creators in mind.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "AI-Powered",
                desc: "Cutting-edge AI that turns your ideas into real music.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Community",
                desc: "A growing community of artists, producers, and fans.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                ),
                title: "Open Access",
                desc: "Start for free. No experience or equipment required.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-5 rounded-xl border border-[#1a1a1a] bg-white/[0.02] hover:border-[#00ff88]/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88] mb-3">
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{card.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
