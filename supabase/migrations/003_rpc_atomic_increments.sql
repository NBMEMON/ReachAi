-- Atomically increments emails_generated only when the current value is below the
-- supplied limit. Returns TRUE if the slot was claimed, FALSE if the limit was
-- already reached. Using a single UPDATE avoids the read-then-write race condition
-- that would let concurrent requests bypass the monthly cap.
CREATE OR REPLACE FUNCTION increment_emails_if_below_limit(
  p_user_id UUID,
  p_limit   INTEGER
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  rows_updated INTEGER;
BEGIN
  UPDATE users
  SET    emails_generated = emails_generated + 1
  WHERE  id               = p_user_id
    AND  emails_generated < p_limit;

  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  RETURN rows_updated > 0;
END;
$$;

-- Same pattern for scrape usage.
CREATE OR REPLACE FUNCTION increment_scrapes_if_below_limit(
  p_user_id UUID,
  p_limit   INTEGER
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  rows_updated INTEGER;
BEGIN
  UPDATE users
  SET    scrapes_used = scrapes_used + 1
  WHERE  id           = p_user_id
    AND  scrapes_used < p_limit;

  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  RETURN rows_updated > 0;
END;
$$;
