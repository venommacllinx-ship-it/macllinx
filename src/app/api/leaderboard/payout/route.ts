import { NextRequest, NextResponse } from "next/server";
import { db, leaderboardPeriods, monthlyRankings, prizePayouts, users } from "@/db";
import { eq, and, desc } from "drizzle-orm";
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

// Prize distribution
const PRIZE_DISTRIBUTION = [80, 50, 30, 15, 10, 5, 4, 3, 2, 1];

// Initialize Lemon Squeezy
lemonSqueezySetup({
  apiKey: process.env.LEMON_SQUEEZY_API_KEY,
});

// POST /api/leaderboard/payout - Process monthly payouts (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin secret
    const { adminSecret, periodId } = await request.json();
    
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get period
    const period = await db.query.leaderboardPeriods.findFirst({
      where: eq(leaderboardPeriods.id, periodId),
    });

    if (!period) {
      return NextResponse.json(
        { success: false, error: "Period not found" },
        { status: 404 }
      );
    }

    if (period.isPaid) {
      return NextResponse.json(
        { success: false, error: "Prizes already paid for this period" },
        { status: 400 }
      );
    }

    // Get top 10 winners
    const winners = await db
      .select({
        id: monthlyRankings.id,
        userId: monthlyRankings.userId,
        rank: monthlyRankings.rank,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(monthlyRankings)
      .innerJoin(users, eq(monthlyRankings.userId, users.id))
      .where(eq(monthlyRankings.periodId, periodId))
      .orderBy(monthlyRankings.rank)
      .limit(10);

    const payouts = [];

    for (let i = 0; i < winners.length; i++) {
      const winner = winners[i];
      const prizeAmount = PRIZE_DISTRIBUTION[i] || 0;

      if (prizeAmount === 0) continue;

      try {
        // Create payout record
        const [payout] = await db.insert(prizePayouts).values({
          periodId,
          userId: winner.userId,
          rank: winner.rank,
          amount: prizeAmount,
          status: "processing",
          paymentMethod: "lemon_squeezy",
        }).returning();

        // Note: Lemon Squeezy doesn't have a direct payout API for sending money to users
        // In a real implementation, you'd use:
        // 1. Lemon Squeezy Affiliate system
        // 2. PayPal Payouts API
        // 3. Stripe Connect
        // 4. Manual payout with admin dashboard
        
        // For now, we mark as pending for manual processing
        await db.update(prizePayouts)
          .set({ status: "pending" })
          .where(eq(prizePayouts.id, payout.id));

        await db.update(monthlyRankings)
          .set({ 
            prizeAmount,
            isPaid: false,
          })
          .where(eq(monthlyRankings.id, winner.id));

        payouts.push({
          rank: winner.rank,
          user: winner.user.name || winner.user.email,
          amount: prizeAmount,
          status: "pending",
        });
      } catch (error) {
        console.error(`Failed to process payout for rank ${winner.rank}:`, error);
      }
    }

    // Mark period as paid (but individual payouts pending)
    await db.update(leaderboardPeriods)
      .set({ isPaid: true })
      .where(eq(leaderboardPeriods.id, periodId));

    return NextResponse.json({
      success: true,
      message: "Payouts queued for processing",
      payouts,
    });
  } catch (error) {
    console.error("Payout error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process payouts" },
      { status: 500 }
    );
  }
}

// GET /api/leaderboard/payout - Get payout status for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const periodId = searchParams.get("periodId");

    if (!userId || !periodId) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    const payout = await db.query.prizePayouts.findFirst({
      where: and(
        eq(prizePayouts.userId, parseInt(userId)),
        eq(prizePayouts.periodId, parseInt(periodId))
      ),
    });

    return NextResponse.json({
      success: true,
      payout,
    });
  } catch (error) {
    console.error("Payout status error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch payout status" },
      { status: 500 }
    );
  }
}
