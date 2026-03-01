const games = [
  {
    title: "Beat Drop",
    category: "Rhythm",
    players: "12.4K playing",
    difficulty: "Medium",
    icon: "🥁",
    color: "#00ff88",
    desc: "Hit the beats at the perfect moment. Test your rhythm and climb the global leaderboard.",
  },
  {
    title: "Melody Match",
    category: "Ear Training",
    players: "8.2K playing",
    difficulty: "Easy",
    icon: "🎵",
    color: "#00ccff",
    desc: "Listen to a melody and recreate it. Train your ear and improve your musical memory.",
  },
  {
    title: "Chord Rush",
    category: "Theory",
    players: "5.7K playing",
    difficulty: "Hard",
    icon: "🎹",
    color: "#ff6b6b",
    desc: "Identify chords as fast as possible. Master music theory while competing with others.",
  },
  {
    title: "Genre Guesser",
    category: "Trivia",
    players: "19.1K playing",
    difficulty: "Easy",
    icon: "🎸",
    color: "#ffd93d",
    desc: "Guess the genre from a 5-second clip. How well do you know your music?",
  },
  {
    title: "Lyric Blitz",
    category: "Trivia",
    players: "31.5K playing",
    difficulty: "Medium",
    icon: "🎤",
    color: "#c77dff",
    desc: "Fill in the missing lyrics before time runs out. Compete in real-time with friends.",
  },
  {
    title: "Producer Battle",
    category: "Creative",
    players: "3.9K playing",
    difficulty: "Expert",
    icon: "🎛️",
    color: "#ff9f43",
    desc: "Build a beat in 60 seconds and let the community vote. Rise to the top of the charts.",
  },
];

const leaderboard = [
  { rank: 1, name: "ShadowBeat", score: "98,420", badge: "🏆" },
  { rank: 2, name: "NeonPulse", score: "87,310", badge: "🥈" },
  { rank: 3, name: "VenomKing", score: "76,890", badge: "🥉" },
  { rank: 4, name: "BassDropper", score: "65,200", badge: "" },
  { rank: 5, name: "MelodyMaster", score: "54,100", badge: "" },
];

export default function GamesSection() {
  return (
    <section id="games" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ffd93d]/20 bg-[#ffd93d]/5 mb-4">
            <span className="text-xs text-[#ffd93d] font-medium tracking-widest uppercase">Music Games</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Play. Compete.{" "}
            <span className="gradient-text">Level Up.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            50+ music games to sharpen your skills, challenge friends, and earn rewards. From casual to expert.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Games grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {games.map((game) => (
              <div
                key={game.title}
                className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-5 card-hover cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${game.color}15`, border: `1px solid ${game.color}30` }}
                  >
                    {game.icon}
                  </div>
                  <div className="text-right">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${game.color}15`, color: game.color }}
                    >
                      {game.difficulty}
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-bold mb-1 group-hover:text-[#00ff88] transition-colors">
                  {game.title}
                </h3>
                <p className="text-gray-500 text-xs mb-3 leading-relaxed">{game.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{game.category}</span>
                  <span className="text-xs text-[#00ff88]">{game.players}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6">
            {/* Prize Pool Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl">
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-1">
                <span>🏆</span>
                <span>Monthly Prize Pool</span>
              </div>
              <p className="text-3xl font-bold text-white">$200</p>
              <p className="text-xs text-gray-400 mt-1">Top 10 players win cash prizes!</p>
            </div>

            <h3 className="text-white font-bold mb-1">Global Leaderboard</h3>
            <p className="text-xs text-gray-500 mb-6">Top players this week</p>
            <div className="space-y-3">
              {leaderboard.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    player.rank <= 3 ? "bg-[#00ff88]/5 border border-[#00ff88]/10" : "bg-[#0a0a0a]"
                  }`}
                >
                  <span className="text-lg w-6 text-center">{player.badge || `#${player.rank}`}</span>
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium">{player.name}</div>
                  </div>
                  <div className="text-xs text-[#00ff88] font-mono">{player.score}</div>
                </div>
              ))}
            </div>
            <a
              href="/leaderboard"
              className="w-full mt-6 py-2.5 border border-[#1a1a1a] text-gray-400 text-sm rounded-lg hover:border-[#00ff88]/30 hover:text-[#00ff88] transition-colors block text-center"
            >
              View Full Leaderboard →
            </a>

            {/* XP Progress */}
            <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">Your XP</span>
                <span className="text-[#00ff88]">Level 12</span>
              </div>
              <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-gradient-to-r from-[#00ff88] to-[#00ccff] rounded-full" />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-600">4,200 XP</span>
                <span className="text-gray-600">7,000 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00ff88] text-black font-bold rounded-xl hover:bg-[#00cc6e] transition-colors glow-green"
          >
            🎮 Browse All 50+ Games
          </a>
        </div>
      </div>
    </section>
  );
}
