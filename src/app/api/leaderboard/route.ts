import { NextRequest, NextResponse } from "next/server";
import { db, gameScores, users, leaderboardPeriods, monthlyRankings } from "@/db";
import { desc, eq, and, gte, lt, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

// GET /api/leaderboard - Get current leaderboard
export async function GET() {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Get current period
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

    // Get top scores
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

    // Get total participants
    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(DISTINCT ${gameScores.userId})` })
      .from(gameScores)
      .where(and(
        gte(gameScores.playedAt, period.startDate),
        lt(gameScores.playedAt, period.endDate)
      ));

    return NextResponse.json({
      success: true,
      period,
      scores: scores.map((s, i) => ({ ...s, rank: i + 1 })),
      totalParticipants: count,
    });
  } catch (error) {
    logger.error("Failed to fetch leaderboard", error as Error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

// POST /api/leaderboard/score - Submit a new score
export async function POST(request: NextRequest) {
  let gameType: string | undefined;
  let score: number | undefined;

  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    gameType = body.gameType;
    score = body.score;

    if (!gameType || typeof score !== "number") {
      return NextResponse.json(
        { success: false, error: "Invalid score data" },
        { status: 400 }
      );
    }

    // Get or create user
    let user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (!user) {
      const result = await db.insert(users).values({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      }).returning();
      user = result[0];
    }

    // Insert score
    await db.insert(gameScores).values({
      userId: user.id,
      gameType,
      score,
    });

    return NextResponse.json({
      success: true,
      message: "Score submitted successfully",
    });
  } catch (error) {
    logger.error("Failed to submit score", error as Error, { gameType, score });
    return NextResponse.json(
      { success: false, error: "Failed to submit score" },
      { status: 500 }
    );
  }
}
