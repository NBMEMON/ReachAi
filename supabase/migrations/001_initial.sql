-- ============================================================
-- ReachAI — Initial Database Schema
-- ============================================================

-- Users table (synced with Clerk)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  emails_generated INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Emails table
CREATE TABLE IF NOT EXISTS emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  prospect_name TEXT NOT NULL,
  prospect_company TEXT NOT NULL,
  prospect_role TEXT NOT NULL,
  prospect_website TEXT,
  scraped_context TEXT,
  tone TEXT DEFAULT 'professional',
  template_id UUID,
  subject_line TEXT NOT NULL,
  email_body TEXT NOT NULL,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  prompt_template TEXT NOT NULL,
  category TEXT DEFAULT 'custom' CHECK (category IN ('sales', 'networking', 'follow-up', 'partnership', 'recruiting', 'custom')),
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage logs table
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('email_generated', 'prospect_scraped')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_emails_user_id ON emails(user_id);
CREATE INDEX IF NOT EXISTS idx_emails_created_at ON emails(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_templates_user_id ON templates(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON usage_logs(created_at);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (clerk_id = current_setting('request.jwt.claim.sub', true));

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (clerk_id = current_setting('request.jwt.claim.sub', true));

CREATE POLICY "Users can view own emails" ON emails
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claim.sub', true)
  ));

CREATE POLICY "Users can view own templates" ON templates
  FOR SELECT USING (
    is_default = TRUE OR
    user_id IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claim.sub', true))
  );

CREATE POLICY "Users can manage own templates" ON templates
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claim.sub', true)
  ));

CREATE POLICY "Users can view own usage" ON usage_logs
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claim.sub', true)
  ));

-- Insert default templates
INSERT INTO templates (name, description, prompt_template, category, is_default) VALUES
(
  'Direct Value Prop',
  'A straightforward email highlighting your unique value proposition',
  'Write a direct, value-focused cold email that immediately shows the prospect how they can benefit. Lead with the value proposition and include a specific, measurable result.',
  'sales',
  TRUE
),
(
  'Mutual Connection',
  'Reference a shared interest or mutual connection',
  'Write a warm cold email that references shared professional interests or industry involvement. Build rapport before introducing the value proposition.',
  'networking',
  TRUE
),
(
  'Problem-Solution',
  'Identify a pain point and present your solution',
  'Write a problem-focused cold email that identifies a specific challenge the prospect likely faces based on their role and industry. Present the solution naturally.',
  'sales',
  TRUE
),
(
  'Follow-Up Nudge',
  'A gentle follow-up to a previous outreach',
  'Write a brief, friendly follow-up email. Reference a previous outreach attempt. Add new value (case study, article, insight) rather than just asking "did you see my email?"',
  'follow-up',
  TRUE
),
(
  'Partnership Pitch',
  'Propose a mutually beneficial partnership',
  'Write a collaborative partnership email that emphasizes mutual benefits. Position both companies as complementary rather than creating a buyer-seller dynamic.',
  'partnership',
  TRUE
);
