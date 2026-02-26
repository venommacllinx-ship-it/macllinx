export default function InspiredBySection() {
  const albums = [
    {
      title: "17",
      year: "2017",
      tracks: ["Jocelyn Flores", "Revenge", "Depression & Obsession", "Everybody Dies in Their Nightmares", "Save Me"],
      color: "#8b5cf6",
      description: "A raw, emotional debut album exploring heartbreak, depression, and vulnerability.",
    },
    {
      title: "?",
      year: "2018",
      tracks: ["SAD!", "Moonlight", "Changes", "Infinity (888)", "I Don't Let Go"],
      color: "#00ff88",
      description: "A genre-defying record blending emo, hip-hop, and R&B — his most commercially successful work.",
    },
    {
      title: "Skins",
      year: "2018",
      tracks: ["Guardian Angel", "Whoa (Mind in Awe)", "One Minute", "Hearteater", "Numb"],
      color: "#f59e0b",
      description: "A posthumous album completed by his team, showcasing his experimental and melodic range.",
    },
    {
      title: "Bad Vibes Forever",
      year: "2019",
      tracks: ["Bad Vibes Forever", "Staring at the Sky", "Royalty", "Slipknot", "I Don't Even Speak Spanish Lol"],
      color: "#ef4444",
      description: "A posthumous release featuring collaborations and unreleased material from his vault.",
    },
  ];

  const singles = [
    { title: "Look at Me!", year: "2015", note: "Breakthrough single" },
    { title: "Riot", year: "2016", note: "Aggressive punk-rap" },
    { title: "Carry On", year: "2017", note: "Emotional ballad" },
    { title: "A Ghetto Christmas Carol", year: "2017", note: "Holiday tribute" },
    { title: "Fuck Love (ft. Trippie Redd)", year: "2017", note: "Viral collaboration" },
    { title: "Revenge", year: "2017", note: "Iconic emo-rap" },
    { title: "SAD!", year: "2018", note: "#1 Billboard Hot 100" },
    { title: "Moonlight", year: "2018", note: "Platinum hit" },
    { title: "Changes", year: "2018", note: "Emotional fan favourite" },
    { title: "Hope", year: "2018", note: "Dedicated to Parkland victims" },
    { title: "Arms Around You", year: "2018", note: "ft. Lil Pump, Maluma, Swae Lee" },
    { title: "Bad Vibes Forever", year: "2019", note: "Posthumous anthem" },
  ];

  return (
    <section id="inspired-by" className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00ff88]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#8b5cf6]" />
          <span className="text-xs font-semibold tracking-[0.3em] text-[#8b5cf6] uppercase">Role Model</span>
        </div>

        {/* Hero intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Inspired by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#00ff88]">
                XXXTentacion
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-5">
              Jahseh Dwayne Ricardo Onfroy — known as XXXTentacion — was more than a musician.
              He was a force of raw emotion, genre-defying creativity, and unapologetic self-expression.
              His ability to blend emo, punk, hip-hop, and R&B into something entirely his own
              is the spirit that drives Venom DLS.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              At Venom, we believe music should break boundaries, speak truth, and connect souls —
              just like X did. His legacy reminds us that the most powerful music comes from
              the deepest places inside you.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "4", label: "Studio Albums" },
                { value: "87M+", label: "Monthly Listeners" },
                { value: "20", label: "Years Old at Peak" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl border border-[#1a1a1a] bg-white/[0.02] text-center">
                  <div className="text-2xl font-black text-[#8b5cf6] mb-1">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-80">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/30 to-[#00ff88]/20 blur-xl" />
              <div className="relative w-full h-full rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#111] to-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
                {/* Abstract X symbol */}
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#8b5cf6]/20 to-[#00ff88]/10 border border-[#8b5cf6]/30 flex items-center justify-center">
                    <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8b5cf6] to-[#00ff88]">
                      X
                    </span>
                  </div>
                  {/* Pulse rings */}
                  <div className="absolute inset-0 rounded-full border border-[#8b5cf6]/20 animate-ping" />
                </div>
                <div className="text-center px-6">
                  <p className="text-white font-black text-xl tracking-tight">XXXTentacion</p>
                  <p className="text-[#8b5cf6] text-xs tracking-widest uppercase mt-1">1998 – 2018</p>
                  <p className="text-gray-600 text-xs mt-3 leading-relaxed italic">
                    &ldquo;I don&apos;t care about your opinion of me. I care about the music.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Albums */}
        <div className="mb-20">
          <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-[#8b5cf6]" />
            Discography
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {albums.map((album) => (
              <div
                key={album.title}
                className="group p-5 rounded-2xl border border-[#1a1a1a] bg-white/[0.02] hover:border-[#8b5cf6]/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Album art placeholder */}
                <div
                  className="w-full aspect-square rounded-xl mb-4 flex items-center justify-center text-4xl font-black"
                  style={{
                    background: `linear-gradient(135deg, ${album.color}15, ${album.color}05)`,
                    border: `1px solid ${album.color}20`,
                    color: album.color,
                  }}
                >
                  {album.title === "?" ? "?" : album.title.charAt(0)}
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-black text-lg leading-tight">{album.title}</h4>
                  <span className="text-xs text-gray-600 font-mono mt-0.5 ml-2 flex-shrink-0">{album.year}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{album.description}</p>

                {/* Track list */}
                <div className="space-y-1.5">
                  {album.tracks.map((track, i) => (
                    <div key={track} className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-gray-700 w-4 flex-shrink-0">{i + 1}</span>
                      <div className="flex-1 h-px bg-[#1a1a1a] group-hover:bg-[#2a2a2a] transition-colors" />
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors text-right max-w-[140px] truncate">
                        {track}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notable Singles */}
        <div>
          <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-[#00ff88]" />
            Notable Singles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {singles.map((single) => (
              <div
                key={single.title}
                className="group p-4 rounded-xl border border-[#1a1a1a] bg-white/[0.02] hover:border-[#00ff88]/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#00ff88]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00ff88]/20 transition-colors">
                    <svg className="w-3.5 h-3.5 text-[#00ff88]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-gray-600">{single.year}</span>
                </div>
                <p className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-[#00ff88] transition-colors">
                  {single.title}
                </p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{single.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legacy quote */}
        <div className="mt-16 p-8 rounded-2xl border border-[#8b5cf6]/20 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent text-center">
          <div className="text-4xl text-[#8b5cf6]/30 font-serif mb-4">&ldquo;</div>
          <p className="text-xl text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto mb-4">
            The goal is to create music that makes people feel something real.
            Not just hear it — feel it in their chest.
          </p>
          <p className="text-sm text-[#8b5cf6] font-semibold tracking-widest uppercase">— XXXTentacion</p>
          <p className="text-xs text-gray-600 mt-2">The philosophy behind every beat made on Venom DLS</p>
        </div>
      </div>
    </section>
  );
}
