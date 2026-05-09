-- Add per-user monthly usage tracking columns
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS scrapes_used INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS usage_reset_date TIMESTAMPTZ;

-- Backfill existing rows: reset on the first of next month
UPDATE users
SET usage_reset_date = date_trunc('month', NOW()) + INTERVAL '1 month'
WHERE usage_reset_date IS NULL;

-- Make non-nullable now that backfill is done
ALTER TABLE users
  ALTER COLUMN usage_reset_date SET NOT NULL;
