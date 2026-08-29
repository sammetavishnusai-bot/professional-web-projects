/**
 * Request Validation Middleware for ResuSphere AI Server
 * Validates incoming payloads, prevents injection/malformed data, and returns clean error responses.
 */

export function validateSummaryRequest(req, res, next) {
  const { jobTitle, skills, experience } = req.body || {};

  if (!jobTitle && !skills && !experience) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'At least one field among "jobTitle", "skills", or "experience" must be provided.'
    });
  }

  // Character limit guards to prevent payload abuse
  if (jobTitle && typeof jobTitle === 'string' && jobTitle.length > 200) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: '"jobTitle" cannot exceed 200 characters.'
    });
  }

  if (experience && typeof experience === 'string' && experience.length > 2000) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: '"experience" cannot exceed 2000 characters.'
    });
  }

  next();
}

export function validateSkillsRequest(req, res, next) {
  const { targetJobTitle } = req.body || {};

  if (!targetJobTitle || typeof targetJobTitle !== 'string' || !targetJobTitle.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "targetJobTitle" is required and must be a non-empty string.'
    });
  }

  if (targetJobTitle.length > 200) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: '"targetJobTitle" cannot exceed 200 characters.'
    });
  }

  next();
}

export function validateSkillGapRequest(req, res, next) {
  const { targetRole, userSkills } = req.body || {};

  if (!targetRole || typeof targetRole !== 'string' || !targetRole.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "targetRole" is required.'
    });
  }

  if (userSkills && !Array.isArray(userSkills)) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: '"userSkills" must be an array of skill strings.'
    });
  }

  next();
}

export function validateProjectRecommendRequest(req, res, next) {
  const { targetRole } = req.body || {};

  if (!targetRole || typeof targetRole !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "targetRole" is required.'
    });
  }

  next();
}

export function validateInterviewGenRequest(req, res, next) {
  const { targetRole } = req.body || {};

  if (!targetRole || typeof targetRole !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "targetRole" is required.'
    });
  }

  next();
}

export function validateJobMatcherRequest(req, res, next) {
  const { jobDescription, resumeData } = req.body || {};

  if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length < 20) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "jobDescription" is required and must contain at least 20 characters.'
    });
  }

  if (jobDescription.length > 10000) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "jobDescription" cannot exceed 10,000 characters.'
    });
  }

  if (!resumeData || typeof resumeData !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Field "resumeData" is required and must be a valid resume object.'
    });
  }

  next();
}
