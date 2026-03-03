import { Trophy, Medal, Crown, Gamepad2, DollarSign, Calendar, Users } from "lucide-react";
import Link from "next/link";

// Prize distribution for top 10 players
const PRIZE_DISTRIBUTION = [
  { rank: 1, prize: 80 },
  { rank: 2, prize: 50 },
  { rank: 3, prize: 30 },
  { rank: 4, prize: 15 },
  { rank: 5, prize: 10 },
  { rank: 6, prize: 5 },
  { rank: 7, prize: 4 },
  { rank: 8, prize: 3 },
  { rank: 9, prize: 2 },
  { rank: 10, prize: 1 },
];

// Mock leaderboard data
const MOCK_SCORES = [
  { userId: "1", name: "RhythmMaster", email: "player1@example.com", image: null, totalScore: 12500, gamesPlayed: 45, rank: 1, prize: 80 },
  { userId: "2", name: "BeatKing", email: "player2@example.com", image: null, totalScore: 11200, gamesPlayed: 38, rank: 2, prize: 50 },
  { userId: "3", name: "MusicQueen", email: "player3@example.com", image: null, totalScore: 10800, gamesPlayed: 42, rank: 3, prize: 30 },
  { userId: "4", name: "GrooveStar", email: "player4@example.com", image: null, totalScore: 9500, gamesPlayed: 35, rank: 4, prize: 15 },
  { userId: "5", name: "TempoHero", email: "player5@example.com", image: null, totalScore: 8900, gamesPlayed: 31, rank: 5, prize: 10 },
  { userId: "6", name: "NoteNinja", email: "player6@example.com", image: null, totalScore: 8200, gamesPlayed: 28, rank: 6, prize: 5 },
  { userId: "7", name: "MelodyPro", email: "player7@example.com", image: null, totalScore: 7800, gamesPlayed: 26, rank: 7, prize: 4 },
  { userId: "8", name: "BeatDropper", email: "player8@example.com", image: null, totalScore: 7200, gamesPlayed: 24, rank: 8, prize: 3 },
  { userId: "9", name: "VibeMaster", email: "player9@example.com", image: null, totalScore: 6500, gamesPlayed: 22, rank: 9, prize: 2 },
  { userId: "10", name: "SoundWave", email: "player10@example.com", image: null, totalScore: 5800, gamesPlayed: 20, rank: 10, prize: 1 },
];

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
  return <span className="text-lg font-bold text-gray-500 w-6 text-center">{rank}</span>;
}

function getRankStyle(rank: number) {
  if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-transparent border-yellow-500/50";
  if (rank === 2) return "bg-gradient-to-r from-gray-400/20 via-gray-300/10 to-transparent border-gray-400/50";
  if (rank === 3) return "bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-transparent border-amber-600/50";
  return "bg-zinc-900/50 border-zinc-700";
}

export default function LeaderboardPage() {
  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  const daysRemaining = 30 - now.getDate();
  const prizePool = 200;
  const totalParticipants = 156;

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            <span>Monthly Competition</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Music Gamers
            </span>{" "}
            Leaderboard
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Compete in rhythm games, beat challenges, and climb the ranks to win your share of the monthly prize pool!
          </p>
        </div>

        {/* Prize Pool Card */}
        <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/30 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Prize Pool</span>
              </div>
              <p className="text-4xl font-bold text-white">${prizePool}</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Period</span>
              </div>
              <p className="text-4xl font-bold text-white">{monthName}</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Players</span>
              </div>
              <p className="text-4xl font-bold text-white">{totalParticipants}</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-orange-400 mb-2">
                <Gamepad2 className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Days Left</span>
              </div>
              <p className="text-4xl font-bold text-white">{daysRemaining}</p>
            </div>
          </div>
        </div>

        {/* Prize Distribution */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Prize Distribution</h2>
          <div className="flex flex-wrap gap-2">
            {PRIZE_DISTRIBUTION.map((prize) => (
              <div
                key={prize.rank}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                  prize.rank <= 3
                    ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30"
                    : "bg-zinc-800/50 border border-zinc-700"
                }`}
              >
                <span className="font-bold text-zinc-300">#{prize.rank}</span>
                <span className="text-green-400 font-medium">${prize.prize}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white mb-4">Current Standings</h2>
          
          {MOCK_SCORES.map((player) => (
            <div
              key={player.userId}
              className={`flex items-center gap-4 p-4 rounded-xl border ${getRankStyle(player.rank)} transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-center justify-center w-12">
                {getRankIcon(player.rank)}
              </div>
              
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-black font-bold text-lg">
                  {player.name[0].toUpperCase()}
                </div>
                
                <div className="flex-1">
                  <p className="font-semibold text-white">{player.name}</p>
                  <p className="text-sm text-zinc-400">{player.gamesPlayed} games played</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{player.totalScore.toLocaleString()}</p>
                {player.prize > 0 && (
                  <p className="text-sm text-green-400 font-medium">${player.prize} prize</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-full transition-colors text-lg"
          >
            <Gamepad2 className="w-5 h-5" />
            Play Games & Climb the Ranks
          </Link>
        </div>
      </div>
    </main>
  );
}
