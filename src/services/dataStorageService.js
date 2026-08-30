/**
 * Unified Data Access Repository Layer (ResuSphere AI)
 * Connects to Supabase Cloud PostgreSQL when configured (using public anon key only).
 * Automatically falls back to scoped localStorage persistence when Supabase is unconfigured or offline.
 *
 * Handles:
 * - profiles
 * - resumes
 * - portfolios
 * - career_roadmaps
 * - projects
 * - interview_progress
 * - job_applications
 */

import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  RESUME_PREFIX: 'resusphere_user_resume_',
  PORTFOLIO_PREFIX: 'resusphere_user_portfolio_',
  ROADMAP_PREFIX: 'resusphere_user_roadmap_',
  PROJECT_GUIDE_PREFIX: 'resusphere_user_project_guide_',
  INTERVIEW_PREP_PREFIX: 'resusphere_user_interview_prep_',
  JOB_APPLICATIONS_PREFIX: 'resusphere_user_job_apps_',
  PROFILE_PREFIX: 'resusphere_user_profile_'
};

/**
 * Standard Response Envelope Helper
 */
function createResponse(data = null, error = null, source = 'local') {
  return {
    data,
    error,
    source,
    success: !error,
    timestamp: new Date().toISOString()
  };
}

export const dataStorageService = {
  /**
   * Safe status check
   */
  isCloudConnected() {
    return isSupabaseConfigured();
  },

  /**
   * Determine storage key scoped to specific user/guest
   */
  getScopedKey(prefix, userId = 'guest') {
    const cleanId = (userId || 'guest').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    return `${prefix}${cleanId}`;
  },

  // ===========================================================================
  // 1. PROFILES (CRUD)
  // ===========================================================================
  async getProfile(userId = 'guest') {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase getProfile failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.PROFILE_PREFIX, userId);
    const saved = localStorage.getItem(key);
    return createResponse(saved ? JSON.parse(saved) : null, null, 'local');
  },

  async upsertProfile(userId = 'guest', profileData) {
    const record = {
      id: userId,
      email: profileData.email || '',
      full_name: profileData.name || profileData.fullName || 'User',
      avatar_url: profileData.avatar || profileData.avatarUrl || '',
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .upsert(record)
          .select()
          .single();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase upsertProfile failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.PROFILE_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(record));
    return createResponse(record, null, 'local');
  },

  // ===========================================================================
  // 2. RESUMES (CRUD)
  // ===========================================================================
  async createResume(userId = 'guest', resumeData) {
    const id = resumeData.id || `res-${Date.now()}`;
    const record = {
      id,
      user_id: userId,
      title: resumeData.title || `${resumeData.personalInfo?.fullName || 'My'} Resume`,
      personal_info: resumeData.personalInfo || {},
      experience: resumeData.experience || [],
      education: resumeData.education || [],
      skills: resumeData.skills || [],
      projects: resumeData.projects || [],
      certifications: resumeData.certifications || [],
      languages: resumeData.languages || [],
      settings: resumeData.settings || {},
      is_primary: resumeData.isPrimary !== undefined ? resumeData.isPrimary : true,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .insert(record)
          .select()
          .single();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase createResume failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.RESUME_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(resumeData));
    localStorage.setItem('resusphere_data_v2', JSON.stringify(resumeData));
    return createResponse(record, null, 'local');
  },

  async readResume(userId = 'guest') {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', userId)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && data) {
          // Map DB columns to client state format
          const formatted = {
            id: data.id,
            personalInfo: data.personal_info,
            experience: data.experience,
            education: data.education,
            skills: data.skills,
            projects: data.projects,
            certifications: data.certifications,
            languages: data.languages,
            settings: data.settings
          };
          return createResponse(formatted, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase readResume failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.RESUME_PREFIX, userId);
    const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_data_v2');
    return createResponse(saved ? JSON.parse(saved) : null, null, 'local');
  },

  async updateResume(userId = 'guest', updatedResumeData) {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const payload = {
          personal_info: updatedResumeData.personalInfo,
          experience: updatedResumeData.experience,
          education: updatedResumeData.education,
          skills: updatedResumeData.skills,
          projects: updatedResumeData.projects,
          certifications: updatedResumeData.certifications,
          languages: updatedResumeData.languages,
          settings: updatedResumeData.settings,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('resumes')
          .update(payload)
          .eq('user_id', userId)
          .select();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase updateResume failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.RESUME_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(updatedResumeData));
    localStorage.setItem('resusphere_data_v2', JSON.stringify(updatedResumeData));
    return createResponse(updatedResumeData, null, 'local');
  },

  // ===========================================================================
  // 3. PORTFOLIOS (CRUD)
  // ===========================================================================
  async createPortfolio(userId = 'guest', portfolioData) {
    const id = portfolioData.id || `port-${Date.now()}`;
    const record = {
      id,
      user_id: userId,
      full_name: portfolioData.fullName || 'Developer',
      headline: portfolioData.headline || '',
      bio: portfolioData.bio || '',
      avatar_url: portfolioData.avatar || '',
      theme: portfolioData.theme || 'modern',
      contact_email: portfolioData.email || '',
      github_url: portfolioData.github || '',
      linkedin_url: portfolioData.linkedin || '',
      skills: portfolioData.skills || [],
      education: portfolioData.education || [],
      projects: portfolioData.projects || [],
      achievements: portfolioData.achievements || [],
      certifications: portfolioData.certifications || [],
      is_published: true,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .insert(record)
          .select()
          .single();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase createPortfolio failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.PORTFOLIO_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(portfolioData));
    localStorage.setItem('resusphere_portfolio_v2', JSON.stringify(portfolioData));
    return createResponse(record, null, 'local');
  },

  async readPortfolio(userId = 'guest') {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('user_id', userId)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && data) {
          const formatted = {
            id: data.id,
            fullName: data.full_name,
            headline: data.headline,
            bio: data.bio,
            avatar: data.avatar_url,
            theme: data.theme,
            email: data.contact_email,
            github: data.github_url,
            linkedin: data.linkedin_url,
            skills: data.skills,
            education: data.education,
            projects: data.projects,
            achievements: data.achievements,
            certifications: data.certifications
          };
          return createResponse(formatted, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase readPortfolio failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.PORTFOLIO_PREFIX, userId);
    const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_portfolio_v2');
    return createResponse(saved ? JSON.parse(saved) : null, null, 'local');
  },

  async updatePortfolio(userId = 'guest', updatedPortfolioData) {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const payload = {
          full_name: updatedPortfolioData.fullName,
          headline: updatedPortfolioData.headline,
          bio: updatedPortfolioData.bio,
          avatar_url: updatedPortfolioData.avatar,
          theme: updatedPortfolioData.theme,
          contact_email: updatedPortfolioData.email,
          github_url: updatedPortfolioData.github,
          linkedin_url: updatedPortfolioData.linkedin,
          skills: updatedPortfolioData.skills,
          education: updatedPortfolioData.education,
          projects: updatedPortfolioData.projects,
          achievements: updatedPortfolioData.achievements,
          certifications: updatedPortfolioData.certifications,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('portfolios')
          .update(payload)
          .eq('user_id', userId)
          .select();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase updatePortfolio failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.PORTFOLIO_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(updatedPortfolioData));
    localStorage.setItem('resusphere_portfolio_v2', JSON.stringify(updatedPortfolioData));
    return createResponse(updatedPortfolioData, null, 'local');
  },

  // ===========================================================================
  // 4. CAREER ROADMAPS (CRUD)
  // ===========================================================================
  async saveRoadmapProgress(userId = 'guest', roleId = 'frontend', milestoneStates = {}) {
    const record = {
      user_id: userId,
      role_id: roleId,
      milestone_states: milestoneStates,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('career_roadmaps')
          .upsert(record, { onConflict: 'user_id,role_id' })
          .select()
          .single();

        if (!error && data) {
          return createResponse(data.milestone_states, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase saveRoadmapProgress failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.ROADMAP_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(milestoneStates));
    localStorage.setItem('resusphere_roadmap_progress_v1', JSON.stringify(milestoneStates));
    return createResponse(milestoneStates, null, 'local');
  },

  async readRoadmapProgress(userId = 'guest', roleId = 'frontend') {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('career_roadmaps')
          .select('*')
          .eq('user_id', userId)
          .eq('role_id', roleId)
          .single();

        if (!error && data) {
          return createResponse(data.milestone_states, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase readRoadmapProgress failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.ROADMAP_PREFIX, userId);
    const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_roadmap_progress_v1');
    return createResponse(saved ? JSON.parse(saved) : {}, null, 'local');
  },

  // ===========================================================================
  // 5. PROJECTS (CRUD)
  // ===========================================================================
  async saveProjectProgress(userId = 'guest', projectSlug, projectData) {
    const record = {
      user_id: userId,
      project_slug: projectSlug,
      title: projectData.title || projectSlug,
      difficulty: projectData.difficulty || 'Intermediate',
      tech_stack: projectData.techStack || [],
      short_description: projectData.shortDescription || '',
      completed_tasks: projectData.completedTasks || {},
      progress_percent: projectData.progressPercent || 0,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('projects')
          .upsert(record, { onConflict: 'user_id,project_slug' })
          .select()
          .single();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase saveProjectProgress failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.PROJECT_GUIDE_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(projectData.completedTasks || {}));
    localStorage.setItem('resusphere_project_guide_progress_v1', JSON.stringify(projectData.completedTasks || {}));
    return createResponse(record, null, 'local');
  },

  async readProjectProgress(userId = 'guest', projectSlug) {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', userId)
          .eq('project_slug', projectSlug)
          .single();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase readProjectProgress failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.PROJECT_GUIDE_PREFIX, userId);
    const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_project_guide_progress_v1');
    return createResponse({ completedTasks: saved ? JSON.parse(saved) : {} }, null, 'local');
  },

  // ===========================================================================
  // 6. INTERVIEW PROGRESS (CRUD)
  // ===========================================================================
  async saveInterviewProgress(userId = 'guest', roleId = 'fullstack', questionStates = {}, overallProgress = 0) {
    const record = {
      user_id: userId,
      role_id: roleId,
      question_states: questionStates,
      overall_progress: overallProgress,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('interview_progress')
          .upsert(record, { onConflict: 'user_id,role_id' })
          .select()
          .single();

        if (!error && data) {
          return createResponse(data.question_states, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase saveInterviewProgress failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.INTERVIEW_PREP_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(questionStates));
    localStorage.setItem('resusphere_interview_prep_progress_v1', JSON.stringify(questionStates));
    return createResponse(questionStates, null, 'local');
  },

  async readInterviewProgress(userId = 'guest', roleId = 'fullstack') {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('interview_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('role_id', roleId)
          .single();

        if (!error && data) {
          return createResponse(data.question_states, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase readInterviewProgress failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.INTERVIEW_PREP_PREFIX, userId);
    const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_interview_prep_progress_v1');
    return createResponse(saved ? JSON.parse(saved) : {}, null, 'local');
  },

  // ===========================================================================
  // 7. JOB APPLICATIONS (CRUD & LIST)
  // ===========================================================================
  async listJobApplications(userId = 'guest') {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('job_applications')
          .select('*')
          .eq('user_id', userId)
          .order('date_applied', { ascending: false });

        if (!error && data) {
          const formatted = data.map(app => ({
            id: app.id,
            userId: app.user_id,
            company: app.company,
            jobTitle: app.job_title,
            location: app.location,
            jobUrl: app.job_url,
            status: app.status,
            dateApplied: app.date_applied,
            salary: app.salary,
            notes: app.notes
          }));
          return createResponse(formatted, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase listJobApplications failed, using local:', err.message);
      }
    }

    const key = this.getScopedKey(STORAGE_KEYS.JOB_APPLICATIONS_PREFIX, userId);
    const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_job_applications_v1');
    return createResponse(saved ? JSON.parse(saved) : [], null, 'local');
  },

  async createJobApplication(userId = 'guest', application) {
    const id = application.id || `app-${Date.now()}`;
    const record = {
      id,
      user_id: userId,
      company: application.company || '',
      job_title: application.jobTitle || '',
      location: application.location || '',
      job_url: application.jobUrl || '',
      status: application.status || 'Applied',
      date_applied: application.dateApplied || new Date().toISOString().split('T')[0],
      salary: application.salary || '',
      notes: application.notes || '',
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { data, error } = await supabase
          .from('job_applications')
          .insert(record)
          .select()
          .single();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase createJobApplication failed, using local:', err.message);
      }
    }

    const listRes = await this.listJobApplications(userId);
    const list = listRes.data || [];
    const clientRecord = {
      id,
      userId,
      company: application.company || '',
      jobTitle: application.jobTitle || '',
      location: application.location || '',
      jobUrl: application.jobUrl || '',
      status: application.status || 'Applied',
      dateApplied: application.dateApplied || new Date().toISOString().split('T')[0],
      salary: application.salary || '',
      notes: application.notes || ''
    };
    const updatedList = [clientRecord, ...list];
    const key = this.getScopedKey(STORAGE_KEYS.JOB_APPLICATIONS_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(updatedList));
    localStorage.setItem('resusphere_job_applications_v1', JSON.stringify(updatedList));
    return createResponse(clientRecord, null, 'local');
  },

  async updateJobApplication(userId = 'guest', applicationId, updatedFields) {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const payload = {
          company: updatedFields.company,
          job_title: updatedFields.jobTitle,
          location: updatedFields.location,
          job_url: updatedFields.jobUrl,
          status: updatedFields.status,
          date_applied: updatedFields.dateApplied,
          salary: updatedFields.salary,
          notes: updatedFields.notes,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('job_applications')
          .update(payload)
          .eq('id', applicationId)
          .eq('user_id', userId)
          .select()
          .single();

        if (!error && data) {
          return createResponse(data, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase updateJobApplication failed, using local:', err.message);
      }
    }

    const listRes = await this.listJobApplications(userId);
    const list = listRes.data || [];
    const updatedList = list.map(app => 
      app.id === applicationId ? { ...app, ...updatedFields } : app
    );
    const key = this.getScopedKey(STORAGE_KEYS.JOB_APPLICATIONS_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(updatedList));
    localStorage.setItem('resusphere_job_applications_v1', JSON.stringify(updatedList));
    return createResponse(updatedList.find(a => a.id === applicationId) || null, null, 'local');
  },

  async deleteJobApplication(userId = 'guest', applicationId) {
    if (isSupabaseConfigured() && supabase && userId !== 'guest') {
      try {
        const { error } = await supabase
          .from('job_applications')
          .delete()
          .eq('id', applicationId)
          .eq('user_id', userId);

        if (!error) {
          return createResponse({ deleted: true, id: applicationId }, null, 'supabase');
        }
      } catch (err) {
        console.warn('[DataStorage] Supabase deleteJobApplication failed, using local:', err.message);
      }
    }

    const listRes = await this.listJobApplications(userId);
    const list = listRes.data || [];
    const filtered = list.filter(app => app.id !== applicationId);
    const key = this.getScopedKey(STORAGE_KEYS.JOB_APPLICATIONS_PREFIX, userId);
    localStorage.setItem(key, JSON.stringify(filtered));
    localStorage.setItem('resusphere_job_applications_v1', JSON.stringify(filtered));
    return createResponse({ deleted: true, id: applicationId }, null, 'local');
  }
};
