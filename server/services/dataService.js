/**
 * Server-Side Unified Data Service Layer
 * Provides generic, migration-friendly CRUD operations across all user entities:
 * - Resumes
 * - Portfolios
 * - Career Roadmap Progress
 * - Project Guide Progress
 * - Interview Practice Progress
 * - Job Applications
 *
 * Enforces strict user tenant isolation by requiring `userId` for every operation.
 * Reads DATABASE_URL strictly from process.env (never exposed to clients).
 */

// In-memory tenant store fallback when DATABASE_URL is not yet connected
const mockTenantStore = {
  resumes: new Map(),
  portfolios: new Map(),
  roadmap: new Map(),
  projectGuide: new Map(),
  interviewPrep: new Map(),
  jobApplications: new Map()
};

export const dataService = {
  /**
   * Safe status check reporting if Cloud DB connection is configured
   */
  isDatabaseConfigured() {
    const dbUrl = (process.env.DATABASE_URL || '').trim();
    return Boolean(dbUrl && dbUrl !== 'postgres://user:pass@host:5432/db');
  },

  // ===========================================================================
  // 1. RESUMES CRUD
  // ===========================================================================
  async createResume(userId, resumeData) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const id = resumeData.id || `res-${Date.now()}`;
    const record = {
      id,
      user_id: userId,
      ...resumeData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockTenantStore.resumes.set(`${userId}:${id}`, record);
    return record;
  },

  async getResume(userId, resumeId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    return mockTenantStore.resumes.get(`${userId}:${resumeId}`) || null;
  },

  async updateResume(userId, resumeId, updatedFields) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${resumeId}`;
    const existing = mockTenantStore.resumes.get(key) || { id: resumeId, user_id: userId };
    const updated = {
      ...existing,
      ...updatedFields,
      updated_at: new Date().toISOString()
    };
    mockTenantStore.resumes.set(key, updated);
    return updated;
  },

  async deleteResume(userId, resumeId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${resumeId}`;
    const existed = mockTenantStore.resumes.has(key);
    mockTenantStore.resumes.delete(key);
    return { success: existed, id: resumeId };
  },

  async listResumes(userId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const records = [];
    for (const [key, value] of mockTenantStore.resumes.entries()) {
      if (key.startsWith(`${userId}:`)) {
        records.push(value);
      }
    }
    return records;
  },

  // ===========================================================================
  // 2. PORTFOLIOS CRUD
  // ===========================================================================
  async createPortfolio(userId, portfolioData) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const id = portfolioData.id || `port-${Date.now()}`;
    const record = {
      id,
      user_id: userId,
      ...portfolioData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockTenantStore.portfolios.set(`${userId}:${id}`, record);
    return record;
  },

  async getPortfolio(userId, portfolioId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    return mockTenantStore.portfolios.get(`${userId}:${portfolioId}`) || null;
  },

  async updatePortfolio(userId, portfolioId, updatedFields) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${portfolioId}`;
    const existing = mockTenantStore.portfolios.get(key) || { id: portfolioId, user_id: userId };
    const updated = {
      ...existing,
      ...updatedFields,
      updated_at: new Date().toISOString()
    };
    mockTenantStore.portfolios.set(key, updated);
    return updated;
  },

  async deletePortfolio(userId, portfolioId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${portfolioId}`;
    const existed = mockTenantStore.portfolios.delete(key);
    return { success: existed, id: portfolioId };
  },

  // ===========================================================================
  // 3. JOB APPLICATIONS CRUD & LIST
  // ===========================================================================
  async createJobApplication(userId, applicationData) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const id = applicationData.id || `job-${Date.now()}`;
    const record = {
      id,
      user_id: userId,
      company: applicationData.company || 'Company',
      job_title: applicationData.job_title || applicationData.jobTitle || 'Role',
      location: applicationData.location || '',
      job_url: applicationData.job_url || applicationData.jobUrl || '',
      status: applicationData.status || 'Applied',
      date_applied: applicationData.date_applied || applicationData.dateApplied || new Date().toISOString().split('T')[0],
      salary: applicationData.salary || '',
      notes: applicationData.notes || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockTenantStore.jobApplications.set(`${userId}:${id}`, record);
    return record;
  },

  async getJobApplication(userId, applicationId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    return mockTenantStore.jobApplications.get(`${userId}:${applicationId}`) || null;
  },

  async updateJobApplication(userId, applicationId, updatedFields) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${applicationId}`;
    const existing = mockTenantStore.jobApplications.get(key) || { id: applicationId, user_id: userId };
    const updated = {
      ...existing,
      ...updatedFields,
      updated_at: new Date().toISOString()
    };
    mockTenantStore.jobApplications.set(key, updated);
    return updated;
  },

  async deleteJobApplication(userId, applicationId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${applicationId}`;
    const existed = mockTenantStore.jobApplications.delete(key);
    return { success: existed, id: applicationId };
  },

  async listJobApplications(userId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const records = [];
    for (const [key, value] of mockTenantStore.jobApplications.entries()) {
      if (key.startsWith(`${userId}:`)) {
        records.push(value);
      }
    }
    return records;
  },

  // ===========================================================================
  // 4. ROADMAP, GUIDE, AND INTERVIEW PROGRESS CRUD
  // ===========================================================================
  async saveRoadmapProgress(userId, roleId, progressState) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${roleId}`;
    const record = {
      user_id: userId,
      role_id: roleId,
      milestone_states: progressState,
      updated_at: new Date().toISOString()
    };
    mockTenantStore.roadmap.set(key, record);
    return record;
  },

  async getRoadmapProgress(userId, roleId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${roleId}`;
    return mockTenantStore.roadmap.get(key) || null;
  },

  async saveProjectGuideProgress(userId, projectId, progressData) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${projectId}`;
    const record = {
      user_id: userId,
      project_id: projectId,
      ...progressData,
      updated_at: new Date().toISOString()
    };
    mockTenantStore.projectGuide.set(key, record);
    return record;
  },

  async getProjectGuideProgress(userId, projectId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${projectId}`;
    return mockTenantStore.projectGuide.get(key) || null;
  },

  async saveInterviewPrepProgress(userId, roleId, prepData) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${roleId}`;
    const record = {
      user_id: userId,
      role_id: roleId,
      ...prepData,
      updated_at: new Date().toISOString()
    };
    mockTenantStore.interviewPrep.set(key, record);
    return record;
  },

  async getInterviewPrepProgress(userId, roleId) {
    if (!userId) throw new Error('Tenant user ID is required.');
    const key = `${userId}:${roleId}`;
    return mockTenantStore.interviewPrep.get(key) || null;
  }
};
