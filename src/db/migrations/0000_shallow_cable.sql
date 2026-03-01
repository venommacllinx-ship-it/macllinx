CREATE TABLE `game_scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`game_type` text NOT NULL,
	`score` integer NOT NULL,
	`played_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `leaderboard_periods` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year` integer NOT NULL,
	`month` integer NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`prize_pool` real DEFAULT 200 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`is_paid` integer DEFAULT false NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `monthly_rankings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`period_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`total_score` integer NOT NULL,
	`games_played` integer NOT NULL,
	`rank` integer NOT NULL,
	`prize_amount` real,
	`is_paid` integer DEFAULT false NOT NULL,
	`paid_at` integer,
	`payment_method` text,
	`payment_reference` text,
	`updated_at` integer,
	FOREIGN KEY (`period_id`) REFERENCES `leaderboard_periods`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prize_payouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`period_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`rank` integer NOT NULL,
	`amount` real NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`payment_method` text NOT NULL,
	`payment_reference` text,
	`paid_at` integer,
	`created_at` integer,
	FOREIGN KEY (`period_id`) REFERENCES `leaderboard_periods`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`image` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);