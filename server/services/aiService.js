/**
 * Server-Side AI Service Layer
 * Centralizes AI generation, skill suggestion heuristics, project recommendations,
 * interview question formulation, and job description matching.
 * Reads API keys ONLY from process.env (Server Environment) without exposing keys to clients.
 */

// Core Action Verbs and Metrics for Heuristic Generation
const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Orchestrated', 'Pioneered', 'Automated',
  'Accelerated', 'Revamped', 'Streamlined', 'Delivered', 'Scaled', 'Championed',
  'Devised', 'Overhauled', 'Transformed', 'Synthesized', 'Consolidated', 'Empowered'
];

export const aiService = {
  /**
   * 1. Generates tailored, multi-tone resume summaries
   */
  async generateResumeSummary({
    fullName = '',
    jobTitle = 'Professional',
    education = '',
    skills = '',
    experience = '',
    careerGoal = ''
  }) {
    const apiKey = process.env.AI_API_KEY;
    const provider = process.env.AI_PROVIDER || 'custom';

    // Check if external provider configured
    if (apiKey && apiKey !== 'your_api_key_here') {
      // Future remote API invocation hook (e.g. OpenAI / Gemini)
    }

    const nameStr = fullName ? fullName.trim() : 'Results-oriented professional';
    const roleStr = jobTitle ? jobTitle.trim() : 'Specialist';
    
    let skillList = [];
    if (Array.isArray(skills)) {
      skillList = skills;
    } else if (typeof skills === 'string' && skills.trim()) {
      skillList = skills.split(/[,•\n]+/).map(s => s.trim()).filter(Boolean);
    }
    const topSkills = skillList.length > 0 ? skillList.slice(0, 5).join(', ') : 'modern tech stacks, architecture design, and data-driven systems';

    const eduMention = education && education.trim().length > 0 
      ? `Backed by ${education.trim().replace(/^degree in /i, '')}` 
      : 'Backed by a rigorous academic foundation';

    const expText = experience && experience.trim().length > 0 
      ? experience.trim() 
      : 'Demonstrated track record of executing high-impact technical initiatives';

    const goalText = careerGoal && careerGoal.trim().length > 0 
      ? `Focused on ${careerGoal.trim().replace(/^(i want to |aiming to |looking to |seeking to )/i, '')}.` 
      : `Committed to driving continuous product innovation and delivering high-impact business outcomes.`;

    const randomPct = Math.floor(Math.random() * 25) + 30; // 30-55%

    return [
      {
        tone: 'Modern & Direct',
        label: 'Modern Impact',
        content: `${roleStr} with proven expertise in ${topSkills}. Track record of architecting scalable systems and delivering measurable product improvements with a ${randomPct}% efficiency boost. ${goalText}`
      },
      {
        tone: 'Technical & Metric-Driven',
        label: 'Technical Depth',
        content: `High-velocity ${roleStr} skilled in ${topSkills}. Spearheaded core engineering initiatives that reduced system latency by ${randomPct}% while maintaining 99.9% uptime. ${eduMention} and ${expText}. ${goalText}`
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
   * 2. Suggests role-targeted skills and analyzes skill gaps
   */
  async suggestSkills({ targetJobTitle = 'Software Engineer', careerGoal = '' }) {
    const roleClean = (targetJobTitle || '').toLowerCase();

    if (roleClean.includes('front') || roleClean.includes('react') || roleClean.includes('ui') || roleClean.includes('web')) {
      return [
        {
          category: 'Core Frontend & UI Architecture',
          items: ['React 19', 'TypeScript', 'Next.js 14', 'Tailwind CSS', 'Redux Toolkit / Zustand', 'HTML5/Semantic Web', 'CSS Modules / PostCSS']
        },
        {
          category: 'State & Performance Engineering',
          items: ['React Query / TanStack', 'WebSockets', 'Core Web Vitals Optimization', 'Client-Side Caching', 'Code Splitting & Lazy Loading']
        },
        {
          category: 'Testing, Quality & Build Tooling',
          items: ['Vite', 'Vitest / Jest', 'React Testing Library', 'Cypress / Playwright', 'ESLint / Prettier', 'Storybook']
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
          category: 'DevOps, Containers & Cloud',
          items: ['Docker', 'Kubernetes', 'AWS (EC2, S3, Lambda)', 'CI/CD Pipelines (GitHub Actions)', 'Nginx', 'Prometheus / Grafana']
        }
      ];
    }

    if (roleClean.includes('data') || roleClean.includes('analyst') || roleClean.includes('sql') || roleClean.includes('bi')) {
      return [
        {
          category: 'Data Querying & Relational Databases',
          items: ['Advanced SQL', 'PostgreSQL', 'MySQL', 'Snowflake', 'BigQuery']
        },
        {
          category: 'Data Wrangling & Statistical Programming',
          items: ['Python (Pandas, NumPy)', 'R', 'Excel (PowerQuery, DAX)', 'Jupyter Notebooks', 'ETL Pipelines']
        },
        {
          category: 'BI Visualizations & Storytelling',
          items: ['Power BI', 'Tableau', 'Looker', 'Matplotlib / Seaborn', 'Stakeholder Reporting']
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
   * 3. Analyzes Skill Gaps against target roles
   */
  async analyzeSkillGap({ targetRole = 'fullstack', userSkills = [] }) {
    const skillList = (userSkills || []).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const suggestions = await this.suggestSkills({ targetJobTitle: targetRole });
    
    const allRequired = suggestions.flatMap(g => g.items);
    const have = [];
    const missing = [];

    for (const req of allRequired) {
      const cleanReq = req.toLowerCase().replace(/[^a-z0-9]/g, '');
      const match = skillList.some(s => s.includes(cleanReq) || cleanReq.includes(s));
      if (match) {
        have.push(req);
      } else {
        missing.push(req);
      }
    }

    const readinessScore = allRequired.length > 0 ? Math.round((have.length / allRequired.length) * 100) : 0;

    return {
      targetRole,
      readinessScore,
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
   * 4. Generates Project Recommendations
   */
  async recommendProjects({ targetRole = 'frontend', difficulty = 'intermediate', userSkills = [] }) {
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
   * 5. Generates Interview Practice Questions
   */
  async generateInterviewQuestions({ targetRole = 'Full Stack Developer', projects = [], skills = [] }) {
    const technical = [
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
    ];

    const projectQuestions = (projects || []).slice(0, 2).map((proj, idx) => ({
      id: `proj-gen-${idx}`,
      category: 'Project Architecture',
      question: `In your project "${proj.title || 'Technical Project'}", what was the most difficult technical trade-off you made?`,
      difficulty: 'Medium',
      whyAsked: 'Validates authentic authorship and engineering problem-solving capabilities.',
      keyPoints: ['STAR / CAR framework', 'Problem description and alternatives evaluated', 'Measured impact and metrics']
    }));

    return {
      role: targetRole,
      technical,
      projectQuestions,
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
   * 6. Matches Job Description against Candidate Resume
   */
  async matchJobDescription({ jobDescription = '', resumeData = {} }) {
    const descText = (jobDescription || '').toLowerCase();
    
    // Extract candidate skills
    const candidateSkills = [];
    if (Array.isArray(resumeData?.skills)) {
      resumeData.skills.forEach(cat => {
        if (Array.isArray(cat.items)) {
          cat.items.forEach(item => candidateSkills.push(item));
        }
      });
    }

    // Common technical keyword dictionary
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
      'testing': 'Unit & Integration Testing (Jest/Vitest)',
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
      if (isMatched) {
        matchingKeywords.push(kw.label);
      } else {
        missingKeywords.push(kw.label);
      }
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
