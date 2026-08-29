/**
 * Server-Side AI Service Layer (ResuSphere AI)
 * Connects securely to OpenAI Responses / Chat Completions API using OPENAI_API_KEY.
 * ZERO API keys are ever sent or exposed to the client browser.
 * Includes timeout guards, structured JSON parsing, and graceful fallback to local rule heuristics.
 */

import OpenAI from 'openai';

// Model configuration: Cost-conscious and high performance
const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS) || 12000;

/**
 * Helper to get an initialized OpenAI client if OPENAI_API_KEY is configured
 */
function getOpenAIClient() {
  const apiKey = (process.env.OPENAI_API_KEY || process.env.AI_API_KEY || '').trim();
  if (!apiKey || apiKey === 'your_api_key_here' || apiKey.startsWith('sk-placeholder')) {
    return null;
  }
  return new OpenAI({
    apiKey,
    timeout: TIMEOUT_MS
  });
}

export const aiService = {
  /**
   * 1. Resume Summary Generation
   */
  async generateResumeSummary({
    fullName = '',
    jobTitle = 'Software Engineer',
    education = '',
    skills = '',
    experience = '',
    careerGoal = ''
  }) {
    const openai = getOpenAIClient();

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: DEFAULT_MODEL,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are an executive resume strategist. Given a candidate's profile, generate 4 high-impact resume summaries tailored across 4 distinct professional tones:
1. "Modern & Direct" (label: "Modern Impact")
2. "Technical & Metric-Driven" (label: "Technical Depth")
3. "Executive & Strategic" (label: "Leadership & Strategy")
4. "Creative & Innovative" (label: "Creative & Product")

Rules:
- Use action verbs, Google X-Y-Z achievement formulas, and realistic percentage metrics.
- Keep each summary between 40-70 words.
- Return ONLY valid JSON with this schema:
{
  "summaries": [
    { "tone": string, "label": string, "content": string },
    { "tone": string, "label": string, "content": string },
    { "tone": string, "label": string, "content": string },
    { "tone": string, "label": string, "content": string }
  ]
}`
            },
            {
              role: 'user',
              content: JSON.stringify({ fullName, jobTitle, education, skills, experience, careerGoal })
            }
          ],
          temperature: 0.7
        });

        const parsed = JSON.parse(response.choices[0]?.message?.content || '{}');
        if (Array.isArray(parsed.summaries) && parsed.summaries.length > 0) {
          return parsed.summaries;
        }
      } catch (err) {
        console.warn('[AI Service] OpenAI summary request failed, falling back to local engine:', err.message);
      }
    }

    // Graceful fallback to rule-based generation engine
    const roleStr = jobTitle ? jobTitle.trim() : 'Software Engineer';
    let skillList = Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(/[,•\n]+/).map(s => s.trim()).filter(Boolean) : []);
    const topSkills = skillList.length > 0 ? skillList.slice(0, 5).join(', ') : 'modern web stacks, microservices, and distributed architecture';
    const eduMention = education ? `Backed by ${education.trim().replace(/^degree in /i, '')}` : 'Backed by strong computer science fundamentals';
    const expText = experience ? experience.trim() : 'Proven background delivering scalable product features and technical reliability';
    const goalText = careerGoal ? `Focused on ${careerGoal.trim().replace(/^(i want to |aiming to |looking to |seeking to )/i, '')}.` : 'Committed to delivering high-impact software solutions.';
    const randomPct = Math.floor(Math.random() * 20) + 35; // 35-55%

    return [
      {
        tone: 'Modern & Direct',
        label: 'Modern Impact',
        content: `${roleStr} with proven expertise in ${topSkills}. Track record of architecting scalable systems and delivering measurable product improvements with a ${randomPct}% efficiency boost. ${goalText}`
      },
      {
        tone: 'Technical & Metric-Driven',
        label: 'Technical Depth',
        content: `High-velocity ${roleStr} skilled in ${topSkills}. Spearheaded core engineering initiatives that reduced p99 system latency by ${randomPct}% while maintaining 99.9% uptime. ${eduMention} and ${expText}. ${goalText}`
      },
      {
        tone: 'Executive & Strategic',
        label: 'Leadership & Strategy',
        content: `Strategic ${roleStr} combining technical mastery in ${topSkills} with cross-functional execution. Proven ability to bridge business requirements with robust system architecture. ${goalText}`
      },
      {
        tone: 'Creative & Innovative',
        label: 'Creative & Product',
        content: `Innovative ${roleStr} passionate about crafting elegant user experiences and high-throughput systems leveraging ${topSkills}. ${expText}. ${goalText}`
      }
    ];
  },

  /**
   * 2. Skill Suggestions & Categorization
   */
  async suggestSkills({ targetJobTitle = 'Software Engineer', careerGoal = '' }) {
    const openai = getOpenAIClient();

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: DEFAULT_MODEL,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are a technical talent recruiter. Given a target role and career goal, return 3 organized skill categories containing 5-7 current industry-standard tools, languages, and frameworks.
Return ONLY valid JSON with this schema:
{
  "categories": [
    { "category": string, "items": string[] },
    { "category": string, "items": string[] },
    { "category": string, "items": string[] }
  ]
}`
            },
            {
              role: 'user',
              content: JSON.stringify({ targetJobTitle, careerGoal })
            }
          ],
          temperature: 0.6
        });

        const parsed = JSON.parse(response.choices[0]?.message?.content || '{}');
        if (Array.isArray(parsed.categories) && parsed.categories.length > 0) {
          return parsed.categories;
        }
      } catch (err) {
        console.warn('[AI Service] OpenAI skill suggestion failed, falling back to local engine:', err.message);
      }
    }

    // Graceful fallback to rule-based categorization
    const roleClean = (targetJobTitle || '').toLowerCase();
    if (roleClean.includes('front') || roleClean.includes('react') || roleClean.includes('ui')) {
      return [
        {
          category: 'Core Frontend & UI Architecture',
          items: ['React 19', 'TypeScript', 'Next.js 14', 'Tailwind CSS', 'Redux Toolkit / Zustand', 'HTML5/Semantic Web']
        },
        {
          category: 'State & Performance Engineering',
          items: ['React Query / TanStack', 'WebSockets', 'Core Web Vitals Optimization', 'Client-Side Caching', 'Code Splitting']
        },
        {
          category: 'Testing & Build Tooling',
          items: ['Vite', 'Vitest / Jest', 'React Testing Library', 'Playwright', 'ESLint / Prettier']
        }
      ];
    }

    if (roleClean.includes('back') || roleClean.includes('node') || roleClean.includes('api') || roleClean.includes('server')) {
      return [
        {
          category: 'Backend Architecture & APIs',
          items: ['Node.js', 'Express.js', 'FastAPI / Python', 'RESTful API Design', 'GraphQL', 'gRPC / Microservices']
        },
        {
          category: 'Databases & In-Memory Stores',
          items: ['PostgreSQL', 'MongoDB', 'Redis Caching', 'Prisma / TypeORM', 'Database Indexing & Query Optimization']
        },
        {
          category: 'DevOps & Containers',
          items: ['Docker', 'Kubernetes', 'AWS (EC2, S3, Lambda)', 'CI/CD Pipelines (GitHub Actions)', 'Nginx']
        }
      ];
    }

    // Default Full-Stack
    return [
      {
        category: 'Full-Stack Web Engineering',
        items: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'REST APIs', 'PostgreSQL']
      },
      {
        category: 'System Design & Scalability',
        items: ['Microservices', 'Redis Caching', 'Docker', 'Event-Driven Architecture', 'WebSockets']
      },
      {
        category: 'DevOps & Quality Assurance',
        items: ['CI/CD Pipelines', 'Docker', 'AWS / Cloud Hosting', 'Jest / Unit Testing', 'Git & GitHub Workflows']
      }
    ];
  },

  /**
   * 3. Skill Gap Analysis
   */
  async analyzeSkillGap({ targetRole = 'fullstack', userSkills = [] }) {
    const openai = getOpenAIClient();

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: DEFAULT_MODEL,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are an engineering career coach. Given a target role and user's current skills, perform a skill gap analysis.
Return ONLY valid JSON with this schema:
{
  "targetRole": string,
  "readinessScore": number (0-100),
  "skillsIHave": string[],
  "skillsToImprove": string[],
  "recommendations": [
    { "skill": string, "priority": "High"|"Medium"|"Low", "reason": string, "action": string }
  ]
}`
            },
            {
              role: 'user',
              content: JSON.stringify({ targetRole, userSkills })
            }
          ],
          temperature: 0.6
        });

        const parsed = JSON.parse(response.choices[0]?.message?.content || '{}');
        if (parsed.readinessScore !== undefined && Array.isArray(parsed.skillsIHave)) {
          return parsed;
        }
      } catch (err) {
        console.warn('[AI Service] OpenAI skill gap analysis failed, falling back to local engine:', err.message);
      }
    }

    // Fallback logic
    const skillList = (userSkills || []).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const suggestions = await this.suggestSkills({ targetJobTitle: targetRole });
    const allRequired = suggestions.flatMap(g => g.items);
    const have = [];
    const missing = [];

    for (const req of allRequired) {
      const cleanReq = req.toLowerCase().replace(/[^a-z0-9]/g, '');
      const match = skillList.some(s => s.includes(cleanReq) || cleanReq.includes(s));
      if (match) have.push(req);
      else missing.push(req);
    }

    return {
      targetRole,
      readinessScore: allRequired.length > 0 ? Math.round((have.length / allRequired.length) * 100) : 70,
      skillsIHave: have,
      skillsToImprove: missing,
      recommendations: missing.slice(0, 5).map(skill => ({
        skill,
        priority: 'High',
        reason: `Essential requirement for industry ${targetRole} positions.`,
        action: `Build a project module incorporating ${skill}.`
      }))
    };
  },

  /**
   * 4. Project Recommendations
   */
  async recommendProjects({ targetRole = 'frontend', difficulty = 'intermediate', userSkills = [] }) {
    const openai = getOpenAIClient();

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: DEFAULT_MODEL,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are a tech lead recommending hands-on portfolio projects for a software engineer.
Return ONLY valid JSON with this schema:
{
  "projects": [
    {
      "title": string,
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "techStack": string[],
      "shortDescription": string,
      "skillsPracticed": string[],
      "estimatedTime": string,
      "resumeValue": string,
      "portfolioValue": string
    }
  ]
}`
            },
            {
              role: 'user',
              content: JSON.stringify({ targetRole, difficulty, userSkills })
            }
          ],
          temperature: 0.7
        });

        const parsed = JSON.parse(response.choices[0]?.message?.content || '{}');
        if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
          return parsed.projects;
        }
      } catch (err) {
        console.warn('[AI Service] OpenAI project recommendation failed, falling back to local engine:', err.message);
      }
    }

    return [
      {
        title: `${targetRole.toUpperCase()} Microservice Platform`,
        difficulty: difficulty || 'Intermediate',
        techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
        shortDescription: `A high-throughput, containerized platform showcasing real-time synchronization, structured schema validation, and caching.`,
        skillsPracticed: ['API Design', 'State Management', 'Database Indexing', 'Containerization'],
        estimatedTime: '20 - 30 Hours',
        resumeValue: 'Proves full-stack architecture, API design, and asynchronous event handling.',
        portfolioValue: 'Live demo with interactive telemetry, responsive design, and GitHub documentation.'
      }
    ];
  },

  /**
   * 5. Interview Question Formulation
   */
  async generateInterviewQuestions({ targetRole = 'Full Stack Developer', projects = [], skills = [] }) {
    const openai = getOpenAIClient();

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: DEFAULT_MODEL,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are an engineering hiring manager. Formulate tailored interview questions for a candidate based on their role, skills, and projects.
Return ONLY valid JSON with this schema:
{
  "role": string,
  "technical": [
    { "id": string, "category": "Technical", "question": string, "difficulty": "Easy"|"Medium"|"Hard", "whyAsked": string, "keyPoints": string[] }
  ],
  "projectQuestions": [
    { "id": string, "category": "Project Architecture", "question": string, "difficulty": "Medium"|"Hard", "whyAsked": string, "keyPoints": string[] }
  ],
  "behavioral": [
    { "id": string, "category": "HR & Behavioral", "question": string, "difficulty": "Medium", "whyAsked": string, "keyPoints": string[] }
  ]
}`
            },
            {
              role: 'user',
              content: JSON.stringify({ targetRole, projects, skills })
            }
          ],
          temperature: 0.7
        });

        const parsed = JSON.parse(response.choices[0]?.message?.content || '{}');
        if (Array.isArray(parsed.technical) && parsed.technical.length > 0) {
          return parsed;
        }
      } catch (err) {
        console.warn('[AI Service] OpenAI interview question generation failed, falling back to local engine:', err.message);
      }
    }

    return {
      role: targetRole,
      technical: [
        {
          id: 'tech-gen-1',
          category: 'Technical',
          question: `How do you optimize state management and re-rendering performance in a complex ${targetRole} application?`,
          difficulty: 'Medium',
          whyAsked: 'Evaluates architectural understanding of component lifecycles, memoization, and rendering bottlenecks.',
          keyPoints: ['Virtual DOM reconciliation', 'useMemo / useCallback trade-offs', 'Atomic vs Context state', 'Network caching']
        },
        {
          id: 'tech-gen-2',
          category: 'Technical',
          question: `Explain how you would design a rate-limiting middleware for high-traffic REST APIs.`,
          difficulty: 'Hard',
          whyAsked: 'Tests knowledge of backend system resilience, sliding window algorithms, and in-memory caches.',
          keyPoints: ['Token bucket & Leaky bucket algorithms', 'Redis TTL counters', 'HTTP 429 status response headers', 'Distributed consistency']
        }
      ],
      projectQuestions: (projects || []).slice(0, 2).map((proj, idx) => ({
        id: `proj-gen-${idx}`,
        category: 'Project Architecture',
        question: `In your project "${proj.title || 'Technical Project'}", what was the most difficult technical trade-off you made?`,
        difficulty: 'Medium',
        whyAsked: 'Validates authentic authorship and engineering problem-solving capabilities.',
        keyPoints: ['STAR / CAR framework', 'Problem description and alternatives evaluated', 'Measured impact and metrics']
      })),
      behavioral: [
        {
          id: 'behav-gen-1',
          category: 'HR & Behavioral',
          question: 'Describe a situation where a technical task took longer than expected. How did you handle communication and delivery?',
          difficulty: 'Medium',
          whyAsked: 'Assesses accountability, professional communication, and deadline management.',
          keyPoints: ['Proactive stakeholder notification', 'Scope negotiation', 'Root cause post-mortem']
        }
      ]
    };
  },

  /**
   * 6. Job Description Matcher
   */
  async matchJobDescription({ jobDescription = '', resumeData = {} }) {
    const openai = getOpenAIClient();

    if (openai) {
      try {
        const response = await openai.chat.completions.create({
          model: DEFAULT_MODEL,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are an expert ATS (Applicant Tracking System) parser and resume analyst. Compare the candidate's resume data against the provided job description.
Identify matching skills, missing keywords, overall match percentage (0-100), and targeted section recommendations.
Return ONLY valid JSON with this schema:
{
  "matchScore": number (0-100),
  "totalKeywordsDetected": number,
  "matchingKeywords": string[],
  "missingKeywords": string[],
  "sectionAdvice": [
    { "section": string, "recommendation": string }
  ]
}`
            },
            {
              role: 'user',
              content: JSON.stringify({ jobDescription, resumeData })
            }
          ],
          temperature: 0.5
        });

        const parsed = JSON.parse(response.choices[0]?.message?.content || '{}');
        if (parsed.matchScore !== undefined && Array.isArray(parsed.matchingKeywords)) {
          return parsed;
        }
      } catch (err) {
        console.warn('[AI Service] OpenAI job match failed, falling back to local engine:', err.message);
      }
    }

    // Fallback keyword parser
    const descText = (jobDescription || '').toLowerCase();
    const candidateSkills = [];
    if (Array.isArray(resumeData?.skills)) {
      resumeData.skills.forEach(cat => {
        if (Array.isArray(cat.items)) {
          cat.items.forEach(item => candidateSkills.push(item));
        }
      });
    }

    const KEYWORD_MAP = {
      'react': 'React.js',
      'typescript': 'TypeScript',
      'javascript': 'JavaScript (ES6+)',
      'node': 'Node.js',
      'python': 'Python',
      'fastapi': 'FastAPI',
      'express': 'Express.js',
      'sql': 'SQL / Relational DBs',
      'postgres': 'PostgreSQL',
      'mongodb': 'MongoDB',
      'redis': 'Redis Caching',
      'docker': 'Docker Containerization',
      'kubernetes': 'Kubernetes (K8s)',
      'aws': 'AWS Cloud Services',
      'ci/cd': 'CI/CD Pipelines',
      'tailwind': 'Tailwind CSS',
      'next.js': 'Next.js (SSR)',
      'graphql': 'GraphQL',
      'rest': 'RESTful APIs',
      'microservices': 'Microservices Architecture',
      'testing': 'Unit Testing (Jest/Vitest)',
      'figma': 'Figma Design Tokens',
      'git': 'Git & Version Control'
    };

    const targetKeywordsFoundInJob = [];
    for (const [key, label] of Object.entries(KEYWORD_MAP)) {
      if (descText.includes(key)) {
        targetKeywordsFoundInJob.push({ key, label });
      }
    }

    const candidateSkillStrings = candidateSkills.map(s => s.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const matchingKeywords = [];
    const missingKeywords = [];

    targetKeywordsFoundInJob.forEach(kw => {
      const cleanKey = kw.key.replace(/[^a-z0-9]/g, '');
      const isMatched = candidateSkillStrings.some(cs => cs.includes(cleanKey) || cleanKey.includes(cs));
      if (isMatched) matchingKeywords.push(kw.label);
      else missingKeywords.push(kw.label);
    });

    const totalKeywords = targetKeywordsFoundInJob.length || 1;
    const matchScore = Math.min(100, Math.max(10, Math.round((matchingKeywords.length / totalKeywords) * 100)));

    return {
      matchScore,
      totalKeywordsDetected: targetKeywordsFoundInJob.length,
      matchingKeywords,
      missingKeywords,
      sectionAdvice: [
        {
          section: 'Technical Skills Grouping',
          recommendation: missingKeywords.length > 0
            ? `Consider adding ${missingKeywords.slice(0, 3).join(', ')} to your Skills section if you have working familiarity.`
            : 'Your technical skills section is well aligned with this job posting.'
        },
        {
          section: 'Projects & Experience Highlights',
          recommendation: `Incorporate metric achievements highlighting your experience with ${matchingKeywords.slice(0, 3).join(', ') || 'core technologies'}.`
        }
      ]
    };
  }
};
