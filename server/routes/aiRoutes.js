import { Router } from 'express';
import { 
  generateSummary, 
  suggestSkills, 
  matchJobDescription, 
  getHealth 
} from '../controllers/aiController.js';
import { 
  validateSummaryRequest, 
  validateSkillsRequest, 
  validateJobMatcherRequest 
} from '../middleware/validator.js';

const router = Router();

// Health Check & Security Status
router.get('/health', getHealth);

// AI Resume Summary Generation
router.post('/summary/generate', validateSummaryRequest, generateSummary);

// AI Skill Suggestions
router.post('/skills/suggest', validateSkillsRequest, suggestSkills);

// AI Job Description Matcher & Gap Analysis
router.post('/job/match', validateJobMatcherRequest, matchJobDescription);

export default router;
