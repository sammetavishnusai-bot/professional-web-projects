// AI Intelligent Engine for ResuSphere
// Generates summaries, optimizes bullet points with action verbs and metrics (Google X-Y-Z formula),
// suggests trending skills, and parses job descriptions for ATS match rates.

const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Orchestrated', 'Pioneered', 'Automated',
  'Accelerated', 'Revamped', 'Streamlined', 'Delivered', 'Scaled', 'Championed',
  'Devised', 'Overhauled', 'Transformed', 'Synthesized', 'Consolidated', 'Empowered'
];

const METRIC_PATTERNS = [
  'resulting in a {pct}% increase in efficiency and throughput.',
  'reducing latency by {pct}% across {num} distributed microservices.',
  'driving ${revenue}M in annual pipeline revenue with 99.99% system availability.',
  'cutting infrastructure cloud costs by {pct}% while scaling to {users}M+ monthly active users.',
  'improving core team sprint velocity by {pct}% across {num} cross-functional engineers.',
  'slashing customer churn by {pct}% through proactive performance telemetry and automated alerting.'
];

export const aiEngine = {
  // Advanced AI Skill Suggester based on Target Job Title and Career Goal
  generateCategorizedSkillSuggestions({ targetJobTitle = '', careerGoal = '' }) {
    const combined = `${targetJobTitle} ${careerGoal}`.toLowerCase();

    let technical = [];
    let architectureAndCloud = [];
    let softAndLeadership = [];
    let domainSpecialties = [];

    // AI / Machine Learning / Data
    if (combined.includes('ai') || combined.includes('ml') || combined.includes('data') || combined.includes('machine learning') || combined.includes('llm') || combined.includes('deep learning')) {
      technical = [
        'PyTorch', 'TensorFlow', 'Python (NumPy/Pandas)', 'Transformers (Hugging Face)', 
        'LLM Fine-Tuning (LoRA/QLoRA)', 'RAG Architecture', 'FastAPI', 'LangChain / LangGraph'
      ];
      architectureAndCloud = [
        'Vector Databases (Pinecone / Milvus)', 'vLLM & TensorRT-LLM', 'CUDA & Triton Optimization',
        'MLOps & MLflow', 'Docker & Kubernetes', 'Distributed Training (DeepSpeed / Ray)', 'AWS SageMaker'
      ];
      softAndLeadership = [
        'AI Ethics & Governance', 'Model Evaluation & Benchmarking', 'Cross-Disciplinary AI Strategy',
        'Complex Problem Decomposition', 'Technical Whitepaper Authoring', 'Executive Stakeholder Alignment'
      ];
      domainSpecialties = [
        'Prompt Engineering & DSPy', 'Embedding Models & Semantic Search', 'Agentic Workflows', 'Quantization (AWQ/GPTQ)'
      ];
    }
    // Design / UX / UI / Product
    else if (combined.includes('design') || combined.includes('ux') || combined.includes('ui') || combined.includes('product designer') || combined.includes('figma')) {
      technical = [
        'Figma Mastery', 'Design Tokens', 'Design Systems Architecture', 'Prototyping (Framer / Rive / ProtoPie)',
        'WCAG AAA Accessibility', 'Information Architecture', 'User Journey Mapping', 'Tailwind CSS'
      ];
      architectureAndCloud = [
        'Design-to-Code Handoff Pipelines', 'Design Component Libraries', 'Storybook Integration',
        'A/B Testing Frameworks', 'Usability Analytics (Mixpanel / Hotjar)', 'Micro-Interactions Animation'
      ];
      softAndLeadership = [
        'User Empathy & Qualitative Research', 'Cross-Functional Product Vision', 'Design Sprint Facilitation',
        'Stakeholder Pitching & Storytelling', 'Iterative Feedback Synthesis', 'Mentorship & Design Leadership'
      ];
      domainSpecialties = [
        'Interaction Design (IxD)', 'Design Ops', 'Responsive Web Typography', 'Voice of Customer Synthesis'
      ];
    }
    // Cloud / DevOps / SRE / Infrastructure
    else if (combined.includes('devops') || combined.includes('sre') || combined.includes('cloud') || combined.includes('infra') || combined.includes('security') || combined.includes('platform')) {
      technical = [
        'Kubernetes (K8s)', 'Docker Containerization', 'Terraform (IaC)', 'Linux Kernel & BPF Tuning',
        'CI/CD Pipelines (GitHub Actions / GitLab)', 'Bash & Python Scripting', 'Helm Charts', 'Golang'
      ];
      architectureAndCloud = [
        'AWS (EKS, VPC, Lambda, S3, IAM)', 'Prometheus & Grafana Telemetry', 'ArgoCD (GitOps)',
        'Zero-Trust Security & Vault', 'Service Mesh (Istio / Linkerd)', 'Disaster Recovery & High Availability'
      ];
      softAndLeadership = [
        'Incident Response & Post-Mortem Leadership', 'Root Cause Analysis (RCA)', 'SLA / SLO / Error Budget Management',
        'Developer Productivity Engineering', 'Cross-Team Infrastructure Advocacy', 'Security & Compliance Mindset'
      ];
      domainSpecialties = [
        'FinOps & Cloud Cost Optimization', 'Chaos Engineering', 'Automated Rollback Strategies', 'Secrets Management'
      ];
    }
    // Engineering Management / Leadership
    else if (combined.includes('manager') || combined.includes('lead') || combined.includes('director') || combined.includes('vp') || combined.includes('head') || combined.includes('cto') || combined.includes('staff')) {
      technical = [
        'System Architecture & RFCs', 'Technical Debt Prioritization', 'React / TypeScript / Node.js',
        'Cloud Infrastructure & Microservices', 'API Design & Contract Testing', 'Code Review Standards'
      ];
      architectureAndCloud = [
        'High-Scale Distributed Systems', 'Multi-Region High Availability', 'Enterprise Security & SOC2 Compliance',
        'Observability & Datadog APM', 'CI/CD Automation & Release Cadence', 'Cloud Resource Budgeting'
      ];
      softAndLeadership = [
        'Engineering Team Scaling & Hiring', 'Sprint Planning & Agile Delivery', 'Cross-Functional Executive Alignment',
        '1-on-1 Mentorship & Career Laddering', 'Strategic Roadmap Execution', 'Conflict Resolution & Team Culture'
      ];
      domainSpecialties = [
        'Vendor Evaluation & Contract Negotiation', 'OKRs & KPI Telemetry', 'Engineering Velocity Optimization', 'Board & Executive Communication'
      ];
    }
    // Default Full-Stack / Software Engineering
    else {
      technical = [
        'React 19 & Next.js 14', 'TypeScript', 'Node.js & Express', 'Python / FastAPI',
        'RESTful APIs & GraphQL', 'PostgreSQL & SQL Mastery', 'Redis Caching', 'Tailwind CSS'
      ];
      architectureAndCloud = [
        'Microservices Architecture', 'Docker & Containerization', 'AWS / Cloud Deployment',
        'CI/CD Automation (GitHub Actions)', 'Database Indexing & Query Optimization', 'WebSockets & Real-Time Sync'
      ];
      softAndLeadership = [
        'Agile / Scrum Sprint Leadership', 'Cross-Functional Collaboration', 'Clean Code & SOLID Principles',
        'Effective Asynchronous Communication', 'Technical Documentation (RFCs)', 'Proactive Problem Solving'
      ];
      domainSpecialties = [
        'Test-Driven Development (Vitest/Jest)', 'Web Performance & Core Web Vitals', 'State Management (Zustand/Redux)', 'OAuth 2.0 & JWT Security'
      ];
    }

    // Additional goals enrichment
    if (combined.includes('scale') || combined.includes('million') || combined.includes('high throughput')) {
      if (!architectureAndCloud.includes('High-Throughput Concurrency')) {
        architectureAndCloud.unshift('High-Throughput Concurrency', 'Kafka / RabbitMQ Event Streaming');
      }
    }
    if (combined.includes('transition') || combined.includes('switch') || combined.includes('growth')) {
      softAndLeadership.push('Rapid Domain Adaptability', 'Continuous Self-Directed Learning');
    }

    return [
      {
        category: 'Core Technical Skills',
        icon: 'Cpu',
        description: 'Primary programming languages, frameworks, and core tech capabilities',
        skills: technical
      },
      {
        category: 'Architecture & Cloud Infrastructure',
        icon: 'Layers',
        description: 'Systems design, cloud deployment, databases, and DevOps tooling',
        skills: architectureAndCloud
      },
      {
        category: 'Soft Skills & Leadership',
        icon: 'Award',
        description: 'Communication, team leadership, stakeholder alignment, and agility',
        skills: softAndLeadership
      },
      {
        category: 'Domain & Emerging Specializations',
        icon: 'Sparkles',
        description: 'Targeted high-value industry capabilities and future-proof skills',
        skills: domainSpecialties
      }
    ];
  },

  // Comprehensive Custom Resume Summary Generator based on multi-field inputs
  generateCustomResumeSummary({
    fullName = '',
    jobTitle = 'Professional',
    education = '',
    skills = '',
    experience = '',
    careerGoal = '',
    tone = 'impact'
  }) {
    const nameStr = fullName ? fullName.trim() : 'Results-oriented professional';
    const roleStr = jobTitle ? jobTitle.trim() : 'specialist';
    
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
      : '5+ years of demonstrated success executing high-impact initiatives and driving organizational value';

    const goalText = careerGoal && careerGoal.trim().length > 0 
      ? `Focused on ${careerGoal.trim().replace(/^(i want to |aiming to |looking to |seeking to )/i, '')}.` 
      : `Committed to driving continuous product innovation and delivering high-ROI business outcomes.`;

    const randomPct = Math.floor(Math.random() * 25) + 30; // 30-55%
    const randomUsers = Math.floor(Math.random() * 10) + 5; // 5-15M

    const variation1 = `${fullName ? `${fullName} is a ` : ''}Results-driven ${roleStr} with ${expText}. Recognized for expertise in ${topSkills}. Proven track record scaling mission-critical systems to ${randomUsers}M+ users and elevating team velocity by ${randomPct}%. ${eduMention}. ${goalText}`;

    const variation2 = `Forward-thinking ${roleStr} specialized in ${topSkills}. Brings ${expText} with an emphasis on resilient architecture, robust automation, and high code quality. ${eduMention}. ${goalText}`;

    const variation3 = `${roleStr} with proven background in ${topSkills}. ${expText}. ${eduMention} with strong focus on performance optimization, cross-functional leadership, and scalable execution. ${goalText}`;

    return [
      {
        id: 'metric-driven',
        title: '🚀 Executive & Metric-Driven (Recommended)',
        badge: 'Highest ATS Impact',
        tone: 'Executive',
        summary: variation1,
        keywords: skillList.slice(0, 4),
        wordCount: variation1.split(/\s+/).length,
        characterCount: variation1.length
      },
      {
        id: 'innovator',
        title: '💡 Technical Specialist & Innovation',
        badge: 'Engineering Depth',
        tone: 'Technical',
        summary: variation2,
        keywords: skillList.slice(0, 4),
        wordCount: variation2.split(/\s+/).length,
        characterCount: variation2.length
      },
      {
        id: 'concise',
        title: '⚡ Concise & Direct (ATS Keyword Match)',
        badge: 'High Density',
        tone: 'Direct',
        summary: variation3,
        keywords: skillList.slice(0, 4),
        wordCount: variation3.split(/\s+/).length,
        characterCount: variation3.length
      }
    ];
  },

  // Generates 3 tailored summary variations
  generateSummaries(role = 'Software Engineer', experienceYears = '5+', skills = [], tone = 'impact') {
    const skillsList = skills.length > 0 ? skills.slice(0, 4).join(', ') : 'modern tech stacks and cloud architectures';
    
    return [
      {
        id: 'impact-driven',
        label: '🚀 High-Impact & Metrics (Recommended)',
        text: `Results-driven ${role} with ${experienceYears} years of experience architecting high-scale distributed systems and high-converting products. Proven expertise in ${skillsList}. Successfully boosted system throughput by 42% and delivered enterprise-grade features serving millions of active users with 99.99% uptime.`
      },
      {
        id: 'innovator',
        label: '💡 Technical Leader & Innovation',
        text: `Forward-thinking ${role} specialized in ${skillsList}. Passionate about leveraging cutting-edge AI architectures, clean code methodologies, and automated CI/CD pipelines to solve intricate engineering bottlenecks and elevate team engineering standards.`
      },
      {
        id: 'concise',
        label: '⚡ Concise & ATS-Direct',
        text: `${role} with deep proficiency in ${skillsList} and cloud infrastructure. Strong track record in full lifecycle product delivery, API orchestration, and cross-functional team collaboration in fast-paced agile environments.`
      }
    ];
  },

  // Enhances a bullet point into the Google X-Y-Z formula
  enhanceBullet(rawText, role = 'Engineer') {
    if (!rawText || rawText.trim().length === 0) {
      return 'Engineered scalable backend services with React and Node.js, boosting user engagement by 35%.';
    }

    const clean = rawText.trim().replace(/^[•\-\*]\s*/, '');
    const randomVerb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
    const randomPct = Math.floor(Math.random() * 35) + 20; // 20-55%
    const randomNum = Math.floor(Math.random() * 8) + 4; // 4-12
    const randomRev = (Math.random() * 4 + 1.2).toFixed(1); // 1.2 - 5.2
    const randomUsers = Math.floor(Math.random() * 15) + 3; // 3 - 18

    const metric1 = METRIC_PATTERNS[Math.floor(Math.random() * METRIC_PATTERNS.length)]
      .replace('{pct}', randomPct)
      .replace('{num}', randomNum)
      .replace('{revenue}', randomRev)
      .replace('{users}', randomUsers);

    return [
      {
        style: 'X-Y-Z Metric Boost (Google Standard)',
        content: `${randomVerb} ${clean.replace(/^(i |we |responsible for |worked on |helped with )/i, '')}, ${metric1}`
      },
      {
        style: 'Leadership & Architecture',
        content: `Spearheaded cross-squad initiative to ${clean.replace(/^(i |we |responsible for |worked on )/i, '')}; authored comprehensive technical documentation and reduced deployment cycle times by ${randomPct}%.`
      },
      {
        style: 'Direct & ATS Optimized',
        content: `${randomVerb} and deployed ${clean.replace(/^(i |we |responsible for |worked on )/i, '')}, ensuring 100% test coverage and zero-downtime reliability across production clusters.`
      }
    ];
  },

  // Suggests skills based on target role
  getSuggestedSkills(role = '') {
    const lowerRole = role.toLowerCase();
    
    if (lowerRole.includes('design') || lowerRole.includes('ux') || lowerRole.includes('ui') || lowerRole.includes('product')) {
      return [
        'Figma Mastery', 'Design Tokens', 'Design Systems', 'WCAG AAA Accessibility',
        'User Journey Mapping', 'Prototyping (Rive/Protopie)', 'Design Handoff', 'Micro-interactions',
        'Usability Testing', 'Information Architecture', 'Framer', 'Tailwind CSS'
      ];
    }

    if (lowerRole.includes('ai') || lowerRole.includes('ml') || lowerRole.includes('data') || lowerRole.includes('machine')) {
      return [
        'PyTorch', 'TensorFlow', 'LLM Fine-Tuning (LoRA)', 'RAG Pipelines', 'Vector DBs (Pinecone/Milvus)',
        'vLLM & Quantization', 'LangChain / LangGraph', 'Hugging Face', 'CUDA / Triton',
        'Distributed Training (DeepSpeed)', 'MLflow', 'FastAPI'
      ];
    }

    if (lowerRole.includes('cloud') || lowerRole.includes('devops') || lowerRole.includes('sre') || lowerRole.includes('infra')) {
      return [
        'Kubernetes', 'Docker', 'Terraform', 'AWS (EKS, Lambda, S3)', 'CI/CD Pipelines (GitHub Actions)',
        'Prometheus & Grafana', 'ArgoCD', 'Linux Kernel Tuning', 'Helm Charts', 'Zero-Trust Security'
      ];
    }

    // Default Full-Stack / Software Engineer
    return [
      'React 19', 'Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis',
      'GraphQL', 'Tailwind CSS', 'Docker', 'AWS', 'RESTful APIs', 'Jest / Vitest',
      'Microservices', 'Git CI/CD', 'WebSockets', 'System Architecture'
    ];
  },

  // Comprehensive AI Job Description Matcher and Semantic Gap Analysis Engine
  analyzeJobDescription(jobDesc = '', resumeData) {
    if (!jobDesc || jobDesc.trim().length < 20) {
      return {
        matchScore: 0,
        matchGrade: 'Awaiting Job Description',
        matchedKeywords: [],
        missingKeywords: [],
        topJobKeywords: [],
        sectionImprovements: [],
        recommendations: []
      };
    }

    const techVocabulary = [
      'React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
      'FastAPI', 'Django', 'Go', 'Golang', 'Rust', 'Java', 'Spring Boot', 'C++', 'C#', '.NET',
      'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GraphQL', 'REST', 'RESTful APIs', 'Docker', 'Kubernetes',
      'AWS', 'Azure', 'GCP', 'Terraform', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Linux',
      'Microservices', 'Kafka', 'RabbitMQ', 'Elasticsearch', 'LLM', 'PyTorch', 'TensorFlow',
      'RAG', 'Vector DB', 'Pinecone', 'LangChain', 'vLLM', 'Figma', 'UI/UX', 'Tailwind', 'Tailwind CSS',
      'Redux', 'System Design', 'Agile', 'Scrum', 'Micro-frontends', 'Vitest', 'Jest', 'Cypress',
      'Zero-Trust', 'SOC2', 'Prometheus', 'Grafana', 'WebSockets', 'Distributed Systems'
    ];

    const lowerJob = jobDesc.toLowerCase();
    
    // Extract keywords present in job description
    const foundInJob = techVocabulary.filter(kw => {
      const regex = new RegExp(`\\b${kw.toLowerCase().replace(/[\.\+\*]/g, '\\$&')}\\b`, 'i');
      return regex.test(lowerJob);
    });

    // Fallback if generic text pasted
    const topKeywords = foundInJob.length > 0 ? foundInJob : ['React', 'TypeScript', 'Python', 'AWS', 'Docker', 'RESTful APIs'];

    // Collect all text from current resume
    const resumeSummary = resumeData?.personalInfo?.summary || '';
    const resumeTitle = resumeData?.personalInfo?.title || '';
    const resumeSkills = (resumeData?.skills || []).flatMap(s => s.items || []);
    const resumeExp = (resumeData?.experience || []).flatMap(e => [e.role, e.company, ...(e.highlights || [])]);
    const resumeProjects = (resumeData?.projects || []).flatMap(p => [p.title, p.description, ...(p.techStack || [])]);

    const allResumeText = [
      resumeTitle,
      resumeSummary,
      ...resumeSkills,
      ...resumeExp,
      ...resumeProjects
    ].join(' ').toLowerCase();

    // Determine matched and missing keywords
    const matched = topKeywords.filter(kw => {
      const regex = new RegExp(`\\b${kw.toLowerCase().replace(/[\.\+\*]/g, '\\$&')}\\b`, 'i');
      return regex.test(allResumeText);
    });

    const missing = topKeywords.filter(kw => !matched.includes(kw));

    // Calculate score
    const totalCount = Math.max(topKeywords.length, 1);
    const rawRatio = matched.length / totalCount;
    const matchScore = Math.min(100, Math.max(25, Math.round(rawRatio * 100)));

    let matchGrade = 'Exceptional Alignment';
    if (matchScore < 50) matchGrade = 'Low Alignment (Significant Gaps)';
    else if (matchScore < 70) matchGrade = 'Moderate Alignment';
    else if (matchScore < 85) matchGrade = 'Strong Match';

    // Section-by-Section Improvement Suggestions
    const sectionImprovements = [];

    // 1. Title & Summary Section
    if (!matched.some(k => resumeTitle.toLowerCase().includes(k.toLowerCase()))) {
      sectionImprovements.push({
        section: 'Professional Title & Summary',
        icon: 'User',
        issue: 'Headline lacks target job keywords',
        suggestion: `Align your professional headline with target keywords like "${topKeywords.slice(0, 2).join(' & ')}".`
      });
    }

    // 2. Skills Section
    if (missing.length > 0) {
      sectionImprovements.push({
        section: 'Skills & Tech Stack',
        icon: 'Cpu',
        issue: `${missing.length} target job keywords missing from skills list`,
        suggestion: `Inject missing high-priority keywords: ${missing.slice(0, 4).join(', ')}.`
      });
    }

    // 3. Work Experience Section
    if ((resumeData?.experience || []).length < 2) {
      sectionImprovements.push({
        section: 'Work Experience',
        icon: 'Briefcase',
        issue: 'Insufficient experience depth for target role requirements',
        suggestion: 'Detail accomplishments highlighting responsibilities matching the job description.'
      });
    } else {
      sectionImprovements.push({
        section: 'Work Experience Bullets',
        icon: 'Briefcase',
        issue: 'Metric alignment with job priorities',
        suggestion: `Ensure your most recent role mentions tools like "${(matched[0] || 'primary technologies')}" backed by quantified metrics.`
      });
    }

    // 4. Projects Section
    if (missing.length > 2 && (resumeData?.projects || []).length > 0) {
      sectionImprovements.push({
        section: 'Key Projects',
        icon: 'FolderGit2',
        issue: 'Project stack could showcase more target technologies',
        suggestion: `Feature projects that explicitly list "${missing[0] || 'target tech'}" in their tech stack tags.`
      });
    }

    return {
      matchScore,
      matchGrade,
      matchedKeywords: matched,
      missingKeywords: missing,
      topJobKeywords: topKeywords,
      sectionImprovements,
      recommendations: [
        missing.length > 0 ? `Add missing target keywords (${missing.slice(0, 3).join(', ')}) to your skills matrix.` : 'Technical skill keywords are well aligned!',
        'Tailor your professional summary to reflect the specific problem domain in the job posting.',
        'Prioritize experience bullets that demonstrate business outcomes relevant to this position.'
      ]
    };
  }
};
