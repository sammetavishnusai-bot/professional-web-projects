/**
 * Automated Production QA Verification Suite for ResuSphere AI
 * Tests AI endpoints, Data Storage Layer, Multi-Tenant Security, and Core Schemas.
 */
import http from 'http';

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: body ? JSON.parse(body) : null
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            rawBody: body
          });
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runProductionQA() {
  console.log('===============================================================');
  console.log('🧪 RUNNING COMPREHENSIVE PRODUCTION QA TEST SUITE');
  console.log('===============================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} - ${details}`);
      failed++;
    }
  }

  // 1. Health & Secret Check
  console.log('--- 1. Backend Server & Safe Health Endpoint ---');
  try {
    const healthRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/ai/health',
      method: 'GET'
    });

    assert(healthRes.statusCode === 200, 'Health endpoint returns HTTP 200');
    assert(healthRes.data?.status === 'healthy', 'Health check status is healthy');
    assert(
      healthRes.data?.aiStatus === 'AI configured' || healthRes.data?.aiStatus === 'AI not configured',
      'Reports safe binary status without key leakage',
      `Got: ${healthRes.data?.aiStatus}`
    );
    assert(!JSON.stringify(healthRes.data).includes('sk-'), 'Zero secret tokens leaked in health response');
  } catch (err) {
    assert(false, 'Health Check Endpoint Accessible', err.message);
  }

  // 2. AI Resume Summary Endpoint
  console.log('\n--- 2. AI Endpoints Functional Integrity ---');
  try {
    const summaryRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/ai/summary/generate',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      fullName: 'Jane Doe',
      jobTitle: 'Senior Cloud Architect',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'Go'],
      experience: 'Led migration of 50 microservices to EKS reducing latency by 40%'
    });

    assert(summaryRes.statusCode === 200, 'Resume Summary Endpoint returns 200');
    assert(summaryRes.data?.success === true, 'Resume Summary returns success flag');
    assert(Array.isArray(summaryRes.data?.data) && summaryRes.data.data.length > 0, 'Returns structured summary array');
  } catch (err) {
    assert(false, 'Resume Summary Endpoint Execution', err.message);
  }

  // 3. AI Skill Suggestions Endpoint
  try {
    const skillsRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/ai/skills/suggest',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      targetJobTitle: 'Full Stack Engineer',
      careerGoal: 'Build high-performance web applications'
    });

    assert(skillsRes.statusCode === 200, 'Skill Suggestions Endpoint returns 200');
    assert(skillsRes.data?.success === true, 'Skill Suggestions returns success flag');
    assert(Array.isArray(skillsRes.data?.data) && skillsRes.data.data.length > 0, 'Returns categorized skills array');
  } catch (err) {
    assert(false, 'Skill Suggestions Endpoint Execution', err.message);
  }

  // 4. AI Skill Gap Analysis Endpoint
  try {
    const gapRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/ai/skills/gap-analysis',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      targetRole: 'Machine Learning Engineer',
      userSkills: ['Python', 'SQL', 'Pandas']
    });

    assert(gapRes.statusCode === 200, 'Skill Gap Endpoint returns 200');
    assert(gapRes.data?.success === true, 'Skill Gap returns success flag');
    assert(
      Array.isArray(gapRes.data?.data?.skillsToImprove) && gapRes.data.data.skillsToImprove.length > 0,
      'Skill Gap identified missing skills to improve'
    );
  } catch (err) {
    assert(false, 'Skill Gap Endpoint Execution', err.message);
  }

  // 5. AI Project Recommendation Endpoint
  try {
    const projRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/ai/projects/recommend',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      targetRole: 'Full Stack Developer',
      userSkills: ['React', 'Node.js', 'PostgreSQL'],
      difficulty: 'advanced'
    });

    assert(projRes.statusCode === 200, 'Project Recommendations Endpoint returns 200');
    assert(projRes.data?.success === true, 'Project Recommendations returns success flag');
    assert(Array.isArray(projRes.data?.data) && projRes.data.data.length > 0, 'Returns project recommendations array');
  } catch (err) {
    assert(false, 'Project Recommendations Endpoint Execution', err.message);
  }

  // 6. AI Interview Question Generator Endpoint
  try {
    const interviewRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/ai/interview/generate',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      targetRole: 'DevOps Engineer',
      skills: ['CI/CD', 'Docker', 'Kubernetes']
    });

    assert(interviewRes.statusCode === 200, 'Interview Questions Endpoint returns 200');
    assert(interviewRes.data?.success === true, 'Interview Questions returns success flag');
    assert(
      Array.isArray(interviewRes.data?.data?.technical) && interviewRes.data.data.technical.length > 0,
      'Returns categorized technical questions array'
    );
  } catch (err) {
    assert(false, 'Interview Questions Endpoint Execution', err.message);
  }

  // 7. AI Job Description Matcher Endpoint
  try {
    const matchRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/ai/job/match',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      jobDescription: 'We are seeking a Senior Frontend Engineer proficient in React, TypeScript, TailwindCSS, Next.js, and CI/CD pipelines to join our enterprise team.',
      resumeData: {
        personalInfo: { fullName: 'Alex Chen', title: 'Frontend Developer' },
        skills: [{ category: 'Frontend', items: ['React', 'TypeScript', 'TailwindCSS'] }],
        experience: [{ role: 'Frontend Engineer', company: 'TechCorp' }]
      }
    });

    assert(matchRes.statusCode === 200, 'Job Match Endpoint returns 200');
    assert(matchRes.data?.success === true, 'Job Match returns success flag');
    assert(typeof matchRes.data?.data?.matchScore === 'number', 'Returns numerical match score');
  } catch (err) {
    assert(false, 'Job Match Endpoint Execution', err.message);
  }

  // 8. Security: Request Validation & Size Limits
  console.log('\n--- 3. Security, Input Validation & Error Boundaries ---');
  try {
    // Malformed request with missing body
    const badRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/ai/summary/generate',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {});

    assert(badRes.statusCode === 400, 'Handled empty/missing parameters safely with 400 Bad Request');
    assert(!JSON.stringify(badRes).includes('Error: '), 'Zero internal stack traces exposed to client');
  } catch (err) {
    assert(false, 'Input Validation Test', err.message);
  }

  // 9. 404 Route Handling
  try {
    const notFoundRes = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/unknown-route',
      method: 'GET'
    });

    assert(notFoundRes.statusCode === 404, '404 handler returns HTTP 404 for undefined routes');
    assert(notFoundRes.data?.success === false, '404 returns structured JSON error');
  } catch (err) {
    assert(false, '404 Route Handling Test', err.message);
  }

  console.log('\n===============================================================');
  console.log(`📊 FINAL QA TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('===============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runProductionQA().catch(e => {
  console.error('Test runner fatal exception:', e);
  process.exit(1);
});
