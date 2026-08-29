/**
 * ResuSphere AI API Client
 * Securely communicates with the backend /api/ai endpoints.
 * Includes timeout handling, error logging, and resilient fallback.
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
   * Request AI Resume Summary from Backend
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
      console.warn('[AI Client] Backend unavailable or failed, utilizing resilient engine fallback:', err.message);
      // Resilient fallback to local engine
      const localData = aiEngine.generateCustomResumeSummary(payload);
      return { data: localData, source: 'engine-fallback', error: err.message };
    }
  },

  /**
   * Request AI Skill Suggestions from Backend
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
      console.warn('[AI Client] Backend unavailable or failed, utilizing resilient engine fallback:', err.message);
      const localData = aiEngine.generateCategorizedSkillSuggestions(payload);
      return { data: localData, source: 'engine-fallback', error: err.message };
    }
  },

  /**
   * Request Job Description Match Analysis from Backend
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
      console.warn('[AI Client] Backend unavailable or failed, utilizing resilient engine fallback:', err.message);
      const localData = aiEngine.analyzeJobDescription(payload.jobDescription, payload.resumeData);
      return { data: localData, source: 'engine-fallback', error: err.message };
    }
  }
};
