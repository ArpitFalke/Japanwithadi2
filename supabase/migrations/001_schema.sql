-- ============================================
-- JAPAN WITH ADI — Production Database Schema
-- Run in Supabase SQL Editor
-- ============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy search

-- ============================================
-- USERS
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT,
  email         TEXT UNIQUE NOT NULL,
  avatar        TEXT,
  role          TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student','admin','moderator')),
  nationality   TEXT,
  education_level TEXT CHECK (education_level IN ('high_school','undergraduate','masters','phd','kosen','stc')),
  japanese_level  TEXT CHECK (japanese_level IN ('none','n5','n4','n3','n2','n1','native')),
  target_program  TEXT,
  bio           TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SCHOLARSHIPS
-- ============================================
CREATE TABLE IF NOT EXISTS scholarships (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scholarship_name      TEXT NOT NULL,
  provider              TEXT NOT NULL,
  category              TEXT NOT NULL CHECK (category IN ('mext','jasso','kosen','stc','university','foundation','exchange','language')),
  level                 TEXT[] NOT NULL DEFAULT '{}',
  scholarship_type      TEXT,
  funding_type          TEXT NOT NULL CHECK (funding_type IN ('fully_funded','partial','tuition_only','stipend_only')),
  stipend               TEXT,
  stipend_amount        INTEGER DEFAULT 0,
  tuition_covered       BOOLEAN DEFAULT FALSE,
  age_limit_min         INTEGER,
  age_limit_max         INTEGER,
  eligibility           TEXT,
  nationality           JSONB DEFAULT '"all"',
  japanese_requirement  TEXT DEFAULT 'none',
  english_requirement   TEXT,
  application_deadline  DATE,
  notification_date     DATE,
  exam_subjects         TEXT[] DEFAULT '{}',
  interview_required    BOOLEAN DEFAULT FALSE,
  duration              TEXT,
  university            TEXT[] DEFAULT '{}',
  field_of_study        TEXT[] DEFAULT '{}',
  application_route     TEXT CHECK (application_route IN ('embassy','university','direct','organization')),
  official_link         TEXT,
  tags                  TEXT[] DEFAULT '{}',
  description           TEXT,
  benefits              TEXT[] DEFAULT '{}',
  documents_required    TEXT[] DEFAULT '{}',
  faq                   JSONB DEFAULT '[]',
  slug                  TEXT UNIQUE NOT NULL,
  featured              BOOLEAN DEFAULT FALSE,
  active                BOOLEAN DEFAULT TRUE,
  views                 INTEGER DEFAULT 0,
  saves                 INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_scholarships_search ON scholarships USING GIN (
  to_tsvector('english', scholarship_name || ' ' || COALESCE(provider,'') || ' ' || COALESCE(description,''))
);
CREATE INDEX IF NOT EXISTS idx_scholarships_category ON scholarships(category);
CREATE INDEX IF NOT EXISTS idx_scholarships_active ON scholarships(active);
CREATE INDEX IF NOT EXISTS idx_scholarships_featured ON scholarships(featured);
CREATE INDEX IF NOT EXISTS idx_scholarships_deadline ON scholarships(application_deadline);

-- ============================================
-- SAVED SCHOLARSHIPS
-- ============================================
CREATE TABLE IF NOT EXISTS saved_scholarships (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scholarship_id  UUID NOT NULL REFERENCES scholarships(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, scholarship_id)
);

-- ============================================
-- APPLICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS applications (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scholarship_id        UUID NOT NULL REFERENCES scholarships(id) ON DELETE CASCADE,
  status                TEXT NOT NULL DEFAULT 'saved' CHECK (status IN ('saved','preparing','applied','interview','accepted','rejected','withdrawn')),
  notes                 TEXT,
  submitted_documents   TEXT[] DEFAULT '{}',
  reminder_date         DATE,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, scholarship_id)
);

-- ============================================
-- AI CHAT HISTORY
-- ============================================
CREATE TABLE IF NOT EXISTS ai_chat_sessions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  messages    JSONB NOT NULL DEFAULT '[]',
  title       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  content          TEXT,
  excerpt          TEXT,
  seo_title        TEXT,
  seo_description  TEXT,
  thumbnail        TEXT,
  author_id        UUID REFERENCES users(id) ON DELETE SET NULL,
  tags             TEXT[] DEFAULT '{}',
  published        BOOLEAN DEFAULT FALSE,
  views            INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id     UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  likes       INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WEBINARS
-- ============================================
CREATE TABLE IF NOT EXISTS webinars (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               TEXT NOT NULL,
  description         TEXT,
  speaker             TEXT NOT NULL,
  speaker_title       TEXT,
  date                TIMESTAMPTZ NOT NULL,
  duration_minutes    INTEGER DEFAULT 60,
  thumbnail           TEXT,
  registration_link   TEXT,
  youtube_link        TEXT,
  topics              TEXT[] DEFAULT '{}',
  max_attendees       INTEGER,
  registered_count    INTEGER DEFAULT 0,
  is_free             BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  message     TEXT NOT NULL,
  type        TEXT DEFAULT 'system' CHECK (type IN ('deadline','recommendation','webinar','system','achievement')),
  read        BOOLEAN DEFAULT FALSE,
  action_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================
CREATE OR REPLACE FUNCTION increment_scholarship_views(scholarship_id UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  UPDATE scholarships SET views = views + 1 WHERE id = scholarship_id;
END;
$$;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO users (id, email, name, avatar)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users: can read/update own profile
CREATE POLICY "users_own" ON users FOR ALL USING (auth.uid() = id);

-- Scholarships: public read, admin write
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scholarships_public_read" ON scholarships FOR SELECT USING (active = TRUE);
CREATE POLICY "scholarships_admin_write" ON scholarships FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Saved: own only
CREATE POLICY "saved_own" ON saved_scholarships FOR ALL USING (auth.uid() = user_id);

-- Applications: own only
CREATE POLICY "applications_own" ON applications FOR ALL USING (auth.uid() = user_id);

-- AI chat: own only
CREATE POLICY "chat_own" ON ai_chat_sessions FOR ALL USING (auth.uid() = user_id);

-- Notifications: own only
CREATE POLICY "notifications_own" ON notifications FOR ALL USING (auth.uid() = user_id);

-- Blog: public read published
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "blog_public_read" ON blog_posts FOR SELECT USING (published = TRUE);
