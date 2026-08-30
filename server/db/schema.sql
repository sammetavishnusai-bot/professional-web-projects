-- =============================================================================
-- ResuSphere AI Supabase Cloud PostgreSQL Database Schema
-- Provides multi-tenant data isolation, user ownership, foreign keys, and RLS policies.
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Mirrors auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL DEFAULT 'User',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. RESUMES TABLE
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);

-- 3. PORTFOLIOS TABLE
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    slug VARCHAR(120) UNIQUE,
    full_name VARCHAR(255) NOT NULL DEFAULT 'Developer',
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

-- 4. CAREER ROADMAPS TABLE
CREATE TABLE IF NOT EXISTS career_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id VARCHAR(80) NOT NULL,
    milestone_states JSONB NOT NULL DEFAULT '{}',
    readiness_score INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id)
);

CREATE INDEX IF NOT EXISTS idx_career_roadmaps_user ON career_roadmaps(user_id, role_id);

-- 5. PROJECTS TABLE (Career blueprints & tracked projects)
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_slug VARCHAR(120) NOT NULL,
    title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'Intermediate',
    tech_stack JSONB NOT NULL DEFAULT '[]',
    short_description TEXT,
    completed_tasks JSONB NOT NULL DEFAULT '{}',
    progress_percent INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, project_slug)
);

CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id, project_slug);

-- 6. INTERVIEW PROGRESS TABLE
CREATE TABLE IF NOT EXISTS interview_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id VARCHAR(80) NOT NULL,
    question_states JSONB NOT NULL DEFAULT '{}',
    overall_progress INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id)
);

CREATE INDEX IF NOT EXISTS idx_interview_progress_user ON interview_progress(user_id, role_id);

-- 7. JOB APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_job_applications_user ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_user_status ON job_applications(user_id, status);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict user tenant isolation: Users can ONLY access & mutate their own data.
-- =============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- 1. Profiles RLS
CREATE POLICY "Users can view and edit their own profile"
ON profiles FOR ALL
USING (auth.uid() = id);

-- 2. Resumes RLS
CREATE POLICY "Users can view and edit their own resumes"
ON resumes FOR ALL
USING (auth.uid() = user_id);

-- 3. Portfolios RLS (Owners can edit; published portfolios can be viewed publicly)
CREATE POLICY "Users can manage their own portfolio"
ON portfolios FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Public can view published portfolios"
ON portfolios FOR SELECT
USING (is_published = true);

-- 4. Career Roadmaps RLS
CREATE POLICY "Users can manage their own career roadmaps"
ON career_roadmaps FOR ALL
USING (auth.uid() = user_id);

-- 5. Projects RLS
CREATE POLICY "Users can manage their own projects"
ON projects FOR ALL
USING (auth.uid() = user_id);

-- 6. Interview Progress RLS
CREATE POLICY "Users can manage their own interview progress"
ON interview_progress FOR ALL
USING (auth.uid() = user_id);

-- 7. Job Applications RLS
CREATE POLICY "Users can manage their own job applications"
ON job_applications FOR ALL
USING (auth.uid() = user_id);
