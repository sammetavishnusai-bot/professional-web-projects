/**
 * ResuSphere AI API Client (Frontend Service Layer)
 * Securely communicates with our server-side /api/ai endpoints.
 * ZERO API keys are ever stored or transmitted from the browser.
 * Includes timeout guards, error management, and graceful rule-based fallbacks.
 */

import { aiEngine } from '../utils/aiEngine';

const API_BASE_URL = '/api/ai';
const DEFAULT_TIMEOUT_MS = 10000;

/**
 * Helper to execute fetch with timeout
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export const aiApiClient = {
  /**
   * Check backend server health status
   */
  async checkHealth() {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/health`, { method: 'GET' }, 3000);
      if (res.ok) {
        const data = await res.json();
        return { online: true, ...data };
      }
      return { online: false };
    } catch {
      return { online: false };
    }
  },

  /**
   * 1. Request AI Resume Summary from Backend
   */
  async generateSummary(payload) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/summary/generate`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return { data: json.data, source: 'backend' };
        }
      }
      
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `Server returned status ${res.status}`);
    } catch (err) {
      console.warn('[AI Client] Server endpoint unavailable, using resilient local engine fallback:', err.message);
      const localData = aiEngine.generateCustomResumeSummary(payload);
      return { data: localData, source: 'engine-fallback', error: err.message };
    }
  },

  /**
   * 2. Request AI Skill Suggestions from Backend
   */
  async suggestSkills(payload) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/skills/suggest`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return { data: json.data, source: 'backend' };
        }
      }
      
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `Server returned status ${res.status}`);
    } catch (err) {
      console.warn('[AI Client] Server endpoint unavailable, using resilient local engine fallback:', err.message);
      const localData = aiEngine.generateCategorizedSkillSuggestions(payload);
      return { data: localData, source: 'engine-fallback', error: err.message };
    }
  },

  /**
   * 3. Request AI Skill Gap Analysis from Backend
   */
  async analyzeSkillGap(payload) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/skills/gap-analysis`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return { data: json.data, source: 'backend' };
        }
      }

      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `Server returned status ${res.status}`);
    } catch (err) {
      console.warn('[AI Client] Server endpoint unavailable, using resilient fallback:', err.message);
      return { 
        data: {
          targetRole: payload.targetRole || 'Full Stack',
          readinessScore: 75,
          skillsIHave: payload.userSkills || [],
          skillsToImprove: ['TypeScript', 'Docker', 'Redis'],
          recommendations: []
        }, 
        source: 'engine-fallback', 
        error: err.message 
      };
    }
  },

  /**
   * 4. Request Project Recommendations from Backend
   */
  async recommendProjects(payload) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/projects/recommend`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return { data: json.data, source: 'backend' };
        }
      }

      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `Server returned status ${res.status}`);
    } catch (err) {
      console.warn('[AI Client] Server endpoint unavailable, using resilient fallback:', err.message);
      return { data: [], source: 'engine-fallback', error: err.message };
    }
  },

  /**
   * 5. Request Interview Question Generation from Backend
   */
  async generateInterviewQuestions(payload) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/interview/generate`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return { data: json.data, source: 'backend' };
        }
      }

      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `Server returned status ${res.status}`);
    } catch (err) {
      console.warn('[AI Client] Server endpoint unavailable, using resilient fallback:', err.message);
      return { data: null, source: 'engine-fallback', error: err.message };
    }
  },

  /**
   * 6. Request Job Description Match Analysis from Backend
   */
  async matchJobDescription(payload) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/job/match`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return { data: json.data, source: 'backend' };
        }
      }
      
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `Server returned status ${res.status}`);
    } catch (err) {
      console.warn('[AI Client] Server endpoint unavailable, using resilient fallback:', err.message);
      const localData = aiEngine.analyzeJobDescription(payload.jobDescription, payload.resumeData);
      return { data: localData, source: 'engine-fallback', error: err.message };
    }
  }
};
