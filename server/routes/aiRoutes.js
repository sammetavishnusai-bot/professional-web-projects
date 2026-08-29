import { Router } from 'express';
import { 
  generateSummary, 
  suggestSkills, 
  analyzeSkillGap,
  recommendProjects,
  generateInterviewQuestions,
  matchJobDescription, 
  getHealth 
} from '../controllers/aiController.js';
import { 
  validateSummaryRequest, 
  validateSkillsRequest, 
  validateSkillGapRequest,
  validateProjectRecommendRequest,
  validateInterviewGenRequest,
  validateJobMatcherRequest 
} from '../middleware/validator.js';

const router = Router();

// Health Check & Security Status
router.get('/health', getHealth);

// 1. AI Resume Summary Generation
router.post('/summary/generate', validateSummaryRequest, generateSummary);

// 2. AI Skill Suggestions
router.post('/skills/suggest', validateSkillsRequest, suggestSkills);

// 3. AI Skill Gap Analysis
router.post('/skills/gap-analysis', validateSkillGapRequest, analyzeSkillGap);

// 4. AI Project Recommendations
router.post('/projects/recommend', validateProjectRecommendRequest, recommendProjects);

// 5. AI Interview Question Formulation
router.post('/interview/generate', validateInterviewGenRequest, generateInterviewQuestions);

// 6. AI Job Description Matcher & Keyword Gap Analysis
router.post('/job/match', validateJobMatcherRequest, matchJobDescription);

export default router;
