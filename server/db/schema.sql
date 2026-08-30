-- =============================================================================
-- ResuSphere AI Normalized Cloud Database Schema (PostgreSQL / Supabase)
-- Provides multi-tenant isolation, user-owned records, foreign keys, and RLS policies.
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. RESUMES TABLE
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) DEFAULT 'My Resume',
    personal_info JSONB NOT NULL DEFAULT '{}',
    experience JSONB NOT NULL DEFAULT '[]',
    education JSONB NOT NULL DEFAULT '[]',
    skills JSONB NOT NULL DEFAULT '[]',
    projects JSONB NOT NULL DEFAULT '[]',
    certifications JSONB NOT NULL DEFAULT '[]',
    languages JSONB NOT NULL DEFAULT '[]',
    settings JSONB NOT NULL DEFAULT '{"template": "modern", "palette": "indigo", "font": "inter", "spacing": "balanced"}',
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast user resume lookup
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);

-- 3. PORTFOLIOS TABLE
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    slug VARCHAR(120) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    headline VARCHAR(255),
    bio TEXT,
    avatar_url TEXT,
    theme VARCHAR(50) DEFAULT 'modern',
    contact_email VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    skills JSONB NOT NULL DEFAULT '[]',
    education JSONB NOT NULL DEFAULT '[]',
    projects JSONB NOT NULL DEFAULT '[]',
    achievements JSONB NOT NULL DEFAULT '[]',
    certifications JSONB NOT NULL DEFAULT '[]',
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);

-- 4. CAREER ROADMAP PROGRESS TABLE
CREATE TABLE IF NOT EXISTS career_roadmap_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id VARCHAR(80) NOT NULL,
    milestone_states JSONB NOT NULL DEFAULT '{}',
    readiness_score INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id)
);

CREATE INDEX IF NOT EXISTS idx_roadmap_user_role ON career_roadmap_progress(user_id, role_id);

-- 5. PROJECT GUIDE PROGRESS TABLE
CREATE TABLE IF NOT EXISTS project_guide_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id VARCHAR(120) NOT NULL,
    completed_tasks JSONB NOT NULL DEFAULT '{}',
    progress_percent INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, project_id)
);

CREATE INDEX IF NOT EXISTS idx_project_guide_user ON project_guide_progress(user_id, project_id);

-- 6. INTERVIEW PRACTICE PROGRESS TABLE
CREATE TABLE IF NOT EXISTS interview_practice_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id VARCHAR(80) NOT NULL,
    question_states JSONB NOT NULL DEFAULT '{}',
    overall_progress INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id)
);

CREATE INDEX IF NOT EXISTS idx_interview_user_role ON interview_practice_progress(user_id, role_id);

-- 7. JOB APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    job_url TEXT,
    status VARCHAR(50) DEFAULT 'Applied' CHECK (status IN ('Interested', 'Applied', 'Assessment', 'Interview', 'Offer', 'Rejected', 'Withdrawn')),
    date_applied DATE DEFAULT CURRENT_DATE,
    salary VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(user_id, status);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Guarantees that users can ONLY SELECT, INSERT, UPDATE, DELETE their own records.
-- =============================================================================

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_guide_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_practice_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Resumes Isolation Policy
CREATE POLICY "Users can only manage their own resumes"
ON resumes FOR ALL
USING (auth.uid() = user_id);

-- Portfolios Isolation Policy
CREATE POLICY "Users can only manage their own portfolios"
ON portfolios FOR ALL
USING (auth.uid() = user_id);

-- Roadmaps Isolation Policy
CREATE POLICY "Users can only manage their own roadmaps"
ON career_roadmap_progress FOR ALL
USING (auth.uid() = user_id);

-- Project Guides Isolation Policy
CREATE POLICY "Users can only manage their own project guides"
ON project_guide_progress FOR ALL
USING (auth.uid() = user_id);

-- Interview Practice Isolation Policy
CREATE POLICY "Users can only manage their own interview practice"
ON interview_practice_progress FOR ALL
USING (auth.uid() = user_id);

-- Job Applications Isolation Policy
CREATE POLICY "Users can only manage their own job applications"
ON job_applications FOR ALL
USING (auth.uid() = user_id);
