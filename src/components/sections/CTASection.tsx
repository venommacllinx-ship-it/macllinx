export default function CTASection() {
  return (
    <section className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-3xl p-10 sm:p-16 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 via-transparent to-[#00ccff]/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />

          <div className="relative z-10">
            <div className="text-5xl mb-6">🎵</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Ready to Make Your{" "}
              <span className="gradient-text">Mark?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Join over 500,000 artists already using Venom to create, publish, play, and build.
              Start free — no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#generate"
                className="px-8 py-4 bg-[#00ff88] text-black font-bold rounded-xl text-base hover:bg-[#00cc6e] transition-all duration-200 glow-green"
              >
                Start Creating Free
              </a>
              <a
                href="#builder"
                className="px-8 py-4 border border-[#1a1a1a] text-white font-semibold rounded-xl text-base hover:border-[#00ff88]/50 hover:text-[#00ff88] transition-all duration-200"
              >
                Build Your Website →
              </a>
            </div>

            <p className="text-xs text-gray-600 mt-6">
              Free forever plan available · No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
