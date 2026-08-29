/**
 * Unified Data Storage & Cloud Migration Service
 * Abstracted repository layer separating storage mechanism from UI components.
 * Works seamlessly with local storage (scoped per user or guest) and is structured
 * for immediate plug-and-play connection to any future Cloud Database (Supabase / Firebase / REST API).
 */

const STORAGE_KEYS = {
  RESUME_PREFIX: 'resusphere_user_resume_',
  PORTFOLIO_PREFIX: 'resusphere_user_portfolio_',
  SETTINGS_PREFIX: 'resusphere_user_settings_',
  ASSETS_INDEX: 'resusphere_assets_index_'
};

export const dataStorageService = {
  /**
   * Determine storage key based on active user
   */
  getScopedKey(prefix, userId = 'guest') {
    return `${prefix}${userId}`;
  },

  /**
   * Load Resume Data for specific user or guest
   */
  async loadResume(userId = 'guest') {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.RESUME_PREFIX, userId);
      const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_data_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('[DataStorage] Failed to load resume:', e);
    }
    return null;
  },

  /**
   * Save Resume Data for specific user or guest
   */
  async saveResume(userId = 'guest', resumeData) {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.RESUME_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(resumeData));
      // Also maintain legacy key for backward compatibility
      localStorage.setItem('resusphere_data_v2', JSON.stringify(resumeData));
      return { success: true, timestamp: new Date().toISOString() };
    } catch (e) {
      console.error('[DataStorage] Failed to save resume:', e);
      return { success: false, error: e.message };
    }
  },

  /**
   * Load Portfolio Data
   */
  async loadPortfolio(userId = 'guest') {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.PORTFOLIO_PREFIX, userId);
      const saved = localStorage.getItem(key) || localStorage.getItem('resusphere_portfolio_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('[DataStorage] Failed to load portfolio:', e);
    }
    return null;
  },

  /**
   * Save Portfolio Data
   */
  async savePortfolio(userId = 'guest', portfolioData) {
    try {
      const key = this.getScopedKey(STORAGE_KEYS.PORTFOLIO_PREFIX, userId);
      localStorage.setItem(key, JSON.stringify(portfolioData));
      localStorage.setItem('resusphere_portfolio_v2', JSON.stringify(portfolioData));
      return { success: true, timestamp: new Date().toISOString() };
    } catch (e) {
      console.error('[DataStorage] Failed to save portfolio:', e);
      return { success: false, error: e.message };
    }
  },

  /**
   * Get user asset summaries for Dashboard
   */
  async getUserAssets(userId = 'guest', currentResume = null, currentPortfolio = null) {
    const resume = currentResume || await this.loadResume(userId);
    const portfolio = currentPortfolio || await this.loadPortfolio(userId);

    return {
      resumes: resume ? [
        {
          id: 'res-primary',
          title: `${resume.personalInfo?.fullName || 'My'} Resume`,
          role: resume.personalInfo?.title || 'Professional',
          lastModified: new Date().toISOString(),
          sectionsCount: (resume.experience?.length || 0) + (resume.skills?.length || 0) + (resume.projects?.length || 0),
          isPrimary: true
        }
      ] : [],
      portfolios: portfolio ? [
        {
          id: 'port-primary',
          title: `${portfolio.fullName || 'My'} Portfolio Site`,
          slug: portfolio.fullName?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'developer',
          lastModified: new Date().toISOString(),
          projectsCount: portfolio.projects?.length || 0,
          isLive: true
        }
      ] : []
    };
  }
};
