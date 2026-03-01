import { NextRequest, NextResponse } from "next/server";
import { db, gameScores, users, leaderboardPeriods, monthlyRankings } from "@/db";
import { desc, eq, and, gte, lt, sql } from "drizzle-orm";

// Prize distribution
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

// POST /api/leaderboard/reset - Monthly reset and new period creation (cron job)
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthYear = lastMonth.getFullYear();
    const lastMonthNumber = lastMonth.getMonth() + 1;
    let topScores: { userId: number; totalScore: number; gamesPlayed: number }[] = [];

    // Close previous month's leaderboard
    const previousPeriod = await db.query.leaderboardPeriods.findFirst({
      where: and(
        eq(leaderboardPeriods.year, lastMonthYear),
        eq(leaderboardPeriods.month, lastMonthNumber)
      ),
    });

    if (previousPeriod && previousPeriod.isActive) {
      // Calculate final rankings for previous month
      const scores = await db
        .select({
          userId: gameScores.userId,
          totalScore: sql<number>`SUM(${gameScores.score})`.as("total_score"),
          gamesPlayed: sql<number>`COUNT(*)`.as("games_played"),
        })
        .from(gameScores)
        .where(and(
          gte(gameScores.playedAt, previousPeriod.startDate),
          lt(gameScores.playedAt, previousPeriod.endDate)
        ))
        .groupBy(gameScores.userId)
        .orderBy(desc(sql`total_score`))
        .limit(20);

      topScores = scores;

      // Save final rankings
      for (let i = 0; i < scores.length; i++) {
        const score = scores[i];
        const rank = i + 1;
        const prizeInfo = PRIZE_DISTRIBUTION.find(p => p.rank === rank);

        await db.insert(monthlyRankings).values({
          periodId: previousPeriod.id,
          userId: score.userId,
          totalScore: score.totalScore,
          gamesPlayed: score.gamesPlayed,
          rank,
          prizeAmount: prizeInfo?.prize || 0,
          isPaid: false,
        });
      }

      // Mark period as inactive
      await db.update(leaderboardPeriods)
        .set({ isActive: false })
        .where(eq(leaderboardPeriods.id, previousPeriod.id));
    }

    // Create new period for current month if doesn't exist
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const existingPeriod = await db.query.leaderboardPeriods.findFirst({
      where: and(
        eq(leaderboardPeriods.year, currentYear),
        eq(leaderboardPeriods.month, currentMonth)
      ),
    });

    if (!existingPeriod) {
      const startDate = new Date(currentYear, currentMonth - 1, 1);
      const endDate = new Date(currentYear, currentMonth, 0);

      await db.insert(leaderboardPeriods).values({
        year: currentYear,
        month: currentMonth,
        startDate,
        endDate,
        prizePool: 200,
        isActive: true,
        isPaid: false,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Leaderboard reset completed",
      previousWinners: topScores?.slice(0, 10).map((s, i) => ({
        rank: i + 1,
        userId: s.userId,
        score: s.totalScore,
      })) || [],
    });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset leaderboard" },
      { status: 500 }
    );
  }
}
