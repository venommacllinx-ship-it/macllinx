import { db, gameScores, users, leaderboardPeriods, monthlyRankings } from "@/db";
import { desc, eq, and, gte, lt, sql } from "drizzle-orm";
import { Trophy, Medal, Crown, Gamepad2, DollarSign, Calendar, Users } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering to avoid static generation database errors
export const dynamic = 'force-dynamic';

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

async function getCurrentLeaderboard() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // Get or create current period
  let period = await db.query.leaderboardPeriods.findFirst({
    where: and(
      eq(leaderboardPeriods.year, currentYear),
      eq(leaderboardPeriods.month, currentMonth)
    ),
  });

  if (!period) {
    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0);
    
    const result = await db.insert(leaderboardPeriods).values({
      year: currentYear,
      month: currentMonth,
      startDate,
      endDate,
      prizePool: 200,
      isActive: true,
    }).returning();
    
    period = result[0];
  }

  // Get top scores with user info
  const scores = await db
    .select({
      userId: gameScores.userId,
      name: users.name,
      email: users.email,
      image: users.image,
      totalScore: sql<number>`SUM(${gameScores.score})`.as("total_score"),
      gamesPlayed: sql<number>`COUNT(*)`.as("games_played"),
    })
    .from(gameScores)
    .innerJoin(users, eq(gameScores.userId, users.id))
    .where(and(
      gte(gameScores.playedAt, period.startDate),
      lt(gameScores.playedAt, period.endDate)
    ))
    .groupBy(gameScores.userId, users.name, users.email, users.image)
    .orderBy(desc(sql`total_score`))
    .limit(20);

  // Map with ranks and prizes
  const rankedScores = scores.map((score, index) => {
    const rank = index + 1;
    const prizeInfo = PRIZE_DISTRIBUTION.find(p => p.rank === rank);
    return {
      ...score,
      rank,
      prize: prizeInfo?.prize || 0,
    };
  });

  // Get total participants
  const [{ count }] = await db
    .select({ count: sql<number>`COUNT(DISTINCT ${gameScores.userId})` })
    .from(gameScores)
    .where(and(
      gte(gameScores.playedAt, period.startDate),
      lt(gameScores.playedAt, period.endDate)
    ));

  return {
    period,
    scores: rankedScores,
    totalParticipants: count,
  };
}

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

export default async function LeaderboardPage() {
  const { period, scores, totalParticipants } = await getCurrentLeaderboard();
  
  const monthName = new Date(period.year, period.month - 1).toLocaleString("default", { month: "long" });
  const now = new Date();
  const daysRemaining = Math.ceil((period.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

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
              <p className="text-4xl font-bold text-white">${period.prizePool}</p>
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
          
          {scores.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <Gamepad2 className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Games Played Yet</h3>
              <p className="text-zinc-400 mb-6">Be the first to play and claim the top spot!</p>
              <Link
                href="/games"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full transition-colors"
              >
                <Gamepad2 className="w-5 h-5" />
                Play Now
              </Link>
            </div>
          ) : (
            scores.map((player) => (
              <div
                key={player.userId}
                className={`flex items-center gap-4 p-4 rounded-xl border ${getRankStyle(player.rank)} transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(player.rank)}
                </div>
                
                <div className="flex items-center gap-4 flex-1">
                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.name || "Player"}
                      className="w-12 h-12 rounded-full border-2 border-zinc-700"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-black font-bold text-lg">
                      {(player.name || player.email || "?")[0].toUpperCase()}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <p className="font-semibold text-white">{player.name || player.email?.split("@")[0] || "Anonymous"}</p>
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
            ))
          )}
        </div>

        {/* How to Play */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <Gamepad2 className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">1. Play Games</h3>
            <p className="text-zinc-400">Compete in rhythm challenges, beat-matching, and lyric quizzes to earn points.</p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">2. Climb the Ranks</h3>
            <p className="text-zinc-400">Your highest scores each month determine your ranking on the leaderboard.</p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">3. Win Prizes</h3>
            <p className="text-zinc-400">Top 10 players receive cash prizes distributed automatically via Lemon Squeezy.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
