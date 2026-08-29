import { aiService } from '../services/aiService.js';

export async function generateSummary(req, res) {
  try {
    const { fullName, jobTitle, education, skills, experience, careerGoal } = req.body || {};
    
    const summaries = await aiService.generateResumeSummary({
      fullName,
      jobTitle,
      education,
      skills,
      experience,
      careerGoal
    });

    return res.status(200).json({
      success: true,
      data: summaries,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[AI Controller] Error in generateSummary:', error);
    return res.status(500).json({
      success: false,
      error: 'AI Generation Error',
      message: error.message || 'An unexpected error occurred while generating summary.'
    });
  }
}

export async function suggestSkills(req, res) {
  try {
    const { targetJobTitle, careerGoal } = req.body || {};
    
    const skillCategories = await aiService.suggestSkills({
      targetJobTitle,
      careerGoal
    });

    return res.status(200).json({
      success: true,
      data: skillCategories,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[AI Controller] Error in suggestSkills:', error);
    return res.status(500).json({
      success: false,
      error: 'Skill Suggestion Error',
      message: error.message || 'An unexpected error occurred while suggesting skills.'
    });
  }
}

export async function matchJobDescription(req, res) {
  try {
    const { jobDescription, resumeData } = req.body || {};
    
    const matchAnalysis = await aiService.matchJobDescription({
      jobDescription,
      resumeData
    });

    return res.status(200).json({
      success: true,
      data: matchAnalysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[AI Controller] Error in matchJobDescription:', error);
    return res.status(500).json({
      success: false,
      error: 'Job Matcher Error',
      message: error.message || 'An unexpected error occurred while analyzing job match.'
    });
  }
}

export function getHealth(req, res) {
  return res.status(200).json({
    status: 'healthy',
    service: 'ResuSphere AI Backend Engine',
    version: '1.0.0',
    security: {
      clientKeysExposed: false,
      environmentConfigured: Boolean(process.env.PORT)
    },
    uptimeSeconds: process.uptime()
  });
}
