/**
 * Unified Data Access Repository Layer (ResuSphere AI)
 * Abstracted client service separating UI state from storage mechanisms.
 * Supports:
 * - Local storage persistence with tenant/user scoping
 * - Migration-friendly CRUD methods (create, read, update, delete, list)
 * - Seamless pluggability for Cloud Database / REST API endpoints
 * - Standardized response envelopes with loading, empty, and error handling
 */

const STORAGE_KEYS = {
  RESUME_PREFIX: 'resusphere_user_resume_',
  PORTFOLIO_PREFIX: 'resusphere_user_portfolio_',
  ROADMAP_PREFIX: 'resusphere_user_roadmap_',
  PROJECT_GUIDE_PREFIX: 'resusphere_user_project_guide_',
  INTERVIEW_PREP_PREFIX: 'resusphere_user_interview_prep_',
  JOB_APPLICATIONS_PREFIX: 'resusphere_user_job_apps_',
  SETTINGS_PREFIX: 'resusphere_user_settings_'
};

/**
 * Standard Response Envelope Helper
 */
function createResponse(data = null, error = null, loading = false) {
  return {
    data,
    error,
    loading,
    success: !error,
    timestamp: new Date().toISOString()
  };
}

export const dataStorageService = {
  /**
   * Determine storage key scoped to specific tenant/user
   */
  getScopedKey(prefix, userId = 'guest') {
    const cleanId = (userId || 'guest').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    return `${prefix}${cleanId}`;
  },

  // ===========================================================================
  // 1. RESUMES REPOSITORY (CRUD)
  // ===========================================================================
  async createResume(userId = 'guest', resumeData) {
    try {
      const id = resumeData.id || `res-${Date.now()}`;
      const record = {
        id,
        userId,
        ...resumeData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const key = this.getScopedKey(STORAGE_KEYS.RESUME_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(record));
      localStorage.setItem('resusphere_data_v2', JSON.stringify(record));
      return createResponse(record);
    } catch (e) {
      console.error('[DataStorage] Error creating resume:', e);
      return createResponse(null, e.message);
    }
  },

  async readResume(userId = 'guest') {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.RESUME_PREFIX, userId);
      const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_data_v2');
      if (saved) {
        return createResponse(JSON.parse(saved));
      }
      return createResponse(null); // Empty state
    } catch (e) {
      console.warn('[DataStorage] Error reading resume:', e);
      return createResponse(null, e.message);
    }
  },

  async updateResume(userId = 'guest', updatedFields) {
    try {
      const existingRes = await this.readResume(userId);
      const existing = existingRes.data || { userId };
      const updated = {
        ...existing,
        ...updatedFields,
        updatedAt: new Date().toISOString()
      };
      const key = this.getScopedKey(STORAGE_KEYS.RESUME_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(updated));
      localStorage.setItem('resusphere_data_v2', JSON.stringify(updated));
      return createResponse(updated);
    } catch (e) {
      console.error('[DataStorage] Error updating resume:', e);
      return createResponse(null, e.message);
    }
  },

  async deleteResume(userId = 'guest') {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.RESUME_PREFIX, userId);
      localStorage.removeItem(key);
      localStorage.removeItem('resusphere_data_v2');
      return createResponse({ deleted: true });
    } catch (e) {
      return createResponse(null, e.message);
    }
  },

  // ===========================================================================
  // 2. PORTFOLIOS REPOSITORY (CRUD)
  // ===========================================================================
  async createPortfolio(userId = 'guest', portfolioData) {
    try {
      const id = portfolioData.id || `port-${Date.now()}`;
      const record = {
        id,
        userId,
        ...portfolioData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const key = this.getScopedKey(STORAGE_KEYS.PORTFOLIO_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(record));
      localStorage.setItem('resusphere_portfolio_v2', JSON.stringify(record));
      return createResponse(record);
    } catch (e) {
      return createResponse(null, e.message);
    }
  },

  async readPortfolio(userId = 'guest') {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.PORTFOLIO_PREFIX, userId);
      const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_portfolio_v2');
      if (saved) {
        return createResponse(JSON.parse(saved));
      }
      return createResponse(null); // Empty state
    } catch (e) {
      return createResponse(null, e.message);
    }
  },

  async updatePortfolio(userId = 'guest', updatedFields) {
    try {
      const existingRes = await this.readPortfolio(userId);
      const existing = existingRes.data || { userId };
      const updated = {
        ...existing,
        ...updatedFields,
        updatedAt: new Date().toISOString()
      };
      const key = this.getScopedKey(STORAGE_KEYS.PORTFOLIO_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(updated));
      localStorage.setItem('resusphere_portfolio_v2', JSON.stringify(updated));
      return createResponse(updated);
    } catch (e) {
      return createResponse(null, e.message);
    }
  },

  async deletePortfolio(userId = 'guest') {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.PORTFOLIO_PREFIX, userId);
      localStorage.removeItem(key);
      localStorage.removeItem('resusphere_portfolio_v2');
      return createResponse({ deleted: true });
    } catch (e) {
      return createResponse(null, e.message);
    }
  },

  // ===========================================================================
  // 3. JOB APPLICATIONS REPOSITORY (CRUD & LIST)
  // ===========================================================================
  async listJobApplications(userId = 'guest') {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.JOB_APPLICATIONS_PREFIX, userId);
      const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_job_applications_v1');
      if (saved) {
        const apps = JSON.parse(saved);
        return createResponse(Array.isArray(apps) ? apps : []);
      }
      return createResponse([]);
    } catch (e) {
      return createResponse([], e.message);
    }
  },

  async createJobApplication(userId = 'guest', application) {
    try {
      const listRes = await this.listJobApplications(userId);
      const list = listRes.data || [];
      const id = application.id || `app-${Date.now()}`;
      const record = {
        id,
        userId,
        company: application.company || '',
        jobTitle: application.jobTitle || '',
        location: application.location || '',
        jobUrl: application.jobUrl || '',
        status: application.status || 'Applied',
        dateApplied: application.dateApplied || new Date().toISOString().split('T')[0],
        salary: application.salary || '',
        notes: application.notes || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedList = [record, ...list];
      const key = this.getScopedKey(STORAGE_KEYS.JOB_APPLICATIONS_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(updatedList));
      localStorage.setItem('resusphere_job_applications_v1', JSON.stringify(updatedList));
      return createResponse(record);
    } catch (e) {
      return createResponse(null, e.message);
    }
  },

  async updateJobApplication(userId = 'guest', applicationId, updatedFields) {
    try {
      const listRes = await this.listJobApplications(userId);
      const list = listRes.data || [];
      const updatedList = list.map(app => 
        app.id === applicationId ? { ...app, ...updatedFields, updatedAt: new Date().toISOString() } : app
      );
      const key = this.getScopedKey(STORAGE_KEYS.JOB_APPLICATIONS_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(updatedList));
      localStorage.setItem('resusphere_job_applications_v1', JSON.stringify(updatedList));
      return createResponse(updatedList.find(a => a.id === applicationId) || null);
    } catch (e) {
      return createResponse(null, e.message);
    }
  },

  async deleteJobApplication(userId = 'guest', applicationId) {
    try {
      const listRes = await this.listJobApplications(userId);
      const list = listRes.data || [];
      const filtered = list.filter(app => app.id !== applicationId);
      const key = this.getScopedKey(STORAGE_KEYS.JOB_APPLICATIONS_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(filtered));
      localStorage.setItem('resusphere_job_applications_v1', JSON.stringify(filtered));
      return createResponse({ deleted: true, id: applicationId });
    } catch (e) {
      return createResponse(null, e.message);
    }
  },

  // ===========================================================================
  // 4. CAREER ROADMAP & GUIDES REPOSITORY
  // ===========================================================================
  async saveRoadmapProgress(userId = 'guest', progressState) {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.ROADMAP_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(progressState));
      localStorage.setItem('resusphere_roadmap_progress_v1', JSON.stringify(progressState));
      return createResponse(progressState);
    } catch (e) {
      return createResponse(null, e.message);
    }
  },

  async readRoadmapProgress(userId = 'guest') {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.ROADMAP_PREFIX, userId);
      const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_roadmap_progress_v1');
      return createResponse(saved ? JSON.parse(saved) : {});
    } catch (e) {
      return createResponse({}, e.message);
    }
  },

  // ===========================================================================
  // 5. USER ASSETS INDEX (DASHBOARD)
  // ===========================================================================
  async getUserAssets(userId = 'guest', currentResume = null, currentPortfolio = null) {
    const resumeRes = currentResume ? { data: currentResume } : await this.readResume(userId);
    const portfolioRes = currentPortfolio ? { data: currentPortfolio } : await this.readPortfolio(userId);
    const resume = resumeRes.data;
    const portfolio = portfolioRes.data;

    return {
      resumes: resume ? [
        {
          id: resume.id || 'res-primary',
          title: `${resume.personalInfo?.fullName || 'My'} Resume`,
          role: resume.personalInfo?.title || 'Professional',
          lastModified: resume.updatedAt || new Date().toISOString(),
          sectionsCount: (resume.experience?.length || 0) + (resume.skills?.length || 0) + (resume.projects?.length || 0),
          isPrimary: true
        }
      ] : [],
      portfolios: portfolio ? [
        {
          id: portfolio.id || 'port-primary',
          title: `${portfolio.fullName || 'My'} Portfolio Site`,
          slug: portfolio.fullName?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'developer',
          lastModified: portfolio.updatedAt || new Date().toISOString(),
          projectsCount: portfolio.projects?.length || 0,
          isLive: true
        }
      ] : []
    };
  }
};
