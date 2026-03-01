import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { eq, and, gte, lt, desc } from "drizzle-orm";

// Users table (extends NextAuth users)
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Gaming scores for leaderboard
export const gameScores = sqliteTable("game_scores", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  gameType: text("game_type").notNull(), // 'rhythm', 'lyrics', 'beat-match', etc.
  score: integer("score").notNull(),
  playedAt: integer("played_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Monthly leaderboard periods
export const leaderboardPeriods = sqliteTable("leaderboard_periods", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  year: integer("year").notNull(),
  month: integer("month").notNull(), // 1-12
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  prizePool: real("prize_pool").notNull().default(200),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  isPaid: integer("is_paid", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Monthly rankings (cached for performance)
export const monthlyRankings = sqliteTable("monthly_rankings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  periodId: integer("period_id").notNull().references(() => leaderboardPeriods.id),
  userId: integer("user_id").notNull().references(() => users.id),
  totalScore: integer("total_score").notNull(),
  gamesPlayed: integer("games_played").notNull(),
  rank: integer("rank").notNull(),
  prizeAmount: real("prize_amount"),
  isPaid: integer("is_paid", { mode: "boolean" }).notNull().default(false),
  paidAt: integer("paid_at", { mode: "timestamp" }),
  paymentMethod: text("payment_method"), // 'lemon_squeezy', 'paypal', etc.
  paymentReference: text("payment_reference"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Prize payouts tracking
export const prizePayouts = sqliteTable("prize_payouts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  periodId: integer("period_id").notNull().references(() => leaderboardPeriods.id),
  userId: integer("user_id").notNull().references(() => users.id),
  rank: integer("rank").notNull(),
  amount: real("amount").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'processing', 'completed', 'failed'
  paymentMethod: text("payment_method").notNull(),
  paymentReference: text("payment_reference"),
  paidAt: integer("paid_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
